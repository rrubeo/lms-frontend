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
import DTC_TextInfo from "../../DTC_TextInfo";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const ese_cfg = require("./config");

class FRM_Ese_Risposte extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numDomandaId: "tx_numero",
      numDomandaValue: "",
      rispostaId: "tx_gruppo",
      rispostaValue: "",
      tipoId: "cb_tipo",
      tipoValue: { label: "", id: 0 },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildRispostaId = React.createRef();
    this.changeChildTipoId = React.createRef();
    this.changeChildNumDomandaId = React.createRef();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: ese_cfg.FRM_ESE_STEP_5,
      numero: this.state.numDomandaValue,
      risposta: this.state.rispostaValue,
      tipo: this.state.tipoValue,
    };
    await this.props.onSubmit(event, data);
  }

  handleReset(event) {
    this.changeChildRispostaId.current.handleReset();
    this.changeChildTipoId.current.handleReset();
    this.changeChildNumDomandaId.current.handleReset();
    this.setState({
      tipoValue: { label: "", id: 0 },
      numDomandaValue: "",
      rispostaValue: "",
    });
  }

  onChangeForm(id, data) {
    switch (id) {
      case this.state.numDomandaId:
        this.setState({ numDomandaValue: data });
        break;
      case this.state.rispostaId:
        this.setState({ rispostaValue: data });
        break;
      case this.state.tipoId:
        this.setState({ tipoValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    const rowData = {
      id: ese_cfg.FRM_ESE_STEP_5,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    // console.log(this.props.data.domanda[0]);
    const linkBack = utils.getBackLink(
      "ese",
      ese_cfg.ESE_STEP_4,
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
          id={ese_cfg.FRM_ESE_STEP_5}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
          sx={{ display: "inline" }}
        >
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems={{ xs: "center", sm: "center", md: "flex-start" }}
          >
            <Stack
              direction="column"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ m: "0px", width: "20%", p: "0px" }}
            >
              <DTC_TextBox
                type="number"
                required
                id={this.state.numDomandaId}
                label={this.props.data.n_domanda_label}
                onChange={this.onChangeForm}
                size={1}
                ref={this.changeChildNumDomandaId}
              />
              <DCT_ComboBox
                id={this.state.tipoId}
                list={this.props.data.tipo}
                label={this.props.data.tipo_label}
                onChange={this.onChangeForm}
                size={1}
                ref={this.changeChildTipoId}
              />
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ m: "0px", width: "80%", p: "0px" }}
            >
              <DTC_TextInfo
                id="tx_domanda"
                label={this.props.data.domanda_label}
                value={this.props.data.domanda[0].col3}
                size={1}
              />
              <DTC_TextMultiline
                required
                id={this.state.rispostaId}
                label={this.props.data.testo_gruppo_label}
                onChange={this.onChangeForm}
                size={1}
                ref={this.changeChildRispostaId}
              />
            </Stack>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              classes={{ root: jnStyles.jnBT }}
            >
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
            </ButtonGroup>
          </Stack>
        </Box>
        <DTC_DataGrid
          id="gd_risposte"
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

export default FRM_Ese_Risposte;
