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
import DCT_Breadcrumbs from "../../DCT_Breadcrumbs";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const ese_cfg = require("./config");

class FRM_Ese_Visualizza extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeId: "tx_nome",
      nomeValue: "",
      limiteId: "tx_limite",
      limiteValue: "",
      punteggioId: "tx_punteggio",
      punteggioValue: "",
      tipoId: "cb_tipo",
      tipoValue: { label: "", id: 0 },
      livelloId: "cb_livello",
      livelloValue: { label: "", id: 0 },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildTipoId = React.createRef();
    this.changeChildLivelloId = React.createRef();
    this.changeChildNomeId = React.createRef();
    this.changeChildLimiteId = React.createRef();
    this.changeChildPunteggioId = React.createRef();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: ese_cfg.FRM_ESE_STEP_3,
      nome: this.state.nomeValue,
      limite: this.state.limiteValue,
      punteggio: this.state.punteggioValue,
      tipo: this.state.tipoValue,
      livello: this.state.livelloValue,
    };
    await this.props.onSubmit(event, data);
  }

  handleReset(event) {
    this.changeChildTipoId.current.handleReset();
    this.changeChildLivelloId.current.handleReset();

    this.changeChildNomeId.current.handleReset();
    this.changeChildLimiteId.current.handleReset();
    this.changeChildPunteggioId.current.handleReset();

    this.setState({
      tipoValue: { label: "", id: 0 },
      livelloValue: { label: "", id: 0 },
      nomeValue: "",
      limiteValue: "",
      punteggioValue: "",
    });
  }

  onChangeForm(id, data) {
    switch (id) {
      case this.state.nomeId:
        this.setState({ nomeValue: data });
        break;
      case this.state.limiteId:
        this.setState({ limiteValue: data });
        break;
      case this.state.punteggioId:
        this.setState({ punteggioValue: data });
        break;
      case this.state.tipoId:
        this.setState({ tipoValue: data });
        break;
      case this.state.livelloId:
        this.setState({ livelloValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    const rowData = {
      id: ese_cfg.FRM_ESE_STEP_3,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    const linkBack = utils.getBackLink(
      "ese",
      ese_cfg.ESE_STEP_0,
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
          <DCT_Breadcrumbs
            id={`bread_${ese_cfg.FRM_ESE_STEP_3}`}
            list={this.props.data.bread}
            page={[ese_cfg.ESE_STEP_3]}
            pageId={this.props.pbaseId}
            path={`${process.env.frontend}/ese`}
          />
        </Stack>
        <DCT_Stepper
          id="stepper"
          activeStep={this.props.activeStep}
          steps={this.props.data.stepper}
        />
        <Box
          component="form"
          id={ese_cfg.FRM_ESE_STEP_3}
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
            <DCT_ComboBox
              id={this.state.tipoId}
              list={this.props.data.tipo}
              label={this.props.data.tipo_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildTipoId}
            />
            <DTC_TextBox
              id={this.state.limiteId}
              label={this.props.data.limite_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildLimiteId}
            />
            <DTC_TextBox
              id={this.state.punteggioId}
              label={this.props.data.punteggio_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildPunteggioId}
            />
            <DCT_ComboBox
              id={this.state.livelloId}
              list={this.props.data.livello}
              label={this.props.data.livello_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildLivelloId}
            />
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
          id="gd_visualizza"
          cols={this.props.data.cols}
          rows={this.props.data.rows}
          onChange={this.onChangeForm}
          onDelete={this.onDeleteRow}
          onNextStep={this.props.onNextStep}
          action={this.props.action}
          actionWidth={200}
        />
      </Stack>
    );
  }
}

export default FRM_Ese_Visualizza;
