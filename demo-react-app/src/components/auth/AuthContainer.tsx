import React from "react";
import { Outlet } from "react-router-dom";
import { Avatar, Box, Container } from "@mui/material";

function AuthContainer(): React.JSX.Element {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          my: 8,
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main", m: 1 }} />
        <Outlet />
      </Box>
    </Container>
  );
}

export default AuthContainer;
