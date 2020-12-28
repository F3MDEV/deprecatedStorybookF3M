import 'date-fns';
import React, { FunctionComponent, ChangeEvent } from 'react';

// OUTSIDE COMPONENTS
import TextField from '@material-ui/core/TextField';
import { InputLabelProps, makeStyles } from '@material-ui/core';

export interface TextFieldF3MProps {
    /**
        * Classes in the root of the textfield.
        */
    classes?: string,
    /**
        * Id of the textfield.
        */
    id?: string,
    /**
        * Props applied to the InputLabel element. (Check Material UI TextField API for more information).
        */
    inputLabelProps?: Partial<InputLabelProps> | undefined,
    /**
        * The label content.
        */
    labelText: string,
    /**
        * The short hint displayed in the input before the user enters a value.
        */
    placeholder?: string,
    /**
        * Callback fired when the value is changed.
        */
    onChangeInput?: ((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) | undefined,
    /**
        * The default value of the input.
        */
    defaultValueInput?: string,
    /**
        * The width value of the input.
        */
    widthOfTextfield?: string | number
}

export const TextFieldF3M: FunctionComponent<TextFieldF3MProps> = ({
    classes,
    id,
    inputLabelProps,
    labelText,
    placeholder,
    onChangeInput,
    defaultValueInput,
    widthOfTextfield = "200px"
}) => {
    const useStyles = makeStyles(theme => ({
        textNowrap: {
            whiteSpace: "normal",
        },
    }));
    
    const styleClass = useStyles();
    return (
        <TextField
            className={`${styleClass.textNowrap} ${classes}`}
            id={id}
            style={{ fontSize: '263px', width: widthOfTextfield }}
            margin="normal"
            fullWidth
            InputLabelProps={inputLabelProps}
            label={labelText}
            placeholder={placeholder}
            onChange={onChangeInput}
            value={defaultValueInput || ''}
        />
    )
}

export default TextFieldF3M;