import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DCT_LinkButton from "../../DCT_LinkButton";
import DCT_Stepper from "../../DCT_Stepper";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DTC_TextBox from "../../DTC_TextBox";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const ese_cfg = require("./config");

class FRM_Ese_Esercitazione extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nomeId: "tx_nome", nomeValue: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildNomeId = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    // const data = {
    //   id: ese_cfg.FRM_PBASE_STEP_0,
    // };
    // // this.props.onSubmit(event, data);
    // this.props.onNextStep(event, null, ese_cfg.PBASE_STEP_1);
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
      id: ese_cfg.FRM_ESE_STEP_2,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    const linkBack = utils.getBackLink(
      "ese",
      ese_cfg.ESE_STEP_3,
      this.props.query
    );
    return (
      <Stack direction="column" spacing={4} mt={0} mb={2} p={0}>
        <Stack
          direction="row"
          spacing={5}
          justifyContent="flex-start"
          alignItems="center"
        >
          <DCT_LinkButton href={linkBack} text="back" />
        </Stack>
        <DCT_Stepper
          id="stepper"
          activeStep={this.props.activeStep}
          steps={this.props.data.stepper}
        />
        <Box
          component="form"
          id={ese_cfg.FRM_ESE_STEP_2}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
          sx={{ display: "inline" }}
        >
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <DTC_TextBox
              required
              id={this.state.nomeId}
              label={this.props.data.nome_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildNomeId}
            />
          </Stack>
        </Box>
        <DTC_DataGrid
          id="gd_visualizza"
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

export default FRM_Ese_Esercitazione;
