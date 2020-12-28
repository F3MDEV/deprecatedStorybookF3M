import React, { useState, useEffect } from 'react';
import { useForm } from 'react-form';
import { useTranslation } from 'react-i18next';

import FeedbackInput from '../../components/FeedbackInput/FeedbackInput';
import FeedbackAutocomplete from '../../components/FeedbackAutocomplete/FeedbackAutocomplete';
import { isDefined } from '../../utils/utils';
import LoadingModal from '../../components/Loadings/LoadingModal';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

//ICONS
import PatientIcon from '../../utils/account-circle.svg';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

//CSS
import './UsersInfoForm.scss';
import { TextField } from '@material-ui/core';

type onCloseFnType = (value: boolean) => String | false | undefined;
type saveUserFnType = (value: any) => String | false | undefined;
type onAddFnType = (value: any) => String | false | undefined;
type onValidateFnType = () => boolean | undefined;

type perfil = {
  id: string; 
  name: string;
};

interface IInstitutionsUser {
  rowKey: string;
  name: string;
  profile: perfil;
  //active: boolean;
  updated: boolean;
}

interface IInstitutions {
  rowKey: string;
  name: string;
}

interface IUser {
  email: string;
  name: string;
  contact: string;
  speciality: string;
  photoUri: string;
  institutions: IInstitutionsUser[];
}

