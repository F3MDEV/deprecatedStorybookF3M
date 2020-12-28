import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';

// Actions
import {
  setLoading,
  getInstitutionsInfo,
  updateInstitution,
  updateListInstitutionToSave,
  getAllUsersAllInstitutionsAndInstitutionsInfo,
  getAllAdminInfo,
  resetPasswordOtherUser,
  createUser,
  updateUser,
  addUserToInstitution,
  allInstitutionsAdded,
  removeUserFromInstitution,
  getUserByEmail,
  getSpaceUsed,
  getTokenRefresh,
  addProfileToUserInstitution,
  allProfilesGet,
  getProfilesInstitution,
  allProfilesAdded,
  getURItoUploadPhotoAdmin
} from '../../store/actions/login/loginActions';

// CONSTANTS
import {
  patientIDSel,
  woundIDSel,
  settingsTab,
  AZURE_CONTAINER_NAME,
  AZURE_BLOB_NAME
} from '../../utils/constants';

//OUTSIDE COMPONENTS
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import { Container } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//ICONS
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';

//INSIDE COMPONENTS
import UsersPage from './UsersPage';
import NavTabsAdmin from '../../components/NavTabs/NavTabsAdmin';
import DialogUsersForm from './DialogUsersForm';
import { isDefined } from '../../utils/utils';
import BackToTop from '../../components/BackToTop';
import LoadingModal from '../../components/Loadings/LoadingModal';

//CSS
import './SettingsPage.scss';

