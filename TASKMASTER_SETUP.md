# Taskmaster Setup Guide for Cursor

## Current Status

✅ **Taskmaster CLI**: Installed (v0.37.1)  
✅ **MCP Configuration**: Found at `~/.cursor/mcp.json`  
⚠️ **API Keys**: Need to be configured

## How to See Taskmaster in Cursor

### 1. Check MCP Status in Cursor

Taskmaster should appear as an MCP server in Cursor. To verify:

1. **Open Cursor Settings**:
   - Press `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux)
   - Or go to: Cursor → Settings

2. **Navigate to MCP Settings**:
   - Search for "MCP" in settings
   - Or go to: Features → Model Context Protocol

3. **Verify Taskmaster is Listed**:
   - You should see `taskmaster-ai` in the list of MCP servers
   - Status should show as "Connected" or "Available"

### 2. Add Required API Keys

Your current MCP config needs these API keys (update `~/.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "taskmaster-ai": {
      "command": "npx",
      "args": ["-y", "--package=task-master-ai", "task-master-ai"],
      "env": {
        "ANTHROPIC_API_KEY": "YOUR_ANTHROPIC_API_KEY_HERE",
        "OPENAI_API_KEY": "your-existing-key",
        "PERPLEXITY_API_KEY": "YOUR_PERPLEXITY_API_KEY_HERE"
      }
    }
  }
}
```

**Get API Keys:**
- **Anthropic**: https://console.anthropic.com/
- **Perplexity**: https://www.perplexity.ai/settings/api (optional, for research features)

### 3. Restart Cursor

After updating the MCP config:
1. **Save** the `mcp.json` file
2. **Restart Cursor completely** (quit and reopen)
3. **Check MCP status** again in settings

### 4. Verify Taskmaster is Working

Once restarted, you should be able to:

**Option A: Use MCP Tools Directly**
- I can use Taskmaster MCP tools (which I've been doing)
- Commands like `mcp_taskmaster-ai_get_tasks`, `mcp_taskmaster-ai_add_task`, etc.

**Option B: Use CLI Commands**
```bash
# In terminal
cd /Users/jaywest/SellerFi/seller-financing-platform
task-master list
task-master next
```

**Option C: Check in Cursor UI**
- Some Cursor versions show MCP tools in the command palette
- Press `Cmd+Shift+P` and search for "taskmaster" or "MCP"

## Troubleshooting

### If Taskmaster Still Doesn't Appear:

1. **Check MCP Logs**:
   - Open Cursor's Developer Tools: `Cmd+Option+I`
   - Check Console for MCP errors

2. **Verify Installation**:
   ```bash
   npx task-master-ai --version
   # Should show version number
   ```

3. **Test MCP Connection**:
   ```bash
   # Test if MCP server can start
   npx -y --package=task-master-ai task-master-ai
   ```

4. **Check File Permissions**:
   ```bash
   ls -la ~/.cursor/mcp.json
   # Should be readable
   ```

## Current Configuration

Your Taskmaster project is initialized at:
```
/Users/jaywest/SellerFi/seller-financing-platform/.taskmaster/
```

**Next Steps:**
1. Add your PRD to `.taskmaster/docs/prd.txt`
2. Run: `task-master parse-prd` (or I can do it via MCP)
3. Start using tasks: `task-master list`

## Quick Test

After adding API keys and restarting, test with:
```bash
cd /Users/jaywest/SellerFi/seller-financing-platform
task-master list
```

If this works, Taskmaster is properly installed and configured!

