# 🪺 ServiceNest — MVP v1.0 Master Tracking File (Slice-Based)

## Purpose
This file is the SINGLE source of truth for tracking ServiceNest MVP progress.

This version is slice-based (frontend + backend built side-by-side) while staying safe:
- Each slice delivers a working vertical feature (UI + API + DB)
- Tasks are tiny (10–15 minutes)
- Tasks are strictly sequential and numbered
- You can wipe memory and say: “Start from Sx.xx”
- You manually mark DONE

---

## How Progress Is Tracked
- Task ID format: S{Slice}.{Task} (example: S3.04)
- Mark completion by changing [ ] → [DONE]
- Anything not marked DONE is assumed NOT done

---

## Golden Rules (Do Not Break)
1) API contract first for each slice (request/response JSON)
2) Frontend uses mock mode until the API for that slice is ready
3) When API is ready, switch that slice to real API mode
4) One slice must be stable before starting the next

---

# SLICE 0 — FOUNDATION (READ ONLY)

- [DONE] MVP scope frozen (ServiceNest_MVP_v1.0_FINAL.md)
- [DONE] Data model frozen (ServiceNest_MVP_v1.0_data_model.md)
- [DONE] Tech stack locked (Node + Express + MySQL + Angular)

---

# SLICE 1 — PROJECT BOOTSTRAP (BACKEND + FRONTEND)

## S1.01 — Repo structure
- [ ] Create /backend and /frontend
- [ ] Add root .gitignore

## S1.02 — Backend init
- [ ] cd backend → npm init -y
- [ ] Install: express dotenv cors
- [ ] Install dev: nodemon

## S1.03 — Backend skeleton
- [ ] Create backend/src/app.js
- [ ] Create backend/src/server.js
- [ ] Create backend/src/routes/index.js

## S1.04 — Backend health
- [ ] GET /health returns { status: "ok" }
- [ ] Confirm server runs

## S1.05 — Frontend init (Angular)
- [ ] Create Angular app in /frontend (module-based / non-standalone)
- [ ] Install Bootstrap 5
- [ ] Add Tailwind (minimal)

## S1.06 — Frontend skeleton pages
- [ ] Create layout (navbar + container)
- [ ] Add placeholder routes: Home, Providers, Provider Profile, Login

## S1.07 — Frontend mock mode scaffolding
- [ ] Create frontend/src/app/core/api/api-base.ts (base URL + toggle)
- [ ] Create frontend/src/app/core/mock/mock-data.ts
- [ ] Implement a simple switch: USE_MOCK = true/false

---

# SLICE 2 — DATABASE + MIGRATIONS BASE

## S2.01 — MySQL database
- [ ] Create database servicenest_mvp

## S2.02 — DB connection
- [ ] Install mysql2
- [ ] Create backend/src/config/db.js
- [ ] Test connection

## S2.03 — Migrations tool
- [ ] Choose ONE: Knex migrations
- [ ] Initialize migrations folder + config

## S2.04 — Base tables (minimum)
- [ ] Migration: users
- [ ] Migration: client_profiles
- [ ] Migration: provider_profiles

---

# SLICE 3 — AUTH (REGISTER/LOGIN) + BASIC UI

## S3.01 — API contract: auth
- [ ] Define request/response JSON for:
  - POST /auth/register
  - POST /auth/login

## S3.02 — Backend: password + JWT utilities
- [ ] Install bcrypt
- [ ] Install jsonwebtoken
- [ ] Create hashPassword, comparePassword
- [ ] Create signJwt

## S3.03 — Backend: auth endpoints
- [ ] Implement POST /auth/register
- [ ] Implement POST /auth/login

## S3.04 — Backend: auth middleware
- [ ] JWT auth middleware
- [ ] Role guard middleware (CLIENT/PROVIDER/ADMIN)

## S3.05 — Frontend: login page UI
- [ ] Build Login form (Reactive Forms)
- [ ] Add minimal validation messages

## S3.06 — Frontend: auth service (mock)
- [ ] Implement login using mock user(s)
- [ ] Store token in localStorage (mock token ok)

## S3.07 — Frontend: switch to real API
- [ ] Point auth service to backend
- [ ] Verify register + login end-to-end

