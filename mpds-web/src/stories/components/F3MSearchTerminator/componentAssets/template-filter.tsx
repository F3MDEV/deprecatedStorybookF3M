import React, { FunctionComponent } from 'react';

import { makeStyles } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Chip from '@material-ui/core/Chip';

interface PatientResultsProps {
  tiposDocumento?: any,
  isOpen?: boolean
}

const TemplateFilters: FunctionComponent<PatientResultsProps> = ({
  tiposDocumento = ['SNS', 'CVP6', 'CVTP7a9', 'PTBR13']
}) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      '&.MuiFormControl-root': {
        paddingRight: 10,
        paddingLeft: 15
      },
      '&.MuiFormLabel-root': {
        textAlign: 'left',
        paddingBottom: 8,
        fontSize: 16,
        color: '#444444',
      },
      '&.MuiAccordionDetails-root': {
        display: "unset",
      },
      '&.MuiChip-root': {
        background: '#444444',
        color: '#FFFFFF',
        height: 18,
        marginLeft: 2.5,
        marginRight: 2.5
      },
      '&.MuiAccordionSummary-content': {
        height: 41,
      },
      "&.MuiAccordionSummary-root.Mui-expanded": {
        minHeight: 41,
        margin: 0
      },
      "&.MuiAccordion-root.Mui-expanded": {
        margin: 0,
      },
    },
    content: {
      "&.MuiAccordionSummary-content.Mui-expanded": {
        margin: 0,
      }
    },
    expanded: {
      '&.MuiAccordionSummary-root.Mui-expanded': {
        minHeight: '41px',
        height: '41px !important'
      }
    },
    radio: {
      //paddingBottom: 0,
      //paddingTop: 0
      padding: '5px',
    },
    checkbox: {
      padding: '5px',
    },
    label: {
      '& .MuiTypography-body1': {
        fontSize: 14,
      },
      '&.MuiFormControlLabel-root': {
        marginLeft: '-6px',
      }
    },
    containerFilter: {
      display: 'flex',
    },
    containerSlider: {
      display: 'flex',
      paddingRight: 35,
      paddingLeft: 15,
      paddingTop: 10
    },
    borderFormControl: {
      //borderRight: `1px solid ${theme.palette.border.main}`,
      borderRight: `1px solid #DEDEDE`,
    },
    limitDiv: {
      maxHeight: '156px',
      overflowY: 'auto'
    },
    labelCheckbox: {
      width: '100%',
      marginRight: 0,
      marginLeft: '​-16px !important'
    },
    body1: {
      fontWeight: 700,
      whiteSpace: 'nowrap',
      paddingRight: 20
    },
    dFlex: {
      display: 'flex'
    },
    labelSmall: {
      fontSize: 9
    },
    heading: {
      alignSelf: 'center'
    },
    w100: {
      width: '100%',
    },
    w50: {
      width: '50%',
    },
    formControlLabelDisplay: {
      width: "50%",
      marginRight: 0,
    },
    containerChipsFilter: {
      paddingLeft: '10px',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    }
  }
  ));

  const classes = useStyles();

  const steps = [10, 20, 30, 40, 50];
  const sliderSteps = steps.map(s => ({
    value: s,
    label: `${s}`,
  }));

  const atividadeUtente = [
    'Active',
    'Inactive',
    'All'
  ];

  const filtros = [
    'Equal',
    'Different',
    'Have it',
    'Does not have it',
    'Begin',
    'Does not begin',
    'Empty',
    'It is not empty'
  ];

  return (
    <>
      <Accordion className={`${classes.root}`}>
        <AccordionSummary
          className={`
              ${classes.root}
              ${classes.expanded}
              ${classes.content}
          `}
          expandIcon={<ExpandMoreIcon color="primary" />}
          IconButtonProps={{
            disableRipple: true
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <FilterListIcon/>
          <Typography variant='caption'
            className={classes.heading}>Filter</Typography>
          <div className={classes.containerChipsFilter}>
            <Chip size="small" label={'Filter One'} className={`${classes.root} ${classes.labelSmall}`} />
            <Chip size="small" label={'Filter Two'} className={`${classes.root} ${classes.labelSmall}`}/>
            <Chip size="small" label={'Filter Three'} className={`${classes.root} ${classes.labelSmall}`} />
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.root}>
          <div className={`${classes.containerFilter}`}>
            <FormControl component="div" className={`${classes.root} ${classes.borderFormControl} ${classes.w50} `}>
              <FormLabel component="legend" className={`${classes.body1} ${classes.root}`}>{'Patients'}</FormLabel>
              <div className={`${classes.limitDiv}`}>
                <RadioGroup>
                  {atividadeUtente.map((_op, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        className={`${classes.label}`}
                        value={i.toString()}
                        control={<Radio color="primary" size="small" className={`${classes.radio}`} />}
                        label={<Typography>{atividadeUtente[i]}</Typography>}
                      />
                    );
                  })}
                </RadioGroup>
                <FormControlLabel
                  className={`${classes.label} ${classes.labelCheckbox}`}
                  control={
                    <Checkbox
                      name="Óbitos"
                      color="primary"
                      className={`${classes.checkbox}`}
                    />
                  }
                  label={'Deaths'}
                />
              </div>
            </FormControl>

            <FormControl component="div" color="primary" className={`${classes.root} ${classes.borderFormControl} ${classes.w50}`}>
              <FormLabel component="legend" className={`${classes.body1} ${classes.root}`}>{'Documents'}</FormLabel>
              <div className={`${classes.limitDiv}`}>
                <RadioGroup>
                  {tiposDocumento.map((op: any, i: any) => {
                    return (
                      <FormControlLabel
                        key={op + '_' + tiposDocumento[i].key}
                        className={classes.label}
                        value={tiposDocumento[i].key}
                        control={<Radio color="primary" size="small" className={`${classes.radio}`} />}
                        label={<Typography>{tiposDocumento[i]}</Typography>} />
                    );
                  })}
                </RadioGroup>
              </div>
            </FormControl>

            <FormControl component="div" color="primary" className={`${classes.root}  ${classes.w100} `}>
              <FormLabel component="legend" className={`${classes.body1} ${classes.root}`}>{'Search'}</FormLabel>
              <div className={`${classes.dFlex} ${classes.limitDiv}`}>
                <RadioGroup
                  row
                >
                  {filtros.map((op, i) => {
                    return (
                      <FormControlLabel
                        key={op + '_' + i}
                        className={`${classes.formControlLabelDisplay} ${classes.label}`}
                        value={i.toString()}
                        control={<Radio color="primary" size="small" className={`${classes.radio}`} />}
                        label={<Typography>{filtros[i]}</Typography>}
                      />
                    );
                  })}
                </RadioGroup>
              </div>
            </FormControl>
          </div>

          <div className={`${classes.containerSlider}`}>
            <Typography id="discrete-slider-custom" gutterBottom component="div" className={`${classes.body1}`}>
              Results
            </Typography>
            <Slider
              marks={sliderSteps}
              step={steps[0]}
              min={steps[0]}
              max={steps[4]}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  )
};

export default TemplateFilters;
