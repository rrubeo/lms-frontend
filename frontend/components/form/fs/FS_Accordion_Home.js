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

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionElements = {
    title: "Materie Anno II",
    subjects: [
      {
        id: 1,
        title: "Accordion1",
        contentText: [
          {
            id: 1,
            arg: "I linguaggi del web",
            list: [
              {
                id: 1,
                title: "Introduzione ai linguaggi del Web",
                time: 45,
              },
              {
                id: 2,
                title: "La struttura delle pagine Web",
                time: 35,
              },
              {
                id: 3,
                title: "Introduzione ai fogli di stile con CSS3",
                time: 60,
              },
            ],
          },
          {
            id: 2,
            arg: "HTML 5",
            list: [
              {
                id: 1,
                title: "Introduzione all'HTML 5",
                time: 45,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "Accordion2",
        contentText: [
          {
            id: 1,
            arg: "I linguaggi del web",
            list: [
              {
                id: 1,
                title: "Introduzione ai linguaggi del Web",
                time: 45,
              },
              {
                id: 2,
                title: "La struttura delle pagine Web",
                time: 35,
              },
              {
                id: 3,
                title: "Introduzione ai fogli di stile con CSS3",
                time: 60,
              },
            ],
          },
          {
            id: 2,
            arg: "HTML 5",
            list: [
              {
                id: 1,
                title: "Introduzione all'HTML 5",
                time: 45,
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "Accordion3",
        contentText: [
          {
            id: 1,
            arg: "I linguaggi del web",
            list: [
              {
                id: 1,
                title: "Introduzione ai linguaggi del Web",
                time: 45,
              },
              {
                id: 2,
                title: "La struttura delle pagine Web",
                time: 35,
              },
              {
                id: 3,
                title: "Introduzione ai fogli di stile con CSS3",
                time: 60,
              },
            ],
          },
          {
            id: 2,
            arg: "HTML 5",
            list: [
              {
                id: 1,
                title: "Introduzione all'HTML 5",
                time: 45,
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: "Accordion4",
        contentText: [
          {
            id: 1,
            arg: "I linguaggi del web",
            list: [
              {
                id: 1,
                title: "Introduzione ai linguaggi del Web",
                time: 45,
              },
              {
                id: 2,
                title: "La struttura delle pagine Web",
                time: 35,
              },
              {
                id: 3,
                title: "Introduzione ai fogli di stile con CSS3",
                time: 60,
              },
            ],
          },
          {
            id: 2,
            arg: "HTML 5",
            list: [
              {
                id: 1,
                title: "Introduzione all'HTML 5",
                time: 45,
              },
            ],
          },
        ],
      },
      {
        id: 5,
        title: "Accordion5",
        contentText: [
          {
            id: 1,
            arg: "I linguaggi del web",
            list: [
              {
                id: 1,
                title: "Introduzione ai linguaggi del Web",
                time: 45,
              },
              {
                id: 2,
                title: "La struttura delle pagine Web",
                time: 35,
              },
              {
                id: 3,
                title: "Introduzione ai fogli di stile con CSS3",
                time: 60,
              },
            ],
          },
          {
            id: 2,
            arg: "HTML 5",
            list: [
              {
                id: 1,
                title: "Introduzione all'HTML 5",
                time: 45,
              },
            ],
          },
        ],
      },
      {
        id: 6,
        title: "Accordion6",
        contentText: [
          {
            id: 1,
            arg: "I linguaggi del web",
            list: [
              {
                id: 1,
                title: "Introduzione ai linguaggi del Web",
                time: 45,
              },
              {
                id: 2,
                title: "La struttura delle pagine Web",
                time: 35,
              },
              {
                id: 3,
                title: "Introduzione ai fogli di stile con CSS3",
                time: 60,
              },
            ],
          },
          {
            id: 2,
            arg: "HTML 5",
            list: [
              {
                id: 1,
                title: "Introduzione all'HTML 5",
                time: 45,
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <Container disableGutters maxWidth="false">
      <Typography variant="h6" className={jnStyles.jnD1}>
        {accordionElements.title}
      </Typography>
      <Container disableGutters maxWidth="false" className={fsStyle.accordion}>
        {accordionElements.subjects.map((item) => (
          <Container
            disableGutters
            maxWidth="false"
            className={fsStyle.accordionContainer}
            key={item.id}
          >
            <Accordion
              className={fsStyle.accordionElement}
              expanded={expanded === item.id}
              onChange={handleChange(item.id)}
            >
              <AccordionSummary
                className={fsStyle.accordionSummary}
                sx={{ minHeight: "110px" }}
                expandIcon={
                  expanded === item.id ? (
                    <Typography
                      variant="h4"
                      className="icon-arrow-down3"
                      sx={{ color: "#000000" }}
                    ></Typography>
                  ) : (
                    <Typography
                      variant="h4"
                      className="icon-arrow-down3"
                      sx={{ color: "#000000" }}
                    ></Typography>
                  )
                }
              >
                <Box className={fsStyle.accordionImgContainer}>
                  <Typography variant="h3" className="icon-sport"></Typography>
                </Box>

                <Box className={fsStyle.accordionTitleContainer}>
                  <Stack direction="row">
                    <Box className={fsStyle.accordionTitleDivContainer}>
                      <Typography variant="h6" className={jnStyles.jnD4}>
                        Fisica fondamenti
                      </Typography>
                    </Box>
                    <Box className={fsStyle.accordionPercentageContainer}>
                      <Typography variant="h6" className={jnStyles.jnD5}>
                        30%
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack>
                    <LinearProgress
                      className={fsStyle.accordionProgress}
                      variant="determinate"
                      value={30}
                    />
                  </Stack>
                </Box>
              </AccordionSummary>
              <AccordionDetails className={fsStyle.accordionDetailContainer}>
                {item.contentText.map((itemContent) => (
                  <Container
                    key={itemContent.id}
                    disableGutters
                    maxWidth="false"
                    sx={{ paddingBottom: "50px" }}
                  >
                    <Typography variant="h6" className={jnStyles.jnD1}>
                      {itemContent.arg}
                    </Typography>
                    <List dense={true}>
                      {itemContent.list.map((itemObjectList) => (
                        <ListItem key={itemObjectList.id} sx={{ padding: "0" }}>
                          <Box
                            sx={{
                              width: "70%",
                              borderBottom: "1px solid #ffffff",
                              padding: "15px 0",
                            }}
                          >
                            <Typography variant="p" className={jnStyles.jnI2}>
                              {itemObjectList.title}
                            </Typography>
                          </Box>
                          <Box sx={{ width: "30%", textAlign: "right" }}>
                            <Typography variant="p" className={jnStyles.jnL2}>
                              Stimato {itemObjectList.time} m
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
