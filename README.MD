# Jobs-API

A Node.js API for managing job listings with user authentication using JWT. This API includes routes for registering, logging in, and managing jobs, and uses bcryptjs for password hashing. Jobs-related routes are protected with bearer token authentication, and custom error handling is implemented for various scenarios.

## Features

### Authentication

- **Register**: Create a new user with hashed passwords.
- **Login**: Authenticate users and return a JWT for future requests.

### Jobs Management (Protected Routes)

- **Get All Jobs**: Retrieve all jobs for the authenticated user.
- **Create Job**: Add a new job.
- **Update Job**: Modify an existing job.
- **Delete Job**: Remove a job from the database.

### Error Handling

- Custom errors:
  - **UnauthenticatedError**: Triggered when a request lacks a valid token.
  - **NotFoundError**: Triggered when a route is not found.
  - **BadRequestError**: Triggered when a request has invalid or missing data.
- Validation errors: Automatically handled by Mongoose schema validation.
- **Duplicate Email Error**: Handled when a user tries to register with an email that already exists.
- **Mongoose Cast Error**: Properly managed when an invalid MongoDB ObjectId is used.

## Technologies Used

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for handling routes and server logic.
- **MongoDB**: NoSQL database for storing user and job data.
- **Mongoose**: Object modeling for MongoDB in Node.js.
- **JWT (JSON Web Tokens)**: For authentication and protecting routes.
- **bcryptjs**: For hashing and verifying passwords.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) running locally or using a MongoDB cloud service (e.g., MongoDB Atlas).

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/l04i/jobs-api.git
    cd jobs-api
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:
      ```
      PORT=3000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      JWT_LIFETIME=1d
      ```

4. Start the application:
    ```bash
    npm start
    ```

5. Access the API:
   - Use Postman or similar tools to interact with the API at `http://localhost:3000/api/v1`.

## API Endpoints

### Authentication

| Method | Endpoint          | Description           |
|--------|-------------------|-----------------------|
| POST   | `/api/v1/auth/register` | Register a new user |
| POST   | `/api/v1/auth/login`    | Login a user        |

### Jobs (Protected Routes - Requires Bearer Token)

| Method | Endpoint               | Description                 |
|--------|------------------------|-----------------------------|
| GET    | `/api/v1/jobs`          | Retrieve all jobs           |
| POST   | `/api/v1/jobs`          | Create a new job            |
| PATCH  | `/api/v1/jobs/:id`      | Update an existing job      |
| DELETE | `/api/v1/jobs/:id`      | Delete a job                |

### Request Headers

To access protected routes, include the following header with your requests:
```bash
Authorization: Bearer <your_jwt_token>
