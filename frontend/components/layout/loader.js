import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader({ id }) {
  // console.log("Loader");
  // console.log(id);
  return (
    <>
      <Backdrop
        sx={{
          bgcolor: "primary.main",
          color: "text.secondary",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={true}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
    </>
  );
}
