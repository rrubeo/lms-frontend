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


  var handleClick = function(event, itemId){
    window.location.href = "../fs/dettaglio?idLezione="+itemId;
  };

  console.log(props)

  return (
    <Container disableGutters maxWidth="false" sx={{paddingBottom: '2.5%'}}>
      <Typography variant="h6" className={jnStyles.jnD1}>
        {props.title}
      </Typography>
      <Container disableGutters maxWidth="false" className={fsStyle.accordion}>
        {props.array.map((item) => (
          <Container
            disableGutters
            maxWidth="false"
            className={fsStyle.accordionContainer}
            key={item.materia.materia.id}
          >
            <Accordion
              className={fsStyle.accordionElement}
              expanded={expanded === item.materia.materia.id}
              onChange={handleChange(item.materia.materia.id)}
            >
              <AccordionSummary
                classes={{content: fsStyle.accordionSummaryContent}}
                className={fsStyle.accordionSummary}
                sx={{ minHeight: "90px" }}
                expandIcon={
                  expanded === item.materia.materia.id ? (
                    <Typography
                      variant="h4"
                      className="icon-arrow-down3"
                      sx={{ color: "#000000", fontSize: '30px' }}
                    ></Typography>
                  ) : (
                    <Typography
                      variant="h4"
                      className="icon-arrow-down3"
                      sx={{ color: "#000000", fontSize: '30px' }}
                    ></Typography>
                  )
                }
              >
                <Box className={fsStyle.accordionImgContainer}>
                  <Typography variant="h3" className={item.classE1[0].lezione1[0].percorsoImmagineMateria}></Typography>
                </Box>

                <Box className={fsStyle.accordionTitleContainer}>
                  <Stack direction="row">
                    <Box className={fsStyle.accordionTitleDivContainer}>
                      <Typography variant="h6" className={jnStyles.jnD4}>{item.materia.materia.descr}</Typography>
                    </Box>
                    <Box className={fsStyle.accordionPercentageContainer}>
                      <Typography variant="h6" className={jnStyles.jnD5}>{100}%</Typography>
                    </Box>
                  </Stack>
                  <Stack>
                    <LinearProgress
                      className={fsStyle.accordionProgress}
                      variant="determinate"
                      value={100}
                    />
                  </Stack>
                </Box>
              </AccordionSummary>
              <AccordionDetails className={fsStyle.accordionDetailContainer}>
                {item.classE1.map((subitem) => (
                  <Container
                    key={subitem.classe.id}
                    disableGutters
                    maxWidth="false"
                    sx={{ paddingBottom: "30px" }}
                  >
                    <Typography variant="h6" className={jnStyles.jnD1}>
                      {subitem.classe.descr}
                    </Typography>
                    <List dense={true}>
                      {subitem.lezione1.map((lezioneItem) => (
                        <ListItem key={lezioneItem.idLezione} sx={{ padding: "0" }}>
                          <Box
                            sx={{
                              width: "70%",
                              borderBottom: "1px solid #ffffff",
                              padding: "10px 0",
                            }}
                          >
                            <Typography variant="p" className={jnStyles.jnI2} onClick={event => handleClick(event, lezioneItem.idLezione)}>
                              {lezioneItem.lezione}
                            </Typography>
                          </Box>
                          <Box sx={{ width: "30%", textAlign: "right" }}>
                            <Typography variant="p" className={jnStyles.jnL2}>
                              Stimato {lezioneItem.tempoStimatoLezione ? lezioneItem.tempoStimatoLezione : 0} m
                            </Typography>
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
