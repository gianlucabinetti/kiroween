# Skeleton Core - Requirements Document

## Introduction

The Skeleton Core is the foundational layer of Grimoire Stack, providing reusable components, authentication, database models, and layout structures that can be shared across multiple applications. It enables rapid development of new SaaS applications by eliminating common boilerplate.

## Glossary

- **Skeleton Core**: The shared library containing reusable UI components, hooks, utilities, and base database models
- **Application**: A specific product built on top of Skeleton Core (e.g., Haunted Tasks, Coven CRM)
- **User**: An individual who can authenticate and access applications
- **Organization**: A group or team that contains multiple users
- **Membership**: The relationship between a User and an Organization, including their role
- **Layout Shell**: The outer structure of the application including navigation, sidebar, and content area
- **Magic Link**: A passwordless authentication method using email links

## Requirements

### Requirement 1: User Authentication

**User Story:** As a developer building an app, I want a simple authentication system, so that users can securely access the application without complex setup.

#### Acceptance Criteria

1. WHEN a user provides their email address THEN the system SHALL send a magic link to that email
2. WHEN a user clicks a valid magic link THEN the system SHALL authenticate the user and create a session
3. WHEN a user's session expires THEN the system SHALL redirect them to the login page
4. WHEN an authenticated user visits the app THEN the system SHALL load their profile and organization data
5. WHEN a user logs out THEN the system SHALL clear their session and redirect to the login page

### Requirement 2: Organization Management

**User Story:** As a user, I want to belong to an organization, so that I can collaborate with team members and share data.

#### Acceptance Criteria

1. WHEN a new user signs up THEN the system SHALL create a default organization for that user
2. WHEN a user is invited to an organization THEN the system SHALL create a membership record linking the user to that organization
3. WHEN a user belongs to multiple organizations THEN the system SHALL allow the user to switch between them
4. WHEN viewing organization data THEN the system SHALL only show data belonging to the current organization
5. WHEN a user has no organization THEN the system SHALL prompt them to create or join one

### Requirement 3: Role-Based Access

**User Story:** As an organization owner, I want to assign roles to members, so that I can control who can perform administrative actions.

#### Acceptance Criteria

1. WHEN a membership is created THEN the system SHALL assign a role (OWNER, ADMIN, or MEMBER)
2. WHEN a user performs an administrative action THEN the system SHALL verify they have OWNER or ADMIN role
3. WHEN a MEMBER attempts an admin action THEN the system SHALL deny the request and return an error
4. WHEN the organization creator signs up THEN the system SHALL assign them the OWNER role
5. WHEN displaying UI elements THEN the system SHALL hide admin features from users without appropriate roles

### Requirement 4: Layout Shell Components

**User Story:** As a developer, I want pre-built layout components, so that I can quickly structure my application with consistent navigation.

#### Acceptance Criteria

1. WHEN an application renders THEN the system SHALL provide a Sidebar component with navigation links
2. WHEN an application renders THEN the system SHALL provide a Navbar component with user profile and organization switcher
3. WHEN the viewport is below tablet size THEN the system SHALL collapse the sidebar into a hamburger menu
4. WHEN a user clicks a navigation link THEN the system SHALL highlight the active route
5. WHEN the layout renders THEN the system SHALL apply the dark theme from the style guide

### Requirement 5: Reusable UI Components

**User Story:** As a developer, I want a library of pre-styled UI components, so that I can build interfaces quickly without writing CSS.

#### Acceptance Criteria

1. WHEN importing from skeleton-core THEN the system SHALL provide Button, Card, Input, Modal, and Table components
2. WHEN a component is rendered THEN the system SHALL apply styles consistent with the UI style guide
3. WHEN a component receives a className prop THEN the system SHALL merge it with default styles
4. WHEN a Button is clicked THEN the system SHALL provide visual feedback with hover and active states
5. WHEN a Modal is opened THEN the system SHALL trap focus and allow closing with Escape key

