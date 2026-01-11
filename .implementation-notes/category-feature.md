# Category Creation Feature

## Overview
Added the ability for users to create custom categories directly from the Create Event form. This includes a new API service, frontend state management, and a modal UI.

## Changes Made

### 1. Backend
- **Models**:
    - `Event.js`: Updated `category` field types to `Mixed` (string | ObjectId).
    - `Categories.js`: Added `timestamps`.
- **API**: (These were already present in `index.js`, confirmed routing)
    - `POST /category`: Create new category.
    - `GET /category`: Fetch user categories.

### 2. Frontend Services
- **Service**: `frontend/app/services/category.service.ts`
    - Implemented `createCategory`, `getCategories`, `updateCategory`, `deleteCategory`.
- **Query**: `frontend/app/services/queries/categoryQuery.ts`
    - Added React Query hooks: `useGetCategoriesQuery`, `useCreateCategoryMutation`, etc.
    - Implemented automatic invalidation of "categories" query on mutation success.

### 3. Frontend UI (`appointments/page.tsx`)
- **Imports**: Added React Query hooks, Dialog components, and state management.
- **State**: Added `isCategoryModalOpen` and form state (`newCategoryName`, `newCategoryDesc`, `newCategoryColor`).
- **Logic**:
    - `useGetCategoriesQuery` fetches custom categories.
    - `handleCreateCategory` calls mutation and resets form.
- **Component**:
    - **Header**: Added "Create Category" button next to label.
    - **Dropdown**: Added `<optgroup label="My Categories">` to display dynamic categories.
    - **Modal**: Added `Dialog` with Name, Description, and Color inputs.

## How It Works
1. User clicks "+ Create Category".
2. Modal opens asking for Name, Description, and Color.
3. User submits.
4. Mutation runs → updates backend.
5. On success, modal closes, and the new category appears in the "Category" dropdown under "My Categories".
