module.exports = (sequelize, Sequelize) => {
  const token = sequelize.define(
    "tokens", //nama table
    {
      token: {
        type: Sequelize.STRING,
      },
      expired: {
        type: Sequelize.DATE,
      },
      payload: {
        type: Sequelize.STRING,
      },
      valid: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      status: Sequelize.ENUM("LOGIN", "FORGOT-PASSWORD", "VERIFICATION"),
    },
    {
      paranoid: true,
    }
  );
  return token;
};
