# codelympics.dev

codelympics.dev is a platform for developers to solve coding challenges.

View the site [here](https://codelympics.dev).

## Architecture

codelympics.dev consists of three parts main pieces. These link together to form the entire platform.

### Frontend

- Used to view challenges, manage responses and view results
- Static SPA progressive web app that pulls data from the public API
- Written in TS/React

### Public API

- Handles auth
- Used to send and recieve data from and to the user
- Submit challenge answers and view results
- Written in Go REST endpoint for data and auth

### CLI

- User installs on their machine
- Runs their code with input from the API and sends back the results
- Written in Go and talks to API
