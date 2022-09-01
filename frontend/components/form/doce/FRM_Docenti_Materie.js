import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

import DTC_TextBox from "../../DTC_TextBox";
import DTC_TextInfo from "../../DTC_TextInfo";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DCT_CheckList from "../../selector/DCT_CheckList";
import DCT_LinkButton from "../../DCT_LinkButton";

import jnStyles from "../../../styles/utils.module.css";

const do_cfg = require("./config");

class FRM_Docenti_Materie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectMaterieId: "lbox_materie", selectMaterieValue: [] };

    this.onChangeForm = this.onChangeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.dafaultValue = this.dafaultValue.bind(this);

    this.changeChildSelectMaterieId = React.createRef();
  }

  dafaultValue() {
    this.changeChildSelectMaterieId.current.handleReset();
    this.setState({
      selectMaterieValue: [],
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: this.props.id,
      materie: this.state.selectMaterieValue,
    };
    // console.log(data);
    await this.props.onSubmit(event, data);
    this.dafaultValue();
  }

  handleReset(event) {
    this.dafaultValue();
  }

  onChangeForm(id, data) {
    switch (id) {
      case this.state.selectMaterieId:
        this.setState({ selectMaterieValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    const rowData = {
      id: this.props.id,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    const linkBack = `/doce/${do_cfg.DOCE_STEP_0}`;
    return (
      <>
        <DCT_LinkButton href={linkBack} text={this.props.data.back_label} />
        <Divider sx={{ pt: "1%" }} light />
        <Stack
          direction={{ xs: "column", sm: "column", md: "row", lg: "row" }}
          spacing={4}
          mt={0}
          mb={2}
          p={0}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Box
            component="form"
            id={this.props.id}
            onSubmit={this.handleSubmit}
            onReset={this.handleReset}
            sx={{ display: "inline", py: "2%", px: "2%" }}
          >
            <Stack
              direction="column"
              spacing={4}
              mt={0}
              mb={2}
              p={0}
              justifyContent="center"
              alignItems="center"
            >
              <DCT_CheckList
                id={this.state.selectMaterieId}
                label={this.props.data.materie_label}
                list={this.props.data.materie}
                ref={this.changeChildSelectMaterieId}
                onChange={this.onChangeForm}
                size={300}
                width={400}
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
            id="gd_ricerca"
            cols={this.props.data.cols}
            rows={this.props.data.rows}
            onChange={this.onChangeForm}
            onDelete={this.onDeleteRow}
            onNextStep={this.props.onNextStep}
            action={this.props.action}
            actionWidth={90}
          />
        </Stack>
      </>
    );
  }
}

export default FRM_Docenti_Materie;
