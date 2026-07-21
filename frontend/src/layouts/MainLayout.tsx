import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import {
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Box,
} from "@mui/material";

import {
  House,
  Package,
  History,
  Settings,
} from "lucide-react";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}

    <AppBar
      position="sticky"
      elevation={1}
      color="inherit"
    >
      <Toolbar>
        <Typography variant="h6">
          Viol Web App
        </Typography>
      </Toolbar>
    </AppBar>

      {/* Contenuto */}

      <Box
        component="main"
        sx={{
          flex: 1,
          p: 2,
        }}
      >
        <Outlet />
      </Box>

      {/* Bottom Navigation */}

      <Paper elevation={8}>
        <BottomNavigation
          value={location.pathname}
          onChange={(_, value) => navigate(value)}
          showLabels
        >
          <BottomNavigationAction
            value="/"
            label="Home"
            icon={<House size={20} />}
          />

          <BottomNavigationAction
            value="/orders"
            label="Ordini"
            icon={<Package size={20} />}
          />

          <BottomNavigationAction
            value="/history"
            label="Storico"
            icon={<History size={20} />}
          />

          <BottomNavigationAction
            value="/settings"
            label="Impostazioni"
            icon={<Settings size={20} />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}