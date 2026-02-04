# Task ID: 3

**Title:** FastAPI Authentication System with JWT and RBAC

**Status:** pending

**Dependencies:** 2

**Priority:** high

**Description:** Implement JWT-based authentication with role-based access control (Provider, Hygienist, Admin, Manager roles).

**Details:**

1. Install python-jose, passlib, bcrypt for JWT handling
2. Create auth router with /login, /refresh, /logout endpoints
3. Implement JWT token generation with role claims
4. Set 15-minute access token expiry, 7-day refresh token
5. Create authentication middleware for protected routes
6. Implement RBAC decorator for role-based route protection
7. Create password hashing utilities
8. Set up secure cookie handling for tokens
9. Implement MFA requirement for Manager role (TOTP)
10. Create user registration flow with email verification

**Test Strategy:**

1. Test login with valid/invalid credentials
2. Verify JWT token contains correct role claims
3. Test role-based route access
4. Verify token refresh flow
5. Test MFA for Manager role
6. Confirm token expiry behavior

## Subtasks

### 3.1. Implement JWT token generation and validation

**Status:** pending  
**Dependencies:** None  

Create JWT utilities using python-jose with role claims and expiry handling

### 3.2. Create login/logout endpoints

**Status:** pending  
**Dependencies:** 3.1  

Implement /login, /refresh, /logout endpoints with secure cookie handling

### 3.3. Implement RBAC decorator

**Status:** pending  
**Dependencies:** 3.1  

Create decorator for role-based route protection (Provider, Hygienist, Admin, Manager)

### 3.4. Create password hashing utilities

**Status:** pending  
**Dependencies:** None  

Implement bcrypt-based password hashing and verification

### 3.5. Implement MFA for Manager role

**Status:** pending  
**Dependencies:** 3.2  

Add TOTP-based MFA requirement for Manager role users

### 3.6. Create auth middleware

**Status:** pending  
**Dependencies:** 3.1, 3.3  

Implement FastAPI middleware for authenticating protected routes
