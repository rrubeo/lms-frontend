import * as React from "react";

import Stack from "@mui/material/Stack";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import Divider from "@mui/material/Divider";
import DCT_LinkButton from "../../DCT_LinkButton";

const tu_cfg = require("./config");

class FRM_Tutor_Lezioni extends React.Component {
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
    const linkBack = `/tutorop/${tu_cfg.TUTOP_STEP_0}`;
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

export default FRM_Tutor_Lezioni;
