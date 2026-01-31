# 🪺 ServiceNest — MVP v1.0 Master Tracking File (13 SLICES)

## Purpose
This file is the **single source of truth** for building ServiceNest MVP **as a beginner**, using **micro-steps**.

Designed so that:
- Steps are **small (2–10 minutes)**
- You can stop at ANY micro-step and resume later
- After memory wipe, you can say: **“Start from Sx.yy.zz”**
- The **teaching method is permanently documented**

---

## 🧠 LOCKED TEACHING METHOD (CRITICAL — READ FIRST)

When continuing this project, the assistant **MUST** follow this exact method:

1) Show the **FULL copy-pastable file at the BEGINNING** of a step  
2) Teach **one file at a time** (no multi-file mixing)  
3) Explain the file **line-by-line in plain English**  
4) Use **simple, beginner-friendly metaphors** where suitable (house, door, switch, box, etc.)  
5) Show the **SAME FULL file AGAIN at the END** of the step (clean re-copy)  
6) Provide a **runnable DEMO** (commands + expected output) **BEFORE** asking for confirmation  
7) End every step with **STOP + confirmation** (user replies **DONE** or **ERROR**)

If this method is not followed, the build is considered **INVALID**.


---

## How Progress Is Tracked
- Task ID format: `S{Slice}.{Task}.{Micro}` (example: `S5.02.03`)
- Mark completion by changing `[ ] → [DONE]`
- Only move forward when the current micro-step is DONE
- Anything not marked DONE is assumed NOT done

---

## Golden Rules (Do Not Break)
1) API contract first for each slice (request/response JSON)
2) Frontend uses mock mode until the API for that slice is ready
3) When API is ready, switch that slice to real API mode
4) One slice must be stable before starting the next

---

# SLICE 0 — FOUNDATION (READ ONLY)

- [DONE] S0.01 MVP scope frozen (ServiceNest_MVP_v1.0_FINAL.md)
- [DONE] S0.02 Data model frozen (ServiceNest_MVP_v1.0_data_model.md)
- [DONE] S0.03 Tech stack locked (Node + Express + MySQL + Angular)

---

# SLICE 1 — PROJECT BOOTSTRAP (BACKEND + FRONTEND)

## 🔧 Backend Module System Note (ESM)
- Backend uses **Node.js ESM (ECMAScript Modules)** instead of CommonJS
- `package.json` includes `"type": "module"`
- All backend files use `import / export` syntax
- Decision made during **S1.02** before S1.03

Reason:
- Aligns with modern Node.js standards
- Avoids future refactors when adding tooling (Swagger, ESLint, etc.)

## S1.01 — Repo structure
- [DONE] S1.01.01 Create `/backend`
- [DONE] S1.01.02 Create `/frontend`
- [DONE] S1.01.03 Add root `.gitignore`
- [DONE] S1.01.04 Verify repo tree looks correct

## S1.02 — Backend init (ESM)
- [DONE] S1.02.01 `cd backend`
- [DONE] S1.02.02 `npm init -y`
- [DONE] S1.02.03 Install runtime deps: `express`
- [DONE] S1.02.04 Install runtime deps: `dotenv`
- [DONE] S1.02.05 Install runtime deps: `cors`
- [DONE] S1.02.06 Install dev deps: `nodemon`
- [DONE] S1.02.07 Add `"type": "module"` in `package.json`
- [DONE] S1.02.08 Add scripts: `"dev"` and `"start"`
- [DONE] S1.02.09 (Optional) Create `nodemon.json`

## S1.03 — Backend skeleton (ESM)
### app.js
- [DONE] S1.03.01 Create `backend/src/` folder
- [DONE] S1.03.02 Create `backend/src/routes/` folder
- [DONE] S1.03.03 Create `backend/src/app.js`
- [DONE] S1.03.04 Add import line: `express`
- [DONE] S1.03.05 Add import line: `cors`
- [DONE] S1.03.06 Add import line: routes
- [DONE] S1.03.07 Create `app = express()`
- [DONE] S1.03.08 Add `app.use(cors())`
- [DONE] S1.03.09 Add `app.use(express.json())`
- [DONE] S1.03.10 Add `app.use("/api", routes)`
- [DONE] S1.03.11 Add `export default app`

