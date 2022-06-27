import * as React from 'react';
import Container from "@mui/material/Container";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
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
        <Container disableGutters maxWidth='false'>
            {accordionElements.subjects.map(item =>
                <Container disableGutters maxWidth='false' className={fsStyle.accordionContainer} key={item.id} sx={{backgroundColor: '#B34B9E', border: 'none!important', marginBottom:'3%!important', minHeight: 'unset!important'}}>
                    <Accordion className={fsStyle.accordionElement} expanded={expanded === item.id} onChange={handleChange(item.id)} sx={{minHeight: 'unset!important'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Box className={fsStyle.accordionTitleContainer}>
                                <Box className={fsStyle.accordionTitleDivContainer} sx={{width: '100%!important'}}>
                                    <Typography variant='h6' sx={{color: '#ffffff', fontSize: '1rem'}}>I linguaggi del web</Typography>
                                </Box>    
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails className={fsStyle.accordionDetailContainer} sx={{backgroundColor: '#B34B9E!important', padding: '10%!important', paddingTop: '0!important'}}>
                            <Typography sx={{color: '#ffffff', borderBottom: '1px solid #ffffff', paddingTop: '10px', paddingBottom: '10px'}}>{item.contentText}</Typography>
                            <Typography sx={{color: '#ffffff', borderBottom: '1px solid #ffffff', paddingTop: '10px', paddingBottom: '10px'}}>{item.contentText}</Typography>
                            <Typography sx={{color: '#ffffff', paddingTop: '10px', paddingBottom: '10px'}}>{item.contentText}</Typography>
                        </AccordionDetails>
                    </Accordion>
                </Container>
            )}
        </Container>
    </Container>
  );
}