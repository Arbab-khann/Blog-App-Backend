const jwt = require("jsonwebtoken");
const middle1 = (req, res, next) => {
  const data = req.headers["authorization"];
  const bearerToken = data.split(" ")[1];
  console.log("line 5 midlewaer", bearerToken);

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
