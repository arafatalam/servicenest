import prisma from "../db/prismaClient.js";
import { hashPassword } from "../utils/password.js";

/**
 * This seed creates realistic DEV data:
 * - 3 Admin accounts
 * - 55 Providers (each with profile, cities, categories, and multiple services)
 * - 25 Clients (each with profile)
 * - 60 Categories
 * - ~300+ Services
 *
 * Note: IDs are BigInt auto-increment in DB.
 */

const DEV_PASSWORD = "Password123!";

/* -------------------------- tiny helpers -------------------------- */

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const pickManyUnique = (arr, count) => {
  const copy = [...arr];
  const picked = [];
  while (picked.length < count && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    picked.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return picked;
};

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\./, "")
    .replace(/\.$/, "");

const makeEmail = (prefix, domain) => `${slugify(prefix)}@${domain}`;

const makePhone = () => {
  const area = pick(["506"]);
  const a = Math.floor(200 + Math.random() * 800);
  const b = Math.floor(1000 + Math.random() * 9000);
  return `${area}-${a}-${b}`;
};

const nowIso = () => new Date();

/* -------------------------- seed data lists -------------------------- */

const CITIES = [
  { name: "Moncton", timezone: "America/Moncton" },
  { name: "Dieppe", timezone: "America/Moncton" },
  { name: "Riverview", timezone: "America/Moncton" },
  { name: "Fredericton", timezone: "America/Moncton" },
  { name: "Saint John", timezone: "America/Moncton" },
  { name: "Miramichi", timezone: "America/Moncton" },
  { name: "Bathurst", timezone: "America/Moncton" },
  { name: "Edmundston", timezone: "America/Moncton" },
  { name: "Campbellton", timezone: "America/Moncton" },
  { name: "Shediac", timezone: "America/Moncton" },
  { name: "Sackville", timezone: "America/Moncton" },
  { name: "Sussex", timezone: "America/Moncton" },
  { name: "Oromocto", timezone: "America/Moncton" },
  { name: "Quispamsis", timezone: "America/Moncton" },
  { name: "Rothesay", timezone: "America/Moncton" },
];

const CATEGORIES = [
  "House Cleaning",
  "Deep Cleaning",
  "Move-In / Move-Out Cleaning",
  "Office Cleaning",
  "Carpet Cleaning",
  "Window Cleaning",
  "Pressure Washing",
  "Gutter Cleaning",
  "Snow Removal",
  "Salting / De-icing",
  "Lawn Care",
  "Spring Cleanup",
  "Leaf Removal",
  "Tree Trimming",
  "Landscaping",
  "Gardening",
  "Fence Repair",
  "Deck Repair",
  "Deck Staining",
  "Painting (Interior)",
  "Painting (Exterior)",
  "Drywall Repair",
  "Tiling",
  "Flooring Installation",
  "Laminate Flooring",
  "Hardwood Refinishing",
  "Plumbing",
  "Drain Cleaning",
  "Water Heater Installation",
  "Faucet / Toilet Repair",
  "Electrical",
  "Light Fixture Installation",
  "Panel Upgrades",
  "EV Charger Installation",
  "Handyman",
  "Furniture Assembly",
  "TV Mounting",
  "Appliance Installation",
  "Appliance Repair",
  "HVAC Maintenance",
  "Heat Pump Cleaning",
  "Heat Pump Installation",
  "Smart Home Setup",
  "Computer / Wi-Fi Setup",
  "Home Security Cameras",
  "Pest Control",
  "Mold Inspection",
  "Junk Removal",
  "Moving Help",
  "Packing Services",
  "Delivery Services",
  "Pet Sitting",
  "Dog Walking",
  "Babysitting",
  "Senior Assistance",
  "Personal Training",
  "Massage Therapy",
  "Mobile Car Detailing",
  "Auto Tire Swap (Driveway)",
  "Tutoring",
  "Photography",
];

const FIRST_NAMES = [
  "Aiden",
  "Olivia",
  "Noah",
  "Emma",
  "Liam",
  "Sophia",
  "Mason",
  "Isabella",
  "Ethan",
  "Mia",
  "Lucas",
  "Charlotte",
  "Logan",
  "Amelia",
  "Jacob",
  "Harper",
  "Benjamin",
  "Evelyn",
  "Henry",
  "Abigail",
  "Daniel",
  "Avery",
  "Michael",
  "Ella",
  "James",
  "Scarlett",
  "Alexander",
  "Grace",
  "William",
  "Chloe",
];

const LAST_NAMES = [
  "Johnson",
  "Smith",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Rodriguez",
  "Wilson",
  "Martinez",
  "Anderson",
  "Taylor",
  "Thomas",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
];

