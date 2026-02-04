# Task ID: 18

**Title:** Chat Interface for Q&A

**Status:** pending

**Dependencies:** 17

**Priority:** medium

**Description:** Implement the chat interface for asking questions about today's schedule.

**Details:**

1. Create ChatPanel component with message history
2. Implement POST /api/v1/chat/query backend endpoint
3. Create ChatMessage component with user/AI styling
4. Implement streaming responses for better UX
5. Add suggested questions/prompts
6. Implement context-aware responses (knows current schedule)
7. Add message persistence within session
8. Implement typing indicator
9. Add copy-to-clipboard for responses
10. Create mobile-friendly chat drawer

**Test Strategy:**

1. Test question/response flow
2. Verify streaming works correctly
3. Test suggested prompts
4. Confirm context awareness
5. Test mobile layout

## Subtasks

### 18.1. Create ChatPanel component

**Status:** pending  
**Dependencies:** None  

Build chat UI with message history and input field

### 18.2. Implement chat backend endpoint

**Status:** pending  
**Dependencies:** None  

Create POST /api/v1/chat/query with context-aware LLM integration

### 18.3. Add streaming responses

**Status:** pending  
**Dependencies:** 18.1, 18.2  

Implement Server-Sent Events for real-time response streaming

### 18.4. Add context awareness

**Status:** pending  
**Dependencies:** 18.2  

Include current schedule context in LLM prompts

### 18.5. Create mobile-friendly layout

**Status:** pending  
**Dependencies:** 18.1  

Implement responsive chat drawer for mobile devices