---

# SLICE 4 — DISCOVERY: CITIES + CATEGORIES (ADMIN CRUD LATER)

## S4.01 — Migrations: browse data
- [ ] Migration: cities
- [ ] Migration: categories

## S4.02 — Seed initial cities
- [ ] Seed: Moncton, Dieppe, Riverview

## S4.03 — API contract: browse lists
- [ ] GET /cities
- [ ] GET /categories

## S4.04 — Backend: browse endpoints
- [ ] Implement GET /cities
- [ ] Implement GET /categories

## S4.05 — Frontend: home filters UI (mock)
- [ ] Dropdown/links for city + category
- [ ] Mock list rendering

## S4.06 — Frontend: switch to real API
- [ ] Load cities/categories from backend

---

# SLICE 5 — PROVIDERS: PROFILE DATA + SERVICES + LIST UI

## S5.01 — Migrations: provider browse relations
- [ ] Migration: provider_cities
- [ ] Migration: provider_categories
- [ ] Migration: provider_services

## S5.02 — API contract: providers list + profile
- [ ] GET /providers (supports search + sort)
- [ ] GET /providers/:id (profile + services + cities + categories)

## S5.03 — Backend: providers list endpoint
- [ ] Implement GET /providers
- [ ] Default sort rating DESC

## S5.04 — Backend: provider profile endpoint
- [ ] Implement GET /providers/:id

## S5.05 — Frontend: providers list page (mock)
- [ ] Cards list view
- [ ] Search bar UI
- [ ] Sort control UI (default rating desc)

## S5.06 — Frontend: provider profile page (mock)
- [ ] Profile header + description
- [ ] Services list with prices
- [ ] Cities served list
- [ ] Ratings/reviews placeholder

## S5.07 — Frontend: switch providers to real API
- [ ] Providers list loads from backend
- [ ] Provider profile loads from backend

---

# SLICE 6 — SEARCH (GLOBAL SUBSTRING) + PRICE FILTER

## S6.01 — API contract: search + filters
- [ ] Confirm query params for /providers:
  - q (global substring)
  - cityId (optional)
  - categoryId (optional)
  - maxPrice (optional)

## S6.02 — Backend: global substring search
- [ ] Search across provider name/description
- [ ] Also match cities/categories/services

## S6.03 — Backend: price filter
- [ ] Filter providers by service price <= maxPrice

## S6.04 — Frontend: wire search bar + filters
- [ ] Hook UI to query params
- [ ] Show “no results” state

## S6.05 — Verify end-to-end
- [ ] Search + filters work with real API

---

# SLICE 7 — REQUESTS: CREATE + PROVIDER ACCEPT/REJECT

## S7.01 — Migration: service_requests
- [ ] Migration: service_requests (statuses per data model)

## S7.02 — API contract: requests
- [ ] POST /requests (client)
- [ ] GET /provider/requests (provider)
- [ ] PATCH /requests/:id/accept
- [ ] PATCH /requests/:id/reject

## S7.03 — Backend: create request
- [ ] Implement POST /requests

## S7.04 — Backend: provider inbox
- [ ] Implement GET /provider/requests

## S7.05 — Backend: accept/reject
- [ ] Implement accept/reject status updates

## S7.06 — Frontend: request form (mock)
- [ ] “Request Service” textbox on provider profile
- [ ] Submit flow (mock)

## S7.07 — Frontend: provider dashboard (mock)
- [ ] Requests list + accept/reject buttons

## S7.08 — Switch to real API
- [ ] Request creation works
- [ ] Provider inbox works
- [ ] Accept/reject works

---

# SLICE 8 — PAYMENTS (MANUAL ESCROW) + STATUS FLOW UI

## S8.01 — Migrations: payments + commissions
- [ ] Migration: payments
- [ ] Migration: commissions

## S8.02 — API contract: manual escrow
- [ ] POST /admin/payments/:requestId/mark-paid
- [ ] GET /client/requests (shows status)

## S8.03 — Backend: mark escrow paid
- [ ] Admin marks payment PAID
- [ ] Create commission record
- [ ] Set request status ESCROW_PAID

## S8.04 — Frontend: client requests list (mock)
- [ ] Status badge per request

