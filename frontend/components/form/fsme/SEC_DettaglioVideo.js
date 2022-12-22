import * as React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import DTC_Player from "../../video/DTC_Player";
import jnStyles from "../../../styles/utils.module.css";

const fsme_cfg = require("./config");
const utils = require("../../../lib");

class SEC_DettaglioVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.OnVideoEnd = this.OnVideoEnd.bind(this);
    this.OnVideoLoaded = this.OnVideoLoaded.bind(this);
  }

  async OnVideoEnd(data) {
    const formData = {
      id: this.props.data.idLezione,
    };

    const res = await utils.postData(
      `${fsme_cfg.FSME_STEP_1_API_VIDEO_END}/${this.props.profilo.userName}/${this.props.data.idLezione}`,
      formData
    );

    // console.log(res);
  }

  async OnVideoLoaded(data) {
    const formData = {
      id: this.props.lezioneId,
    };

    const res = await utils.postData(
      `${fsme_cfg.FSME_STEP_1_API_VIDEO_START}/${this.props.profilo.userName}/${this.props.data.idLezione}`,
      formData
    );

    // console.log(res);
  }

  render() {
    return (
      <Box
        component="div"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          p: 2,
        }}
      >
        {this.props.data.idVideo != 0 ? (
          <DTC_Player
            OnVideoEnd={this.OnVideoEnd}
            OnVideoLoaded={this.OnVideoLoaded}
            video={this.props.data.pathVideo ? this.props.data.pathVideo : " "}
            width="400"
            responsive={true}
          />
        ) : (
          <Skeleton variant="rounded" width="100%" height="50%" />
        )}
      </Box>
    );
  }
}

export default SEC_DettaglioVideo;
