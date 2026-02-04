# Task ID: 11

**Title:** Local Agent - PMS Data Extraction

**Status:** pending

**Dependencies:** 1

**Priority:** high

**Description:** Implement the local agent's ability to extract schedule data from Dentrix/Eaglesoft.

**Details:**

1. Create modular extractor architecture (BaseExtractor, DentrixExtractor, EaglesoftExtractor)
2. Implement Dentrix ODBC database connection
3. Query today's schedule from Dentrix tables
4. Implement Playwright-based screen scraping fallback
5. Support CSV file upload as alternative input
6. Handle connection failures gracefully
7. Cache extracted data in local SQLite
8. Log extraction metrics (time, record count)
9. Support incremental extraction for updates
10. Create abstraction layer for adding new PMS systems

**Test Strategy:**

1. Test Dentrix ODBC extraction with mock DB
2. Test screen scraping with recorded responses
3. Test CSV file parsing
4. Verify caching works correctly
5. Test error handling on connection failure

## Subtasks

### 11.1. Create extractor architecture

**Status:** pending  
**Dependencies:** None  

Design BaseExtractor, DentrixExtractor, EaglesoftExtractor class hierarchy

### 11.2. Implement Dentrix ODBC integration

**Status:** pending  
**Dependencies:** 11.1  

Connect to Dentrix database via ODBC and query schedule tables

### 11.3. Implement Playwright screen scraping

**Status:** pending  
**Dependencies:** 11.1  

Create fallback screen scraper using Playwright for PMS without DB access

### 11.4. Implement CSV file parsing

**Status:** pending  
**Dependencies:** 11.1  

Support manual CSV upload as alternative input method

### 11.5. Add SQLite caching

**Status:** pending  
**Dependencies:** 11.2, 11.3, 11.4  

Cache extracted data locally for 7 days, support incremental updates

### 11.6. Implement error handling

**Status:** pending  
**Dependencies:** 11.2, 11.3, 11.4  

Handle connection failures gracefully, log extraction metrics