## S8.05 — Frontend: admin mark-paid UI (mock)
- [ ] Simple admin screen to mark paid

## S8.06 — Switch to real API
- [ ] Admin mark-paid updates status
- [ ] Client sees updated status

---

# SLICE 9 — COMPLETION + PAYOUTS + INVOICES

## S9.01 — Migrations: payouts + invoices
- [ ] Migration: payouts
- [ ] Migration: invoices

## S9.02 — API contract: completion
- [ ] PATCH /requests/:id/client-complete
- [ ] PATCH /requests/:id/provider-complete

## S9.03 — Backend: completion updates
- [ ] Client complete → status CLIENT_COMPLETED
- [ ] Provider confirm → status PROVIDER_COMPLETED

## S9.04 — API contract: payout + invoice (admin)
- [ ] POST /admin/payouts/:requestId/mark-sent
- [ ] POST /admin/invoices/:requestId/generate

## S9.05 — Backend: payout + invoice logic
- [ ] Mark payout SENT
- [ ] Generate invoice record
- [ ] Set request status COMPLETED

## S9.06 — Frontend: completion buttons
- [ ] Client “Mark completed” button
- [ ] Provider “Confirm completion” button

## S9.07 — Frontend: admin payout/invoice UI
- [ ] Mark payout sent
- [ ] Generate invoice

## S9.08 — Verify end-to-end flow
- [ ] Request → accept → escrow paid → completion → payout/invoice

---

# SLICE 10 — REVIEWS + PROVIDER REPLIES

## S10.01 — Migrations: reviews
- [ ] Migration: reviews
- [ ] Migration: review_replies

## S10.02 — API contract: reviews
- [ ] POST /reviews (client, 1 per request)
- [ ] GET /providers/:id/reviews
- [ ] POST /reviews/:reviewId/reply (provider)

## S10.03 — Backend: reviews endpoints
- [ ] Create review
- [ ] List provider reviews

## S10.04 — Backend: provider reply
- [ ] Create reply (1 per review)

## S10.05 — Frontend: reviews UI (mock)
- [ ] Reviews list on provider profile
- [ ] Add review form (client)
- [ ] Reply form (provider)

## S10.06 — Switch to real API
- [ ] Reviews + replies work end-to-end

---

# SLICE 11 — MESSAGING (BASIC CHAT)

## S11.01 — Migrations: messaging
- [ ] Migration: conversations
- [ ] Migration: messages

## S11.02 — API contract: chat
- [ ] POST /conversations/:requestId
- [ ] GET /conversations/:requestId/messages
- [ ] POST /conversations/:requestId/messages

## S11.03 — Backend: chat endpoints
- [ ] Create conversation
- [ ] List messages
- [ ] Send message

## S11.04 — Frontend: chat UI (mock)
- [ ] Simple chat panel for a request

## S11.05 — Switch to real API
- [ ] Messages send/receive end-to-end

---

# SLICE 12 — ADMIN CONTROLS (NO AUDIT LOGS)

## S12.01 — API contract: admin moderation
- [ ] PATCH /admin/providers/:id/approve
- [ ] PATCH /admin/providers/:id/reject

## S12.02 — Backend: approval endpoints
- [ ] Approve/reject provider

## S12.03 — API contract: admin manage lists
- [ ] CRUD /admin/cities
- [ ] CRUD /admin/categories

## S12.04 — Backend: CRUD cities/categories
- [ ] Implement admin CRUD for cities
- [ ] Implement admin CRUD for categories

## S12.05 — Frontend: admin screens
- [ ] Provider approvals screen
- [ ] City/category management screens

---

# SLICE 13 — STABILIZATION + REALISTIC SEED DATA

## S13.01 — Validation middleware
- [ ] Add request validation layer

## S13.02 — Error handling
- [ ] Global error handler

## S13.03 — Seed realistic dummy data
- [ ] ~50 providers
- [ ] ~20 clients
- [ ] Realistic services/cities/reviews

## S13.04 — Smoke test checklist
- [ ] Visitor can browse/search providers
- [ ] Client can request + complete + review
- [ ] Provider can accept + confirm + reply
- [ ] Admin can approve + manage cities/categories

---

END OF MASTER TRACKING FILE
