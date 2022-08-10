import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormLabel from "@mui/material/FormLabel";

import DTC_TextBox from "../../DTC_TextBox";
import DTC_TextInfo from "../../DTC_TextInfo";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DCT_CheckList from "../../selector/DCT_CheckList";

import jnStyles from "../../../styles/utils.module.css";

const ar_cfg = require("./config");

class FRM_Ruoli_Assegna extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameId: "tx_username",
      userNameValue: "",
      selectRuoliId: "lbox_ruoli",
      selectRuoliValue: [],      
    };

    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.dafaultValue = this.dafaultValue.bind(this);

    this.changeChildUserNameId = React.createRef();
    this.changeChildSelectRuoliId = React.createRef();   
  }

  dafaultValue() {
    // console.log(this.props.data.utente);
    if (this.props.data.utente.length > 0) {
      this.changeChildUserNameId.current.setText(
        this.props.data.utente[0].userName
      );
      this.onChangeForm(
        this.state.userNameId,
        this.props.data.utente[0].userName
      );
    }
    this.changeChildSelectRuoliId.current.handleReset();    
    this.setState({     
      selectRuoliValue: [],
    });
  }

  componentDidMount() {
    this.dafaultValue();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: ar_cfg.FRM_AR_STEP_1,
      username: this.state.userNameValue,      
      ruoli: this.state.selectRuoliValue,
    };
    // console.log(data);
    await this.props.onSubmit(event, data);
  }

  handleReset(event) {
    this.dafaultValue();
  }

  onChangeForm(id, data) {
    switch (id) {
      case this.state.userNameId:
        this.setState({ userNameValue: data });
        break;
      case this.state.selectRuoliId:
        this.setState({ selectRuoliValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    const rowData = {
      id: ar_cfg.FRM_AR_STEP_1,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  render() {
    console.log(this.props.data);
    return (
      <Stack
        direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
        spacing={2}
        mt={0}
        mb="2%"
        p={0}
      >
        <FormLabel
          component="span"
          classes={{
            root: jnStyles.jnDCT_TextSection,
          }}
          sx={{ width: "100%", px: "2%" }}
        >
          Dati Utente
          <Box sx={{ width: "100%", py: "2%", px: "2%" }}>
            <Stack spacing={2}>
              <DTC_TextInfo
                id="tx_nominativo"
                label="Nominativo"
                value={
                  this.props.data.utente.length > 0
                    ? this.props.data.utente[0].nome +
                      " " +
                      this.props.data.utente[0].cognome
                    : "-"
                }
                size={1}
              />
              <DTC_TextInfo
                id="tx_cf"
                label="Codice Fiscale"
                value={
                  this.props.data.utente.length > 0
                    ? this.props.data.utente[0].codiceFiscale
                    : "-"
                }
                size={1}
              />
              <DTC_TextInfo
                id="tx_email"
                label="eMail"
                value={
                  this.props.data.utente.length > 0
                    ? this.props.data.utente[0].mail
                    : "-"
                }
                size={1}
              />
            </Stack>
          </Box>
        </FormLabel>
        <FormLabel
          component="span"
          classes={{
            root: jnStyles.jnDCT_TextSection,
          }}
          sx={{ width: "100%", px: "2%" }}
        >
          Aggiorna Credenziali
          <Stack direction="column" spacing={3} mt={0} mb={0} p={0}>
            <Box
              component="form"
              id={ar_cfg.FRM_AR_STEP_1}
              onSubmit={this.handleSubmit}
              onReset={this.handleReset}
              sx={{ display: "inline", py: "2%", px: "2%" }}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <DTC_TextBox
                  required
                  id={this.state.userNameId}
                  label={this.props.data.userName_label}
                  onChange={this.onChangeForm}
                  size={1}
                  ref={this.changeChildUserNameId}
                />
                <DCT_CheckList
                  id={this.state.selectRuoliId}
                  label={this.props.data.ruoli_label}
                  list={this.props.data.ruoli}
                  ref={this.changeChildSelectRuoliId}
                  onChange={this.onChangeForm}
                  size={700}
                />                
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
                    Attiva
                  </Button>
                  <Button
                    type="reset"
                    variant="contained"
                    classes={{ root: jnStyles.jnBT }}
                  >
                    Reset
                  </Button>
                </ButtonGroup>
              </Stack>
            </Box>
          </Stack>
        </FormLabel>
        <FormLabel
          component="span"
          classes={{
            root: jnStyles.jnDCT_TextSection,
          }}
          sx={{ width: "100%", px: "2%" }}
        >
          Ruoli Assegnati
          <DTC_DataGrid
            id="gd_ricerca"
            cols={this.props.data.cols}
            rows={this.props.data.rows}
            onChange={this.onChangeForm}
            onDelete={this.onDeleteRow}
            onNextStep={this.props.onNextStep}
            action={this.props.action}
            actionWidth={70}
          />
        </FormLabel>
      </Stack>
    );
  }
}

export default FRM_Ruoli_Assegna;
