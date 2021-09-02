FROM node:16-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./webpack.config.js ./
COPY ./.babelrc ./
COPY ./src/frontend/ ./src/frontend

RUN yarn install && yarn build

FROM nginx as runtime

COPY --from=build /app/dist/ /usr/share/nginx/html
COPY --from=build /app/src/frontend/index.html /usr/share/nginx/html/index.html
COPY --from=build /app/src/frontend/style/ /usr/share/nginx/html/style
COPY ./docker/web-server/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80