import prisma from "./db/prismaClient.js";

const run = async () => {
  const rows = await prisma.city.findMany();
  console.log(rows);

  await prisma.$disconnect();
};

run().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
