import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import "react-chat-elements/dist/main.css";
import { ChatList, MessageList, Input, Button } from "react-chat-elements";

import { validationMessage, MSG_SUCCESS, MSG_ERROR } from "../../lib";

import jnStyles from "../../styles/utils.module.css";

const utils = require("../../lib/utils");
const chat_cfg = require("./config");
const moment = require("moment");

class SEC_WapMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listMessage: [],
    };

    this.inputSend = this.inputSend.bind(this);
    this.inputKeyPress = this.inputKeyPress.bind(this);

    this.loadChat = this.loadChat.bind(this);
    this.readAllMsg = this.readAllMsg.bind(this);
    this.chatOnClick = this.chatOnClick.bind(this);
    this.chatOnContextMenu = this.chatOnContextMenu.bind(this);

    this.changeChildInputId = React.createRef();
    this.messageListReferance = React.createRef();
  }

  chatOnContextMenu(chatObj) {
    // console.log("chatOnContextMenu");
    // console.log(chatObj);
  }

  async chatOnClick(chatObj) {
    // console.log("chatOnClick");
    // console.log(chatObj);

    const currentUser = this.props.currentUser;
    if (!currentUser) return;
    this.props.onChange(chatObj.id);
  }

  async readAllMsg(IdM, IdD) {
    // console.log("readAllMsg");

    const formMsg = {
      IdM: IdM,
      IdD: IdD,
    };

    try {
      const res = await utils.postData(chat_cfg.CHAT_STEP_2_API, formMsg);
      // this.setState({ listMessage: data.chat });
      // console.log(res);
    } catch (e) {
      if (e instanceof utils.FetchError) {
        console.error(e.data.message);
      }
    }
  }

  async loadChat(IdM, IdD) {
    // console.log("loadChat");
    try {
      const data = await utils.fetchJson("/api/flydata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: IdD,
          api: chat_cfg.CHAT_STEP_1_API,
          pid: IdD,
        }),
      });

      this.setState({ listMessage: data.chat });
      // console.log(data);
    } catch (e) {
      if (e instanceof utils.FetchError) {
        console.error(e.data.message);
      }
    }
  }

  async inputSend(e) {
    const valore = this.changeChildInputId.current.value;
    if (!valore || valore.length === 0) return;

    const currentUser = this.props.currentUser;
    if (!currentUser) return;
    const otherUser = this.props.otherUser;
    if (!otherUser) return;

    const formMsg = {
      chatFkPersIdMittente: currentUser.id,
      chatFkPersIdDestinatario: otherUser.id,
      chatTesto: valore,
      chatDataInvio: moment().format(),
      chatDataLettura: null,
    };

    const res = await utils.postData(chat_cfg.CHAT_STEP_1_API, formMsg);
    if (res.status != 200) {
      validationMessage(res.message, MSG_ERROR);
    } else {
      validationMessage(res.message, MSG_SUCCESS);
      const msg = {
        position: "right",
        type: "text",
        text: valore,
        title: currentUser.name,
        date: moment().format(),
      };

      const newList = this.state.listMessage;
      newList.push(msg);
      this.setState({ listMessage: newList });

      this.changeChildInputId.current.value = "";

      await this.props.onRefresh();
    }
    e.preventDefault();
  }

  inputKeyPress(e) {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      //   console.log(this.changeChildInputId.current);
      this.inputSend(e);
      this.changeChildInputId.current.value = "";
      e.preventDefault();
      return false;
    }
  }

  render() {
    // console.log(this.props);
    return (
      <>
        <Box
          sx={{
            border: 0,
            // borderRadius: "16px",
            borderColor: "#B34A9D",
            bgcolor: "#FFFFFF",
            boxShadow: 0,
            p: 0,
            flexGrow: 1,
            maxWidth: { xs: "90vw", sm: "90vw", md: "400px" },
            flexDirection: "row",
            maxHeight: "590px",
            overflow: "auto",
            minWidth: "300px",
          }}
        >
          <ChatList
            className={jnStyles.jnDCT_ChatMessage}
            dataSource={this.props.personeChat}
            onClick={this.chatOnClick}
            onContextMenu={this.chatOnContextMenu}
          />
        </Box>
        {this.props.otherUser && (
          <Box sx={{ flexGrow: 1, p: 1, bgcolor: "#FFFFFF" }}>
            <Box
              sx={{
                border: 1,
                borderRadius: "16px",
                borderColor: "#B34A9D",
                boxShadow: 3,
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "flex-start",
                mb: 1,
                p: 1,
                // maxWidth: 140,
              }}
            >
              <Avatar
                alt={this.props.otherUser.name}
                src={`${process.env.cloudfiles}${this.props.otherUser.photoUrl}`}
                size="md"
              />
              <Typography
                // noWrap
                component="span"
                variant="body2"
                classes={{
                  body2: jnStyles.jnAddressName,
                }}
                sx={{ pl: 2 }}
              >
                {this.props.otherUser.name}
              </Typography>
            </Box>
            <Box
              sx={{
                border: 1,
                borderRadius: "16px",
                borderColor: "#B34A9D",
                bgcolor: "#B34A9D",
                boxShadow: 3,
                m: 0,
                p: 1,
                flexGrow: 1,
                // maxWidth: "400px",
                flexDirection: "row",
              }}
            >
              <Box
                id="convList"
                sx={{
                  bgcolor: "#B34A9D",
                  height: "50vh",
                  overflow: "auto",
                }}
              >
                <MessageList
                  id="convListIns"
                  referance={this.messageListReferance}
                  className={jnStyles.jnDCT_ChatMessage}
                  //   lockable={true}
                  //   // toBottomHeight={"100%"}
                  //   toBottomHeight={"100%"}
                  dataSource={this.state.listMessage}
                  downButton={true}
                />
              </Box>
              <Box sx={{ flexGrow: 1, bgcolor: "#788CB4", mt: 1, p: 1 }}>
                <Input
                  referance={this.changeChildInputId}
                  placeholder="Scrivi un messaggio"
                  multiline={true}
                  autoHeight={true}
                  maxHeight={100}
                  rightButtons={
                    <Button
                      color="white"
                      backgroundColor="black"
                      text="Send"
                      onClick={(event) => this.inputSend(event)}
                    />
                  }
                  onKeyPress={(event) => this.inputKeyPress(event)}
                />
              </Box>
            </Box>
          </Box>
        )}
      </>
    );
  }
}

export default SEC_WapMessage;
