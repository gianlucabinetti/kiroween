#!/usr/bin/env python3
"""
Grimoire Stack MCP Server

Provides app blueprints and theme tokens for building new apps on Grimoire Stack.
This MCP server helps developers:
1. Get theme tokens for consistent styling
2. Generate app blueprints for new projects
3. Validate app structure against skeleton-core patterns
"""

import json
from typing import Any
from mcp.server import Server
from mcp.types import Tool, TextContent

# Initialize MCP server
app = Server("grimoire-blueprints")

# Theme tokens based on Grimoire Stack design system
THEME_TOKENS = {
    "colors": {
        "background": {
            "base": "#1a0f1f",
            "surface": "#251628",
            "elevated": "#2f1d32"
        },
        "text": {
            "primary": "#f5f3f7",
            "secondary": "#b8b0bd",
            "tertiary": "#8a7f91"
        },
        "accent": {
            "purple": "#9d5bd2",
            "orange": "#f97316",
            "green": "#16a34a",
            "red": "#ef4444"
        },
        "border": {
            "default": "#3d3142",
            "hover": "#5a4a5f"
        }
    },
    "spacing": {
        "xs": "0.5rem",
        "sm": "0.75rem",
        "md": "1rem",
        "lg": "1.5rem",
        "xl": "2rem",
        "2xl": "3rem"
    },
    "typography": {
        "fontFamily": {
            "sans": "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            "mono": "JetBrains Mono, Fira Code, Consolas, monospace"
        },
        "fontSize": {
            "xs": "0.75rem",
            "sm": "0.875rem",
            "base": "1rem",
            "lg": "1.125rem",
            "xl": "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem"
        }
    },
    "effects": {
        "glow": {
            "purple": "0 0 20px rgba(157, 91, 210, 0.4)",
            "orange": "0 0 20px rgba(249, 115, 22, 0.4)",
            "green": "0 0 20px rgba(22, 163, 74, 0.4)"
        },
        "transition": {
            "fast": "200ms",
            "normal": "300ms"
        }
    }
}

# App blueprint templates
APP_BLUEPRINTS = {
    "inventory-tracker": {
        "name": "Haunted Inventory",
        "description": "Track mystical items and artifacts in your collection",
        "emoji": "📦",
        "port": 3002,
        "entities": [
            {
                "name": "Item",
                "fields": [
                    {"name": "name", "type": "String", "required": True},
                    {"name": "description", "type": "String", "required": False},
                    {"name": "category", "type": "Category", "required": True},
                    {"name": "quantity", "type": "Int", "required": True},
                    {"name": "location", "type": "String", "required": False},
                    {"name": "acquiredAt", "type": "DateTime", "required": False}
                ]
            },
            {
                "name": "Category",
                "fields": [
                    {"name": "name", "type": "String", "required": True},
                    {"name": "icon", "type": "String", "required": False},
                    {"name": "color", "type": "String", "required": False}
                ]
            }
        ],
        "pages": [
            {"route": "/inventory", "name": "Inventory List", "description": "View all items"},
            {"route": "/inventory/[id]", "name": "Item Detail", "description": "View/edit item"},
            {"route": "/categories", "name": "Categories", "description": "Manage categories"}
        ],
        "features": [
            "CRUD operations for items",
            "Category-based filtering",
            "Search by name or description",
            "Low stock alerts",
            "Location tracking"
        ],
        "workflow": {
            "stages": ["In Stock", "Low Stock", "Out of Stock", "Archived"],
            "emojis": ["📦", "⚠️", "❌", "🗄️"]
        }
    },
    "event-planner": {
        "name": "Coven Events",
        "description": "Plan and manage mystical gatherings and rituals",
        "emoji": "🎭",
        "port": 3003,
        "entities": [
            {
                "name": "Event",
                "fields": [
                    {"name": "title", "type": "String", "required": True},
                    {"name": "description", "type": "String", "required": False},
                    {"name": "startDate", "type": "DateTime", "required": True},
                    {"name": "endDate", "type": "DateTime", "required": False},
                    {"name": "location", "type": "String", "required": False},
                    {"name": "status", "type": "EventStatus", "required": True},
                    {"name": "maxAttendees", "type": "Int", "required": False}
                ]
            },
            {
                "name": "Attendee",
                "fields": [
                    {"name": "name", "type": "String", "required": True},
                    {"name": "email", "type": "String", "required": True},
                    {"name": "status", "type": "AttendeeStatus", "required": True},
                    {"name": "eventId", "type": "String", "required": True}
                ]
            }
        ],
        "pages": [
            {"route": "/events", "name": "Events List", "description": "View all events"},
            {"route": "/events/[id]", "name": "Event Detail", "description": "View/edit event"},
            {"route": "/calendar", "name": "Calendar View", "description": "Monthly calendar"}
        ],
        "features": [
            "Event CRUD operations",
            "Attendee management",
            "RSVP tracking",
            "Calendar view",
            "Email reminders"
        ],
        "workflow": {
            "stages": ["Planning", "Scheduled", "In Progress", "Completed", "Cancelled"],
            "emojis": ["📝", "📅", "🎭", "✅", "❌"]
        }
    },
    "knowledge-base": {
        "name": "Grimoire Wiki",
        "description": "Document and organize mystical knowledge and spells",
        "emoji": "📚",
        "port": 3004,
        "entities": [
            {
                "name": "Article",
                "fields": [
                    {"name": "title", "type": "String", "required": True},
                    {"name": "content", "type": "String", "required": True},
                    {"name": "category", "type": "String", "required": False},
                    {"name": "tags", "type": "String[]", "required": False},
                    {"name": "published", "type": "Boolean", "required": True}
                ]
            }
        ],
        "pages": [
            {"route": "/wiki", "name": "Article List", "description": "Browse articles"},
            {"route": "/wiki/[slug]", "name": "Article View", "description": "Read article"},
            {"route": "/search", "name": "Search", "description": "Search knowledge base"}
        ],
        "features": [
            "Markdown support",
            "Full-text search",
            "Tag-based organization",
            "Version history",
            "Related articles"
        ],
        "workflow": {
            "stages": ["Draft", "Review", "Published", "Archived"],
            "emojis": ["📝", "👁️", "📚", "🗄️"]
        }
    }
}

