# Card Gradient Customization Feature

## Overview
Added a customizable gradient color feature for appointment cards. Users can now select from 9 predefined gradient combinations when creating an event. The selected gradient is stored in the database and can be used to customize the card appearance on the public storefront page.

## Changes Made

### 1. Backend (Event Model)
**File**: `backend/models/Event.js`

Added `cardGradient` field to store gradient colors:
```javascript
cardGradient: {
    from: {
        type: String,
        default: "from-blue-50"
    },
    to: {
        type: String,
        default: "to-indigo-50"
    }
}
```

### 2. Frontend Types
**File**: `frontend/app/types/event.types.ts`

Added `cardGradient` to `SchedulingEvent` interface:
```typescript
cardGradient?: {
    from: string;
    to: string;
};
```

### 3. Appointment Form Schema
**File**: `frontend/app/(protected)/appointments/page.tsx`

- Added `cardGradient` to Zod schema
- Added default value in form defaultValues
- Added `useWatch` to track gradient selection in real-time
- **Added adaptive text color logic**: Automatically determines if gradient is dark or light
  - **Dark gradients** (Sunset, Purple Dream, Mint Fresh, etc.): White text for better contrast
  - **Light gradients** (Ocean Breeze): Dark text for better readability
- Updated preview card to use selected gradient dynamically with adaptive text colors

### 4. Card Customization Section
Added a new section after "Staff Member" with:
- 9 gradient options with visual previews
- Labels: Sunset, Purple Dream, Ocean Breeze, Mint Fresh, Rose Garden, Golden Hour, Ocean Deep, Lavender, Midnight
- Visual selection with border highlight and checkmark
- Real-time preview update

## Available Gradients

1. **Sunset**: `from-orange-400 to-red-500`
2. **Purple Dream**: `from-indigo-500 to-purple-600`
3. **Ocean Breeze**: `from-blue-50 to-indigo-50` (default)
4. **Mint Fresh**: `from-green-400 to-cyan-500`
5. **Rose Garden**: `from-pink-400 to-rose-500`
6. **Golden Hour**: `from-yellow-400 to-orange-500`
7. **Ocean Deep**: `from-teal-400 to-blue-500`
8. **Lavender**: `from-purple-400 to-pink-500`
9. **Midnight**: `from-slate-700 to-slate-900`

## Usage in Slug Page

To use the gradient in the public storefront page (`frontend/app/[slug]/page.tsx`), you need to:

1. Fetch the event data (which now includes `cardGradient`)
2. Apply the gradient to event cards

### Example Implementation:

Replace the hardcoded gradient on line 199:
```tsx
// Current (hardcoded):
<div className="aspect-4/3 w-full bg-linear-to-br from-indigo-500 to-purple-600 relative overflow-hidden">

// Updated (dynamic):
<div className={`aspect-4/3 w-full bg-linear-to-br ${event.cardGradient?.from || "from-indigo-500"} ${event.cardGradient?.to || "to-purple-600"} relative overflow-hidden`}>
```

### Full Example with Event Data:

```tsx
{events?.map((event) => {
    // Determine if gradient is dark for text color
    const darkGradients = [
        "from-orange-400", "from-indigo-500", "from-green-400", 
        "from-pink-400", "from-yellow-400", "from-teal-400", 
        "from-purple-400", "from-slate-700"
    ];
    const isDarkGradient = darkGradients.includes(event.cardGradient?.from || "");
    
    return (
        <div
            key={event._id}
            onClick={() => setIsModalOpen(true)}
            className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full relative"
        >
            <div className={`aspect-4/3 w-full bg-linear-to-br ${event.cardGradient?.from || "from-indigo-500"} ${event.cardGradient?.to || "to-purple-600"} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-md ${isDarkGradient ? "bg-white/90 text-slate-900" : "bg-white/90 text-indigo-700"} backdrop-blur text-xs font-bold shadow-sm`}>
                        Technology
                    </span>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <h3 className={`text-lg font-bold ${isDarkGradient ? "text-white" : "text-slate-900"} dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors`}>
                    {event.title}
                </h3>
                <p className={`text-sm ${isDarkGradient ? "text-white/90" : "text-slate-500"} dark:text-slate-400 line-clamp-2 mb-4`}>
                    {event.description}
                </p>
                {/* Rest of card */}
            </div>
        </div>
    );
})}
```

## Adaptive Text Colors

The feature includes intelligent text color adaptation:

- **Dark Gradients** (400-700 range colors): Uses **white text** for optimal contrast
  - Sunset, Purple Dream, Mint Fresh, Rose Garden, Golden Hour, Ocean Deep, Lavender, Midnight
  
- **Light Gradients** (50 range colors): Uses **dark text** for better readability
  - Ocean Breeze (default)

This ensures text is always readable regardless of the background gradient selected.


## Data Flow

1. **Create Event**: User selects gradient → Stored in `cardGradient` field
2. **Event List**: Gradient data is fetched with event
3. **Public Page**: Gradient is applied to card background

## Notes

- The gradient uses Tailwind CSS classes
- Default gradient is "Ocean Breeze" (blue-50 to indigo-50)
- The preview card updates in real-time as user selects different gradients
- The selected gradient is indicated with a blue border and checkmark icon
