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
  padding: 0,
}));

class DCT_Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loaded: true,
      isStudent: this.props.user ? this.props.user.isStudent : 0,
      data: {},
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(status) {
    this.setState({ open: status });
  }

  render() {
    const { children, user } = this.props;
    const { menu, navmenu, usermenu, title } = this.props.data;
    const { open, loaded } = this.state;
    // console.log(user);

    return (
      <>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="og:title" content={process.env.sitetitle} />
          <title>{process.env.sitetitle}</title>
        </Head>
        <Container maxWidth="false" className={styles.container}>
          <Box sx={{ py: { xs: 9, sm: 9, md: 10, lg: 10 }, px: "1vw", display: "flex" }}>
            <DCT_Nav
              loaded={loaded}
              id="Nav"
              open={open}
              drawerwidth={400}
              title={title}
              usermenu={usermenu}
              navmenu={navmenu}
              handleOnClick={this.handleOnClick}
              user={user}
            />
            {!this.state.isStudent ? (
              <DCT_SideMenu
                loaded={loaded}
                id="Side"
                open={open}
                direction="rtl"
                drawerwidth={330}
                sideMenu={menu}
                handleOnClick={this.handleOnClick}
              ></DCT_SideMenu>
            ) : (
              <></>
            )}
            <Box
              component="main"
              className={styles.main}
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
              <section className={styles.section}>{children}</section>
            </Box>
          </Box>
        </Container>
      </>
    );
  }
}

export default DCT_Layout;
