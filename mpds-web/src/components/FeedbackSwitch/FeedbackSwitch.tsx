import React from "react";
import { useField } from "react-form";
import Switch from '@material-ui/core/Switch';

import "./FeedbackSwitch.scss"
import { withStyles } from '@material-ui/core/styles';

interface FeedbackSwitchProps {
  id?: string;
  defaultValue?: boolean;
  field: string;
  disabled?:boolean;
  labelTrue?: String;
  labelFalse?: String
  classes?: any
}

const CustomFeebackSwitch = withStyles({
  switchBase: {
      '&$checked + $track': {
        backgroundColor: "#4CB3BA",
      },
    },
    checked: {},
    track: {},
})(Switch);

const FeedbackSwitch = ({
  id,
  defaultValue = false,
  field,
  disabled = false,
  labelTrue ="",
  labelFalse= "",
  classes = ""
}: FeedbackSwitchProps) => {

  /**
   * Setup input properties - `react-form`
   */
  const {
    value=defaultValue, setValue,
    meta: { error, isTouched },
    getInputProps
  } = useField(field, {
    defaultValue,
  });

  const handleChange = (e:any) => {
    const selected = e.target.checked;
    setValue(selected);
    defaultValue=selected;
  };

  return (
    <>
     <CustomFeebackSwitch
        id={id}
        checked={value}
        color="default"
        className={ value ? "set-color-primary switch-user-margin-fix": "switch-user-margin-fix"}
        disabled={disabled}
        onClick={handleChange}
        
      />
      <label className={ value ? "switch-on" : "switch-off"}>
        {value ? labelTrue : labelFalse}
      </label>    
    </>
  );
};

export default FeedbackSwitch;
