import * as React from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import DTC_TextBox from "../../DTC_TextBox";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import jnStyles from "../../../styles/utils.module.css";

class SEC_Iscrizione extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      istitutoId: "cb_istituto",
      istitutoValue: { label: "", id: 0 },
      tipostudenteId: "cb_tipostudente",
      tipostudenteValue: { label: "", id: 0 },
      annofreqId: "cb_annofreq",
      annofreqValue: { label: "", id: 0 },
      accademicoId: "cb_accademico",
      accademicoValue: { label: "", id: 0 },
    };

    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.dafaultValue = this.dafaultValue.bind(this);

    this.changeChildIstitutoId = React.createRef();
    this.changeChildTipostudenteId = React.createRef();
    this.changeChildAnnofreqId = React.createRef();
    this.changeChildAccademicoId = React.createRef();
  }

  dafaultValue() {
    this.changeChildIstitutoId.current.setIndex(0);
    this.changeChildTipostudenteId.current.setIndex(0);
    this.changeChildAnnofreqId.current.setIndex(0);
    this.changeChildAccademicoId.current.setIndex(0);
  }

  componentDidMount() {
    this.dafaultValue();
  }

  handleReset(event) {
    this.dafaultValue();
  }

  onChangeForm(id, data) {
    switch (id) {
      case this.state.istitutoId:
        this.setState({ istitutoValue: data });
        break;
      case this.state.tipostudenteId:
        this.setState({ tipostudenteValue: data });
        break;
      case this.state.annofreqId:
        this.setState({ annofreqValue: data });
        break;
      case this.state.accademicoId:
        this.setState({ accademicoValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
    this.props.onChange(id, data);
  }

  onDeleteRow(id, data) {
    console.log("DELETE ROW");
    console.log(id);
    console.log(data);

    const rowData = {
      id: this.props.id,
      key: data,
    };
    this.props.onDelete(rowData);
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
            <DCT_ComboBox
              id={this.state.istitutoId}
              list={this.props.data.istituto}
              label={this.props.data.istituto_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildIstitutoId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <DCT_ComboBox
              id={this.state.annofreqId}
              list={this.props.data.annofreq}
              label={this.props.data.annofreq_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildAnnofreqId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <DCT_ComboBox
              id={this.state.tipostudenteId}
              list={this.props.data.tipostudente}
              label={this.props.data.tipostudente_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildTipostudenteId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <DCT_ComboBox
              id={this.state.accademicoId}
              list={this.props.data.accademico}
              label={this.props.data.accademico_label}
              onChange={this.onChangeForm}
              size={1}
              ref={this.changeChildAccademicoId}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <DTC_DataGrid
              id="gd_ricerca"
              cols={this.props.data.cols_iscrizioni}
              rows={this.props.data.rows_iscrizioni}
              onChange={this.onChangeForm}
              onDelete={this.onDeleteRow}
              onNextStep={this.props.onNextStep}
              action={this.props.action}
              actionWidth={90}
            />
          </Grid>
        </Grid>
      </FormLabel>
    );
  }
}

export default SEC_Iscrizione;