### routes/index.js
- [ ] S1.03.12 Create `backend/src/routes/index.js`
- [ ] S1.03.13 Import `{ Router }` from `express`
- [ ] S1.03.14 Create `router = Router()`
- [ ] S1.03.15 Add `GET /health` route
- [ ] S1.03.16 Return JSON `{ status: "ok" }`
- [ ] S1.03.17 Export default router

### server.js
- [ ] S1.03.18 Create `backend/src/server.js`
- [ ] S1.03.19 Add `import "dotenv/config"`
- [ ] S1.03.20 Import `app` from `./app.js`
- [ ] S1.03.21 Define `PORT` constant
- [ ] S1.03.22 Call `app.listen(PORT, ...)`

## S1.04 — Backend health
- [ ] S1.04.01 Run `npm run dev`
- [ ] S1.04.02 Open browser to `/api/health`
- [ ] S1.04.03 Confirm response `{ "status": "ok" }`
- [ ] S1.04.04 Stop server cleanly (CTRL+C)

## S1.05 — Frontend init (Angular)
- [ ] S1.05.01 Install Angular CLI (if missing)
- [ ] S1.05.02 Create Angular app in `/frontend` (module-based / non-standalone)
- [ ] S1.05.03 Run Angular dev server once
- [ ] S1.05.04 Install Bootstrap 5
- [ ] S1.05.05 Add Bootstrap CSS to Angular config
- [ ] S1.05.06 Add Tailwind (minimal) and confirm build works

## S1.06 — Frontend skeleton pages
- [ ] S1.06.01 Create basic layout (Navbar component)
- [ ] S1.06.02 Create placeholder pages: Home
- [ ] S1.06.03 Create placeholder pages: Providers list
- [ ] S1.06.04 Create placeholder pages: Provider profile
- [ ] S1.06.05 Create placeholder pages: Login
- [ ] S1.06.06 Add routing to navigate between pages
- [ ] S1.06.07 Confirm routes load without errors

## S1.07 — Frontend mock mode scaffolding
- [ ] S1.07.01 Create `core/` folder structure
- [ ] S1.07.02 Create `api-base.ts` with base URL constant
- [ ] S1.07.03 Add `USE_MOCK` boolean toggle
- [ ] S1.07.04 Create `mock-data.ts`
- [ ] S1.07.05 Add one mock providers array
- [ ] S1.07.06 Confirm UI can render mock data

---

# SLICE 2 — DATABASE + MIGRATIONS BASE

## S2.01 — MySQL database
- [ ] S2.01.01 Install MySQL Server (local)
- [ ] S2.01.02 Open MySQL Workbench / CLI
- [ ] S2.01.03 Create database `servicenest_mvp`
- [ ] S2.01.04 Create DB user (or choose existing)
- [ ] S2.01.05 Verify you can connect successfully

## S2.02 — DB connection (backend)
- [ ] S2.02.01 Install `mysql2`
- [ ] S2.02.02 Create `.env` in backend (DB creds)
- [ ] S2.02.03 Create `backend/src/config/` folder
- [ ] S2.02.04 Create `backend/src/config/db.js`
- [ ] S2.02.05 Implement connection pool
- [ ] S2.02.06 Add a small test query (SELECT 1)
- [ ] S2.02.07 Run backend and confirm DB connects

## S2.03 — Migrations tool (Knex recommended)
- [ ] S2.03.01 Decide migrations tool (Knex OR Prisma)
- [ ] S2.03.02 Install chosen tool
- [ ] S2.03.03 Initialize config files/folders
- [ ] S2.03.04 Create first “hello migration”
- [ ] S2.03.05 Run migration successfully
- [ ] S2.03.06 Document how to run/rollback migrations

