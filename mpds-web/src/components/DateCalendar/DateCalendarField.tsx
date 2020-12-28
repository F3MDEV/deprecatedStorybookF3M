import 'date-fns';
import React, { FunctionComponent } from 'react';

// OUTSIDE COMPONENTS
import { KeyboardDatePicker } from '@material-ui/pickers';
 
export interface DateCalendarFieldProps {
    id? : any
    fullWidth? : any
    format? : any
    margin? : any
    labelText? : any
    inputLabelProps? : any
    valueInput? : any
    onChangeInput? : any
    KeyboardButtonProps? : any
    minDate? : any
    maxDate? : any
    autoOk? : any
    invalidDateMessage? : any
}

const DateCalendarField: React.FC<DateCalendarFieldProps> = ({
    id,
    fullWidth,
    format,
    margin,
    labelText,
    inputLabelProps,
    valueInput,
    onChangeInput,
    KeyboardButtonProps,
    minDate,
    maxDate,
    autoOk,
    invalidDateMessage
}) => {
    let cDate
    if (minDate == null) {
        cDate = '1900-01-01'
    } else {
        cDate = minDate
    }
    return (
        <KeyboardDatePicker
            id={id}
            fullWidth = {fullWidth}
            format="dd.MM.yyyy"
            margin="normal"
            label={labelText}
            InputLabelProps={inputLabelProps}
            value={valueInput}
            onChange={onChangeInput}
            KeyboardButtonProps={{
                'aria-label': 'change date',
                'style':{'outline': 'none'}
            }}
            minDate={minDate}
            maxDate={maxDate}
            autoOk={autoOk}
            invalidDateMessage={invalidDateMessage}


        />
    )
}

export default DateCalendarField;