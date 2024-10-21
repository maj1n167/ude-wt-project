import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

// * AddTodo component
// * Task 6: Continues
const AddTodo = () => {

  // * Task 6: Ends here

  // * Task 7: Starts here

  // * Task 7: Continues to TextField component below

  return (
    <>
      <Grid container spacing={1} sx={{ py: 2 }}>
        <Grid size="grow">
          <TextField
            fullWidth
            placeholder="Add a to-do"
            size="small"
            // * Task 7: Continues

            // * Task 7: Ends here
          />
        </Grid>

        <Button
          variant="contained"
          // * Task 6: Continue

          // * Task 6: Ends here
        >
          Add
        </Button>
      </Grid>
    </>
  );
};

export default AddTodo;
