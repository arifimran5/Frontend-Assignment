## UI schema form generator

### Technologies used -

1. React (vite)
2. Tailwind for styling
3. Radix UI for switch button

Component structure

```
App -
    |- JSON input
    |- Form Component
              |- FormElement
                      | - Input
                      | - Select
                      | - Radio
                      | - Switch
                      | - Group

```

### Form Component

It renders it's ui and recursively renders it's subparametere if any

### FormElement Component

It identifies the type of element and render the specific Form Element like Input, Select, etc.

### Submission of form

On submit of form, it uses FormData Api to collect all the information filled and logs it out.
