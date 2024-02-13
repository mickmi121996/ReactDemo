import React, { useContext } from "react";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { storageAccessToken } from "../data_services/CustomAxios";
import {
  AppBar,
  Badge,
  Container,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Star as StarIcon,
} from "@mui/icons-material";

import FavoriteContext, { IFavoriteContext } from "./FavoriteContext";
import BannerUserMenu from "./BannerUserMenu";

function Banner(): React.JSX.Element {
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const favoriteContext: IFavoriteContext = useContext(FavoriteContext);

  const handleGoHomeClick = (): void => {
    navigate("/");
  };

  const handleDisplayFavoriteProductClick = (): void => {
    navigate("/favorite-products");
  };

  return (
    <AppBar position="static">
      <Container component="nav">
        <Toolbar>
          {location.pathname !== "/" && (
            <Tooltip title={"Retour au tableau de bord"}>
              <IconButton
                color="inherit"
                onClick={handleGoHomeClick}
                sx={{ mr: 1, p: 0 }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Démo React App
          </Typography>
          {localStorage.getItem(storageAccessToken) ? (
            <>
              <Tooltip title={"Afficher vos produits favoris"}>
                <IconButton
                  color="inherit"
                  onClick={handleDisplayFavoriteProductClick}
                  sx={{ mr: 1, p: 0 }}
                >
                  <Badge
                    badgeContent={favoriteContext.productIds.length}
                    color="warning"
                    sx={{ mr: 2 }}
                  >
                    <StarIcon color="inherit" fontSize="large" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <BannerUserMenu />
            </>
          ) : (
            <Link href="/login/" color="inherit" underline="hover">
              Se connecter
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Banner;
