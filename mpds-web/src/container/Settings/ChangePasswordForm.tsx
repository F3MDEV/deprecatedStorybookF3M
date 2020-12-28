import React from "react";
import { useForm } from "react-form";
import { useTranslation } from "react-i18next";


//INSIDE COMPONENTS
import FeedbackInput from "../../components/FeedbackInput/FeedbackInput";

//OUTSIDE COMPONENTS
import { Typography } from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from '@material-ui/core/InputAdornment';


//ICONS
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';


//CSS
import './ChangePasswordForm.scss'

const ChangePasswordForm = ({
  changeShowFormPass,
  email,
  save,
  scroll,
  descriptionElementRef
}: {
  changeShowFormPass: any;
  email: string;
  save: any;
  scroll: any;
  descriptionElementRef: any;
}) => {
  
  const { t } = useTranslation();

  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
    passwordValue: ""
  });

  const {
    Form,
    meta: { isTouched, canSubmit}
  } = useForm({
    validate: (values: any, instance: any) => {
      if (values.password !== values.confirmPassword) {
        instance.setMeta({ error: "passDiff"});
      } else {
        instance.setMeta({ error: null});
      }
      
    },
    onSubmit: async (values: any, instance: any) => {
      save(values, email);
    }
    //debugForm: true
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownPassword = (event:any) =>  {
    event.preventDefault();
  };

  const closeShowFormPass = () => {
    changeShowFormPass();
  };

  const handleChangePasswordField = (instance: any) => {
    setValues({...values, passwordValue: instance.target.value})
  }

  return (
    <Form className="form-dialog">
      <DialogTitle disableTypography={true}>
        <IconButton color="primary"
          className="float-right outline-none"
          onClick={closeShowFormPass}
          centerRipple={true}
        >
          <CloseIcon className="my-auto" fontSize='large' />  
        </IconButton>
        
        <IconButton color="primary"
          className="float-right outline-none"
          centerRipple={true}
          type="submit"
          disabled={!(isTouched && canSubmit)}
        >                      
          <SaveIcon className="my-auto" fontSize='large' />  
        </IconButton>
            
        <Box fontFamily="Nunito" fontSize={18} fontWeight={700} className="text-uppercase mt-3" >
          {t('ChangePassword.ChangePass')} 
        </Box>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography className="mb-5 px-lg-5 px-md-3 px-sm-2 px-xs-0" color="textPrimary" variant="body2">
              {t('infoPasswordChange')}
            </Typography>

            <div className="mx-auto width-field-change-password px-0 px-md-5">
              <FeedbackInput
                label={t("Login.newpassword")}
                customClasses="w-100"
                customInputClasses="py-1"
                required
                field="password"
                autocomplete={false}
                minLength={8}
                minLengthMessage={t('min-len-password-error')}
                shrink
                validationType={values.showPassword ? 'text' : 'password'}
                value={values}
                endAdornment={
                  <InputAdornment position="end" className="pb-2">
                  <IconButton
                    aria-label="toggle password visibility"
                    color="primary"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}>
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
                }
                
                onChange={handleChangePasswordField}
                />
            </div>
            <div className="mx-auto width-field-change-password px-0 px-md-5 pt-4">
              <FeedbackInput
                label={t("Login.confirmPassword")}
                field="confirmPassword"
                autocomplete={false}
                required
                customClasses="w-100"
                customInputClasses="py-1"
                minLength={8}
                minLengthMessage={t('min-len-password-error')}
                shrink
                validationType={values.showConfirmPassword ? 'text' : 'password'}
                value={values}
                endAdornment={
                  <InputAdornment position="end" className="pb-2">
                  <IconButton
                    aria-label="toggle password visibility"
                    color="primary"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}>
                    {values.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
                }
                customValidation={(value: string, instance: any) => {
                  if (value !== values.passwordValue) return t("passDiff");
                  return false;
                }}
              />
            </div>
          </DialogContentText>
        </DialogContent>
    </Form>
  );
};

export default ChangePasswordForm;