## S2.04 — Base tables (minimum)
- [ ] S2.04.01 Migration: `account`
- [ ] S2.04.02 Migration: `profile_client`
- [ ] S2.04.03 Migration: `profile_provider`
- [ ] S2.04.04 Run migrations
- [ ] S2.04.05 Verify tables exist in DB

---

# SLICE 3 — AUTH (REGISTER/LOGIN) + BASIC UI

## S3.01 — API contract: auth
- [ ] S3.01.01 Define `POST /auth/register` request JSON
- [ ] S3.01.02 Define `POST /auth/register` response JSON
- [ ] S3.01.03 Define `POST /auth/login` request JSON
- [ ] S3.01.04 Define `POST /auth/login` response JSON
- [ ] S3.01.05 Write contract in a markdown file (docs)
- [ ] S3.01.06 Add example payloads for both endpoints

## S3.02 — Backend: password + JWT utilities
- [ ] S3.02.01 Install `bcrypt`
- [ ] S3.02.02 Install `jsonwebtoken`
- [ ] S3.02.03 Create `utils/password.js` (hash)
- [ ] S3.02.04 Create `utils/password.js` (compare)
- [ ] S3.02.05 Create `utils/jwt.js` (sign)
- [ ] S3.02.06 Create `utils/jwt.js` (verify)
- [ ] S3.02.07 Add `.env` JWT secret

## S3.03 — Backend: auth endpoints
- [ ] S3.03.01 Create `/auth` route file
- [ ] S3.03.02 Add register controller skeleton
- [ ] S3.03.03 Add register validation (basic)
- [ ] S3.03.04 Insert account into DB
- [ ] S3.03.05 Return response JSON (per contract)
- [ ] S3.03.06 Add login controller skeleton
- [ ] S3.03.07 Validate credentials
- [ ] S3.03.08 Return JWT token + role

## S3.04 — Backend: auth middleware
- [ ] S3.04.01 Create auth middleware (read Authorization header)
- [ ] S3.04.02 Verify JWT token
- [ ] S3.04.03 Attach `req.user`
- [ ] S3.04.04 Create role guard middleware
- [ ] S3.04.05 Add one protected test route

## S3.05 — Frontend: login page UI
- [ ] S3.05.01 Create reactive form controls
- [ ] S3.05.02 Add required validators
- [ ] S3.05.03 Show validation messages
- [ ] S3.05.04 Create submit handler
- [ ] S3.05.05 Add basic styling (Bootstrap)

## S3.06 — Frontend: auth service (mock)
- [ ] S3.06.01 Create `auth.service.ts`
- [ ] S3.06.02 Implement mock login
- [ ] S3.06.03 Store mock token in localStorage
- [ ] S3.06.04 Add `isLoggedIn()` helper
- [ ] S3.06.05 Add logout

## S3.07 — Frontend: switch to real API
- [ ] S3.07.01 Set `USE_MOCK = false` for auth only
- [ ] S3.07.02 Call backend `/auth/login`
- [ ] S3.07.03 Handle success (store token)
- [ ] S3.07.04 Handle error UI
- [ ] S3.07.05 Verify register + login end-to-end

---

# SLICE 4 — DISCOVERY: CITIES + CATEGORIES

## S4.01 — Migrations: browse data
- [ ] S4.01.01 Migration: `city`
- [ ] S4.01.02 Migration: `category`
- [ ] S4.01.03 Add indexes (name)
- [ ] S4.01.04 Run migrations

## S4.02 — Seed initial cities
- [ ] S4.02.01 Create seed file
- [ ] S4.02.02 Insert Moncton
- [ ] S4.02.03 Insert Dieppe
- [ ] S4.02.04 Insert Riverview
- [ ] S4.02.05 Run seed and verify

## S4.03 — API contract: browse lists
- [ ] S4.03.01 Define `GET /cities` response shape
- [ ] S4.03.02 Define `GET /categories` response shape
- [ ] S4.03.03 Add sample responses

