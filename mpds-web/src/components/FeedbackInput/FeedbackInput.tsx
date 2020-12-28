import React from 'react';
import { useField } from 'react-form';
import TextField from '@material-ui/core/TextField';
import './FeedbackInput.scss';
import { isDefined } from '../../utils/utils';
import MUI_TEXTFIELD_STYLE from './FeedbackInput.mui.style';
import { makeStyles } from '@material-ui/core/styles';

type ValidationFnType = (
  value: string,
  instance: any
) => string | false | object | undefined | null;
type FilterFnType = (value: string, instance: any) => string;
type OnChangeFnType = (instance: any) => void;

interface FeedbackInputProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  autocomplete?: boolean;
  defaultValue?: string;
  field: string;
  infoMessage?: string;
  successMessage?: string;
  maxLength?: number;
  maxLengthMessage?: string;
  forceMaxLength?: boolean;
  minLength?: number;
  minLengthMessage?: string;
  readOnly?: boolean;
  shrink?: boolean;
  mask?: FilterFnType;
  customValidation?: ValidationFnType;
  // `input` types + custom types (Business logic)
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
  validationType?: string;
  customClasses?: string;
  customLabelClasses?: string;
  customInputClasses?: string;
  required?: boolean;
  endAdornment?:any;
  value?:any;
  disabled?:boolean;
  onChange?:OnChangeFnType;
  onBlur?:OnChangeFnType;
}

const FeedbackInput = ({
  id,
  name,
  label,
  defaultValue = '',
  placeholder,
  autocomplete = true,
  field,
  infoMessage,
  successMessage,
  maxLength,
  maxLengthMessage,
  forceMaxLength = false,
  minLength,
  minLengthMessage,
  readOnly,
  shrink,
  mask,
  customValidation,
  validationType,
  customClasses,
  customLabelClasses,
  customInputClasses,
  required,
  endAdornment,
  value,
  disabled,
  onChange,
  onBlur
}: FeedbackInputProps) => {
  /**
   * Setup validation function.
   * Used in scenarios that `minLength`, `maxLength` or `mask` is/are defined.
   */
  const thereAreValidationsToBeMade = [minLength, customValidation].some((prop) =>
    isDefined(prop)
  );
  let validationFn;

  if (thereAreValidationsToBeMade) {
    validationFn = (value: string, instance: any) => {
      if (
        !forceMaxLength &&
        isDefined(maxLength) &&
        value &&
        value.length > (maxLength as number)
      )
        return maxLengthMessage;
      if (isDefined(minLength) && value.length < (minLength as number))
        return minLengthMessage;
      if (isDefined(customValidation))
        return (customValidation as ValidationFnType)(value, instance);

      return false;
    };
  }

  /**
   * Setup filter function.
   * Used in scenarios that `maxLength` or `mask` is/are defined.
   */
  const thereAreFiltersToBeMade = [maxLength, mask].some((prop) => isDefined(prop));
  let filterFn;

  if (thereAreFiltersToBeMade) {
    filterFn = (value: string, instance: any) => {
      if (forceMaxLength && isDefined(maxLength) && value.length > (maxLength as number))
        return value.slice(0, -1);
      if (isDefined(mask)) return (mask as FilterFnType)(value, instance);

      return value;
    };
  }

  /**
   * Setup input properties - `react-form`
   */
  const {
    meta: { error, isTouched },
    getInputProps
  } = useField(field, {
    defaultValue,
    validate: validationFn,
    filterValue: filterFn
  });

  /**
   * Setup input style - `Material UI`
   */
  const useStyleLabel = makeStyles(MUI_TEXTFIELD_STYLE.label, {
    name: 'text-fiel-label'
  });
  const useStyleInput = makeStyles(MUI_TEXTFIELD_STYLE.input, {
    name: 'text-fiel-input'
  });
  const labelClasses = useStyleLabel();
  const inputClasses = useStyleInput();

  const getHelperMessage = () => {
    if (!isTouched && !!infoMessage) return infoMessage;
    if (isTouched && !!error) return error;
    if (isTouched && !error) return successMessage;
    return null;
  };

  const r_a = (Math.random()*10000) + Math.round(Math.random() * 100).toFixed(2) 

  return (
    <>
      <TextField
        id={id}
        label={label}
        name={name}
        placeholder={placeholder}
        className={customClasses}
        helperText={getHelperMessage()}
        disabled={disabled}
        required={required}
        InputLabelProps={{
          classes: labelClasses,
          className: customLabelClasses,
          shrink
        }}
        InputProps={{
          readOnly,
          type: validationType,
          classes: inputClasses,
          className: customInputClasses,
          endAdornment,
          value,
        }} 
        inputProps={{
          //autoComplete: !autocomplete ? "off" : null,
          // The autocomplete = "off" don't work in chrome
          autoComplete: !autocomplete ? "f3m-autocomplete-off-"+r_a : null, 
          ...getInputProps()
        }}
        error={!!error}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
};

export default FeedbackInput;
