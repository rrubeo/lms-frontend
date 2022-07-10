import * as React from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_Stepper from "../../DCT_Stepper";
import DCT_CheckList from "../../selector/DCT_CheckList";
import DCT_Breadcrumbs from "../../DCT_Breadcrumbs";
import DCT_LinkButton from "../../DCT_LinkButton";
import DCT_Loader from "../../DCT_Loader";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const pb_cfg = require("./config");

class FRM_ProgBase_Aggregato extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classeId: "cb_classe",
      classeValue: { label: "", id: 0 },
      classeList: [{ label: " Seleziona", id: 0 }],
      annoId: "cb_anno",
      annoValue: { label: "", id: 0 },
      listId: "lst_lezione",
      lezioneValue: [],
      lezioneLoading: false,
      selectedValue: [],
      rows: this.props.data.rows,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleAddAll = this.handleAddAll.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.loadListLezioni = this.loadListLezioni.bind(this);
    this.loadComboClasse = this.loadComboClasse.bind(this);

    this.changeChildClasseId = React.createRef();
    this.changeChildAnnoId = React.createRef();
    this.changeChildListId = React.createRef();
  }

  async componentDidMount() {
    // await this.loadComboClasse(this.state.annoValue);
  }

  async loadListLezioni(value) {
    const data = await utils.fetchJson("/api/loadcomboasync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: pb_cfg.FRM_PBASE_STEP_1_1,
        combo: value,
        api: pb_cfg.PBASE_STEP_1_1_API_COMBO_CLASSE,
        isCheckList: true,
      }),
    });
    // console.log(data);
    this.setState({ lezioneValue: data });
    this.setState({ selectedValue: [] });
  }

  async loadComboClasse(value) {
    const data = await utils.fetchJson("/api/loadcomboasync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: pb_cfg.FRM_PBASE_STEP_1_1,
        combo: value,
        api: `${process.env.server}/pbase/cbanno`,
      }),
    });
    console.log(data);
    this.setState({ classeList: data });
    this.setState({ selectedValue: [] });
    this.changeChildClasseId.current.handleReset();
  }

  handleBack(event) {
    event.preventDefault();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: pb_cfg.FRM_PBASE_STEP_1_1,
      anno: this.state.annoValue,
      classe: this.state.classeValue,
      lezione: this.state.selectedValue,
    };

    if (this.state.selectedValue.length > 0) {
      await this.props.onSubmit(event, data);
    }
  }

  async handleReset(event) {
    this.changeChildAnnoId.current.handleReset();
    this.changeChildClasseId.current.handleReset();
    this.changeChildListId.current.handleReset();

    this.setState({ annoValue: { label: "", id: 0 } });
    this.setState({ classeValue: { label: " Seleziona", id: 0 } });
    this.setState({ classeList: [{ label: " Seleziona", id: 0 }] });
    this.setState({ lezioneValue: [] });
    this.setState({ selectedValue: [] });
  }

  async handleSearch(event) {
    this.setState({ lezioneLoading: true });
    await this.loadListLezioni(this.state.classeValue);

    const data = {
      id: pb_cfg.FRM_PBASE_STEP_1_1,
      anno: this.state.annoValue,
      classe: this.state.classeValue,
      lezione: this.state.lezioneValue,
    };
    await this.props.onSearch(event, data);
    this.setState({ lezioneLoading: false });
  }

  handleAddAll(event) {
    event.preventDefault();
    this.changeChildListId.current.handleAddAll();
  }

  async onChangeForm(id, data) {
    switch (id) {
      case this.state.classeId:
        this.setState({ classeValue: data });
        break;
      case this.state.listId:
        this.setState({ selectedValue: data });
        break;
      case this.state.annoId:
        this.setState({ annoValue: data });
        await this.loadComboClasse(data);
        this.setState({ lezioneValue: [] });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  async onDeleteRow(id, data) {
    // console.log("DELETE ROW");
    // console.log(id);
    // console.log(data);

    const rowData = {
      id: pb_cfg.FRM_PBASE_STEP_1_1,
      key: data,
      pbaseId: this.props.pbaseId,
    };
    this.props.onDelete(rowData);
  }

  render() {
    // console.log("AGGREGATO PBASE:", this.props.pbaseId);
    // console.log(this.props.query);
    const linkBack = utils.getBackLink(
      "pb",
      pb_cfg.PBASE_STEP_0,
      this.props.query
    );
    let comboAnnoSelection = this.state.annoValue.id;
    let comboClasseSelection = this.state.classeValue.id;

    return (
      <Stack direction="column" spacing={2}>
        <Stack
          direction="row"
          spacing={5}
          justifyContent="flex-start"
          alignItems="center"
        >
          <DCT_LinkButton href={linkBack} text={this.props.data.back_label} />
          <DCT_Breadcrumbs
            id={`bread_${pb_cfg.FRM_PBASE_STEP_1_1}`}
            list={this.props.data.bread}
            pageId={this.props.pbaseId}
            path={`${process.env.frontend}/pb`}
          />
        </Stack>
        <Stack direction="column" spacing={2} justifyContent="center">
          <DCT_Stepper
            id="stepper"
            activeStep={this.props.activeStep}
            steps={this.props.data.stepper}
          />
          <Box
            id={pb_cfg.FRM_PBASE_STEP_1_1}
            component="form"
            onSubmit={this.handleSubmit}
            onReset={this.handleReset}
            sx={{ display: "inline" }}
          >
            <Stack direction="column" spacing={2}>
              <Stack
                direction={{ xs: "column", sm: "column", md: "row" }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <DCT_ComboBox
                  id={this.state.annoId}
                  list={this.props.data.anno}
                  label={this.props.data.anno_label}
                  onChange={this.onChangeForm}
                  size={250}
                  ref={this.changeChildAnnoId}
                  selection={comboAnnoSelection}
                />
                <DCT_ComboBox
                  id={this.state.classeId}
                  list={this.state.classeList}
                  label={this.props.data.classe_label}
                  onChange={this.onChangeForm}
                  size={250}
                  ref={this.changeChildClasseId}
                  selection={comboClasseSelection}
                />
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  classes={{ root: jnStyles.jnBT }}
                >
                  <Button
                    type="button"
                    variant="contained"
                    classes={{ root: jnStyles.jnBT }}
                    onClick={(event) => this.handleSearch(event)}
                  >
                    Cerca
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
              <Stack
                direction={{ xs: "column", sm: "column", md: "column" }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                {this.state.lezioneLoading ? (
                  <DCT_Loader />
                ) : (
                  <>
                    <DCT_CheckList
                      id={this.state.listId}
                      label={this.props.data.lezione_label}
                      list={this.state.lezioneValue}
                      ref={this.changeChildListId}
                      onChange={this.onChangeForm}
                      size={270}
                    />
                    <ButtonGroup
                      variant="contained"
                      aria-label="outlined primary button group"
                      classes={{ root: jnStyles.jnBT }}
                    >
                      <Button
                        type="button"
                        variant="contained"
                        classes={{ root: jnStyles.jnBT }}
                        onClick={(event) => this.handleAddAll(event)}
                      >
                        Aggiungi tutto
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        classes={{ root: jnStyles.jnBT }}
                      >
                        Salva
                      </Button>
                    </ButtonGroup>
                  </>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
        <DTC_DataGrid
          id="gd_aggregato"
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

export default FRM_ProgBase_Aggregato;
