const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");
const url_post = process.env.post_image;

const postController = {
  postImage: async (req, res) => {
    try {
      const { caption, location, user_id } = req.body;
      const { filename } = req.file;
      console.log(req.body);
      await db.posting
        .create({
          caption: caption,
          location: location,
          user_id: user_id,
          img_url: url_post + filename,
        })
        .then((result) => {
          res.send({
            message: "Posting Success",
            result: result,
          });
        });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getPostById: async (req, res) => {
    const { user_id } = req.query;
    try {
      const post = await db.posting.findAll({
        include: [
          {
            model: db.user,
            as: "user",
            attributes: ["username", "img_url"],
          },
        ],
        where: {
          user_id,
        },
      });
      res.send(post);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const user = await db.posting.findAll({
        include: [
          {
            model: db.user,
            as: "user",
            attributes: ["username", "img_url"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      res.send({
        user,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = postController;
