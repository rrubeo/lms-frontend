import * as React from "react";
import { withRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DTC_DataGrid from "../../grid/DTC_DataGrid";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const pb_cfg = require("./config");

class FRM_ProgBase_Ricerca extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: pb_cfg.FRM_PBASE_STEP_0,
    };
    // this.props.onSubmit(event, data);
    this.props.onNextStep(event, null, pb_cfg.PBASE_STEP_1);
  }

  handleReset(event) {}

  onChangeForm(id, data) {
    switch (id) {
      default:
        // console.log(id);
        // console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    const rowData = {
      id: pb_cfg.FRM_PBASE_STEP_1,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    // console.log(`<${pb_cfg.FRM_PBASE_STEP_0}='${this.props.id}'>`);
    return (
      <Stack direction="column" spacing={4} mt={0} mb={2} p={0}>
        <Box
          id={pb_cfg.FRM_PBASE_STEP_0}
          component="form"
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
        >
          <Button
            variant="contained"
            href={pb_cfg.PBASE_STEP_1}
            classes={{ root: jnStyles.jnBT }}
          >
            {this.props.data.config_label}
          </Button>
        </Box>
        <DTC_DataGrid
          id="gd_ricerca"
          cols={this.props.data.cols}
          rows={this.props.data.rows}
          onChange={this.onChangeForm}
          onDelete={this.onDeleteRow}
          onNextStep={this.props.onNextStep}
          action={this.props.action}
        />
      </Stack>
    );
  }
}

export default withRouter(FRM_ProgBase_Ricerca);
