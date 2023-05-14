import * as React from "react";
import { Outlet } from "react-router-dom";
import "./style.css";
import {
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";

export default function Layout() {
  return (
    <Container>
      <AppBar>
        <Toolbar>
          <Typography sx={{ display: "flex", flex: 1 }} variant="h6">
            Cost Data
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Link
              sx={{ pr: 4, fontWeight: "bold" }}
              color="#fff"
              href="/"
              underline="hover"
            >
              Application
            </Link>
            <Link
              sx={{ pr: 4, fontWeight: "bold" }}
              color="#fff"
              href="/resources"
              underline="hover"
            >
              Resources
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet />
    </Container>
  );
}
