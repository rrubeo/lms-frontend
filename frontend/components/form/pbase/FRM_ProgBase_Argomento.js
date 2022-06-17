import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DTC_TextBox from "../../DTC_TextBox";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_Stepper from "../../DCT_Stepper";
import DCT_Breadcrumbs from "../../DCT_Breadcrumbs";
import DCT_LinkButton from "../../DCT_LinkButton";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const pb_cfg = require("./config");

class FRM_ProgBase_Argomento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      argomentoId: "tx_argomento",
      argomentoValue: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildArgomentoId = React.createRef();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: pb_cfg.FRM_PBASE_STEP_3,
      argomento: this.state.argomentoValue,
    };
    await this.props.onSubmit(event, data);
  }

  onChangeForm(id, data) {
    console.log("CHANGE FORM");

    switch (id) {
      case this.state.argomentoId:
        this.setState({ argomentoValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    console.log("DELETE ROW");
    console.log(id);
    console.log(data);

    const rowData = {
      id: pb_cfg.FRM_PBASE_STEP_3,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  handleReset(event) {
    this.changeChildArgomentoId.current.handleReset();
    this.setState({ argomentoValue: "" });
  }

  render() {
    console.log("ARGOMENTO");
    console.log(this.props.query);
    const linkBack = utils.getBackLink(
      "pb",
      pb_cfg.PBASE_STEP_2,
      this.props.query
    );
    console.log(linkBack);
    return (
      <Stack direction="column" spacing={4} mt={0} mb={2} p={0}>
        <Box
          component="form"
          id={pb_cfg.FRM_PBASE_STEP_3}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
        >
          <DCT_Breadcrumbs
            id={`bread_${pb_cfg.FRM_PBASE_STEP_3}`}
            list={this.props.data.bread}
          />
          <DCT_LinkButton href={linkBack} text="back" />
          <DCT_Stepper
            id="stepper"
            activeStep={this.props.activeStep}
            steps={this.props.data.stepper}
          />
          <Stack direction="row" spacing={2}>
            <DTC_TextBox
              required
              autoFocus
              id={this.state.argomentoId}
              label={this.props.data.argomento_label}
              onChange={this.onChangeForm}
              size={1 / 2}
              ref={this.changeChildArgomentoId}
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
          id="gd_argomento"
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

export default FRM_ProgBase_Argomento;
