# Rup-Projects

## Overview

Rup-Projects is a project management application designed to facilitate the organization and tracking of projects using
Rational Unified Process (RUP) methodology. The application provides a comprehensive solution for managing project
resources, timelines, and team collaboration through an intuitive web interface backed by a robust REST API.

## Stack

### Backend (rup-projects-core)

- **Java 17**
- **Spring Boot 3.2.0** - Application framework
- **Spring Data JPA** - Database access and ORM
- **Spring Cloud Hoxton.SR8** - Microservices architecture
- **Liquibase** - Database migration management
- **H2/MySQL** - Database support
- **MapStruct** - Object mapping
- **Lombok** - Boilerplate code reduction
- **Maven** - Build and dependency management

### Frontend (web-app)

- **Angular 18** - Frontend framework
- **Angular Material** - UI component library
- **RxJS** - Reactive programming
- **FullCalendar** - Calendar and scheduling
- **Bootstrap 5** - CSS framework
- **FontAwesome** - Icon library

### Testing

- **Jest** - Unit testing for frontend
- **Cypress** - E2E testing
- **JUnit & AssertJ** - Backend testing

## Running the Project Locally

### Prerequisites

- **Java 17** or higher
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Maven 3.6+**
- **MySQL** (optional - H2 is used by default for development)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd rup-projects-core
   ```

2. Build the project:
   ```bash
   ./mvnw clean install
   ```

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

   Or use the provided script:
   ```bash
   ./run-api.sh
   ```

4. The API will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The application will be available at `http://localhost:4200`

### Additional Commands

#### Frontend

- **Run tests**: `npm test`
- **Build for production**: `npm run build`
- **Run E2E tests**: `npm run cy:run`
- **Lint**: `npm run lint`

#### Backend

- **Run tests**: `./mvnw test`
- **Package**: `./mvnw package`

## Running with Docker

### Prerequisites

- **Docker** and **Docker Compose** installed on your system

### Quick Start with OCI Artifact (Recommended)

The easiest way to run the application is using the pre-built OCI artifact from Docker Hub:

```bash
docker compose -f oci://rupprojectstile392/rup-projects-compose:latest up -d
```

This single command will:
- Pull the compose file as an OCI artifact
- Pull the latest application image
- Start both frontend and backend services
- Expose the application on ports 80 and 8080

Access the application:
- **Frontend**: `http://localhost`
- **Backend API**: `http://localhost:8080`

To stop the application:
```bash
docker compose down
```

### Alternative: Build and Run Locally

1. Build the frontend:
   ```bash
   cd web-app
   npm install
   npm run build
   cd ..
   ```

2. Build the backend:
   ```bash
   cd rup-projects-core
   ./mvnw clean package
   cd ..
   ```

3. Run with Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Access the application:
   - **Frontend**: `http://localhost`
   - **Backend API**: `http://localhost:8080`

5. Stop the application:
   ```bash
   docker-compose down
   ```

### Alternative: Using Docker Image Directly

You can also pull and run the pre-built image directly:

```bash
docker pull rupprojectstile392/rup-projects:latest
docker run -p 80:80 -p 8080:8080 rupprojectstile392/rup-projects:latest
```

### Docker Setup Details

The Docker setup:
- Serves the Angular frontend via Nginx on port 80
- Runs the Spring Boot backend on port 8080
- Automatically proxies API requests from `/api/` to the backend
- Uses Java 17 with Eclipse Temurin runtime

### Notes

- The application uses H2 in-memory database by default
- To use MySQL, you can extend the docker-compose setup or modify the application properties
- Frontend and backend run in the same container for simplified deployment

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.
