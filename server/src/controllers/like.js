const db = require("../models");

const likeController = {
  likeImage: async (req, res) => {
    try {
      const { user_id, post_id } = req.query;
      const liked = await db.postLike.create({
        status: "LIKE",
        user_id: user_id,
        post_id: post_id,
      });
      res.send(liked);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = likeController;
