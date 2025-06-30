const Store = require("../models/Store.model");

async function GetFiltersLength(query) {
  return await Store.countDocuments(query);
}

async function GetItems(query, skip) {
  const data = await Store.find(query).skip(skip).limit(10);

  if (!data || data.length === 0) {
    throw new Error("No perfume found.");
  }

  return data;
}

module.exports = { GetFiltersLength, GetItems };
