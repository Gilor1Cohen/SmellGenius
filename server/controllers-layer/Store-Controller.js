const express = require("express");
const router = express.Router();

const { attachTokenFromCookie, verifyToken } = require("../middlewares/Auth");

const { GetStoreItems } = require("../business-logic-layer/Store-BL");

router.get(
  "/GetStoreItems",
  attachTokenFromCookie,
  verifyToken,
  async (req, res) => {
    try {
      const filter = req.query.filter;
      const page = req.query.page;

      const data = await GetStoreItems(filter, page);

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
