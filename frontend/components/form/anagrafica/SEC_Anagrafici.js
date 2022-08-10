import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import DTC_TextBox from "../../DTC_TextBox";
import DTC_DatePick from "../../DTC_DatePick";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import jnStyles from "../../../styles/utils.module.css";

class SEC_Anagrafici extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cfId: "tx_cf",
      cfValue: "",
      nomeId: "tx_nome",
      nomeValue: "",
      cognomeId: "tx_cognome",
      cognomeValue: "",
      nascitaId: "tx_nascita",
      nascitaValue: "",
      paeseId: "cb_nas_paese",
      paeseValue: { label: "", id: 0 },
      regioneId: "cb_nas_regione",
      regioneValue: { label: "", id: 0 },
      provinciaId: "cb_nas_provincia",
      provinciaValue: { label: "", id: 0 },
      comuneId: "cb_nas_comune",
      comuneValue: { label: "", id: 0 },
    };

    this.onChangeForm = this.onChangeForm.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.dafaultValue = this.dafaultValue.bind(this);

    this.changeChildCFId = React.createRef();
    this.changeChildNomeId = React.createRef();
    this.changeChildCognomeId = React.createRef();
    this.changeChildNascitaId = React.createRef();
    this.changeChildPaeseId = React.createRef();
    this.changeChildRegioneId = React.createRef();
    this.changeChildProvinciaId = React.createRef();
    this.changeChildComuneId = React.createRef();
  }

  dafaultValue() {
    // console.log(this.props.data.utenza);
    let reloadOldData = false;
    if (this.props.data.utenza) {
      reloadOldData = true;
    }

    const l_cfValue = reloadOldData
      ? this.props.data.utenza.persCodiceFiscale
      : "";
    const l_nomeValue = reloadOldData ? this.props.data.utenza.persNome : "";
    const l_cognomeValue = reloadOldData
      ? this.props.data.utenza.persCognome
      : "";
    const l_nascitaValue = reloadOldData
      ? this.props.data.utenza.persDataNascita
      : "1900-01-01";
    const l_paeseValue = reloadOldData
      ? this.props.data.utenza.persFkGpaeIdPaeseNascita
      : 0;
    const l_regioneValue = reloadOldData
      ? this.props.data.utenza.idRegioneNascita
      : 0;
    const l_provinciaValue = reloadOldData
      ? this.props.data.utenza.idProvinciaNascita
      : 0;
    const l_comuneValue = reloadOldData
      ? this.props.data.utenza.persFkGcomIdComuneNascita
      : 0;

    this.changeChildPaeseId.current.setIndex(l_paeseValue);
    this.changeChildRegioneId.current.setIndex(l_regioneValue);
    this.changeChildProvinciaId.current.setIndex(l_provinciaValue);
    this.changeChildComuneId.current.setIndex(l_comuneValue);

    this.changeChildCFId.current.setText(l_cfValue);
    this.changeChildNomeId.current.setText(l_nomeValue);
    this.changeChildCognomeId.current.setText(l_cognomeValue);
    this.changeChildNascitaId.current.setText(l_nascitaValue);

    this.onChangeForm(this.state.cfId, l_cfValue);
    this.onChangeForm(this.state.nomeId, l_nomeValue);
    this.onChangeForm(this.state.cognomeId, l_cognomeValue);
    this.onChangeForm(this.state.nascitaId, l_nascitaValue);
  }

  componentDidMount() {
    this.dafaultValue();
  }

  handleReset(event) {
    this.dafaultValue();
  }

  onChangeForm(id, data) {
    // console.log(data);
    switch (id) {
      case this.state.cfId:
        this.setState({ cfValue: data });
        break;
      case this.state.nomeId:
        this.setState({ nomeValue: data });
        break;
      case this.state.cognomeId:
        this.setState({ cognomeValue: data });
        break;
      case this.state.nascitaId:
        this.setState({ nascitaValue: data });
        break;
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
        Anagrafica
        <Grid
          container
          spacing={{ xs: "1%", md: "1%" }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ py: "1%", px: 0 }}
        >
          <Grid item xs={12} sm={12} md={3}>
            <DTC_TextBox
              required
              id={this.state.cfId}
              label={this.props.data.cf_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildCFId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <DTC_TextBox
              required
              id={this.state.nomeId}
              label={this.props.data.nome_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildNomeId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <DTC_TextBox
              required
              id={this.state.cognomeId}
              label={this.props.data.cognome_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildCognomeId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <DTC_DatePick
              required
              id={this.state.nascitaId}
              label={this.props.data.nascita_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildNascitaId}
            />
          </Grid>
          <Grid item xs={2} sm={8} md={3}>
            <DCT_ComboBox
              id={this.state.paeseId}
              list={this.props.data.paese}
              label={this.props.data.paese_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildPaeseId}
            />
          </Grid>
          <Grid item xs={2} sm={8} md={3}>
            <DCT_ComboBox
              id={this.state.regioneId}
              list={this.props.data.regione}
              label={this.props.data.regione_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildRegioneId}
            />
          </Grid>
          <Grid item xs={2} sm={8} md={3}>
            <DCT_ComboBox
              id={this.state.provinciaId}
              list={this.props.data.provincia}
              label={this.props.data.provincia_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildProvinciaId}
            />
          </Grid>
          <Grid item xs={2} sm={8} md={3}>
            <DCT_ComboBox
              id={this.state.comuneId}
              list={this.props.data.comune}
              label={this.props.data.comune_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildComuneId}
            />
          </Grid>
        </Grid>
      </FormLabel>
    );
  }
}

export default SEC_Anagrafici;
