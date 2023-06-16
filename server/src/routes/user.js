const express = require("express");
const { fileUploader } = require("../middlewares/multer");
const router = express.Router();
const userController = require("../controllers").userController;

router.post("/", userController.register);
router.post("/v1", userController.login);
router.get("/v2", userController.getIdByToken, userController.getUserByToken);
router.get("/v3", userController.getUsername);
router.get("/generate-token/email", userController.generateTokenByEmail);
router.patch("/edit-profile/:id", userController.editProfile);
router.patch(
  "/change-password",
  userController.getIdByToken,
  userController.changePassword
);
router.post(
  "/upload-image/:id",
  fileUploader({ destinationFolder: "profileImg" }).single("profileImg"),
  userController.uploadAvatar
);

module.exports = router;
