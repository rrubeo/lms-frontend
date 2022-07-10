import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DCT_LinkButton from "../../DCT_LinkButton";
import DCT_Stepper from "../../DCT_Stepper";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DTC_TextMultiline from "../../DTC_TextMultiline";
import DTC_TextBox from "../../DTC_TextBox";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const ese_cfg = require("./config");

class FRM_Ese_Check extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testoGruppoId: "tx_gruppo",
      testoGruppoValue: "",
      nomeGruppoId: "tx_nome_gruppo",
      nomeGruppoValue: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildTestoGruppoId = React.createRef();
    this.changeChildNomeGruppoId = React.createRef();
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
    // console.log("CHANGE");
    switch (id) {
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    const rowData = {
      id: ese_cfg.FRM_ESE_STEP_6,
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
          <DCT_LinkButton href={linkBack} text={this.props.data.back_label} />
        </Stack>
        <DCT_Stepper
          id="stepper"
          activeStep={this.props.activeStep}
          steps={this.props.data.stepper}
        />
        <Box
          component="form"
          id={ese_cfg.FRM_ESE_STEP_6}
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
            <DTC_TextMultiline
              required
              id={this.state.testoGruppoId}
              label={this.props.data.testo_gruppo_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildTestoGruppoId}
            />
            <DTC_TextBox
              required
              id={this.state.nomeGruppoId}
              label={this.props.data.nome_gruppo_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildNomeGruppoId}
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
          actionWidth={150}
        />
      </Stack>
    );
  }
}

export default FRM_Ese_Check;
