# Task ID: 6

**Title:** IngestionAgent Implementation

**Status:** pending

**Dependencies:** 5

**Priority:** high

**Description:** Implement the IngestionAgent node that normalizes and cleans incoming schedule data.

**Details:**

1. Create IngestionAgent class inheriting from LangGraph node pattern
2. Define input schema (raw JSON/CSV/text from local agent)
3. Implement OCR text cleanup using regex and LLM assistance
4. Normalize data into ScheduleSchema Pydantic model
5. Handle various date/time formats
6. Validate procedure codes against known list
7. Flag unknown/suspicious data for review
8. Output clean PatientAppt list
9. Log normalization statistics
10. Handle empty or malformed input gracefully

**Test Strategy:**

1. Test with various input formats (JSON, CSV, OCR text)
2. Verify date/time normalization
3. Test with messy OCR output
4. Confirm validation catches bad procedure codes
5. Test empty input handling

## Subtasks

### 6.1. Create IngestionAgent class

**Status:** pending  
**Dependencies:** None  

Implement agent class following LangGraph node pattern with input/output schemas

### 6.2. Implement OCR text cleanup

**Status:** pending  
**Dependencies:** 6.1  

Create regex and LLM-assisted cleanup for messy OCR text from screen scraping

### 6.3. Implement data normalization

**Status:** pending  
**Dependencies:** 6.1  

Normalize data into ScheduleSchema, handle various date/time formats

### 6.4. Add procedure code validation

**Status:** pending  
**Dependencies:** 6.3  

Validate procedure codes against known list, flag unknown codes

### 6.5. Handle edge cases

**Status:** pending  
**Dependencies:** 6.2, 6.3, 6.4  

Implement graceful handling for empty input, malformed data, missing fields
