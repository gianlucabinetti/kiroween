# Coven CRM - Requirements Document

## Introduction

Coven CRM is a simple customer relationship management application built on Grimoire Stack's Skeleton Core. It provides a Halloween-themed interface for tracking contacts, companies, and interactions with a focus on simplicity and ease of use.

## Glossary

- **Contact**: An individual person in the CRM (e.g., a client, lead, or partner)
- **Company**: An organization that contacts belong to
- **Interaction**: A record of communication or activity with a contact (e.g., email, call, meeting)
- **Stage**: The current position of a contact in the sales or relationship pipeline
- **Pipeline**: The sequence of stages a contact moves through
- **Familiar**: Stage for newly added contacts (initial contact)
- **Enchanting**: Stage for contacts being actively engaged
- **Bewitched**: Stage for contacts who are committed or converted
- **Vanished**: Stage for contacts who are lost or inactive

## Requirements

### Requirement 1: Contact Management

**User Story:** As a sales person, I want to manage contact information, so that I can keep track of people I work with.

#### Acceptance Criteria

1. WHEN a user creates a contact THEN the system SHALL require a name and email address
2. WHEN a user creates a contact THEN the system SHALL allow optional phone, company, stage, and notes
3. WHEN a user updates a contact THEN the system SHALL save changes and update the updatedAt timestamp
4. WHEN a user deletes a contact THEN the system SHALL remove it and all associated interactions
5. WHEN a contact is created THEN the system SHALL associate it with the current organization

### Requirement 2: Company Management

**User Story:** As a sales person, I want to track companies, so that I can organize contacts by their organization.

#### Acceptance Criteria

1. WHEN a user creates a company THEN the system SHALL require a company name
2. WHEN a user creates a company THEN the system SHALL allow optional website, industry, and notes
3. WHEN a user assigns a contact to a company THEN the system SHALL link them in the database
4. WHEN viewing a company THEN the system SHALL show all associated contacts
5. WHEN a company is deleted THEN the system SHALL unlink contacts but not delete them

### Requirement 3: Contact Pipeline Stages

**User Story:** As a sales person, I want to track where contacts are in my pipeline, so that I can manage my sales process.

#### Acceptance Criteria

1. WHEN a contact is created THEN the system SHALL default their stage to "Familiar"
2. WHEN a user changes contact stage THEN the system SHALL allow moving to "Enchanting", "Bewitched", or "Vanished"
3. WHEN a contact stage changes THEN the system SHALL update immediately and log the change
4. WHEN viewing contacts THEN the system SHALL display their current stage with a visual indicator
5. WHEN a contact reaches "Bewitched" THEN the system SHALL record the conversion timestamp

### Requirement 4: Contact List View

**User Story:** As a sales person, I want to see all my contacts in a list, so that I can quickly find and access them.

#### Acceptance Criteria

1. WHEN a user views the contact list THEN the system SHALL display name, email, company, and stage
2. WHEN a user clicks a contact THEN the system SHALL navigate to the contact detail view
3. WHEN the list loads THEN the system SHALL sort contacts by most recently updated first
4. WHEN there are many contacts THEN the system SHALL paginate results with 50 per page
5. WHEN there are no contacts THEN the system SHALL display "No contacts in your coven yet" with ghost emoji

### Requirement 5: Contact Detail View

**User Story:** As a sales person, I want to view full contact details, so that I can see all information and interaction history.

#### Acceptance Criteria

1. WHEN a user views contact details THEN the system SHALL display all contact fields
2. WHEN viewing contact details THEN the system SHALL show a list of all interactions with that contact
3. WHEN viewing contact details THEN the system SHALL allow inline editing of contact fields
4. WHEN a user saves changes THEN the system SHALL update the contact and show a success message
5. WHEN viewing contact details THEN the system SHALL show a button to add new interactions

### Requirement 6: Interaction Tracking

**User Story:** As a sales person, I want to log interactions with contacts, so that I can remember our conversation history.

#### Acceptance Criteria

1. WHEN a user creates an interaction THEN the system SHALL require a type (Email, Call, Meeting, Note)
2. WHEN a user creates an interaction THEN the system SHALL require a description or notes
3. WHEN a user creates an interaction THEN the system SHALL associate it with a contact and timestamp
4. WHEN viewing interactions THEN the system SHALL display them in reverse chronological order
5. WHEN an interaction is created THEN the system SHALL update the contact's updatedAt timestamp

