const todos = [
  {
    "id": 1,
    "title": "First Todo",
    "priority": 1,
    "createdAt": 1727099313240,
    "updatedAt": null,
    "deleted": false
  },
  {
    "id": 2,
    "title": "Second Todo",
    "priority": 2,
    "createdAt": 1727099313240,
    "updatedAt": null,
    "deleted": false
  },
  {
    "id": 3,
    "title": "Third Todo",
    "priority": 3,
    "createdAt": 1727099313240,
    "updatedAt": null,
    "deleted": true
  },
];

exports.create = (req, res) => {
  const { title, priority } = req.body;
  const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1; 

  const newTodo = {
    id: newId,  
    title,
    priority: Number(priority),  
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  };
  todos.push(newTodo);
  res.send(newTodo);
};

exports.read = (req, res) => {
  const activeTodos = todos.filter((todo) => !todo.deleted);
  res.send(activeTodos);
};

exports.update = (req, res) => {
  const { id, title, priority } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex) {
    todos[todoIndex].title = title;
    todos[todoIndex].priority = priority;
    todos[todoIndex].updatedAt = Date.now();
    res.send(todos[todoIndex]);
  } else {
    res.status(404).send({ error: "Todo not found" });
  }
};

exports.delete = (req, res) => {
  const { id } = req.params;
  const todoId = Number(id);

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    todos[todoIndex].deleted = true;
    res.send({ message: "Todo deleted" });
  } else {
    res.status(404).send({ error: "Todo not found" });
  }
};
