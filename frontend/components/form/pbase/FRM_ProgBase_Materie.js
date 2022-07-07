import * as React from "react";
import { withRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DCT_MultipleCheckList from "../../selector/DCT_MultipleCheckList";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_Stepper from "../../DCT_Stepper";
import DCT_Breadcrumbs from "../../DCT_Breadcrumbs";
import DCT_LinkButton from "../../DCT_LinkButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const pb_cfg = require("./config");

class FRM_ProgBase_Materie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      annoId: "cb_anno",
      annoValue: { label: "Seleziona", id: 0 },
      selectId: "lbox_materie",
      materieValue: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildAnnoId = React.createRef();
    this.changeChildSelectId = React.createRef();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: pb_cfg.FRM_PBASE_STEP_1,
      anno: this.state.annoValue,
      materie: this.state.materieValue,
    };
    await this.props.onSubmit(event, data);
  }

  handleReset(event) {
    // console.log("RESET");
    event.preventDefault();
    this.changeChildAnnoId.current.handleReset();
    this.changeChildSelectId.current.handleReset();
    this.setState({ annoValue: { label: "Seleziona", id: 0 } });
    this.setState({ materieValue: [] });
  }

  onChangeForm(id, data) {
    // console.log("CHANGE FORM");
    // console.log(id);
    // console.log(data);

    switch (id) {
      case this.state.annoId:
        this.setState({ annoValue: data });
        break;
      case this.state.selectId:
        this.setState({ materieValue: data });
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
      id: pb_cfg.FRM_PBASE_STEP_1,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    // console.log("QUERY MATERIE");
    // console.log(this.props.query);
    const linkBack = utils.getBackLink(
      "pb",
      pb_cfg.PBASE_STEP_0,
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
          <DCT_Breadcrumbs
            id={`bread_${pb_cfg.FRM_PBASE_STEP_1}`}
            list={this.props.data.bread}
            page={[pb_cfg.PBASE_STEP_1]}
            pageId={this.props.pbaseId}
            path={`${process.env.frontend}/pb`}
          />
        </Stack>
        <DCT_Stepper
          id="stepper"
          activeStep={this.props.activeStep}
          steps={this.props.data.stepper}
        />
        <Box
          id={pb_cfg.FRM_PBASE_STEP_1}
          component="form"
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
              id={this.state.annoId}
              list={this.props.data.annofreq}
              label={this.props.data.annofreq_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildAnnoId}
            />
            <DCT_MultipleCheckList
              id={this.state.selectId}
              list={this.props.data.materie}
              label={this.props.data.materie_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildSelectId}
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
          id="gd_materie"
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

export default withRouter(FRM_ProgBase_Materie);
