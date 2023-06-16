const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const mailer = require("../lib/mailer");
const url = process.env.url;
const url_image = process.env.url_image;
const sharp = require("sharp");

const userController = {
  register: async (req, res) => {
    try {
      const { fullname, username, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      await db.user
        .create({
          fullname,
          username,
          email,
          password: hashPassword,
        })
        .then((result) => res.send(result));
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { usemail, password } = req.body;
      console.log(req.body);
      const user = await db.user.findOne({
        where: {
          [Op.or]: [{ username: usemail }, { email: usemail }],
        },
      });
      console.log(user);
      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };

          const generateToken = nanoid();

          const token = await db.token.create({
            token: generateToken,
            expired: moment().add(1, "days").format(),
            payload: JSON.stringify(payload),
            valid: true,
            status: "LOGIN",
          });
          return res.send({
            message: "You're succesfully logged in!",
            token: token.dataValues.token,
            value: user,
          });
        } else {
          res.status(500).send({
            message: "wrong password",
          });
        }
      } else {
        throw new Error("login failed, user not found");
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getIdByToken: async (req, res, next) => {
    try {
      const { token } = req.query;
      const p = await db.token.findOne({
        where: {
          token: req.query.token,
          expired: {
            [Op.gte]: moment().format(),
          },
          valid: true,
        },
      });
      if (!p) {
        throw new Error("token has expired!");
      }
      const user = await db.user.findOne({
        where: {
          id: JSON.parse(p.dataValues.payload).id,
        },
      });
      delete user.dataValues.password;
      console.log(user);
      req.user = user.dataValues;
      next();
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getUserByToken: async (req, res) => {
    res.send(req.user);
  },
  getUsername: async (req, res) => {
    try {
      const { username } = req.query;
      const find = await db.user.findAll({
        where: {
          username,
        },
      });
      res.send(find);
      // console.log(find);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  generateTokenByEmail: async (req, res) => {
    try {
      const { email } = req.query;
      const user = await db.user.findOne({
        where: {
          email,
        },
      });
      console.log(user.dataValues);
      if (user.dataValues) {
        await db.token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "FORGOT-PASSWORD",
            },
          }
        );
        const generateToken = nanoid();
        const token = await db.token.create({
          expired: moment().add(20, "minutes").format(),
          token: generateToken,
          payload: JSON.stringify({ id: user.dataValues.id }),
          status: "FORGOT-PASSWORD",
        });
        console.log(token);
        mailer({
          subject: "CHANGE PASSWORD INSTAGRAM",
          to: "suryanegarasinatriyya@gmail.com",
          text: url + generateToken,
        });
        return res.send({
          message: "please check your email",
        });
      } else {
        throw new Error("user not found");
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { token } = req.query;
      // console.log(req.body);
      const { password } = req.body;
      const { id } = req.user; // dari function getIdByToken

      console.log(req.getUserByToken);

      const hashPassword = await bcrypt.hash(password, 10);
      await db.user.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id,
          },
        }
      );
      await db.token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );
      res.send({
        message: "password successfully updated!",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  uploadAvatar: async (req, res) => {
    try {
      const { filename } = req.file;
      await db.user.update(
        {
          img_url: url_image + "/" + filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      await db.user
        .findOne({
          where: {
            id: req.params.id,
          },
        })
        .then((result) => res.send(result));
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editProfile: async (req, res) => {
    try {
      const { fullname, username, biodata } = req.body;
      const user = await db.user.findOne({
        where: {
          id: req.params.id,
        },
      });
      const fn = fullname ? fullname : user.dataValues.fullname;
      const un = username ? username : user.dataValues.username;
      const bo = biodata ? biodata : user.dataValues.biodata;

      const edit = await db.user.update(
        {
          fullname: fn,
          username: un,
          biodata: bo,
        },
        {
          where: { id: req.params.id },
        }
      );
      const user2 = await db.user.findOne({
        where: {
          id: req.params.id,
        },
      });
      // console.log(edit);
      // console.log(user2);
      return res.send(user2.dataValues);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = userController;
