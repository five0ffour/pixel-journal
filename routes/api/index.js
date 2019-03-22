const router = require("express").Router();
const journalRoutes = require("./journal");
const loginRoutes = require("./login");

// Pixel Journal routes
router.use("/", loginRoutes);
router.use("/journal", journalRoutes);

module.exports = router;