const UsersInfoForm = ({
  editMode,
  onClose,
  saveUser,
  userInfo,
  allInstitutions,
  scroll,
  descriptionElementRef,
  onAddInstitutionToUser,
  saveInProgress,
  onValidadeEmailMpDS,
  actualUser,
  isLoading,
  allProfiles
}: {
  editMode: boolean;
  onClose: onCloseFnType;
  saveUser: saveUserFnType;
  userInfo: IUser;
  allInstitutions: IInstitutions[];
  scroll: String | undefined;
  descriptionElementRef: any;
  onAddInstitutionToUser: onAddFnType;
  saveInProgress: boolean;
  onValidadeEmailMpDS: onValidateFnType;
  actualUser: String;
  isLoading: boolean;
  allProfiles: any;
}) => {
  const { t } = useTranslation();
  const {
    Form, //reset,
    setFieldValue,
    meta: { isTouched, canSubmit }
  } = useForm({
    validate: (values: any, instance: any) => {
      let numInst = values.institutions.length;
      if (numInst === 0) {
        instance.setMeta({ error: 'error' });
      } else if (numInst === 1) {
        let inst = values.institutions[0];
        if (!isDefined(inst.institution)) {
          instance.setMeta({ error: 'error' });
        } else if (inst.institution.name === '') {
          instance.setMeta({ error: 'error' });
        } else if (!isDefined(inst.profiles)) {
          instance.setMeta({ error: 'error' });
        } else if (inst.profiles.length === 0) {
          instance.setMeta({ error: 'error' });
        } else {
          instance.setMeta({ error: null });
        }
      } else {
        let validation = true;
        for (let i = 0; i < numInst; i++) {
          let inst = values.institutions[i];
          if (!isDefined(inst.institution)) {
            validation = false;
            break;
          } else if (inst.institution.name === '') {
            if (i === 0) {
              validation = false;
              break;
            }
          } else if (!isDefined(inst.profiles)) {
            if (i === 0) {
              validation = false;
              break;
            }
          } else if (inst.profiles.name === '') {
            validation = false;
            break;
          }
        }

        if (validation) {
          instance.setMeta({ error: null });
        } else {
          instance.setMeta({ error: 'error' });
        }
      }
    },
    onSubmit: async (values: any, instance: any) => {
      saveUser(values);
    }
  });

  /*   const profiles = [
    {name: t('PermissionsTerms.healthcareProfessional')},
    {name: t('PermissionsTerms.administrator')},
    {name: t('PermissionsTerms.administratorAndHealthcare')}
  ]; */

  useEffect(() => {
    //reset()
    if (editMode) {
      setFieldValue('name', userInfo.name, { isTouched: false });
      setFieldValue('contact', userInfo.contact, { isTouched: false });
      setFieldValue('specialty', userInfo.speciality, { isTouched: false });

      if (isDefined(userInfo.institutions)) {
        for (let i = 0; i < userInfo.institutions.length; i++) {
          setFieldValue(
            'institutions[' + i + '].institution',
            {
              rowKey: userInfo.institutions[i].rowKey,
              name: userInfo.institutions[i].name
            },
            { isTouched: false }
          );
          setFieldValue(
            'institutions[' + i + '].profiles',
            userInfo.institutions[i].profile,
            { isTouched: false }
          );
          //setFieldValue("institutions[" + i + "].active", userInfo.institutions[i].active, {isTouched: false})
        }
      }
    }
  }, [editMode, isLoading]);

  const closeShow = () => {
    onClose(isTouched);
  };

  const [image, setImage] = useState({ preview: '', raw: '' });
  const [changePhoto, setChangePhoto] = useState({ change: false });
  const handleChangePhoto = (e: any) => {
    if (e.target.files[0] !== undefined) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
      setChangePhoto({ change: true });
    } else {
      setImage({
        preview: '',
        raw: ''
      });
    }
  };

  const [addField, setAddField] = useState({ rowKey: '', name: '' });
  const onChangeField = (v: any) => {
    if (isDefined(v)) {
      setAddField({
        rowKey: v.rowKey,
        name: v.name
      });
    } else {
      setAddField({
        rowKey: '',
        name: ''
      });
    }
  };

  const onClickAddButton = (e: any) => {
    if (isDefined(addField)) {
      if (addField.rowKey !== '' && addField.name !== '') {
        onAddInstitutionToUser(addField);
      }
    }
  };

  let listInst = userInfo.institutions || [];

  const validateEmailMpDS = () => {
    onValidadeEmailMpDS();
  };

  

  return (
    <Form id='form-user-add' autocomplete='off' className='form-dialog'>
      <DialogTitle className='main-shadow edit-add-user-title' disableTypography={true}>
        <IconButton
          color='primary'
          className='float-right outline-none'
          onClick={closeShow}
          centerRipple
        >
          <CloseIcon className='my-auto' fontSize='large' />
        </IconButton>

        <IconButton
          color='primary'
          className='float-right outline-none'
          type='submit'
          disabled={
            saveInProgress
              ? true
              : changePhoto.change
              ? false
              : !(isTouched && canSubmit)
          }
          centerRipple
        >
          <SaveIcon className='my-auto' fontSize='large' />
        </IconButton>

        <Box
          fontFamily='Nunito'
          fontSize={20}
          fontWeight={700}
          className='text-uppercase mt-3 add-and-edit-title'
        >
          {editMode ? t('EditUser') : t('AddUser')}
        </Box>
      </DialogTitle>

      <DialogContent dividers={true}>
        <div className='px-0 pl-md-5'>
          <LoadingModal hidden={!isLoading} />
          <Row>
            <Col sm={12} md={4} lg={3} className='pr-0 pr-xl-5 text-center px-0'>
              <div className='container-photo-user mx-auto'>
                <Image
                  className={
                    'photo-user fit-photo' +
                    (image.preview !== ''
                      ? ' border-photo-user'
                      : userInfo.photoUri === '' || userInfo.photoUri == null
                      ? ''
                      : ' border-photo-user')
                  }
                  roundedCircle
                  src={
                    image.preview !== ''
                      ? image.preview
                      : userInfo.photoUri === '' || userInfo.photoUri == null
                      ? PatientIcon
                      : userInfo.photoUri
                  }
                  //onError={(event) => {event.target.src = PatientIcon; event.className = 'photo-user'}}
                ></Image>

                <IconButton
                  className='add-photo-user position-relative outline-none'
                  size='small'
                  color='primary'
                  aria-label='f3m'
                  hidden={isLoading}
                >
                  <label htmlFor='fileinputUser'>
                    <AddAPhotoIcon className='white-color'></AddAPhotoIcon>
                  </label>
                </IconButton>
                <input
                  id='fileinputUser'
                  type='file'
                  accept='.gif,.jpg,.jpeg,.png'
                  style={{ display: 'none' }}
                  onChange={handleChangePhoto}
                />
              </div>
            </Col>

            {/* Este TextField está aqui, display = none, para que o formulário (no chrome) aceite o autocomplete=off e não preencha os valores por omissão */}
            <TextField style={{ display: 'none' }} name='dummy'></TextField>

            <Col sm={12} md={8} lg={9} className='px-0 pr-md-5 pl-0 pl-md-4 pl-lg-0'>
              <FeedbackInput
                id={'mpdsAdduserEmail'}
                label={t('Email')}
                required
                field='email'
                autocomplete={false}
                shrink
                customClasses='w-100 pb-4 pb-md-4 px-4 pr-md-5 pl-md-0'
                customInputClasses='pb-1 pr-5'
                customLabelClasses='label-font-size ml-4 ml-md-0'
                readOnly={editMode}
                disabled={editMode}
                defaultValue={userInfo.email}
                customValidation={(value: string, instance: any) => {
                  if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
                    return t('INVALID_EMAIL');
                  return false;
                }}
                onBlur={validateEmailMpDS}
              />
              <FeedbackInput
                id={'mpdsAdduserName'}
                label={t('Name')}
                required
                field='name'
                customClasses='w-100 pb-4 pb-md-4 px-4 pr-md-5 pl-md-0'
                autocomplete={false}
                shrink
                defaultValue={userInfo.name}
                customInputClasses='pb-1 pr-5'
                customLabelClasses='label-font-size ml-4 ml-md-0'
                disabled={isLoading}
              />

              <FeedbackInput
                id={'mpdsAdduserContact'}
                label={t('Contact')}
                field='contact'
                customClasses='w-100 pb-4 pb-md-4 px-4 pr-md-5 pl-md-0'
                autocomplete={false}
                shrink
                defaultValue={userInfo.contact}
                customInputClasses='pb-1 pr-5'
                customLabelClasses='label-font-size ml-4 ml-md-0'
                disabled={isLoading}
              />

              <FeedbackInput
                id={'mpdsAdduserSpeciality'}
                label={t('Speciality')}
                field='specialty'
                required
                customClasses='w-100 pb-4 pb-md-4 px-4 pr-md-5 pl-md-0 '
                autocomplete={false}
                shrink
                defaultValue={userInfo.speciality}
                customInputClasses='pb-1 pr-5'
                customLabelClasses='label-font-size ml-4 ml-md-0'
                disabled={isLoading}
              />
            </Col>
          </Row>
          {listInst.map((institution, index) => (
            <Row key={'inst' + index} className='pr-md-5'>
              <Col xs={12} md={6} lg={6} className='pb-4 pl-0 pl-4'>
                <FeedbackAutocomplete
                  id={'combo-box-institutions' + index}
                  field={'institutions[' + index + '].institution'}
                  options={allInstitutions}
                  label={t('Company')}
                  defaultValue={institution}
                  includeInputInList={false}
                  required={true}
                  disabled={!institution.updated || isLoading}
                  noOptionsText={t('NoOptions')}
                />
              </Col>
              <Col xs={12} md={6} lg={6} className='pb-4 pr-md-5'>
                {/*  <FeedbackAutocompleteMultiple 
                  id={"size-small-standard-multi"+index}
                  size ={"small"}
                  field={"institutions[" + index+ "].profiles"}
                  options={profiles}
                  fixedOptions={userInfo.email === actualUser ? [{name: "Administrador"}]: []}
                  label={t('Profile')}
                  defaultValue={institution.profile} 
                  disableCloseOnSelect={true}
                  required={true}
                /> */}
                <FeedbackAutocomplete
                  id={'combo-box-perfis' + index}
                  field={'institutions[' + index + '].profiles'}
                  //options={allProfiles.filter(function (value:any) {return value.rowKey == institution.rowKey })[0].profile}
                  // Se é o utilizador atual não pode perder as permissões de administrador
                  options={
                    userInfo.email === actualUser
                      ? allProfiles
                          .filter(function (value: any) {
                            return value.rowKey == institution.rowKey;
                          })[0]
                          .profile.filter(function (v: any) {
                            return v.id.toUpperCase().includes('ADMIN');
                          })
                      : allProfiles.filter(function (value: any) {
                          return value.rowKey == institution.rowKey;
                        })[0].profile
                  }
                  label={t('Profile')}
                  defaultValue={institution.profile.name}
                  includeInputInList={false}
                  required={true}
                  disabled={isLoading}
                  noOptionsText={t('NoOptions')}
                  showTooltip={true}
                />
              </Col>
              {/* <Col xs={4} md={2} lg={2} className="pb-4">
            <label className="MuiFormLabel-root MuiInputLabel-root label-font-size pl-md-0 MuiInputLabel-shrink">{t('State')}</label>
          
              <FeedbackSwitch
                id={"active"+index}
                defaultValue={institution.active}
                field={"institutions["+index+ "].active"}
                labelTrue={t('Active')}
                labelFalse={t('Inactive')}
                disabled={userInfo.email === actualUser}
                
              />
            </Col> */}
            </Row>
          ))}
          <Row className='pr-md-5' hidden={allInstitutions.length === 0}>
            <Col xs={12} md={6} lg={6} className='pb-4 pl-0 pl-4'>
              <FeedbackAutocomplete
                id={'institutions-new'}
                field={'institutions[' + listInst.length + '].institution'}
                options={allInstitutions}
                label={t('Company')}
                includeInputInList={true}
                defaultValue={{ name: '', rowKey: '' }}
                onChangeField={(v) => onChangeField(v)}
                required={listInst.length === 0}
                disabled={isLoading}
                noOptionsText={t('NoOptions')}
              />
            </Col>
            <Col xs={12} md={6} lg={6} className='my-auto pb-4 pr-md-5'>
              <Button
                className='btn-add-institution'
                id='buttonAddInstitution'
                color='primary'
                variant='contained'
                onClick={onClickAddButton}
                disabled={addField.rowKey === ''}
              >
                <AddIcon></AddIcon>
              </Button>
            </Col>
          </Row>
        </div>
      </DialogContent>
    </Form>
  );
};

export default UsersInfoForm;
