# Address Page URL Parameters

## Overview
The Add Address page now supports URL parameters to maintain state during page refreshes and enable deep linking.

## URL Structure

### View All Addresses (Default)
```
/add-address
```
Shows the list of all saved addresses.

### Add New Address
```
/add-address?mode=add
```
Opens the form to add a new address.

### Edit Existing Address
```
/add-address?mode=edit&id=123
```
Opens the form to edit address with ID 123.

---

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mode` | string | No | Either "add" or "edit" |
| `id` | number | Yes (if mode=edit) | The address ID to edit |

---

## Features

### 1. Persistent State on Refresh
When editing an address, if the user refreshes the page:
- The edit form remains open
- The address data is preserved
- The map shows the saved location
- The form fields are populated

### 2. Deep Linking
You can share or bookmark specific states:
```javascript
// Link to add new address
<Link to="/add-address?mode=add">Add Address</Link>

// Link to edit specific address
<Link to={`/add-address?mode=edit&id=${addressId}`}>Edit Address</Link>
```

### 3. Browser Navigation
- Back button works correctly
- Forward button works correctly
- URL updates when switching modes

---

## Implementation Details

### URL Parameter Handling
```javascript
const [searchParams, setSearchParams] = useSearchParams();

// Read parameters
const mode = searchParams.get('mode');
const addressId = searchParams.get('id');

// Set parameters
setSearchParams({ mode: 'edit', id: '123' });

// Clear parameters
setSearchParams({});
```

### State Synchronization
The component uses `useEffect` to sync URL parameters with component state:

```javascript
useEffect(() => {
  const mode = searchParams.get('mode');
  const addressId = searchParams.get('id');

  if (mode === 'add') {
    setShowAddForm(true);
    setEditingAddress(null);
  } else if (mode === 'edit' && addressId && savedAddresses.length > 0) {
    const addressToEdit = savedAddresses.find(addr => addr.id === parseInt(addressId));
    if (addressToEdit) {
      setEditingAddress(addressToEdit);
      setShowAddForm(true);
    }
  }
}, [searchParams, savedAddresses]);
```

---

## User Flows

### Flow 1: Add New Address
1. User clicks "Add New Address" button
2. URL changes to `/add-address?mode=add`
3. Form opens in add mode
4. User can refresh and form stays open
5. On save, URL returns to `/add-address`

### Flow 2: Edit Address
1. User clicks "Edit" on an address card
2. URL changes to `/add-address?mode=edit&id=123`
3. Form opens with address data
4. User can refresh and edit continues
5. On save, URL returns to `/add-address`

### Flow 3: Cancel
1. User clicks "Cancel" button
2. URL returns to `/add-address`
3. Form closes
4. Address list is shown

---

## Benefits

### For Users
- ✓ No data loss on accidental refresh
- ✓ Can bookmark edit pages
- ✓ Browser back/forward works intuitively
- ✓ Can share specific address edit links

### For Developers
- ✓ Clean URL structure
- ✓ Easy to debug (state visible in URL)
- ✓ Testable (can navigate directly to states)
- ✓ SEO-friendly (if needed in future)

---

## Testing

### Manual Testing
1. **Add Mode:**
   - Navigate to `/add-address?mode=add`
   - Verify form opens
   - Refresh page
   - Verify form stays open

2. **Edit Mode:**
   - Navigate to `/add-address?mode=edit&id=1`
   - Verify form opens with address data
   - Refresh page
   - Verify form stays open with same data

3. **Invalid ID:**
   - Navigate to `/add-address?mode=edit&id=999`
   - Verify graceful handling (shows address list)

4. **Browser Navigation:**
   - Click "Add New Address"
   - Click browser back button
   - Verify returns to address list
   - Click forward button
   - Verify returns to add form

---

## Edge Cases Handled

### 1. Invalid Address ID
If the ID in URL doesn't exist:
- Component shows address list
- No error is thrown
- User can continue normally

### 2. Missing Parameters
If `mode=edit` but no `id`:
- Component shows address list
- No form is opened

### 3. Addresses Not Loaded Yet
If URL has edit mode but addresses haven't loaded:
- Component waits for addresses to load
- Then opens edit form
- Handled by dependency array in useEffect

### 4. Multiple Rapid Changes
If user rapidly switches between add/edit:
- URL updates correctly
- Form state syncs properly
- No race conditions

---

## Future Enhancements

Potential improvements:
- [ ] Add validation for invalid IDs (show error message)
- [ ] Support for duplicate address (mode=duplicate&id=123)
- [ ] Support for address selection (mode=select)
- [ ] Add confirmation dialog on navigation if form has unsaved changes
- [ ] Track analytics on which addresses are edited most
