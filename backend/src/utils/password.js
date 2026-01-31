import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const hashPassword = async (plainPassword) => {
  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hash;
};

export const verifyPassword = async (plainPassword, passwordHash) => {
  const isMatch = await bcrypt.compare(plainPassword, passwordHash);
  return isMatch;
};
