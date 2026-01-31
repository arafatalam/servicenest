# 🔒 ServiceNest — MVP v1.0 (FINAL)

**Status:** FROZEN  
**Effective Date:** 2026-01-28

This document defines the **official, frozen MVP scope (v1.0)** for ServiceNest.
Any change requires a **version bump** (v1.1, v2.0, etc.) and explicit approval.

---

## 🌍 Visitor (No Account)

### ✅ Included
- Browse services by category — *Example: A visitor clicks “Cleaning” to see all cleaning providers.*
- Browse providers by city — *Example: A visitor selects “Moncton” to see providers in that city.*
- Global keyword search — *Example: Typing “plumber” shows all plumbers across cities.*
- View provider profiles (read-only) — *Example: A visitor reads a business description and services.*
- View ratings & reviews — *Example: A visitor checks 4.5★ reviews before signing up.*
- See prices of services — *Example: A visitor sees “$30/hour” on a provider profile.*
- Filter by price — *Example: A visitor filters to show services under $50.*

### ❌ Excluded
- Advanced filters (distance)
- Contact providers without account

---

## 👤 Client (Service Seekers)

### ✅ Included
- Email/password signup — *Example: A client creates an account using email and password.*
- Login / logout — *Example: A client logs in to manage requests.*
- Basic profile (name, phone, profile photo, address)
- Global search across all providers
- View provider profiles
- Send service requests (simple text)
- Booking & scheduling
- **Pay ServiceNest upfront (escrow)** — *Example: Client pays before work starts.*
- Mark service as completed
- Leave reviews & ratings

---

## 🧰 Service Providers

### ✅ Included
- Provider account creation
- Admin approval required
- Business profile (name, logo, description, categories, services, cities)
- Receive service requests
- Accept / reject requests
- Mark service as completed
- **Receive payout from ServiceNest** — *Example: Paid after escrow release.*
- View & reply to reviews

---

## 🔍 Search & Discovery

### ✅ Included
- Global dynamic search across name, category, city, service, description
- Default sort by rating (descending)

---

## 🛠 Admin (Critical)

### ✅ Included
- Approve / reject providers
- Manage users
- Manage categories & cities
- Moderate reviews
- Manage payments & transactions
- Generate invoices
- Resolve disputes
- Hard delete with confirmation

---

## 🔐 Trust & Safety

### ✅ Included
- Email verification
- **Escrow-based payments**
- Dispute window before payout
- Admin dispute resolution
- Reviews cannot be hidden

---

## 💳 Simple Payment Flow (MVP)

```text
Client sends service request
        ↓
Provider accepts request
        ↓
Client pays ServiceNest upfront (escrow)
        ↓
Service is performed
        ↓
Client marks service as completed
        ↓
Provider confirms completion
        ↓
ServiceNest keeps commission
        ↓
ServiceNest pays provider
        ↓
Invoice generated for client
        ↓
Transaction completed
```

---

## 🔒 Change Control

- This document is **locked as MVP v1.0**.
- New features require a new version (v1.1+).
- Bug fixes and copy changes do **not** change scope.

---

**Project:** ServiceNest  
**Version:** v1.0 (FINAL)
