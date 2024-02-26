# Donation Management Application

Server for Donation Management Application using Express.

## Features

- Retrieve a list of all donations
- Retrieve details of a specific donation by ID
- Create a new donation
- Update an existing donation by ID
- Delete a donation by ID

## Before you start

1. [x] Download the code from Git-Hub : https://github.com/eliyasamary/ExpressServer
2. [x] Navigate to the project directory and start the server using the following command in the terminal - `$node index.js`
3. [x] Install dependencies as described in the package.json `npm install`.

## Instructions

1. [x] index.js – the entry point of the system
2. [x] Server - server creation for handle requests, the server listens on the specified port for incoming connections
3. [x] Router – responsible for handling incoming requests and routing to the appropriate controller function.
4. [x] Controller – contains the business logic, processes data, and generates responses based on the request.
5. [x] Repository - responsible for interacting with the data source.
6. [x] Mongo Storage - establishes a connection to a MongoDB database using Mongoose, includes asynchronous functions for performing CRUD operations.
7. [x] Data Base - MongoDB.

## Prerequisites

- Node.js installed on your machine
- `npm` (Node Package Manager) to install dependencies

## How to Use

1. ### **Retrieve all donations:**
   - Method: GET
   - Request: http://localhost:8080/donations/
2. ### **Retrieve details of a specific donation by ID:**
   - Method: GET
   - Request: http://localhost:8080/donations/:id
   - Note: receives id in params (PATH VARIABLES)
3. ### **Create a new donation:**
   - Method: POST
   - Request: http://localhost:8080/donations/
   - Note: receives donation (id, donorName, amount, location) in the req body
4. ### **Update an existing donation:**
   - Method: PUT
   - Request: http://localhost:8080/donations/:id
   - Note: receives id in params (PATH VARIABLES) and what to update in the req body (donorName, amount, location)
5. ### **Delete a donation:**
   - Method: DELETE
   - Request: http://localhost:8080/donations/:id
   - Note: receives id in params (PATH VARIABLES)

## Documentation

> **Postman** > https://documenter.getpostman.com/view/31981459/2s9YyzeJpL
