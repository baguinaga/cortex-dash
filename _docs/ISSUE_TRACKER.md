# Issue Tracker

## Format Guidelines

- Each issue has a unique ID (e.g., `ISSUE-001`)
- Status options: `Open`, `In Progress`, `Done`, `Post-MVP`, `Blocked`
- Priority levels: `High`, `Medium`, `Low`

## High Priority Bugs

### ISSUE-001: Incorrect Redirect Behavior for Invalid Dashboard Routes

- **Status:** Open
- **Priority:** High
- **Description:** Navigating to wrong dashboard endpoints (e.g., `/dashboard/invalid-theme`) redirects to healthcare instead of showing a 404. We need to elegantly handle typos or missing dashboard configs.
- **Proposed Solution:** Show a 404 page or display a toast notification letting users know they were redirected, and update the URL accordingly.
- **Location:** `frontend/src/app/dashboard/[theme]/page.tsx`

---

## Post-MVP Enhancements

### ISSUE-002: Automated Config Loading for Navbar

- **Status:** Post-MVP
- **Priority:** Medium
- **Description:** Currently, available themes in the navbar are hardcoded in an array. We need an automated script/function to dynamically load available configs.
- **Current Implementation:** Manual array in `frontend/src/components/Navbar.tsx` lines 17-21
- **Proposed Solution:** File system-based discovery of `*.config.ts` files in the configs directory

### ISSUE-003: Graceful Root Route Handling

- **Status:** Post-MVP
- **Priority:** Medium
- **Description:** Need to handle graceful redirecting from various wrong endpoints to a default dashboard (e.g., `/dashboard/` → default dashboard).
- **Current Implementation:** Simple redirect from `/` to `/dashboard/pharmacy` in `frontend/src/app/page.tsx`
- **Scope:** Expand to handle more redirect scenarios and edge cases, can be coupled with ISSUE-001.

---

## Architectural Debt

### ISSUE-004: Theme Generator Background Color Limitation

- **Status:** Post-MVP
- **Priority:** Low
- **Description:** The theme generator forces card backgrounds to near-white by using `mainBgScale[0]`. This limits flexibility for true dark-mode backgrounds.
- **Location:** `frontend/src/lib/theme-generator.ts` lines 100-102
- **Impact:** Restricts theming options for dashboards that might want darker card backgrounds

### ISSUE-005: API Endpoint Schema Validation

- **Status:** Post-MVP
- **Priority:** Medium
- **Description:** Currently, we only validate the existence of `apiEndpoints` object but not its structure against the expected schema for each theme type.
- **Proposed Enhancement:** Runtime validation of endpoint schemas to catch configuration errors early
- **Location:** `frontend/src/app/dashboard/[theme]/page.tsx` - `getDashboardConfig` function

---

## Future Features

### ISSUE-006: Notification System Database Architecture

- **Status:** Blocked
- **Priority:** Low (Post Authentication)
- **Description:** Implement the relational notification model for production (notifications table + user_notifications junction table) to support multi-user notification delivery and read states.
- **Dependencies:** Requires PostgreSQL setup and user authentication system
- **Context:** Currently using simple mock notifications derived from script status. Descoped until the creation of a user authentication flow. There is currently only 1 user
  being served mock data, leading to deprioritization of a genuine multi client notification system.

### ISSUE-007: Script Details Drill-Down Endpoint

- **Status:** Post-MVP
- **Priority:** Medium
- **Description:** Implement `/api/pharmacy/script_details/{scriptId}` endpoint for detailed script information and history.
- **Context:** Currently removed `/pharmacy/script_status` endpoint in favor of this more logical approach.
