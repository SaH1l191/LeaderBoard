const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { name } = req.body;
  const user = await User.create({ name });
  res.json(user);
});

router.get("/", async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 }).lean();
  const ranked = users.map((user, index) => ({
    ...user,
    rank: index + 1
  }));
  res.json(ranked);
});

module.exports = router;
