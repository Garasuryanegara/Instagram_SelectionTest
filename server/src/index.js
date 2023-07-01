const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const cors = require("cors");

// const router = require("./routes");
const db = require("./models");
const routes = require("./routes");
const verify = require("./middlewares/verify");
const { likeController } = require("./controllers");
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });
app.use("/profileImg", express.static(`${__dirname}/public/profileImg`));
app.use("/postImg", express.static(`${__dirname}/public/postImg`));
app.use(cors());
app.use(express.json());
app.use(verify);
app.use("/user", routes.userRouter);
app.use("/post", routes.postRouter);
app.use("/like", routes.likeRouter);

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
