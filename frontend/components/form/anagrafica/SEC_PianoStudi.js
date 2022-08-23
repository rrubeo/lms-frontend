import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DTC_DatePick from "../../DTC_DatePick";
import DCT_CheckList from "../../selector/DCT_CheckList";

import jnStyles from "../../../styles/utils.module.css";
import {
  defaultLogin,
  sessionOptions,
  getAuthSession,
  validationMessage,
  MSG_SUCCESS,
  MSG_ERROR,
  MSG_INFO,
  forceNavigateUtil,
} from "../../../lib";

import { validateForm, frm_SEC_PianoStudi } from "./validator";

import { API_CLASSE, API_ARGOMENTO, API_LEZIONE } from "./config";

const utils = require("../../../lib");
const gd_cfg = require("../../grid/config");

const GSTU_ACTION = [
  {
    id: "1",
    title: "Elimina",
    icon: "icon-delete2",
    callBack: gd_cfg.GRID_DELETE_ACTION,
  },
];

class SEC_PianoStudi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idPersona: this.props.query ? this.props.query?.param[2] : 0,
      idIscrizione: this.props.query ? this.props.query?.param[1] : 0,
      prgbaseId: "cb_prgbase",
      prgbaseValue: { label: "", id: 0 },
      prgbaseList: [{ label: "Seleziona", id: 0 }],
      prgbaseLabel: "Programma Base",
      classeId: "cb_classe",
      classeValue: { label: "", id: 0 },
      classeList: [{ label: "Seleziona", id: 0 }],
      classeLabel: "Classe Argomento",
      argomentoId: "cb_argomento",
      argomentoValue: { label: "", id: 0 },
      argomentoList: [{ label: "Seleziona", id: 0 }],
      argomentoLabel: "Argomento",
      lezioniId: "lbox_lezioni",
      lezioniValue: { label: "", id: 0 },
      lezioniList: [],
      lezioniLabel: "Lezioni",
      rows: [],
    };

    this.loadData = this.loadData.bind(this);
    this.loadComboClasse = this.loadComboClasse.bind(this);
    this.defaultValue = this.defaultValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);

    this.changeChildPrgbaseId = React.createRef();
    this.changeChildClasseId = React.createRef();
    this.changeChildArgomentoId = React.createRef();
    this.changeChildLezioniId = React.createRef();
  }

  async loadData(pid) {
    // console.log("loadData", pid);
    try {
      const data = await utils.fetchJson("/api/flydata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: this.props.id,
          api: this.props.api,
          pid: pid,
        }),
      });
      // console.log(data);
      this.changeChildPrgbaseId.current.setIndex(0);
      this.changeChildClasseId.current.setIndex(0);
      this.changeChildArgomentoId.current.setIndex(0);

      this.setState({
        prgbaseLabel: data.pbase_label,
        prgbaseList: data.pbase,
        classeLabel: data.classe_label,
        argomentoLabel: data.argomento_label,
        lezioniLabel: data.lezione_label,
        rows: data.rows,
      });
    } catch (e) {
      if (e instanceof utils.FetchError) {
        console.error(e.data.message);
      }
    }
  }

  async loadComboClasse(endpoint, value) {
    // console.log("loadComboClasse", value);
    try {
      const data = await utils.fetchJson("/api/loadcomboasync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: this.props.id,
          combo: value,
          api: endpoint,
        }),
      });
      // console.log(data);

      switch (endpoint) {
        case API_CLASSE:
          this.changeChildClasseId.current.handleReset();
          this.changeChildArgomentoId.current.handleReset();
          this.changeChildLezioniId.current.handleReset();
          this.setState({ classeList: data, lezioniList: [] });
          break;
        case API_ARGOMENTO:
          this.changeChildArgomentoId.current.handleReset();
          this.changeChildLezioniId.current.handleReset();
          this.setState({ argomentoList: data, lezioniList: [] });
          break;
        case API_LEZIONE:
          this.changeChildLezioniId.current.handleReset();
          this.setState({ lezioniList: data });
          break;
      }
    } catch (e) {
      if (e instanceof utils.FetchError) {
        console.error(e.data.message);
      }
    }
  }

  async defaultValue() {
    await this.loadData(this.state.idIscrizione);
  }

  componentDidMount() {
    this.defaultValue();
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = {
      id: frm_SEC_PianoStudi,
      prgbase: this.state.prgbaseValue,
      classe: this.state.classeValue,
      argomento: this.state.argomentoValue,
      lezioni: this.state.lezioniValue,
    };

    // console.log(formData);

    let param = "";
    for (let i = 1; i < this.props.query.param.length; i++) {
      param = param + "/" + this.props.query.param[i];
    }

    const apiUrl = this.props.api + param;

    const vres = await validateForm(formData);

    if (vres.valid) {
      const res = await utils.postData(apiUrl, formData);
      if (res.status != 200) {
        validationMessage(res.message, MSG_ERROR);
      } else {
        await this.defaultValue();
        validationMessage(res.message, MSG_SUCCESS);
      }
    } else {
      validationMessage(vres.data.message, MSG_ERROR);
    }
  }

  handleReset(event) {
    this.defaultValue();
  }

  async onChangeForm(id, data) {
    switch (id) {
      case this.state.prgbaseId:
        this.setState({ prgbaseValue: data });
        await this.loadComboClasse(API_CLASSE, data);
        break;
      case this.state.classeId:
        this.setState({ classeValue: data });
        await this.loadComboClasse(API_ARGOMENTO, data);
        break;
      case this.state.argomentoId:
        this.setState({ argomentoValue: data });
        if (data.id != 0) {
          await this.loadComboClasse(API_LEZIONE, data);
        }
        break;
      case this.state.lezioniId:
        this.setState({ lezioniValue: data });
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
    // console.log(rowData);
    const res = await utils.deleteData(this.props.api, rowData);
    if (res.status != 200) {
      validationMessage(res.message, MSG_ERROR);
    } else {
      await this.defaultValue();
      validationMessage(res.message, MSG_INFO);
    }
  }

  render() {
    // console.log(this.props.query);
    // console.log("Persona:", this.state.idPersona);
    // console.log("Iscrizione:", this.state.idIscrizione);
    // console.log(this.props.data);
    return (
      <Box
        component="form"
        id={this.props.id}
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
        sx={{ display: "inline" }}
      >
        <Stack
          direction="column"
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          <FormLabel
            component="legend"
            classes={{
              root: jnStyles.jnDCT_TextSection,
            }}
            sx={{ width: "100%" }}
          >
            <Grid
              container
              spacing={{ xs: "1%", md: "1%" }}
              columns={{ xs: 12, sm: 12, md: 12 }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ py: "1%", px: 0 }}
            >
              <Grid item xs={12} sm={12} md={4}>
                <DCT_ComboBox
                  id={this.state.prgbaseId}
                  list={this.state.prgbaseList}
                  label={this.state.prgbaseLabel}
                  onChange={this.onChangeForm}
                  size={1}
                  ref={this.changeChildPrgbaseId}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <DCT_ComboBox
                  id={this.state.classeId}
                  list={this.state.classeList}
                  label={this.state.classeLabel}
                  onChange={this.onChangeForm}
                  size={1}
                  ref={this.changeChildClasseId}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <DCT_ComboBox
                  id={this.state.argomentoId}
                  list={this.state.argomentoList}
                  label={this.state.argomentoLabel}
                  onChange={this.onChangeForm}
                  size={1}
                  ref={this.changeChildArgomentoId}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} align="center">
                <DCT_CheckList
                  id={this.state.lezioniId}
                  label={this.state.lezioniLabel}
                  list={this.state.lezioniList}
                  ref={this.changeChildLezioniId}
                  onChange={this.onChangeForm}
                  size={1}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} align="center">
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
                    Assegna Lezioni
                  </Button>
                  <Button
                    type="reset"
                    variant="contained"
                    classes={{ root: jnStyles.jnBT }}
                  >
                    Reset
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <DTC_DataGrid
                  id="gd_piano"
                  cols={this.props.data.cols_piano}
                  rows={this.state.rows}
                  onChange={this.onChangeForm}
                  onDelete={this.onDeleteRow}
                  action={GSTU_ACTION}
                  actionWidth={90}
                />
              </Grid>
            </Grid>
          </FormLabel>
        </Stack>
      </Box>
    );
  }
}

export default SEC_PianoStudi;
