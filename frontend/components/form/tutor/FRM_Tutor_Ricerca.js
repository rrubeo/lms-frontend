import * as React from "react";

import Stack from "@mui/material/Stack";
import DTC_DataGrid from "../../grid/DTC_DataGrid";

const tu_cfg = require("./config");

class FRM_Tutor_Ricerca extends React.Component {
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
    return (
      <Stack direction="column" spacing={4} mt={0} mb={2} p={0}>
        <DTC_DataGrid
          id="gd_ricerca"
          cols={this.props.data.cols}
          rows={this.props.data.rows}
          onChange={this.onChangeForm}
          onNextStep={this.props.onNextStep}
          action={this.props.action}
          actionWidth={120}
        />
      </Stack>
    );
  }
}

export default FRM_Tutor_Ricerca;
