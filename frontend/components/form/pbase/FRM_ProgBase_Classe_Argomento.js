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

class FRM_ProgBase_Classe_Argomento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classeId: "tx_classe",
      classeValue: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildClasseId = React.createRef();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: this.props.id,
      classe: this.state.classeValue,
    };
    await this.props.onSubmit(event, data);
  }

  handleReset(event) {
    // console.log("RESET");
    this.changeChildClasseId.current.handleReset();
    this.setState({ classeValue: "" });
  }

  onChangeForm(id, data) {
    switch (id) {
      case this.state.classeId:
        this.setState({ classeValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    console.log("DELETE ROW");
    console.log(id);
    console.log(data);

    const rowData = {
      id: this.props.id,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    const linkBack = utils.getBackLink(
      "pb",
      pb_cfg.PBASE_STEP_1,
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
            id={`bread_${this.props.id}`}
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
          id={this.props.id}
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
              id={this.state.classeId}
              label={this.props.data.classe_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildClasseId}
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

export default FRM_ProgBase_Classe_Argomento;
