const bcrypt = require("bcrypt");
const saltround = 10;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// registration

let arry = [];
const register = (req, res) => {
  const data = req.body;
  // cheacking users email already present or not
  let findAcc = arry.find((item) => item.email == data.email);
  if (findAcc) {
    res.send("email alredy exist, try new email");
  }
  // making password encrypted before storing password
  const hashpass = bcrypt.hashSync(data.password, saltround);
  console.log("haspass", hashpass);
  data.password = hashpass;
  arry.push(data);
  // making JWT token
  const token = jwt.sign({ user: data.email }, process.env.secretkey, {
    expiresIn: "120000",
  });

  console.log("successfull register", data);
  console.log("jwat token", token);
  return res.send({ msg: "user successfull register", jwttoken: token });
};

// login page
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
        expiresIn: "120000",
      });

      res.send({ msg: "user login successfull", jwttoken: token });
      console.log("user login successfull", token);
    } else {
      res.send({ msg: "enter correct password" });
      console.log("enter correct password");
    }
  }
};

module.exports = { register, login };
