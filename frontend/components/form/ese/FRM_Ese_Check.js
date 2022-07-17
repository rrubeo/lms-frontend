import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import DCT_LinkButton from "../../DCT_LinkButton";
import DCT_Stepper from "../../DCT_Stepper";
import Fab from "@mui/material/Fab";
import jnStyles from "../../../styles/utils.module.css";

const utils = require("../../../lib");
const ese_cfg = require("./config");

class FRM_Ese_Check extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testoGruppoId: "tx_gruppo",
      testoGruppoValue: "",
      nomeGruppoId: "tx_nome_gruppo",
      nomeGruppoValue: "",
      domande: this.props.data.rows ? this.props.data.rows : {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.gridItem = this.gridItem.bind(this);

    this.changeChildTestoGruppoId = React.createRef();
    this.changeChildNomeGruppoId = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    // const data = {
    //   id: ese_cfg.FRM_PBASE_STEP_0,
    // };
    // // this.props.onSubmit(event, data);
    // this.props.onNextStep(event, null, ese_cfg.PBASE_STEP_1);
  }

  handleReset(event) {}

  onChangeForm(id, data) {
    // console.log("CHANGE");
    switch (id) {
      default:
        console.log(id);
        console.log(data);
        break;
    }
  }

  onDeleteRow(id, data) {
    const rowData = {
      id: ese_cfg.FRM_ESE_STEP_6,
      key: data,
    };
    this.props.onDelete(rowData);
  }

  gridItem(label, value) {
    return (
      <Grid item xs="auto">
        <div className={jnStyles.jnDCT_TextCheckLabel}>{label}</div>
        <Paper elevation={4}>
          <div className={jnStyles.jnDCT_TextCheckText}>{value}</div>
        </Paper>
      </Grid>
    );
  }

  gridItemNumber(label, value, stile) {
    return (
      <Grid item xs="auto" align="center">
        <div className={jnStyles.jnDCT_TextCheckLabel}>{label}</div>
        <Fab
          component="div"
          size="small"
          sx={{ p: 0, m: 0 }}
          classes={{
            root: stile,
          }}
        >
          {value}
        </Fab>
      </Grid>
    );
  }

  render() {
    const linkBack = utils.getBackLink(
      "ese",
      ese_cfg.ESE_STEP_3,
      this.props.query
    );
    // console.log(this.props.data.rows);
    // console.log(this.state.domande);

    Object.entries(this.state.domande).map(function (value, key) {
      console.log("keyName", key);
      console.log(value[1]);
    });

    return (
      <Stack direction="column" spacing={4} mt={0} mb={2} p={0}>
        <Stack
          direction="row"
          spacing={5}
          justifyContent="flex-start"
          alignItems="center"
        >
          <DCT_LinkButton href={linkBack} text={this.props.data.back_label} />
        </Stack>
        <DCT_Stepper
          id="stepper"
          activeStep={this.props.activeStep}
          steps={this.props.data.stepper}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {this.gridItem(this.props.data.tipo_label, this.props.data.tipo)}
            {this.gridItemNumber(
              this.props.data.limite_label,
              this.props.data.limite,
              jnStyles.jnDCT_Fab
            )}
            {this.gridItem(
              this.props.data.livello_label,
              this.props.data.livello
            )}
            {this.gridItemNumber(
              this.props.data.punteggio_label,
              this.props.data.punteggio,
              jnStyles.jnDCT_Fab1
            )}
            {this.gridItem(this.props.data.nome_label, this.props.data.nome)}
          </Grid>
        </Box>
        <Box
          component="form"
          id={ese_cfg.FRM_ESE_STEP_6}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
          sx={{ display: "inline" }}
        >
          {Object.entries(this.state.domande).map(function (value, key) {
            return (
              <Accordion
                key={key}
                sx={{
                  my: 2,
                  py: 0,
                  px: 0,
                  "&:before": {
                    display: "none",
                  },
                }}
                classes={{
                  root: jnStyles.accordion,
                }}
                disableGutters
                elevation={0}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid
                    container
                    spacing={{ xs: 2, md: 1 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {gridQuestion(2, value[1].tipo, jnStyles.jnDCT_TextCheckPt)}
                    {gridQuestion(
                      2,
                      value[1].nomeGrp,
                      jnStyles.jnDCT_TextCheckPt
                    )}
                    {gridQuestion(7, value[1].txtGrp, jnStyles.jnDCT_TextCheck)}
                    {gridQuestion(
                      1,
                      `Punteggio ${value[1].punteggio} %`,
                      jnStyles.jnDCT_TextCheckPt
                    )}
                    {gridNumber("auto", value[1].ndom, jnStyles.jnDCT_Fab1)}
                    {gridQuestionPage(
                      11,
                      value[1].testo,
                      jnStyles.jnDCT_TextCheck
                    )}
                  </Grid>
                </AccordionSummary>
                {value[1].risposte.map((item, index) => (
                  <AccordionDetails key={index} sx={{ py: 0, px: 0 }}>
                    <Grid
                      container
                      spacing={{ xs: 1, md: 1 }}
                      columns={{ xs: 4, sm: 8, md: 12 }}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ pb: 1, px: 0 }}
                    >
                      {gridNumber("auto", item.nris, jnStyles.jnDCT_Fab)}
                      {gridQuestionPage(
                        5,
                        item.testo,
                        jnStyles.jnDCT_TextCheckResponse
                      )}
                      {gridCheckBox(3, item.corretta)}
                    </Grid>
                  </AccordionDetails>
                ))}
              </Accordion>
            );
            function gridCheckBox(size, flag) {
              return (
                <Grid item xs={size} zeroMinWidth>
                  <FormControlLabel
                    disabled
                    control={
                      flag == 1 ? <Checkbox defaultChecked /> : <Checkbox />
                    }
                    label={flag == 1 ? "corretta" : "errata"}
                  />
                </Grid>
              );
            }
            function gridQuestion(size, value, stile) {
              return (
                <Grid item xs={size}>
                  <Typography
                    classes={{
                      root: stile,
                    }}
                  >
                    {value}
                  </Typography>
                </Grid>
              );
            }
            function gridNumber(size, value, stile) {
              return (
                <Grid item xs={size}>
                  <Fab
                    size="small"
                    sx={{ p: 0, m: 0 }}
                    classes={{
                      root: stile,
                    }}
                  >
                    {value}
                  </Fab>
                </Grid>
              );
            }
            function gridQuestionPage(size, value, stile) {
              return (
                <Grid item xs={size}>
                  <Paper elevation={4}>
                    <Typography
                      sx={{ px: 1, py: 0.5 }}
                      classes={{
                        root: stile,
                      }}
                    >
                      {value}
                    </Typography>
                  </Paper>
                </Grid>
              );
            }
          })}
        </Box>
      </Stack>
    );
  }
}

export default FRM_Ese_Check;
