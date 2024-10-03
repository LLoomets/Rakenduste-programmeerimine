const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", (req, res) => {
  const token = jwt.sign({ name: "Liisi" }, "shhhh");
  res.send(token);
});

const postMiddleware = (req, res, next) => {
  console.log("the response will be sent by the next function ... ");
  next();
};

router.post("/", postMiddleware, (req, res) => {
  const { token } = req.body;

  jwt.verify(token, "shhhh", function (err, decoded) {
    if (err) return res.send(false);
    console.log(decoded);
    res.send(true);
  });
});

module.exports = router;
