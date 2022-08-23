import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import DTC_TextBox from "../../DTC_TextBox";
import DTC_DatePick from "../../DTC_DatePick";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import jnStyles from "../../../styles/utils.module.css";

import { API_PAESE, API_REGIONE, API_PROVINCIA, API_COMUNE } from "./config";

const utils = require("../../../lib");

class COM_Geolocal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paeseId: this.props.idPaese ? this.props.idPaese : "cb_paese",
      paeseLabel: this.props.lbPaese ? this.props.lbPaese : "Paese",
      paeseList: [{ label: "Seleziona", id: 0 }],
      paeseValue: { label: "", id: 0 },
      regioneId: this.props.idRegione ? this.props.idRegione : "cb_regione",
      regioneLabel: this.props.lbRegione ? this.props.lbRegione : "Regione",
      regioneList: [{ label: "Seleziona", id: 0 }],
      regioneValue: { label: "", id: 0 },
      provinciaId: this.props.idProvincia
        ? this.props.idProvincia
        : "cb_provincia",
      provinciaLabel: this.props.lbProvincia
        ? this.props.lbProvincia
        : "Provincia",
      provinciaList: [{ label: "Seleziona", id: 0 }],
      provinciaValue: { label: "", id: 0 },
      comuneId: this.props.idComune ? this.props.idComune : "cb_comune",
      comuneLabel: this.props.lbComune ? this.props.lbComune : "Comune",
      comuneValue: { label: "", id: 0 },
      comuneList: [{ label: "Seleziona", id: 0 }],
      editMode: this.props.editMode ? this.props.editMode : false,
    };

    this.onChangeForm = this.onChangeForm.bind(this);
    this.loadComboClasse = this.loadComboClasse.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setIndex = this.setIndex.bind(this);

    this.changeChildPaeseId = React.createRef();
    this.changeChildRegioneId = React.createRef();
    this.changeChildProvinciaId = React.createRef();
    this.changeChildComuneId = React.createRef();
  }

  async componentDidMount() {
    // console.log("componentDidMount");
    await this.loadComboClasse(API_PAESE, { label: "", id: 1 });
  }

  async setIndex(valPaese, valRegione, valProvincia, valComune) {
    // console.log(
    //   `setIndex ${valPaese} ${valRegione} ${valProvincia} ${valComune}`
    // );

    // console.log("CARICA");
    await this.loadComboClasse(API_PAESE, { label: "", id: valPaese });
    await this.loadComboClasse(API_REGIONE, { label: "", id: valPaese });
    await this.loadComboClasse(API_PROVINCIA, { label: "", id: valRegione });
    await this.loadComboClasse(API_COMUNE, { label: "", id: valProvincia });
    // console.log("SET");
    this.changeChildPaeseId.current.setIndex(valPaese);
    this.changeChildRegioneId.current.setIndex(valRegione);
    this.changeChildProvinciaId.current.setIndex(valProvincia);
    this.changeChildComuneId.current.setIndex(valComune);
  }

  handleReset(event) {
    this.changeChildPaeseId.current.setIndex(0);
    this.changeChildRegioneId.current.setIndex(0);
    this.changeChildProvinciaId.current.setIndex(0);
    this.changeChildComuneId.current.setIndex(0);
  }

  async loadComboClasse(endpoint, value) {
    if (value.id == null) return;
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
      //   console.log(data);

      switch (endpoint) {
        case API_PAESE:
          this.setState({ paeseList: data });
          break;
        case API_REGIONE:
          this.setState({ regioneList: data });
          break;
        case API_PROVINCIA:
          this.setState({ provinciaList: data });
          break;
        case API_COMUNE:
          this.setState({ comuneList: data });
          break;
      }
    } catch (e) {
      if (e instanceof utils.FetchError) {
        console.error(e.data.message);
      }
    }
  }

  async onChangeForm(id, data) {
    // console.log("onChangeForm", id);
    // console.log("onChangeForm", data);
    switch (id) {
      case this.state.paeseId:
        this.setState({ paeseValue: data });
        this.changeChildRegioneId.current.handleReset();
        await this.loadComboClasse(API_REGIONE, data);
        break;
      case this.state.regioneId:
        this.setState({ regioneValue: data });
        this.changeChildProvinciaId.current.handleReset();
        await this.loadComboClasse(API_PROVINCIA, data);
        break;
      case this.state.provinciaId:
        this.setState({ provinciaValue: data });
        this.changeChildComuneId.current.handleReset();
        await this.loadComboClasse(API_COMUNE, data);
        break;
      case this.state.comuneId:
        this.setState({ comuneValue: data });
        break;
    }
    this.props.onChange(id, data);
  }

  render() {
    // console.log(this.props);
    return (
      <>
        <Grid item xs={2} sm={8} md={3}>
          <DCT_ComboBox
            id={this.state.paeseId}
            list={this.state.paeseList}
            label={this.state.paeseLabel}
            onChange={this.onChangeForm}
            size={1}
            ref={this.changeChildPaeseId}
          />
        </Grid>
        <Grid item xs={2} sm={8} md={3}>
          <DCT_ComboBox
            id={this.state.regioneId}
            list={this.state.regioneList}
            label={this.state.regioneLabel}
            onChange={this.onChangeForm}
            size={1}
            ref={this.changeChildRegioneId}
          />
        </Grid>
        <Grid item xs={2} sm={8} md={3}>
          <DCT_ComboBox
            id={this.state.provinciaId}
            list={this.state.provinciaList}
            label={this.state.provinciaLabel}
            onChange={this.onChangeForm}
            size={1}
            ref={this.changeChildProvinciaId}
          />
        </Grid>
        <Grid item xs={2} sm={8} md={3}>
          <DCT_ComboBox
            id={this.state.comuneId}
            list={this.state.comuneList}
            label={this.state.comuneLabel}
            onChange={this.onChangeForm}
            size={1}
            ref={this.changeChildComuneId}
          />
        </Grid>
      </>
    );
  }
}

export default COM_Geolocal;
