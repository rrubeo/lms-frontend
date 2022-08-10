import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpen from "@mui/icons-material/MenuOpen";
import Image from "next/image";
import Box from "@mui/material/Box";
import DCT_UserMenu from "./DCT_UserMenu";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // ...(open && {
  //   marginLeft: drawerwidth,
  //   width: `calc(100% - ${drawerwidth}px)`,
  //   transition: theme.transitions.create(["width", "margin"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // }),
}));

class DCT_Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      drawerwidth: this.props.drawerwidth,
      title: this.props.title,
      isStudent: this.props.user ? this.props.user.isStudent : 0,
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    // console.log(this.props);
    this.props.handleOnClick(!this.state.open);
    this.setState({ open: !this.state.open });
  }

  render() {
    // console.log(
    //   `<DCT_Nav ='${this.props.id}'>  ${this.props.open} ${this.state.open}`
    // );
    return (
      <>
        {this.props.loaded ? (
          <AppBar
            position="fixed"
            open={this.state.open}
            drawerwidth={this.state.drawerwidth}
          >
            <Toolbar>
              {!this.state.isStudent ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleOnClick}
                  edge="start"
                  sx={{
                    ml: "23px",

                    // ...(this.state.open && { display: "none" }),
                  }}
                >
                  {this.state.open ? (
                    <MenuOpen
                      sx={{
                        fontSize: "46px",
                        // ...(this.state.open && { display: "none" }),
                      }}
                    />
                  ) : (
                    <MenuIcon
                      sx={{
                        fontSize: "46px",
                        // ...(this.state.open && { display: "none" }),
                      }}
                    />
                  )}
                </IconButton>
              ) : (
                <></>
              )}
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  height: "63px",
                }}
              >
                <Image
                  layout="fixed"
                  src="/images/logo_janus.png"
                  height={34}
                  width={220}
                  alt={this.state.title}
                  priority
                />
              </Box>
              {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, height: "63px", position: "relative" }}
          ></Typography> */}
              <DCT_UserMenu
                id="USERMENU"
                navmenu={this.props.navmenu}
                usermenu={this.props.usermenu}
                user={this.props.user}
              />
            </Toolbar>
          </AppBar>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default DCT_Nav;
