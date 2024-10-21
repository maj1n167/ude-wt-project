import React from "react";
import { Card, CardHeader, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// * Todo component
// * Task 3: Continue
// * Call the props here
const Todo = () => {

  // * Task 3: Ends here

  return (
    <>
      {todos?.length ? (
        <Typography gutterBottom>#{todos.length} to-dos found!</Typography>
      ) : (
        <Typography gutterBottom>No to-dos found!</Typography>
      )}

      {todos?.map((todo, index) => {
        return (
          <Card
            key={index}
            sx={{
              mb: 1,
              borderRadius: 8,
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <CardHeader
              title={<Typography key={todo.id}>{todo.task}</Typography>}
              action={
                <IconButton
                  color="error"
                  // * Task 4: Starts here
                  
                  // * Task 4: Ends here
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          </Card>
        );
      })}
    </>
  );
};

export default Todo;
