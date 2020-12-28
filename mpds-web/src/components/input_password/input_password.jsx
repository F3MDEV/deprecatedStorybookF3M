import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function Password(props) {
  const [values, setValues] = React.useState({
    showPassword: false
  });

  /* const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  }; */

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl className={`w-100 ${props.classes}`} error={props.errorState}>
      <InputLabel
        htmlFor='adornment-password'
        shrink='true'
        className={props.classesLabel}
      >
        {props.label}
      </InputLabel>
      <Input
        {...props.input}
        id='adornment-password'
        readOnly={props.readOnly}
        type={values.showPassword ? 'text' : 'password'}
        value={values.password}
        className={props.classes}
        // onChange={handleChange('password')}
        required={props.required}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              color='primary'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>{props.errorMessage}</FormHelperText>
    </FormControl>
  );
}
