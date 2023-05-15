import * as React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Toolbar, Typography, Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { headerWrapper, navWap } from "./styles";

export default function Layout() {
  return (
    <Container>
      <AppBar>
        <Toolbar>
          <Typography sx={{ display: "flex", flex: 1 }} variant="h6">
            Cost Data
          </Typography>
          <Box sx={headerWrapper}>
            <Link sx={navWap} color="#fff" href="/" underline="hover">
              Application
            </Link>
            <Link sx={navWap} color="#fff" href="/resources" underline="hover">
              Resources
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet />
    </Container>
  );
}
