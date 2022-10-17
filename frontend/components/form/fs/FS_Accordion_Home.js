import * as React from "react";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import fsStyle from "../../../styles/Fs.module.css";
import jnStyles from "../../../styles/utils.module.css";

export default function ControlledAccordions(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  var handleClick = function (itemId, lessonId) {
    console.log("lessonId="+lessonId);
    window.location.href =
      "../fs/dettaglio?classeArgomento=" + itemId + "&lezione=" + lessonId;
  };

  return (
    <Container disableGutters maxWidth="false" sx={{ p: 0 }}>
      <Typography variant="h6" className={jnStyles.jnD1}>
        {props.title}
      </Typography>
      <Container disableGutters maxWidth="false" className={fsStyle.accordion}>
        {props.array.map((item) => (
          <Container
            disableGutters
            maxWidth="false"
            className={fsStyle.accordionContainer}
            key={item.lezioniStudenteMateria.lezioniStudenteMateria.id}
          >
            <Accordion
              className={fsStyle.accordionElement}
              expanded={
                expanded ===
                item.lezioniStudenteMateria.lezioniStudenteMateria.id
              }
              onChange={handleChange(
                item.lezioniStudenteMateria.lezioniStudenteMateria.id
              )}
            >
              <AccordionSummary
                classes={{ content: fsStyle.accordionSummaryContent }}
                className={fsStyle.accordionSummary}
                sx={{ minHeight: "90px" }}
                expandIcon={
                  expanded ===
                  item.lezioniStudenteMateria.lezioniStudenteMateria.id ? (
                    <Typography
                      variant="h4"
                      className="icon-arrow-down3"
                      sx={{ color: "#000000", fontSize: "30px" }}
                    ></Typography>
                  ) : (
                    <Typography
                      variant="h4"
                      className="icon-arrow-down3"
                      sx={{ color: "#000000", fontSize: "30px" }}
                    ></Typography>
                  )
                }
              >
                <Box className={fsStyle.accordionImgContainer}>
                  <Typography
                    variant="h3"
                    className={
                      item.lezioniStudenteMateria.lezioniStudenteMateria
                        .percorsoImmagineMateria
                    }
                  ></Typography>
                </Box>

                <Box className={fsStyle.accordionTitleContainer}>
                  <Stack direction="row">
                    <Box className={fsStyle.accordionTitleDivContainer}>
                      <Typography variant="h6" className={jnStyles.jnD4}>
                        {
                          item.lezioniStudenteMateria.lezioniStudenteMateria
                            .descr
                        }
                      </Typography>
                    </Box>
                    <Box className={fsStyle.accordionPercentageContainer}>
                      <Typography variant="h6" className={jnStyles.jnD5}>
                        {parseInt(
                          item.lezioniStudenteMateria.lezioniStudenteMateria
                            .percentualeAvanzamento
                        )}
                        %
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack>
                    <LinearProgress
                      className={fsStyle.accordionProgress}
                      variant="determinate"
                      value={parseInt(
                        item.lezioniStudenteMateria.lezioniStudenteMateria
                          .percentualeAvanzamento
                      )}
                    />
                  </Stack>
                </Box>
              </AccordionSummary>
              <AccordionDetails className={fsStyle.accordionDetailContainer}>
                {item.lezioniStudenteCLASSE1.map((subitem) => (
                  <Container
                    key={subitem.lezioniStudenteClasse.id}
                    disableGutters
                    maxWidth="false"
                    sx={{ paddingBottom: "30px" }}
                  >
                    <Typography variant="h6" className={jnStyles.jnD1}>
                      {subitem.lezioniStudenteClasse.descr}
                    </Typography>
                    <List dense={true}>
                      {subitem.lezioniStudenteLezione1.map((lezioneItem) => (
                        <ListItem
                          key={lezioneItem.idLezione}
                          sx={{ padding: "0" }}
                        >
                          <Box
                            sx={{
                              width: "70%",
                              borderBottom: "1px solid #ffffff",
                              padding: "10px 0",
                            }}
                          >
                            <Typography variant="p" className={jnStyles.jnI2}>
                              {lezioneItem.lezione}
                            </Typography>
                          </Box>
                          <Box sx={{ width: "30%", textAlign: "right" }}>
                            <Typography
                              variant="p"
                              className={jnStyles.jnL2}
                              sx={{ marginRight: "25px" }}
                            >
                              Stimato{" "}
                              {lezioneItem.durataMinutiLezione
                                ? lezioneItem.durataMinutiLezione
                                : 0}{" "}
                              m
                            </Typography>

                            <Typography
                              variant="h4"
                               className={lezioneItem.lezioneCompletata  ? "icon-checkmark" : " "}
                              //className={lezioneItem.lezioneCompletata }
                              sx={{
                                color: "#00FF90",
                                fontSize: "20px",
                                display: "inline",
                                cursor: "pointer",
                              }}
                              
                            >
                              
                            </Typography>

                            <Typography
                              variant="h4"
                              className="icon-arrow-right3"
                              sx={{
                                color: "#000000",
                                fontSize: "20px",
                                display: "inline",
                                cursor: "pointer",
                              }}
                              onClick={(event) =>
                                handleClick(
                                  subitem.lezioniStudenteClasse.id,
                                  lezioneItem.idLezione
                                )
                              }
                            ></Typography>


                          </Box>
                        </ListItem>
                      ))}
                    </List>
                  </Container>
                ))}
              </AccordionDetails>
            </Accordion>
          </Container>
        ))}
      </Container>
    </Container>
  );
}
