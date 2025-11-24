# Policy Pages Routes

All policy pages have been added to the application and are publicly accessible (no authentication required).

## Available Routes

| Policy Page | Route URL | Component |
|------------|-----------|-----------|
| Terms & Conditions | `/terms` | `TermsAndConditions` |
| Privacy Policy | `/privacy` | `PrivacyPolicy` |
| Refund & Cancellation | `/refund-cancellation` | `RefundCancellationPolicy` |
| Return Policy | `/return-policy` | `ReturnPolicy` |
| Shipping Policy | `/shipping-policy` | `ShippingPolicy` |

## Full URLs (Development)

Assuming your app runs on `http://localhost:5173`:

1. **Terms & Conditions**: `http://localhost:5173/terms`
2. **Privacy Policy**: `http://localhost:5173/privacy`
3. **Refund & Cancellation**: `http://localhost:5173/refund-cancellation`
4. **Return Policy**: `http://localhost:5173/return-policy`
5. **Shipping Policy**: `http://localhost:5173/shipping-policy`

## Usage in Components

### Link to Policy Pages

```jsx
import { Link } from 'react-router-dom';

// In your footer or anywhere
<Link to="/terms">Terms & Conditions</Link>
<Link to="/privacy">Privacy Policy</Link>
<Link to="/refund-cancellation">Refund & Cancellation</Link>
<Link to="/return-policy">Return Policy</Link>
<Link to="/shipping-policy">Shipping Policy</Link>
```

### Navigate Programmatically

```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/terms');
```

### Open in New Tab

```jsx
<a href="/terms" target="_blank" rel="noopener noreferrer">
  Terms & Conditions
</a>
```

## Example Footer Component

```jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/refund-cancellation">Refund & Cancellation</Link></li>
              <li><Link to="/return-policy">Return Policy</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
```

## Features

- ✅ All routes added to App.jsx
- ✅ Public access (no authentication required)
- ✅ Consistent styling with app theme
- ✅ Mobile responsive
- ✅ Back navigation included
- ✅ Sticky headers
- ✅ Clean typography

## Notes

- Policy pages are accessible without login
- All pages have back navigation to return to previous page
- Pages are styled consistently with orange theme
- Content is based on DELIVOO FOOD SERVICES policies
- Last updated date is automatically displayed on each page
