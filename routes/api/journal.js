const router = require("express").Router();
const journalController = require("../../controllers/journalController");
const verifyToken = require("../../passport/util");

// Matches with "/api/journal"
router
  .route("/")
  .get(verifyToken, journalController.findAll)
  .post(verifyToken, journalController.create);

// Matches with "/api/journal/:id"
router
  .route("/:id")
  .get(verifyToken, journalController.findById)
  .put(verifyToken, journalController.update)
  .delete(verifyToken, journalController.remove);

module.exports = router;
