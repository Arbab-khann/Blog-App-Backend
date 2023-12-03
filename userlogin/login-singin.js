const bcrypt = require("bcrypt");
const saltround = 10;
const jwt = require("jsonwebtoken");

let arry = [];
const register = (req, res) => {
  const data = req.body;
  let findAcc = arry.find((item) => item.email == data.email);
  if (findAcc) {
    res.send("email alredy exist, try new email");
  }
  const hashpass = bcrypt.hashSync(data.password, saltround);
  console.log("haspass", hashpass);
  data.password = hashpass;
  arry.push(data);
  const token = jwt.sign({ user: data.email }, process.env.secretkey, {
    expiresIn: "360000",
  });
  console.log("successfull register", data);
  console.log("jwat token", token);
  return res.send({ msg: "user successfull register", jwttoken: token });
};

const login = (req, res) => {
  const logindata = req.body;
  let findAcc = arry.find((item) => item.email == logindata.email);
  if (!findAcc) {
    res.send({ msg: "enter right email" });
    console.log("enter right email");
  } else {
    let validate = bcrypt.compareSync(logindata.password, findAcc.password);
    if (validate) {
      const token = jwt.sign({ user: logindata.email }, process.env.secretkey, {
        expiresIn: "36000",
      });
      res.send({ msg: "user login successfull", jwttoken: token });
      console.log("user login successfull");
    } else {
      res.send({ msg: "enter correct password" });
      console.log("enter correct password");
    }
  }
};

module.exports = { register, login };
