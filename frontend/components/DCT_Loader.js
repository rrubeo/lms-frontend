import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

class DCT_Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box
        component="div"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
}

export default DCT_Loader;
