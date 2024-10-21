import React, { useState } from "react";
import { CssBaseline, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "./components/header";
import Todo from "./components/todo";
import AddTodo from "./components/add-todo";
import Footer from "./components/footer";

function App() {
  // * Task 1: Starts here

  // * Task 1: Ends here

  // * Task 2: Starts here

  // * Task 2: Ends here

  // * Task 5: Starts here

  // * Task 5: Ends here

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid
        container
        justifyContent="center"
        sx={{ minHeight: "95vh", py: 10, px: 2 }}
      >
        <Grid size={{ xs: 12, md: 8, lg: 5 }}>
          <Grid
            container
            direction="column"
            sx={{ p: 4, borderRadius: 6, border: "3px solid #d6d4d4" }}
            spacing={1}
          >
            <Typography variant="h5" align="center">
              A Simple To-Do List
            </Typography>
            <Divider />
            {/* // *Task 6: Starts here */}

            {/* // *Task 6: Continues to AddTodo component */}

            {/* // *Task 3: Starts here */}
            
            {/* // *Task 3: Continues to Todo component */}
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Footer />
    </>
  );
}

export default App;
