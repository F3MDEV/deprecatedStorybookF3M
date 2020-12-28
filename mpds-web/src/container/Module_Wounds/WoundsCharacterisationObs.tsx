import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";

type onChangeFnType = (value: string) => void | false | undefined;

interface WoundsCharacterisationObsProps {
  value: string;
  disabled?:boolean;
  onBlurObs: onChangeFnType,
}


const WoundsCharacterisationObs = ({
  value,
  disabled = false,
  onBlurObs,
}: WoundsCharacterisationObsProps) => {

    const [valueObs, setValueObs] = useState(value);
    const [valueChange, setValueChange] = useState(false);

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValueObs(e.target.value);
        setValueChange(true);
    }

    const onBlurField = () => {
        if (valueChange){
            onBlurObs(valueObs)
        }
    }

    useEffect(() => {
        setValueObs(value)
    }, [value]);

    return (
        <TextField 
            className="pl-3 font-size-14-px" 
            fullWidth 
            multiline 
            id="obs"
            disabled={disabled} 
            value={valueObs}
            onChange={onChangeValue}
            onBlur={onBlurField}
        />
    );
};

export default WoundsCharacterisationObs;
