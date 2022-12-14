const express = require("express");
const { createPost, getAllPost, comment } = require("../controller/post");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPost", authUser, getAllPost);
router.put("/comment", authUser, comment);

module.exports = router;
