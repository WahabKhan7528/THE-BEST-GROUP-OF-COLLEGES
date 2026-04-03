export const buildQuery = ({ model, query, searchFields = [] }) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  const sort = query.sort || "-createdAt";

  const filter = { ...query };
  const excluded = ["page", "limit", "sort", "q"];
  excluded.forEach((key) => delete filter[key]);

  if (query.q && searchFields.length) {
    filter.$or = searchFields.map((field) => ({
      [field]: { $regex: query.q, $options: "i" },
    }));
  }

  return {
    page,
    limit,
    query: model.find(filter).sort(sort).skip(skip).limit(limit),
    countQuery: model.countDocuments(filter),
  };
};
