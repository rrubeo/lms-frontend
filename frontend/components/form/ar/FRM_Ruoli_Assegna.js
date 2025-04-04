import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

import DTC_TextBox from "../../DTC_TextBox";
import DTC_TextInfo from "../../DTC_TextInfo";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DCT_CheckList from "../../selector/DCT_CheckList";
import DCT_LinkButton from "../../DCT_LinkButton";

import jnStyles from "../../../styles/utils.module.css";

const ar_cfg = require("./config");

class FRM_Ruoli_Assegna extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userNameId: "tx_username",
      userNameValue: "",
      pwdId: "tx_pwd",
      pwdValue: "",
      selectRuoliId: "lbox_ruoli",
      selectRuoliValue: [],
      provvisoriaState: true,
    };

    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.dafaultValue = this.dafaultValue.bind(this);

    this.changeChildUserNameId = React.createRef();
    this.changeChildSelectRuoliId = React.createRef();
    this.changeChildPwdId = React.createRef();
  }

  dafaultValue() {
    // console.log(this.props.data.utente);
    if (this.props.data.utente.length > 0) {
      // console.log("dafaultValue");
      this.changeChildUserNameId.current.setText(
        this.props.data.utente[0].userName
      );
      this.onChangeForm(
        this.state.userNameId,
        this.props.data.utente[0].userName
      );

      if (!this.props.data.utente[0].attivo) {
        this.changeChildPwdId.current.setText(
          this.props.data.utente[0].provvisoria
        );
        this.onChangeForm(
          this.state.pwdId,
          this.props.data.utente[0].provvisoria
        );
      } else {
        this.setState({ provvisoriaState: false });
      }
    }
    this.changeChildSelectRuoliId.current.handleReset();
    this.setState({
      selectRuoliValue: [],
    });
  }

  componentDidMount() {
    this.dafaultValue();
  }

  async handleUpdate(event) {
    event.preventDefault();
    // console.log("Disattiva");
    const rowData = {
      id: this.props.id,
      key: this.state.userNameValue,
      action: "DISABLEUSER",
    };
    await this.props.onDelete(rowData);
    this.setState({ provvisoriaState: true });
    this.dafaultValue();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      id: this.props.id,
      username: this.state.userNameValue,
      provvisoria: this.state.pwdValue,
      ruoli: this.state.selectRuoliValue,
    };
    // console.log(data);
    await this.props.onSubmit(event, data);
    this.dafaultValue();
  }

  handleReset(event) {
    this.dafaultValue();
  }

  onChangeForm(id, data) {
    switch (id) {
      case this.state.userNameId:
        this.setState({ userNameValue: data });
        break;
      case this.state.pwdId:
        this.setState({ pwdValue: data });
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
      id: this.props.id,
      key: data,
      action: "DISABLEROLE",
    };
    this.props.onDelete(rowData);
  }

  render() {
    const linkBack = `/ar/${ar_cfg.AR_STEP_0}`;
    // console.log(this.props.data);
    return (
      <>
        <DCT_LinkButton href={linkBack} text={this.props.data.back_label} />
        <Divider sx={{ pt: "1%" }} light />
        <Stack
          direction={{ xs: "column", sm: "column", md: "column", lg: "row" }}
          spacing={2}
          mt="1%"
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
                id={this.props.id}
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
                  {!this.state.provvisoriaState && (
                    <Button
                      variant="contained"
                      onClick={this.handleUpdate}
                      classes={{ root: jnStyles.jnBT }}
                    >
                      Disattiva Utente
                    </Button>
                  )}
                  {this.state.provvisoriaState && (
                    <DTC_TextBox
                      required
                      id={this.state.pwdId}
                      label={this.props.data.pwd_label}
                      onChange={this.onChangeForm}
                      size={1}
                      ref={this.changeChildPwdId}
                    />
                  )}
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
      </>
    );
  }
}

export default FRM_Ruoli_Assegna;
