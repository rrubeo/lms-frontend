import * as React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import jnStyles from "../../../styles/utils.module.css";

import FS_ProfileStudent from "../fs/FS_ProfileStudent";
import FS_Progress from "../fs/FS_Progress";
import FS_List from "../fs/FS_List";
import SEC_List from "./SEC_List";

const fsme_cfg = require("./config");

class FRM_Studente_Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack direction="column" spacing={4} mt={0} mb={0} p={0}>
        <Stack direction="row" spacing={0} mt={0} mb={0} p={0}>
          <FS_ProfileStudent
            profile={this.props.data.iscrizione[0]}
            urlPath={fsme_cfg.IMAGE_BASE_URL}
          />
          <FS_Progress
            type="home"
            title="Avanzamento corso"
            profile={this.props.data.iscrizione[0]}
          />
        </Stack>
        <Stack direction="column" spacing={0} mt={0} mb={0} p={0}>
          {/* <FS_List
            background="#B34B9E"
            class="lessonsCard"
            title="Corsi attivi"
            array={[{ id: 1, name: this.props.data.profilo.iscrizione }]}
            type="text"
            height="120px"
            clickable={false}
          /> */}
          <SEC_List
            listTitle={this.props.data.label_corsi}
            array={this.props.data.iscrizione}
          />
        </Stack>
      </Stack>
    );
  }
}

export default FRM_Studente_Home;
