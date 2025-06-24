const express = require("express");
const router = express.Router();
const { LogIn, SignUp } = require("../business-logic-layer/Auth-BL");
const { verifyToken, attachTokenFromCookie } = require("../middlewares/Auth");

router.post("/LogIn", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const data = await LogIn(Email, Password);

    res.cookie("token", data.token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });

    return res.status(200).json({
      data,
    });
  } catch (error) {
    res
      .status(error.message === "Invalid Email or Password" ? 400 : 500)
      .json({ message: error.message || "Internal server error" });
  }
});

router.post("/SignUp", async (req, res) => {
  try {
    const { Email, Password, Name, YearOfBirth, Gender } = req.body;

    if (!Email || !Password || !Name || !YearOfBirth || !Gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const data = await SignUp(Email, Password, Name, YearOfBirth, Gender);

    res.cookie("token", data.token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });

    return res.status(201).json({
      data,
    });
  } catch (error) {
    res
      .status(error.message === "Email already exists" ? 400 : 500)
      .json({ message: error.message || "Internal server error" });
  }
});

router.get("/GetToken", attachTokenFromCookie, verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
