import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

import DTC_TextBox from "../../DTC_TextBox";
import DTC_TextInfo from "../../DTC_TextInfo";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DCT_CheckList from "../../selector/DCT_CheckList";
import DCT_LinkButton from "../../DCT_LinkButton";
import DCT_PianoOrario from "../../DCT_PianoOrario";

import jnStyles from "../../../styles/utils.module.css";

const do_cfg = require("./config");

class FRM_Docenti_Orario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onChangeForm = this.onChangeForm.bind(this);
  }

  onChangeForm(id, data) {
    switch (id) {
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  render() {
    console.log(this.props.data);
    return (
      <Stack direction="column" spacing={4} mt={0} mb={2} p={0}>
        <DCT_PianoOrario data={this.props.data} />
      </Stack>
    );
  }
}

export default FRM_Docenti_Orario;
