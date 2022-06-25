import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DCT_Breadcrumbs from "../../DCT_Breadcrumbs";
import DTC_TextBox from "../../DTC_TextBox";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_Stepper from "../../DCT_Stepper";
import DCT_LinkButton from "../../DCT_LinkButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const pb_cfg = require("./config");

class FRM_ProgBase_Lezione extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lezioneId: "tx_lezione",
      lezioneValue: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildLezioneId = React.createRef();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: pb_cfg.FRM_PBASE_STEP_4,
      lezione: this.state.lezioneValue,
    };
    await this.props.onSubmit(event, data);
  }

  handleReset(event) {
    // console.log("RESET");
    this.changeChildLezioneId.current.handleReset();
    this.setState({ lezioneValue: "" });
  }

  onChangeForm(id, data) {
    console.log("CHANGE FORM");

    switch (id) {
      case this.state.lezioneId:
        this.setState({ lezioneValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    const rowData = {
      id: pb_cfg.FRM_PBASE_STEP_4,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    // console.log("LEZIONE");
    // console.log(this.props.query);
    const linkBack = utils.getBackLink(
      "pb",
      pb_cfg.PBASE_STEP_3,
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
          <DCT_LinkButton href={linkBack} text="back" />
          <DCT_Breadcrumbs
            id={`bread_${pb_cfg.FRM_PBASE_STEP_4}`}
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
          id={pb_cfg.FRM_PBASE_STEP_4}
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
              autoFocus
              id={this.state.lezioneId}
              label={this.props.data.lezione_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildLezioneId}
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
          id="gd_lezione"
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

export default FRM_ProgBase_Lezione;
