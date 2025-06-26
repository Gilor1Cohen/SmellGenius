const User = require("../models/Users.model");
const Perfumes = require("../models/Perfumes.model");

async function getLikes(_id) {
  const user = await User.findOne({ _id }, "FavoritePerfumes");

  if (!user) {
    throw new Error(`User with id ${_id} not found`);
  }

  return user;
}

async function getPerfumeByName(name, limit, skip) {
  const data = await Perfumes.find({
    Perfume: {
      $regex: name,
      $options: "i",
    },
  })
    .skip(skip)
    .limit(limit);

  if (!data) {
    throw new Error("No perfume found.");
  }

  return data;
}

module.exports = {
  getLikes,
  getPerfumeByName,
};
