import * as React from "react";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import DCT_LinkButton from "../../DCT_LinkButton";
import DCT_Stepper from "../../DCT_Stepper";
import DTC_DataGrid from "../../grid/DTC_DataGrid";
import DTC_TextBox from "../../DTC_TextBox";
import DCT_ComboBox from "../../selector/DCT_ComboBox";
import DCT_Breadcrumbs from "../../DCT_Breadcrumbs";
import jnStyles from "../../../styles/utils.module.css";

import SEC_Contatti from "../anagrafica/SEC_Contatti";
import SEC_Anagrafici from "../anagrafica/SEC_Anagrafici";
import SEC_Residenza from "../anagrafica/SEC_Residenza";
import SEC_Domicilio from "../anagrafica/SEC_Domicilio";

const utils = require("../../../lib");
const gu_cfg = require("./config");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class FRM_GestUt_Dettaglio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: 0,
      key: this.props.query.param.length > 1 ? this.props.query.param[1] : -1,
      emailValue: "",
      cellValue: "",
      fissoValue: "",
      cfValue: "",
      nomeValue: "",
      cognomeValue: "",
      nascitaValue: "",
      paeseValue: { label: "", id: 0 },
      regioneValue: { label: "", id: 0 },
      provinciaValue: { label: "", id: 0 },
      comuneValue: { label: "", id: 0 },
      resPaeseValue: { label: "", id: 0 },
      resRegioneValue: { label: "", id: 0 },
      resProvinciaValue: { label: "", id: 0 },
      resComuneValue: { label: "", id: 0 },
      resToponimoValue: { label: "", id: 0 },
      resIndirizzoValue: "",
      resCivicoValue: "",
      resCapValue: "",
      domPaeseValue: { label: "", id: 0 },
      domRegioneValue: { label: "", id: 0 },
      domProvinciaValue: { label: "", id: 0 },
      domComuneValue: { label: "", id: 0 },
      domToponimoValue: { label: "", id: 0 },
      domIndirizzoValue: "",
      domCivicoValue: "",
      domCapValue: "",
    };

    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.changeChildContatti = React.createRef();
    this.changeChildAnagrafica = React.createRef();
    this.changeChildResidenza = React.createRef();
    this.changeChildDomicilio = React.createRef();
  }

  async handleUpdate(event) {
    event.preventDefault();
    const data = this.getData();
    data.upid = this.state.key;
    console.log(data);
    await this.props.onSubmit(event, data);
  }

  getData() {
    const data = {
      id: gu_cfg.FRM_GU_STEP_1,
      idPersona: this.state.key,
      email: this.state.emailValue,
      cell: this.state.cellValue,
      fisso: this.state.fissoValue,
      cf: this.state.cfValue,
      nome: this.state.nomeValue,
      cognome: this.state.cognomeValue,
      nascita: this.state.nascitaValue,
      nas_paese: this.state.paeseValue,
      nas_regione: this.state.regioneValue,
      nas_provincia: this.state.provinciaValue,
      nas_comune: this.state.comuneValue,
      res_paese: this.state.resPaeseValue,
      res_regione: this.state.resRegioneValue,
      res_provincia: this.state.resProvinciaValue,
      res_comune: this.state.resComuneValue,
      res_toponimo: this.state.resToponimoValue,
      res_indirizzo: this.state.resIndirizzoValue,
      res_civico: this.state.resCivicoValue,
      res_cap: this.state.resCapValue,
      dom_paese: this.state.domPaeseValue,
      dom_regione: this.state.domRegioneValue,
      dom_provincia: this.state.domProvinciaValue,
      dom_comune: this.state.domComuneValue,
      dom_toponimo: this.state.domToponimoValue,
      dom_indirizzo: this.state.domIndirizzoValue,
      dom_civico: this.state.domCivicoValue,
      dom_cap: this.state.domCapValue,
    };
    return data;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = this.getData();
    console.log(data);
    await this.props.onSubmit(event, data);
  }

  handleChange(event, newValue) {
    this.setState({ selectedId: newValue });
  }

  handleReset(event) {
    console.log("rESET");
    this.changeChildContatti.current.handleReset();
    this.changeChildAnagrafica.current.handleReset();
    this.changeChildResidenza.current.handleReset();
    this.changeChildDomicilio.current.handleReset();
  }

  onChangeForm(id, data) {
    switch (id) {
      case "tx_email":
        this.setState({ emailValue: data });
        break;
      case "tx_cell":
        this.setState({ cellValue: data });
        break;
      case "tx_fisso":
        this.setState({ fissoValue: data });
        break;
      case "tx_cf":
        this.setState({ cfValue: data });
        break;
      case "tx_nome":
        this.setState({ nomeValue: data });
        break;
      case "tx_cognome":
        this.setState({ cognomeValue: data });
        break;
      case "tx_nascita":
        this.setState({ nascitaValue: data });
        break;
      case "cb_nas_paese":
        this.setState({ paeseValue: data });
        break;
      case "cb_nas_regione":
        this.setState({ regioneValue: data });
        break;
      case "cb_nas_provincia":
        this.setState({ provinciaValue: data });
        break;
      case "cb_nas_comune":
        this.setState({ comuneValue: data });
        break;
      case "cb_res_paese":
        this.setState({ resPaeseValue: data });
        break;
      case "cb_res_regione":
        this.setState({ resRegioneValue: data });
        break;
      case "cb_res_provincia":
        this.setState({ resProvinciaValue: data });
        break;
      case "cb_res_comune":
        this.setState({ resComuneValue: data });
        break;
      case "cb_dom_paese":
        this.setState({ domPaeseValue: data });
        break;
      case "cb_dom_regione":
        this.setState({ domRegioneValue: data });
        break;
      case "cb_dom_provincia":
        this.setState({ domProvinciaValue: data });
        break;
      case "cb_dom_comune":
        this.setState({ domComuneValue: data });
        break;
      case "tx_res_indirizzo":
        this.setState({ resIndirizzoValue: data });
        break;
      case "tx_res_civico":
        this.setState({ resCivicoValue: data });
        break;
      case "tx_res_cap":
        this.setState({ resCapValue: data });
        break;
      case "cb_res_toponimo":
        this.setState({ resToponimoValue: data });
        break;
      case "tx_dom_indirizzo":
        this.setState({ domIndirizzoValue: data });
        break;
      case "tx_dom_civico":
        this.setState({ domCivicoValue: data });
        break;
      case "tx_dom_cap":
        this.setState({ domCapValue: data });
        break;
      case "cb_dom_toponimo":
        this.setState({ domToponimoValue: data });
        break;
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  render() {
    // const linkBack = utils.getBackLink(
    //   "gstu",
    //   gu_cfg.GU_STEP_0,
    //   this.props.query
    // );

    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={this.state.selectedId}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label={this.props.data.tab1_label} {...a11yProps(0)} />
          </Tabs>
        </Box>
        <TabPanel value={this.state.selectedId} index={0}>
          <Box
            component="form"
            id={gu_cfg.FRM_GU_STEP_1}
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
              <SEC_Anagrafici
                data={this.props.data}
                onChange={this.onChangeForm}
                ref={this.changeChildAnagrafica}
              />
              <SEC_Contatti
                data={this.props.data}
                onChange={this.onChangeForm}
                ref={this.changeChildContatti}
              />
              <SEC_Residenza
                data={this.props.data}
                onChange={this.onChangeForm}
                ref={this.changeChildResidenza}
              />
              <SEC_Domicilio
                data={this.props.data}
                onChange={this.onChangeForm}
                ref={this.changeChildDomicilio}
              />
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
                classes={{ root: jnStyles.jnBT }}
              >
                {this.state.key == -1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    classes={{ root: jnStyles.jnBT }}
                  >
                    Salva
                  </Button>
                ) : (
                  <></>
                )}
                {this.state.key != -1 ? (
                  <Button
                    variant="contained"
                    classes={{ root: jnStyles.jnBT }}
                    onClick={this.handleUpdate}
                  >
                    Modifica
                  </Button>
                ) : (
                  <></>
                )}
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
        </TabPanel>
      </Box>
    );
  }
}

export default FRM_GestUt_Dettaglio;
