import pool from "./db.js";

const run = async () => {
  const [rows] = await pool.query("SELECT DATABASE() AS db;");
  console.log(rows);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
