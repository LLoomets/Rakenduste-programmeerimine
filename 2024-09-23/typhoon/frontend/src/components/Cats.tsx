import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitCat from "./SubmitCat";

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [editCat, setEditCat] = useState<{ id: string; name: string } | null>(null);

  const fetchCats = async () => {
    const response = await fetch("http://localhost:8080/cats");
    const data = await response.json();
    setCats(data);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/cats/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Cat deleted");
        fetchCats(); 
      } else {
        console.warn("Delete failed");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleEdit = (cat: Cat) => {
    setEditCat(cat);
  };

  return (
    <Box p={2}>
      <Typography variant="h3" gutterBottom>
        Cats
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cats.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{new Date(cat.createdAt).toLocaleString()}</TableCell>
                <TableCell>{cat.updatedAt ? new Date(cat.updatedAt).toLocaleString() : "N/A"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(cat)} color="primary" variant="outlined" style={{ marginRight: 8 }}>
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(cat.id)} color="secondary" variant="outlined">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SubmitCat fetchCats={fetchCats} editCat={editCat} setEditCat={setEditCat} />
    </Box>
  );
};

export default Cats;
