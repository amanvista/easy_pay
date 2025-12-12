# PublicRoute Component

A route wrapper component that manages access to public routes based on authentication status.

## Purpose

The `PublicRoute` component is designed to:
- Redirect authenticated users away from auth pages (login/register)
- Allow unauthenticated users to access public routes
- Provide loading states during authentication verification
- Offer flexible redirection options

## Usage

### Basic Usage (Auth Pages)
```jsx
import PublicRoute from "../components/PublicRoute";

// Redirect authenticated users to home page
<PublicRoute>
  <Login />
</PublicRoute>
```

### Custom Redirect
```jsx
// Redirect authenticated users to dashboard
<PublicRoute redirectTo="/dashboard">
  <Login />
</PublicRoute>
```

### Allow Authenticated Users
```jsx
// Allow both authenticated and unauthenticated users
<PublicRoute allowAuthenticated={true}>
  <HomePage />
</PublicRoute>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | The component to render for unauthenticated users |
| `redirectTo` | string | `"/"` | Where to redirect authenticated users |
| `allowAuthenticated` | boolean | `false` | If true, allows authenticated users to access the route |

## Behavior

1. **Loading State**: Shows a loading spinner while authentication is being verified
2. **Authenticated User**: 
   - If `allowAuthenticated` is false: Redirects to `redirectTo` or the previous location
   - If `allowAuthenticated` is true: Renders the children
3. **Unauthenticated User**: Always renders the children

## Integration with React Router

The component uses React Router's `Navigate` component for redirections and respects the location state for "return to" functionality after login.