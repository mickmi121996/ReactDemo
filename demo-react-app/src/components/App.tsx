import { Outlet } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@mui/material";

import FavoriteContext, {
  FavoriteContextState,
  IFavoriteContext,
} from "./FavoriteContext";
import Banner from "./Banner";

function App(): React.JSX.Element {
  const favoriteContextState: IFavoriteContext = FavoriteContextState();

  return (
    <FavoriteContext.Provider value={favoriteContextState}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <Banner />
        <Outlet />
      </SnackbarProvider>
    </FavoriteContext.Provider>
  );
}

export default App;
