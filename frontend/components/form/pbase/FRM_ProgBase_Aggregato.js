import * as React from "react";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_Stepper from "../../DCT_Stepper";
import DCT_CheckList from "../../selector/DCT_CheckList";
import DCT_Breadcrumbs from "../../DCT_Breadcrumbs";
import DCT_LinkButton from "../../DCT_LinkButton";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const pb_cfg = require("./config");

class FRM_ProgBase_Aggregato extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classeId: "cb_classe",
      classeValue: { label: "", id: 0 },
      listId: "lst_lezione",
      // lezioneValue: this.props.data.lezione,
      selectedValue: [],
      rows: this.props.data.rows,
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.onChangeForm = this.onChangeForm.bind(this);
    // this.onDeleteRow = this.onDeleteRow.bind(this);
    // this.handleReset = this.handleReset.bind(this);
    // this.handleBack = this.handleBack.bind(this);
    // this.handleAddAll = this.handleAddAll.bind(this);
    // this.handleSearch = this.handleSearch.bind(this);
    // this.loadComboClasseArg = this.loadComboClasseArg.bind(this);

    // this.changeChildClasseId = React.createRef();
    // this.changeChildListId = React.createRef();
  }
  async handleSubmit(event) {}

  async handleReset(event) {}

  render() {
    console.log("AGGREGATO");
    console.log(this.props.query);
    const linkBack = utils.getBackLink(
      "pb",
      pb_cfg.PBASE_STEP_0,
      this.props.query
    );

    return (
      <Stack direction="column" spacing={2}>
        <Stack
          direction="row"
          spacing={5}
          justifyContent="flex-start"
          alignItems="center"
        >
          <DCT_LinkButton href={linkBack} text="back" />
          <DCT_Breadcrumbs
            id={`bread_${pb_cfg.FRM_PBASE_STEP_1_1}`}
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
              ></Stack>
              <Stack
                direction={{ xs: "column", sm: "column", md: "column" }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              ></Stack>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    );
  }
}

export default FRM_ProgBase_Aggregato;
