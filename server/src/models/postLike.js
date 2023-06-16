module.exports = (sequelize, Sequelize) => {
  const postLike = sequelize.define(
    "likes",
    {
      status: Sequelize.ENUM("LIKE", "UNLIKE"),
    },
    {
      paranoid: true,
    }
  );
  return postLike;
};
