import * as React from 'react';
import Container from "@mui/material/Container";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
import fsStyle from '../../styles/Fs.module.css';
import jnStyles from "../../styles/utils.module.css";


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
      }
    ]
  }

  return (
    <Container disableGutters maxWidth='false'>
        <Container disableGutters maxWidth='false'>
            {accordionElements.subjects.map(item =>
              <Container disableGutters maxWidth='false' className={fsStyle.accordionContainer} key={item.id} sx={{backgroundColor: '#B34B9E', border: 'none!important', marginBottom:'3%!important', minHeight: 'unset!important'}}>
                <Accordion className={fsStyle.accordionElement} sx={{minHeight: 'unset!important'}}   expanded={expanded === item.id} onChange={handleChange(item.id)}>
                  <AccordionSummary className={fsStyle.accordionSummary}
                    expandIcon={expanded === item.id?<Typography variant='h4' className='icon-arrow-down3' sx={{color: '#ffffff'}}></Typography>:<Typography variant='h4' className='icon-arrow-down3' sx={{color: '#ffffff'}}></Typography>}
                  >
                    <Box className={fsStyle.accordionTitleContainer}>
                      <Box className={fsStyle.accordionTitleDivContainer} sx={{width: '100%!important'}}>
                        <Typography variant='h6' className={jnStyles.jnL4}>I linguaggi del web</Typography>
                      </Box>    
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails className={fsStyle.accordionDetailContainer} 
                  sx={{backgroundColor: '#B34B9E!important', 
                    padding: '10%!important', 
                    paddingTop: '0!important', 
                    height: 'auto!important', 
                    overflowY: 'hidden!important'}}>
                    <Box sx={{borderBottom: '1px solid #ffffff', padding: '10px 0'}}>
                      <Typography className={jnStyles.jnM1}>{item.contentText}</Typography>
                      <Typography className={jnStyles.jnP2}>Stimato 45 m</Typography>
                    </Box>
                    <Box sx={{borderBottom: '1px solid #ffffff', padding: '10px 0'}}>
                      <Typography className={jnStyles.jnM1}>{item.contentText}</Typography>
                      <Typography className={jnStyles.jnP2}>Stimato 45 m</Typography>
                    </Box>
                    <Box sx={{padding: '10px 0'}}>
                      <Typography className={jnStyles.jnM1}>{item.contentText}</Typography>
                      <Typography className={jnStyles.jnP2}>Stimato 45 m</Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Container>
            )}
        </Container>
    </Container>
  );
}