const BUSINESS_PREFIX = [
  "Evergreen",
  "Blue Harbor",
  "Maple & Stone",
  "North Shore",
  "Maritime",
  "True North",
  "East Coast",
  "FreshStart",
  "SparkClean",
  "Coastal",
  "Riverbend",
  "Summit",
  "BrightWay",
  "Oak & Iron",
  "ClearPath",
  "HomeHero",
  "PrimeCare",
  "GoldenHour",
  "SnowShield",
  "SunnySide",
];

const BUSINESS_SUFFIX = [
  "Services",
  "Solutions",
  "Home Care",
  "Property Care",
  "Maintenance",
  "Pros",
  "Crew",
  "Company",
  "Co.",
  "Works",
  "Group",
];

const PROVIDER_DESCRIPTIONS = [
  "Friendly, reliable service with clear pricing and fast response times.",
  "Locally owned and operated. We treat your home like our own.",
  "Insured professionals focused on quality, safety, and cleanliness.",
  "Flexible scheduling, transparent communication, and tidy workmanship.",
  "Trusted by local homeowners for consistent results and respectful service.",
];

/* -------------------------- build services realistically -------------------------- */

const SERVICE_TEMPLATES = [
  { name: "Standard House Cleaning", pricingModel: "flat", basePrice: 120 },
  { name: "Deep Cleaning (Kitchen + Bath)", pricingModel: "flat", basePrice: 220 },
  { name: "Move-Out Cleaning", pricingModel: "flat", basePrice: 320 },
  { name: "Window Cleaning (Exterior)", pricingModel: "hourly", basePrice: 75 },
  { name: "Gutter Cleaning", pricingModel: "flat", basePrice: 180 },
  { name: "Snow Removal (Driveway)", pricingModel: "flat", basePrice: 60 },
  { name: "Snow Removal (Walkway + Steps)", pricingModel: "flat", basePrice: 45 },
  { name: "Lawn Mowing", pricingModel: "flat", basePrice: 55 },
  { name: "Spring Yard Cleanup", pricingModel: "hourly", basePrice: 65 },
  { name: "Pressure Washing (Deck)", pricingModel: "flat", basePrice: 160 },
  { name: "Handyman (Small Repairs)", pricingModel: "hourly", basePrice: 70 },
  { name: "Furniture Assembly", pricingModel: "hourly", basePrice: 60 },
  { name: "TV Mounting", pricingModel: "flat", basePrice: 140 },
  { name: "Faucet Replacement", pricingModel: "flat", basePrice: 190 },
  { name: "Drain Unclogging", pricingModel: "flat", basePrice: 150 },
  { name: "Light Fixture Installation", pricingModel: "flat", basePrice: 160 },
  { name: "EV Charger Installation (Basic)", pricingModel: "flat", basePrice: 650 },
  { name: "Heat Pump Cleaning", pricingModel: "flat", basePrice: 210 },
  { name: "Junk Removal (Small Load)", pricingModel: "flat", basePrice: 140 },
  { name: "Moving Help (2 Hours)", pricingModel: "flat", basePrice: 180 },
];

/* -------------------------- core seed steps -------------------------- */

const seedCities = async () => {
  await prisma.city.createMany({
    data: CITIES,
    skipDuplicates: true,
  });

  return prisma.city.findMany({ orderBy: { cityId: "asc" } });
};

const seedCategories = async () => {
  await prisma.category.createMany({
    data: CATEGORIES.map((name) => ({ name, isActive: true })),
    skipDuplicates: true,
  });

  return prisma.category.findMany({ orderBy: { categoryId: "asc" } });
};

const createAccount = async ({ email, role }) => {
  const passwordHash = await hashPassword(DEV_PASSWORD);

  return prisma.account.create({
    data: {
      email,
      passwordHash,
      role,
      status: "active",
      emailVerifiedAt: nowIso(),
    },
    select: {
      accountId: true,
      email: true,
      role: true,
      status: true,
    },
  });
};

const seedAdmins = async () => {
  const adminEmails = [
    makeEmail("admin.alex", "servicenest.dev"),
    makeEmail("admin.sarah", "servicenest.dev"),
    makeEmail("admin.michael", "servicenest.dev"),
  ];

  const created = [];
  for (const email of adminEmails) {
    const account = await prisma.account.findUnique({ where: { email } });
    if (account) continue;
    created.push(await createAccount({ email, role: "admin" }));
  }

  return created;
};

