# ServiceNest – Complete Data Model (Enterprise-Ready)

**Purpose:** This is the full, future-proof relational data model for ServiceNest.
The **MVP model is a strict subset** of this model—post‑MVP work mainly adds tables (and a few optional FK columns) without redesign.

**Money fields:** Use `DECIMAL(10,2)` in MySQL for currency amounts (never FLOAT/DOUBLE).

---

## 1) Identity & Access

### `account`
- `account_id` (PK, UUID)
- `email` (UNIQUE)
- `password_hash`
- `role` ENUM('client','provider','admin')
- `status` ENUM('active','suspended','banned')
- `email_verified_at` (nullable)
- `created_at`
- `updated_at`
- `last_login_at` (nullable)

### `session_token` *(future – optional)*
- `session_id` (PK)
- `account_id` (FK → `account`)
- `jwt_id` (unique)
- `expires_at`
- `revoked_at` (nullable)

---

## 2) Admin Governance

### `audit_log` *(append-only)*
- `audit_id` (PK)
- `performed_by_account_id` (FK → `account`)
- `action` ENUM('create','update','delete','moderate')
- `entity_type` (varchar)
- `entity_id` (varchar/uuid)
- `before_json` (nullable JSON)
- `after_json` (nullable JSON)
- `reason` (nullable)
- `performed_at`

### `field_rule` *(admin-controlled editable/visible fields)*
- `field_rule_id` (PK)
- `entity_type` ENUM('profile_client','profile_provider')
- `field_name` (varchar)
- `editable_by_role` ENUM('client','provider','admin')
- `is_editable` (bool)
- `is_visible` (bool)
- `updated_by_admin_id` (FK → `account`)
- `updated_at`

### `feature_flag` *(future)*
- `flag_id` (PK)
- `name` (UNIQUE)
- `is_enabled`
- `updated_by_admin_id` (FK → `account`)
- `updated_at`

---

## 3) Profiles

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
- `approval_status` ENUM('pending','approved','rejected')
- `approved_by_admin_id` (nullable FK → `account`)
- `approved_at` (nullable)
- `avg_rating_cached` (nullable DECIMAL(3,2))
- `review_count_cached` (int)
- `created_at`
- `updated_at`

### `provider_document` *(future – verification)*
- `document_id` (PK)
- `provider_id` (FK → `profile_provider`)
- `type` (varchar)  *(license, id, certificate)*
- `url`
- `status` ENUM('pending','verified','rejected')
- `verified_by_admin_id` (nullable FK → `account`)
- `verified_at` (nullable)

---

## 4) Location (Global-Ready)

### `country`
- `country_id` (PK)
- `iso2` (UNIQUE)
- `name`

### `region`
- `region_id` (PK)
- `country_id` (FK → `country`)
- `code` (e.g., NB)
- `name`

### `city`
- `city_id` (PK)
- `region_id` (nullable FK → `region`)
- `name`
- `timezone` (nullable)

### `provider_city` *(M:N provider → cities served)*
- `provider_id` (FK → `profile_provider`)
- `city_id` (FK → `city`)
- `is_primary` (bool)
- **PK** (`provider_id`, `city_id`)

---

## 5) Categories & Services

### `category`
- `category_id` (PK)
- `parent_category_id` (nullable FK → `category`) *(future: subcategories)*
- `name`
- `is_active`

### `provider_category` *(M:N)*
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
- `currency` (char(3), default 'CAD')
- `is_active`
- `created_at`
- `updated_at`

### `service_price_rule` *(future – advanced pricing)*
- `rule_id` (PK)
- `service_id` (FK → `service`)
- `rule_type` ENUM('tier','travel_fee','min_charge','seasonal','discount')
- `rule_json` (JSON)
- `is_active`
- `created_at`
- `updated_at`

---

## 6) Provider Presentation (Future Enhancements)

### `provider_media`
- `media_id` (PK)
- `provider_id` (FK → `profile_provider`)
- `type` ENUM('logo','cover','gallery')
- `url`
- `sort_order`

