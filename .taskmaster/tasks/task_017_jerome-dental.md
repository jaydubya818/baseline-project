# Task ID: 17

**Title:** Role-Specific Dashboard Views

**Status:** pending

**Dependencies:** 16

**Priority:** high

**Description:** Create the four role-specific dashboard layouts (Dentist, Hygienist, Admin, Manager).

**Details:**

1. Create /dashboard/dentist page with clinical focus
2. Create /dashboard/hygienist page with patient prep focus
3. Create /dashboard/admin page with task/payment focus
4. Create /dashboard/manager page with metrics focus
5. Implement automatic redirect based on user role
6. Add role-specific navigation
7. Create personalized greeting component
8. Add recent activity feed
9. Implement dashboard customization (widget reorder)
10. Add keyboard shortcuts for power users

**Test Strategy:**

1. Verify correct dashboard loads per role
2. Test navigation between sections
3. Confirm personalization is saved
4. Test keyboard shortcuts
5. Verify redirect behavior

## Subtasks

### 17.1. Create dentist and hygienist dashboards

**Status:** pending  
**Dependencies:** None  

Build /dashboard/dentist (clinical focus) and /dashboard/hygienist (patient prep)

### 17.2. Create admin and manager dashboards

**Status:** pending  
**Dependencies:** None  

Build /dashboard/admin (tasks/payments) and /dashboard/manager (metrics)

### 17.3. Implement role-based routing

**Status:** pending  
**Dependencies:** 17.1, 17.2  

Auto-redirect users to correct dashboard based on role

### 17.4. Add personalization features

**Status:** pending  
**Dependencies:** 17.1, 17.2  

Implement widget reorder, greeting component, recent activity