const seedClients = async (count, cityRows) => {
  const createdClients = [];

  for (let i = 0; i < count; i++) {
    const firstName = pick(FIRST_NAMES);
    const lastName = pick(LAST_NAMES);

    const email = makeEmail(`${firstName}.${lastName}.${i + 10}`, "mail.dev");

    const existing = await prisma.account.findUnique({ where: { email } });
    if (existing) continue;

    const account = await createAccount({ email, role: "client" });

    const defaultCity = pick(cityRows);

    await prisma.profileClient.create({
      data: {
        clientId: account.accountId,
        firstName,
        lastName,
        phone: makePhone(),
        profilePhotoUrl: null,
        addressLine1: `${Math.floor(10 + Math.random() * 900)} ${pick([
          "Main St",
          "Maple Ave",
          "Oak St",
          "Pine St",
          "King St",
          "Queen St",
          "Elm St",
          "Church St",
        ])}`,
        addressLine2: null,
        postalCode: pick(["E1A 1A1", "E1C 2B2", "E2L 3C3", "E3B 4D4", "E1G 5E5"]),
        defaultCityId: defaultCity.cityId,
      },
    });

    createdClients.push(account);
  }

  return createdClients;
};

const seedProviders = async (count, cityRows, categoryRows) => {
  const createdProviders = [];

  for (let i = 0; i < count; i++) {
    const ownerFirst = pick(FIRST_NAMES);
    const ownerLast = pick(LAST_NAMES);

    const prefix = pick(BUSINESS_PREFIX);
    const suffix = pick(BUSINESS_SUFFIX);

    const businessName = `${prefix} ${suffix}`;
    const email = makeEmail(
      `${businessName}.${ownerLast}.${i + 20}`,
      "pro.dev"
    );

    const existing = await prisma.account.findUnique({ where: { email } });
    if (existing) continue;

    const account = await createAccount({ email, role: "provider" });

    await prisma.profileProvider.create({
      data: {
        providerId: account.accountId,
        businessName,
        logoUrl: null,
        description: pick(PROVIDER_DESCRIPTIONS),
        websiteUrl: `https://www.${slugify(businessName)}.ca`,
        phone: makePhone(),
        approvalStatus: "approved",
        approvedByAdminId: null,
        approvedAt: nowIso(),
        avgRatingCached: null,
        reviewCountCached: 0,
      },
    });

    // Provider serves multiple cities (2–5), one primary.
    const servedCities = pickManyUnique(cityRows, 2 + Math.floor(Math.random() * 4));
    const primaryCity = servedCities[0];

    for (const c of servedCities) {
      await prisma.providerCity.create({
        data: {
          providerId: account.accountId,
          cityId: c.cityId,
          isPrimary: c.cityId === primaryCity.cityId,
        },
      });
    }

    // Provider belongs to multiple categories (2–6).
    const providerCats = pickManyUnique(
      categoryRows,
      2 + Math.floor(Math.random() * 5)
    );

    for (const cat of providerCats) {
      await prisma.providerCategory.create({
        data: {
          providerId: account.accountId,
          categoryId: cat.categoryId,
        },
      });
    }

    // Provider offers multiple services (4–8) using realistic templates,
    // and we also mix in some category-aware naming.
    const serviceCount = 4 + Math.floor(Math.random() * 5);
    const templates = pickManyUnique(SERVICE_TEMPLATES, serviceCount);

    for (const t of templates) {
      const cat = pick(providerCats);

      await prisma.service.create({
        data: {
          providerId: account.accountId,
          categoryId: cat.categoryId,
          name: t.name,
          description: `Professional ${t.name.toLowerCase()} with friendly communication and tidy results.`,
          pricingModel: t.pricingModel,
          basePrice: t.basePrice,
          currency: "CAD",
          isActive: true,
        },
      });
    }

    createdProviders.push(account);
  }

  return createdProviders;
};

/* -------------------------- main runner -------------------------- */

const run = async () => {
  try {
    console.log("🌱 Seeding: Cities...");
    const cities = await seedCities();

    console.log("🌱 Seeding: Categories...");
    const categories = await seedCategories();

    console.log("🌱 Seeding: Admins...");
    await seedAdmins();

    console.log("🌱 Seeding: Clients (25)...");
    await seedClients(25, cities);

    console.log("🌱 Seeding: Providers (55)...");
    await seedProviders(55, cities, categories);

    const counts = await Promise.all([
      prisma.account.count(),
      prisma.profileClient.count(),
      prisma.profileProvider.count(),
      prisma.category.count(),
      prisma.city.count(),
      prisma.service.count(),
    ]);

    console.log("✅ Seed complete!");
    console.log({
      accounts: counts[0],
      clients: counts[1],
      providers: counts[2],
      categories: counts[3],
      cities: counts[4],
      services: counts[5],
      devPasswordForAllAccounts: DEV_PASSWORD,
    });
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

run();
