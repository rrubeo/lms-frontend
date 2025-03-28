import * as React from "react";
import { Box, Badge, Zoom, Tooltip, IconButton } from "@mui/material";

import Iconify from "../iconify";
const utils = require("../../lib");

class DCT_ChatNotify extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newMsg: 0, startedLoop: false };

    this.defaultValue = this.defaultValue.bind(this);
    this.loopRead = this.loopRead.bind(this);
  }

  async componentDidMount() {
    await this.defaultValue();
    // await this.loopRead();
  }

  async defaultValue() {
    if (this.props.data) {
      await this.loadData(this.props.data.id);
    }
  }

  async loopRead() {
    // console.log("loopRead");
    if (this.state.startedLoop == false) {
      this.setState({ startedLoop: true });

      await this.defaultValue();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // console.log("timeout");
      this.setState({ startedLoop: false });
      await this.loopRead();
    }
  }

  async loadData(pid) {
    try {
      const data = await utils.fetchJson("/api/flydata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "DCT_Notifications",
          api: `${process.env.server}/chat`,
          pid: pid,
        }),
      });
      // console.log(data);
      let unreadMsg = 0;
      for (let m of data.personeChat) {
        unreadMsg = unreadMsg + m.unread;
      }

      this.setState({ newMsg: unreadMsg });
    } catch (e) {
      if (e instanceof utils.FetchError) {
        console.error(e.data.message);
      }
    }
  }
  render() {
    // console.log(this.props);
    return (<></>
      // <Box sx={{ pr: 3 }}>
      //   <IconButton
      //     color="secondary"
      //     href={`${process.env.frontend}/chat/network`}
      //     sx={{ width: 30, height: 20 }}
      //   >
      //     <Badge badgeContent={this.state.newMsg} color="notify">
      //       <Tooltip TransitionComponent={Zoom} title="Chat">
      //         <Iconify width={32} icon="mdi:chat-outline" />
      //       </Tooltip>
      //     </Badge>
      //   </IconButton>
      // </Box>
    );
  }
}

export default DCT_ChatNotify;
