const {
  GetFiltersLength,
  GetItems,
} = require("../data-access-layer/Store-DAL");

async function GetStoreItems(filter, page) {
  try {
    let query = {};

    if (filter && filter !== "All") {
      query.gender = filter;
    }

    const filtersLength = await GetFiltersLength(query);

    const items = await GetItems(query, (page - 1) * 10);

    return { pages: Math.ceil(filtersLength / 10), items };
  } catch (error) {
    throw error;
  }
}

module.exports = { GetStoreItems };
