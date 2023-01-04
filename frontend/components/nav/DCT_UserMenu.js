import * as React from "react";
import Router from "next/router";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DCT_Notifications from "./DCT_Notifications";
import DCT_ChatNotify from "./DCT_ChatNotify";
class DCT_UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      navmenu: this.props.navmenu,
      usermenu: this.props.usermenu,
      selectedIndex: 0,
      isStudent: this.props.user ? this.props.user.isStudent : 0,
      nominativo: this.props.user
        ? this.props.user.login.charAt(0).toUpperCase()
        : "XX",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleClick(event) {
    // console.log(event.currentTarget);
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ open: Boolean(event.currentTarget) });
  }

  handleClose() {
    // console.log("CLOSE");
    this.setState({ anchorEl: null });
    this.setState({ open: Boolean(null) });
  }

  async handleListItemClick(event, index) {
    event.preventDefault();
    this.setState({ selectedIndex: index });

    // console.log(event);
    // console.log(index);
    if (index === "logOut") {
      const data = await fetch("/api/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      Router.push(`${process.env.frontend}`);
    }
  }

  render() {
    return (
      <>
        <Box
          sx={{
            p: 0,
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: { xs: "center", sm: "flex-end", md: "flex-end" },
            textAlign: "center",
          }}
        >
          <List component={Stack} direction="row" disablePadding>
            {this.state.navmenu.map((item, index) => (
              <ListItemButton
                key={item.id}
                component="a"
                href={item.link}
                sx={{
                  mx: 0,
                  px: 0,
                }}
              >
                <Tooltip TransitionComponent={Zoom} title={item.text}>
                  <ListItemIcon
                    sx={{
                      fontSize: "28px",
                      mx: 0,
                      px: 0,
                      color: "secondary.main",
                    }}
                  >
                    <span className={item.icon}></span>
                  </ListItemIcon>
                </Tooltip>
              </ListItemButton>
            ))}
          </List>
          <DCT_ChatNotify data={this.props.user} />
          <DCT_Notifications />
          <Tooltip title="Account settings">
            <IconButton
              onClick={this.handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={this.state.open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={this.state.open ? "true" : undefined}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  color: "secondary.white",
                  bgcolor: "secondary.magenta",
                }}
              >
                {this.state.nominativo}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={this.state.anchorEl}
          id="account-menu"
          open={this.state.open}
          onClose={this.handleClose}
          onClick={this.handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {this.state.usermenu.map((item, index) =>
            item.link === "#" ? (
              <MenuItem
                key={item.id}
                sx={{
                  color: "primary.main",
                  fontSize: "30px",
                  mx: 0,
                  px: 2,
                  justifyContent: "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    fontSize: "30px",
                    mx: 0,
                    px: 0,
                  }}
                >
                  <span className={item.icon}></span>
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    fontSize: "30px",
                    mx: 0,
                    px: 0,
                  }}
                />
              </MenuItem>
            ) : item.link === "br" ? (
              <Divider key={item.id} />
            ) : (
              <MenuItem
                onClick={(event) => this.handleListItemClick(event, item.id)}
                key={item.id}
                sx={{
                  color: "primary.main",
                  fontSize: "20px",
                  mx: 0,
                  pl: 2.5,
                  justifyContent: "center",
                }}
              >
                <ListItemIcon>
                  <span className={item.icon}></span>
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </MenuItem>
            )
          )}
        </Menu>
      </>
    );
  }
}

export default DCT_UserMenu;
