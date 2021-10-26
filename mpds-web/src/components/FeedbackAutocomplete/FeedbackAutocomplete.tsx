import React, { useEffect } from 'react';
import { useField } from 'react-form';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

//CSS, STYLES & MEDIA ASSETS
import variables from '../../assets/bootstrap/scss/_variables.scss';

type onChangeFnType = (value: any) => void | false | undefined;

interface FeedbackAutocompleteProps {
  id: string;
  label: string;
  defaultValue?: any;
  field: string;
  disabled?: boolean;
  options: any;
  includeInputInList?: boolean;
  size?: 'medium' | 'small' | undefined;
  disableCloseOnSelect?: boolean;
  onChangeField?: onChangeFnType;
  required?: boolean;
  noOptionsText: string;
  showTooltip?: boolean;
}

//Scss variable
const disabledColor = variables.mainText;
const primaryColor = variables.primary;

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    '&.MuiAutocomplete-inputRoot': {
      paddingBottom: 3
    }
  },
  tagSizeSmall: {
    '&.MuiAutocomplete-tagSizeSmall': {
      marginTop: 5,
      marginLeft: 0,
      backgroundColor: primaryColor
    }
  }
}));

const useStylesTooltip = makeStyles(theme => ({
  tooltip: {
    maxWidth: 500,//'none'
    //backgroundColor: theme.palette.common.white,
    font: "Nunito",
    color: "#494949",
    backgroundColor: "white",
    minWidth: 150,
    border: "solid",
    borderWidth: 1,
    borderColor: theme.palette.primary.main,
    fontSize: 12,
    margin: theme.spacing(1),
    marginLeft: 15,
    /* boxShadow: theme.shadows[1], */
    
  },
  arrow: {
    color: theme.palette.primary.main,
    top: 25,
  },
  popper:{
    zIndex: 11303,
  }
}));

const FeedbackAutocomplete = ({
  id,
  label,
  field,
  defaultValue,
  disabled = false,
  options,
  includeInputInList = false,
  size = 'medium',
  disableCloseOnSelect = false,
  onChangeField,
  required = false,
  noOptionsText,
  showTooltip = false
}: FeedbackAutocompleteProps) => {
  const {
    value = defaultValue,
    setValue,
    meta: { error, isTouched },
    getInputProps
  } = useField(field, {
    defaultValue
  });

  const classes = useStyles();
  const classesTooltip = useStylesTooltip();

  const handleChange = (e: any, v: any) => {
    setValue(v);
    if (onChangeField != undefined) {
      onChangeField(v);
    }
  };

  const r_a = Math.random() * 10000 + Math.round(Math.random() * 100).toFixed(2);

  const { t } = useTranslation();

  return (
    <>
      <Autocomplete
        id={id}
        includeInputInList={includeInputInList}
        options={options}
        renderOption={(option : any) => {
          return (showTooltip ?
            <div style={{width: '100%'}}>
              <Tooltip title={t(option.description).toString()} classes={classesTooltip} arrow placement='bottom'>
                <div style={{width: '100%'}}>{option.name}</div>
              </Tooltip>
            </div>
            : 
            <div>{option.name}</div>
          );
        }} 
        classes={classes}
        getOptionLabel={(option : any) => (option.name !== undefined ? option.name : '')}
        renderInput={(params : any) => (
          <TextField
            {...params}
            variant='standard'
            label={label}
            fullWidth
            className='pt-2 w-100 pb-3 px-0 pr-md-0 pl-md-0'
            InputLabelProps={{
              shrink: true,
              className: 'label-font-size'
            }}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'f3m-autocomplete-off-' + r_a
            }}
            required={required}
          />
        )}
        getOptionSelected={(option : any, value: any) => {
          return option.name === value.name;
        }}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        size={size}
        noOptionsText={noOptionsText}
      />
    </>
  );
};

export default FeedbackAutocomplete;
