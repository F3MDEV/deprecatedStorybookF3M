import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";

type onChangeFnType = (value: string) => void | false | undefined;

interface WoundsCharacterisationExudateOtherProps {
  value: string;
  label: string;
  disabled?:boolean;
  onBlur: onChangeFnType,
}


const WoundsCharacterisationExudateOther = ({
  value,
  label,
  disabled = false,
  onBlur,
}: WoundsCharacterisationExudateOtherProps) => {

    const [valueExudateOther, setValueExudateOther] = useState(value);
    const [valueChange, setValueChange] = useState(false);

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueExudateOther(e.target.value);
        setValueChange(true);
    }

    const onBlurField = () => {
        if (valueChange){
            onBlur(valueExudateOther)
        }
    }

    useEffect(() => {
        setValueExudateOther(value)
    }, [value]);

    return (
        <TextField
            disabled={disabled}
            InputLabelProps={{ shrink: true }}
            className="w-100"
            label={label}
            value={valueExudateOther}
            onChange={onChangeValue}
            onBlur={onBlurField}
        />
    );
};

export default WoundsCharacterisationExudateOther;
