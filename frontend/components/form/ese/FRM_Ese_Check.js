import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import DCT_LinkButton from "../../DCT_LinkButton";
import DCT_Stepper from "../../DCT_Stepper";
import DTC_TextInfo from "../../DTC_TextInfo";
import jnStyles from "../../../styles/utils.module.css";
import fsStyle from "../../../styles/Fs.module.css";
import { styled } from "@mui/material/styles";
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
        <Box
          component="form"
          id={ese_cfg.FRM_ESE_STEP_6}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
          sx={{ display: "inline" }}
        >
          <Stack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <DTC_TextInfo
              id="tx_esercita"
              label={this.props.data.nome_label}
              value={this.props.data.nome}
              size={1}
            />
            <DTC_TextInfo
              id="tx_tipo"
              label={this.props.data.tipo_label}
              value={this.props.data.tipo}
              size={1}
            />
            <DTC_TextInfo
              id="tx_limite"
              label={this.props.data.limite_label}
              value={this.props.data.limite}
              size={1}
            />
            <DTC_TextInfo
              id="tx_livello"
              label={this.props.data.livello_label}
              value={this.props.data.livello}
              size={1}
            />
            <DTC_TextInfo
              id="tx_pt"
              label={this.props.data.punteggio_label}
              value={this.props.data.punteggio}
              size={1}
            />
          </Stack>

          {Object.entries(this.state.domande).map(function (value, key) {
            return (
              <Accordion key={key} sx={{ my: 2, py: 0, px: 0 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography
                    classes={{
                      root: jnStyles.jnDCT_TextCheckOrdine,
                    }}
                    align="center"
                    sx={{ width: "5%", flexShrink: 0 }}
                  >
                    {value[1].ndom}
                  </Typography>
                  <Typography
                    classes={{
                      root: jnStyles.jnDCT_TextCheck,
                    }}
                  >
                    {value[1].testo}
                  </Typography>
                  <Typography
                    classes={{
                      root: jnStyles.jnDCT_TextCheckPt,
                    }}
                    sx={{ px: 5, width: "25%", flexShrink: 0 }}
                  >
                    {`Punteggio ${value[1].punteggio} %`}
                  </Typography>
                  <Typography
                    classes={{
                      root: jnStyles.jnDCT_TextCheckPt,
                    }}
                    sx={{ px: 5, flexShrink: 0 }}
                  >
                    {`(${value[1].tipo})`}
                  </Typography>
                </AccordionSummary>
                {value[1].risposte.map((item, index) => (
                  <AccordionDetails key={index} sx={{ py: 0, px: 10 }}>
                    <Stack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={1}
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Typography
                        classes={{
                          root: jnStyles.jnDCT_TextCheckOrdine,
                        }}
                        align="center"
                        sx={{ width: "5%", flexShrink: 0 }}
                      >
                        {item.nris}
                      </Typography>
                      <Typography
                        classes={{
                          root: jnStyles.jnDCT_TextCheckResponse,
                        }}
                        align="center"
                        sx={{ flexShrink: 0 }}
                      >
                        {item.testo}
                      </Typography>
                      <FormControlLabel
                        disabled
                        control={
                          item.corretta == 1 ? (
                            <Checkbox defaultChecked />
                          ) : (
                            <Checkbox />
                          )
                        }
                        label={item.corretta == 1 ? "corretta" : "errata"}
                      />
                    </Stack>
                  </AccordionDetails>
                ))}
              </Accordion>
            );
          })}
        </Box>
      </Stack>
    );
  }
}

export default FRM_Ese_Check;
