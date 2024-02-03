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

// middleware on singledata
// app.use("/details/:id", middle1);

// Register/login user routes
app.use("/user", route);

// All data access API route
const allData = app.use("/data", (req, res) => {
  // console.log(blogdata);
  return res.send(blogdata);
});

// One data access API route
const oneData = app.get("/details/:id", middle1, (req, res) => {
  const id = req.params.id;
  const singledata = blogdata.find((item) => item.id == id);
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
