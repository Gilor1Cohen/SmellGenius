const User = require("../models/Users.model");

async function getLikes(_id) {
  const user = await User.findOne({ _id }, "FavoritePerfumes");

  if (!user) {
    throw new Error(`User with id ${_id} not found`);
  }

  return user;
}

module.exports = {
  getLikes,
};
