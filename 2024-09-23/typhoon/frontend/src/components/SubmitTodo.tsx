// SubmitTodo.tsx
import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";

type SubmitTodoProps = {
  fetchTodos: () => void;
  editTodo: { id: number; title: string; priority: number } | null;
  setEditTodo: (
    todo: { id: number; title: string; priority: number } | null
  ) => void;
};

const SubmitTodo = ({ fetchTodos, editTodo, setEditTodo }: SubmitTodoProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setPriority(editTodo.priority);
    } else {
      setTitle("");
      setPriority(1);
    }
  }, [editTodo]);

  const submitTodo = async () => {
    try {
      const response = await fetch(
        editTodo
          ? `http://localhost:8080/todos`
          : `http://localhost:8080/todos`,
        {
          method: editTodo ? "PUT" : "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            editTodo ? { id: editTodo.id, title: title, priority: priority } : { title: title, priority: priority}
          ),
        }
      );

      if (response.ok) {
        console.log("Success", response);
        fetchTodos();
        setEditTodo(null);
      } else {
        console.warn("No success");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitTodo();
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextField
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            sx={{ marginTop: "20px", marginBottom: "5px" }}
          />
          <TextField
            label="Priority"
            value={priority}
            onChange={(event) => setPriority(Number(event.target.value))}
            sx={{ marginTop: "20px", marginBottom: "5px" }}
          />
          <Button type="submit" variant="contained">
            {editTodo ? "Update" : "Add"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SubmitTodo;
