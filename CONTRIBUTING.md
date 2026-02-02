# Contributing to Baseline Project

Thank you for your interest in contributing to the Baseline Project! This AI Development Toolkit thrives on community contributions.

## 🎯 How You Can Contribute

We welcome contributions in several areas:

### 1. **AI Agents** 🤖
- Add new specialized agents for specific tasks
- Improve existing agent configurations
- Document agent usage patterns
- Share agent orchestration workflows

### 2. **Claude Skills** 🎓
- Create new skills for specialized domains
- Enhance existing skill documentation
- Add examples and use cases
- Improve skill discoverability

### 3. **Documentation** 📚
- Fix typos and improve clarity
- Add tutorials and guides
- Create video walkthroughs
- Translate documentation
- Share case studies and examples

### 4. **Configurations** ⚙️
- Improve ESLint rules
- Enhance TypeScript configurations
- Add new GitHub Actions workflows
- Optimize build processes

### 5. **Example Implementations** 💡
- Share how you've used the toolkit
- Contribute example applications
- Document integration patterns
- Create starter templates

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (LTS recommended)
- Git
- Familiarity with AI-assisted development
- Experience with Cursor, Claude Code, or similar AI IDEs (recommended)

### Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/baseline-project.git
   cd baseline-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your changes**
   - Follow the coding standards below
   - Test your changes thoroughly
   - Update documentation as needed

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add new AI agent for X"
   # See commit message guidelines below
   ```

6. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   # Then open a PR on GitHub
   ```

---

## 📝 Contribution Guidelines

### Code Standards

#### AI Agents (`.claude/agents/`)
- **Location:** Place agents in appropriate category folders
- **Naming:** Use descriptive kebab-case names (e.g., `security-auditor.md`)
- **Structure:** Follow existing agent template format
- **Documentation:** Include purpose, usage examples, and dependencies

**Example Agent Structure:**
```markdown
# Agent Name

## Purpose
Brief description of what this agent does.

## Usage
How to invoke and use this agent.

## Examples
Concrete examples of agent in action.

## Dependencies
Other agents or skills this depends on.
```

#### Claude Skills (`.claude/skills/`)
- **Location:** Create folder with skill name
- **Required Files:** `SKILL.md` (main documentation)
- **Optional Files:** Reference materials, examples
- **Format:** Follow existing skill structure

**Example Skill Structure:**
```markdown
# Skill Name

## When to Use
Describe when this skill should be activated.

## How It Works
Explain the skill's approach and methodology.

## Examples
Show concrete usage examples.

## References
Link to relevant documentation or resources.
```

#### Documentation
- Use clear, concise language
- Include code examples where helpful
- Add links to related documentation
- Keep formatting consistent
- Test all commands and code snippets

#### Configurations
- Follow existing patterns
- Add comments explaining non-obvious choices
- Test configurations thoroughly
- Document any breaking changes

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

**Format:**
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat:` New feature or capability
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks
- `perf:` Performance improvements

**Examples:**
```bash
feat(agents): Add database optimization agent
fix(skills): Correct TypeScript skill example
docs(readme): Update installation instructions
chore(deps): Update dependencies to latest versions
```

**Scope Guidelines:**
- `agents` - AI agent changes
- `skills` - Claude skill changes
- `docs` - Documentation updates
- `config` - Configuration changes
- `workflows` - GitHub Actions workflows
- `taskmaster` - Taskmaster integration

### Pull Request Guidelines

**Before Submitting:**
- [ ] Code follows project style guidelines
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] Changes are tested
- [ ] No merge conflicts with main branch

**PR Title Format:**
```
<type>: Brief description of changes
```

**PR Description Should Include:**
- **What:** What changes were made
- **Why:** Why these changes are needed
- **How:** How the changes work
- **Testing:** How you tested the changes
- **Screenshots:** If applicable (for UI/docs changes)

**Example PR Description:**
```markdown
## What
Adds a new security auditor agent specialized in API security.

## Why
Current security agents focus on frontend; we need API-specific security checks.

## How
- Created new agent in `.claude/agents/security/`
- Added integration with existing security workflow
- Documented usage patterns and examples

## Testing
- Tested against 5 different API codebases
- Verified integration with security workflow
- Validated documentation examples

