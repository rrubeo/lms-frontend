import * as React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SEC_StudentProfile from "./SEC_StudentProfile";
import SEC_StudentProgress from "./SEC_StudentProgress";
import SEC_LezioneTitolo from "./SEC_LezioneTitolo";
import SEC_ListNav from "./SEC_ListNav";
import SEC_DettaglioDoc from "./SEC_DettaglioDoc";
import SEC_DettaglioVideo from "./SEC_DettaglioVideo";
import jnStyles from "../../../styles/utils.module.css";

const fsme_cfg = require("./config");

class FRM_Dettaglio_Lezione extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      materia:
        this.props.data.lezioniStudente.length > 0
          ? this.props.data.lezioniStudente[0].lezioniStudenteMATERIA1[0]
          : [],
    };
  }

  render() {
    // console.log(this.props);
    return (
      <Stack
        direction="column"
        spacing={{ xs: 1, sm: 1, md: 2 }}
        mt={0}
        mb={0}
        p={0}
      >
        <Stack
          component="div"
          direction={{ xs: "column", sm: "row", md: "row" }}
          justifyContent={{
            xs: "space-evenly",
            sm: "space-between",
            md: "space-between",
          }}
          alignItems={{ xs: "flex-start", sm: "flex-start", md: "stretch" }}
          spacing={{ xs: 2, sm: 0, md: 0 }}
        >
          <SEC_StudentProfile profilo={this.props.data.profilo} />
          <SEC_StudentProgress
            text={this.props.data.label_avanzamento}
            avanzamento={
              this.state.materia.lezioniStudenteMateria.lezioniStudenteMateria
                .percentualeAvanzamento
                ? this.state.materia.lezioniStudenteMateria
                    .lezioniStudenteMateria.percentualeAvanzamento
                : 0
            }
          />
        </Stack>
        <Stack
          spacing={{ xs: 1, sm: 1, md: 2 }}
          direction={{
            xs: "column-reverse",
            sm: "column-reverse",
            md: "column-reverse",
            lg: "row",
          }}
          alignItems={{ xs: "flex-start", sm: "flex-start", md: "stretch" }}
        >
          <SEC_ListNav
            id={
              this.state.materia.lezioniStudenteCLASSE1[0].lezioniStudenteClasse
                .id
            }
            classeId={
              this.state.materia.lezioniStudenteCLASSE1[0].lezioniStudenteClasse
                .id
            }
            lezioneId={this.props.data.lezioneSelected.idLezione}
            classes={jnStyles.jnListCorsi}
            array={
              this.state.materia.lezioniStudenteCLASSE1[0]
                .lezioniStudenteLezione1
            }
            onClick={this.props.onClick}
          />
          <Container
            disableGutters
            maxWidth="false"
            sx={{
              width: "100%",
            }}
            classes={{
              root: jnStyles.jnAccordionContainer,
            }}
          >
            {this.props.data.lezioneContenuto.idVideo != 0 ? (
              <SEC_DettaglioVideo
                data={this.props.data.lezioneContenuto}
                profilo={this.props.data.profilo}
              />
            ) : (
              <></>
            )}
            <SEC_LezioneTitolo
              image={
                this.state.materia.lezioniStudenteMateria.lezioniStudenteMateria
                  .percorsoImmagineMateria
              }
              argomento={
                this.state.materia.lezioniStudenteCLASSE1[0]
                  .lezioniStudenteClasse.descr
              }
              lezione={this.props.data.lezioneSelected.argomento}
              materia={
                this.state.materia.lezioniStudenteMateria.lezioniStudenteMateria
                  .descr
              }
            />
            {this.props.data.docPdf.idContenuto ? (
              <SEC_DettaglioDoc data={this.props.data} />
            ) : (
              <></>
            )}
          </Container>
        </Stack>
      </Stack>
    );
  }
}

export default FRM_Dettaglio_Lezione;
