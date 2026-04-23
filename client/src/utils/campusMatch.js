const normalizeToken = (value) => String(value || "").trim().toLowerCase();

const toTokenSet = (campus) => {
  const tokens = new Set();
  if (!campus) return tokens;

  if (typeof campus !== "object") {
    const token = normalizeToken(campus);
    if (token) tokens.add(token);
    return tokens;
  }

  [campus._id, campus.id, campus.campusId, campus.code, campus.slug, campus.name]
    .map(normalizeToken)
    .filter(Boolean)
    .forEach((token) => tokens.add(token));

  return tokens;
};

export const createCampusMatcher = () => {
  return (entityCampus, selectedCampus) => {
    const selectedTokens = toTokenSet(selectedCampus);
    if (!selectedTokens.size || selectedTokens.has("all")) return true;

    const entityTokens = toTokenSet(entityCampus);
    for (const token of selectedTokens) {
      if (entityTokens.has(token)) return true;
    }

    return false;
  };
};
