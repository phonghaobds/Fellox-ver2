import * as React from "react";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Navbar from "../other/Navbar";
import SidebarUser from "../other/SidebarUser";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function LayoutUser() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={2}>
          <SidebarUser />
        </Grid>
        <Grid item xs={10}>
          <Item>
            <Outlet />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
