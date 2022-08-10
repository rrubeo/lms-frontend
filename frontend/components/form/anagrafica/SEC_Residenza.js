import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import DTC_TextBox from "../../DTC_TextBox";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import jnStyles from "../../../styles/utils.module.css";

class SEC_Residenza extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paeseId: "cb_res_paese",
      paeseValue: { label: "", id: 0 },
      regioneId: "cb_res_regione",
      regioneValue: { label: "", id: 0 },
      provinciaId: "cb_res_provincia",
      provinciaValue: { label: "", id: 0 },
      comuneId: "cb_res_comune",
      comuneValue: { label: "", id: 0 },
      toponimoId: "cb_res_toponimo",
      toponimoValue: { label: "", id: 0 },
      indirizzoId: "tx_res_indirizzo",
      indirizzoValue: "",
      civicoId: "tx_res_civico",
      civicoValue: "",
      capId: "tx_res_cap",
      capValue: "",
    };

    this.onChangeForm = this.onChangeForm.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.dafaultValue = this.dafaultValue.bind(this);

    this.changeChildPaeseId = React.createRef();
    this.changeChildRegioneId = React.createRef();
    this.changeChildProvinciaId = React.createRef();
    this.changeChildComuneId = React.createRef();

    this.changeChildToponimoId = React.createRef();
    this.changeChildIndirizzoId = React.createRef();
    this.changeChildCivicoId = React.createRef();
    this.changeChildCapId = React.createRef();
  }

  dafaultValue() {
    // console.log(this.props.data.utenza);
    let reloadOldData = false;
    if (this.props.data.utenza) {
      reloadOldData = true;
    }

    const l_paeseValue = reloadOldData
      ? this.props.data.utenza.persFkGpaeIdPaeseResidenza
      : 0;

    const l_regioneValue = reloadOldData
      ? this.props.data.utenza.idRegioneResidenza
      : 0;

    const l_provinciaValue = reloadOldData
      ? this.props.data.utenza.idProvinciaResidenza
      : 0;

    const l_comuneValue = reloadOldData
      ? this.props.data.utenza.persFkGcomIdComuneResidenza
      : 0;

    const l_toponimoValue = reloadOldData
      ? this.props.data.utenza.persFkGtopToponimoResidenza
      : 0;

    const l_indirizzoValue = reloadOldData
      ? this.props.data.utenza.persIndirizzoResidenza
      : "";

    const l_civicoValue = reloadOldData
      ? this.props.data.utenza.persNumeroCivicoResidenza
      : "";

    const l_capValue = reloadOldData
      ? this.props.data.utenza.persCapResidenza
      : "";

    this.changeChildPaeseId.current.setIndex(l_paeseValue);
    this.changeChildRegioneId.current.setIndex(l_regioneValue);
    this.changeChildProvinciaId.current.setIndex(l_provinciaValue);
    this.changeChildComuneId.current.setIndex(l_comuneValue);
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
    // this.changeChildPaeseId.current.handleReset();
    // this.changeChildRegioneId.current.handleReset();
    // this.changeChildProvinciaId.current.handleReset();
    // this.changeChildComuneId.current.handleReset();

    // this.changeChildToponimoId.current.handleReset();
    // this.changeChildIndirizzoId.current.handleReset();
    // this.changeChildCivicoId.current.handleReset();
    // this.changeChildCapId.current.handleReset();

    // this.setState({
    //   paeseValue: { label: "", id: 0 },
    //   regioneValue: { label: "", id: 0 },
    //   provinciaValue: { label: "", id: 0 },
    //   comuneValue: { label: "", id: 0 },
    //   toponimoValue: { label: "", id: 0 },
    //   indirizzoValue: "",
    //   civicoValue: "",
    //   capValue: "",
    // });
  }

  onChangeForm(id, data) {
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
        Residenza
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
          <Grid item xs={12} sm={12} md={3}>
            <DCT_ComboBox
              id={this.state.paeseId}
              list={this.props.data.paese}
              label={this.props.data.paese_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildPaeseId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <DCT_ComboBox
              id={this.state.regioneId}
              list={this.props.data.regione}
              label={this.props.data.regione_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildRegioneId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <DCT_ComboBox
              id={this.state.provinciaId}
              list={this.props.data.provincia}
              label={this.props.data.provincia_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildProvinciaId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
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

export default SEC_Residenza;
