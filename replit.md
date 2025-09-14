# FloatChat - AI-Powered Ocean Data Explorer

## Overview
FloatChat is an AI-powered conversational interface for ARGO ocean data. It combines a React TypeScript frontend with a Node.js Express backend to provide intelligent chat interactions about ocean data, real-time data queries, and stunning visualizations. The application serves as a bridge between complex oceanographic datasets and researchers, offering natural language processing capabilities to make ocean data more accessible.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built as a Single Page Application (SPA) using:
- **React 18** with TypeScript for type safety and modern development
- **Vite** as the build tool for fast development and optimized production builds
- **Tailwind CSS** with custom ocean-themed design system for styling
- **Shadcn/ui** component library for consistent UI components
- **React Router** for client-side routing
- **TanStack Query** for server state management and caching
- **Custom theming** with ocean-inspired color palette and gradients

The frontend follows a component-based architecture with reusable UI components, custom hooks for business logic, and a centralized API layer for backend communication.

### Backend Architecture
The backend is structured as a RESTful API using:
- **Express.js** as the web framework
- **MongoDB** with Mongoose ODM for data persistence
- **JWT-based authentication** with secure token management
- **Layered architecture** with controllers, services, and middleware separation
- **Winston logging** for comprehensive application logging
- **Express middleware stack** including CORS, security headers, rate limiting, and validation

### Authentication & Authorization
- **JWT tokens** with configurable expiration (default 24 hours)
- **bcryptjs** for password hashing with configurable salt rounds
- **Middleware-based route protection** for secure endpoints
- **User session management** with profile and preference storage

### Data Storage & Models
MongoDB collections are designed for:
- **User management** with profiles, preferences, and subscription tiers
- **Chat sessions** with message history and metadata
- **ARGO profile data** with indexed fields for efficient querying
- **Optimized indexes** on frequently queried fields (coordinates, time, measurements)

### Security Implementation
- **Helmet.js** for security headers and CSP configuration
- **CORS** with configurable origins for cross-domain requests
- **Rate limiting** with different tiers for authentication, chat, and general API usage
- **Input validation** using express-validator with custom schemas
- **Error handling** with sanitized responses and comprehensive logging

### API Design
RESTful API structure with dedicated route modules:
- `/api/auth` - Authentication and user management
- `/api/chat` - AI chat interactions and session management  
- `/api/users` - Profile management and user preferences
- `/api/images` - Image search and management via Unsplash integration
- `/api/query` - Natural language to MongoDB query translation

## External Dependencies

### Third-Party Services
- **Unsplash API** for ocean-related imagery and profile pictures
- **MongoDB Atlas** (configured) for cloud database hosting
- **JWT** for stateless authentication tokens

### Development Tools
- **Nodemon** for backend development with auto-restart
- **ESLint** with TypeScript configuration for code quality
- **PostCSS** with Tailwind CSS for advanced styling capabilities
- **Vite proxy** for seamless frontend-backend communication during development

### UI Libraries
- **Radix UI** primitives for accessible, unstyled components
- **Lucide React** for consistent iconography
- **Recharts** for data visualization and charts
- **Sonner** and custom toast system for user notifications

### Deployment Configuration
- **Replit-optimized** with specific host configurations and CORS settings
- **Environment-based** configuration with development and production modes
- **Graceful shutdown** handling with proper cleanup procedures