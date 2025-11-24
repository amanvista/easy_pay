# Google Maps Integration Setup

## Overview
The customer app now includes Google Maps integration for address selection with location picker functionality.

## Setup Instructions

### 1. Install Dependencies
Run the following command in the `frontend/customer` directory:

```bash
npm install
```

This will install the `@react-google-maps/api` package that was added to `package.json`.

### 2. Environment Variables
The `.env` file has been created with the Google Maps API key:

```env
VITE_GOOGLE_MAPS_API_KEY=AIzaSyBlvM0xnKwIEkCEfZqMr-shzL9y2uJDEsY
```

**Note:** This is the same API key used in the partner app.

### 3. Restart Development Server
After installing dependencies, restart your development server:

```bash
npm run dev
```

## Features

### Location Picker Component
Located at: `src/components/LocationPicker/LocationPicker.jsx`

**Features:**
- **Search Bar** - Google Places Autocomplete for searching locations
- **Interactive Google Map** - Click anywhere to select location
- **Draggable Marker** - Fine-tune position by dragging
- **"Use Current Location"** button - GPS-based location detection
- **Reverse Geocoding** - Shows address when clicking on map
- **Displays Selected Coordinates** - Shows lat/lng of selected location
- **Auto-loads Current Location** - On mount if no initial location provided
- **Loads Saved Location** - When editing, shows previously saved location

### Address Form Integration
The `AddAddressForm` component now includes:
- Interactive map for location selection
- Latitude and longitude are automatically captured
- Location data is saved with the address
- When editing, the map shows the saved location

## Usage

### Adding a New Address
1. Navigate to Add Address page
2. Fill in the required fields (name, phone, address, city, state, pincode)
3. Use the map to select the exact location:
   - **Search**: Type location name in search bar (e.g., "Central Park, New York")
   - **GPS**: Click "Use Current Location" to auto-detect
   - **Manual**: Click anywhere on the map to place a marker
   - **Adjust**: Drag the marker to fine-tune position
4. The latitude and longitude are automatically saved
5. The search bar shows the address of the selected location

### Viewing Saved Addresses
When viewing addresses on the AddAddressPage:
- Each address card shows if it has location data
- When editing an address:
  - The map automatically loads with the saved location
  - The marker appears at the saved coordinates
  - The map centers on the saved location
  - The search bar shows the saved address

## API Integration

### Address Data Structure
When saving an address, the following location fields are included:

```json
{
  "street_building_area": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip_code": "10001",
  "full_name": "John Doe",
  "phone_number": "9876543210",
  "landmark": "Near Central Park",
  "delivery_instructions": "Ring doorbell twice",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

### Backend Storage
The backend `addresses` table stores:
- `latitude` - DECIMAL(10, 8)
- `longitude` - DECIMAL(11, 8)

These coordinates can be used for:
- Distance calculations
- Delivery route optimization
- Showing delivery locations on maps
- Geofencing features

## Browser Permissions

The app requests location permissions for the "Use Current Location" feature:
- Users will see a browser prompt to allow location access
- If denied, users can still manually select location on the map
- Location permission is optional and non-blocking

## Troubleshooting

### Map Not Loading
- Check that the API key is correct in `.env`
- Ensure `npm install` was run after adding the dependency
- Check browser console for API errors
- Verify the Google Maps API is enabled in Google Cloud Console

### Location Permission Denied
- This is normal if user denies permission
- Users can still manually select location on map
- No error is shown to user, feature gracefully degrades

### Coordinates Not Saving
- Check that `latitude` and `longitude` are being passed in the API request
- Verify the backend model accepts these fields
- Check network tab for the actual request payload

## Future Enhancements

Potential improvements:
- Reverse geocoding (get address from coordinates)
- Address autocomplete
- Show nearby landmarks
- Distance from restaurant
- Delivery zone validation
- Multiple delivery addresses on one map
