const router = require("express").Router();
const journalRoutes = require("./journal");
const loginRoutes = require("./login");
const userRoutes = require("./user");

// Pixel Journal routes
router.use("/", loginRoutes);
router.use("/journal", journalRoutes);
router.use("/user", userRoutes);

module.exports = router;
