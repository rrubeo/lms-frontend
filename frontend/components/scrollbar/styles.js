import SimpleBar from "simplebar-react";
// @mui
import { alpha, styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

export const StyledRootScrollbar = styled("div")(() => ({
  flexGrow: 1,
  height: "100%",
  overflow: "auto",
}));

export const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    "&.simplebar-visible:before": {
      opacity: 1,
    },
  },
  "& .simplebar-track.simplebar-vertical": {
    width: 10,
  },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
    height: 6,
  },
  "& .simplebar-mask": {
    zIndex: "inherit",
  },
  "& .simplebar-placeholder": {
    backgroundColor: alpha(theme.palette.grey[600], 0.48),
    zIndex: "inherit",
    height: "0px",
    overflow: "auto",
  },
}));
