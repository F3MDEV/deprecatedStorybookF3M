import React, {useState} from "react";

import { useForm } from "react-form";
import FeedbackInput from "../../components/FeedbackInput/FeedbackInput";
import { useTranslation } from "react-i18next";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';

import "./PersonalUserInfoForm.scss"

//ICONS
import PatientIcon from "../../utils/account-circle.svg";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type onCloseFnType = (value: boolean) => String | false | undefined;
type saveUserFnType = (value: any) => String | false | undefined;

const useStyles = makeStyles(theme => ({
  inputRoot: {
    "&.MuiInput-underline:before": {
      borderBottom: "none",
    }
  },
  endAdornment:{
    "&.MuiAutocomplete-endAdornment": {
      display: "none",
    }
  },
  tagSizeSmall:{
    "&.MuiAutocomplete-tagSizeSmall": {
      marginTop: 5,
      marginLeft: 0
    }
  }
}));

type userInfo = {
  userPhotoUri: string;
  userName: string;
  userSpeciality: string;
  email: string;
  userContact: string;
  userAcess: any;
  userProfile: string;
}

type perfil = {
  name: string;
}

const PersonalUserInfoForm = ({
  onClose,
  saveUser,
  userInfo,
  scroll,
  descriptionElementRef
}: {
  onClose: onCloseFnType;
  saveUser: saveUserFnType;
  userInfo: userInfo;
  scroll: String | undefined;
  descriptionElementRef: any;
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    Form,
    meta: { isTouched, canSubmit }
  } = useForm({
    onSubmit: async (values: any, instance: any) => {
      saveUser(values);
    }
  });

  const closeShow = () => {
    onClose(isTouched);
  };

  const [image, setImage] = useState({preview: '', raw: ''})
  const [changePhoto, setChangePhoto] = useState({change: false})
  const handleChangePhoto = (e: any) => {
    if (e.target.files[0] !== undefined)
    {     
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      })
      setChangePhoto({change:true})
    } else {
      setImage({
        preview: '',
        raw: ''
      })
    }
   }

  const profiles = [{name: userInfo.userProfile}]
  let userPerfis = [{name: userInfo.userProfile}]

  return (
    <Form className="px-0 pl-md-5"> 
      <DialogTitle disableTypography={true}>
        <IconButton color="primary"
          className="float-right outline-none"
          onClick={closeShow}
          centerRipple>
          <CloseIcon className="my-auto" fontSize='large' />  
        </IconButton>
        
        <IconButton color="primary"
          className="float-right outline-none"
          type="submit"
          disabled = {changePhoto.change ? false : !(isTouched && canSubmit)}
          centerRipple>
          <SaveIcon className="my-auto" fontSize='large' />  
        </IconButton>
            
        <Box fontFamily="Nunito" fontWeight={700} className="text-uppercase mt-3 personal-info-title" >
          {t("PersonalInfo")}
        </Box>
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
      <Row>
        <Col sm={12} md={4} lg={3} className="pr-0 pr-xl-5 text-center pl-xl-5 px-0">
          <div className="container-photo-user mx-auto">
            <Image
              className={"photo-user fit-photo"+( image.preview !== '' ? " border-photo-user" : ((userInfo.userPhotoUri === '' || userInfo.userPhotoUri == null) ? "" : " border-photo-user") )}
              roundedCircle
              src={image.preview !== '' ? image.preview : ((userInfo.userPhotoUri === '' || userInfo.userPhotoUri == null) ? PatientIcon : userInfo.userPhotoUri)}
              //onError={(event) => {event.target.src = PatientIcon; event.target.className="photo-user"}}
            ></Image>

            <IconButton
              className="add-photo-user position-relative cursor-pointer outline-none"
              size="small" 
              color="primary"
              aria-label="f3m"
              >
                <label htmlFor="fileinput">
                 <AddAPhotoIcon className="white-color"></AddAPhotoIcon>
                </label>
            </IconButton>
            <input id="fileinput" type="file" accept=".gif,.jpg,.jpeg,.png" capture="user" style={{display: 'none'}} onChange={handleChangePhoto}/> 
          </div>
          <div className="d-flex flex-column container-id-photo-user mx-auto pt-4 pb-5 pb-md-0">
            <Box fontWeight={700} fontSize={13} color="text.primary" className="text-center">
              {userInfo.userName}
            </Box>
            <Box fontSize={13} color="text.primary" className="text-center">
              {userInfo.userSpeciality}
            </Box>
          </div>
        </Col>

        <Col sm={12} md={8} lg={9} className="px-0 pr-md-5 user-info-modal">
          <div> 
            <FeedbackInput
              label={t("Email")}
              field="email"
              autocomplete={false}
              shrink
              disabled
              customClasses="w-100 pb-4 pb-md-4 px-4 pr-md-5 pl-md-0"
              readOnly
              defaultValue={userInfo.email}
              customInputClasses="pl-3 pb-1 pr-5"
              customLabelClasses="label-font-size pl-4 pl-md-0"
            />
          </div>
          <div>
              <FeedbackInput
                label={t("Name")}
                required
                field="name"
                customClasses="w-100 pb-4 pb-md-4 px-4 pr-md-5 pl-md-0"
                autocomplete={false}
                shrink
                defaultValue={userInfo.userName}
                customInputClasses="pl-3 pb-1 pr-5"
                customLabelClasses="label-font-size pl-4 pl-md-0"
              />
           </div>
           <div>
              <FeedbackInput
                label={t("Contact")}
                //required
                field="contact"
                customClasses="w-100 pb-4 pb-md-4 px-4 pr-md-5 pl-md-0"
                autocomplete={false}
                shrink
                defaultValue={userInfo.userContact}
                customInputClasses="pl-3 pb-1 pr-5"
                customLabelClasses="label-font-size pl-4 pl-md-0"
              />
            </div>
            <div>
              <FeedbackInput
                label={t("Speciality")}
                field="specialty"
                customClasses="w-100 pb-4 pb-md-4 px-4 pr-md-5 pl-md-0"
                autocomplete={false}
                required
                shrink
                defaultValue={userInfo.userSpeciality}
                customInputClasses="pl-3 pb-1 pr-5"
                customLabelClasses="label-font-size pl-4 pl-md-0"
              />
            </div>
      
              <Autocomplete
                multiple
                id="size-small-standard-multi"
                size="small"
                classes={classes}
                options={profiles}
                disableCloseOnSelect
                getOptionLabel={option => option.name}
                //getOptionLabel={option => option}
                defaultValue= {userPerfis} 
                disabled ={true}
                renderOption={(option, {selected}) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      color="default"
                    />
                    {option.name}
                  </React.Fragment>
                )}
                renderInput={params => (
                  <TextField {...params} 
                  variant="standard" 
                  label={t("Profile")}
                  fullWidth
                  className="w-100 pb-3 px-4 pr-md-5 pl-md-0"
                  InputLabelProps={{ 
                    shrink: true ,
                    className: "label-font-size pl-4 pl-md-0"
                  }}/>
                )}
              />
          </Col>
        </Row>
        </DialogContent>

    </Form>
  );
};

export default PersonalUserInfoForm;