# Blogging Platform API
A challenge project from [roadmap](https://roadmap.sh/projects/blogging-platform-api)

## Description
A RESTful API for blogging platform which allow users to perform following operation.

| Operation      | route           | Method  |
| ------------- |:-------------:| -----:|
| Create a new blog post      | /api/posts | POST |
| Update an existing blog post     | /api/posts/:id     |  PUT |
| Delete an existing blog post | /api/posts/:id       |    DELETE |
| Get a single blog post | /api/posts/:id       |    GET |
| Get all blog posts | /api/posts      |    GET |
| Filter blog posts by a search term | /api/posts?term=*       |    GET |

PUT required following fields in request body as json .
| field      | Data type |           
| ------------- |:-------------:| 
| title     | VARCHAR(128) |
| content     |  TEXT    |
| category | VARCHAR(60)       |
| tags | VARCHAR\[](60)     |




## Tech Stack && Installation
- [Node.js](https://nodejs.org/en)
- [PostgreSQL](https://www.postgresql.org/download/)

## Usage
To clone this application enter the following command:
```
git clone https://github.com/JORUNOJOSTAR/Blogging-Platform-API.git
```

## .env and sql file
Use .env.example after renaming it to .env. 

You can also create table with query.sql .

## After cloning

Enter the following command in the terminal to run the app:

```
npm i
```

Finally,

```
node index.js
```

## Result
You can check the api with POSTMAN.

