import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Badge from "./Badge";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const [pathTitle, setPathTitle] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2].toUpperCase();
    setPathTitle(currentPath);
  }, [location.pathname]);

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{
          "&.MuiContainer-root": {
            display: "flex",
            justifyContent: "space-between",
          },
        }}
      >
        <Toolbar disableGutters>
          <Link to={"/app/dashboard"} className="flex">
          <Icon icon="ph:read-cv-logo-light" width="50" height="50" />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                alignItems:"center"
              }}
            >
              CV BUILDER
            </Typography>
          </Link>
        </Toolbar>
        <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
          {pathTitle}
        </Typography>
        <Badge />
      </Container>
    </AppBar>
  );
};

export default Navbar;
