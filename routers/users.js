const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/users");

router.get("/", userControllers.getUsers);
router.post("/", userControllers.addUser);
router.put("/:userId/", userControllers.updateUser);
router.delete("/:userId/", userControllers.deleteUser);

module.exports = router;
