const express = require("express");
const router = express.Router();
const { likeController } = require("../controllers");

router.post("/v1", likeController.likeImage);

module.exports = router;
