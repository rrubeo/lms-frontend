import * as React from "react";

import Stack from "@mui/material/Stack";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import Divider from "@mui/material/Divider";
import DCT_LinkButton from "../../DCT_LinkButton";

const utils = require("../../../lib");
const tu_cfg = require("./config");
const moni_cfg = require("../moni/config");
const doce_cfg = require("../doce/config");

class FRM_Tutor_Dettaglio_Details extends React.Component {
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
    console.log(this.props);
    let linkBack = "";

    if (this.props?.monitor == true) {
      // linkBack = `/monitor/${moni_cfg.MONI_STEP_7}`;
      linkBack = utils.getBackLink(
        "monitor",
        moni_cfg.MONI_STEP_7,
        this.props.query
      );
    } else if (this.props?.docenti == true) {
      linkBack = `/doce/${doce_cfg.DOCE_STEP_3}`;
    } else {
      linkBack = `/tutorop/${tu_cfg.TUTOP_STEP_0}`;
    }

    return (
      <>
        <DCT_LinkButton href={linkBack} text={this.props.data.back_label} />
        <Divider sx={{ pt: "1%" }} light />
        <Stack direction="column" spacing={4} mt={0} mb={2} p={0}>
          <DTC_DataGrid
            id={`GD_${this.props.id}`}
            cols={this.props.data.cols}
            rows={this.props.data.rows}
            onChange={this.onChangeForm}
            onNextStep={this.props.onNextStep}
            action={this.props.action}
            actionWidth={0}
          />
        </Stack>
      </>
    );
  }
}

export default FRM_Tutor_Dettaglio_Details;
