/**
 * Validates 6-character friend-code
 * Allowed: A–Z, 0–9
 */
export function isValidFriendCode(code) {
  if (!code) return false;
  return /^[A-Z0-9]{6}$/.test(code);
}

/**
 * Basic email validation (optional)
 */
export function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Password strength validator (optional)
 */
export function isStrongPassword(password) {
  return password && password.length >= 6;
}
