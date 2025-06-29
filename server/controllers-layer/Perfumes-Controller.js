const express = require("express");
const router = express.Router();

const { attachTokenFromCookie, verifyToken } = require("../middlewares/Auth");
const {
  GetUserLikes,
  SearchByName,
  GetPerfumeData,
  GetBySituation,
  GetBuyingRecommendations,
} = require("../business-logic-layer/Perfumes-BL");

router.get(
  "/GetUserLikes",
  attachTokenFromCookie,
  verifyToken,
  async (req, res) => {
    try {
      const _id = req.user._id;
      const amount = req.query.amount;

      const data = await GetUserLikes(_id, amount);

      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(
          error.message === "No favorite perfumes found for this user"
            ? 404
            : 500
        )
        .json({ message: error.message || "Error" });
    }
  }
);

router.get(
  "/SearchByName",
  attachTokenFromCookie,
  verifyToken,
  async (req, res) => {
    try {
      const name = req.query.perfumeName;
      const limit = req.query.limit;
      const skip = req.query.skip;

      const data = await SearchByName(name, limit, skip);

      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(error.message === "No perfume found." ? 404 : 500)
        .json({ message: error.message || "Error" });
    }
  }
);

router.get(
  "/GetPerfumeData",
  attachTokenFromCookie,
  verifyToken,
  async (req, res) => {
    try {
      const name = req.query.perfumeName;
      const _id = req.user._id;
      const YearOfBirth = req.user.YearOfBirth;

      const data = await GetPerfumeData(name, _id, YearOfBirth);

      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(error.message === "No perfume found." ? 404 : 500)
        .json({ message: error.message || "Error" });
    }
  }
);

router.get(
  "/GetBySituation",
  attachTokenFromCookie,
  verifyToken,
  async (req, res) => {
    try {
      const situation = req.query.situationName;
      const _id = req.user._id;
      const YearOfBirth = req.user.YearOfBirth;
      const Gender = req.user.Gender;

      const data = await GetBySituation(situation, _id, YearOfBirth, Gender);

      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(error.message === "No perfume found." ? 404 : 500)
        .json({ message: error.message || "Error" });
    }
  }
);

router.get(
  "/GetBuyingRecommendations",
  attachTokenFromCookie,
  verifyToken,
  async (req, res) => {
    try {
      console.log(req.user._id);

      const _id = req.user._id;
      const Gender = req.user.Gender;

      const data = await GetBuyingRecommendations(_id, Gender);

      return res.status(200).json({ data });
    } catch (error) {
      return res
        .status(
          error.message === "No perfume found." ||
            error.message?.includes("No perfume found")
            ? 404
            : 500
        )
        .json({ message: error.message || "Error" });
    }
  }
);

module.exports = router;
