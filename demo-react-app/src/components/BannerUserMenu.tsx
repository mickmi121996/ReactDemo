import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { storageUsername } from "../data_services/CustomAxios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  InfoOutlined as InfoOutlinedIcon,
  Logout as LogoutIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
} from "@mui/icons-material";

function BannerUserMenu(): React.JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [userAnchorEl, setUserAnchorEl] = React.useState<HTMLElement | null>(
    null
  );

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setUserAnchorEl(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserAnchorEl(null);
  };

  const handleOpenAbout = (): void => {
    setUserAnchorEl(null);
    setAboutOpen(true);
  };

  const handleCloseAbout = (): void => {
    setAboutOpen(false);
  };

  const handleLogoutClick = (): void => {
    setUserAnchorEl(null);
    navigate("/logout");
  };

  const handleProfileClick = () => {
    navigate('/user/me');
    handleCloseUserMenu();
  };

  return (
    <>
      <Box>
        <Tooltip title={"Ouvrir le menu utilisateur"}>
          <IconButton
            aria-controls="user-menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleOpenUserMenu}
            sx={{ ml: 2, px: 0 }}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={userAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id="user-menu-appbar"
          keepMounted
          onClose={handleCloseUserMenu}
          open={Boolean(userAnchorEl)}
          sx={{ mt: "30px" }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {localStorage.getItem('demo_user_name') && (
            <MenuItem onClick={handleProfileClick} sx={{ py: "4px" }}>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography sx={{ fontSize: "0.95rem" }}>
                  {localStorage.getItem('demo_user_name')}
                </Typography>
              </ListItemText>
            </MenuItem>
          )}
          <Divider />
          <MenuItem onClick={handleLogoutClick} sx={{ py: "4px" }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ fontSize: "0.95rem" }}>
                {"Se déconnecter"}
              </Typography>
            </ListItemText>
          </MenuItem>
        </Menu>
      </Box>
      <Dialog
        aria-describedby="about-dialog-description"
        aria-labelledby="about-dialog-title"
        onClose={handleCloseAbout}
        open={aboutOpen}
      >
        <DialogTitle id="about-dialog-title">À propos</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id="about-dialog-description"
            variant="body2"
            textAlign="justify"
          >
            Rogatus ad ultimum admissusque in consistorium ambage nulla
            praegressa inconsiderate et leviter proficiscere inquit ut
            praeceptum est, Caesar sciens quod si cessaveris, et tuas et palatii
            tui auferri iubebo prope diem annonas. hocque solo contumaciter
            dicto subiratus abscessit nec in conspectum eius postea venit
            saepius arcessitus.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pb: 2, pr: 3 }}>
          <Button
            autoFocus
            color="primary"
            onClick={handleCloseAbout}
            size="small"
            variant="outlined"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BannerUserMenu;
