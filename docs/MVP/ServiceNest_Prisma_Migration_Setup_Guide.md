# ServiceNest — Prisma (v7) Migration Setup + Testing (Step‑by‑Step)

This guide matches your current setup:
- **Backend:** Node.js (ESM / `"type": "module"`)
- **DB:** MySQL
- **Prisma CLI:** v7.x (requires `prisma.config.ts` + adapter for `PrismaClient`)
- **Project layout you used:** `backend/src/*`

> Goal: Create and apply your **first Prisma migration** and then **test** that Prisma can query the database.

---

## 0) Folder Structure (Expected)

```
ServiceNest/
└── backend/
    ├── package.json
    ├── .env
    ├── prisma.config.ts
    ├── prisma/
    │   ├── schema.prisma
    │   └── migrations/
    └── src/
        └── prisma.test.js
```

---

## 1) Prerequisites

### 1.1 MySQL running
- MySQL Server must be running
- Database created: `servicenest_mvp`

### 1.2 Your `.env` exists in `backend/`
File location:

```
backend/.env
```

---

## 2) Install Prisma Packages

From inside `backend/`:

```bash
cd D:\src\ServiceNest\backend
npm i -D prisma
npm i @prisma/client
```

---

## 3) Add `DATABASE_URL` to `.env`

Open `backend/.env` and add:

```env
DATABASE_URL="mysql://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:3306/servicenest_mvp"
```

Example (root):

```env
DATABASE_URL="mysql://root:YOUR_ROOT_PASSWORD@localhost:3306/servicenest_mvp"
```

---

## 4) Create Prisma Config (Prisma v7 requirement)

Create this file:

### ✅ `backend/prisma.config.ts`

```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

Why this exists (simple):
- Prisma v7 no longer allows `url = env("DATABASE_URL")` inside `schema.prisma`.
- The connection URL must live in `prisma.config.ts`.

---

## 5) Create Prisma Schema

Create this file:

### ✅ `backend/prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
}

model HealthCheck {
  id        Int      @id @default(autoincrement())
  note      String   @db.VarChar(100)
  createdAt DateTime @default(now()) @map("created_at")

  @@map("health_check")
}
```

Notes:
- `@@map("health_check")` forces the actual MySQL table name to be `health_check`.
- `@map("created_at")` makes the DB column snake_case while JS stays camelCase.

---

## 6) Fix Common Prisma Migrate Blockers (If They Happen)

### 6.1 P3014 / P1010 (Shadow DB permission error)

If you see:

- `Prisma Migrate could not create the shadow database`
- `User was denied access on the database prisma_migrate_shadow_db_...`

That means your DB user cannot create databases.

**Fix Option A (recommended): grant create DB permission to your user**

In MySQL Workbench (logged in as `root`), run (replace user name):

```sql
GRANT CREATE, ALTER, DROP, INDEX, REFERENCES, CREATE TEMPORARY TABLES
ON *.* TO 'ServiceNest'@'localhost';
FLUSH PRIVILEGES;
```

**Fix Option B: temporarily use root in DATABASE_URL**
Set `.env`:

```env
DATABASE_URL="mysql://root:YOUR_ROOT_PASSWORD@localhost:3306/servicenest_mvp"
```

Run migration, then change back later.

---

### 6.2 Drift detected (extra tables like `connection_test`)

If Prisma says drift is detected and mentions a table like `connection_test`,
delete that test table (it was created by earlier DB testing):

```sql
USE servicenest_mvp;
DROP TABLE IF EXISTS connection_test;
```

Then rerun migration.

---

## 7) Run First Migration

From inside `backend/`:

```bash
npx prisma migrate dev --name init_health_check
```

Expected:
- Prisma creates a folder under `prisma/migrations/...`
- Table `health_check` is created
- Table `_prisma_migrations` is created
- Output says: **Your database is now in sync with your schema.**

---

## 8) Generate Prisma Client

From inside `backend/`:

```bash
npx prisma generate
```

Expected:
- `Generated Prisma Client ...`

---

## 9) Prisma v7 Client Connection (Adapter Required)

In Prisma v7, `new PrismaClient()` requires an **adapter** (or Accelerate URL).
For MySQL/MariaDB, use the MariaDB driver adapter.

Install:

```bash
npm i @prisma/adapter-mariadb mariadb
```

---

## 10) Create Test Script

Create:

### ✅ `backend/src/prisma.test.js`

```js
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

const run = async () => {
  const rows = await prisma.healthCheck.findMany();
  console.log(rows);
  await prisma.$disconnect();
};

run().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
```

---

## 11) Run the Test (Final Verification)

From inside `backend/`:

```bash
node .\src\prisma.test.js
```

Expected output (empty array is OK):

```text
[]
```

---

## 12) Verify Tables in MySQL Workbench

Run:

```sql
USE servicenest_mvp;
SHOW TABLES;
```

Expected tables include:
- `health_check`
- `_prisma_migrations`

---

## 13) “It Worked” Checklist

- [ ] `npx prisma migrate dev --name init_health_check` succeeds
- [ ] `npx prisma generate` succeeds
- [ ] `node .\src\prisma.test.js` prints `[]` (or rows)
- [ ] MySQL shows `health_check` and `_prisma_migrations`

---

### If You Get Another ERROR
Copy/paste the **full terminal output** and we’ll fix it step-by-step.
