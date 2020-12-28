import 'date-fns';
import React from 'react';

// OUTSIDE COMPONENTS
import TextField from '@material-ui/core/TextField';

export default function DropDownF3M(props) {

    return (
        <TextField
            id={props.id}
            className={`text-nowrap ${props.classes}`}
            select
            fullWidth
            color='text'
            //margin='dense'
            label={props.labelText}
            onChange={props.onChangeInput}
            InputLabelProps={{ shrink: true }}
            //className={classes.textField}
            SelectProps={{
                native: true,
                /* MenuProps: {
                  className: classes.menu,
                } */
      }}
      margin='normal'
    >
      {props.dataContent}
    </TextField>
  );
}
