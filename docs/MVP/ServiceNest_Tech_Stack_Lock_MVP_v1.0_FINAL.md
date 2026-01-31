# 🔒 ServiceNest — Tech Stack Lock (MVP v1.0) — Node + MySQL

**Status:** FROZEN  
**Effective Date:** 2026-01-29  
**Project:** ServiceNest  
**Scope:** MVP v1.0 only (matches your frozen MVP + data model)

This file locks the **technology choices** for MVP so implementation stays consistent and fast for a solo developer.

---

## 1) Frontend (Web App)

- **Framework:** Angular (Non-Standalone / Module-based)
- **Language:** TypeScript
- **Styling:** Bootstrap 5 + Tailwind CSS
- **Forms:** Reactive Forms
- **State/Data:** Angular Services + RxJS
- **Auth UI:** Role-based screens (Client / Provider / Admin)

**Rule:** Use Bootstrap for components/layout and Tailwind for utility tweaks (avoid duplicating the same thing both ways).

---

## 2) Backend (API)

- **Runtime:** Node.js (LTS)
- **Framework:** Express.js (REST API)
- **Language:** JavaScript (or TypeScript if desired later)
- **Architecture:** Routes → Controllers → Services → Repositories (DB)
- **Auth:** JWT + role-based authorization (Client / Provider / Admin)
- **Validation:** Joi/Zod (recommended) or custom middleware
- **Logging:** Pino (recommended) or Winston
- **API Docs:** Swagger/OpenAPI (optional for MVP)

---

## 3) Database

- **DBMS:** MySQL (local dev via MySQL Server + Workbench)
- **Migrations:** Knex migrations (recommended) or Prisma migrations (choose one)
- **Money fields:** Store monetary values using **DECIMAL(10,2)** to represent currency
  amounts directly (e.g., 49.99). Floating-point types (FLOAT/DOUBLE) must not be used.
- **Indexes:** Provider name, city, category, service name, rating


---

## 4) Payments (MVP — Manual Escrow)

- **Method:** Interac e-Transfer
- **Account:** ServiceNest bank account (platform holds funds)
- **Commission:** Calculated and stored in DB (`commissions` table)
- **Payout:** ServiceNest pays provider via Interac after completion confirmation

**MVP rule:** The platform never pays a provider unless funds are already received and recorded.

---

## 5) Hosting & Tooling

**Decision:** Deferred until after MVP build completion.  
(We will lock hosting/tooling right before first deployment.)

---

## 6) Non-Negotiables (MVP Rules)

- One frontend: Angular (non-standalone)
- One backend: Node.js + Express REST API
- One database: MySQL
- Payments MVP: Interac e-Transfer (manual escrow) + admin confirmation
- Role-based access control: Client / Provider / Admin
- Payment/payout/invoice/dispute state is stored in DB (source of truth)

---

## 7) Change Control

- This stack is **locked for MVP v1.0**.
- Any stack change requires a **version bump** (v1.1+) and a written decision log.

---

**Version:** Tech Stack Lock — MVP v1.0 (FINAL) — Node+MySQL
