# Task ID: 15

**Title:** Next.js Authentication UI

**Status:** pending

**Dependencies:** 1

**Priority:** high

**Description:** Implement the authentication pages with role-based login flow.

**Details:**

1. Create /login page with email/password form
2. Create /register page for new user signup
3. Implement JWT token storage in httpOnly cookies
4. Create auth context with useAuth hook
5. Implement protected route wrapper
6. Add MFA challenge page for Manager role
7. Create password reset flow
8. Add session timeout handling
9. Implement remember me functionality
10. Style with Tailwind and Shadcn/UI components

**Test Strategy:**

1. Test login with valid/invalid credentials
2. Verify JWT stored securely in cookies
3. Test protected route redirects
4. Verify MFA flow for Managers
5. Test password reset end-to-end

## Subtasks

### 15.1. Create login/register pages

**Status:** pending  
**Dependencies:** None  

Build login and register forms with Shadcn/UI components

### 15.2. Implement auth context and hooks

**Status:** pending  
**Dependencies:** 15.1  

Create useAuth hook, AuthProvider for session management

### 15.3. Create protected route wrapper

**Status:** pending  
**Dependencies:** 15.2  

Implement HOC for protecting authenticated routes

### 15.4. Add MFA challenge UI

**Status:** pending  
**Dependencies:** 15.1  

Create MFA input page for Manager role users

### 15.5. Implement password reset flow

**Status:** pending  
**Dependencies:** 15.1  

Build forgot password, reset password pages
