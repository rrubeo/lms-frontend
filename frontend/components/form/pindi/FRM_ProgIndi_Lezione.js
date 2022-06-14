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

const pi_cfg = require("./config");

class FRM_ProgIndi_Lezione extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classeId: "cb_classe",
      classeValue: { label: "", id: 0 },
      listId: "lst_lezione",
      lezioneValue: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleAddAll = this.handleAddAll.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.changeChildClasseId = React.createRef();
    this.changeChildListId = React.createRef();
  }

  handleBack(event) {
    event.preventDefault();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: pi_cfg.FRM_PINDI_STEP_1,
      classe: this.state.classeValue,
      lezione: this.state.lezioneValue,
    };
    await this.props.onSubmit(event, data);
  }

  handleReset(event) {
    // console.log("RESET");
    this.changeChildClasseId.current.handleReset();
    this.changeChildListId.current.handleReset();
    this.setState({ classeValue: { label: "", id: 0 } });
    this.setState({ lezioneValue: [] });
  }

  handleSearch(event) {
    // console.log("SEARCH");
    event.preventDefault();
    const data = {
      id: pi_cfg.FRM_PINDI_STEP_1,
      classe: this.state.classeValue,
      lezione: this.state.lezioneValue,
    };
    this.props.onSearch(event, data);
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
        this.setState({ lezioneValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  async onDeleteRow(id, data) {
    console.log("DELETE ROW");
    console.log(id);
    console.log(data);

    const rowData = {
      id: pi_cfg.FRM_PBASE_STEP_1,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    // console.log(`<${pi_cfg.FRM_PINDI_STEP_1}='${this.props.id}'>`);
    // console.log(this.props.selection);

    let comboClasseSelection = 0;
    if (this.props.selection) {
      comboClasseSelection = this.props.selection[2];
    }

    return (
      <Stack direction="column" spacing={4} mt={0} mb={2} p={0}>
        <Box
          id={pi_cfg.FRM_PINDI_STEP_1}
          component="form"
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DCT_Breadcrumbs
                id={`bread_${pi_cfg.FRM_PINDI_STEP_1}`}
                list={this.props.data.bread}
              />
            </Grid>
            <Grid item xs={12}>
              <DCT_LinkButton href={`/pi/${pi_cfg.PINDI_STEP_0}`} text="back" />
              <DCT_Stepper
                id="stepper"
                activeStep={this.props.activeStep}
                steps={this.props.data.stepper}
              />
            </Grid>
            <Grid item xs={4} textAlign="center">
              <DCT_ComboBox
                id={this.state.classeId}
                list={this.props.data.classe}
                label={this.props.data.classe_label}
                onChange={this.onChangeForm}
                size={200}
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
              <DCT_CheckList
                id={this.state.listId}
                list={this.props.data.lezione}
                ref={this.changeChildListId}
                onChange={this.onChangeForm}
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
            </Grid>
            <Grid item xs={8}>
              <DTC_DataGrid
                id="gd_lezione"
                cols={this.props.data.cols}
                rows={this.props.data.rows}
                onChange={this.onChangeForm}
                onDelete={this.onDeleteRow}
                onNextStep={this.props.onNextStep}
                action={this.props.action}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    );
  }
}

export default FRM_ProgIndi_Lezione;
