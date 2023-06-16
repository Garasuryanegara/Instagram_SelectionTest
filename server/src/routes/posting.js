const express = require("express");
const { fileUploader } = require("../middlewares/multer");
const { postController } = require("../controllers");
// const { fileUploader } = require("../middlewares/multer");
const router = express.Router();
const userController = require("../controllers").userController;

router.post(
  "/image",
  fileUploader({ destinationFolder: "postImg" }).single("postImg"),
  postController.postImage
);
router.get("/v2", postController.getPostById);
router.get("/v1", postController.getAll);

module.exports = router;
