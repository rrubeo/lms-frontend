import * as React from "react";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import SEC_StudenteLezioniSummary from "./SEC_StudenteLezioniSummary";
import SEC_StudenteLezioniDetail from "./SEC_StudenteLezioniDetail";
import jnStyles from "../../../styles/utils.module.css";
const fsme_cfg = require("./config");

class SEC_StudenteLezioni extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      title: this.props.materie.lezioniStudenteAnno.descr,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (panel) => (event, isExpanded) => {
    if (isExpanded) {
      this.setState({ expanded: panel });
    } else {
      this.setState({ expanded: false });
    }
  };

  render() {
    // console.log(this.props);
    // console.log(
    //   this.props.materie.lezioniStudenteMATERIA1[0].lezioniStudenteCLASSE1
    // );
    return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 0, sm: 1, md: 1 }}
        sx={{ width: "100%" }}
      >
        <Typography
          elevation={1}
          align="center"
          noWrap={true}
          variant="body2"
          classes={{
            body2: jnStyles.jnA1Title,
          }}
        >
          {this.state.title}
        </Typography>
        {/* <Container
          disableGutters
          maxWidth="false"
          sx={{
            width: "100%",
            maxHeight: { xs: "100%", sm: "100%", md: 580 },
            // overflow: "auto",
          }}
          classes={{
            root: jnStyles.jnListIscrizione,
          }}
        > */}
          {this.props.materie.lezioniStudenteMATERIA1.map((item, index) => (
            <Accordion
              key={item.lezioniStudenteMateria.lezioniStudenteMateria.id}
              expanded={
                this.state.expanded ===
                `${item.lezioniStudenteMateria.lezioniStudenteMateria.id}`
              }
              onChange={this.handleChange(
                `${item.lezioniStudenteMateria.lezioniStudenteMateria.id}`
              )}
              sx={{
                m: 0,
                p: 0,
                width: "100%",
                "&:before": {
                  display: "none",
                },
              }}
              disableGutters
              square={false}
              elevation={0}
              classes={{
                root: jnStyles.jnAccordionContainer,
                region: jnStyles.jnAccordionRegion,
              }}
            >
              <AccordionSummary
                expandIcon={
                  this.state.expanded ===
                  item.lezioniStudenteMateria.lezioniStudenteMateria.id ? (
                    <Typography
                      variant="body2"
                      classes={{
                        body2: jnStyles.jnA1MaterieIcon2,
                      }}
                      sx={{ m: 0, p: 0 }}
                      className="icon-arrow-down3"
                    ></Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      classes={{
                        body2: jnStyles.jnA1MaterieIcon2,
                      }}
                      sx={{ m: 0, p: 0 }}
                      className="icon-arrow-down3"
                    ></Typography>
                  )
                }
                aria-controls={`${item.lezioniStudenteMateria.lezioniStudenteMateria.id}bh-content`}
                id={`${item.lezioniStudenteMateria.lezioniStudenteMateria.id}bh-header`}
                sx={{ my: 0, mx: 2, p: 0 }}
              >
                <SEC_StudenteLezioniSummary
                  icon={
                    item.lezioniStudenteMateria.lezioniStudenteMateria
                      .percorsoImmagineMateria
                  }
                  materia={
                    item.lezioniStudenteMateria.lezioniStudenteMateria.descr
                  }
                  avanzamento={
                    item.lezioniStudenteMateria.lezioniStudenteMateria
                      .percentualeAvanzamento
                  }
                />
              </AccordionSummary>
              <AccordionDetails sx={{ m: 0, p: 2 }}>
                <SEC_StudenteLezioniDetail
                  lezioni={item.lezioniStudenteCLASSE1}
                  onClick={this.props.onClick}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        {/* </Container> */}
      </Stack>
    );
  }
}

export default SEC_StudenteLezioni;
