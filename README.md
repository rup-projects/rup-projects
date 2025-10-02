# Rup-Projects

## Overview

Rup-Projects is a project management application designed to facilitate the organization and tracking of projects using Rational Unified Process (RUP) methodology. The application provides a comprehensive solution for managing project resources, timelines, and team collaboration through an intuitive web interface backed by a robust REST API.

## Stack

### Backend (rup-projects-core)
- **Java 11**
- **Spring Boot 2.3.3** - Application framework
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

- **Java 11** or higher
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

## License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.
