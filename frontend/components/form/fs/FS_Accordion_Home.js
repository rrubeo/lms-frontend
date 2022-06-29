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
                        {item.title}
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
