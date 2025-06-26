const {
  findByEmail,
  createUser,
  checkEmailById,
  UpdateUserById,
  UpdatePasswordById,
} = require("../data-access-layer/Auth-DAL");

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
        Gender: isExists.Gender,
        Email,
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
        Gender: isExists.Gender,
        Email,
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
        Gender,
        Email,
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
        Gender,
        Email,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function UpdateUser(_id, Name, Email, YearOfBirth, Gender) {
  try {
    const checkEmail = await checkEmailById(_id, Email);

    if (!checkEmail.status) {
      throw new Error(checkEmail.message);
    }

    const data = await UpdateUserById(_id, Name, Email, YearOfBirth, Gender);

    const token = jwt.sign(
      {
        _id: data._id,
        Name: data.Name,
        YearOfBirth: data.YearOfBirth,
        FavoritePerfumes: data.FavoritePerfumes.length,
        Gender: data.Gender,
        Email: data.Email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
      }
    );

    return {
      token,
      data: {
        _id: data._id,
        Name: data.Name,
        YearOfBirth: data.YearOfBirth,
        FavoritePerfumes: data.FavoritePerfumes.length,
        Gender: data.Gender,
        Email: data.Email,
      },
    };
  } catch (error) {
    throw error;
  }
}

async function EditPassword(_id, NewPassword) {
  try {
    const hash = bcrypt.hashSync(NewPassword, 10);

    const Edit = await UpdatePasswordById(_id, hash);

    return Edit;
  } catch (error) {
    throw error;
  }
}

module.exports = { LogIn, SignUp, UpdateUser, EditPassword };
