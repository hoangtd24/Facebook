const express = require("express");
const {
  createPost,
  getAllPost,
  comment,
  deletePost,
} = require("../controller/post");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.delete("/deletePost/:id", authUser, deletePost);
router.get("/getAllPost", authUser, getAllPost);
router.put("/comment", authUser, comment);

module.exports = router;
