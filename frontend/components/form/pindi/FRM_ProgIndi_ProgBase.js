import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_Stepper from "../../DCT_Stepper";
import DCT_Breadcrumbs from "../../DCT_Breadcrumbs";
import jnStyles from "../../../styles/utils.module.css";

const pi_cfg = require("./config");

class FRM_ProgIndi_ProgBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      istitutoId: "cb_istituto",
      istitutoValue: { label: "", id: 0 },
      programmaId: "cb_programma",
      programmaValue: { label: "", id: 0 },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleBack = this.handleBack.bind(this);

    this.changeChildIstitutoId = React.createRef();
    this.changeChildProgrammaId = React.createRef();
  }

  handleBack(event) {
    event.preventDefault();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: pi_cfg.FRM_PINDI_STEP_0,
      istituto: this.state.istitutoValue,
      programma: this.state.programmaValue,
    };
    await this.props.onSubmit(event, data);
  }

  handleReset(event) {
    // console.log("RESET");
    this.changeChildIstitutoId.current.handleReset();
    this.changeChildProgrammaId.current.handleReset();
    this.setState({ istitutoValue: { label: "", id: 0 } });
    this.setState({ programmaValue: { label: "", id: 0 } });
  }

  onChangeForm(id, data) {
    console.log("CHANGE FORM");

    switch (id) {
      case this.state.istitutoId:
        this.setState({ istitutoValue: data });
        break;
      case this.state.programmaId:
        this.setState({ programmaValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  async onDeleteRow(id, data) {
    console.log("DELETE ROW");
    console.log(id);
    console.log(data);

    const rowData = {
      id: pi_cfg.FRM_PBASE_STEP_1,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    console.log(`<${pi_cfg.FRM_PINDI_STEP_0}='${this.props.id}'>`);

    return (
      <Stack direction="column" spacing={4} mt={0} mb={2} p={0}>
        <DCT_Stepper
          id="stepper"
          activeStep={this.props.activeStep}
          steps={this.props.data.stepper}
        />
        <Box
          id={pi_cfg.FRM_PINDI_STEP_0}
          component="form"
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
        >
          <Stack direction="row" spacing={2}>
            <DCT_ComboBox
              id={this.state.istitutoId}
              list={this.props.data.indirizzo}
              label={this.props.data.indirizzo_label}
              onChange={this.onChangeForm}
              size={400}
              ref={this.changeChildIstitutoId}
            />
            <DCT_ComboBox
              id={this.state.programmaId}
              list={this.props.data.programma}
              label={this.props.data.programma_label}
              onChange={this.onChangeForm}
              size={300}
              ref={this.changeChildProgrammaId}
            />
            <Button
              type="submit"
              variant="contained"
              classes={{ root: jnStyles.jnBT }}
            >
              Salva
            </Button>
            <Button
              type="reset"
              variant="contained"
              classes={{ root: jnStyles.jnBT }}
            >
              Reset
            </Button>
          </Stack>
        </Box>
        <DTC_DataGrid
          id="gd_indirizzo"
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

export default FRM_ProgIndi_ProgBase;
