# Recruitment Task
Multi-Step Product Form — Frontend (React)

## Objective
Build a three-step product creation form embedded in a modal dialog.
The form guides the user step by step, validates data in real time, and blocks progression until the current step is correctly filled. Upon submission, the product is added to the table on the main page.

## Design
A Figma file with the complete UI design is provided. Implement the form according to this design using shadcn/ui components — configure and customize them to faithfully reproduce the design.

## Required Stack
- shadcn/ui — UI components
- TanStack Form — form state management and step handling
- Zod — validation schemas for each step
- nuqs — table pagination synchronization with URL parameters

## Interface Structure
- Dialog — the form operates inside a modal opened by the "Add Product" button. Closing resets the form to step 1.
- Product Table — on the main page, pre-populated with 5 example products (mock data).
- Pagination — page number stored in URL (nuqs). Page refresh preserves the view.
- Columns: name, SKU, category, gross price with currency, availability, stock level.

## Step 1 — Basic Information
Product identification and classification data.

| Field | Type | Validation / Notes |
|-------|------|-------------------|
| Product Name | Text | Required, min. 3 characters |
| Product SKU | Text | Required, alphanumeric only, max 24 characters |
| Description | Textarea | Optional |
| Manufacturer | Select | Selection from predefined list |
| Category | Select | Selection from predefined list |
| Product Features | Multi-select | One or more values from list |

## Step 2 — Pricing
Price fields are linked and recalculate automatically.

| Field | Type | Validation / Notes |
|-------|------|-------------------|
| Net Price | Numeric | Change recalculates gross price based on VAT rate |
| Gross Price | Numeric | Change recalculates net price based on VAT rate |
| VAT | Select (%) | Change updates gross (or net) |
| Currency | Select | Selection from predefined list |

Formula: gross = net × (1 + VAT / 100). Editing any field instantly recalculates the others.

## Step 3 — Availability & Stock
Product availability information and cart limits.

| Field | Type | Validation / Notes |
|-------|------|-------------------|
| Is Product Available | Switch | Boolean (yes/no) |
| Limited Product | Checkbox | When checked, reveals stock quantity field |
| Stock Quantity | Numeric | Visible and required only when "Limited" is checked. Non-negative integer |
| Min Cart Quantity | Numeric | Integer; must not exceed max |
| Max Cart Quantity | Numeric | Integer; must not be less than min |

## Evaluation Criteria
- Fidelity to Figma design
- Correctness of Zod schemas and their integration with TanStack Form
- Step navigation — proceed only with valid data, go back without losing values
- Clear error messages at appropriate fields
- Dialog behavior — opening, closing, state reset
- Code quality, TypeScript typing, consistent shadcn/ui usage

## Deliverables
- Repository link (GitHub / GitLab)
- README with setup instructions
- Link to working online version (e.g., Vercel, Netlify)
- Deadline: 7 business days from receipt of task