NOTE: When you are done, you should have a fully running website with a React front end and working backend.  You will be providing the backend and whatever configuration and/or environment changes are necessary to make that happen.

As a fallback, if you can't figure out how to get that to work, you should at least be able to demonstrate a fully functional API using `cURL`, Postman, or something similar.


Please implement a SQL database of some kind to store the data.  (MySQL or Postgres is preferred)


Here is a list of endpoints that should be supported to make the front end work.  Please implement at least 3 of them.  (if you choose not to implement login/logout, please at least stub them out or the UI will not work)

### Request
logs the user in 

`POST /user/login` 

example body: 

    {
        "username":"test@example.org",
        "password":"password",
        "remember":true
    }

### Example Response

    {
        "user_id":2,
        "name":"test user",
        "email":"test@example.org",
        "phone":null,
        "roles":[null]
    }

### Request
logs the current user out

`GET /user/logout`

### Example Response: 

    {
        "Logged Out"
    }
    
### Request
returns a list of all movies (would be helpful to seed the database with some movies, the UI for adding movies isn't functional)

`GET /movies`

### Example Response: 

    {
      movie_id": "1",
      title": "Oceans 11",
      rating_classification": "PG-13",
      description": null,
      release_date: "2001-12-07T00:00:00.000Z",
      created_at: "2020-06-13T04:16:14.813Z",
      updated_at: "2020-06-13T04:16:14.813Z",
      runtime": {
        hours: "1",
        minutes: "56"
      },
      avg_rating: "'3.5"
    }
    
### Request
inserts a new movie to the movie collection

`POST /movies`

### Example Response: 

    {
        title": "Oceans 11",
        rating_classification": "PG-13",
        description": "A great heist movie",
        release_date: "2001-12-07T00:00:00.000Z",
    }
    
### Request
gets details about a particular movie

`GET /movies/:movie_id`

### Example Response: 

    {
        movie_id": "1",
        title": "Oceans 11",
        rating_classification": "PG-13",
        description": null,
        release_date: "2001-12-07T00:00:00.000Z",
        created_at: "2020-06-13T04:16:14.813Z",
        updated_at: "2020-06-13T04:16:14.813Z",
        runtime": {
            hours: "1",
            minutes: "56"
        },
        avg_rating: "'3.5"
    }
    
### Request
returns a list of all people (actors)

`GET /people`

### Example Response: 

    [{
          "person_id": 13,
          "name": "Brad Pitt",
          "location": null,
          "born": "1963-12-18T00:00:00.000Z",
          "died": null,
          "description": "An actor and producer known as much for his versatility as he is for his handsome face",
          "thumbnail_asset": null
        },
        ...
    ]
    
### Request
returns a list of all people (actors)

`GET /people/:person_id`

### Example Response: 

    { 
        roles:[
          {
            "movie_id": 1,
            "title": "Oceans 11",
            "release_date": "2001-12-07T00:00:00.000Z"
          },
          ...
        ],
        "person_id": 13,
        "name": "Brad Pitt",
        "location": null,
        "born": "1963-12-18T00:00:00.000Z",
        "died": null,
        "description": "An actor and producer known as much for his versatility as he is for his handsome face"
    }
