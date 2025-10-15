# CODEX.md

## Core Principles

1. **Clarity over cleverness**  
   Write code that is easy to read and understand. Favor simplicity, meaningful names, and small, focused functions.

2. **Test what matters**  
   Strive to write tests before or alongside your code. Every public method and every bug fix should have at least one test.

3. **Security by default**  
   Always validate input and sanitize output. Never hardcode secrets. Use the principle of least privilege.

4. **Consistency is key**  
   Follow the established code style and project structure. Keep formatting, naming, and folder organization consistent.

5. **Fail loudly, log wisely**  
   Handle errors intentionally. Use logging levels properly, and never swallow exceptions silently.

---

### Technology Stack Policy

**Frontend**
- Framework: **React** (mandatory)
- Language: **TypeScript** (mandatory)
- Styling: Tailwind CSS (preferred) or CSS Modules
- State/Data: React Query for server state; lightweight local state (Context/Zustand)

**Backend**
- Primary: **Java 21+** with Spring Boot (mandatory)
- Node.js: allowed for tooling, build scripts, and small services (TypeScript only)

**APIs & Data**
- API style: REST first; consider GraphQL only with a clear, documented benefit
- Database: PostgreSQL (preferred) or MySQL if required
- Data access: JPA/Hibernate (Java); use explicit SQL where it improves clarity/performance

**Testing & Tooling Defaults**
- Frontend: Vitest/Jest + React Testing Library; Playwright for E2E
- Backend: JUnit 5 + Testcontainers
- Package manager: **pnpm** (preferred) or npm; never Yarn v1
- Monorepo (if used): Turborepo
- Lint/Format: ESLint + Prettier (frontend); Checkstyle/Spotless (backend)

**Rules**
- No plain JavaScript in app code — **TypeScript only**.
- No Kotlin — **Java only** on the JVM.
- Any deviation from this stack must be justified and approved by **@alpsten**.

---

## Testing Philosophy

- **Test behavior, not implementation.** Focus on what the code *should do*, not how it does it.
- **Keep tests isolated.** Tests should not depend on external systems unless explicitly mocked or stubbed.
- **Use meaningful names.** Test names should read like documentation.
- **Automate testing.** Run tests automatically before every commit or merge.
- **Prefer readable over clever assertions.** Tests are part of the documentation too.

---

## Code Review Rules

1. **Review the code, not the coder.** Keep discussions professional and constructive.
2. **Focus on intent and clarity.** Ask “Can I understand what this code does in 30 seconds?”
3. **Respect the codex.** Point out deviations, but stay open to justified exceptions.
4. **Approve small, frequent PRs.** Avoid large, unreviewable pull requests.
5. **Ask before rewriting.** Suggest improvements, don’t impose style unless critical.

---

## Architecture Decisions

- **Keep it modular.** Each component should have one clear responsibility.
- **Minimize coupling, maximize cohesion.** Classes and modules should depend on abstractions, not implementations.
- **Document decisions.** When architecture changes, note *why* and *what trade-offs* were made.
- **Prefer composition over inheritance.** Reuse code by combining behaviors, not by extending classes.
- **Think scalability early, but optimize later.** Design cleanly now; optimize when needed.

---

## Decision Making

- **Always confirm before changing code.**  
  No changes, refactors, or architecture adjustments should be made without explicit approval from the project lead ([@your-name]).

- **Explain the “why.”**  
  When proposing a change, include a short summary of what, why, and potential risks or side effects.

- **Stay within scope.**  
  Only modify the parts of the codebase related to your current task unless instructed otherwise.

- **Document approved decisions.**  
  Once a change is approved, briefly document it in the changelog, pull request, or a `DECISIONS.md` if applicable.

---

*This codex is a living document — update it as the team and codebase evolve.*
