const express = require("express");
const router = express.Router();

const resetDatabase = require("../controllers/tests");

router.post("/reset/", resetDatabase.resetAll);
router.post("/reset/blogs/", resetDatabase.resetBlogs);

module.exports = router;