## Related Issues
Closes #42
```

---

## 🧪 Testing Your Changes

### AI Agents
```bash
# Test agent invocation
# (Requires Cursor or Claude Code)
# Verify agent responds correctly
# Check agent output quality
```

### Skills
```bash
# Test skill activation
# Verify skill provides correct guidance
# Check examples work as documented
```

### Documentation
```bash
# Verify all links work
# Test all code examples
# Check formatting renders correctly
# Ensure clarity and accuracy
```

### Configurations
```bash
# Test linting
npm run lint

# Test type checking
npm run type-check

# Test build (if applicable)
npm run build
```

---

## 🎨 Style Guide

### Markdown
- Use ATX-style headers (`#` not underlines)
- Use fenced code blocks with language tags
- Use reference-style links for repeated URLs
- Keep line length reasonable (80-100 chars preferred)
- Use emoji sparingly and consistently

### Code Examples
- Include language tags in code blocks
- Add comments explaining non-obvious parts
- Show both good and bad examples where helpful
- Test all examples before committing

### File Organization
```
.claude/
├── agents/
│   ├── category/
│   │   └── agent-name.md
├── skills/
│   ├── skill-name/
│   │   ├── SKILL.md
│   │   └── references/
└── commands/
    └── command-name.md
```

---

## 🐛 Reporting Bugs

**Before Reporting:**
- Check if the issue already exists
- Verify it's actually a bug (not expected behavior)
- Gather relevant information

**Bug Report Should Include:**
- **Description:** Clear description of the bug
- **Steps to Reproduce:** Exact steps to reproduce
- **Expected Behavior:** What should happen
- **Actual Behavior:** What actually happens
- **Environment:** OS, Node version, AI IDE, etc.
- **Screenshots:** If applicable
- **Logs:** Relevant error messages or logs

**Use the Bug Report Template** when creating issues.

---

## 💡 Suggesting Features

**Before Suggesting:**
- Check if feature already exists or is planned
- Consider if it fits project scope
- Think about implementation approach

**Feature Request Should Include:**
- **Problem:** What problem does this solve?
- **Solution:** Proposed solution
- **Alternatives:** Alternative approaches considered
- **Use Cases:** Concrete examples of usage
- **Impact:** Who benefits and how?

**Use the Feature Request Template** when creating issues.

---

## 🤝 Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and inclusive environment:

- **Be Respectful:** Treat everyone with respect
- **Be Constructive:** Provide helpful feedback
- **Be Patient:** Remember everyone was a beginner once
- **Be Collaborative:** Work together toward common goals
- **Be Professional:** Keep discussions on-topic and productive

### Communication Channels

- **GitHub Issues:** Bug reports and feature requests
- **GitHub Discussions:** Questions, ideas, and general discussion
- **Pull Requests:** Code contributions and reviews

### Getting Help

- **Documentation:** Check README.md and DISCLAIMER.md first
- **Discussions:** Ask questions in GitHub Discussions
- **Issues:** Report bugs or request features
- **Examples:** See AGENTS.md and CLAUDE.md for patterns

---

## 📚 Resources

### Project Documentation
- [README.md](README.md) - Project overview
- [DISCLAIMER.md](DISCLAIMER.md) - What's included vs not
- [ADOPTION_READINESS_REVIEW.md](ADOPTION_READINESS_REVIEW.md) - Detailed assessment
- [AGENTS.md](AGENTS.md) - Agent patterns and examples
- [CLAUDE.md](CLAUDE.md) - Implementation examples

### AI Development
- [Cursor Documentation](https://cursor.sh/docs)
- [Claude Code Documentation](https://claude.ai/docs)
- [Taskmaster Documentation](.taskmaster/docs/)
- [Compound Engineering](.claude/COMPOUND_QUICK_START.md)

### External Resources
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

---

## 🏆 Recognition

Contributors are recognized in several ways:

- **Contributors List:** Added to README.md
- **Release Notes:** Mentioned in changelog
- **GitHub Profile:** Contributions show on your profile
- **Community Recognition:** Highlighted in discussions

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## ❓ Questions?

- **General Questions:** Use GitHub Discussions
- **Bug Reports:** Create an issue with bug report template
- **Feature Ideas:** Create an issue with feature request template
- **Security Issues:** Email maintainers directly (see SECURITY.md)

---

## 🙏 Thank You!

Your contributions make this project better for everyone. Whether you're fixing a typo, adding a new agent, or improving documentation, every contribution matters.

**Happy Contributing!** 🚀

---

**Last Updated:** February 2, 2026  
**Version:** 1.0.0
