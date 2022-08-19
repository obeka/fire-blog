import React, { useContext } from "react";
import { Box, AppBar, Toolbar, Typography, Stack } from "@mui/material";
import logo from "../image/cw.jpeg";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../helper/firebase";

export const Navigation = () => {
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const handleLogInOut = () => {
    user.currentUser ? signOut(auth) : navigate("/auth");
  };

  return (
    <Box
      sx={{ flexGrow: 1, "& a": { color: "white", textDecoration: "none" } }}
    >
      <AppBar position="static">
        <Toolbar>
          <img
            src={logo}
            alt="Clarusway logo"
            width="40px"
            height="40px"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Fire Blog
          </Typography>
          <Stack spacing={3} direction="row">
            <Link to="new">Create Blog</Link>
            <Link to="auth" onClick={handleLogInOut}>
              {user?.currentUser?.email ? "Log Out" : "Log In"}
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
