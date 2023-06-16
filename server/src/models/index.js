"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const user = require("./user");
const token = require("./token");
const posting = require("./posting");
const comment = require("./comment");
const postLike = require("./postLike");

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = user(sequelize, Sequelize);
db.token = token(sequelize, Sequelize);
db.posting = posting(sequelize, Sequelize);
db.comment = comment(sequelize, Sequelize);
db.postLike = postLike(sequelize, Sequelize);

module.exports = db;

//satu user bisa memiliki banyak postingan
//posting punya user_id
db.posting.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "user",
});
db.user.hasMany(db.posting, {
  foreignKey: "user_id",
  as: "postings",
});

//satu posting bisa ada banyak comment
//comment punya posting_id
db.comment.belongsTo(db.posting, {
  foreignKey: "posting_id",
  as: "posting",
});

//satu user bisa memiliki banyak comment
//comment punya user_id
db.comment.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "userr",
});

db.postLike.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "userrr",
});

db.postLike.belongsTo(db.posting, {
  foreignKey: "post_id",
  as: "postingg",
});