## S4.04 — Backend: browse endpoints
- [ ] S4.04.01 Create cities route
- [ ] S4.04.02 Create cities repo query
- [ ] S4.04.03 Return cities list
- [ ] S4.04.04 Create categories route
- [ ] S4.04.05 Create categories repo query
- [ ] S4.04.06 Return categories list

## S4.05 — Frontend: home filters UI (mock)
- [ ] S4.05.01 Create city dropdown
- [ ] S4.05.02 Create category dropdown
- [ ] S4.05.03 Render mock options
- [ ] S4.05.04 Store selected values in component state

## S4.06 — Frontend: switch to real API
- [ ] S4.06.01 Create browse service
- [ ] S4.06.02 Load cities from API
- [ ] S4.06.03 Load categories from API
- [ ] S4.06.04 Confirm UI renders real data

---

# SLICE 5 — PROVIDERS: PROFILE DATA + SERVICES + LIST UI

## S5.01 — Migrations: provider browse relations
- [ ] S5.01.01 Migration: `provider_city`
- [ ] S5.01.02 Migration: `provider_category`
- [ ] S5.01.03 Migration: `service`
- [ ] S5.01.04 Add indexes (provider_id, city_id, category_id)
- [ ] S5.01.05 Run migrations

## S5.02 — API contract: providers list + profile
- [ ] S5.02.01 Define `GET /providers` response shape
- [ ] S5.02.02 Define query params (q, cityId, categoryId, maxPrice, sort)
- [ ] S5.02.03 Define `GET /providers/:id` response shape
- [ ] S5.02.04 Add sample payloads

## S5.03 — Backend: providers list endpoint
- [ ] S5.03.01 Create providers route file
- [ ] S5.03.02 Implement base SQL query for list
- [ ] S5.03.03 Default sort rating DESC
- [ ] S5.03.04 Add pagination params (limit, offset) (if used)
- [ ] S5.03.05 Return list response

## S5.04 — Backend: provider profile endpoint
- [ ] S5.04.01 Fetch provider core profile
- [ ] S5.04.02 Fetch services for provider
- [ ] S5.04.03 Fetch cities served
- [ ] S5.04.04 Fetch categories
- [ ] S5.04.05 Combine into single response

## S5.05 — Frontend: providers list page (mock)
- [ ] S5.05.01 Create providers list component
- [ ] S5.05.02 Render provider cards from mock data
- [ ] S5.05.03 Add search bar UI
- [ ] S5.05.04 Add sort dropdown UI
- [ ] S5.05.05 Show empty state (no results)

## S5.06 — Frontend: provider profile page (mock)
- [ ] S5.06.01 Create provider profile component
- [ ] S5.06.02 Render profile header + description
- [ ] S5.06.03 Render services list with prices
- [ ] S5.06.04 Render cities served list
- [ ] S5.06.05 Add reviews placeholder section

## S5.07 — Frontend: switch providers to real API
- [ ] S5.07.01 Create providers API service
- [ ] S5.07.02 Load list from backend
- [ ] S5.07.03 Load profile from backend
- [ ] S5.07.04 Confirm list + profile work end-to-end

---

# SLICE 6 — SEARCH (GLOBAL SUBSTRING) + PRICE FILTER

## S6.01 — API contract: search + filters
- [ ] S6.01.01 Confirm `q` global substring behavior
- [ ] S6.01.02 Confirm optional filters: cityId, categoryId, maxPrice
- [ ] S6.01.03 Confirm sort options (default rating desc)
- [ ] S6.01.04 Update contract examples

## S6.02 — Backend: global substring search
- [ ] S6.02.01 Search provider name/description
- [ ] S6.02.02 Search service names/descriptions
- [ ] S6.02.03 Search city names (joined)
- [ ] S6.02.04 Search category names (joined)
- [ ] S6.02.05 Confirm substring match works (LIKE %q%)

## S6.03 — Backend: price filter
- [ ] S6.03.01 Decide how to filter by price (service base_price)
- [ ] S6.03.02 Add SQL condition `base_price <= maxPrice`
- [ ] S6.03.03 Confirm providers without price behave as intended
- [ ] S6.03.04 Add tests with sample values

