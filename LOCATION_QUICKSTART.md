# 🗺️ Location Picker - Quick Start Guide

## Installation

```bash
cd frontend/customer
npm install
npm run dev
```

## What's New?

### 🔍 Search for Locations
Type any location name in the search bar and select from suggestions.

### 📍 Use GPS
Click "Use Current Location" to auto-detect your position.

### 🗺️ Click on Map
Click anywhere on the map to place a marker at that location.

### ✏️ Edit Saved Locations
When editing an address, the map automatically loads your saved location.

## Features at a Glance

| Feature | Description |
|---------|-------------|
| **Search Bar** | Google Places Autocomplete |
| **GPS Button** | Auto-detect current location |
| **Map Click** | Click anywhere to select |
| **Draggable Marker** | Fine-tune position |
| **Reverse Geocoding** | Shows address when clicking |
| **Auto-Save** | Coordinates saved with address |
| **Auto-Load** | Saved locations load in edit mode |

## How It Works

### Adding Address
1. Fill in address details
2. Select location (search/GPS/click)
3. Save → Coordinates stored in database

### Editing Address
1. Click edit on saved address
2. Map loads with saved location
3. Update location if needed
4. Save → New coordinates stored

## Files Modified

```
frontend/customer/
├── .env (created)
├── package.json (updated)
├── src/
│   ├── components/
│   │   ├── LocationPicker/
│   │   │   └── LocationPicker.jsx (created)
│   │   └── AddAddressForm/
│   │       └── AddAddressForm.jsx (updated)
│   └── pages/
│       └── AddAddressPage/
│           └── AddAddressPage.jsx (updated)
```

## API Integration

Coordinates are sent to backend:
```json
{
  "latitude": 28.6139,
  "longitude": 77.2090
}
```

Stored in `addresses` table:
```sql
latitude DECIMAL(10, 8)
longitude DECIMAL(11, 8)
```

## Testing

1. Navigate to Add Address page
2. Try all three methods:
   - Search: "Central Park"
   - GPS: Click "Use Current Location"
   - Manual: Click on map
3. Save and verify coordinates in database
4. Edit address and verify map loads saved location

## Troubleshooting

**Map not loading?**
- Run `npm install` to install dependencies
- Check `.env` file exists with API key
- Restart dev server

**Search not working?**
- Check internet connection
- Verify API key is valid
- Check browser console for errors

**GPS not working?**
- Allow location permission in browser
- Use search or map click as alternative

## Documentation

- 📖 [Full Setup Guide](docs/GOOGLE_MAPS_SETUP.md)
- 👤 [User Guide](docs/LOCATION_PICKER_GUIDE.md)
- 📊 [Features Summary](docs/LOCATION_FEATURES_SUMMARY.md)

## Support

Questions? Check the docs or contact the dev team!
