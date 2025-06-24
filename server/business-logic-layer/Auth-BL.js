const { findByEmail, createUser } = require("../data-access-layer/Auth-DAL");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function LogIn(Email, Password) {
  try {
    const isExists = await findByEmail(Email);

    if (isExists == null) {
      throw new Error("Invalid Email or Password");
    }

    const isMatch = await bcrypt.compare(Password, isExists.Password);
    if (!isMatch) {
      throw new Error("Invalid Email or Password");
    }

    const token = jwt.sign(
      {
        _id: isExists._id,
        Name: isExists.Name,
        YearOfBirth: isExists.YearOfBirth,
        FavoritePerfumes: isExists.FavoritePerfumes.length,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );

    return {
      token,
      data: {
        _id: isExists._id,
        Name: isExists.Name,
        YearOfBirth: isExists.YearOfBirth,
        FavoritePerfumes: isExists.FavoritePerfumes.length,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function SignUp(Email, Password, Name, YearOfBirth, Gender) {
  try {
    const isExists = await findByEmail(Email);

    if (isExists !== null) {
      throw new Error("Email already exists");
    }

    const hash = bcrypt.hashSync(Password, 10);

    const user = await createUser(Email, hash, Name, YearOfBirth, Gender);

    if (!user) {
      throw new Error("Failed to create user");
    }

    const token = jwt.sign(
      {
        _id: user._id,
        Name: user.Name,
        YearOfBirth: user.YearOfBirth,
        FavoritePerfumes: user.FavoritePerfumes.length,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );

    return {
      token,
      data: {
        _id: user._id,
        Name: user.Name,
        YearOfBirth: user.YearOfBirth,
        FavoritePerfumes: user.FavoritePerfumes.length,
      },
    };
  } catch (error) {
    throw error;
  }
}

module.exports = { LogIn, SignUp };
