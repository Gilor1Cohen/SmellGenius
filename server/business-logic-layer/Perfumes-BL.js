const {
  getLikes,
  getPerfumeByName,
} = require("../data-access-layer/Perfumes-DAL");

async function GetUserLikes(_id, amount) {
  try {
    const likes = await getLikes(_id);

    if (likes.FavoritePerfumes.length == 0) {
      throw new Error("No favorite perfumes found for this user");
    }

    if (amount === null || amount >= likes.FavoritePerfumes.length) {
      return likes.FavoritePerfumes;
    }

    return likes.FavoritePerfumes.slice(0, amount);
  } catch (error) {
    throw error;
  }
}

async function SearchByName(name, limit, skip) {
  try {
    const data = await getPerfumeByName(name, limit, skip);

    return data;
  } catch (error) {
    throw error;
  }
}
module.exports = { GetUserLikes, SearchByName };
