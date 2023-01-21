import * as React from "react";
import { withRouter } from "next/router";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DCT_Loader from "../../DCT_Loader";
import DTC_TimePick from "../../DTC_TimePick";
import DTC_TextBox from "../../DTC_TextBox";
import jnStyles from "../../../styles/utils.module.css";

class FRM_Moni_Lezzap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titoloId: "tx_titolo",
      titoloLabel: this.props.lbDoc ? this.props.lbDoc : "Titolo",
      titoloValue: "",
      docId: "cb_doc",
      docLabel: this.props.lbDoc ? this.props.lbDoc : "Docenti",
      docList: this.props.data.cb_docenti
        ? this.props.data.cb_docenti
        : undefined,
      docValue: { label: "", id: 0 },
      studId: "cb_studenti",
      studLabel: this.props.lbStudenti ? this.props.lbStudenti : "Studenti",
      studList: this.props.data.cb_studenti
        ? this.props.data.cb_studenti
        : undefined,
      studValue: { label: "", id: 0 },
      timeLezId: "dp_lezione",
      timeLezValue: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildDocId = React.createRef();
    this.changeChildStudId = React.createRef();
    this.changeTimeLezId = React.createRef();
    this.changeTitoloId = React.createRef();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: this.props.id,
      docente: this.state.docValue,
      studente: this.state.studValue,
      titolo: this.state.titoloValue,
      orario: this.state.timeLezValue,
    };
    const valid = await this.props.onSubmit(event, data);
    // console.log(valid);
    if (valid) this.handleReset();
  }

  handleReset(event) {
    this.changeChildDocId.current.setIndex(0);
    this.changeChildStudId.current.setIndex(0);
    this.changeTimeLezId.current.handleReset();
    this.changeTitoloId.current.handleReset();
    this.setState({ timeLezValue: "", titoloValue: "" });
  }

  onChangeForm(id, data) {
    // console.log("onChangeForm");
    switch (id) {
      case this.state.docId:
        this.setState({ docValue: data });
        break;
      case this.state.studId:
        this.setState({ studValue: data });
        break;
      case this.state.timeLezId:
        this.setState({ timeLezValue: data });
        break;
      case this.state.titoloId:
        this.setState({ titoloValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  async onDeleteRow(id, data) {
    const rowData = {
      id: this.props.id,
      key: data,
    };
    await this.props.onDelete(rowData);
  }

  render() {
    // console.log(this.props.data);
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: 1,
          borderRadius: "26px",
          width: "100%",
          py: "2%",
          px: "2%",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={2}
          sx={{ border: 0, borderRadius: "26px", py: 1.5, px: 1.5 }}
        >
          {this.state.docList == undefined ? (
            <DCT_Loader />
          ) : (
            <DCT_ComboBox
              id={this.state.docId}
              list={this.state.docList}
              label={this.state.docLabel}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildDocId}
            />
          )}
          {this.state.studList == undefined ? (
            <DCT_Loader />
          ) : (
            <DCT_ComboBox
              id={this.state.studId}
              list={this.state.studList}
              label={this.state.studLabel}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildStudId}
            />
          )}
          <DTC_TextBox
            required
            id={this.state.titoloId}
            label={this.state.titoloLabel}
            onChange={this.onChangeForm}
            size={1}
            ref={this.changeTitoloId}
          />
          <DTC_TimePick
            required
            id={this.state.timeLezId}
            label={this.props.data.timeLez_label}
            onChange={this.onChangeForm}
            size={1}
            ref={this.changeTimeLezId}
          />
          <Button
            variant="contained"
            classes={{ root: jnStyles.jnBT }}
            onClick={this.handleSubmit}
          >
            Invia
          </Button>
          <Button
            variant="contained"
            classes={{ root: jnStyles.jnBT }}
            onClick={this.handleReset}
          >
            Reset
          </Button>
        </Stack>
        <DTC_DataGrid
          id="gd_monitora"
          cols={this.props.data.cols}
          rows={this.props.data.rows}
          onChange={this.onChangeForm}
          onDelete={this.onDeleteRow}
          onNextStep={this.props.onNextStep}
          action={this.props.action}
          actionWidth={0}
        />
      </Box>
    );
  }
}

export default withRouter(FRM_Moni_Lezzap);
