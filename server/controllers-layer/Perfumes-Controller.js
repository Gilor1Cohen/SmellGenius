const express = require("express");
const router = express.Router();

const { attachTokenFromCookie, verifyToken } = require("../middlewares/Auth");
const { GetUserLikes } = require("../business-logic-layer/Perfumes-BL");

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

module.exports = router;
