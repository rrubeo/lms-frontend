import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FRM_CustomContact from "./FRM_CustomContact";
import SEC_Message from "./SEC_Message";
import jnStyles from "../../styles/utils.module.css";

const chat_cfg = require("./config");

class FRM_CustomNetwork extends React.Component {
  constructor(props) {
    super(props);
    let currentUser = {
      id: this.props.userData.id,
      name: this.props.userData.name,
      email: this.props.userData.email,
      description: this.props.userData.description,
      role: this.props.userData.role,
      photoUrl: this.props.userData.photoUrl,
    };

    this.state = {
      currentUser,
      otherUser: null,
      startedLoop: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.loopRead = this.loopRead.bind(this);

    this.changeChildMessage = React.createRef();
  }

  async handleClick(userId) {
    const { currentUser } = this.state;
    const user = this.props.data.contatti.find((user) => user.id === userId);
    this.setState({ otherUser: user });
    // console.log(currentUser);
    // console.log(user);
    // console.log(this.changeChildMessage.current);
    if (user) {
      await this.changeChildMessage.current.loadChat(currentUser.id, user.id);
    }

    await this.loopRead();
  }

  async loopRead() {
    // console.log(this.state.startedLoop);
    if (this.state.startedLoop == false) {
      this.setState({ startedLoop: true });
      await this.props.onRefresh();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // console.log("timeout");
      this.setState({ startedLoop: false });
      await this.loopRead();
    }
  }

  render() {
    const { currentUser } = this.state;
    // console.log(currentUser);
    // console.log(this.props);
    return (
      <Box
        sx={{
          border: 1,
          borderRadius: "16px",
          borderColor: "#252846",
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          m: 0,
          p: 0,
        }}
      >
        <Box
          sx={{
            border: 0,
            bgcolor: "#aabcdf",
            borderRadius: "16px",
            // borderColor: "#B34A9D",
            // boxShadow: 3,
            display: "flex",
            // flexWrap: "wrap",
            // flexGrow: 1,
            flexDirection: "column",
            // alignItems: "flex-start",
            // alignContent: { xs: "center", md: "flex-start" },
            // justifyContent: "flex-start",
            m: 1,
            p: 2,
            maxHeight: "620px",
            overflow: "auto",
          }}
        >
          <Typography
            // noWrap
            component="span"
            variant="body2"
            classes={{
              body2: jnStyles.jnAddressName,
            }}
          >
            {this.props.data.lb_rubrica}
          </Typography>
          {this.props.data.contatti.map((user) => (
            <FRM_CustomContact
              key={user.id}
              user={user}
              onClick={this.handleClick}
            />
          ))}
        </Box>
        <Box
          sx={{
            border: 0,
            // borderRadius: "16px",
            // borderColor: "#B34A9D",
            // boxShadow: 3,
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            flexGrow: 1,
            // alignItems: "center",
            // alignContent: { xs: "center", md: "flex-start" },
            // justifyContent: "center",
            m: 0,
            p: 2,
          }}
        >
          <Typography
            // noWrap
            component="span"
            variant="body2"
            classes={{
              body2: jnStyles.jnAddressName,
            }}
          >
            {this.props.data.lb_conversa}
          </Typography>
          <SEC_Message
            currentUser={this.state.currentUser}
            otherUser={this.state.otherUser}
            personeChat={this.props.data.personeChat}
            onChange={this.handleClick}
            ref={this.changeChildMessage}
            onRefresh={this.loopRead}
          />
        </Box>
      </Box>
    );
  }
}

export default FRM_CustomNetwork;
