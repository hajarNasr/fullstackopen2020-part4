const express = require("express");
const router = express.Router();
const blogControllers = require("../controllers/blog");

router.get("/", blogControllers.getAllPosts);
router.post("/", blogControllers.addPost);
router.put("/:postId/", blogControllers.updatePost);
router.delete("/:postId/", blogControllers.deletePost);

module.exports = router;
