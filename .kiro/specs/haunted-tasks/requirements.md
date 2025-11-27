# Haunted Tasks - Requirements Document

## Introduction

Haunted Tasks is a spooky team task management application built on Grimoire Stack's Skeleton Core. It provides a fun, Halloween-themed interface for managing projects, tasks, and team workflows with a dark, gothic aesthetic.

## Glossary

- **Board**: A collection of tasks organized by status, similar to a Kanban board
- **Task**: A unit of work with a title, description, assignee, and status
- **Tag**: A label that can be applied to tasks for categorization (e.g., "bug", "feature", "urgent")
- **Status**: The current state of a task in the workflow
- **Assignee**: The user responsible for completing a task
- **Priority**: The importance level of a task (Low, Medium, High, Critical)
- **Summoned**: Initial status when a task is created
- **In Ritual**: Status when work is actively being done
- **Banished**: Status when a task is completed

## Requirements

### Requirement 1: Task Creation and Management

**User Story:** As a team member, I want to create and manage tasks, so that I can track work that needs to be done.

#### Acceptance Criteria

1. WHEN a user creates a task THEN the system SHALL require a title and default the status to "Summoned"
2. WHEN a user creates a task THEN the system SHALL allow optional description, assignee, priority, and tags
3. WHEN a user updates a task THEN the system SHALL save the changes and update the updatedAt timestamp
4. WHEN a user deletes a task THEN the system SHALL remove it from the database and update the board view
5. WHEN a task is created THEN the system SHALL associate it with the current organization

### Requirement 2: Task Status Workflow

**User Story:** As a team member, I want to move tasks through different statuses, so that I can track progress on work.

#### Acceptance Criteria

1. WHEN a task is created THEN the system SHALL set its status to "Summoned"
2. WHEN a user changes task status THEN the system SHALL allow transitions to "In Ritual", "Banished", or back to "Summoned"
3. WHEN a task status changes THEN the system SHALL update the task immediately and reflect in the UI
4. WHEN viewing a board THEN the system SHALL group tasks by their current status
5. WHEN a task is marked "Banished" THEN the system SHALL record the completion timestamp

### Requirement 3: Task Board View

**User Story:** As a team member, I want to see all tasks on a board, so that I can understand what work is in progress.

#### Acceptance Criteria

1. WHEN a user views the board THEN the system SHALL display tasks grouped by status in columns
2. WHEN a user drags a task THEN the system SHALL allow moving it between status columns
3. WHEN a task is dropped in a new column THEN the system SHALL update its status
4. WHEN the board loads THEN the system SHALL show task title, assignee, priority, and tags
5. WHEN there are no tasks THEN the system SHALL display a ghost emoji and "No tasks summoned yet" message

### Requirement 4: Task Filtering and Search

**User Story:** As a team member, I want to filter tasks, so that I can focus on specific work.

#### Acceptance Criteria

1. WHEN a user selects a tag filter THEN the system SHALL show only tasks with that tag
2. WHEN a user selects an assignee filter THEN the system SHALL show only tasks assigned to that user
3. WHEN a user selects a priority filter THEN the system SHALL show only tasks with that priority level
4. WHEN multiple filters are active THEN the system SHALL show tasks matching all filters
5. WHEN a user clears filters THEN the system SHALL show all tasks again

### Requirement 5: Task Details View

**User Story:** As a team member, I want to view full task details, so that I can see all information and make updates.

#### Acceptance Criteria

1. WHEN a user clicks a task THEN the system SHALL open a modal or detail view with full information
2. WHEN viewing task details THEN the system SHALL display title, description, status, assignee, priority, tags, and timestamps
3. WHEN viewing task details THEN the system SHALL allow inline editing of all fields
4. WHEN a user saves changes THEN the system SHALL update the task and close the detail view
5. WHEN a user cancels THEN the system SHALL discard changes and close the detail view

### Requirement 6: Task Assignment

**User Story:** As a team member, I want to assign tasks to people, so that everyone knows who is responsible for what.

#### Acceptance Criteria