## S6.04 — Frontend: wire search bar + filters
- [ ] S6.04.01 Bind search input to `q`
- [ ] S6.04.02 Bind dropdowns to cityId/categoryId
- [ ] S6.04.03 Bind max price input
- [ ] S6.04.04 Trigger API load on change
- [ ] S6.04.05 Show “no results” state

## S6.05 — Verify end-to-end
- [ ] S6.05.01 Search works for provider name
- [ ] S6.05.02 Search works for service name
- [ ] S6.05.03 City filter works
- [ ] S6.05.04 Category filter works
- [ ] S6.05.05 Max price filter works

---

# SLICE 7 — REQUESTS: CREATE + PROVIDER ACCEPT/REJECT

## S7.01 — Migration: service_requests
- [ ] S7.01.01 Migration: `service_request`
- [ ] S7.01.02 Add status enum values (per model)
- [ ] S7.01.03 Add indexes (client_id, provider_id, status)
- [ ] S7.01.04 Run migration

## S7.02 — API contract: requests
- [ ] S7.02.01 Define `POST /requests` request JSON
- [ ] S7.02.02 Define `POST /requests` response JSON
- [ ] S7.02.03 Define `GET /provider/requests` response JSON
- [ ] S7.02.04 Define accept endpoint JSON
- [ ] S7.02.05 Define reject endpoint JSON

## S7.03 — Backend: create request
- [ ] S7.03.01 Create requests route file
- [ ] S7.03.02 Validate input
- [ ] S7.03.03 Insert request (status = sent)
- [ ] S7.03.04 Return created request

## S7.04 — Backend: provider inbox
- [ ] S7.04.01 Query requests by provider_id
- [ ] S7.04.02 Filter statuses (sent/accepted/etc.)
- [ ] S7.04.03 Return list for dashboard

## S7.05 — Backend: accept/reject
- [ ] S7.05.01 Implement accept (status -> accepted)
- [ ] S7.05.02 Implement reject (status -> rejected)
- [ ] S7.05.03 Prevent invalid transitions
- [ ] S7.05.04 Return updated request

## S7.06 — Frontend: request form (mock)
- [ ] S7.06.01 Add request textbox on provider profile
- [ ] S7.06.02 Add submit button
- [ ] S7.06.03 Mock submit success UI

## S7.07 — Frontend: provider dashboard (mock)
- [ ] S7.07.01 Create provider dashboard page
- [ ] S7.07.02 Render mock requests list
- [ ] S7.07.03 Add accept/reject buttons (mock)

## S7.08 — Switch to real API
- [ ] S7.08.01 Client request posts to backend
- [ ] S7.08.02 Provider inbox loads from backend
- [ ] S7.08.03 Accept/reject call backend
- [ ] S7.08.04 Verify end-to-end flow

---

# SLICE 8 — PAYMENTS (MANUAL ESCROW) + STATUS FLOW UI

## S8.01 — Migrations: payments + commissions
- [ ] S8.01.01 Migration: `payment_transaction`
- [ ] S8.01.02 Migration: `escrow`
- [ ] S8.01.03 Migration: `payout`
- [ ] S8.01.04 Add indexes and foreign keys
- [ ] S8.01.05 Run migrations

## S8.02 — API contract: manual escrow
- [ ] S8.02.01 Define admin endpoint: mark paid request
- [ ] S8.02.02 Define response status updates
- [ ] S8.02.03 Define `GET /client/requests` response shape

## S8.03 — Backend: mark escrow paid
- [ ] S8.03.01 Implement admin route + auth guard
- [ ] S8.03.02 Create transaction record
- [ ] S8.03.03 Create escrow record
- [ ] S8.03.04 Update request status -> paid_in_escrow (or equivalent)
- [ ] S8.03.05 Return updated info

## S8.04 — Frontend: client requests list (mock)
- [ ] S8.04.01 Create client requests page
- [ ] S8.04.02 Render mock request cards
- [ ] S8.04.03 Show status badge

