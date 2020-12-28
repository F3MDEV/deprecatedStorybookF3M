import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

export default (props) => (
  <FormControl className='w-100' error={props.errorState}>
    <InputLabel htmlFor='adornment-password' shrink='true' className={props.classesLabel}>
      {props.label}
    </InputLabel>
    <Input
      {...props.input}
      readOnly={props.readOnly}
      type={props.type}
      placeholder={props.placeholder}
      required={props.required}
      className={props.classes}
    />
    <FormHelperText>{props.errorMessage}</FormHelperText>
  </FormControl>
);
