import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import jnStyles from "../../../styles/utils.module.css";

import DCT_LinkButton from "../../DCT_LinkButton";
import SEC_Servizi from "../anagrafica/SEC_Servizi";
import SEC_Pagamenti from "../anagrafica/SEC_Pagamenti";
import SEC_Tutor from "../anagrafica/SEC_Tutor";
import SEC_Docenti from "../anagrafica/SEC_Docenti";
import SEC_PianoStudi from "../anagrafica/SEC_PianoStudi";

const utils = require("../../../lib");
const gs_cfg = require("./config");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className={jnStyles.jnTabPanel}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
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

class FRM_GestStud_Iscrizione extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: 0,
      idPersona: this.props.query ? this.props.query?.param[2] : 0,
      idIscrizione: this.props.query ? this.props.query?.param[1] : 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
  }

  handleChange(event, newValue) {
    this.setState({ selectedId: newValue });
  }

  async handleSubmit(event) {
    event.preventDefault();
  }

  handleReset(event) {
    switch (this.state.selectedId) {
      case 1:
        break;
    }
  }

  onChangeForm(id, data) {
    switch (id) {
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {}

  render() {
    const linkBack = `/gs/${gs_cfg.GSTU_STEP_1}/${this.state.idPersona}`;

    return (
      <Box sx={{ width: "100%" }}>
        <DCT_LinkButton href={linkBack} text={this.props.data.back_label} />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={this.state.selectedId}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label={this.props.data.tab4_label} {...a11yProps(0)} />
            <Tab label={this.props.data.tab5_label} {...a11yProps(1)} />
            <Tab label={this.props.data.tab7_label} {...a11yProps(2)} />
            <Tab label={this.props.data.tab8_label} {...a11yProps(3)} />
            <Tab label={this.props.data.tab9_label} {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={this.state.selectedId} index={0}>
          <SEC_PianoStudi
            id={this.props.id}
            data={this.props.data}
            query={this.props.query}
            api={gs_cfg.GSTU_STEP_2_API_2}
          />
        </TabPanel>
        <TabPanel value={this.state.selectedId} index={1}>
          <SEC_Servizi
            id={this.props.id}
            data={this.props.data}
            query={this.props.query}
            api={gs_cfg.GSTU_STEP_2_API_1}
          />
        </TabPanel>
        <TabPanel value={this.state.selectedId} index={2}>
          <SEC_Pagamenti
            id={this.props.id}
            data={this.props.data}
            query={this.props.query}
            api={gs_cfg.GSTU_STEP_2_API_3}
          />
        </TabPanel>
        <TabPanel value={this.state.selectedId} index={3}>
          <SEC_Tutor
            id={this.props.id}
            data={this.props.data}
            query={this.props.query}
            api={gs_cfg.GSTU_STEP_2_API_4}
          />
        </TabPanel>
        <TabPanel value={this.state.selectedId} index={4}>
          <SEC_Docenti
            id={this.props.id}
            data={this.props.data}
            query={this.props.query}
            api={gs_cfg.GSTU_STEP_2_API_5}
          />
        </TabPanel>
      </Box>
    );
  }
}

export default FRM_GestStud_Iscrizione;
