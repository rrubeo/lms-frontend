import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DTC_TextBox from "../../DTC_TextBox";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_Stepper from "../../DCT_Stepper";
import DCT_Breadcrumbs from "../../DCT_Breadcrumbs";
import DCT_LinkButton from "../../DCT_LinkButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const pb_cfg = require("./config");

class FRM_ProgBase_Argomento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      argomentoId: "tx_argomento",
      argomentoValue: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildArgomentoId = React.createRef();
  }

  componentDidMount() {
    // console.log("FRM_ProgBase_Argomento componentDidMount");
  }

  componentWillUnmount() {
    // console.log("FRM_ProgBase_Argomento componentWillUnmount");
  }

  componentDidUpdate() {
    // console.log("FRM_ProgBase_Argomento componentDidUpdate");
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: pb_cfg.FRM_PBASE_STEP_3,
      argomento: this.state.argomentoValue,
    };
    await this.props.onSubmit(event, data);
  }

  onChangeForm(id, data) {
    // console.log("CHANGE FORM");

    switch (id) {
      case this.state.argomentoId:
        this.setState({ argomentoValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    // console.log("DELETE ROW");
    // console.log(id);
    // console.log(data);

    const rowData = {
      id: pb_cfg.FRM_PBASE_STEP_3,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  handleReset(event) {
    this.changeChildArgomentoId.current.handleReset();
    this.setState({ argomentoValue: "" });
  }

  render() {
    const linkBack = utils.getBackLink(
      "pb",
      pb_cfg.PBASE_STEP_2,
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
            id={`bread_${pb_cfg.FRM_PBASE_STEP_3}`}
            list={this.props.data.bread}
            page={[pb_cfg.PBASE_STEP_1, pb_cfg.PBASE_STEP_2]}
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
          component="form"
          id={pb_cfg.FRM_PBASE_STEP_3}
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
              id={this.state.argomentoId}
              label={this.props.data.argomento_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildArgomentoId}
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
          id={`GD_${this.props.id}`}
          cols={this.props.data.cols}
          rows={this.props.data.rows}
          onChange={this.onChangeForm}
          onDelete={this.onDeleteRow}
          onNextStep={this.props.onNextStep}
          action={this.props.action}
          onFireAction={this.props.onFireAction}
          actionWidth={180}
        />
      </Stack>
    );
  }
}

export default FRM_ProgBase_Argomento;
