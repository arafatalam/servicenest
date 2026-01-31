import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const router = express.Router();

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

const toJsonSafe = (value) => {
  if (typeof value === "bigint") return value.toString();

  if (Array.isArray(value)) {
    return value.map((item) => toJsonSafe(item));
  }

  if (value && typeof value === "object") {
    const out = {};
    for (const [key, val] of Object.entries(value)) {
      out[key] = toJsonSafe(val);
    }
    return out;
  }

  return value;
};

/**
 * GET /api/discovery/cities
 * Returns all cities
 */
router.get("/cities", async (req, res) => {
  try {
    const cities = await prisma.city.findMany({
      orderBy: { name: "asc" },
    });

    res.json(toJsonSafe(cities));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load cities" });
  }
});

/**
 * GET /api/discovery/categories
 * Returns all categories
 */
router.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });

    res.json(toJsonSafe(categories));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load categories" });
  }
});

/**
 * GET /api/discovery/cities/:cityId/providers
 * Returns approved providers that serve the given city
 */
router.get("/cities/:cityId/providers", async (req, res) => {
  try {
    const cityId = BigInt(req.params.cityId);

    const providers = await prisma.profileProvider.findMany({
      where: {
        approvalStatus: "approved",
        cities: {
          some: {
            cityId: cityId,
          },
        },
      },
      orderBy: [{ avgRatingCached: "desc" }, { businessName: "asc" }],
      select: {
        providerId: true,
        businessName: true,
        description: true,
        phone: true,
        websiteUrl: true,
        logoUrl: true,
        avgRatingCached: true,
        reviewCountCached: true,
      },
    });

    res.json(toJsonSafe(providers));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load providers for city" });
  }
});

/**
 * GET /api/discovery/categories/:categoryId/providers
 * Returns approved providers that belong to the given category
 */
router.get("/categories/:categoryId/providers", async (req, res) => {
  try {
    const categoryId = BigInt(req.params.categoryId);

    const providers = await prisma.profileProvider.findMany({
      where: {
        approvalStatus: "approved",
        categories: {
          some: {
            categoryId: categoryId,
          },
        },
      },
      orderBy: [{ avgRatingCached: "desc" }, { businessName: "asc" }],
      select: {
        providerId: true,
        businessName: true,
        description: true,
        phone: true,
        websiteUrl: true,
        logoUrl: true,
        avgRatingCached: true,
        reviewCountCached: true,
      },
    });

    res.json(toJsonSafe(providers));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load providers for category" });
  }
});

export default router;
