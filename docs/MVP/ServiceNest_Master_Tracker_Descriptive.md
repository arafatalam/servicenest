# 🪺 ServiceNest — MVP v1.0 Master Tracker (Descriptive Edition)

## Purpose
This tracker organizes ServiceNest MVP development into meaningful, testable milestones that reflect real developer workflow.
Tasks are grouped by:
- File-level completion
- Feature-level outcomes
- Testable checkpoints

You can pause at any time and resume by referencing the last completed task ID.

---

## 🧠 LOCKED TEACHING METHOD

When building any file:
1) Show FULL file at the beginning
2) Teach one file at a time
3) Explain line-by-line in simple language
4) Use beginner-friendly metaphors
5) Show FULL file again at end
6) Provide runnable demo
7) STOP for DONE or ERROR confirmation

---

# SLICE 0 — FOUNDATION (READ ONLY)

## Goal
Lock scope, data model, and technology decisions to avoid future refactoring.

### Tasks
- [DONE] MVP scope finalized
- [DONE] Data model finalized
- [DONE] Tech stack locked

### Checkpoint
✔ No scope changes allowed without version bump

---

# SLICE 1 — PROJECT BOOTSTRAP [DONE]

### 🔒 S1.XX Module System Lock — ESM Only (Whole Project) [LOCKED]

#### Goal
Ensure consistent module behavior across the entire project and eliminate runtime conflicts caused by mixing CommonJS and ESM.

---

### Decision
The ServiceNest project will use **ESM (ECMAScript Modules)** exclusively across all environments.

This applies to:
- Backend code
- Prisma configuration
- Test scripts
- Utility scripts
- Future frontend tooling integrations

---

### Required Standards

The following must remain in `package.json`:

``json
"type": "module"

---

## Goal
Set up backend and frontend structure so development can begin safely.

### S1.01 Repository Setup
- [DONE] Create backend/frontend directories
- [DONE] Add .gitignore
- [DONE] Confirm folder structure

Checkpoint:
✔ Clean repository structure established

---

### S1.02 Backend Initialization
- [DONE] Initialize Node project
- [DONE] Install dependencies (Express, CORS, Dotenv)
- [DONE] Install Nodemon
- [DONE] Enable ESM
- [DONE] Add start scripts

Checkpoint:
✔ Backend can start without crashing

---

### S1.03 Backend Skeleton [DONE]

#### S1.03.A Create app.js
Outcome:
- Express app configured
- Middleware added
- Routes mounted

Checkpoint:
✔ app.js loads without errors

---

#### S1.03.B Create routes/index.js [DONE]
Outcome:
- Router created
- Health endpoint defined

Checkpoint:
✔ Routes import successfully

---

#### S1.03.C Create server.js [DONE]
Outcome:
- Server listens on port
- Environment variables loaded

Checkpoint:
✔ Server boots correctly

---

### S1.04 Backend Health Test [DONE]
- Run dev server
- Visit /api/health
- Confirm JSON response

Checkpoint:
✔ Backend verified alive

---

# SLICE 2 — DATABASE SETUP [DONE]

## Goal
Prepare database infrastructure for persistent data.

### 🔒 S2.01 Database Tooling Lock — Prisma + ESM [LOCKED]

#### Goal
Ensure consistent migrations, eliminate tooling conflicts, and prevent future CommonJS/Knex issues.

---

### Decision
The ServiceNest project will use **Prisma** exclusively for:
- Database modeling
- Schema migrations
- Query access

Knex is permanently deprecated for this project.

---

### 🔒 S2.02 Primary Key Standard — BIGINT AUTO_INCREMENT [LOCKED]

#### Goal
Ensure every table uses consistent primary keys that are fast, small, and easy to join.

---

### Decision
For MVP v1.0:
- All single-column primary keys must be: **BIGINT AUTO_INCREMENT**
- UUID primary keys are not allowed in MVP v1.0
- Join tables may use composite primary keys (provider_id + city_id, etc.)

---

### Prisma Rule (How we express this)
- Use `BigInt @id @default(autoincrement())` for primary keys
- Use `BigInt` for related foreign keys

---

### Prisma Lock Rules
- Prisma is the **only** approved migration tool
- All schema changes must go through:
- For Prisma Guide, see **ServiceNest_Prisma_Migration_Setup_Guide.md**
``bash
npx prisma migrate dev


### Tasks
- [DONE] Install MySQL
- [DONE] Create database
- [DONE] Verify connection
- [DONE] Configure backend DB connection
- [DONE] Run first migration

Checkpoint:
✔ Backend connects to database successfully

---

# SLICE 3 — AUTHENTICATION [DONE]

## Goal
Allow users to register and login securely.

### Tasks
- [DONE] Define API contracts
- [DONE] Implement password hashing
- [DONE] Create JWT utilities
- [DONE] Build register/login endpoints
- [DONE] Add authentication middleware

Checkpoint:
✔ User can register and login
✔ JWT issued successfully
✔ Protected route works (/api/me)

---

# SLICE 4 — DISCOVERY DATA

## Goal
Enable browsing by city and category.

### Tasks
- Create migrations
- Seed initial data
- Build browse endpoints

Checkpoint:
✔ Cities and categories load via API

---

# SLICE 5 — PROVIDERS

## Goal
Display provider profiles and services.

### Tasks
- Create provider migrations
- Build providers list endpoint
- Build provider profile endpoint
- Connect frontend

Checkpoint:
✔ Providers visible in UI

---

# SLICE 6 — SEARCH

## Goal
Allow filtering providers using global substring search.

### Tasks
- Implement backend search logic
- Add price filtering
- Connect UI filters

Checkpoint:
✔ Search results update correctly

---

# SLICE 7 — SERVICE REQUESTS

## Goal
Allow clients to request services and providers to respond.

### Tasks
- Create request migrations
- Implement request creation
- Provider accept/reject flow
- UI integration

Checkpoint:
✔ Request lifecycle works end-to-end

---

# SLICE 8 — PAYMENTS

## Goal
Implement manual escrow system.

### Tasks
- Create payment tables
- Admin mark-paid logic
- Status transitions

Checkpoint:
✔ Escrow payment status updates correctly

---

# SLICE 9 — COMPLETION & INVOICES

## Goal
Close service workflow and generate invoices.

### Tasks
- Completion confirmations
- Payout processing
- Invoice generation

Checkpoint:
✔ Request closes successfully

---

# SLICE 10 — REVIEWS

## Goal
Allow clients to leave feedback.

### Tasks
- Create reviews migration
- Build review endpoints
- Provider reply functionality

Checkpoint:
✔ Reviews appear correctly

---

# SLICE 11 — MESSAGING

## Goal
Enable client-provider communication.

### Tasks
- Create conversation tables
- Implement messaging endpoints
- UI chat panel

Checkpoint:
✔ Messages send and load correctly

---

# SLICE 12 — ADMIN CONTROLS

## Goal
Allow administrative oversight.

### Tasks
- Provider approval system
- Manage cities/categories
- Admin UI

Checkpoint:
✔ Admin actions affect system data

---

# SLICE 13 — STABILIZATION

## Goal
Prepare MVP for release.

### Tasks
- Validation middleware
- Error handling
- Seed realistic data
- End-to-end testing

Checkpoint:
✔ Full system passes smoke tests

---

END OF TRACKER