//CONSTANTS
import { loginsStorage } from '../../utils/constants';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfInstitutionsParam: this.props.login.listOfInstitutionsParam,
      listOfAllUsersInstitutions: this.props.login.listOfAllUsersInstitutions,
      indexTabs: 0,
      refresh: false,
      indexTabsPrev: -1,
      changeValues: false,
      hasChangesToSave: false,
      expandAll: false,
      expandAllUsers: false,
      openDialogConfirm: false,
      openDialogConfirmCancel: false,
      listOfInstitutionsMsg: [],
      showMessageUpdateSucess: false,
      showAddUser: false,
      saveEnable: false,
      userEdit: '',
      openDialogConfirmResetPass: false,
      openDialogConfirmDeleteUser: false,
      userDelete: null,
      errorMessage: '',
      sucessMessage: '',
      spaceUsed: '',
      spaceAll: '',
      openDialogConfirmCancelUser: false,
      isLoading: false
    };

    this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
    document.getElementById('root').style.background = '#f2f2f2';
  }

  componentDidMount() {
    //limpar dados de utente e feridas
    this.props.patient.PatientID = 0;
    this.props.woundInfo.WoundID = 0;
    sessionStorage.setItem(patientIDSel, 0);
    sessionStorage.setItem(woundIDSel, 0);
    let tabSet = sessionStorage.getItem(settingsTab);
    if (isDefined(tabSet) && tabSet !== '') {
      if (parseInt(tabSet) !== this.state.indexTabs) {
        this.setState({
          indexTabs: parseInt(tabSet)
        });
      }
    } else {
      sessionStorage.setItem(settingsTab, this.state.indexTabs);
    }

    this.props.login.inUserInfoRefresh = true;
    this.props.setLoading(true);
    /* this.props.login.getAllUsersInProgress = true
        this.props.login.getSpaceUsedInProgress = true
        this.props.login.inUserInfoRefresh = false
        this.props.getAllAdminInfo() */
  }

  componentDidUpdate() {
    const {
      getAllUsersInProgress,
      listOfAllUsersInstitutions,
      refreshInst,
      resetPasswordOtherUserSucess,
      resetPasswordOtherUserMessage,
      showMessageUpdateSucess,
      isLoading,
      createUserInProgress,
      stepsCreateUser,
      errorCreateUser,
      msgErrorCreateUser,
      showSucessMessage,
      removeUserSucess,
      msgRemoveUser,
      validateUserInProgress,
      validateUser,
      changePhotoStorage,
      validateUserEmail,
      updateInstitutionInProgress,
      updateInstitutionIndex,
      infoInstitutionsUpdate,
      showMessageUpdateErro,
      errorMessage,
      updateNext,
      spaceUsed,
      getSpaceUsedInProgress,
      needTokenRefresh,
      inUserInfoRefresh,
      listOfAllInstitutionsProfils,
      getProfilesInProgress,
      userExist
    } = this.props.login;
    if (!needTokenRefresh) {
      if (inUserInfoRefresh) {
        this.props.login.getAllInfoInProgress = true;
        this.props.login.getAllUsersInProgress = true;
        this.props.login.isLoading = true;
        this.props.login.inUserInfoRefresh = false;
        this.props.login.listOfAllInstitutionsProfils = [];
        this.props.getAllAdminInfo(this.state.listOfInstitutionsParam);
      } else if (!getAllUsersInProgress && listOfAllUsersInstitutions.length === 0) {
        this.props.login.getAllInfoInProgress = true;
        this.props.login.getAllUsersInProgress = true;
        this.props.login.isLoading = true;
        this.props.login.inUserInfoRefresh = false;
        this.props.login.listOfAllInstitutionsProfils = [];
        this.props.getAllAdminInfo(this.state.listOfInstitutionsParam);
      } else if (getProfilesInProgress) {
        this.getProfiles();
      } else if (listOfAllInstitutionsProfils.length === 0 && !getProfilesInProgress && listOfAllUsersInstitutions.length > 0 && !getAllUsersInProgress) {
        this.props.login.isLoading = true;
        this.props.login.getProfilesInProgress = true;
        this.getProfiles();
      } else if (!getAllUsersInProgress && refreshInst) {
        this.props.login.getAllUsersInProgress = true;
        this.props.login.isLoading = true;
        this.props.login.inUserInfoRefresh = false;
        this.props.getAllUsersAllInstitutionsAndInstitutionsInfo(this.state.listOfInstitutionsParam, this.state.listOfAllUsersInstitutions);
      } else if (resetPasswordOtherUserSucess) {
        this.props.login.resetPasswordOtherUserSucess = null;

        this.setState({
          openDialogConfirmResetPass: false,
          showSucessMessage: true,
          sucessMessage: 'reset_password_sucess',
          errorMessage: null
        });
      } else if (resetPasswordOtherUserSucess === false) {
        this.props.login.resetPasswordOtherUserSucess = null;
        this.setState({
          openDialogConfirmResetPass: false,
          showErrorMessage: true,
          errorMessage: resetPasswordOtherUserMessage
        });
      } else if (updateInstitutionInProgress) {
        if (showMessageUpdateSucess) {
          this.props.login.updateInstitutionInProgress = false;
          this.props.login.showMessageUpdateSucess = false;
          this.setState({
            isLoading: false,
            showSucessMessage: true,
            sucessMessage: 'sucessChangesSaved',
            infoInstitutionsUpdate: [],
            infoInstitutionsIndex: 0
          });
        } else if (showMessageUpdateErro) {
          this.props.login.updateInstitutionInProgress = false;
          this.setState({
            showErrorMessage: true,
            errorMessage: errorMessage,
            infoInstitutionsUpdate: [],
            infoInstitutionsIndex: 0
          });
        } else if (updateNext) {
          if (updateInstitutionIndex > -1 && infoInstitutionsUpdate.length > 0) {
            let lastUpdate = infoInstitutionsUpdate.length === updateInstitutionIndex + 1;
            this.props.login.updateNext = false;
            this.props.updateInstitution(infoInstitutionsUpdate[updateInstitutionIndex], lastUpdate, updateInstitutionIndex);
          }
        }
      } else if (createUserInProgress) {
        if (errorCreateUser) {
          this.props.login.createUserInProgress = false;
          this.setState({
            isLoading: false,
            showErrorMessage: true,
            errorMessage: msgErrorCreateUser
          });
        } else if (stepsCreateUser === 'create') {
          let uriPhoto = null
          if (this.state.UserToSaveHavePhoto) {
            uriPhoto = this.props.login.uriToUserPhoto.split('?')[0]
          }
          if (this.state.userEdit !== '') {
            //  //if (userChange){
            //  // update mode
            this.props.updateUser(this.state.InfoToSave, uriPhoto);
            /*  } else {
                      this.uploadPhotoUser()
                  }  */
          } else {
            // add mode
            this.props.createUser(this.state.InfoToSave, uriPhoto);
          }
        } else if (stepsCreateUser === 'update') {
          let uriPhoto = null
          if (this.state.UserToSaveHavePhoto) {
            uriPhoto = this.props.login.uriToUserPhoto.split('?')[0]
          }
          this.props.updateUser(this.state.InfoToSave, uriPhoto);
        } else if (stepsCreateUser === 'photoURI') {
          this.props.getURItoUploadPhotoAdmin(this.state.InfoToSave.email);
        } else if (stepsCreateUser === 'photo') {
          this.uploadPhotoUser();
        } else if (stepsCreateUser === 'addInstitution') {
          //if (!showSucessMessage) {
          this.addInstitutions();
          /* } else {
                        this.props.login.stepsCreateUser = "refresh"
                        this.props.login.getAllUsersInProgress = true
                        this.props.login.isLoading = true
                        this.props.login.inUserInfoRefresh = false
                        this.props.getAllUsersAllInstitutionsAndInstitutionsInfo(this.state.listOfInstitutionsParam, this.state.listOfAllUsersInstitutions)
                    } */
        } else if (stepsCreateUser === 'updateProfile') {
          if (!showSucessMessage) {
            this.updateProfiles();
          } else {
            this.props.login.stepsCreateUser = 'refresh';
            this.props.login.getAllUsersInProgress = true;
            this.props.login.isLoading = true;
            this.props.login.inUserInfoRefresh = false;
            this.props.getAllUsersAllInstitutionsAndInstitutionsInfo(this.state.listOfInstitutionsParam, this.state.listOfAllUsersInstitutions);
          }
        } else if (stepsCreateUser === 'refresh' && !getAllUsersInProgress) {
          this.props.login.createUserInProgress = false;
          this.setState({
            isLoading: false,
            showAddUser: false,
            showSucessMessage: true,
            sucessMessage: 'sucessChangesSaved'
          });
        }
      } else if (removeUserSucess === false) {
        this.props.login.removeUserSucess = null;
        this.setState({
          openDialogConfirmDeleteUser: false,
          showErrorMessage: true,
          errorMessage: msgRemoveUser
        });
      } else if (removeUserSucess === true) {
        this.props.login.removeUserSucess = null;
        //this.props.login.getAllUsersInProgress = true
        let listUsers = this.refreshUsersList();
        this.setState({
          openDialogConfirmDeleteUser: false,
          showSucessMessage: true,
          sucessMessage: 'sucess_default',
          listOfAllUsersInstitutions: listUsers
        });
      } else if (validateUserInProgress) {
        if (isDefined(userExist)) {
          if (userExist) {
            if (isDefined(validateUser)) {
              this.props.login.validateUserInProgress = false;
              this.showEditUser(validateUser.email, validateUser);
            }
          } else {
            this.setState({ isLoading: false });
            this.props.login.validateUserInProgress = false;
          }
        } else if (isDefined(validateUserEmail)) {
          this.props.login.validateUserInProgress = false;
          this.onValidadeEmailMpDSAfterTokenRefresh(validateUserEmail);
        }
      } else if (changePhotoStorage) {
        /* let bannerImage = document.getElementById('bannerImage');
        let imgData = '';
        let adiciona = false;

        if (isDefined(bannerImage) && bannerImage.complete) {
          if (
            bannerImage.src !== '' &&
            bannerImage.src === this.props.login.userPhotoUri
          ) {
            imgData = getBase64Image(bannerImage);
            adiciona = true;
          } else if (
            bannerImage.src.includes('account-circle') &&
            this.props.login.userPhotoUri === null
          ) {
            imgData = '';
            adiciona = true;
          }
          if (adiciona) {
            let utilizador = {
              email: this.props.login.email,
              name: this.props.login.userName,
              specialty: this.props.login.userSpeciality,
              photoUri: imgData
            };

            let lista = JSON.parse(localStorage.getItem(loginsStorage)) || [];
            if (utilizador.email != null) {
              const index = lista.findIndex((l) => l.email === utilizador.email);

              if (index >= 0) {
                lista.splice(index, 1);
              }
              lista.push(utilizador);

              localStorage.setItem(loginsStorage, JSON.stringify(lista));
              this.props.login.changePhotoStorage = false;
            }
          }
        } */
      } else {
        let tabSet = sessionStorage.getItem(settingsTab);
        if (isDefined(tabSet) && tabSet !== '') {
          if (parseInt(tabSet) !== this.state.indexTabs) {
            this.setState({
              indexTabs: parseInt(tabSet)
            });
          }
        } else {
          sessionStorage.setItem(settingsTab, this.state.indexTabs);
        }
      }

      if (this.state.indexTabs != this.state.indexTabsPrev) {
        let divName;
        if (this.state.indexTabs === 0) {
          divName = 'div-admin-users';
        } else {
          divName = 'div-admin-institutions';
        }
        let elmnt = document.getElementById(divName);
        if (elmnt != null) {
          elmnt.scrollIntoView(false);
        }
        this.setState({ indexTabsPrev: this.state.indexTabs });
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.login.listOfInstitutionsParam !== prevState.listOfInstitutionsParam) {
      if (
        nextProps.login.listOfAllUsersInstitutions !==
        prevState.listOfAllUsersInstitutionsOrigin
      ) {
        if (
          nextProps.login.spaceUsed !== prevState.spaceUsed ||
          nextProps.login.spaceAll !== prevState.spaceAll
        ) {
          return {
            listOfAllUsersInstitutions: nextProps.login.listOfAllUsersInstitutions,
            listOfInstitutionsParam: nextProps.login.listOfInstitutionsParam,
            spaceUsed: nextProps.login.spaceUsed,
            spaceAll: nextProps.login.spaceAll
          };
        } else {
          return {
            listOfAllUsersInstitutions: nextProps.login.listOfAllUsersInstitutions,
            listOfInstitutionsParam: nextProps.login.listOfInstitutionsParam
          };
        }
      } else {
        return {
          listOfInstitutionsParam: nextProps.login.listOfInstitutionsParam
        };
      }
    } else if (
      nextProps.login.listOfAllUsersInstitutions !==
      prevState.listOfAllUsersInstitutionsOrigin
    ) {
      if (
        nextProps.login.spaceUsed !== prevState.spaceUsed ||
        nextProps.login.spaceAll !== prevState.spaceAll
      ) {
        return {
          listOfAllUsersInstitutions: nextProps.login.listOfAllUsersInstitutions,
          spaceUsed: nextProps.login.spaceUsed,
          spaceAll: nextProps.login.spaceAll
        };
      } else {
        return {
          listOfAllUsersInstitutions: nextProps.login.listOfAllUsersInstitutions
        };
      }
    } else if (
      nextProps.login.spaceUsed !== prevState.spaceUsed ||
      nextProps.login.spaceAll !== prevState.spaceAll
    ) {
      return {
        spaceUsed: nextProps.login.spaceUsed,
        spaceAll: nextProps.login.spaceAll
      };
    } else {
      return null;
    }
  }

  handleChangeTabs = (value) => {
    // REFRESH INFO FROM SERVER
    this.props.login.inLoadInfo = true;
    this.props.setLoading(true);

    this.props.login.getAllUsersInProgress = true;
    //        this.props.login.isLoading = true
    this.props.login.inUserInfoRefresh = false;
    this.props.getAllUsersAllInstitutionsAndInstitutionsInfo(
      this.state.listOfInstitutionsParam,
      this.state.listOfAllUsersInstitutions
    );

    sessionStorage.setItem(settingsTab, value);
    let previous = this.state.indexTabs;
    this.setState({
      indexTabs: value,
      indexTabsPrev: previous
    });
  };

  changeNumberHours(event, index) {
    const value = event.target.value;

    if (this.state.changeValues) {
      if (event.target.value) {
        let list = this.state.listOfInstitutionsParam;
        let newValue;
        let oldValue = list[index].numMinutos;

        if (value < 0) {
          newValue = 0;
        } else {
          newValue = parseInt(value);
        }

        list[index].numMinutos = newValue;

        if (oldValue !== newValue) {
          this.setState({
            refresh: !this.state.refresh,
            listOfInstitutionsParam: list,
            hasChangesToSave: true
          });
        } else {
          this.setState({
            refresh: !this.state.refresh,
            listOfInstitutionsParam: list
          });
        }
      } else {
        this.setState({
          refresh: !this.state.refresh
        });
      }
    }
  }

  onRefreshInstitutions() {
    this.setState({
      changeValues: false,
      openDialogConfirmCancel: false,
      hasChangesToSave: false
    });
    this.props.getInstitutionsInfo(this.state.listOfInstitutionsParam);
  }

  onUpdate() {
    this.setState({
      changeValues: true
    });
  }

  validateCancel() {
    if (this.state.hasChangesToSave) {
      this.setState({
        openDialogConfirmCancel: true
      });
    } else {
      this.onRefreshInstitutions();
    }
  }

  activeIsLoading() {
    this.setState({ isLoading: true });

    this.validateInstitutions();
  }

  validateInstitutions() {
    let showMsg = false,
      institutions = [];
    for (let i = 0; i < this.state.listOfInstitutionsParam.length; i++) {
      if (this.state.listOfInstitutionsParam[i].numMinutos === 0) {
        showMsg = true;

        institutions = institutions.concat(this.state.listOfInstitutionsParam[i].name);
      }
    }

    if (showMsg) {
      this.setState({
        openDialogConfirm: true,
        listOfInstitutionsMsg: institutions,
        isLoading: false
      });
    } else {
      this.onSaveInstitutions();
    }
  }

  closeDialogInstitution() {
    this.setState({
      openDialogConfirm: false,
      listOfInstitutionsMsg: []
    });
  }

  closeDialogCancel() {
    this.setState({
      openDialogConfirmCancel: false,
      openDialogConfirmCancelUser: false
    });
  }

  onSaveInstitutions() {
    let numAct = this.state.listOfInstitutionsParam.length;
    let listValues = [];
    for (let i = 0; i < numAct; i++) {
      const values = {
        id: this.state.listOfInstitutionsParam[i].rowKey,
        editingTimePeriod: this.state.listOfInstitutionsParam[i].numMinutos
      };

      //let lastUpdate = (i === numAct - 1)
      //this.props.updateInstitution(values, lastUpdate)
      listValues.push(values);
    }

    this.setState({
      openDialogConfirm: false,
      changeValues: false,
      hasChangesToSave: false,
      infoInstitutionsUpdate: listValues,
      infoInstitutionsIndex: 0,
      isLoading: true
    });

    this.props.updateListInstitutionToSave(listValues);
  }

  expandCloseAll() {
    let list = this.state.listOfInstitutionsParam;
    for (let i = 0; i < list.length; i++) {
      list[i].expanded = !this.state.expandAll;
    }

    this.setState({
      expandAll: !this.state.expandAll,
      listOfInstitutionsParam: list
    });
  }

  onChangeExpanded(v, index) {
    let list = this.state.listOfInstitutionsParam;
    list[index].expanded = !list[index].expanded;
    this.setState({
      listOfInstitutionsParam: list
    });
  }

  onChangeExpandedUsers(rowKey) {
    let list = this.state.listOfAllUsersInstitutions;
    for (let i = 0; i < list.length; i++) {
      if (list[i].rowKey === rowKey) {
        list[i].expanded = !list[i].expanded;
        break;
      }
    }

    this.setState({
      listOfAllUsersInstitutions: list
    });
  }

  expandCloseAllUsers(forceTrue) {
    let list = this.state.listOfAllUsersInstitutions;
    for (let i = 0; i < list.length; i++) {
      list[i].expanded = forceTrue ? true : !this.state.expandAllUsers;
    }

    this.setState({
      expandAllUsers: forceTrue ? true : !this.state.expandAllUsers,
      listOfAllUsersInstitutions: list
    });
  }

  closeAddUserForm(showMessage) {
    if (showMessage) {
      this.setState({
        openDialogConfirmCancelUser: true
      });
    } else {
      this.changeShowAddUser();
    }
  }

  changeShowAddUser() {
    let allInst = [];
    if (!this.state.showAddUser) {
      // Percorrer a lista de instituições a que o utilizador pode ser adicionado
      let list = this.state.listOfInstitutionsParam;
      let numInst = list.length;
      for (let i = 0; i < numInst; i++) {
        let inst = list[i];
        allInst = allInst.concat({ rowKey: inst.rowKey, name: inst.name });
      }
    }

    this.setState({
      openDialogConfirmCancelUser: false,
      showAddUser: !this.state.showAddUser,
      userEdit: '',
      userEditInfo: {
        email: '',
        name: '',
        contact: '',
        speciality: '',
        photoUri: '',
        institutions: []
      },
      allInstList: allInst,
      userEditInstitutions: []
    });
  }

  saveUser(value) {
    //VALIDATE IF THE INFO USER IS CHANGED
    let userBeforeChange = this.state.userEditInfo;
    let userAfterChange = value;
    let userChange = false;

    if (this.state.userEdit !== '') {
      if (
        userBeforeChange.contact !== userAfterChange.contact ||
        userBeforeChange.speciality !== userAfterChange.specialty ||
        userBeforeChange.name !== userAfterChange.name
      ) {
        userChange = true;
      }
    } else {
      userChange = true;
    }
    //VALIDATE IF THE INSTITUTIONS HAS CHANGED
    let listBeforeChange = this.state.userEditInstitutions;
    let listAfterChange = value.institutions;
    let listToSave = [];
    let numInstAfter = listAfterChange.length;
    let numInstBefore = listBeforeChange.length;

    for (let i = 0; i < numInstAfter; i++) {
      let instAfter = listAfterChange[i];
      if (instAfter.institution.rowKey !== '') {
        let encontrou = false;
        for (let j = 0; j < numInstBefore; j++) {
          let instBefore = listBeforeChange[j];
          if (instAfter.institution.rowKey === instBefore.rowKey) {
            if (
              instBefore.profile == null ||
              instAfter.profiles.name !== instBefore.profile.name
            ) {
              //listToSave = listToSave.concat(instAfter)
              let oldInst = {
                institution: instAfter.institution,
                profiles: instAfter.profiles,
                new: false
              };
              listToSave = listToSave.concat(oldInst);
            }
            encontrou = true;
            break;
          }
        }
        if (!encontrou) {
          if (isDefined(instAfter.profiles)) {
            //listToSave = listToSave.concat(instAfter)
            let newInst = {
              institution: instAfter.institution,
              profiles: instAfter.profiles,
              new: true
            };
            listToSave = listToSave.concat(newInst);
          }
        }
      }
    }

    value.institutions = listToSave;
    value.photoUri = this.props.login.uriToUserPhoto;

    this.setState({
      InfoToSave: value,
      isLoading: true
    });


    //if (this.state.userEdit !== '') {
    //  //if (userChange){
    //  // update mode
    //  this.props.updateUser(value);
    /*  } else {
              this.uploadPhotoUser()
          }  */
    //} else {
    // add mode
    //  this.props.createUser(value);
    //}

    let havePhoto = false;
    if (document.getElementById('fileinputUser') !== null) {
      var file = document.getElementById('fileinputUser').files[0];

      if (file !== undefined) {
        havePhoto = true;
      }
    }

    this.setState({
      InfoToSave: value,
      isLoading: true,
      UserToSaveHavePhoto: havePhoto
    });

    this.props.getURItoUploadPhotoAdmin(value.email);
  }

  uploadPhotoUser() {
    if (document.getElementById('fileinputUser') !== null) {
      var file = document.getElementById('fileinputUser').files[0];

      if (file !== undefined) {
        var customBlockSize = 1024 * 512;

        var host = this.props.login.uriToUserPhoto;
        host = host
          .split('?')[0]
          .replace(AZURE_CONTAINER_NAME + '/' + AZURE_BLOB_NAME + '/', '')
          .replace(this.state.InfoToSave.email, '')
          .replace('.jpg', '');
        var sasToken = this.props.login.uriToUserPhoto;
        sasToken = sasToken.split('?')[1];

        var blobService = window.AzureStorage.Blob.createBlobServiceWithSas(
          host,
          sasToken
        );
        blobService.singleBlobPutThresholdInBytes = customBlockSize;

        var speedSummary = blobService.createBlockBlobFromBrowserFile(
          AZURE_CONTAINER_NAME,
          AZURE_BLOB_NAME + '/' + this.state.InfoToSave.email + '.jpg',
          file,
          function (error, result, response) {
            // apresentar o erro
            if (error) {
              //this.setState({showUserInfoModal: true, showErrorMessage: true, errorMessage: response})
            }
          }
        );
      }
    }
    this.addInstitutions();
  }

  addInstitutions() {
    let listInst = this.state.InfoToSave.institutions || [];
    let haveInstSave = false;
    let index = this.props.login.index;
    let inst;
    let profile;

    if (index < listInst.length) {
      for (let i = index + 1; i < listInst.length; i++) {
        if (listInst[i].new) {
          inst = listInst[i].institution;
          profile = listInst[i].profiles;
          if (isDefined(inst)) {
            if (inst.rowKey !== '') {
              index = i;
              haveInstSave = true;
              break;
            }
          }
        }
      }
    }

    if (haveInstSave) {
      let body = {
        email: this.state.InfoToSave.email,
        rowKey: inst.rowKey,
        profile: profile
      };
      let ultima = false;
      if (index === listInst.length - 1) {
        ultima = true;
      }
      this.props.addUserToInstitution(body, index, ultima);
    } else {
      // atualiza que chegou ao fim com sucesso
      this.props.allInstitutionsAdded();
    }
  }

  updateProfiles() {
    let listInst = this.state.InfoToSave.institutions || [];
    let haveInstSave = false;
    let index = this.props.login.index;
    let inst;
    let profile;

    if (index < listInst.length) {
      for (let i = index + 1; i < listInst.length; i++) {
        if (!listInst[i].new) {
          //só os que não são novas instituições
          inst = listInst[i].institution;
          profile = listInst[i].profiles;
          if (isDefined(inst)) {
            if (inst.rowKey !== '') {
              index = i;
              haveInstSave = true;
              break;
            }
          }
        }
      }
    }

    if (haveInstSave) {
      let body = {
        email: this.state.InfoToSave.email,
        rowKey: inst.rowKey,
        profile: profile
      };
      let ultima = false;
      if (index === listInst.length - 1) {
        ultima = true;
      }
      this.props.addProfileToUserInstitution(body, index, ultima);
    } else {
      // atualiza que chegou ao fim com sucesso
      this.props.allProfilesAdded();
    }
  }

  getProfiles() {
    // Percorrer todas as instituições
    // Para cada instituição obter os perfis correspondentes
    let listInst = this.state.listOfAllUsersInstitutions;
    let listInstProfiles = this.props.login.listOfAllInstitutionsProfils;
    let last = false;
    let lenInst = listInst.length;
    let lenProf = listInstProfiles.length;
    let rowKey = '';
    let index = 0;

    if (lenProf < lenInst) {
      index = lenProf;
      rowKey = listInst[index].rowKey;
      if (index === lenInst) {
        last = true;
      }
      //lista de perfis mantem a ordem das empresas
      this.props.getProfilesInstitution(rowKey, listInstProfiles, last);
    } else {
      this.props.allProfilesGet();
    }
  }

  showEditUser(userKey, userInfo) {
    let allInst = [];

    // Percorrer todas as instituições para carregar as que o utilizador pertence e as que pode ser adicionado
    let numInst = this.state.listOfAllUsersInstitutions.length;
    let listInst = this.state.listOfAllUsersInstitutions;
    let listInstUser = [];
    let name, contact, speciality, photoUri;
    let getInfo = false;

    for (let i = 0; i < numInst; i++) {
      let inst = listInst[i];
      let numUsers = inst.institutionUsers.length;
      let listUsers = inst.institutionUsers;
      let findUser = false;

      for (let j = 0; j < numUsers; j++) {
        let userInst = listUsers[j];
        if (userInst.rowKey === userKey) {
          listInstUser = listInstUser.concat({
            rowKey: inst.rowKey,
            name: inst.name,
            profile: userInst.profile,
            updated: false
          });
          if (!getInfo) {
            name = userInst.name;
            contact = userInst.contact;
            speciality = userInst.specialty;
            photoUri = userInst.photoUri;
            getInfo = true;
          }
          findUser = true;
          break;
        }
      }
      if (!findUser) {
        allInst = allInst.concat({ rowKey: inst.rowKey, name: inst.name });
      }
    }

    let user;
    if (isDefined(userInfo) && !isDefined(name)) {
      user = {
        email: userInfo.email,
        name: userInfo.name,
        contact: userInfo.contact,
        speciality: userInfo.specialty,
        photoUri: userInfo.photoUri,
        institutions: listInstUser
      };
    } else {
      user = {
        email: userKey,
        name: name,
        contact: contact,
        speciality: speciality,
        photoUri: photoUri,
        institutions: listInstUser
      };
    }

    this.setState({
      showAddUser: true,
      userEdit: userKey,
      userEditInfo: user,
      userEditInstitutions: listInstUser,
      allInstList: allInst,
      isLoading: false
    });
  }

  addInstitutionToUser(institution) {
    let list = this.state.userEditInfo.institutions;

    let numInst = this.state.userEditInfo.institutions.length;
    let isSelected = false;
    for (let i = 0; i < numInst; i++) {
      if (list[i].rowKey === institution.rowKey) {
        isSelected = true;
        break;
      }
    }

    if (!isSelected) {
      list = list.concat({
        rowKey: institution.rowKey,
        name: institution.name,
        profile: { name: '' },
        updated: true
      });

      let user = {
        email: this.state.userEditInfo.email,
        name: this.state.userEditInfo.name,
        contact: this.state.userEditInfo.contact,
        speciality: this.state.userEditInfo.speciality,
        photoUri: this.state.userEditInfo.photoUri,
        institutions: list
      };

      this.setState({
        userEditInfo: user
      });
    }
  }

  resetPassword(userKey) {
    // show Message to confirm reset password
    this.setState({
      openDialogConfirmResetPass: !this.state.openDialogConfirmResetPass,
      userEdit: userKey
    });
  }

  onResetPassword() {
    this.props.resetPasswordOtherUser(this.state.userEdit);
  }

  closeDialogResetOrDelete() {
    this.setState({
      openDialogConfirmResetPass: false,
      openDialogConfirmDeleteUser: false,
      userEdit: '',
      userRemove: null
    });
  }

  deleteUser(userKey, userName, institutionKey, institutionName) {
    // show Message to confirm delete user from institution
    this.setState({
      openDialogConfirmDeleteUser: !this.state.openDialogConfirmDeleteUser,
      userRemove: {
        userKey: userKey,
        userName: userName,
        institutionKey: institutionKey,
        institutionName: institutionName
      }
    });
  }

  onDeleteUser() {
    let values = {
      email: this.state.userRemove.userKey,
      rowKey: this.state.userRemove.institutionKey
    };

    this.props.removeUserFromInstitution(values);
  }

  refreshUsersList() {
    let list = this.state.listOfAllUsersInstitutions;
    let indexInst = -1;
    let indexUser = -1;
    let listUsersSelInst = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].rowKey === this.state.userRemove.institutionKey) {
        indexInst = i;
        for (let j = 0; j < list[i].institutionUsers.length; j++) {
          if (list[i].institutionUsers[j].rowKey === this.state.userRemove.userKey) {
            indexUser = j;
            listUsersSelInst = list[i].institutionUsers;
            break;
          }
        }
        break;
      }
    }
    if (indexInst >= 0 && indexUser >= 0) {
      if (listUsersSelInst.length === 1) {
        // IF THE INSTITUTION ONLY HAVE 1 USER, REMOVE THE INSTITUTION
        list.splice(indexInst, 1);
      } else {
        listUsersSelInst.splice(indexUser, 1);
        list[indexInst].institutionUsers = listUsersSelInst;
      }
    }
    return list;
  }

  handleCloseSnackBar() {
    this.setState({
      showSucessMessage: false,
      showErrorMessage: false
    });
  }

  onValidadeEmailMpDS() {
    let doc = document.getElementById('mpdsAdduserEmail');
    if (doc !== null) {
      var emailField = doc.value;
      if (emailField !== undefined) {
        if (emailField.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
          this.setState({ isLoading: true });
          this.props.getUserByEmail(emailField);
        }
      }
    }
  }

  onValidadeEmailMpDSAfterTokenRefresh(email) {
    this.setState({ isLoading: true });
    this.props.getUserByEmail(email);
  }

  render() {
    const { t } = this.props;

    const classesForm = makeStyles((theme) => ({
      container: {
        display: 'flex',
        flexWrap: 'nowrap'
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
      }
    }));

    var listInstParam = this.state.listOfInstitutionsParam || [];

    var valueSpacePerc = 0;
    var valueSpaceUsed = this.state.spaceUsed || '0 MB';
    var valueSpaceAll = this.state.spaceAll || '10000 MB';
    if (isDefined(valueSpaceUsed) && isDefined(valueSpaceAll)) {
      let used = valueSpaceUsed.split(' ');
      let all = valueSpaceAll.split(' ');

      if (used.length > 0 && all.length > 0) {
        let usedValue = parseFloat(used[0]);
        let allValue = parseFloat(all[0]);

        if (allValue > 1000) {
          valueSpaceAll = (allValue / 1000).toFixed(2) + ' GB';
        } else {
          valueSpaceAll = allValue.toFixed(2) + ' ' + all[1];
        }
        if (usedValue > 1000) {
          valueSpaceUsed = (usedValue / 1000).toFixed(2) + ' GB';
        } else {
          valueSpaceUsed = usedValue.toFixed(2) + ' ' + used[1];
        }
        valueSpacePerc = parseFloat(
          ((usedValue.toFixed(2) * 100) / allValue.toFixed(2)).toFixed(2)
        );
      }
    }

    let listUsersAlt = this.state.listOfAllUsersInstitutions;

    return (
      <>
        <div
          className='container'
          hidden={
            !this.props.login.userAcess.settings || this.props.login.getAllInfoInProgress
          }
        >
          <div className='pb-4 d-flex align-items-center'>
            <span className='title-space-disk text-uppercase'>{t('diskSpace')}</span>
            <LinearProgress
              className='mx-3 secondary-color disk-space-progress'
              variant={'determinate'}
              value={valueSpacePerc}
            />
            <span className='space-available-text roboto-regular primary-color pr-2'>
              {valueSpaceUsed}
            </span>
            <span className='space-available-text roboto-regular primary-color pr-2'>
              {' '}
              {t('of')}{' '}
            </span>
            <span className='space-available-text roboto-black secondary-color pr-3'>
              {valueSpaceAll}
            </span>
            {/* A opção de comprar apenas vai ficar disponível em versões futuras */}
            {/*<Button 
                            className="px-4 py-0 font-size-12-px button-report-apply my-auto text-capitalize" 
                            color="primary" 
                            variant="contained" 
                            disableRipple
                            disableTouchRipple
                            focusRipple
                            href={t('urlInformationRequest')} 
                            target="_blank"
                        >{'Comprar +'}
                        </Button> */}
          </div>
        </div>

        <NavTabsAdmin
          onChangeTabs={(value) => this.handleChangeTabs(value)}
          indexTabsParent={this.state.indexTabs}
          saveEnable={this.state.changeValues}
          onUpdate={() => this.onUpdate()}
          onCancel={() => this.validateCancel()}
          //onSave={() => this.validateInstitutions()}
          onSave={() => this.activeIsLoading()}
          addUser={() => this.changeShowAddUser()}
        >
          {this.props}
        </NavTabsAdmin>

        <div id='back-to-top-anchor-admin'></div>
        <div
          className='container pb-5'
          hidden={
            !this.props.login.userAcess.settings ||
            this.props.login.getAllInfoInProgress ||
            this.props.login.inLoadInfo
          }
        >
          <div className='pb-5' hidden={this.state.indexTabs !== 0}>
            <div id='div-admin-users'></div>
            <UsersPage
              //listInst={this.state.listOfAllUsersInstitutions}
              listInst={listUsersAlt}
              showUser={(userKey) => this.showEditUser(userKey)}
              resetPassword={(userKey) => this.resetPassword(userKey)}
              deleteUser={(userKey, userName, institutionKey, institutionName) =>
                this.deleteUser(userKey, userName, institutionKey, institutionName)
              }
              expand={(rowKey) => this.onChangeExpandedUsers(rowKey)}
              expandAll={(forceTrue) => this.expandCloseAllUsers(forceTrue)}
              isAllExpanded={this.state.expandAllUsers}
              actualUser={this.props.login.email}
              actualInstitution={this.props.login.institution}
            ></UsersPage>
          </div>
          <div hidden={this.state.indexTabs !== 1}>
            <LoadingModal hidden={!this.state.isLoading} />
            <div id='div-admin-institutions'></div>
            <Row className='flex-row-reverse'>
              <Col xs={12} md={3} className='align-self-end mb-2 mb-md-0'>
                <Button
                  aria-label='f3m'
                  onClick={() => this.expandCloseAll()}
                  className='float-right outline mt-2'
                  disableFocusRipple
                  disableRipple
                  endIcon={
                    !this.state.expandAll ? (
                      <UnfoldMoreIcon
                        fontSize='default'
                        color='primary'
                        className='mb-2 mb-md-4 mb-lg-1'
                      />
                    ) : (
                        <UnfoldLessIcon
                          fontSize='default'
                          color='primary'
                          className='mb-2 mb-md-4 mb-lg-1'
                        />
                      )
                  }
                >
                  {!this.state.expandAll ? (
                    <span className='mb-2 mb-md-4 mb-lg-1 text-capitalize font-size-13-px roboto-regular primary-color'>
                      {t('allOpen')}
                    </span>
                  ) : (
                      <span className='mb-2 mb-md-4 mb-lg-1 text-capitalize roboto-regular primary-color'>
                        {t('allClose')}
                      </span>
                    )}
                </Button>
              </Col>
            </Row>
            <div className='expanded-panels-container'>
              {listInstParam.map((option, index) => (
                <ExpansionPanel
                  expanded={option.expanded}
                  className='expanded-institution'
                  onChange={(v) => this.onChangeExpanded(v, index)}
                  key={'IsntParam' + index}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id={'panel1a-header' + index}
                  >
                    <Typography className='institution-title nunito-regular pt-1'>
                      {option.name}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className='companys-panel-padding-fix d-flex flex-column'>
                    <Box className='roboto-bold font-size-14-px'>
                      {t('timeForUpdate')}
                    </Box>

                    <form className='input-time-update' noValidate>
                      <TextField
                        fullWidth
                        id={'timer' + index}
                        type='number'
                        value={option.numMinutos}
                        className={classesForm.textField}
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          step: 1,
                          min: 0
                        }}
                        onChange={(v) => this.changeNumberHours(v, index)}
                        disable={this.state.changeValue ? 'false ' : 'true'}
                      />
                    </form>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
            </div>
          </div>
        </div>
        <BackToTop iddiv={'#back-to-top-anchor-admin'}></BackToTop>

        {/* DIALOG MSG CONFIRMAÇÃO */}
        <Dialog
          open={this.state.openDialogConfirm}
          className='admin-modals'
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent className='pb-0 px-4'>
            <DialogContentText id='alert-dialog-description-confirm-save'>
              {t('msgAlertInstitutionsUpdate')}
              {this.state.listOfInstitutionsMsg.map((line) => (
                <div>{line}</div>
              ))}
              {t('confirmQuestion')}
            </DialogContentText>
          </DialogContent>
          <DialogActions className='pt-0 pr-4'>
            <Button
              className='outline-none'
              onClick={(v) => this.closeDialogInstitution()}
              color='#494949'
              autoFocus
              disableFocusRipple
              disableElevation
              disableRipple
            >
              {t('goBack')}
            </Button>
            <Button
              className='outline-none'
              onClick={(v) => this.onSaveInstitutions()}
              color='494949'
              disableFocusRipple
              disableElevation
              disableRipple
            >
              {t('Yes')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG MSG CONFIRMAÇÃO CANCELAR */}
        <Dialog
          open={this.state.openDialogConfirmCancel}
          className='admin-modals'
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent className='pb-0 px-4'>
            <DialogContentText id='alert-dialog-confirm-cancel'>
              {t('loseUnsavedChanges')}
              {' ' + t('confirmQuestion')}
            </DialogContentText>
          </DialogContent>
          <DialogActions className='pt-0 pr-4'>
            <Button
              className='outline-none'
              onClick={(v) => this.closeDialogCancel()}
              color='#494949'
              autoFocus
              disableFocusRipple
              disableElevation
              disableRipple
            >
              {t('goBack')}
            </Button>
            <Button
              className='outline-none'
              onClick={(v) => this.onRefreshInstitutions()}
              color='primary'
              disableFocusRipple
              disableElevation
              disableRipple
            >
              {t('Yes')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG CONFIRM CANCEL USER FORM*/}
        <Dialog
          open={this.state.openDialogConfirmCancelUser}
          className='admin-modals'
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogContent className='pb-0 px-4'>
            <DialogContentText id='alert-dialog-confirm-cancel'>
              {t('loseUnsavedChanges')}
              {' ' + t('confirmQuestion')}
            </DialogContentText>
          </DialogContent>
          <DialogActions className='pt-0 pr-4'>
            <Button
              className='outline-none'
              onClick={(v) => this.closeDialogCancel()}
              color='#494949'
              autoFocus
              disableFocusRipple
              disableElevation
              disableRipple
            >
              {t('No')}
            </Button>
            <Button
              className='outline-none'
              onClick={(v) => this.changeShowAddUser()}
              color='primary'
              disableFocusRipple
              disableElevation
              disableRipple
            >
              {t('Yes')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG MSG CONFIRMAÇÃO RESET PASSWORD */}
        <Dialog
          maxWidth='sm'
          fullWidth
          className='admin-modals'
          open={this.state.openDialogConfirmResetPass}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title' className='px-4'>
            {t('ResetPass')}?
          </DialogTitle>
          <DialogContent className='py-0 px-4'>
            <DialogContentText id='alert-dialog-reset-password'>
              {t('confirmMsgResetPass')}
            </DialogContentText>
          </DialogContent>
          <DialogActions className='pt-0 pr-4'>
            <Button
              className='outline-none text-capitalize'
              onClick={(v) => this.closeDialogResetOrDelete()}
              color='#494949'
              autoFocus
              disableFocusRipple
              disableElevation
              disableRipple
            >
              {t('goBack')}
            </Button>
            <Button
              className='outline-none text-capitalize'
              onClick={(v) => this.onResetPassword()}
              color='primary'
              disableFocusRipple
              disableElevation
              disableRipple
            >
              {t('ResetPass')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG MSG CONFIRMAÇÃO DELETE USER FROM INSTITUTION */}
        <Dialog
          open={this.state.openDialogConfirmDeleteUser}
          className='admin-modals'
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title' className='px-4'>
            {t('DeleteUser')}?
          </DialogTitle>
          <DialogContent className='py-0 px-4'>
            <DialogContentText id='alert-dialog-reset-password'>
              {isDefined(this.state.userRemove)
                ? t('confirmMsgDeleteUser')
                  .replace(
                    '[$USER$]',
                    this.state.userRemove.userName +
                    ' (' +
                    this.state.userRemove.userKey +
                    ')'
                  )
                  .replace('[$INSTITUTION$]', this.state.userRemove.institutionName)
                : t('error_default')}
            </DialogContentText>
          </DialogContent>
          <DialogActions className='pt-0 pr-4'>
            <Button
              className='outline-none text-capitalize'
              onClick={(v) => this.closeDialogResetOrDelete()}
              color='#494949'
              autoFocus
              disableFocusRipple
              disableRipple
            >
              {t('goBack')}
            </Button>
            <Button
              className='outline-none text-capitalize'
              onClick={(v) => this.onDeleteUser()}
              color='primary'
              disableFocusRipple
              disableRipple
            >
              {t('DeleteUser')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Mensagem de alterações gravadas com sucesso */}
        <Snackbar
          open={this.state.showSucessMessage}
          autoHideDuration={5000}
          onClose={this.handleCloseSnackBar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <MuiAlert
            elevation={6}
            variant='filled'
            onClose={this.handleCloseSnackBar}
            severity='success'
          >
            {t(this.state.sucessMessage)}
          </MuiAlert>
        </Snackbar>

        {/* Mensagem de Erro */}
        <Snackbar
          open={this.state.showErrorMessage}
          autoHideDuration={5000}
          onClose={this.handleCloseSnackBar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <MuiAlert
            elevation={6}
            variant='filled'
            onClose={this.handleCloseSnackBar}
            severity='error'
          >
            {t(this.state.errorMessage)}
          </MuiAlert>
        </Snackbar>

        {/* Modal Add/Change User*/}
        <DialogUsersForm
          showUserInfoModal={this.state.showAddUser}
          onClose={(v) => this.closeAddUserForm(v)}
          saveUser={(v) => this.saveUser(v)}
          editMode={this.state.userEdit !== ''}
          userInfo={this.state.userEditInfo}
          allInstitutions={this.state.allInstList}
          onAddInstitutionToUser={(v) => this.addInstitutionToUser(v)}
          saveInProgress={this.props.login.createUserInProgress}
          onValidadeEmailMpDS={() => this.onValidadeEmailMpDS()}
          actualUser={this.props.login.email}
          isLoading={this.state.isLoading}
          allProfiles={this.props.login.listOfAllInstitutionsProfils}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({ login: state.login, patient: state.patient, woundInfo: state.woundInfo });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setLoading, getInstitutionsInfo, updateInstitution, updateListInstitutionToSave, getAllUsersAllInstitutionsAndInstitutionsInfo, getAllAdminInfo, resetPasswordOtherUser, createUser, updateUser, addUserToInstitution, allInstitutionsAdded, removeUserFromInstitution, getUserByEmail, getSpaceUsed, getTokenRefresh, addProfileToUserInstitution, allProfilesGet, getProfilesInstitution, allProfilesAdded, getURItoUploadPhotoAdmin }, dispatch);
export default withTranslation()(connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage))


