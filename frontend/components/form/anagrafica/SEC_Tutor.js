import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DTC_DataGrid from "../../grid/DTC_DataGrid";

import jnStyles from "../../../styles/utils.module.css";
import {
  validationMessage,
  MSG_SUCCESS,
  MSG_ERROR,
  MSG_INFO,
} from "../../../lib";

import { validateForm, frm_SEC_Tutor } from "./validator";

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

class SEC_Tutor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idPersona: this.props.query ? this.props.query?.param[2] : 0,
      idIscrizione: this.props.query ? this.props.query?.param[1] : 0,
      tutorId: "cb_tutor",
      tutorValue: { label: "", id: 0 },
      tutorList: [{ label: "Seleziona", id: 0 }],
      tutorLabel: "Combo",
      rows: [],
    };

    this.loadData = this.loadData.bind(this);
    this.defaultValue = this.defaultValue.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);

    this.changeChildTutorId = React.createRef();
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
      this.setState({
        tutorLabel: data.tutor_label,
        tutorList: data.tutor,
        rows: data.rows,
      });
      this.changeChildTutorId.current.setIndex(0);
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
      id: frm_SEC_Tutor,
      tutor: this.state.tutorValue,
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

  onChangeForm(id, data) {
    switch (id) {
      case this.state.tutorId:
        this.setState({ tutorValue: data });
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
              <Grid item xs={12} sm={12} md={6}>
                <DCT_ComboBox
                  id={this.state.tutorId}
                  list={this.state.tutorList}
                  label={this.state.tutorLabel}
                  onChange={this.onChangeForm}
                  size={1}
                  ref={this.changeChildTutorId}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} align="center">
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
                  id="gd_tutor"
                  cols={this.props.data.cols_tutor}
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

export default SEC_Tutor;
