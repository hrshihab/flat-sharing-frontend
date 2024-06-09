"use client";

import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { logoutUser } from "@/services/actions/logoutUser";
import { isLoggedIn } from "@/services/auth.services";
import PersonIcon from "@mui/icons-material/Person";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import assets from "@/assets";
import Image from "next/image";

const Navbar = () => {
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => setIsUserLoggedIn(isLoggedIn() as boolean), []);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogOut = () => {
    logoutUser(router);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        FLATMATE
      </Typography>
      <Stack direction="column" gap={2} alignItems="center">
        <Typography component={Link} href="/" color="#005480" fontWeight="bold">
          Home
        </Typography>
        <Typography
          component={Link}
          href="/allflats"
          color="#005480"
          fontWeight="bold"
        >
          Flats
        </Typography>
        <Typography
          component={Link}
          href="/about"
          color="#005480"
          fontWeight="bold"
        >
          About us
        </Typography>
        <Typography component={Link} href="/" color="#005480" fontWeight="bold">
          Contact us
        </Typography>
        {isUserLoggedIn && (
          <>
            <Typography component={Link} href="/" onClick={handleUserMenuClose}>
              <PersonIcon /> Profile
            </Typography>
            <Typography
              component={Link}
              href="/dashboard"
              onClick={handleUserMenuClose}
            >
              <DashboardIcon /> Dashboard
            </Typography>
            <Typography color="orange" onClick={handleLogOut}>
              <LogoutIcon /> Logout
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );

  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
            })}
          >
            <Typography
              variant="h5"
              component={Link}
              href="/"
              fontWeight={600}
              sx={{
                flexGrow: 1,
                color: "primary.main",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src={assets.images.logo}
                alt="Logo"
                style={{ marginRight: "10px" }}
                width={40}
                height={40}
              />
              FLATMATE
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
              <Stack direction="row" spacing={4}>
                <Typography
                  component={Link}
                  href="/"
                  variant="body2"
                  color="grey.700"
                  sx={{ fontWeight: "bold" }}
                >
                  Home
                </Typography>
                <Typography
                  component={Link}
                  variant="body2"
                  color="grey.700"
                  href="/allflats"
                  sx={{ fontWeight: "bold" }}
                  //color="black"
                >
                  Flats
                </Typography>
                <Typography
                  component={Link}
                  href="/#why-us"
                  variant="body2"
                  color="grey.700"
                  fontWeight="semi-bold"
                  sx={{ fontWeight: "bold" }}
                >
                  About us
                </Typography>
                <Typography
                  component={Link}
                  href="/#contact-us"
                  variant="body2"
                  color="grey.700"
                  sx={{ fontWeight: "bold" }}
                >
                  Contact us
                </Typography>
              </Stack>
            </Box>
            {isUserLoggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleUserMenuOpen} sx={{ p: 0 }}>
                    <Avatar
                      sx={{ width: 60, height: 60 }}
                      alt="User Avatar"
                      src="https://shorturl.at/xSUyW"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={userMenuAnchor}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                >
                  <MenuItem onClick={handleUserMenuClose}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      href="/dashboard/profile/my-edit-profile"
                    >
                      <PersonIcon /> Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleUserMenuClose}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      href="/dashboard"
                    >
                      <DashboardIcon /> Dashboard
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>
                    <Typography textAlign="center" color="orange">
                      <LogoutIcon /> Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <AuthButton />
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Add this Box to push the content below the navbar */}
      <Box sx={{ mt: { xs: 8, sm: 10 } }} />
    </Box>
  );
};

export default Navbar;
