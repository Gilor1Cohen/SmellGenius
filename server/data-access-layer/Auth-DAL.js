const User = require("../models/Users.model");

async function findByEmail(Email) {
  const user = await User.findOne(
    { Email },
    "_id Name Password YearOfBirth FavoritePerfumes Gender"
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
    Gender,
  };
}

async function checkEmailById(_id, Email) {
  try {
    const thisUser = await User.findById(_id).select("Email");

    if (!thisUser) return { status: false, message: "User not found" };

    const normalizedEmail = Email.trim().toLowerCase();

    if (thisUser.Email === normalizedEmail) return { status: true };

    const other = await findByEmail(normalizedEmail);
    if (other !== null)
      return { status: false, message: "Email already in use" };

    return { status: true };
  } catch (err) {
    return { status: false, message: err.message };
  }
}

async function UpdateUserById(_id, Name, Email, YearOfBirth, Gender) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { Name, Email, YearOfBirth, Gender },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error(`User with id ${_id} not found`);
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function UpdatePasswordById(_id, hash) {
  try {
    const update = await User.findByIdAndUpdate(
      _id,
      { Password: hash },
      { new: true, runValidators: true }
    );

    if (!update) {
      throw new Error("User not found");
    }

    return { message: "OK" };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  findByEmail,
  createUser,
  checkEmailById,
  UpdateUserById,
  UpdatePasswordById,
};
