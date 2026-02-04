# Task ID: 14

**Title:** Local Agent - Windows Service and Scheduling

**Status:** pending

**Dependencies:** 13

**Priority:** medium

**Description:** Package the local agent as a Windows service with 6 AM scheduled trigger.

**Details:**

1. Create Windows service wrapper using pywin32
2. Configure 6 AM daily trigger using Windows Task Scheduler
3. Implement service start/stop/restart handling
4. Create system tray icon for status monitoring
5. Add configuration file for schedule customization
6. Implement logging to Windows Event Log
7. Create installer using PyInstaller + Inno Setup
8. Handle service recovery on failure
9. Add health check endpoint for monitoring
10. Create uninstaller for clean removal

**Test Strategy:**

1. Test service installation/uninstallation
2. Verify 6 AM trigger fires correctly
3. Test service recovery after crash
4. Confirm Event Log entries
5. Test installer on clean Windows machine

## Subtasks

### 14.1. Create Windows service wrapper

**Status:** pending  
**Dependencies:** None  

Implement Windows service using pywin32 with start/stop/restart handling

### 14.2. Configure Task Scheduler trigger

**Status:** pending  
**Dependencies:** 14.1  

Set up 6 AM daily trigger via Windows Task Scheduler

### 14.3. Create system tray icon

**Status:** pending  
**Dependencies:** 14.1  

Add system tray UI for status monitoring and manual trigger

### 14.4. Create installer with PyInstaller

**Status:** pending  
**Dependencies:** 14.1, 14.2, 14.3  

Package as standalone .exe using PyInstaller, create Inno Setup installer

### 14.5. Add logging and recovery

**Status:** pending  
**Dependencies:** 14.1  

Log to Windows Event Log, implement service recovery on failure
