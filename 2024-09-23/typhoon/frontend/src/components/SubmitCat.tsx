import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

type SubmitCatProps = {
  fetchCats: () => void;
  editCat: { id: string; name: string } | null;
  setEditCat: (cat: { id: string; name: string } | null) => void;
};

const SubmitCat = ({ fetchCats, editCat, setEditCat }: SubmitCatProps) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editCat) {
      setName(editCat.name);
    } else {
      setName("");
    }
  }, [editCat]);

  const submitCat = async () => {
    try {
      const response = await fetch(
        editCat ? `http://localhost:8080/cats` : `http://localhost:8080/cats`,
        {
          method: editCat ? "PUT" : "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            editCat ? { id: editCat.id, name: name } : { name: name }
          ),
        }
      );

      if (response.ok) {
        console.log("Success", response);
        fetchCats(); 
        setEditCat(null); 
      } else {
        console.warn("No success");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitCat();
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextField
            label="Cat name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            sx={{ marginTop: "20px", marginBottom: "5px" }}
          />
          <Button type="submit" variant="contained">
            {editCat ? "Update" : "Add"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SubmitCat;
