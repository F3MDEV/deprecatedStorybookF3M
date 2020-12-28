import React from "react";
import { useField } from "react-form";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { isDefined } from "../../utils/utils";
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';

//CSS, STYLES & MEDIA ASSETS
import variables from "../../assets/bootstrap/scss/_variables.scss"

type onChangeFnType = (value: any) => void | false | undefined;
type ValidationFnType = (
  value: string,
  instance: any
) => String | false | object | undefined | null;

interface FeedbackAutocompleteProps {
  id: string;
  label: string;
  defaultValue?: any;
  field: string;
  disabled?:boolean;
  options: any;
  fixedOptions: any;
  includeInputInList?: boolean;
  size?: "medium" | "small" | undefined;
  disableCloseOnSelect?: boolean;
  onChangeField?: onChangeFnType;
  required?: boolean;
  requiredMessage?: string;
}

//Scss variable
const disabledColor = variables.mainText;
const primaryColor = variables.primary;

const useStyles = makeStyles(theme => ({
  inputRoot: {
    "&.MuiAutocomplete-inputRoot": {
      paddingBottom: 3,
    }
  },
  tagSizeSmall:{
    "&.MuiAutocomplete-tagSizeSmall": {
      backgroundColor: primaryColor,
      paddingLeft: 10,
      color: 'white',
      marginTop: 5,
      marginLeft: 0
    }
  },
  endAdornment:{
    "&.MuiAutocomplete-endAdornment": {
      paddingLeft: 5,
      paddingRight: 5
    }
  },
/*   deleteIcon:{
    "&.MuiChip-deleteIcon": {
      color: 'white',
    }
  }	 */
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const FeedbackAutocompleteMultiple = ({
  id,
  label,
  field,
  defaultValue,
  disabled = false,
  options,
  fixedOptions,
  includeInputInList = false,
  size = "medium",
  disableCloseOnSelect = false,
  onChangeField,
  required=false,
  requiredMessage="AAA",
}: FeedbackAutocompleteProps) => {
  /**
   * Setup validation function.
   * Used in scenarios that `required` is defined.
   */
  const thereAreValidationsToBeMade = [required].some(prop =>
    isDefined(prop)
  );
  let validationFn;

  if (thereAreValidationsToBeMade) {
    validationFn = (value: string, instance: any) => {
      if (value.length === 0) return requiredMessage;
      return false;
    };
  }

  const {
    value=defaultValue, setValue,
    meta: { error, isTouched },
    getInputProps
  } = useField(field, {
    defaultValue,
    validate: validationFn
  }); 

  const handleChangeMultiple = (e:any, v: any ) => {
    let find = false
    let i = 0, j = 0;
    let numSelected = v.length;

    //não permitir retirar a selecção dos que são fixed
    let numFixed = fixedOptions.length;
    for (i = 0; i < numFixed; i++){
      find = false;
      numSelected = v.length;
      for (j = 0; j < numSelected; j++){
        if (v[j].name === fixedOptions[i].name){
          find = true;
          break;
        }
      }
      if (!find){
        v.splice(i, 0, fixedOptions[i])
      }
    }

    numSelected = v.length;
    find = false;
    for (i = 0; i < numSelected; i++){
      for (j = 1; j < numSelected; j++){
        if (i !== j && v[i].name === v[j].name){
          find = true
          break;
        }
      }
      if(find){
        break;
      }  
    }
    if (!find)
    {
      setValue(v)
    }
    else {
      if(j > i) {
        v.splice(j)
        v.splice(i)
        setValue(v)
      } else{
        v.splice(i)
        v.splice(j)
        setValue(v)
      }
    }
    
  };

  const isSelected = (name:string) => {
    let val = false
    let num = value.length
    for (let i = 0; i < num; i++){
      if (value[i].name === name){
        val = true;
        break;
      }
    }
    return val;
  }

  const isFixed = (name:string) => {
    let result = false;
    let numFixed = fixedOptions.length;
    for (let i = 0; i < numFixed; i++){
      if (fixedOptions[i].name === name){
        result = true;
        break;
      }
    }
    return result;
  }

  const r_a = (Math.random()*10000) + Math.round(Math.random() * 100).toFixed(2);

/*   const getHelperMessage = () => {
    if (isTouched && !!error) return error;
    return null;
  }; */

  const classes = useStyles();

  const chipProps = {
    deleteIcon: <ClearIcon style={{fill: "white", marginLeft: 2, marginRight: 10}}/>,
  };

  return (
    <>
      <Autocomplete 
        id={id}
        includeInputInList={includeInputInList}
        options={options}
        classes={classes}
        getOptionLabel={option => option.name !== undefined ? option.name : "" }
        renderInput={params => (
          <TextField {...params} 
          variant="standard" 
          label={label}
          fullWidth
          InputLabelProps={{ 
            shrink: true ,
            className: "label-font-size"
          }}
         
          inputProps={{
            ...params.inputProps,
            autoComplete: "f3m-autocomplete-mult-off-"+r_a,
          }}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              disabled={isFixed(option.name)}
            />
          ))
        }
        onChange={handleChangeMultiple}
        disabled={disabled}
        multiple
        disableClearable
        size={size}
        disableCloseOnSelect={disableCloseOnSelect}
        //defaultValue = {defaultValue}
        value={value}
        ChipProps={chipProps}
        getOptionSelected={(option, value) => {
          return option.name === value.name;
        }}
        autoSelect={true}
        renderOption={(option) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={isSelected(option.name)}
              color="default"
              disabled={isFixed(option.name)}
            />
            {option.name}
          </React.Fragment>
        )}
      /> 
    </>
  );
};

export default FeedbackAutocompleteMultiple;

