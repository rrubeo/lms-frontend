import * as React from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MW_Layout from "./MW_Layout";

class MW_LayoutCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children, user } = this.props;
    return (
      <MW_Layout user={user}>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          sx={{
            minWidth: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {children}
        </Grid>
      </MW_Layout>
    );
  }
}

export default MW_LayoutCenter;
