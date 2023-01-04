import * as React from "react";
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Zoom,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";

import Iconify from "../iconify";
import Scrollbar from "../scrollbar";
const utils = require("../../lib");
import jnStyles from "../../styles/utils.module.css";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Your order is placed",
    description: "waiting for shipping",
    avatar: null,
    type: "order_placed",
    createdAt: "2022-11-15T18:43:30.636Z",
    isUnRead: true,
  },
  {
    id: 2,
    title: "faker.name.fullName()",
    description: "answered to your comment on the Minimal",
    avatar: "/images/process_steps.png",
    type: "friend_interactive",
    createdAt: "2022-11-15T18:43:30.636Z",
    isUnRead: true,
  },
  {
    id: 3,
    title: "You have new message",
    description: "5 unread messages",
    avatar: null,
    type: "chat_message",
    createdAt: "2022-11-15T18:43:30.636Z",
    isUnRead: true,
  },
];

class DCT_Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: null, notifications: [] };

    this.defaultValue = this.defaultValue.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.getUnread = this.getUnread.bind(this);
    this.handleMarkAllAsRead = this.handleMarkAllAsRead.bind(this);
    this.notificationItem = this.notificationItem.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  componentDidMount() {
    this.defaultValue();
  }

  async defaultValue() {
    await this.loadData("Massimiliano");
  }

  async loadData(pid) {
    try {
      const data = await utils.fetchJson("/api/flydata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "DCT_Notifications",
          api: `${process.env.server}/menu/notify`,
          pid: pid,
        }),
      });
      // console.log(data);
      this.setState({ notifications: data });
    } catch (e) {
      if (e instanceof utils.FetchError) {
        console.error(e.data.message);
      }
    }
  }

  getUnread() {
    let totalUnRead = this.state.notifications.filter(
      (item) => item.isUnRead === true
    ).length;
    return totalUnRead;
  }

  handleOpen(event) {
    this.setState({ open: event.currentTarget });
  }

  handleClose(event) {
    this.setState({ open: null });
  }

  async handleListItemClick(event, index) {
    // console.log(index);
    const n = this.state.notifications.map((notification) => {
      if (notification.id == index) {
        notification.isUnRead = false;
      }
      return notification;
    });

    this.setState({ notifications: n });

    const formData = {
      id: index,
    };

    const res = await utils.postData(
      `${process.env.server}/menu/notify`,
      formData
    );
    // console.log(res);
    await this.defaultValue();
  }

  async handleMarkAllAsRead() {
    const n = this.state.notifications.map((notification) => ({
      ...notification,
      isUnRead: false,
    }));
    // console.log(n);
    this.setState({ notifications: n });

    for (let m of this.state.notifications) {
      const formData = {
        id: m.id,
      };

      const res = await utils.postData(
        `${process.env.server}/menu/notify`,
        formData
      );
      // console.log(res);
    }
    await this.defaultValue();
  }

  renderContent(notification) {
    // console.log(notification);
    const title = (
      <Typography variant="subtitle2">
        {notification.title}
        <Typography
          component="span"
          variant="body2"
          sx={{ mx: 1, color: "text.secondary" }}
        >
          {notification.description}
        </Typography>
      </Typography>
    );
    if (notification.type === "appuntamento") {
      return {
        avatar: (
          <img alt={notification.title} src="/images/process_steps.png" />
        ),
        title,
      };
    }
    if (notification.type === "order_placed") {
      return {
        avatar: (
          <img alt={notification.title} src="/images/process_steps.png" />
        ),
        title,
      };
    }
    if (notification.type === "order_shipped") {
      return {
        avatar: (
          <img
            alt={notification.title}
            src="/assets/icons/ic_notification_shipping.svg"
          />
        ),
        title,
      };
    }
    if (notification.type === "mail") {
      return {
        avatar: (
          <img
            alt={notification.title}
            src="/assets/icons/ic_notification_mail.svg"
          />
        ),
        title,
      };
    }
    if (notification.type === "chat_message") {
      return {
        avatar: (
          <img alt={notification.title} src="/images/process_steps.png" />
        ),
        title,
      };
    }
    return {
      avatar: notification.avatar ? (
        <img alt={notification.title} src={notification.avatar} />
      ) : null,
      title,
    };
  }

  notificationItem(notification, status) {
    // // console.log(notification);
    // if (notification.isUnRead == status) {
    //   return <></>;
    // }
    const { avatar, title } = this.renderContent(notification);

    return (
      <ListItemButton
        onClick={(event) => this.handleListItemClick(event, notification.id)}
        key={notification.id}
        sx={{
          py: 0,
          px: 2.5,
          mt: "1px",
          ...(notification.isUnRead && {
            bgcolor: "action.selected",
          }),
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.disabled",
              }}
            >
              <Iconify
                icon="eva:clock-outline"
                sx={{ mr: 0.5, width: 16, height: 16 }}
              />
              {notification.createdAt}
            </Typography>
          }
        />
      </ListItemButton>
    );
  }

  render() {
    return (
      <Box sx={{ pr: 1 }}>
        <IconButton
          color={this.state.open ? "bell" : "secondary"}
          onClick={this.handleOpen}
          sx={{ width: 30, height: 20 }}
        >
          <Badge badgeContent={this.getUnread()} color="notify">
            <Tooltip TransitionComponent={Zoom} title="News">
              <Iconify width={32} icon="eva:bell-fill" />
            </Tooltip>
          </Badge>
        </IconButton>
        <Popover
          open={Boolean(this.state.open)}
          anchorEl={this.state.open}
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 3,
              ml: 0.75,
              width: 360,
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                classes={{
                  body2: jnStyles.jnNotTitle,
                }}
                variant="body2"
              >
                Notifiche
              </Typography>
              <Typography
                variant="body2"
                classes={{
                  body2: jnStyles.jnNotSubTitle,
                }}
              >
                {this.getUnread()} messaggi da leggere
              </Typography>
            </Box>

            {this.getUnread() > 0 && (
              <Tooltip title=" Segna come già letto">
                <IconButton color="info" onClick={this.handleMarkAllAsRead}>
                  <Iconify icon="eva:done-all-fill" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Divider sx={{ borderStyle: "dashed" }} />
          <Scrollbar
            sx={{
              height: { xs: 280, sm: 400 },
            }}
          >
            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ py: 1, px: 2.5, typography: "overline" }}
                >
                  Da leggere
                </ListSubheader>
              }
            >
              {this.state.notifications
                .filter((c) => c.isUnRead !== false)
                .map((notification) =>
                  this.notificationItem(notification, false)
                )}
            </List>
            <Divider sx={{ borderStyle: "dashed" }} />
            <List
              disablePadding
              subheader={
                <ListSubheader
                  disableSticky
                  sx={{ py: 1, px: 2.5, typography: "overline" }}
                >
                  Già letti
                </ListSubheader>
              }
            >
              {this.state.notifications
                .filter((c) => c.isUnRead !== true)
                .map((notification) =>
                  this.notificationItem(notification, true)
                )}
              {/* {this.state.notifications.map((notification) =>
                this.notificationItem(notification, true)
              )} */}
            </List>
          </Scrollbar>
          <Divider sx={{ borderStyle: "dashed" }} />
        </Popover>
      </Box>
    );
  }
}

export default DCT_Notifications;
