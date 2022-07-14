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

class FRM_Ese_Esercitazione extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: 0,
      testoGruppoId: "tx_gruppo",
      testoGruppoValue: "",
      nomeGruppoId: "tx_nome_gruppo",
      nomeGruppoValue: "",
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

    this.changeChildTestoGruppoId = React.createRef();
    this.changeChildNomeGruppoId = React.createRef();
    this.changeChildUploadId = React.createRef();
  }

  async handleUpdate(event) {
    event.preventDefault();
    const data = {
      upid: this.state.selectedId,
      id: ese_cfg.FRM_ESE_STEP_2,
      testoGruppo: this.state.testoGruppoValue,
      nomeGruppo: this.state.nomeGruppoValue,
      file: this.state.selectedFile,
    };
    await this.props.onSubmit(event, data);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ uploadLoading: true });
    const data = {
      id: ese_cfg.FRM_ESE_STEP_2,
      testoGruppo: this.state.testoGruppoValue,
      nomeGruppo: this.state.nomeGruppoValue,
      file: this.state.selectedFile,
    };
    await this.props.onSubmit(event, data);
    this.setState({ uploadLoading: false });
  }

  handleReset(event) {
    this.changeChildTestoGruppoId.current.handleReset();
    this.changeChildNomeGruppoId.current.handleReset();
    this.changeChildUploadId.current.handleReset();
    this.setState({
      selectedId: 0,
      testoGruppoValue: "",
      nomeGruppoValue: "",
      selectedFile: null,
    });
  }

  onChangeForm(id, data) {
    switch (id) {
      case this.state.testoGruppoId:
        this.setState({ testoGruppoValue: data });
        break;
      case this.state.nomeGruppoId:
        this.setState({ nomeGruppoValue: data });
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
      id: ese_cfg.FRM_ESE_STEP_2,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  onSelectRow(id, data) {
    console.log(data);
    this.changeChildTestoGruppoId.current.setText(data.row.col2);
    this.changeChildNomeGruppoId.current.setText(data.row.col1);

    this.setState({
      selectedId: id,
      nomeGruppoValue: data.row.col1,
      testoGruppoValue: data.row.col2,
    });
  }

  render() {
    const linkBack = utils.getBackLink(
      "ese",
      ese_cfg.ESE_STEP_3,
      this.props.query
    );
    // console.log(linkBack);
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
            id={`bread_${ese_cfg.FRM_ESE_STEP_2}`}
            list={this.props.data.bread}
            page={[ese_cfg.ESE_STEP_2]}
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
          id={ese_cfg.FRM_ESE_STEP_2}
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
                required
                id={this.state.nomeGruppoId}
                label={this.props.data.nome_gruppo_label}
                onChange={this.onChangeForm}
                size={1}
                ref={this.changeChildNomeGruppoId}
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
              id={this.state.testoGruppoId}
              label={this.props.data.testo_gruppo_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildTestoGruppoId}
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
            id="gd_gruppi"
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

export default FRM_Ese_Esercitazione;
