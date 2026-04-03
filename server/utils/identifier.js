const compactText = (value) => String(value || "")
  .trim()
  .toUpperCase()
  .replace(/[^A-Z0-9]+/g, "");

export const buildPrefix = (value, size = 3) => {
  const compact = compactText(value);
  if (!compact) return "XX".slice(0, size).padEnd(size, "X");

  const words = String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length > 1) {
    const prefix = words
      .slice(0, size)
      .map((word) => word[0]?.toUpperCase() || "X")
      .join("");
    return prefix.padEnd(size, "X").slice(0, size);
  }

  return compact.slice(0, size).padEnd(size, "X").slice(0, size);
};

export const buildSequentialCode = ({ prefix, number, digits = 3 }) => {
  const safePrefix = buildPrefix(prefix, 3);
  const nextNumber = String(number).padStart(digits, "0");
  return `${safePrefix}-${nextNumber}`;
};

export const buildRolePrefix = (role) => {
  const normalizedRole = String(role || "student").toLowerCase();

  if (normalizedRole === "super_admin") return "SUP";
  if (normalizedRole === "admin") return "ADM";
  if (normalizedRole === "faculty") return "FAC";
  return "STD";
};

export const buildPortalId = ({ role, count }) =>
  buildSequentialCode({ prefix: buildRolePrefix(role), number: count });
