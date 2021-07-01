import * as React from "react";
import { FunctionComponent } from "react";

// OUTSIDE COMPONENTS
import { makeStyles } from "@material-ui/core";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
//import Box from '@material-ui/core/Box';

interface FilterPanelProps {

}

const FilterPanel: FunctionComponent<FilterPanelProps> = ({
}) => {
  const useStyles = makeStyles(() => ({
    root: {
      '&.MuiFormControl-root': {
        paddingRight: 35,
        paddingLeft: 15
      },
      '&.MuiFormLabel-root': {
        textAlign: 'left',
        paddingBottom: 8,
        fontSize: 16,
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
    },
    body1: {
      fontWeight: 700,
      whiteSpace: 'nowrap',
      paddingRight: 20
    },
    dFlex: {
      display: 'flex'
    },
  }
  ));

  const classes = useStyles();

  const marks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '10',
    },
    {
      value: 40,
      label: '20',
    },
    {
      value: 60,
      label: '30',
    },
    {
      value: 80,
      label: '40',
    },
    {
      value: 100,
      label: '50',
    },
  ];

  return (
    <>
      <div className={`${classes.containerFilter}`}>
        <FormControl component="div" className={`${classes.root} ${classes.borderFormControl}`}>
          <FormLabel component="legend" className={`${classes.root}`}>Utentes</FormLabel>
          <RadioGroup aria-label="gender" name="gender1">
            <FormControlLabel value="female" control={<Radio color="primary" />} label="Ativos" />
            <FormControlLabel value="male" control={<Radio color="primary" />} label="Inativos" />
            <FormControlLabel value="other" control={<Radio color="primary" />} label="Todos" />
          </RadioGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="Óbitos"
                color="primary"
              />
            }
            label="Óbitos"
          />
        </FormControl>

        <FormControl component="div" color="primary" className={`${classes.root} ${classes.borderFormControl}`}>
          {/*       <FormLabel component="legend" className={`${classes.root}`}>Tipo de documento</FormLabel>
      <RadioGroup aria-label="gender" name="gender1">
        <FormControlLabel value="female" control={<Radio color="primary"/>} label="SNS" />
        <FormControlLabel value="male" control={<Radio color="primary"/>} label="CESD" />
        <FormControlLabel value="other" control={<Radio color="primary"/>} label="CEDGS" />
        <FormControlLabel value="disabled" disabled control={<Radio color="primary"/>} label="DEE" />
      </RadioGroup> */}
        </FormControl>

        <FormControl component="div" color="primary" className={`${classes.root}`}>
          <FormLabel component="legend" className={`${classes.root}`}>Pesquisa</FormLabel>
          <div className={`${classes.dFlex}`}>
            <RadioGroup aria-label="gender" name="gender1">
              <FormControlLabel value="female" control={<Radio color="primary" />} label="Igual a" />
              <FormControlLabel value="male" control={<Radio color="primary" />} label="Diferente de" />
              <FormControlLabel value="other" control={<Radio color="primary" />} label="Contém" />
              <FormControlLabel value="disabled" disabled control={<Radio color="primary" />} label="Começa com" />
            </RadioGroup>
            <RadioGroup aria-label="gender" name="gender1">
              <FormControlLabel value="female" control={<Radio color="primary" />} label="É vazio" />
              <FormControlLabel value="male" control={<Radio color="primary" />} label="Não Contem" />
              <FormControlLabel value="other" control={<Radio color="primary" />} label="Termina com" />
              <FormControlLabel value="disabled" disabled control={<Radio color="primary" />} label="Não é vazio" />
            </RadioGroup>
          </div>
        </FormControl>
      </div>

      <div className={`${classes.containerSlider}`}>
        <Typography id="discrete-slider-custom" gutterBottom component="div" className={`${classes.body1}`}>
          Nº de resultados
        </Typography>
        <Slider
          //defaultValue={20}
          //getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-custom"
          step={20}
          //valueLabelDisplay="auto"
          marks={marks}
        />
      </div>
    </>
  );
};

export default FilterPanel;
