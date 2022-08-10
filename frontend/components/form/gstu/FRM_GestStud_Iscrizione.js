import * as React from "react";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import jnStyles from "../../../styles/utils.module.css";

const gs_cfg = require("./config");

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

class FRM_GestStud_Iscrizione extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event, newValue) {
    this.setState({ selectedId: newValue });
  }

  async handleSubmit(event) {
    event.preventDefault();
  }

  handleReset(event) {}

  componentWillUnmount() {
    console.log("SMONTA");
  }

  render() {
    console.log(`<${gs_cfg.FRM_GSTU_STEP_2}='${this.props.id}'>`);
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
            <Tab label={this.props.data.tab4_label} {...a11yProps(1)} />
            <Tab label={this.props.data.tab5_label} {...a11yProps(2)} />
            <Tab label={this.props.data.tab6_label} {...a11yProps(3)} />
            <Tab label={this.props.data.tab7_label} {...a11yProps(4)} />
            <Tab label={this.props.data.tab8_label} {...a11yProps(5)} />
            <Tab label={this.props.data.tab9_label} {...a11yProps(6)} />
          </Tabs>
        </Box>
        <TabPanel value={this.state.selectedId} index={1}>
          <Box
            component="form"
            id={gs_cfg.FRM_GSTU_STEP_2}
            onSubmit={this.handleSubmit}
            onReset={this.handleReset}
            sx={{ display: "inline" }}
          >
            {" "}
          </Box>
        </TabPanel>
      </Box>
    );
  }
}

export default FRM_GestStud_Iscrizione;