## S8.05 — Frontend: admin mark-paid UI (mock)
- [ ] S8.05.01 Create admin payments page
- [ ] S8.05.02 Input requestId
- [ ] S8.05.03 Mock “mark paid” button

## S8.06 — Switch to real API
- [ ] S8.06.01 Admin mark-paid calls backend
- [ ] S8.06.02 Client requests page loads real data
- [ ] S8.06.03 Status updates visible end-to-end

---

# SLICE 9 — COMPLETION + PAYOUTS + INVOICES

## S9.01 — Migrations: payouts + invoices
- [ ] S9.01.01 Migration: `invoice`
- [ ] S9.01.02 Add invoice number uniqueness
- [ ] S9.01.03 Run migration

## S9.02 — API contract: completion
- [ ] S9.02.01 Define client complete endpoint
- [ ] S9.02.02 Define provider confirm endpoint
- [ ] S9.02.03 Define response payloads

## S9.03 — Backend: completion updates
- [ ] S9.03.01 Client completes -> status client_completed
- [ ] S9.03.02 Provider confirms -> status provider_confirmed
- [ ] S9.03.03 Validate correct roles
- [ ] S9.03.04 Prevent invalid transitions

## S9.04 — API contract: payout + invoice (admin)
- [ ] S9.04.01 Define mark payout sent endpoint
- [ ] S9.04.02 Define generate invoice endpoint
- [ ] S9.04.03 Define response payloads

## S9.05 — Backend: payout + invoice logic
- [ ] S9.05.01 Mark payout SENT
- [ ] S9.05.02 Generate invoice record
- [ ] S9.05.03 Update request status -> closed/completed
- [ ] S9.05.04 Return updated records

## S9.06 — Frontend: completion buttons
- [ ] S9.06.01 Add client “Mark completed” button
- [ ] S9.06.02 Add provider “Confirm completion” button
- [ ] S9.06.03 Show updated status in UI

## S9.07 — Frontend: admin payout/invoice UI
- [ ] S9.07.01 Admin payouts page
- [ ] S9.07.02 Button: mark payout sent
- [ ] S9.07.03 Button: generate invoice

## S9.08 — Verify end-to-end flow
- [ ] S9.08.01 Request accepted
- [ ] S9.08.02 Escrow paid
- [ ] S9.08.03 Client completes
- [ ] S9.08.04 Provider confirms
- [ ] S9.08.05 Admin payout + invoice complete

---

# SLICE 10 — REVIEWS + PROVIDER REPLIES

## S10.01 — Migrations: reviews
- [ ] S10.01.01 Migration: `review`
- [ ] S10.01.02 Migration: `review_reply`
- [ ] S10.01.03 Add unique constraint (1 review per request)
- [ ] S10.01.04 Run migrations

## S10.02 — API contract: reviews
- [ ] S10.02.01 Define create review endpoint
- [ ] S10.02.02 Define list reviews endpoint
- [ ] S10.02.03 Define provider reply endpoint
- [ ] S10.02.04 Add examples

## S10.03 — Backend: reviews endpoints
- [ ] S10.03.01 Validate review input (rating 1–5)
- [ ] S10.03.02 Insert review row
- [ ] S10.03.03 Update provider cached rating/count
- [ ] S10.03.04 List reviews by provider

## S10.04 — Backend: provider reply
- [ ] S10.04.01 Validate reply input
- [ ] S10.04.02 Ensure provider owns review
- [ ] S10.04.03 Insert reply (1 per review)
- [ ] S10.04.04 Return reply

## S10.05 — Frontend: reviews UI (mock)
- [ ] S10.05.01 Show reviews list section
- [ ] S10.05.02 Add client review form (mock)
- [ ] S10.05.03 Add provider reply form (mock)

## S10.06 — Switch to real API
- [ ] S10.06.01 Create review via backend
- [ ] S10.06.02 Load reviews from backend
- [ ] S10.06.03 Reply via backend
- [ ] S10.06.04 Verify end-to-end

---

