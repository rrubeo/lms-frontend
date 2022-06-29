import * as React from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";

import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_Stepper from "../../DCT_Stepper";
import DCT_CheckList from "../../selector/DCT_CheckList";
import DCT_Breadcrumbs from "../../DCT_Breadcrumbs";
import DCT_LinkButton from "../../DCT_LinkButton";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const pi_cfg = require("./config");

class FRM_ProgIndi_Lezione extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classeId: "cb_classe",
      classeValue: { label: "", id: 0 },
      listId: "lst_lezione",
      lezioneValue: this.props.data.lezione,
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
    this.loadComboClasseArg = this.loadComboClasseArg.bind(this);

    this.changeChildClasseId = React.createRef();
    this.changeChildListId = React.createRef();
  }

  async componentDidMount() {
    await this.loadComboClasseArg();
  }

  async loadComboClasseArg() {
    const data = await utils.fetchJson("/api/clasarg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: pi_cfg.FRM_PINDI_STEP_1,
        combo: this.state.classeValue,
      }),
    });
    // console.log(data);
    this.setState({ lezioneValue: data });
    this.setState({ selectedValue: [] });
  }

  handleBack(event) {
    event.preventDefault();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: pi_cfg.FRM_PINDI_STEP_1,
      classe: this.state.classeValue,
      lezione: this.state.selectedValue,
    };

    if (this.state.selectedValue.length > 0) {
      await this.props.onSubmit(event, data);
    }
  }

  async handleReset(event) {
    this.changeChildClasseId.current.handleReset();
    this.changeChildListId.current.handleReset();

    this.setState({ classeValue: { label: "", id: 0 } }, () => {
      this.loadComboClasseArg();
    });
  }

  async handleSearch(event) {
    await this.loadComboClasseArg();

    const data = {
      id: pi_cfg.FRM_PINDI_STEP_1,
      classe: this.state.classeValue,
      lezione: this.state.lezioneValue,
    };
    await this.props.onSearch(event, data);
  }

  handleAddAll(event) {
    event.preventDefault();
    this.changeChildListId.current.handleAddAll();
  }

  onChangeForm(id, data) {
    // console.log("CHANGE FORM");
    // console.log(id);
    // console.log(data);
    switch (id) {
      case this.state.classeId:
        this.setState({ classeValue: data });
        break;
      case this.state.listId:
        this.setState({ selectedValue: data });
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
      id: pi_cfg.FRM_PBASE_STEP_1,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    // console.log(`<${pi_cfg.FRM_PINDI_STEP_1}='${this.props.id}'>`);
    // console.log(this.props.selection);

    // let comboClasseSelection = 0;
    // if (this.props.selection) {
    //   console.log("COMBO SELECTION");
    //   console.log(this.props.selection);
    //   console.log(this.state.classeValue);
    //   console.log(this.props.selection[2]);
    //   comboClasseSelection = this.props.selection[2];
    // }
    let comboClasseSelection = this.state.classeValue.id;

    return (
      <>
        <Stack direction="column" spacing={2}>
          <Stack
            direction="row"
            spacing={5}
            justifyContent="flex-start"
            alignItems="center"
          >
            <DCT_LinkButton href={`/pi/${pi_cfg.PINDI_STEP_0}`} text="back" />
            <DCT_Breadcrumbs
              id={`bread_${pi_cfg.FRM_PINDI_STEP_1}`}
              list={this.props.data.bread}
            />
          </Stack>
          <Stack direction="column" spacing={2} justifyContent="center">
            <DCT_Stepper
              id="stepper"
              activeStep={this.props.activeStep}
              steps={this.props.data.stepper}
            />
            <Box
              id={pi_cfg.FRM_PINDI_STEP_1}
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
                    id={this.state.classeId}
                    list={this.props.data.classe}
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
                </Stack>
              </Stack>
            </Box>
            <DTC_DataGrid
              id="gd_lezione"
              cols={this.props.data.cols}
              rows={this.props.data.rows}
              onChange={this.onChangeForm}
              onDelete={this.onDeleteRow}
              onNextStep={this.props.onNextStep}
              action={this.props.action}
            />
          </Stack>
        </Stack>
      </>
    );
  }
}

export default FRM_ProgIndi_Lezione;
