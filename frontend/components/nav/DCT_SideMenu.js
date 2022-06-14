import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import jnStyles from "../../styles/utils.module.css";

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
  width: drawerwidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, drawerwidth),
    "& .MuiDrawer-paper": openedMixin(theme, drawerwidth),
  }),
  ...(!open && {
    ...closedMixin(theme, drawerwidth),
    "& .MuiDrawer-paper": closedMixin(theme, drawerwidth),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const openedMixin = (theme, drawerwidth) => ({
  width: drawerwidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme, drawerwidth) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

class DCT_SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      collapsed: true,
      selectedIndex: 0,
      sideMenu: this.props.sideMenu,
      drawerwidth: this.props.drawerwidth,
      direction: this.props.direction,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOpenSubClick = this.handleOpenSubClick.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleOnClick() {
    // console.log("SIDE CLICK");
    this.props.handleOnClick(!this.props.open);
    this.setState({ open: !this.state.open });
    this.setState({
      direction: this.state.direction === "rtl" ? "ltr" : "rtl",
    });
  }

  handleOpenSubClick() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  handleListItemClick(event, index) {
    this.setState({ selectedIndex: index });
  }

  render() {
    // console.log(
    //   `<DCT_SideMenu ='${this.props.id}' ${this.props.open} ${this.state.open}>`
    // );
    // console.log(this.state.direction);
    return (
      <>
        {this.props.loaded ? (
          <Drawer
            variant="permanent"
            open={this.props.open}
            drawerwidth={this.state.drawerwidth}
          >
            <DrawerHeader>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1 }}
              >
                {this.props.open ? "Menu" : ""}
              </Typography>
              <IconButton onClick={this.handleOnClick}>
                {this.state.direction === "ltr" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <List>
              {this.props.sideMenu.map((item, index) =>
                item.link === "#" ? (
                  <ListItemButton
                    onClick={this.handleOpenSubClick}
                    key={item.id}
                    sx={{
                      minHeight: 30,
                      justifyContent: this.props.open ? "initial" : "center",
                      ml: 1.3,
                      mr: 1,
                      px: 0,
                      py: 1,
                    }}
                  >
                    {this.state.collapsed ? (
                      <>
                        <span className="icon-arrow-up-small"></span>
                        {this.props.open ? (
                          <ListItemText
                            classes={{
                              primary: jnStyles.jnTextSide1,
                            }}
                            primary={item.text}
                            sx={{
                              ml: 2,
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <>
                        <Tooltip
                          TransitionComponent={Zoom}
                          title={item.text}
                          placement="right-end"
                        >
                          {this.props.open ? (
                            <></>
                          ) : (
                            <ListItemIcon
                              classes={{
                                root: jnStyles.jnIconSide1,
                              }}
                              sx={{
                                minWidth: 0,
                                mr: this.props.open ? 1 : 1,
                                justifyContent: "center",
                                color: "primary.main",
                              }}
                            >
                              <span className={item.icon}></span>
                            </ListItemIcon>
                          )}
                        </Tooltip>
                        <span className="icon-arrow-down-small"></span>
                        {this.props.open ? (
                          <ListItemText
                            classes={{
                              primary: jnStyles.jnTextSide1,
                            }}
                            primary={item.text}
                            sx={{
                              opacity: this.props.open ? 1 : 0,
                              ml: 2,
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </ListItemButton>
                ) : item.link === "br" ? (
                  <Divider key={item.id} />
                ) : (
                  <Collapse
                    key={item.id}
                    in={this.state.collapsed}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItemButton
                        selected={this.state.selectedIndex === index}
                        onClick={(event) =>
                          this.handleListItemClick(event, index)
                        }
                        key={item.id}
                        component="a"
                        href={item.link}
                        sx={{
                          minHeight: 30,
                          justifyContent: this.props.open
                            ? "initial"
                            : "center",
                          px: 1,
                          py: 0.6,
                        }}
                      >
                        <Tooltip
                          TransitionComponent={Zoom}
                          title={item.text}
                          placement="right-end"
                        >
                          <ListItemIcon
                            classes={{
                              root: jnStyles.jnIconSide2,
                            }}
                            sx={{
                              minWidth: 40,
                              mr: this.props.open ? 1 : "auto",
                              ml: this.props.open ? 3 : "auto",
                              justifyContent: "center",
                              color: "primary.main",
                            }}
                          >
                            <span className={item.icon}></span>
                          </ListItemIcon>
                        </Tooltip>
                        {this.props.open ? (
                          <ListItemText
                            classes={{
                              primary: jnStyles.jnTextSide2,
                            }}
                            primary={item.text}
                            sx={{
                              mx: 0,
                              opacity: this.props.open ? 1 : 0,
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </ListItemButton>
                    </List>
                  </Collapse>
                )
              )}
            </List>
          </Drawer>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default DCT_SideMenu;
