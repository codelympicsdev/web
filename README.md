# codelympics.dev

codelympics.dev is a platform for developers to solve coding challenges.

View the site [here](https://codelympics.dev).

## Architecture

codelympics.dev consists of three parts main pieces. These link together to form the entire platform.

### Frontend

- Used to view challenges, submit answers and view results
- Static single page progressive web app that pulls data from the public API
- Written in TS/React

### Public API

- Handles auth
- Used to send and recieve data from and to the user
- Submit challenge answers and view results via this endpoint
- Proxies and deals with the "Challenge Executor"
- Written in Go with GraphQL endpoint for data and REST for auth

### Challenge Executor

- Compiles user challenge responses (in clean container environment)
- Runs the challenge response and collects results (in clean container environment)
- Checks if results match expected output
- Written in Go. Uses Docker for container envs