### Requirement 6: Data Models and Database Schema

**User Story:** As a developer, I want base database models, so that I don't have to recreate common entities for each app.

#### Acceptance Criteria

1. WHEN the database is initialized THEN the system SHALL create User, Organization, and Membership tables
2. WHEN a model is created THEN the system SHALL automatically set createdAt and updatedAt timestamps
3. WHEN a User is deleted THEN the system SHALL cascade delete their Memberships
4. WHEN an Organization is deleted THEN the system SHALL cascade delete all associated Memberships
5. WHEN querying data THEN the system SHALL provide a Prisma client configured for the database

### Requirement 7: React Hooks for Common Patterns

**User Story:** As a developer, I want reusable React hooks, so that I can implement common functionality without duplication.

#### Acceptance Criteria

1. WHEN using useLocalStorage THEN the system SHALL persist state to localStorage and sync across tabs
2. WHEN using useDebounce THEN the system SHALL delay updating the value until the specified timeout
3. WHEN using useMediaQuery THEN the system SHALL return whether the media query matches and update on resize
4. WHEN using useToast THEN the system SHALL display temporary notification messages
5. WHEN a hook encounters an error THEN the system SHALL handle it gracefully without crashing

### Requirement 8: API Route Patterns

**User Story:** As a developer, I want standardized API patterns, so that I can build consistent endpoints across applications.

#### Acceptance Criteria

1. WHEN an API route is called THEN the system SHALL verify the user is authenticated
2. WHEN an API route receives invalid data THEN the system SHALL return a 400 error with validation details
3. WHEN an API route encounters an error THEN the system SHALL return a 500 error with a safe message
4. WHEN an API route succeeds THEN the system SHALL return JSON with a consistent structure
5. WHEN an API route modifies data THEN the system SHALL verify the user has permission for that organization

### Requirement 9: Utility Functions

**User Story:** As a developer, I want common utility functions, so that I can format data and handle edge cases consistently.

#### Acceptance Criteria

1. WHEN formatting a date THEN the system SHALL provide functions for relative time and standard formats
2. WHEN combining CSS classes THEN the system SHALL provide a utility that handles conditional classes
3. WHEN validating data THEN the system SHALL provide Zod schemas for common patterns
4. WHEN generating IDs THEN the system SHALL provide a function for creating unique identifiers
5. WHEN handling errors THEN the system SHALL provide a function to extract safe error messages

### Requirement 10: Activity Feed Placeholder

**User Story:** As a developer, I want a basic activity logging system, so that I can track important events in my application.

#### Acceptance Criteria

1. WHEN an important action occurs THEN the system SHALL provide a function to log the activity
2. WHEN logging an activity THEN the system SHALL record the user, organization, action type, and timestamp
3. WHEN querying activities THEN the system SHALL return them ordered by most recent first
4. WHEN displaying activities THEN the system SHALL provide a component to render the activity feed
5. WHEN an activity is created THEN the system SHALL store it in the Activity table

## Non-Goals (Hackathon Scope)

The following features are explicitly out of scope for the initial hackathon version:

- **Payment processing** - No Stripe integration or billing
- **Email service** - Magic links will be logged to console instead of sent
- **File uploads** - No S3 or file storage integration
- **Real-time features** - No WebSockets or live updates
- **Advanced permissions** - Only basic role-based access (OWNER, ADMIN, MEMBER)
- **Multi-tenancy isolation** - Basic organization filtering, not true multi-tenant architecture
- **Comprehensive testing** - Focus on core functionality, not 100% test coverage
- **Production deployment** - Optimized for local development only

## Stretch Features (If Time Permits)

- **Theme customization** - Allow organizations to customize accent colors
- **Audit log** - More detailed tracking of all data changes
- **Invitation system** - Email invites to join organizations
- **User preferences** - Store per-user settings like sidebar collapsed state
- **Search functionality** - Global search across entities
