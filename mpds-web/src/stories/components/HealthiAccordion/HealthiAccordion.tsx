import "@fontsource/open-sans"; 
import * as React from 'react';
import { FunctionComponent } from "react";

// OUTSIDE COMPONENTS
import { makeStyles } from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography';


//ICONS
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CancelIcon from '@material-ui/icons/Cancel';

interface HealthiAccordionProps {
  /**
     * Title of the medication
  */
  medTitle?: string;
  /**
     * Insert elements in the accordion details.
  */
  accordionDetails?: React.ReactNode;
  /**
     * Insert a button for the dropdown.
  */
  dropdownButton?: React.ReactNode;
  /**
     * Info about the med amount.
  */
  medAmount?: React.ReactNode;
  /**
     * How many times the patient takes the medication a day.
  */
  dailyRoutine?: string;
  /**
     * Insert elements in the side icons area.
  */
  sideIcons?: React.ReactNode;
}

const HealthiAccordion: FunctionComponent<HealthiAccordionProps> = ({
  medTitle = "Tramadol + Paracetamol, 37.5 mg + 325 mg, Comprimido efervescente, Fita termossoldada",
  medAmount,
  dailyRoutine = "3 por dia",
  accordionDetails= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lacinia dui augue, vitae pulvinar leo pretium at. Nunc est mauris, ultrices eu elit quis, rhoncus facilisis velit. Praesent auctor eu sapien sed ultricies. Fusce at tellus varius, pharetra dolor non, feugiat ipsum. Mauris sodales enim nulla, ac pharetra massa porttitor in. Ut id faucibus eros. Morbi pretium sed sapien sit amet scelerisque. Maecenas feugiat gravida fermentum. Aliquam malesuada ligula id lectus facilisis finibus. Pellentesque consequat nibh ut porttitor volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent eget turpis id ligula ultricies rhoncus vitae at lacus. Sed efficitur auctor nibh sed maximus. Duis ullamcorper quam in fringilla egestas. Vestibulum mattis varius ante at blandit. Phasellus felis erat, sollicitudin at sodales id, auctor at ligula.",
  dropdownButton,
  sideIcons = <>
    <CancelIcon style={{color: "#04a0aa"}} className="my-auto mx-3">
    </CancelIcon>
  </>
}) => {
  
  const useStyles = makeStyles(() => ({
    root: {
      "&.MuiAccordion-root":{
        "&.MuiPaper-elevation1":{
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }
      },
      "&.MuiAccordionSummary-root":{
        backgroundColor: "#ccecee",
        border: "1px solid",
        borderColor: "#8ccdd3",
        borderRadius: 5,
        paddingRight: '1rem',
        paddingLeft: '1rem',
        height: 60
      },
      "&.MuiAccordionDetails-root":{
        backgroundColor: "#f8f8f8",
        border: "1px solid",
        borderColor: "#8ccdd3",
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        marginTop: "-4px"
      },
    },
    body1: {
      fontSize: 14,
      color: "#026066",
      textDecoration: 'none solid rgb(2, 96, 102)',
      fontFamily: 'Open Sans'
    },
    title:{
      fontFamily: 'Open Sans',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      boxOrient: 'vertical',
      display: '-webkit-box',
      lineClamp: 2,
      padding: 0,
      marginTop: 'auto',
      width: '100%',
      fontWeight: 'bold'
    },
    dailyRoutineMeds:{
      padding: 0,
      marginTop: 'auto',
      marginBottom: 'auto',
      width: '100%'
    }
  }));

  const classes = useStyles();

  return (
    <>
    <Accordion className={classes.root}>
        <AccordionSummary
          className={classes.root}
          expandIcon={<ExpandMoreIcon style={{color: "#04a0aa"}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header">
          {dropdownButton}
          <Typography className={`${classes.body1} ${classes.title}`}>
            {medTitle}
          </Typography>
          {medAmount}
          <Typography className={`${classes.body1} ${classes.dailyRoutineMeds}`}>
            {dailyRoutine}
          </Typography>
          {sideIcons}
        </AccordionSummary>
        <AccordionDetails className={classes.root}>
          {accordionDetails}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default HealthiAccordion;