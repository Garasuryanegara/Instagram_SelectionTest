module.exports = (sequelize, Sequelize) => {
  const comment = sequelize.define(
    "comments",
    {
      comment: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  return comment;
};
