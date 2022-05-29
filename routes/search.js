const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");
router.get("/:parameter", searchController.searchCriteria);

module.exports = router;
