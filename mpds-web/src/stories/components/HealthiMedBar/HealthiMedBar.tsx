import 'typeface-roboto-condensed';
import "@fontsource/open-sans";
import * as React from 'react';
import { FunctionComponent } from 'react';

// OUTSIDE COMPONENTS
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core";

//ICONS
import DuplicateIcon from './duplicate.svg';

export interface HealthiMedBarProps {
    /**
     * Insert the "big" buttons.
     */
    majorButtons?: React.ReactNode;
    /**
     * Key area section.
     */
    keyArea?: React.ReactNode;
    /**
     * Cost area section.
     */
    costArea?: React.ReactNode;
    /**
     * Classes of the toolbar
     */
    toolbarClasses?: string;
  }

const HealthiMedBar: FunctionComponent<HealthiMedBarProps> = ({
    majorButtons = <>
      <Button color="primary" style={{paddingRight: '1.5rem', paddingLeft: '1.5rem', marginRight: '0.5rem', textTransform: 'uppercase'}}>Delete</Button>
      <Button color="primary" variant="contained" style={{paddingRight: '1.5rem', paddingLeft: '1.5rem', marginRight: '0.5rem', textTransform: 'uppercase'}}><img src={DuplicateIcon} style={{marginRight: '0.5rem'}}/>Duplicate</Button>
    </>,
    keyArea = "Chave 16",
    costArea = "5000€",
    toolbarClasses
}) => {
  const useStyles = makeStyles(() => ({
  root:{
      "&.MuiToolbar-root":{
        background: "#f2f2f2",
        bottom: 0,
        position: 'absolute',
        width: '100%',
        height: 43,
        minHeight: 43,
        display: 'flex',
        justifyContent: 'space-between',
        zIndex: 1
      },
      "&.MuiFormControlLabel-root":{
        marginBottom: 0,
        "& .MuiTypography-body1":{
          fontSize: 14
        },
      }
  },
  costText:{
      fontFamily: 'Open Sans',
      fontSize: 16,
      display: 'flex',
      marginLeft: '0.5rem'
  },
  digitalKey:{
      fontFamily: 'Roboto Condensed',
      fontSize: 12,
      display: 'flex'
  },
  dFlex:{
    display: 'flex'
  },
  textUppercase:{
    textTransform: 'uppercase',
  },
  px4:{
    paddingRight: '1.5rem',
    paddingLeft: '1.5rem'
  },
  mr2:{
    marginRight: '0.5rem'
  }
}));

const classes = useStyles();
    return (
      <>
        <Toolbar disableGutters className={`${classes.root} ${toolbarClasses}`}>
          <div className={`${classes.costText}`}>
            {costArea}
          </div>
          <div className={`${classes.digitalKey}`}>
            {keyArea}
          </div> 
          <div className={`${classes.dFlex}`}>
            {majorButtons}
          </div>
        </Toolbar>
      </>
    );
  };

export default HealthiMedBar;