const User = require("../models/Users.model");

async function findByEmail(Email) {
  const user = await User.findOne(
    { Email },
    "_id Name Password YearOfBirth FavoritePerfumes"
  );

  return user;
}

async function createUser(Email, Password, Name, YearOfBirth, Gender) {
  const newUser = await User.create({
    Email,
    Password,
    Name,
    YearOfBirth,
    Gender,
  });

  return {
    _id: newUser._id,
    Name: newUser.Name,
    YearOfBirth: newUser.YearOfBirth,
    FavoritePerfumes: 0,
  };
}

module.exports = {
  findByEmail,
  createUser,
};
