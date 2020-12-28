import React from 'react';

// OUTSIDE COMPONENTS
import FormControl from '@material-ui/core/FormControl';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

export default (props) => (
  <FormControl>
    {/* <label htmlFor={props.name}>{props.label} </label> */}
    {/* <InputLabel htmlFor={props.name} shrink="true" className={props.classes}>{props.label}</InputLabel > */}
    <Input
      {...props.input}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      type={props.type}
      startAdornment={<InputAdornment position='start'>{props.icon}</InputAdornment>}
    />
  </FormControl>
);
