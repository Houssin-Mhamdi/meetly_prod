# Category Feature Fixes & Updates

## Issue Resolved
- **Problem**: Users reported that selecting a custom category wasn't saving correctly; events always defaulted to "other".
- **Root Cause**: There was a mismatch between the frontend payload and the backend controller.
    - Frontend sent: `{ category: "value" }`
    - Backend expected: `{ categoryId: "value" }`
    - Result: `categoryId` was undefined, so Mongoose used the default `category: "other"`.

## Fix Implementation
- **Backend (`index.js`)**:
    - Updated `POST /events` to extract `category` from `req.body` instead of `categoryId`.
    - Updated `PATCH /events/:id` to include `category` and `videoLink` in the allowed update fields.

## Verification
- **Standard Categories**: "technology", "business", etc. are sent as strings and saved as strings.
- **Custom Categories**: Custom Category IDs (e.g., "65a1b...") are sent as strings and saved as strings/ObjectIds in the Mixed type field.
- **Frontend**: `zod` validation was already relaxed to `z.string()`, so no changes were needed there.

The feature should now work as expected for both creation and updates.
