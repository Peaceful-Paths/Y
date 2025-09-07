# Peaceful Paths - Wellness Platform

## Overview

Peaceful Paths is a wellness platform that curates content to help users find inner peace through three main categories: peaceful music collections, meditation practices, and community-driven peaceful actions. The application serves as a centralized hub for discovering mindfulness resources, from ambient soundscapes and guided meditations to environmental and community initiatives.

The platform focuses on creating a serene user experience with carefully designed peaceful aesthetics, earth-tone color schemes, and intuitive navigation. Users can browse featured content, explore different categories within each wellness domain, and access external resources for deeper engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built as a React Single Page Application (SPA) using Vite as the build tool and development server. The application follows a component-based architecture with the following key decisions:

- **UI Framework**: Uses shadcn/ui components built on Radix UI primitives for accessible, customizable interface elements
- **Styling**: Tailwind CSS for utility-first styling with custom CSS variables for theming and peaceful color palette
- **State Management**: TanStack Query (React Query) for server state management, eliminating the need for additional global state solutions
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod resolvers for form validation

The component structure separates concerns with dedicated sections for music, meditation, actions, hero content, and shared UI components.

### Backend Architecture
The backend uses Express.js as a lightweight REST API server with the following architectural choices:

- **API Design**: RESTful endpoints organized around three main resources (music collections, meditation practices, peaceful actions)
- **Storage Layer**: Abstracted storage interface (IStorage) currently implemented with in-memory storage (MemStorage) for development, designed to easily swap for database implementations
- **Development Setup**: Vite middleware integration for seamless development experience with hot module replacement
- **Error Handling**: Centralized error handling middleware with consistent JSON error responses

### Data Storage Solutions
The application uses a layered data access approach:

- **Database ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Schema Design**: Three main entities (musicCollections, meditationPractices, peacefulActions) with consistent structure including featured flags, categorization, and external resource URLs
- **Current Implementation**: In-memory storage for development with sample data initialization
- **Migration Support**: Drizzle migrations setup for database schema evolution

### Authentication and Authorization
Currently, the application does not implement authentication or authorization mechanisms. The platform appears designed for public access to wellness content without user accounts or personalized features.

### Design System and Theming
The application implements a comprehensive design system with:

- **Color Palette**: Earth tones and soft pastels optimized for peaceful user experience
- **Typography**: Multiple font families including Geist, DM Sans, Fira Code, and Architects Daughter
- **Component Variants**: Consistent button, card, and input styling across the application
- **Responsive Design**: Mobile-first approach with responsive grid layouts and navigation

## External Dependencies

### Core Framework Dependencies
- **React 18** with TypeScript for type-safe component development
- **Vite** for fast development builds and optimized production bundling
- **Express.js** for backend API server implementation

### Database and ORM
- **Drizzle ORM** for type-safe database operations and schema management
- **@neondatabase/serverless** for PostgreSQL database connectivity
- **Drizzle-kit** for database migrations and schema management

### UI and Styling
- **shadcn/ui component library** built on Radix UI primitives for accessible components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Lucide React** for consistent iconography throughout the application
- **Class Variance Authority** for component variant management

### State Management and Data Fetching
- **TanStack React Query** for server state management, caching, and synchronization
- **React Hook Form** with **@hookform/resolvers** for form handling and validation
- **Zod** for runtime type validation and schema definition

### Development and Build Tools
- **TypeScript** for static type checking across the entire codebase
- **ESBuild** for fast production builds of the server code
- **PostCSS** with Autoprefixer for CSS processing and browser compatibility

### Routing and Navigation
- **Wouter** for lightweight client-side routing without the overhead of React Router

The application is structured to easily accommodate future enhancements like user authentication, database integration, and additional wellness content categories while maintaining clean separation of concerns and type safety throughout the stack.