import * as React from "react";
import Head from "next/head";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import styles from "./DCT_Layout.module.css";
import jnStyles from "../../styles/utils.module.css";
import { styled, useTheme } from "@mui/material/styles";
import DCT_SideMenu from "../nav/DCT_SideMenu";
import DCT_Nav from "../nav/DCT_Nav";

const utils = require("../../lib/utils");

const DrawerHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: 8,
}));

class DCT_Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loaded: true,
      data: {},
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(status) {
    this.setState({ open: status });
  }

  render() {
    const { children } = this.props;
    const { menu, navmenu, usermenu, title } = this.props.data;
    const { open, loaded } = this.state;
    // console.log(`<DCT_Layout ='${this.props.id}'> (${open})`);

    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="og:title" content={process.env.sitetitle} />
          <title>{process.env.component}</title>
        </Head>
        <Container maxWidth="false" className={styles.container}>
          <Box sx={{ py: 14, px: 7, display: "flex" }}>
            <DCT_Nav
              loaded={loaded}
              id="Nav"
              open={open}
              drawerwidth={400}
              title={title}
              usermenu={usermenu}
              navmenu={navmenu}
              handleOnClick={this.handleOnClick}
            />
            <DCT_SideMenu
              loaded={loaded}
              id="Side"
              open={open}
              direction="rtl"
              drawerwidth={400}
              sideMenu={menu}
              handleOnClick={this.handleOnClick}
            ></DCT_SideMenu>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                bgcolor: "background.paper",
                borderRadius: "26px",
                alignItems: "center",
                boxShadow: 5,
                my: 0,
                mx: 0,
                px: 7,
                py: 2,
              }}
            >
              <DrawerHeader />
              <main>{children}</main>
            </Box>
          </Box>
        </Container>
      </>
    );
  }
}

export default DCT_Layout;
