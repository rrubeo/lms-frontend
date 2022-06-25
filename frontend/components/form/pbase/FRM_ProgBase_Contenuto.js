import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DCT_Breadcrumbs from "../../DCT_Breadcrumbs";
import DTC_TextBox from "../../DTC_TextBox";
import DCT_Upload from "../../DCT_Upload";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_Stepper from "../../DCT_Stepper";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DCT_LinkButton from "../../DCT_LinkButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import Divider from "@mui/material/Divider";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const pb_cfg = require("./config");

class FRM_ProgBase_Contenuto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVideo: true,
      tipoId: "cb_tipo",
      tipoValue: { label: "", id: 0 },
      nomeId: "tx_nome",
      nomeValue: "",
      percorsoId: "tx_percorso",
      percorsoValue: "",
      durataId: "tx_durata",
      durataValue: "",
      uploadId: "tx_upload",
      selectedFile: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildTipoId = React.createRef();
    this.changeChildNomeId = React.createRef();
    this.changeChildPercorsoId = React.createRef();
    this.changeChildDurataId = React.createRef();
    this.changeChildUploadId = React.createRef();
  }

  async handleSubmit(event) {
    event.preventDefault();

    const data = {
      id: pb_cfg.FRM_PBASE_STEP_5,
      tipo: this.state.tipoValue,
      nome: this.state.nomeValue,
      percorso: this.state.percorsoValue,
      durata: this.state.durataValue,
      file: this.state.selectedFile,
      video: this.state.isVideo,
    };

    // console.log(data);
    await this.props.onSubmit(event, data);
  }

  handleReset(event) {
    // console.log("RESET");
    this.changeChildTipoId.current.handleReset();
    this.changeChildNomeId.current.handleReset();
    this.changeChildPercorsoId.current.handleReset();
    this.changeChildDurataId.current.handleReset();
    this.changeChildUploadId.current.handleReset();
    this.setState({ tipoValue: { label: "", id: 0 } });
    this.setState({ nomeValue: "" });
    this.setState({ percorsoValue: "" });
    this.setState({ durataValue: "" });
    this.setState({ selectedFile: null });
  }

  onChangeForm(id, data) {
    // console.log("CHANGE FORM");

    switch (id) {
      case this.state.tipoId:
        this.setState({ tipoValue: data });
        if (data.id == 1 || data.id == 0) {
          this.setState({ isVideo: true });
        } else {
          this.setState({ isVideo: false });
        }
        break;
      case this.state.nomeId:
        this.setState({ nomeValue: data });
        break;
      case this.state.percorsoId:
        this.setState({ percorsoValue: data });
        break;
      case this.state.durataId:
        this.setState({ durataValue: data });
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
      id: pb_cfg.FRM_PBASE_STEP_5,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    // console.log("CONTENUTO LEZIONE");
    // console.log(this.props.query);
    const linkBack = utils.getBackLink(
      "pb",
      pb_cfg.PBASE_STEP_4,
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
            id={`bread_${pb_cfg.FRM_PBASE_STEP_5}`}
            list={this.props.data.bread}
          />
        </Stack>
        <DCT_Stepper
          id="stepper"
          activeStep={this.props.activeStep}
          steps={this.props.data.stepper}
        />
        <Box
          component="form"
          id={pb_cfg.FRM_PBASE_STEP_5}
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
            <DCT_ComboBox
              id={this.state.tipoId}
              list={this.props.data.tipo}
              label={this.props.data.tipo_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildTipoId}
            />
            <DTC_TextBox
              required
              id={this.state.nomeId}
              label={this.props.data.nome_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildNomeId}
            />
            {this.state.isVideo ? (
              <DTC_TextBox
                required
                id={this.state.percorsoId}
                label={this.props.data.percorso_label}
                onChange={this.onChangeForm}
                size={1}
                ref={this.changeChildPercorsoId}
              />
            ) : (
              <></>
            )}
            <DTC_TextBox
              required
              id={this.state.durataId}
              label={this.props.data.durata_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildDurataId}
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
        {!this.state.isVideo ? (
          <DCT_Upload
            id={this.state.uploadId}
            onChange={this.onChangeForm}
            size={1}
            ref={this.changeChildUploadId}
          />
        ) : (
          <></>
        )}
        <DTC_DataGrid
          id="gd_contenuto"
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

export default FRM_ProgBase_Contenuto;
