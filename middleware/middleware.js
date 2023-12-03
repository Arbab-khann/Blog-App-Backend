const jwt = require("jsonwebtoken");
const secretkey = process.env.secretkey;
const middle1 = (req, res, next) => {
  const data = req.headers["authorization"];
  const bearerToken = data.split(" ")[1];
  console.log(bearerToken);
  jwt.verify(bearerToken, process.env.secretkey, (err, validate) => {
    if (err) {
      return res.send({ msg: "not registerd user" });
    } else {
      if (validate) {
        return res.send(next());
      }
    }
  });
};

module.exports = middle1;
