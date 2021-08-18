#!/bin/bash

branch=$1
if [[ -z "${branch}" ]]; then
  echo branch argument not optional
  exit -1
fi

LOCAL_IMAGE_NAME=demoapp
REMOTE_IMAGE_NAME=demoapp

compose_cmd="docker-compose -p test -f docker-compose.yml"
versions=$(SILENT=t ./sql/check-migration-newer.sh ${branch} sql/migrations/)
for x in ${versions}; do
  export $x
done

prior_revision=$(git log --format=%H ${branch} -n 1)
ref=$(git symbolic-ref --quiet HEAD)
current_branch=${ref#refs/heads/}

function runtest {
  test_id=$1
  echo waiting for container to be up and healthy
  s=$(docker inspect -f '{{ .State.Health.Status }}' demoapp)
  while [[ $s != "healthy" ]]; do 
    sleep 0.25
    s=$(docker inspect -f '{{ .State.Health.Status }}' demoapp)
  done
  echo waiting for service to report itself as up
  s=$(curl -s http://localhost:7071/status|jq -r .status)
  while [[ $s != "UP" ]]; do 
    sleep 0.25
    s=$(curl -s http://localhost:7071/status|jq .status)
  done
  yarn test:api --env-var "host=http://localhost:7071" --env-var "test_id=${test_id}"
}


cd docker
${compose_cmd} up -d postgres 
${compose_cmd} build ${LOCAL_IMAGE_NAME}-migrations 
${compose_cmd} run -e FLYWAY_TARGET=${LATEST_VERSION_MAIN} ${LOCAL_IMAGE_NAME}-migrations

cd ..
# run erdiff on ${branch} schema
yarn run erdiff -c 'postgres://demoapp-user:postgres-local-password@127.0.0.1:5432/demoapp' -f schema.json -q
cd docker
export DEMOAPP_IMAGE=${DOCKER_REPO}/${REMOTE_IMAGE_NAME}:${prior_revision}
if [[ -z ${DOCKER_REPO} ]]; then 
  echo using git to build prior version
  git checkout ${prior_revision}
  ${compose_cmd} build ${LOCAL_IMAGE_NAME}
  git checkout ${current_branch}
fi
echo running backend with image: $DEMOAPP_IMAGE
${compose_cmd} up -d ${LOCAL_IMAGE_NAME}

cd ..
sleep 1
runtest 20

if [[ -z ${DOCKER_REPO} ]]; then 
  git checkout ${current_branch}
fi

cd docker
${compose_cmd} run -e FLYWAY_TARGET=${LATEST_VERSION_HEAD} ${LOCAL_IMAGE_NAME}-migrations

cd ..
# generating schema diff using current migrations and schema.json(generated above)
yarn run erdiff -p schema.json -c 'postgres://demoapp-user:postgres-local-password@127.0.0.1:5432/demoapp' 1> schema.html
runtest 21

cd docker
export DEMOAPP_IMAGE=${LOCAL_IMAGE_NAME}:latest
${compose_cmd} build ${LOCAL_IMAGE_NAME}
${compose_cmd} up -d ${LOCAL_IMAGE_NAME}

cd ..
sleep 2
runtest 22

cd docker
${compose_cmd} down
