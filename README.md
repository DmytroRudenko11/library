# Library API

This is a REST API for managing a list of books. The application allows various operations such as adding, updating, deleting books, as well as user authentication and accessing Swagger documentation for the API.

## Running the Project

1. Make sure you have Node.js and npm installed.

2. Clone the repository:

   ```bash
   git clone https://github.com/DmytroRudenko11/library.git
   ```

3. Navigate to the project directory:

   ```bash
   cd library
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the project in development mode:

   ```bash
   npm run dev
   ```

   This will start the server at `http://localhost:3030`.

## Docker Compose (for development mode without MariaDB)

If you don't have MariaDB or want to run the project using Docker Compose, you can use the `docker-compose.yaml` file. This file sets up an environment with Node.js and a MariaDB database image.

1. Install Docker and Docker Compose.

2. Start the project using Docker Compose:

   ```bash
   docker-compose up
   ```

   The application will be available at `http://localhost:3030`.

## Accessing Swagger

Swagger documentation for the API is available at the following URL:

http://localhost:3030/api-docs

## Endpoints

### Authentication

- POST `/auth/signup`: Register a new user.
- POST `/auth/signin`: Sign in a user and get a JWT token.

### Books

- GET `/books`: Get a list of all books.
- GET `/books/:id`: Get information about a book by ID.
- POST `/books`: Create a new book.
- PUT `/books/:id`: Update information about a book by ID.
- DELETE `/books/:id`: Delete a book by ID.

## Dependencies

- @prisma/client: ^5.12.1
- bcrypt: ^5.1.1
- cors: ^2.8.5
- dotenv: ^16.4.5
- express: ^4.19.2
- joi: ^17.12.3
- jsonwebtoken: ^9.0.2
- swagger-ui-express: ^5.0.0
- winston: ^3.13.0
