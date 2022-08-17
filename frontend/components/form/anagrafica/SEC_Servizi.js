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

import { validateForm, frm_SEC_Servizi } from "./validator";

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

class SEC_Servizi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idPersona: this.props.query ? this.props.query?.param[2] : 0,
      idIscrizione: this.props.query ? this.props.query?.param[1] : 0,
      sottoscrittoId: "tx_sottoscritto",
      sottoscrittoValue: "",
      sottoscrittoLabel: "TextBox",
      servizioId: "cb_servizio",
      servizioValue: { label: "", id: 0 },
      servizioList: [{ label: "Seleziona", id: 0 }],
      servizioLabel: "Combo",
      rows: [],      
    };

    this.loadData = this.loadData.bind(this);
    this.defaultValue = this.defaultValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);

    this.changeChildServizioId = React.createRef();
    this.changeChildSottoscrittoId = React.createRef();
  }

  async loadData(pid) {
    console.log("loadData", pid);
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
      console.log(data);
      this.setState({
        servizioLabel: data.servizio_label,
        servizioList: data.servizio,
        sottoscrittoLabel: data.sottoscritto_label,        
        rows: data.rows,
      });
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
      id: frm_SEC_Servizi,
      servizio: this.state.servizioValue,
      sottoscritto: this.state.sottoscrittoValue,
    };

    console.log(formData);

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
        // await reloadData();
        validationMessage(res.message, MSG_SUCCESS);
      }
    } else {
      validationMessage(vres.data.message, MSG_ERROR);
    }
  }

  handleReset(event) {
    this.defaultValue();
  }

  onChangeForm(id, data) {
    switch (id) {
      case this.state.sottoscrittoId:
        this.setState({ sottoscrittoValue: data });
        break;
      case this.state.servizioId:
        this.setState({ servizioValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {}

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
                  id={this.state.servizioId}
                  list={this.state.servizioList}
                  label={this.state.servizioLabel}
                  onChange={this.onChangeForm}
                  size={1}
                  ref={this.changeChildServizioId}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <DTC_DatePick
                  required
                  id={this.state.sottoscrittoId}
                  label={this.state.sottoscrittoLabel}
                  onChange={this.onChangeForm}
                  size={1}
                  ref={this.changeChildSottoscrittoId}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
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
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <DTC_DataGrid
                  id="gd_sottoscritti"
                  cols={this.props.data.cols_servizi}
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

export default SEC_Servizi;
