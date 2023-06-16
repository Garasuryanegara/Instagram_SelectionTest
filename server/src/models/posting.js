module.exports = (sequelize, Sequelize) => {
  const posting = sequelize.define(
    "postings",
    {
      img_url: {
        type: Sequelize.STRING,
      },
      caption: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  return posting;
};
