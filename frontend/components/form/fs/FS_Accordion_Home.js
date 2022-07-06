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
  console.log(props)
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container disableGutters maxWidth="false">
      <Typography variant="h6" className={jnStyles.jnD1}>
        {props.title}
      </Typography>
      <Container disableGutters maxWidth="false" className={fsStyle.accordion}>
        {props.array.map((item) => (
          <Container
            disableGutters
            maxWidth="false"
            className={fsStyle.accordionContainer}
            key={item.idMateria}
          >
            <Accordion
              className={fsStyle.accordionElement}
              expanded={expanded === item.idMateria}
              onChange={handleChange(item.idMateria)}
            >
              <AccordionSummary
                classes={{content: fsStyle.accordionSummaryContent}}
                className={fsStyle.accordionSummary}
                sx={{ minHeight: "90px" }}
                expandIcon={
                  expanded === item.idMateria ? (
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
                  <Typography variant="h3" className={item.percorsoImmagineMateria}>IMG</Typography>
                </Box>

                <Box className={fsStyle.accordionTitleContainer}>
                  <Stack direction="row">
                    <Box className={fsStyle.accordionTitleDivContainer}>
                      <Typography variant="h6" className={jnStyles.jnD4}>{item.materia}</Typography>
                    </Box>
                    <Box className={fsStyle.accordionPercentageContainer}>
                      <Typography variant="h6" className={jnStyles.jnD5}>{item.percentualeAvanzamento}%</Typography>
                    </Box>
                  </Stack>
                  <Stack>
                    <LinearProgress
                      className={fsStyle.accordionProgress}
                      variant="determinate"
                      value={item.percentualeAvanzamento}
                    />
                  </Stack>
                </Box>
              </AccordionSummary>
            </Accordion>
          </Container>
        ))}
      </Container>
    </Container>
  );
}
