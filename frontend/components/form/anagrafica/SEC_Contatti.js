import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import DTC_TextBox from "../../DTC_TextBox";
import jnStyles from "../../../styles/utils.module.css";

class SEC_Contatti extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "tx_email",
      emailValue: "",
      cellId: "tx_cell",
      cellValue: "",
      fissoId: "tx_fisso",
      fissoValue: "",
    };

    this.onChangeForm = this.onChangeForm.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.dafaultValue = this.dafaultValue.bind(this);

    this.changeChildEmailId = React.createRef();
    this.changeChildCelllId = React.createRef();
    this.changeChildFissolId = React.createRef();
  }

  dafaultValue() {
    // console.log(this.props.data.utenza);
    let reloadOldData = false;
    if (this.props.data.utenza) {
      reloadOldData = true;
    }

    const l_emailValue = reloadOldData ? this.props.data.utenza.persEmail : "";
    const l_cellValue = reloadOldData
      ? this.props.data.utenza.persCellulare
      : "";
    const l_fissoValue = reloadOldData
      ? this.props.data.utenza.persTelefono
      : "";

    this.changeChildEmailId.current.setText(l_emailValue);
    this.changeChildCelllId.current.setText(l_cellValue);
    this.changeChildFissolId.current.setText(l_fissoValue);

    this.onChangeForm(this.state.emailId, l_emailValue);
    this.onChangeForm(this.state.cellId, l_cellValue);
    this.onChangeForm(this.state.fissoId, l_fissoValue);
  }

  componentDidMount() {
    this.dafaultValue();
  }

  handleReset(event) {
    this.dafaultValue();
  }

  onChangeForm(id, data) {
    switch (id) {
      case this.state.emailId:
        this.setState({ emailValue: data });
        break;
      case this.state.cellId:
        this.setState({ cellValue: data });
        break;
      case this.state.fissoId:
        this.setState({ fissoValue: data });
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
        Contatti
        <Grid
          container
          spacing={{ xs: "1%", md: "1%" }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ py: "1%", px: 0 }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <DTC_TextBox
              required
              id={this.state.emailId}
              label={this.props.data.email_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildEmailId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <DTC_TextBox
              required
              id={this.state.cellId}
              label={this.props.data.cell_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildCelllId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <DTC_TextBox
              id={this.state.fissoId}
              label={this.props.data.fisso_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildFissolId}
            />
          </Grid>
        </Grid>
      </FormLabel>
    );
  }
}

export default SEC_Contatti;
