const express = require("express");
const app = express();
const { blogdata } = require("./blogData");
const route = require("./userlogin/authentication");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const middle1 = require("./middleware/middleware");
const connection = require("./config/mongo");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/user", route);

const allData = app.use("/data", (req, res) => {
  console.log(blogdata);
  return res.send(blogdata);
});

const oneData = app.get("/dynamicData/:ids", (req, res) => {
  const ids = req.params.ids;
  const singledata = blogdata.find((item) => item.id == ids);
  return res.send(singledata);
});

app.listen(5050, async () => {
  try {
    // await connection();
    console.log("server started............");
  } catch (err) {
    console.log(`${err} in server connection`);
  }
});
