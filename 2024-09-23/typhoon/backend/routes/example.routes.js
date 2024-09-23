const router = require("./cats.routes");

router.get("/about", (req, res) => {
  res.send("about!!!!!");
});

router.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

const postMiddleware = (req, res, next) => {
  console.log("the response will be sent by the next function ...");
  next();
};

const postHandler = (req, res) => {
  res.send(req.params);
};

router.get("/posts/:postId", postMiddleware, postHandler, (req, res) => {
  res.send(req.params);
});

router.get("/flights/:from-:to", (req, res) => {
  res.send(req.params);
});

router.post("/flights/:from-:to", (req, res) => {
  res.send(req.params);
});

router.delete("/flights/:from-:to", (req, res) => {
  res.send(req.params);
});
