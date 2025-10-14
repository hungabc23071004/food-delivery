# Copilot Instructions for Food Delivery Monorepo

## Overview

This repository contains a monorepo for a food delivery platform, split into two main projects:

- **Food_Delivery_Fe/**: Frontend (React + Vite, Tailwind CSS)
- **Online-Food-Ordering/**: Backend (Java, Spring Boot, Maven)

## Architecture & Data Flow

- **Frontend** communicates with the backend via REST APIs (see `src/api/` in the frontend).
- **Backend** exposes endpoints and manages business logic, data persistence, and integrations.
- Shared data models and DTOs are defined in the backend and mapped to frontend API responses.

## Key Workflows

### Frontend (Food_Delivery_Fe)

- **Development**: `npm run dev` (starts Vite dev server)
- **Build**: `npm run build`
- **Lint**: `npm run lint` (uses ESLint, see `eslint.config.js`)
- **Preview**: `npm run preview`
- **Entry Point**: `src/main.jsx` (uses React Router)
- **API Layer**: All API calls are organized in `src/api/`
- **Component Structure**: Components are grouped by feature/domain in `src/components/` (e.g., `AdminShop/`)
- **Styling**: Tailwind CSS (`index.css`, `tailwind.config.js`)
- **Routing**: Managed in `App.jsx` and `pages/`

### Backend (Online-Food-Ordering)

- **Build/Test**: Use Maven wrapper: `./mvnw clean install` (or `mvnw.cmd` on Windows)
- **Run**: `./mvnw spring-boot:run`
- **Config**: Main config in `src/main/resources/application.properties`
- **Source Structure**: Java code in `src/main/java/com/hung/`, resources in `src/main/resources/`
- **DTOs, Entities, Controllers, Services**: Standard Spring Boot layering under `com.hung.*`
- **Code Generation**: Uses MapStruct for mapping (see annotation processing in `pom.xml`)
- **Testing**: Tests in `src/test/java/com/hung/`

## Project-Specific Conventions

- **Frontend**:
  - Use functional React components and hooks.
  - API endpoints are abstracted in `src/api/` modules.
  - Use Tailwind utility classes for styling; avoid custom CSS unless necessary.
  - Use ESLint rules as defined in `eslint.config.js` (e.g., ignore unused vars starting with uppercase or underscore).
- **Backend**:
  - Use Lombok for boilerplate reduction in entities and DTOs.
  - Use MapStruct for DTO/entity mapping (see `pom.xml` and annotation processor config).
  - Organize code by domain: `controller`, `service`, `repository`, `dto`, `entity`.
  - Configuration via `application.properties`.

## Integration Points

- **Frontend ↔ Backend**: All cross-system communication is via REST APIs. See `src/api/` in frontend and `controller` classes in backend.
- **WebSocket/Real-time**: If present, look for `sockjs-client` and `stompjs` usage in frontend dependencies.

## Examples

- **Add a new API call**: Create a new module in `src/api/`, export functions, and use them in components.
- **Add a new backend endpoint**: Add a method in a `@RestController` class, update DTOs and services as needed.

## References

- Frontend entry: `Food_Delivery_Fe/src/main.jsx`, `App.jsx`, `api/`
- Backend entry: `Online-Food-Ordering/src/main/java/com/hung/`
- Build/test: `Food_Delivery_Fe/package.json`, `Online-Food-Ordering/pom.xml`

---

For any unclear or missing conventions, please request clarification or examples from the maintainers.
