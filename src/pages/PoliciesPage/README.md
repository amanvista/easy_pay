# Policy Pages

All policy pages have been created with consistent styling and navigation.

## Available Pages

1. **Terms & Conditions** - `TermsAndConditions.jsx`
2. **Privacy Policy** - `PrivacyPolicy.jsx`
3. **Refund & Cancellation Policy** - `RefundCancellationPolicy.jsx`
4. **Return Policy** - `ReturnPolicy.jsx`
5. **Shipping Policy** - `ShippingPolicy.jsx`

## Adding Routes to App.jsx

Add these routes to your `App.jsx`:

```jsx
import { 
  TermsAndConditions, 
  PrivacyPolicy, 
  RefundCancellationPolicy, 
  ReturnPolicy, 
  ShippingPolicy 
} from './pages/PoliciesPage';

// In your Routes:
<Route path="/terms" element={<TermsAndConditions />} />
<Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/refund-cancellation" element={<RefundCancellationPolicy />} />
<Route path="/return-policy" element={<ReturnPolicy />} />
<Route path="/shipping-policy" element={<ShippingPolicy />} />
```

## Linking to Policies

Use these paths in your footer or anywhere you need to link to policies:

```jsx
<Link to="/terms">Terms & Conditions</Link>
<Link to="/privacy">Privacy Policy</Link>
<Link to="/refund-cancellation">Refund & Cancellation</Link>
<Link to="/return-policy">Return Policy</Link>
<Link to="/shipping-policy">Shipping Policy</Link>
```

## Features

- ✅ Responsive design
- ✅ Consistent styling with orange theme
- ✅ Back navigation with ChevronLeft icon
- ✅ Sticky header
- ✅ Clean typography and spacing
- ✅ Highlighted important sections
- ✅ Mobile-friendly layout
- ✅ Last updated date automatically shown

## Customization

To update company information, search for:
- `DELIVOO FOOD SERVICES`
- `blinkfeast.com`
- `B-15, NEW SEELAMPUR NORTH EAST DELHI GARHI MENDU, New Delhi, India`

To update timeframes (currently set to "1 day"), search for:
- `1 day` or `1 days`
