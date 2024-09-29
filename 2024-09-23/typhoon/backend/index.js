const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const port = 8080;

const catsRoutes = require("./routes/cats.routes");
const todosRoutes = require("./routes/todos.routes");

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

app.use("/cats", catsRoutes);
app.use("/todos", todosRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