### `provider_business_hours`
- `hours_id` (PK)
- `provider_id` (FK → `profile_provider`)
- `day_of_week` (0–6)
- `open_time` (nullable)
- `close_time` (nullable)
- `is_closed`

---

## 7) Requests, Booking & Scheduling

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

### `request_attachment` *(future)*
- `attachment_id` (PK)
- `request_id` (FK → `service_request`)
- `uploaded_by_account_id` (FK → `account`)
- `url`
- `file_type`
- `file_size`
- `created_at`

### `booking_slot` *(future – provider availability)*
- `slot_id` (PK)
- `provider_id` (FK → `profile_provider`)
- `start_at`
- `end_at`
- `status` ENUM('available','reserved','blocked')

---

## 8) Messaging & Notifications (Future)

### `conversation`
- `conversation_id` (PK)
- `client_id` (FK → `profile_client`)
- `provider_id` (FK → `profile_provider`)
- `request_id` (nullable FK → `service_request`)
- `created_at`

### `message`
- `message_id` (PK)
- `conversation_id` (FK → `conversation`)
- `sender_account_id` (FK → `account`)
- `body_text`
- `created_at`
- `read_at` (nullable)

### `notification`
- `notification_id` (PK)
- `account_id` (FK → `account`)
- `type` (varchar)
- `payload_json` (JSON)
- `created_at`
- `read_at` (nullable)

---

## 9) Reviews & Moderation

### `review`
- `review_id` (PK)
- `provider_id` (FK → `profile_provider`)
- `client_id` (FK → `profile_client`)
- `request_id` (nullable FK → `service_request`) *(future integrity: review tied to a completed request)*
- `rating` (int, 1–5)
- `comment` (nullable text)
- `created_at`
- `is_removed_by_admin` (bool)
- `removed_by_admin_id` (nullable FK → `account`)
- `removed_reason` (nullable)

**Recommended constraint:** `CHECK (rating BETWEEN 1 AND 5)`

### `review_reply`
- `reply_id` (PK)
- `review_id` (FK → `review`)
- `provider_id` (FK → `profile_provider`)
- `reply_text`
- `created_at`

---

## 10) Payments, Escrow, Invoices, Disputes

### `payment_transaction`
- `transaction_id` (PK)
- `request_id` (FK → `service_request`) *(often 1:1)*
- `client_id` (FK → `profile_client`)
- `provider_id` (FK → `profile_provider`)
- `amount_gross` DECIMAL(10,2)
- `platform_fee` DECIMAL(10,2)
- `amount_net` DECIMAL(10,2)
- `currency` char(3)
- `method` ENUM('interac_etransfer','stripe') *(MVP uses Interac; Stripe later)*
- `processor_ref` (nullable)
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
- `currency` char(3)
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
- `reason_code` (varchar)
- `notes` (nullable text)
- `status` ENUM('open','under_review','resolved','rejected')
- `resolved_by_admin_id` (nullable FK → `account`)
- `resolved_at` (nullable)

---

## 11) Offers & Marketing (Future)

### `offer`
- `offer_id` (PK)
- `created_by_account_id` (FK → `account`) *(admin or provider)*
- `provider_id` (nullable FK → `profile_provider`) *(null = sitewide)*
- `target_client_id` (nullable FK → `profile_client`)
- `target_city_id` (nullable FK → `city`)
- `target_category_id` (nullable FK → `category`)
- `title`
- `description`
- `start_at`
- `end_at`
- `is_active`
- `created_at`

### `favorite_provider` *(future)*
- `client_id` (FK → `profile_client`)
- `provider_id` (FK → `profile_provider`)
- **PK** (`client_id`,`provider_id`)
- `created_at`

### `recently_viewed_provider` *(future)*
- `view_id` (PK)
- `client_id` (FK)
- `provider_id` (FK)
- `viewed_at`

---

## 12) Search Support (Scalable Helper)

### `provider_search_document`
- `provider_id` (PK, FK → `profile_provider`)
- `search_text` (text) *(concat name + categories + services + cities + description)*
- `updated_at`

---

## Post‑MVP Expansion Rule

To add new features after MVP, prefer **adding tables** from the sections marked *(future)* above.
The MVP core tables remain stable.

