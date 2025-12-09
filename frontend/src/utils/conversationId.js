/**
 * computeConversationId(a, b)
 * Ensures a unique & consistent conversation ID for any two users.
 * Always orders smaller ID first.
 *
 * Example:
 *   computeConversationId(12, 45) → "12_45"
 *   computeConversationId(45, 12) → "12_45"
 */

export function computeConversationId(a, b) {
  if (!a || !b) return null;
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return `${min}_${max}`;
}
