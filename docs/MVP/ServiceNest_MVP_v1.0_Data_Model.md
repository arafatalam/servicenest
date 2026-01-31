# ServiceNest – MVP Data Model (Subset of Complete Model)

**Purpose:** MVP v1.0 database model aligned with frozen scope.
This model is a strict subset of the complete model.

**Money fields:** Use `DECIMAL(10,2)` in MySQL for currency amounts (never FLOAT/DOUBLE).

---

## 1) Identity & Access

### `account`
- `account_id` (PK, UUID)
- `email` (UNIQUE)
- `password_hash`
- `role` ENUM('client','provider','admin')
- `status` ENUM('active','suspended','banned')
- `email_verified_at` (nullable) *(MVP includes email verification)*
- `created_at`
- `updated_at`
- `last_login_at` (nullable)

---

## 2) Admin Governance (MVP)

### `audit_log`
- `audit_id` (PK)
- `performed_by_account_id` (FK → `account`)
- `action` ENUM('create','update','delete','moderate')
- `entity_type`
- `entity_id`
- `before_json` (nullable JSON)
- `after_json` (nullable JSON)
- `reason` (nullable)
- `performed_at`

### `field_rule`
- `field_rule_id` (PK)
- `entity_type` ENUM('profile_client','profile_provider')
- `field_name`
- `editable_by_role` ENUM('client','provider','admin')
- `is_editable`
- `is_visible`
- `updated_by_admin_id` (FK → `account`)
- `updated_at`

---

## 3) Profiles (MVP)

### `profile_client`
- `client_id` (PK, FK → `account.account_id`)
- `first_name`
- `last_name`
- `phone` (nullable)
- `profile_photo_url` (nullable)
- `address_line1` (nullable)
- `address_line2` (nullable)
- `postal_code` (nullable)
- `default_city_id` (nullable FK → `city`)
- `created_at`
- `updated_at`

### `profile_provider`
- `provider_id` (PK, FK → `account.account_id`)
- `business_name`
- `logo_url` (nullable)
- `description` (nullable)
- `website_url` (nullable)
- `phone` (nullable)
- `approval_status` ENUM('pending','approved','rejected') *(admin approval required)*
- `approved_by_admin_id` (nullable FK → `account`)
- `approved_at` (nullable)
- `avg_rating_cached` (nullable DECIMAL(3,2))
- `review_count_cached` (int)
- `created_at`
- `updated_at`

---

## 4) Location (MVP)

### `city`
- `city_id` (PK)
- `name`
- `timezone` (nullable)

### `provider_city`
- `provider_id` (FK → `profile_provider`)
- `city_id` (FK → `city`)
- `is_primary` (bool)
- **PK** (`provider_id`, `city_id`)

---

## 5) Categories & Services (MVP)

### `category`
- `category_id` (PK)
- `name`
- `is_active`

### `provider_category`
- `provider_id` (FK → `profile_provider`)
- `category_id` (FK → `category`)
- **PK** (`provider_id`, `category_id`)

### `service`
- `service_id` (PK)
- `provider_id` (FK → `profile_provider`)
- `category_id` (nullable FK → `category`)
- `name`
- `description` (nullable)
- `pricing_model` ENUM('hourly','fixed','estimate')
- `base_price` (nullable DECIMAL(10,2))
- `currency` char(3) default 'CAD'
- `is_active`
- `created_at`
- `updated_at`

---

## 6) Requests & Workflow (MVP)

### `service_request`
- `request_id` (PK)
- `client_id` (FK → `profile_client`)
- `provider_id` (FK → `profile_provider`)
- `service_id` (nullable FK → `service`)
- `city_id` (FK → `city`)
- `details_text` (text)
- `requested_start_at` (nullable datetime)
- `requested_end_at` (nullable datetime)
- `status` ENUM(
  'sent','accepted','rejected',
  'awaiting_payment','paid_in_escrow',
  'in_progress',
  'client_completed','provider_confirmed',
  'closed','cancelled','disputed'
)
- `created_at`
- `updated_at`

---

## 7) Reviews (MVP)

### `review`
- `review_id` (PK)
- `provider_id` (FK → `profile_provider`)
- `client_id` (FK → `profile_client`)
- `request_id` (nullable FK → `service_request`)
- `rating` (int, 1–5)
- `comment` (nullable text)
- `created_at`
- `is_removed_by_admin` (bool)
- `removed_by_admin_id` (nullable FK → `account`)
- `removed_reason` (nullable)

### `review_reply`
- `reply_id` (PK)
- `review_id` (FK → `review`)
- `provider_id` (FK → `profile_provider`)
- `reply_text`
- `created_at`

---

## 8) Payments, Escrow, Payout, Invoice, Dispute (MVP)

### `payment_transaction`
- `transaction_id` (PK)
- `request_id` (FK → `service_request`)
- `client_id` (FK → `profile_client`)
- `provider_id` (FK → `profile_provider`)
- `amount_gross` DECIMAL(10,2)
- `platform_fee` DECIMAL(10,2)
- `amount_net` DECIMAL(10,2)
- `currency` char(3) default 'CAD'
- `method` ENUM('interac_etransfer') *(MVP payment method)*
- `status` ENUM('pending','received','held_in_escrow','released','refunded','failed')
- `created_at`

### `escrow`
- `escrow_id` (PK)
- `transaction_id` (FK → `payment_transaction`)
- `held_amount` DECIMAL(10,2)
- `status` ENUM('held','released','refunded','partial_release')
- `dispute_window_ends_at` (nullable)
- `released_at` (nullable)

### `payout`
- `payout_id` (PK)
- `provider_id` (FK → `profile_provider`)
- `transaction_id` (FK → `payment_transaction`)
- `amount` DECIMAL(10,2)
- `currency` char(3) default 'CAD'
- `status` ENUM('pending','sent','failed')
- `sent_at` (nullable)

### `invoice`
- `invoice_id` (PK)
- `transaction_id` (FK → `payment_transaction`)
- `invoice_number` (UNIQUE)
- `issued_at`
- `pdf_url` (nullable)

### `dispute`
- `dispute_id` (PK)
- `request_id` (FK → `service_request`)
- `opened_by_account_id` (FK → `account`)
- `reason_code`
- `notes` (nullable text)
- `status` ENUM('open','under_review','resolved','rejected')
- `resolved_by_admin_id` (nullable FK → `account`)
- `resolved_at` (nullable)

---

## Optional MVP Helper (Search)

### `provider_search_document` *(optional for MVP, recommended for scalability)*
- `provider_id` (PK, FK → `profile_provider`)
- `search_text`
- `updated_at`

---

## Post‑MVP Note

After MVP, add tables from the complete model (messaging, notifications, attachments, business hours, offers, advanced pricing, etc.) without changing the MVP core tables.

