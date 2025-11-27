# Grimoire Stack MCP Server

A Model Context Protocol (MCP) server that provides app blueprints and theme tokens for building new apps on Grimoire Stack.

## 🎯 Purpose

This MCP server helps developers:

1. **Get Theme Tokens** - Access consistent design tokens (colors, spacing, typography)
2. **Generate App Blueprints** - Get structured templates for new apps
3. **Validate Structure** - Check if apps follow Grimoire Stack patterns

## 🛠️ Available Tools

### 1. `get_theme_tokens`

Get Grimoire Stack theme tokens for consistent styling.

**Parameters:**

- `category` (optional): Filter by category
  - `colors` - Color palette
  - `spacing` - Spacing scale
  - `typography` - Font settings
  - `effects` - Glow effects and transitions
  - `all` - Everything (default)

**Example Response:**

```json
{
  "colors": {
    "background": {
      "base": "#1a0f1f",
      "surface": "#251628",
      "elevated": "#2f1d32"
    },
    "accent": {
      "purple": "#9d5bd2",
      "orange": "#f97316",
      "green": "#16a34a"
    }
  }
}
```

### 2. `get_app_blueprint`

Get a blueprint for a new app that can be built on Grimoire Stack.

**Parameters:**

- `app_type` (required): Type of app
  - `inventory-tracker` - Haunted Inventory app
  - `event-planner` - Coven Events app
  - `knowledge-base` - Grimoire Wiki app
  - `list-all` - See all available blueprints

**Example Response:**

```json
{
  "name": "Haunted Inventory",
  "description": "Track mystical items and artifacts",
  "emoji": "📦",
  "port": 3002,
  "entities": [...],
  "pages": [...],
  "features": [...],
  "workflow": {
    "stages": ["In Stock", "Low Stock", "Out of Stock"],
    "emojis": ["📦", "⚠️", "❌"]
  }
}
```

### 3. `validate_app_structure`

Validate if an app follows Grimoire Stack patterns.

**Parameters:**

- `app_name` (required): Name of app to validate
- `check_type` (optional): What to validate
  - `imports` - Check skeleton-core imports
  - `structure` - Check file structure
  - `theme` - Check theme usage
  - `all` - All checks (default)

**Example Response:**

```json
{
  "app_name": "haunted-tasks",
  "checks": {
    "imports": { "status": "pass" },
    "structure": { "status": "pass" },
    "theme": { "status": "pass" }
  },
  "overall": "pass"
}
```

## 📦 Installation

### Prerequisites

- Python 3.10+
- `uv` package manager (recommended) or `pip`

### Install with uv

```bash
# Install uv if you haven't
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install MCP server
cd mcp/grimoire-blueprints
uv pip install -r requirements.txt
```

### Install with pip

```bash
cd mcp/grimoire-blueprints
pip install -r requirements.txt
```

## ⚙️ Configuration

Add to your Kiro MCP configuration (`.kiro/settings/mcp.json`):

```json
{
  "mcpServers": {
    "grimoire-blueprints": {
      "command": "python",
      "args": ["mcp/grimoire-blueprints/server.py"],
      "disabled": false,
      "autoApprove": ["get_theme_tokens", "get_app_blueprint"]
    }
  }
}
```

Or use `uvx` for automatic dependency management:

```json
{
  "mcpServers": {
    "grimoire-blueprints": {
      "command": "uvx",
      "args": ["--from", "mcp", "python", "mcp/grimoire-blueprints/server.py"],
      "disabled": false
    }
  }
}
```

## 🎬 Usage Examples

### In Kiro Chat

**Get theme tokens:**

```
Use the grimoire-blueprints MCP to get all theme tokens
```

**Get specific colors:**

```
Use grimoire-blueprints to get just the color tokens
```

**List available app blueprints:**

```
Use grimoire-blueprints to list all available app blueprints
```

**Get a specific blueprint:**

```
Use grimoire-blueprints to get the inventory-tracker blueprint
```

**Validate an app:**

```
Use grimoire-blueprints to validate the haunted-tasks app structure
```

### Practical Use Cases

#### 1. Building a New App

```
I want to build a new inventory tracking app on Grimoire Stack.
Use grimoire-blueprints to get the inventory-tracker blueprint,
then help me scaffold the basic structure.
```

The MCP will return:

- Entity models (Item, Category)
- Page routes
- Feature list
- Workflow stages

#### 2. Ensuring Theme Consistency

```
I'm styling a new component. Use grimoire-blueprints to get
the theme tokens so I can use the correct colors and spacing.
```

The MCP will return all design tokens to ensure consistency.

#### 3. Validating Architecture

```
Check if my new app follows Grimoire Stack patterns.
Use grimoire-blueprints to validate the app structure.
```

The MCP will verify imports, structure, and theme usage.

## 📊 Available Blueprints

### 1. Haunted Inventory (inventory-tracker)

Track mystical items and artifacts in your collection.

**Entities**: Item, Category
**Features**: CRUD, filtering, search, low stock alerts
**Workflow**: In Stock → Low Stock → Out of Stock → Archived

### 2. Coven Events (event-planner)

Plan and manage mystical gatherings and rituals.

**Entities**: Event, Attendee
**Features**: Event management, RSVP tracking, calendar view
**Workflow**: Planning → Scheduled → In Progress → Completed

### 3. Grimoire Wiki (knowledge-base)

Document and organize mystical knowledge and spells.

**Entities**: Article
**Features**: Markdown support, full-text search, tagging
**Workflow**: Draft → Review → Published → Archived

## 🔧 Development

### Run Locally

```bash
cd mcp/grimoire-blueprints
python server.py
```

### Test with MCP Inspector

```bash
npx @modelcontextprotocol/inspector python server.py
```

## 🎃 Integration with Grimoire Stack

This MCP server is designed specifically for Grimoire Stack and provides:

- **Theme tokens** matching `ui-style.md`
- **App blueprints** following `structure.md` patterns
- **Validation** against `tech.md` standards

## 📚 Resources

- [MCP Documentation](https://modelcontextprotocol.io)
- [Grimoire Stack Docs](../../README.md)
- [Steering Docs](../../.kiro/steering/)

---

🎃 Built for Kiroween Hackathon 👻
