const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const todosController = require("../controllers/todo.controller");
const {
  todosRouteMiddleware,
  todosGetRouteMiddleware,
} = require("../middlewares/todos.middlewares");

router.use(todosRouteMiddleware);

const validateTodo = [
  check("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required"),
  check("priority")
    .isInt({ min: 1, max: 5 })
    .withMessage("Priority must be an integer between 1 and 5"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get("/", todosGetRouteMiddleware, todosController.read);
router.post("/", validateTodo, handleValidationErrors, todosController.create);
router.put("/", validateTodo, handleValidationErrors, todosController.update);

router.delete(
  "/:id",
  check("id").isNumeric().withMessage("ID must be a number"),
  handleValidationErrors,
  todosController.delete
);

module.exports = router;
