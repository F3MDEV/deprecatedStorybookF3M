import 'date-fns';
import React from 'react';

// OUTSIDE COMPONENTS
import TextField from '@material-ui/core/TextField';

export default function TextFieldF3M(props) {

    return (
        <TextField
            className={`text-nowrap ${props.classes}`}
            id={props.id}
            style={{ fontSize: '263px' }}
            margin="normal"
            fullWidth
            InputLabelProps={props.inputLabelProps}
            label={props.labelText}
            placeholder={props.placeholder}
            onChange={props.onChangeInput}
            value={props.defaultValueInput || ''}
        //className={classes.textField, classes.labelRoot}
        />
    )
}