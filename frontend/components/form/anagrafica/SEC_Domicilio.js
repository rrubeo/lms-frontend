import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import DTC_TextBox from "../../DTC_TextBox";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import COM_Geolocal from "./COM_Geolocal";
import jnStyles from "../../../styles/utils.module.css";

class SEC_Domicilio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paeseId: "cb_dom_paese",
      paeseValue: { label: "", id: 0 },
      regioneId: "cb_dom_regione",
      regioneValue: { label: "", id: 0 },
      provinciaId: "cb_dom_provincia",
      provinciaValue: { label: "", id: 0 },
      comuneId: "cb_dom_comune",
      comuneValue: { label: "", id: 0 },
      toponimoId: "cb_dom_toponimo",
      toponimoValue: { label: "", id: 0 },
      indirizzoId: "tx_dom_indirizzo",
      indirizzoValue: "",
      civicoId: "tx_dom_civico",
      civicoValue: "",
      capId: "tx_dom_cap",
      capValue: "",
      editMode: false,
    };

    this.onChangeForm = this.onChangeForm.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.dafaultValue = this.dafaultValue.bind(this);

    this.changeChildGeoLocal = React.createRef();

    this.changeChildPaeseId = React.createRef();
    this.changeChildRegioneId = React.createRef();
    this.changeChildProvinciaId = React.createRef();
    this.changeChildComuneId = React.createRef();

    this.changeChildToponimoId = React.createRef();
    this.changeChildIndirizzoId = React.createRef();
    this.changeChildCivicoId = React.createRef();
    this.changeChildCapId = React.createRef();
  }

  async dafaultValue() {
    // console.log(this.props.data.utenza);
    let reloadOldData = false;
    if (this.props.data.utenza) {
      reloadOldData = true;
    }

    const l_paeseValue = reloadOldData
      ? this.props.data.utenza.persFkGpaeIdPaeseDomicilio
      : 118;

    const l_regioneValue = reloadOldData
      ? this.props.data.utenza.idRegioneDomicilio
      : 0;

    const l_provinciaValue = reloadOldData
      ? this.props.data.utenza.idProvinciaDomicilio
      : 0;

    const l_comuneValue = reloadOldData
      ? this.props.data.utenza.persFkGcomIdComuneDomicilio
      : 0;

    await this.changeChildGeoLocal.current.setIndex(
      l_paeseValue,
      l_regioneValue,
      l_provinciaValue,
      l_comuneValue
    );

    const l_toponimoValue = reloadOldData
      ? this.props.data.utenza.persFkGtopToponimoDomicilio
      : 0;

    const l_indirizzoValue = reloadOldData
      ? this.props.data.utenza.persIndirizzoDomicilio
      : "";

    const l_civicoValue = reloadOldData
      ? this.props.data.utenza.persNumeroCivicoDomicilio
      : "";

    const l_capValue = reloadOldData
      ? this.props.data.utenza.persCapDomicilio
      : "";

    this.changeChildToponimoId.current.setText(l_toponimoValue);

    this.changeChildIndirizzoId.current.setText(l_indirizzoValue);
    this.changeChildCivicoId.current.setText(l_civicoValue);
    this.changeChildCapId.current.setText(l_capValue);

    this.onChangeForm(this.state.indirizzoId, l_indirizzoValue);
    this.onChangeForm(this.state.civicoId, l_civicoValue);
    this.onChangeForm(this.state.capId, l_capValue);
  }

  componentDidMount() {
    this.dafaultValue();
  }

  handleReset(event) {
    this.dafaultValue();
  }

  async onChangeForm(id, data) {
    switch (id) {
      case this.state.paeseId:
        this.setState({ paeseValue: data });
        break;
      case this.state.regioneId:
        this.setState({ regioneValue: data });
        break;
      case this.state.provinciaId:
        this.setState({ provinciaValue: data });
        break;
      case this.state.comuneId:
        this.setState({ comuneValue: data });
        break;
      case this.state.toponimoId:
        this.setState({ toponimoValue: data });
        break;
      case this.state.indirizzoId:
        this.setState({ indirizzoValue: data });
        break;
      case this.state.civicoId:
        this.setState({ civicoValue: data });
        break;
      case this.state.capId:
        this.setState({ capValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
    this.props.onChange(id, data);
  }

  render() {
    return (
      <FormLabel
        component="legend"
        classes={{
          root: jnStyles.jnDCT_TextSection,
        }}
        sx={{ width: "100%" }}
      >
        Domicilio
        <Grid
          container
          spacing={{ xs: "1%", md: "1%" }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ py: "1%", px: 0 }}
        >
          <Grid item xs={12} sm={12} md={2}>
            <DCT_ComboBox
              id={this.state.toponimoId}
              list={this.props.data.toponimo}
              label={this.props.data.toponimo_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildToponimoId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <DTC_TextBox
              id={this.state.indirizzoId}
              label={this.props.data.indirizzo_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildIndirizzoId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <DTC_TextBox
              id={this.state.civicoId}
              label={this.props.data.civico_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildCivicoId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <DTC_TextBox
              id={this.state.capId}
              label={this.props.data.cap_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildCapId}
            />
          </Grid>
          <COM_Geolocal
            id="GeoDomicilio"
            idPaese={this.state.paeseId}
            lbPaese={this.props.data.paese_label}
            idRegione={this.state.regioneId}
            lbRegione={this.props.data.regione_label}
            idProvincia={this.state.provinciaId}
            lbProvincia={this.props.data.provincia_label}
            idComune={this.state.comuneId}
            lbComune={this.props.data.comune_label}
            editMode={this.state.editMode}
            onChange={this.onChangeForm}
            ref={this.changeChildGeoLocal}
          />
        </Grid>
      </FormLabel>
    );
  }
}

export default SEC_Domicilio;
