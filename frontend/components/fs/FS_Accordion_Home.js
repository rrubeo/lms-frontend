import * as React from 'react';
import Container from "@mui/material/Container";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import fsStyle from '../../styles/Fs.module.css';
  
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
          contentText: "Text1"
        },
        {
          id: 2,
          title: "Accordion2",
          contentText: "Text2"
        },
        {
          id: 3,
          title: "Accordion3",
          contentText: "Text3"
        },
        {
          id: 4,
          title: "Accordion4",
          contentText: "Text4"
        },
        {
          id: 5,
          title: "Accordion5",
          contentText: "Text5"
        },
        {
          id: 6,
          title: "Accordion6",
          contentText: "Text6"
        },
        {
          id: 7,
          title: "Accordion7",
          contentText: "Text7"
        },
        {
          id: 8,
          title: "Accordion8",
          contentText: "Text8"
        }
      ]
    }
  
    return (
        <Container disableGutters maxWidth='false'>
        <Typography variant='h6' className={fsStyle.generalTitle}>{accordionElements.title}</Typography>
        <Container disableGutters maxWidth='false' sx={{height: '95vh', overflowY: 'scroll'}}>
            {accordionElements.subjects.map(item =>
                <Container disableGutters maxWidth='false' className={fsStyle.accordionContainer} key={item.id}>
                    <Accordion className={fsStyle.accordionElement}  expanded={expanded === item.id} onChange={handleChange(item.id)}>
                        <AccordionSummary
                            sx={{minHeight: '15vh'}}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Box className={fsStyle.accordionImgContainer}>
                                <img src='.' alt='IMG'/>
                            </Box>

                            <Box className={fsStyle.accordionTitleContainer}>
                                <Stack direction='row'>
                                    <Box className={fsStyle.accordionTitleDivContainer}>
                                        <Typography variant='h6' className={fsStyle.accordionTitle}>Fisica fondamenti</Typography>
                                    </Box>   
                                    <Box className={fsStyle.accordionPercentageContainer}>
                                        <Typography variant='h6' className={fsStyle.accordionPercentage}>30%</Typography>
                                    </Box>   
                                </Stack>
                                <Stack>
                                    <LinearProgress className={fsStyle.accordionProgress} variant='determinate' value={30}/>
                                </Stack>     
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails className={fsStyle.accordionDetailContainer}>
                            <Typography>{item.contentText}</Typography>
                        </AccordionDetails>
                    </Accordion>
                </Container>
            )}
        </Container>
    </Container>
    );
  }