# SLICE 11 — MESSAGING (BASIC CHAT)

## S11.01 — Migrations: messaging
- [ ] S11.01.01 Migration: `conversation`
- [ ] S11.01.02 Migration: `message`
- [ ] S11.01.03 Add indexes (request_id, created_at)
- [ ] S11.01.04 Run migrations

## S11.02 — API contract: chat
- [ ] S11.02.01 Define create conversation endpoint
- [ ] S11.02.02 Define list messages endpoint
- [ ] S11.02.03 Define send message endpoint
- [ ] S11.02.04 Add examples

## S11.03 — Backend: chat endpoints
- [ ] S11.03.01 Create conversation row
- [ ] S11.03.02 Fetch messages by conversation
- [ ] S11.03.03 Insert new message
- [ ] S11.03.04 Validate membership (client/provider)

## S11.04 — Frontend: chat UI (mock)
- [ ] S11.04.01 Add chat panel component
- [ ] S11.04.02 Render mock messages
- [ ] S11.04.03 Add send input UI (mock)

## S11.05 — Switch to real API
- [ ] S11.05.01 Create conversation via API
- [ ] S11.05.02 Load messages via API
- [ ] S11.05.03 Send messages via API
- [ ] S11.05.04 Verify chat end-to-end

---

# SLICE 12 — ADMIN CONTROLS (NO AUDIT LOGS)

## S12.01 — API contract: admin moderation
- [ ] S12.01.01 Define approve provider endpoint
- [ ] S12.01.02 Define reject provider endpoint
- [ ] S12.01.03 Add example payloads

## S12.02 — Backend: approval endpoints
- [ ] S12.02.01 Add admin auth guard to routes
- [ ] S12.02.02 Implement approve (status approved, approved_at)
- [ ] S12.02.03 Implement reject (status rejected)
- [ ] S12.02.04 Return updated provider profile

## S12.03 — API contract: admin manage lists
- [ ] S12.03.01 Define CRUD cities endpoints
- [ ] S12.03.02 Define CRUD categories endpoints
- [ ] S12.03.03 Add example payloads

## S12.04 — Backend: CRUD cities/categories
- [ ] S12.04.01 Implement create city
- [ ] S12.04.02 Implement update city
- [ ] S12.04.03 Implement delete city
- [ ] S12.04.04 Implement create category
- [ ] S12.04.05 Implement update category
- [ ] S12.04.06 Implement delete category

## S12.05 — Frontend: admin screens
- [ ] S12.05.01 Create provider approvals screen
- [ ] S12.05.02 Create cities management screen
- [ ] S12.05.03 Create categories management screen
- [ ] S12.05.04 Wire screens to API

---

# SLICE 13 — STABILIZATION + REALISTIC SEED DATA

## S13.01 — Validation middleware
- [ ] S13.01.01 Choose validation library (Joi/Zod)
- [ ] S13.01.02 Add request validation middleware
- [ ] S13.01.03 Apply to one route
- [ ] S13.01.04 Apply to all key routes

## S13.02 — Error handling
- [ ] S13.02.01 Create global error handler middleware
- [ ] S13.02.02 Standardize error response format
- [ ] S13.02.03 Add 404 handler

## S13.03 — Seed realistic dummy data
- [ ] S13.03.01 Seed cities/categories (realistic)
- [ ] S13.03.02 Seed ~20 client accounts + profiles
- [ ] S13.03.03 Seed ~50 provider accounts + profiles
- [ ] S13.03.04 Seed services, provider_city, provider_category
- [ ] S13.03.05 Seed reviews and cached ratings

## S13.04 — Smoke test checklist
- [ ] S13.04.01 Visitor browse/search providers works
- [ ] S13.04.02 Client request -> provider accept works
- [ ] S13.04.03 Manual escrow paid -> status updates work
- [ ] S13.04.04 Completion -> payout/invoice flow works
- [ ] S13.04.05 Reviews + replies work
- [ ] S13.04.06 Admin approvals + manage cities/categories works

---

END OF MASTER TRACKING FILE