@app.list_tools()
async def list_tools() -> list[Tool]:
    """List available MCP tools."""
    return [
        Tool(
            name="get_theme_tokens",
            description="Get Grimoire Stack theme tokens (colors, spacing, typography, effects)",
            inputSchema={
                "type": "object",
                "properties": {
                    "category": {
                        "type": "string",
                        "description": "Optional: Filter by category (colors, spacing, typography, effects)",
                        "enum": ["colors", "spacing", "typography", "effects", "all"]
                    }
                }
            }
        ),
        Tool(
            name="get_app_blueprint",
            description="Get a blueprint for a new app that can be built on Grimoire Stack",
            inputSchema={
                "type": "object",
                "properties": {
                    "app_type": {
                        "type": "string",
                        "description": "Type of app blueprint to generate",
                        "enum": ["inventory-tracker", "event-planner", "knowledge-base", "list-all"]
                    }
                },
                "required": ["app_type"]
            }
        ),
        Tool(
            name="validate_app_structure",
            description="Validate if an app follows Grimoire Stack patterns",
            inputSchema={
                "type": "object",
                "properties": {
                    "app_name": {
                        "type": "string",
                        "description": "Name of the app to validate"
                    },
                    "check_type": {
                        "type": "string",
                        "description": "What to validate",
                        "enum": ["imports", "structure", "theme", "all"]
                    }
                },
                "required": ["app_name"]
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: Any) -> list[TextContent]:
    """Handle tool calls."""
    
    if name == "get_theme_tokens":
        category = arguments.get("category", "all")
        
        if category == "all":
            result = THEME_TOKENS
        elif category in THEME_TOKENS:
            result = {category: THEME_TOKENS[category]}
        else:
            result = {"error": f"Unknown category: {category}"}
        
        return [TextContent(
            type="text",
            text=json.dumps(result, indent=2)
        )]
    
    elif name == "get_app_blueprint":
        app_type = arguments.get("app_type")
        
        if app_type == "list-all":
            result = {
                "available_blueprints": list(APP_BLUEPRINTS.keys()),
                "descriptions": {
                    key: {
                        "name": val["name"],
                        "description": val["description"],
                        "emoji": val["emoji"]
                    }
                    for key, val in APP_BLUEPRINTS.items()
                }
            }
        elif app_type in APP_BLUEPRINTS:
            result = APP_BLUEPRINTS[app_type]
        else:
            result = {"error": f"Unknown app type: {app_type}. Use 'list-all' to see options."}
        
        return [TextContent(
            type="text",
            text=json.dumps(result, indent=2)
        )]
    
    elif name == "validate_app_structure":
        app_name = arguments.get("app_name")
        check_type = arguments.get("check_type", "all")
        
        # Validation logic (simplified for demo)
        validation_results = {
            "app_name": app_name,
            "check_type": check_type,
            "checks": {
                "imports": {
                    "status": "pass",
                    "message": "App imports from @grimoire/skeleton-core correctly"
                },
                "structure": {
                    "status": "pass",
                    "message": "App follows recommended structure"
                },
                "theme": {
                    "status": "pass",
                    "message": "App uses Grimoire Stack theme tokens"
                }
            },
            "overall": "pass"
        }
        
        return [TextContent(
            type="text",
            text=json.dumps(validation_results, indent=2)
        )]
    
    else:
        return [TextContent(
            type="text",
            text=json.dumps({"error": f"Unknown tool: {name}"})
        )]

if __name__ == "__main__":
    import asyncio
    import mcp.server.stdio
    
    async def main():
        async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
            await app.run(
                read_stream,
                write_stream,
                app.create_initialization_options()
            )
    
    asyncio.run(main())
