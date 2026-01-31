/*
  Warnings:

  - The primary key for the `health_check` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `health_check` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `account` (
    `account_id` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` VARCHAR(20) NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `email_verified_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `last_login_at` DATETIME(3) NULL,

    UNIQUE INDEX `account_email_key`(`email`),
    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_log` (
    `audit_id` BIGINT NOT NULL AUTO_INCREMENT,
    `performed_by_account_id` BIGINT NOT NULL,
    `action` VARCHAR(20) NOT NULL,
    `entity_type` VARCHAR(50) NOT NULL,
    `entity_id` VARCHAR(64) NOT NULL,
    `before_json` JSON NULL,
    `after_json` JSON NULL,
    `reason` VARCHAR(255) NULL,
    `performed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_log_performed_by_account_id_idx`(`performed_by_account_id`),
    PRIMARY KEY (`audit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `field_rule` (
    `field_rule_id` BIGINT NOT NULL AUTO_INCREMENT,
    `entity_type` VARCHAR(30) NOT NULL,
    `field_name` VARCHAR(60) NOT NULL,
    `editable_by_role` VARCHAR(20) NOT NULL,
    `is_editable` BOOLEAN NOT NULL,
    `is_visible` BOOLEAN NOT NULL,
    `updated_by_admin_id` BIGINT NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `field_rule_updated_by_admin_id_idx`(`updated_by_admin_id`),
    PRIMARY KEY (`field_rule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile_client` (
    `client_id` BIGINT NOT NULL,
    `first_name` VARCHAR(60) NOT NULL,
    `last_name` VARCHAR(60) NOT NULL,
    `phone` VARCHAR(30) NULL,
    `profile_photo_url` VARCHAR(255) NULL,
    `address_line1` VARCHAR(120) NULL,
    `address_line2` VARCHAR(120) NULL,
    `postal_code` VARCHAR(20) NULL,
    `default_city_id` BIGINT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile_provider` (
    `provider_id` BIGINT NOT NULL,
    `business_name` VARCHAR(120) NOT NULL,
    `logo_url` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `website_url` VARCHAR(255) NULL,
    `phone` VARCHAR(30) NULL,
    `approval_status` VARCHAR(20) NOT NULL,
    `approved_by_admin_id` BIGINT NULL,
    `approved_at` DATETIME(3) NULL,
    `avg_rating_cached` DECIMAL(3, 2) NULL,
    `review_count_cached` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `profile_provider_approved_by_admin_id_idx`(`approved_by_admin_id`),
    PRIMARY KEY (`provider_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `city` (
    `city_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `timezone` VARCHAR(60) NULL,

    PRIMARY KEY (`city_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provider_city` (
    `provider_id` BIGINT NOT NULL,
    `city_id` BIGINT NOT NULL,
    `is_primary` BOOLEAN NOT NULL,

    PRIMARY KEY (`provider_id`, `city_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `category_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `is_active` BOOLEAN NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provider_category` (
    `provider_id` BIGINT NOT NULL,
    `category_id` BIGINT NOT NULL,

    PRIMARY KEY (`provider_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `service_id` BIGINT NOT NULL AUTO_INCREMENT,
    `provider_id` BIGINT NOT NULL,
    `category_id` BIGINT NULL,
    `name` VARCHAR(120) NOT NULL,
    `description` TEXT NULL,
    `pricing_model` VARCHAR(20) NOT NULL,
    `base_price` DECIMAL(10, 2) NULL,
    `currency` CHAR(3) NOT NULL DEFAULT 'CAD',
    `is_active` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `service_provider_id_idx`(`provider_id`),
    INDEX `service_category_id_idx`(`category_id`),
    PRIMARY KEY (`service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_request` (
    `request_id` BIGINT NOT NULL AUTO_INCREMENT,
    `client_id` BIGINT NOT NULL,
    `provider_id` BIGINT NOT NULL,
    `service_id` BIGINT NULL,
    `city_id` BIGINT NOT NULL,
    `details_text` TEXT NOT NULL,
    `requested_start_at` DATETIME(3) NULL,
    `requested_end_at` DATETIME(3) NULL,
    `status` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `service_request_client_id_idx`(`client_id`),
    INDEX `service_request_provider_id_idx`(`provider_id`),
    INDEX `service_request_city_id_idx`(`city_id`),
    PRIMARY KEY (`request_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `review_id` BIGINT NOT NULL AUTO_INCREMENT,
    `provider_id` BIGINT NOT NULL,
    `client_id` BIGINT NOT NULL,
    `request_id` BIGINT NULL,
    `rating` INTEGER NOT NULL,
    `comment` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_removed_by_admin` BOOLEAN NOT NULL,
    `removed_by_admin_id` BIGINT NULL,
    `removed_reason` VARCHAR(255) NULL,

    INDEX `review_provider_id_idx`(`provider_id`),
    INDEX `review_client_id_idx`(`client_id`),
    INDEX `review_request_id_idx`(`request_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review_reply` (
    `reply_id` BIGINT NOT NULL AUTO_INCREMENT,
    `review_id` BIGINT NOT NULL,
    `provider_id` BIGINT NOT NULL,
    `reply_text` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `review_reply_review_id_idx`(`review_id`),
    PRIMARY KEY (`reply_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_transaction` (
    `transaction_id` BIGINT NOT NULL AUTO_INCREMENT,
    `request_id` BIGINT NOT NULL,
    `client_id` BIGINT NOT NULL,
    `provider_id` BIGINT NOT NULL,
    `amount_gross` DECIMAL(10, 2) NOT NULL,
    `platform_fee` DECIMAL(10, 2) NOT NULL,
    `amount_net` DECIMAL(10, 2) NOT NULL,
    `currency` CHAR(3) NOT NULL DEFAULT 'CAD',
    `method` VARCHAR(30) NOT NULL,
    `status` VARCHAR(30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `payment_transaction_request_id_idx`(`request_id`),
    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `escrow` (
    `escrow_id` BIGINT NOT NULL AUTO_INCREMENT,
    `transaction_id` BIGINT NOT NULL,
    `held_amount` DECIMAL(10, 2) NOT NULL,
    `status` VARCHAR(30) NOT NULL,
    `dispute_window_ends_at` DATETIME(3) NULL,
    `released_at` DATETIME(3) NULL,

    UNIQUE INDEX `escrow_transaction_id_key`(`transaction_id`),
    INDEX `escrow_transaction_id_idx`(`transaction_id`),
    PRIMARY KEY (`escrow_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payout` (
    `payout_id` BIGINT NOT NULL AUTO_INCREMENT,
    `provider_id` BIGINT NOT NULL,
    `transaction_id` BIGINT NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,
    `currency` CHAR(3) NOT NULL DEFAULT 'CAD',
    `status` VARCHAR(30) NOT NULL,
    `sent_at` DATETIME(3) NULL,

    INDEX `payout_provider_id_idx`(`provider_id`),
    INDEX `payout_transaction_id_idx`(`transaction_id`),
    PRIMARY KEY (`payout_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice` (
    `invoice_id` BIGINT NOT NULL AUTO_INCREMENT,
    `transaction_id` BIGINT NOT NULL,
    `invoice_number` VARCHAR(60) NOT NULL,
    `issued_at` DATETIME(3) NOT NULL,
    `pdf_url` VARCHAR(255) NULL,

    UNIQUE INDEX `invoice_invoice_number_key`(`invoice_number`),
    INDEX `invoice_transaction_id_idx`(`transaction_id`),
    PRIMARY KEY (`invoice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dispute` (
    `dispute_id` BIGINT NOT NULL AUTO_INCREMENT,
    `request_id` BIGINT NOT NULL,
    `opened_by_account_id` BIGINT NOT NULL,
    `reason_code` VARCHAR(60) NOT NULL,
    `notes` TEXT NULL,
    `status` VARCHAR(30) NOT NULL,
    `resolved_by_admin_id` BIGINT NULL,
    `resolved_at` DATETIME(3) NULL,

    INDEX `dispute_request_id_idx`(`request_id`),
    INDEX `dispute_opened_by_account_id_idx`(`opened_by_account_id`),
    PRIMARY KEY (`dispute_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `audit_log` ADD CONSTRAINT `audit_log_performed_by_account_id_fkey` FOREIGN KEY (`performed_by_account_id`) REFERENCES `account`(`account_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `field_rule` ADD CONSTRAINT `field_rule_updated_by_admin_id_fkey` FOREIGN KEY (`updated_by_admin_id`) REFERENCES `account`(`account_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile_client` ADD CONSTRAINT `profile_client_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `account`(`account_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile_client` ADD CONSTRAINT `profile_client_default_city_id_fkey` FOREIGN KEY (`default_city_id`) REFERENCES `city`(`city_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profile_provider` ADD CONSTRAINT `profile_provider_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `account`(`account_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `provider_city` ADD CONSTRAINT `provider_city_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `profile_provider`(`provider_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `provider_city` ADD CONSTRAINT `provider_city_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `city`(`city_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `provider_category` ADD CONSTRAINT `provider_category_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `profile_provider`(`provider_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `provider_category` ADD CONSTRAINT `provider_category_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `profile_provider`(`provider_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service` ADD CONSTRAINT `service_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_request` ADD CONSTRAINT `service_request_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `profile_client`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_request` ADD CONSTRAINT `service_request_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `profile_provider`(`provider_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_request` ADD CONSTRAINT `service_request_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `service`(`service_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `service_request` ADD CONSTRAINT `service_request_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `city`(`city_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `profile_provider`(`provider_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `profile_client`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_request_id_fkey` FOREIGN KEY (`request_id`) REFERENCES `service_request`(`request_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review_reply` ADD CONSTRAINT `review_reply_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `review`(`review_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review_reply` ADD CONSTRAINT `review_reply_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `profile_provider`(`provider_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_transaction` ADD CONSTRAINT `payment_transaction_request_id_fkey` FOREIGN KEY (`request_id`) REFERENCES `service_request`(`request_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment_transaction` ADD CONSTRAINT `payment_transaction_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `profile_provider`(`provider_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `escrow` ADD CONSTRAINT `escrow_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `payment_transaction`(`transaction_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payout` ADD CONSTRAINT `payout_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `profile_provider`(`provider_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payout` ADD CONSTRAINT `payout_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `payment_transaction`(`transaction_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice` ADD CONSTRAINT `invoice_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `payment_transaction`(`transaction_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispute` ADD CONSTRAINT `dispute_request_id_fkey` FOREIGN KEY (`request_id`) REFERENCES `service_request`(`request_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
