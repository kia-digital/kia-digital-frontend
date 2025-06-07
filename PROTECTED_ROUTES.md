# Protected Routes Implementation

This document explains the protected routes implementation for the KIA Digital Frontend application.

## Overview

The application now implements a robust authentication system with protected routes that ensure only authenticated users can access the dashboard and other sensitive pages.

## Key Components

### 1. ProtectedRoute Component (`src/components/ProtectedRoute.tsx`)

- Wraps protected pages and checks authentication status
- Shows loading spinner during authentication check
- Redirects unauthenticated users to `/auth`
- Includes error handling for authentication failures

### 2. AuthRedirect Component (`src/components/AuthRedirect.tsx`)

- Prevents authenticated users from accessing the login page
- Redirects authenticated users to `/dashboard`

### 3. Layout Component (`src/components/Layout.tsx`)

- Provides consistent layout with sidebar for authenticated pages
- Wraps content with DashboardProvider context
- Eliminates code duplication across pages

### 4. Enhanced Authentication Utilities (`src/utils/auth.ts`)

- `isAuthenticated()`: Checks if user has valid token
- `getCurrentUser()`: Extracts user info from JWT token
- `logout()`: Clears user session data
- JWT token validation with expiry checking
- Automatic token cleanup on validation failures

## Route Structure

```
/ → Redirects to /dashboard
/auth → Login/Register page (redirects to dashboard if authenticated)
/dashboard → Protected dashboard page
/pemeriksaan → Protected examination page
/calendar → Protected calendar page (placeholder)
/edukasi → Protected education page (placeholder)
* → 404 handler (redirects to dashboard)
```

## Authentication Flow

1. **Initial Access**: User visits any protected route
2. **Authentication Check**: ProtectedRoute checks for valid token
3. **Token Validation**:
   - Verifies token exists and is not empty
   - For JWT tokens, checks expiration
   - Handles malformed tokens gracefully
4. **Route Decision**:
   - Valid token → Allow access to protected content
   - Invalid/missing token → Redirect to `/auth`
   - Already authenticated at `/auth` → Redirect to `/dashboard`

## Features

### Security Features

- Automatic token validation on route access
- JWT expiration checking
- Secure token storage cleanup
- Protection against direct URL access

### User Experience

- Loading states during authentication checks
- Smooth redirects without flashing
- Consistent layout across protected pages
- Logout functionality in sidebar

### Developer Features

- Modular component structure
- Centralized authentication logic
- Easy to extend for new protected routes
- Error handling and logging

## Usage

### Adding New Protected Routes

1. Import `ProtectedRoute` and `Layout` in `App.tsx`
2. Wrap new route with `ProtectedRoute` and `Layout`:

```tsx
<Route
  path="/new-page"
  element={
    <ProtectedRoute>
      <Layout>
        <NewPageComponent />
      </Layout>
    </ProtectedRoute>
  }
/>
```

### Testing Authentication

1. Visit any protected route without being logged in → Should redirect to `/auth`
2. Login with valid credentials → Should redirect to `/dashboard`
3. Try to access `/auth` while logged in → Should redirect to `/dashboard`
4. Use logout button → Should redirect to `/auth` and clear token

## Files Modified/Created

### Created:

- `src/components/Layout.tsx`
- `PROTECTED_ROUTES.md`

### Modified:

- `src/App.tsx` - Updated routing structure
- `src/components/ProtectedRoute.tsx` - Added loading states and error handling
- `src/components/Sidebar.tsx` - Added logout functionality and navigation
- `src/utils/auth.ts` - Enhanced token validation and JWT support
- `src/pages/Dashboard.tsx` - Removed embedded Sidebar
- `src/pages/Pemeriksaan/index.tsx` - Removed embedded Sidebar

## Dependencies

The implementation uses existing dependencies:

- React Router for navigation
- Existing AuthService for login/logout
- FontAwesome for icons
- TailwindCSS for styling

No additional package installations required.
