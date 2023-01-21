import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SEC_WapMessage from "./SEC_WapMessage";
import SEC_StudentProfile from "../form/fsme/SEC_StudentProfile";
import SEC_StudentProgress from "../form/fsme/SEC_StudentProgress";

import jnStyles from "../../styles/utils.module.css";
const chat_cfg = require("./config");

class FRM_WapCustomNetwork extends React.Component {
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

  async componentDidMount() {
    await this.loopRead();
  }

  async handleClick(userId) {
    const { currentUser } = this.state;
    const user = this.props.data.contatti.find((user) => user.id === userId);
    this.setState({ otherUser: user });
    // console.log(currentUser);
    // console.log(user);
    // console.log(this.changeChildMessage.current);
    if (user) {
      await this.changeChildMessage.current.readAllMsg(currentUser, user);
      await this.changeChildMessage.current.loadChat(currentUser.id, user.id);
    }

    // await this.loopRead();
  }

  async loopRead() {
    const { currentUser, otherUser } = this.state;
    const element = document.getElementById("convList");
    // console.log(element);
    // element.scrollIntoView();
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
    // console.log(this.state.startedLoop);
    if (this.state.startedLoop == false) {
      this.setState({ startedLoop: true });
      // console.log(currentUser);
      // console.log(otherUser);
      if (otherUser) {
        await this.changeChildMessage.current.loadChat(
          currentUser.id,
          otherUser.id
        );
      }
      await this.props.onRefresh();
      await new Promise((resolve) =>
        setTimeout(resolve, process.env.CHAT_TIMEOUT)
      );
      // console.log("timeout");
      this.setState({ startedLoop: false });
      await this.loopRead();
    }
  }

  render() {
    const { currentUser } = this.state;
    // console.log(currentUser);
    // console.log(this.props.data);
    return (
      <Stack
        direction="column"
        spacing={{ xs: 0, sm: 0, md: 2 }}
        mt={0}
        mb={0}
        p={0}
      >
        {this.props.data.profilo.idIscrizione == 0 ? (
          <Typography
            variant="body2"
            classes={{
              body2: jnStyles.jnA1Profile,
            }}
            sx={{ m: 0, p: 0 }}
          >
            {this.props.data.title}
          </Typography>
        ) : (
          <Stack
            direction={{ xs: "column", sm: "row", md: "row" }}
            justifyContent={{
              xs: "space-evenly",
              sm: "space-between",
              md: "space-between",
            }}
            alignItems={{ xs: "flex-start", sm: "flex-start", md: "stretch" }}
            spacing={{ xs: 2, sm: 0, md: 0 }}
          >
            <SEC_StudentProfile profilo={this.props.data.profilo} />
            <SEC_StudentProgress
              text={this.props.data.label_avanzamento}
              avanzamento={
                this.props.data.profilo.percentualeAvanzamento
                  ? this.props.data.profilo.percentualeAvanzamento
                  : 0
              }
            />
          </Stack>
        )}

        <Box
          sx={{
            border: 1,
            borderRadius: "16px",
            borderColor: "#252846",
            bgcolor: "#FFFFFF",
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "column", md: "row" },
            m: 0,
            p: 1,
          }}
        >
          <SEC_WapMessage
            currentUser={this.state.currentUser}
            otherUser={this.state.otherUser}
            personeChat={this.props.data.personeChat}
            onChange={this.handleClick}
            ref={this.changeChildMessage}
            onRefresh={this.loopRead}
          />
        </Box>
      </Stack>
    );
  }
}

export default FRM_WapCustomNetwork;
