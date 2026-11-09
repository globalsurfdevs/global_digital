import bcrypt from "bcrypt";

const BCRYPT_HASH = /^\$2[aby]\$\d{2}\$/;
const BCRYPT_COST = 12;

export function isPasswordHash(value: string): boolean {
  return BCRYPT_HASH.test(value);
}

export async function hashPassword(password: string): Promise<string> {
  if (Buffer.byteLength(password, "utf8") > 72) {
    throw new Error("bcrypt passwords must not exceed 72 UTF-8 bytes");
  }
  return bcrypt.hash(password, BCRYPT_COST);
}

/**
 * Verify current bcrypt hashes and transparently upgrade a matching legacy
 * plain-text password. This lets existing users migrate on their next login.
 */
export async function verifyAndUpgradePassword(
  password: string,
  storedPassword: string,
): Promise<{ valid: boolean; upgradedHash?: string }> {
  if (Buffer.byteLength(password, "utf8") > 72) return { valid: false };
  if (isPasswordHash(storedPassword)) {
    return { valid: await bcrypt.compare(password, storedPassword) };
  }

  if (password !== storedPassword) return { valid: false };

  return { valid: true, upgradedHash: await hashPassword(password) };
}
