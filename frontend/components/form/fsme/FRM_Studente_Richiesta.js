import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormLabel from "@mui/material/FormLabel";
import FS_ProfileStudent from "../fs/FS_ProfileStudent";
import FS_Progress from "../fs/FS_Progress";
import SEC_FasceOrarie from "./SEC_FasceOrarie";
import DTC_TextBox from "../../DTC_TextBox";

import jnStyles from "../../../styles/utils.module.css";

const fsme_cfg = require("./config");

class FRM_Studente_Richiesta extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      argomentoId: "tx_argomento",
      argomentoValue: "",
      fasciaId: "ctl_calendar",
      fasciaValue: {},
    };

    this.onChangeForm = this.onChangeForm.bind(this);
    this.changeChildArgomentoId = React.createRef();
    this.changeChildFasceId = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.addDays = this.addDays.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: this.props.id,
      oggetto: this.state.argomentoValue,
      fascia: this.state.fasciaValue,
    };
    // console.log(data);
    await this.props.onSubmit(event, data);
    await this.handleReset();
  }

  async handleReset() {
    this.changeChildArgomentoId.current.handleReset("");
    this.setState({ argomentoValue: "" });
    this.changeChildFasceId.current.handleReset();
  }

  addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  async handleNext(event) {
    const oldDate = this.addDays(this.props.data.startDate, 7)
      .toISOString()
      .replace(/T.*$/, "");
    const item = {
      id: this.props.data.userType,
      startDate: oldDate,
      item: { id: this.props.data.userNameFasce },
    };
    this.props.onClick(event, item, fsme_cfg.FSME_STEP_4);
  }

  async handlePrev(event) {
    const oldDate = this.addDays(this.props.data.startDate, -7)
      .toISOString()
      .replace(/T.*$/, "");
    const item = {
      id: this.props.data.userType,
      startDate: oldDate,
      item: { id: this.props.data.userNameFasce },
    };
    this.props.onClick(event, item, fsme_cfg.FSME_STEP_4);
  }

  onChangeForm(id, data) {
    // console.log(id);
    // console.log(data);
    switch (id) {
      case this.state.argomentoId:
        this.setState({ argomentoValue: data });
        break;
      case this.state.fasciaId:
        this.setState({ fasciaValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  render() {
    // console.log(this.props.data);
    return (
      <Stack direction="column" spacing={4} mt={0} mb={0} p={0}>
        <Stack direction="row" spacing={0} mt={0} mb={0} p={0}>
          <FS_ProfileStudent
            profile={this.props.data.iscrizione[0]}
            urlPath={fsme_cfg.IMAGE_BASE_URL}
          />
          <FS_Progress
            type="home"
            title="Avanzamento corso"
            profile={this.props.data.iscrizione[0]}
          />
        </Stack>
        <FormLabel
          component="legend"
          classes={{
            root: jnStyles.jnDCT_TextSection,
          }}
          sx={{ width: "100%", overflow: "auto" }}
        >
          {`Richiesta appuntamento con: ${this.props.data.title} - GIORNO ${
            this.state.fasciaValue.dataOraInizioAppuntamento
              ? new Date(
                  this.state.fasciaValue.dataOraInizioAppuntamento
                ).toLocaleDateString()
              : "00-00"
          } - FASCIA ORARIA: ${
            this.state.fasciaValue.fasciaOraria
              ? this.state.fasciaValue.fasciaOraria
              : "00-00"
          }`}
          <Stack
            direction={{ xs: "column", sm: "column", md: "column" }}
            spacing={1}
            mt={2}
            mb={0}
            p={0}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              width: "100%",
            }}
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
            <SEC_FasceOrarie
              id={this.state.fasciaId}
              listTitle={`${this.props.data.title} - settimana del: ${new Date(
                this.props.data.startDate
              ).toLocaleDateString()}`}
              array={this.props.data.calendario}
              onClick={this.onChangeForm}
              ref={this.changeChildFasceId}
            />
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              classes={{ root: jnStyles.jnBT }}
            >
              <Button
                variant="contained"
                onClick={this.handleSubmit}
                classes={{ root: jnStyles.jnBT }}
              >
                Salva
              </Button>
              <Button
                variant="contained"
                onClick={this.handleReset}
                classes={{ root: jnStyles.jnBT }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                onClick={this.handlePrev}
                classes={{ root: jnStyles.jnBT }}
              >
                - Settimana
              </Button>
              <Button
                variant="contained"
                onClick={this.handleNext}
                classes={{ root: jnStyles.jnBT }}
              >
                + Settimana
              </Button>
            </ButtonGroup>
          </Stack>
        </FormLabel>
      </Stack>
    );
  }
}

export default FRM_Studente_Richiesta;
