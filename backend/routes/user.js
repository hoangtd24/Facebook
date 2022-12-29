const express = require("express");
const {
  register,
  activateAccount,
  login,
  findUser,
  sendResetPasswordCode,
  validateCode,
  changePassword,
  getProfile,
  updateProfilePicture,
} = require("../controller/user");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);
router.post("/login", login);
router.post("/findUser", findUser);
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/validateCode", validateCode);
router.post("/changePassword", changePassword);
router.get("/getProfile/:idUser", getProfile);
router.put("/updateProfilePicture", authUser, updateProfilePicture);

module.exports = router;
