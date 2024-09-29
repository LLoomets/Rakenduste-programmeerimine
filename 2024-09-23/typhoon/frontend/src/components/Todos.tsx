// Todos.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import SubmitTodo from "./SubmitTodo";

type Todo = {
  id: number;
  title: string;
  priority: number;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<{
    id: number;
    title: string;
    priority: number;
  } | null>(null);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8080/todos");
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Todo deleted");
        fetchTodos();
      } else {
        console.warn("Delete failed");
      }
    } catch (error) {
      console.warn("Delete error:", error);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditTodo(todo);
  };

  return (
    <Box p={2}>
      <Typography variant="h3" gutterBottom>
        To-Do List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.priority}</TableCell>
                <TableCell>
                  {new Date(todo.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {todo.updatedAt
                    ? new Date(todo.updatedAt).toLocaleString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(todo)}
                    color="primary"
                    variant="outlined"
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(todo.id)}
                    color="secondary"
                    variant="outlined"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SubmitTodo
        fetchTodos={fetchTodos}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
      />
    </Box>
  );
};

export default Todos;