### Requirement 7: Contact Search and Filtering

**User Story:** As a sales person, I want to search and filter contacts, so that I can find specific people quickly.

#### Acceptance Criteria

1. WHEN a user types in the search box THEN the system SHALL filter contacts by name or email
2. WHEN a user selects a stage filter THEN the system SHALL show only contacts in that stage
3. WHEN a user selects a company filter THEN the system SHALL show only contacts from that company
4. WHEN multiple filters are active THEN the system SHALL show contacts matching all criteria
5. WHEN a user clears filters THEN the system SHALL show all contacts again

### Requirement 8: Pipeline Overview

**User Story:** As a sales manager, I want to see a pipeline overview, so that I can understand the distribution of contacts across stages.

#### Acceptance Criteria

1. WHEN a user views the pipeline THEN the system SHALL display counts for each stage
2. WHEN a user views the pipeline THEN the system SHALL show contacts grouped by stage in columns
3. WHEN a user clicks a stage column THEN the system SHALL show all contacts in that stage
4. WHEN viewing the pipeline THEN the system SHALL use different colors for each stage
5. WHEN there are no contacts THEN the system SHALL show empty columns with zero counts

### Requirement 9: Quick Contact Creation

**User Story:** As a sales person, I want to quickly add contacts, so that I can capture leads without interrupting my workflow.

#### Acceptance Criteria

1. WHEN viewing the contact list THEN the system SHALL show an "Add Contact" button
2. WHEN a user clicks the button THEN the system SHALL open a modal with a contact form
3. WHEN a user fills required fields and submits THEN the system SHALL create the contact
4. WHEN a user cancels THEN the system SHALL close the modal without saving
5. WHEN a contact is created THEN the system SHALL show it in the list immediately

### Requirement 10: Company Association

**User Story:** As a sales person, I want to link contacts to companies, so that I can see organizational relationships.

#### Acceptance Criteria

1. WHEN creating or editing a contact THEN the system SHALL show a company dropdown or search
2. WHEN a user types a company name THEN the system SHALL suggest existing companies or allow creating new ones
3. WHEN a contact has a company THEN the system SHALL display the company name in the contact list
4. WHEN viewing a company THEN the system SHALL show all contacts who work there
5. WHEN a contact has no company THEN the system SHALL show "Independent" or leave blank

## Mandatory Features (Hackathon MVP)

These features MUST be implemented for the hackathon demo:

- ✅ Contact CRUD operations (create, read, update, delete)
- ✅ Contact list view with search
- ✅ Contact detail view with all information
- ✅ Pipeline stages (Familiar, Enchanting, Bewitched, Vanished)
- ✅ Stage transitions and visual indicators
- ✅ Interaction logging (basic notes)
- ✅ Company association (simple linking)
- ✅ Spooky dark theme with purple accents
- ✅ Empty states with ghost emoji
- ✅ Responsive layout (mobile-friendly)

## Stretch Features (If Time Permits)

- **Pipeline board view** - Drag-and-drop contacts between stages
- **Company detail pages** - Full company profiles with contact lists
- **Interaction types** - Different icons for Email, Call, Meeting, Note
- **Contact tags** - Categorize contacts with custom labels
- **Advanced search** - Full-text search across all fields
- **Export contacts** - Download as CSV
- **Contact import** - Bulk upload from CSV
- **Activity timeline** - Visual timeline of all interactions
- **Contact merge** - Combine duplicate contacts
- **Custom fields** - Add organization-specific fields to contacts

## Non-Goals

- **Email integration** - No Gmail/Outlook sync
- **Calendar integration** - No meeting scheduling
- **Deal tracking** - No revenue or opportunity management
- **Marketing automation** - No email campaigns or sequences
- **Lead scoring** - No automated lead qualification
- **Reporting and analytics** - No charts or dashboards
- **Mobile app** - Web-only, though responsive
- **Third-party integrations** - No Zapier, webhooks, or API
- **Advanced permissions** - All team members have equal access
- **Contact deduplication** - No automatic duplicate detection
