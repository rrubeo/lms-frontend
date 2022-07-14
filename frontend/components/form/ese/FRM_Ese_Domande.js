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
import DCT_Upload from "../../DCT_Upload";
import DCT_Loader from "../../DCT_Loader";
import DCT_Breadcrumbs from "../../DCT_Breadcrumbs";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const ese_cfg = require("./config");

class FRM_Ese_Domande extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: 0,
      domandaId: "tx_domanda",
      domandaValue: "",
      numDomandaId: "tx_numero",
      numDomandaValue: "",
      ptDomandaId: "tx_punteggio",
      ptDomandaValue: "",
      tipoId: "cb_tipo",
      tipoValue: { label: "", id: 0 },
      uploadId: "tx_upload",
      selectedFile: null,
      uploadLoading: false,
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);

    this.changeChildTipoId = React.createRef();
    this.changeChildDomandaId = React.createRef();
    this.changeChildUploadId = React.createRef();
    this.changeChildPtDomandaId = React.createRef();
    this.changeChildNumDomandaId = React.createRef();
  }

  async handleUpdate(event) {
    event.preventDefault();
    const data = {
      upid: this.state.selectedId,
      id: ese_cfg.FRM_ESE_STEP_4,
      domanda: this.state.domandaValue,
      numero: this.state.numDomandaValue,
      punteggio: this.state.ptDomandaValue,
      tipo: this.state.tipoValue,
      file: this.state.selectedFile,
    };
    await this.props.onSubmit(event, data);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ uploadLoading: true });
    const data = {
      id: ese_cfg.FRM_ESE_STEP_4,
      domanda: this.state.domandaValue,
      numero: this.state.numDomandaValue,
      punteggio: this.state.ptDomandaValue,
      tipo: this.state.tipoValue,
      file: this.state.selectedFile,
    };
    await this.props.onSubmit(event, data);
    this.setState({ uploadLoading: false });
  }

  handleReset(event) {
    this.changeChildTipoId.current.handleReset();
    this.changeChildDomandaId.current.handleReset();
    this.changeChildUploadId.current.handleReset();
    this.changeChildNumDomandaId.current.handleReset();
    this.changeChildPtDomandaId.current.handleReset();
    this.setState({
      selectedId: 0,
      tipoValue: { label: "", id: 0 },
      domandaValue: "",
      numDomandaValue: "",
      ptDomandaValue: "",
      selectedFile: null,
    });
  }

  onChangeForm(id, data) {
    // console.log("CHANGE");
    switch (id) {
      case this.state.domandaId:
        this.setState({ domandaValue: data });
        break;
      case this.state.numDomandaId:
        this.setState({ numDomandaValue: data });
        break;
      case this.state.ptDomandaId:
        this.setState({ ptDomandaValue: data });
        break;
      case this.state.tipoId:
        this.setState({ tipoValue: data });
        break;
      case this.state.uploadId:
        this.setState({ selectedFile: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    const rowData = {
      id: ese_cfg.FRM_ESE_STEP_4,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  onSelectRow(id, data) {
    console.log(data);
    this.changeChildTipoId.current.setText(data.row.col2);
    this.changeChildDomandaId.current.setText(data.row.col3);
    // this.changeChildUploadId.current.setText(data.row.col3);
    this.changeChildNumDomandaId.current.setText(data.row.col1);
    this.changeChildPtDomandaId.current.setText(data.row.col4);
    this.setState({
      selectedId: id,
      domandaValue: data.row.col3,
      numDomandaValue: data.row.col1,
      ptDomandaValue: data.row.col4,
      selectedFile: null,
    });
  }

  render() {
    const pageBack =
      this.props.query.param.length > 3
        ? ese_cfg.ESE_STEP_2
        : ese_cfg.ESE_STEP_3;

    const linkBack = utils.getBackLink("ese", pageBack, this.props.query);

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
            id={`bread_${ese_cfg.FRM_ESE_STEP_4}`}
            list={this.props.data.bread}
            page={[ese_cfg.ESE_STEP_4]}
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
          id={ese_cfg.FRM_ESE_STEP_4}
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
              <DTC_TextBox
                type="number"
                required
                id={this.state.ptDomandaId}
                label={this.props.data.pt_domanda_label}
                onChange={this.onChangeForm}
                size={1}
                ref={this.changeChildPtDomandaId}
              />
              <DCT_Upload
                id={this.state.uploadId}
                onChange={this.onChangeForm}
                size={1}
                ref={this.changeChildUploadId}
              />
            </Stack>
            <DTC_TextMultiline
              required
              id={this.state.domandaId}
              label={this.props.data.domanda_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildDomandaId}
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
                Nuovo
              </Button>
              <Button
                variant="contained"
                classes={{ root: jnStyles.jnBT }}
                onClick={this.handleUpdate}
              >
                Modifica
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
        {this.state.uploadLoading ? (
          <DCT_Loader />
        ) : (
          <DTC_DataGrid
            id="gd_domande"
            cols={this.props.data.cols}
            rows={this.props.data.rows}
            onChange={this.onChangeForm}
            onDelete={this.onDeleteRow}
            onSelect={this.onSelectRow}
            onNextStep={this.props.onNextStep}
            action={this.props.action}
            actionWidth={150}
          />
        )}
      </Stack>
    );
  }
}

export default FRM_Ese_Domande;
