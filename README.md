# thiio-test

## User Management System

### Table of Contents
- [Objective](#objective)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Authentication and Security](#authentication-and-security)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Continuous Integration and Deployment (CI/CD)](#continuous-integration-and-deployment-cicd)
- [Architectural Decisions](#architectural-decisions)
- [TDD Implementation](#tdd-implementation)
- [API Collection](#api-collection)
- [Important Note](#important-note)

### Objective
Develop a robust web application for managing user accounts, including registration, login, viewing, editing, and deleting user profiles.

### Features
- User registration and login using OAuth (GitHub, Google)
- View, edit, and delete user profiles
- Secure API endpoints with JWT authentication
- Auto scalable production ready api and app.

### Technology Stack
- Backend: PHP/Laravel, Laravel Sanctum for JWT
- Frontend: Vue.js with Vuetify, Nuxt.js
- Database: SQLite (local), MySQL (production)
- Authentication: OAuth (GitHub, Google)
- State Management: Pinia
- Validation: Zod.js (frontend)
- Deployment: AWS Lambda via Bref.sh, Deno Deploy (frontend)
- CI/CD: GitHub Actions

### API Endpoints
- `GET /oauth/[github|google]/redirect`: Initiate OAuth flow
- `GET /oauth/[github|google]/callback`: OAuth callback
- `GET /api/logout`: Logout and token invalidation
- `GET /api/user`: Fetch current user from token
- `GET /api/users`: List users with pagination
- `POST /api/users`: Create user (fails if exists)
- `PATCH /api/users`: Update user by email (name only)
- `DELETE /api/users`: Delete user by email

### Setup Instructions
1. Clone the repository from GitHub `git clone git@github.com:fro-profesional/thiio-test.git`
2. Backend setup:
   - Navigate to the backend directory `cd api`
   - Install dependencies with `composer install`.
   - Copy `.env.local` to `.env` to configure database and OAuth settings.
   - Run `php artisan migrate` to set up the database schema.
   - Start the development server with `php artisan serve`.
3. Frontend setup:
   - Navigate to the frontend directory `cd app`
   - Install dependencies with `npm install`.
   - Copy `.env.local` to `.env` and configure API endpoints.
   - Run `npm run dev` to start the Nuxt.js development server.

### Running Tests
- Execute `php artisan test` for backend tests (PHPUnit).
- Frontend tests can be run with `npm test`.

### Deployment
- Backend deployed to AWS Lambda using Bref.sh - [https://fhab28ujil.execute-api.us-east-1.amazonaws.com](https://fhab28ujil.execute-api.us-east-1.amazonaws.com)
- Frontend deployed to Deno Deploy - [https://fro-thiio.deno.dev/](https://fro-thiio.deno.dev/)

### Authentication and Security
To enhance the security and simplify the authentication process, the client-side JavaScript never has access to the JWT directly. The authentication flow is as follows:
- The user initiates the OAuth flow by clicking on the redirect button, which directs them to the backend.
- The backend then redirects to the OAuth provider.
- After authentication, the OAuth provider calls the backend's callback URL.
- The backend then redirects to the frontend application with the JWT included in the query parameters.

Upon receiving the JWT, the frontend application:
- Sets the JWT as an HTTP-only, SameSite cookie to add an extra layer of security.
- The frontend then strips the JWT from the query string to prevent exposure through URLs.

This ensures that the actual API is never directly exposed to the user. The frontend application communicates with its own Nuxt backend-for-frontend (BFF), which:
- Retrieves the JWT securely from the HTTP-only, SameSite cookie.
- The BFF then uses the token to make authenticated requests to the backend on behalf of the user.

This indirect flow prevents the JWT from being accessible in client-side JavaScript, mitigating the risks associated with token theft and XSS attacks.

### Continuous Integration and Deployment (CI/CD)
- GitHub Actions is configured to automate the workflow of cloning the repository, installing dependencies, running tests, and deploying to AWS Lambda and Deno Deploy.
- On each pull request, tests are run to ensure that the new code integrates without issues.
- Automated deployment is triggered upon merge to the main branch after successful test completion. This includes:
  - Cloning the repository to the GitHub Actions runner.
  - Installing all required dependencies for both the backend and frontend.
  - Running the test suites for the backend (PHPUnit) and the frontend.
  - Upon passing all tests, deploying the backend to AWS Lambda and the frontend to Deno Deploy.
- The deployment process is fully automated to ensure that the latest version of the application is always live.

### Architectural Decisions
- Chose Laravel Sanctum for simple and secure JWT management.
- Used Nuxt.js for easy deployment and enhanced Vue.js development experience.
- OAuth for user-friendly authentication without password management.
- SQLite for easy local development setup; MySQL for scalable production deployment.
- CI/CD pipeline ensures code quality and automated deployment.
- The API is designed to work with HTTP-only, SameSite cookies to maintain a secure session.

### TDD Implementation
- Developed the API following TDD principles with PHPUnit, covering authentication, API endpoints, and user management logic.
- Frontend testing ensures component functionality.

### API Collection
The Postman collection for this API is available at `.bruno` and can be tested using [Bruno API Testing](https://www.usebruno.com/).

### Important Note
All credentials (OAuth), deployments, and resources will be deleted one week after the project submission.