1. WHEN creating or editing a task THEN the system SHALL show a dropdown of organization members
2. WHEN a user selects an assignee THEN the system SHALL associate that user with the task
3. WHEN a task has an assignee THEN the system SHALL display their name or avatar on the task card
4. WHEN a task has no assignee THEN the system SHALL show "Unassigned" or a ghost icon
5. WHEN filtering by assignee THEN the system SHALL include unassigned tasks as a filter option

### Requirement 7: Task Tags

**User Story:** As a team member, I want to tag tasks, so that I can categorize and filter them.

#### Acceptance Criteria

1. WHEN creating or editing a task THEN the system SHALL allow adding multiple tags
2. WHEN a user types a tag name THEN the system SHALL suggest existing tags or allow creating new ones
3. WHEN a task has tags THEN the system SHALL display them as colored badges on the task card
4. WHEN viewing the board THEN the system SHALL show all available tags for filtering
5. WHEN a tag is no longer used THEN the system SHALL optionally hide it from the filter list

### Requirement 8: Task Priority

**User Story:** As a team member, I want to set task priority, so that I can identify urgent work.

#### Acceptance Criteria

1. WHEN creating or editing a task THEN the system SHALL allow selecting priority (Low, Medium, High, Critical)
2. WHEN a task has priority set THEN the system SHALL display a visual indicator (color or icon)
3. WHEN priority is Critical THEN the system SHALL use red accent color
4. WHEN priority is High THEN the system SHALL use orange accent color
5. WHEN priority is not set THEN the system SHALL default to Medium

### Requirement 9: Spooky UI Elements

**User Story:** As a user, I want a fun Halloween-themed interface, so that using the app is enjoyable.

#### Acceptance Criteria

1. WHEN the app loads THEN the system SHALL apply the dark purple theme from the style guide
2. WHEN hovering over task cards THEN the system SHALL show a subtle purple glow effect
3. WHEN there are no tasks THEN the system SHALL display ghost emoji (👻) in empty states
4. WHEN a task is deleted THEN the system SHALL show a skull emoji (💀) in the confirmation
5. WHEN tasks load THEN the system SHALL use a fade-in animation

### Requirement 10: Quick Task Creation

**User Story:** As a team member, I want to quickly add tasks, so that I can capture ideas without interrupting my flow.

#### Acceptance Criteria

1. WHEN viewing the board THEN the system SHALL show a "Summon Task" button at the top
2. WHEN a user clicks the button THEN the system SHALL show an inline input field
3. WHEN a user types a title and presses Enter THEN the system SHALL create the task with default values
4. WHEN a user presses Escape THEN the system SHALL cancel and hide the input field
5. WHEN a task is created THEN the system SHALL clear the input and allow creating another

## Mandatory Features (Hackathon MVP)

These features MUST be implemented for the hackathon demo:

- ✅ Task CRUD operations (create, read, update, delete)
- ✅ Three-column board view (Summoned, In Ritual, Banished)
- ✅ Task status transitions
- ✅ Basic task details (title, description, status)
- ✅ Task assignment to users
- ✅ Priority levels with visual indicators
- ✅ Spooky dark theme with purple accents
- ✅ Empty states with ghost emoji
- ✅ Responsive layout (mobile-friendly)

## Stretch Features (If Time Permits)

- **Drag-and-drop** - Move tasks between columns by dragging
- **Tags system** - Full tag creation and filtering
- **Advanced filtering** - Multiple filters at once
- **Task comments** - Add discussion to tasks
- **Due dates** - Set deadlines for tasks
- **Task search** - Text search across titles and descriptions
- **Bulk actions** - Select and update multiple tasks
- **Task templates** - Create tasks from predefined templates
- **Activity feed** - Show recent task changes
- **Keyboard shortcuts** - Quick actions with hotkeys

## Non-Goals

- **Time tracking** - No built-in timer or time logging
- **Gantt charts** - No timeline or dependency visualization
- **Recurring tasks** - No automated task creation
- **Subtasks** - No task hierarchy or nesting
- **File attachments** - No document uploads
- **Email notifications** - No external notifications
- **Calendar integration** - No sync with external calendars
- **Advanced permissions** - All team members have equal access to tasks
