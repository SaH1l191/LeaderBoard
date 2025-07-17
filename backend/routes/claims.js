const express = require("express");
const User = require("../models/User");
const PointsHistory = require("../models/PointsHistory");

function createClaimsRouter(io) {
  const router = express.Router();

  router.post("/", async (req, res) => {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1;

    await PointsHistory.create({ userId, points });
    const user = await User.findByIdAndUpdate(userId, { $inc: { totalPoints: points } }, { new: true });

    const users = await User.find().sort({ totalPoints: -1 });
    const rank = users.findIndex(u => u._id.equals(userId)) + 1;

    io.emit("leaderboardUpdated");

    res.json({
      userId,
      awardedPoints: points,
      newTotal: user.totalPoints,
      rank
    });
  });

  router.get("/leaderboard", async (req, res) => {
    const users = await User.find().sort({ totalPoints: -1 });
    const ranked = users.map((user, index) => ({
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1
    }));
    res.json(ranked);
  });

  router.get("/history/:userId", async (req, res) => {
    const { userId } = req.params;
    console.log("userid", userId);
    const history = await PointsHistory.find({ userId }).sort({ claimedAt: -1 }).limit(10);
    res.json(history);
  });

  return router;
}

module.exports = createClaimsRouter;
