import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export type ProgressBackdropProps = {
  open: boolean;
};

function ProgressBackdrop({ open }: ProgressBackdropProps): React.JSX.Element {
  return (
    <Backdrop
      open={open}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default ProgressBackdrop;
