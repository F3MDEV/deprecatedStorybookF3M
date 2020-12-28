import {
  acessToken,
  acessTokenRefresh,
  InstitutionId,
  InstitutionName,
  InstitutionNIF,
  userEmail,
  userEmailVal,
  Institutions,
  loginsStorage,
  patientIDSel,
  woundIDSel,
  showClosedWounds,
  showOpenWounds,
  lgEmail,
  lgInstitution,
  lgPatient
} from '../../../utils/constants';
import axios from 'axios';

const INITIAL_STATE = {
  email: localStorage.getItem(userEmail),
  pass: null,
  token: sessionStorage.getItem(acessToken),
  tokenRefresh: sessionStorage.getItem(acessTokenRefresh),
  validToken:
    sessionStorage.getItem(acessToken) != undefined &&
    sessionStorage.getItem(acessToken) != null,
  validLogin: true,
  listOfInstitutions: sessionStorage.getItem(Institutions),
  listOfInstitutionsParam: getListParam(sessionStorage.getItem(Institutions)),
  institution: localStorage.getItem(InstitutionId),
  nameInstitution: localStorage.getItem(InstitutionName),
  nifInstitution: localStorage.getItem(InstitutionNIF),
  userInfo: false,
  userName: null,
  userSpeciality: null,
  userDescription: null,
  userPhotoUri: null,
  userContact: null,
  userInfoChanged: false,
  resetPass: false,
  resetPassSucess: true,
  showLogin: true,
  showInstitution: false,
  showChangePass: false,
  firstLogin: false,
  showLoginUser: numListUsers() === 1,
  showLoginListUsers: numListUsers() >= 2,
  listaLogins: JSON.parse(localStorage.getItem(loginsStorage)),
  errorEmailMsg: null,
  errorPassMsg: null,
  errorMsg: null,
  listOfUsersInstitution: [],
  isLoading: false,
  ClientName: '',
  ClientNIF: '',
  refreshInst: false,
  getAllUsersInProgress: false,
  listOfAllUsersInstitutions: [],
  showMessageUpdateSucess: false,
  showMessageUpdateErro: false,
  errorMessage: '',
  getUsersInProgress: false,
  changePasswordAfterLoginSucess: null,
  changePasswordAfterLoginMessage: null,
  uriToUserPhoto: null,
  fileNameToUserPhoto: null,
  changeUserInfoState: null,
  changeUserErrorMessage: null,
  resetPasswordOtherUserSucess: null,
  resetPasswordOtherUserMessage: null,
  createUserInProgress: false,
  stepsCreateUser: '',
  errorCreateUser: false,
  msgErrorCreateUser: '',
  removeUserSucess: null,
  msgRemoveUser: '',
  loginExtEmail: sessionStorage.getItem(lgEmail),
  loginExtInstitution: sessionStorage.getItem(lgInstitution),
  loginExtPatient: sessionStorage.getItem(lgPatient),
  validateUser: null,
  validateUserInProgress: false,
  getSpaceUsedInProgress: false,
  spaceUsed: '',
  spaceAll: '',
  changePhotoStorage: false,
  validateUserAcessInLogin: false,
  userAcess: { wounds: false, settings: false },
  needTokenRefresh: false,
  errorLimitUsers: '',
  validateUserEmail: '',
  updateInstitutionInProgress: false,
  infoInstitutionsUpdate: [],
  updateInstitutionIndex: -1,
  updateNext: false,
  getClientInProgress: false,
  inUserInfoRefresh: false,
  showPersonalUserInfoProgress: false,
  listOfAllInstitutionsProfils: [],
  getProfilesInProgress: false,
  userExist: null,
  userProfile: null,
  getAllInfoInProgress: false,
  inLoadInfo: false,
  errorAccessDenied: null,
  getUsersDone: false,
  versionCompatible: null,
  userCardListView: false,
  userDarkMode: false,
  tokenRefeshinProgress: false,
  fetchUsers: null
};

function numListUsers() {
  var list = JSON.parse(localStorage.getItem(loginsStorage)) || [];
  var num = list.length;
  return num;
}

function getListParam(listData, listState) {
  var listRes = [];
  let list = JSON.parse(listData) || [];
  let varName = localStorage.getItem(InstitutionName);
  let numInst = list.length;

  for (let i = 0; i < numInst; i++) {
    let inst = list[i];
    listRes = listRes.concat([
      {
        rowKey: inst.rowKey,
        nif: inst.nif,
        name: inst.name,
        numMinutos: inst.editingTimePeriod,
        expanded:
          listState !== undefined && listState != null
            ? listState[i].expanded
            : varName === inst.name
      }
    ]);
  }
  return listRes;
}

function getListInstitutionsExpanded(list, listState) {
  var listRes = [];
  let varName = localStorage.getItem(InstitutionName);
  let maxInst = list.length;

  for (let i = 0; i < maxInst; i++) {
    let listUsers = [];
    let item = list[i];
    let maxUsers = item.institutionUsers.length;

    for (let j = 0; j < maxUsers; j++) {
      let itemUser = item.institutionUsers[j];

      let user = {
        name: itemUser.name,
        rowKey: itemUser.rowKey,
        specialty: itemUser.specialty,
        contact: itemUser.contact,
        photoUri: itemUser.photoUri,
        profile: { id: itemUser.profileId, name: itemUser.profileName }
      };
      listUsers.push(user);
    }

    listRes = listRes.concat([
      {
        rowKey: item.rowKey,
        name: item.name,
        institutionUsers: listUsers,
        expanded:
          listState !== undefined && listState != null
            ? listState[i].expanded
            : varName === item.name
      }
    ]);
  }

  return listRes;
}

function getInfoActualUser(list) {
  let userInfo = {
    name: '',
    specialty: '',
    photoUri: '',
    contact: '',
    userProfile: '',
    userAcess: { wounds: true, settings: true },
    isCardListView: false,
    isDarkMode: false
  };

  let maxInst = list.length;
  let actualInst = localStorage.getItem(InstitutionId);
  let actualUser = localStorage.getItem(userEmail);

  for (let i = 0; i < maxInst; i++) {
    let item = list[i];
    if (item.rowKey === actualInst) {
      let maxUsers = item.institutionUsers.length;

      for (let j = 0; j < maxUsers; j++) {
        let itemUser = item.institutionUsers[j];
        if (itemUser.rowKey === actualUser) {
          userInfo = {
            name: itemUser.name,
            specialty: itemUser.specialty,
            photoUri: itemUser.photoUri,
            contact: itemUser.contact,
            userProfile: itemUser.profileName,
            userAcess: getUserAcess(itemUser.profileId),
            isCardListView: itemUser.isCardListView,
            isDarkMode: itemUser.isDarkMode
          };
          break;
        }
      }

      break;
    }
  }

  return userInfo;
}

//Receber o ID
function getUserAcess(profile) {
  let userAcess = { wounds: true, settings: true };

  if (profile == null) {
    userAcess = { wounds: true, settings: true };
  } else {
    if (profile === 'User_Admin') {
      userAcess = { wounds: false, settings: true };
    } else if (profile === 'User_MpDS') {
      userAcess = { wounds: true, settings: false };
    } else if (profile === 'User_Admin_MpDS') {
      userAcess = { wounds: true, settings: true };
    } else {
      // User_2Opinion
      userAcess = { wounds: false, settings: false };
    }
  }

  return userAcess;
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOKEN_VALIDATED':
      if (!action.erro) {
        if (action.payload.result.isDefinitive_password) {
          sessionStorage.setItem(acessToken, action.payload.result.accessToken);
          sessionStorage.setItem(acessTokenRefresh, action.payload.result.token_refresh);

          // guarda o token para utilizar nos restantes pedidos
          axios.defaults.headers.common['authorization'] =
            'Bearer ' + sessionStorage.getItem(acessToken);

          return {
            ...state,
            validToken: true,
            token: action.payload.result.accessToken,
            tokenRefresh: action.payload.result.token_refresh,
            resetPassSucess: true,
            /*             showLogin: false,
                        showInstitution: false,
                        showChangePass: false,
                        firstLogin: false, */
            errorEmailMsg: null,
            errorPassMsg: null,
            errorMsg: null,
            listOfUsersInstitution: [],
            spaceUsed: '',
            spaceAll: '',
            errorLimitUsers: '',
            isLoading: false,
            getUsersDone: false,
            //versionCompatible: true
            tokenRefeshinProgress: false,
          };
        } else {
          return {
            ...state,
            validToken: false,
            token: null,
            tokenRefresh: '',
            resetPass: true,
            /* showLogin: false,
            showInstitution: false,
            showChangePass: false,
            firstLogin: true, */
            errorEmailMsg: null,
            errorPassMsg: null,
            errorMsg: null,
            listOfUsersInstitution: [],
            spaceUsed: '',
            spaceAll: '',
            errorLimitUsers: '',
            getUsersDone: false,
            tokenRefeshinProgress: false
          };
        }
      } else {
        // remover os dados da localstorage
        sessionStorage.removeItem(acessToken);
        sessionStorage.removeItem(acessTokenRefresh);
        //localStorage.removeItem(userEmail);

        let error = '';

        if (action.payload.status === 403) {
          sessionStorage.removeItem(Institutions);

          if (
            action.payload.data.applicationMessages[0] ==
            'ERROR: MAXIMUM NUMBER OF ONLINE USERS.'
          ) {
            error = 'MAX_NUM_USERS';

            //LIMPA INSTITUIÇÃO EM STORAGE PARA CONSEGUIR ENTRAR NOUTRA INSTITUIÇÃO
            localStorage.removeItem(InstitutionId);
            localStorage.removeItem(InstitutionName);
            localStorage.removeItem(InstitutionNIF);

            return {
              ...state,
              token: null,
              errorLimitUsers: error,
              institution: '',
              nameInstitution: '',
              nifInstitution: '',
              tokenRefeshinProgress: false
            };
          } else {
            return {
              ...state,
              validToken: false,
              token: null,
              tokenRefresh: '',
              pass: null,
              email: null,
              userInfo: false,
              userName: null,
              userSpeciality: null,
              userDescription: null,
              userPhotoUri: null,
              userContact: null,
              resetPassSucess: true,
              showLogin: true,
              showInstitution: false,
              showChangePass: false,
              firstLogin: false,
              listOfUsersInstitution: [],
              listOfAllUsersInstitutions: [],
              spaceUsed: '',
              spaceAll: '',
              errorLimitUsers: '',
              errorAccessDenied: null,
              getUsersDone: false,
              tokenRefeshinProgress: false
            };
          }
        } else if (action.payload.status === 500) {
          if (action.payload.data.applicationMessages[0] == 'ERROR: ACCESS DENIED.') {
            error = 'ACCESS_DENIED';

            let listInst = JSON.parse(sessionStorage.getItem(Institutions));

            if (listInst.length === 1) {
              // só tem uma instituição e não tem acesso.
              // Apresentar erro e ficar no login
              return {
                ...state,
                validToken: false,
                token: null,
                tokenRefresh: '',
                pass: null,
                email: null,
                userInfo: false,
                userName: null,
                userSpeciality: null,
                userDescription: null,
                userPhotoUri: null,
                userContact: null,
                resetPassSucess: true,
                showLogin: true,
                showInstitution: false,
                showChangePass: false,
                firstLogin: false,
                listOfUsersInstitution: [],
                listOfAllUsersInstitutions: [],
                spaceUsed: '',
                spaceAll: '',
                errorLimitUsers: '',
                errorAccessDenied: error,
                getUsersDone: false,
                tokenRefeshinProgress: false
              };
            } else {
              // tem outras instituições
              // Apresentar lista de instituições para selecionar

              //LIMPA INSTITUIÇÃO EM STORAGE PARA CONSEGUIR ENTRAR NOUTRA INSTITUIÇÃO
              localStorage.removeItem(InstitutionId);
              localStorage.removeItem(InstitutionName);
              localStorage.removeItem(InstitutionNIF);

              return {
                ...state,
                validToken: false,
                token: null,
                tokenRefresh: '',
                showLogin: false,
                userInfo: false,
                userName: null,
                userSpeciality: null,
                userDescription: null,
                userPhotoUri: null,
                userContact: null,
                showInstitution: true,
                showLogin: false,
                showChangePass: false,
                firstLogin: false,
                errorLimitUsers: '',
                errorAccessDenied: error,
                institution: '',
                nameInstitution: '',
                nifInstitution: '',
                tokenRefeshinProgress: false
              };
            }
          } else {
            return {
              ...state,
              validToken: false,
              token: null,
              tokenRefresh: '',
              pass: null,
              email: null,
              userInfo: false,
              userName: null,
              userSpeciality: null,
              userDescription: null,
              userPhotoUri: null,
              userContact: null,
              resetPassSucess: true,
              showLogin: true,
              showInstitution: false,
              showChangePass: false,
              firstLogin: false,
              listOfUsersInstitution: [],
              listOfAllUsersInstitutions: [],
              spaceUsed: '',
              spaceAll: '',
              errorLimitUsers: '',
              errorAccessDenied: null,
              getUsersDone: false,
              tokenRefeshinProgress: false
            };
          }
        }

        sessionStorage.removeItem(Institutions);

        return {
          ...state,
          validToken: false,
          token: null,
          tokenRefresh: '',
          pass: null,
          email: null,
          userInfo: false,
          userName: null,
          userSpeciality: null,
          userDescription: null,
          userPhotoUri: null,
          userContact: null,
          resetPassSucess: true,
          showLogin: true,
          showInstitution: false,
          showChangePass: false,
          firstLogin: false,
          listOfUsersInstitution: [],
          listOfAllUsersInstitutions: [],
          spaceUsed: '',
          spaceAll: '',
          errorLimitUsers: '',
          errorAccessDenied: null,
          getUsersDone: false,
          tokenRefeshinProgress: false
        };
      }
    case 'LOGIN_SUCESS':
      const user = {
        email: action.acvalues.email,
        pass: action.acvalues.password
      };

      let valLogin = true;
      if (localStorage.getItem(userEmailVal) == user.email) {
        valLogin = false;
      }

      localStorage.setItem(userEmail, user.email);

      sessionStorage.setItem(Institutions, JSON.stringify(action.payload.result));

      let varNameInstitution = null;
      let varInstitution = null;
      let varNifInstitution = null;
      let showInstitution = true;

      if (action.payload.result.length === 1) {
        varNameInstitution = action.payload.result[0].name;
        varInstitution = action.payload.result[0].rowKey;
        varNifInstitution = action.payload.result[0].nif;
        showInstitution = false;

        localStorage.setItem(InstitutionId, varInstitution);
        localStorage.setItem(InstitutionName, varNameInstitution);
        localStorage.setItem(InstitutionNIF, varNifInstitution);
      } else {
        // validar se tem instituicao em storage..
        // se sim, e se tem acesso abre essa
        var institutionStorage = localStorage.getItem(InstitutionId);
        if (institutionStorage != null) {
          action.payload.result.map((item, key) => {
            if (item.rowKey === institutionStorage) {
              varInstitution = item.rowKey;
              varNameInstitution = item.name;
              varNifInstitution = item.nif;
              showInstitution = false;

              localStorage.setItem(InstitutionId, varInstitution);
              localStorage.setItem(InstitutionName, varNameInstitution);
              localStorage.setItem(InstitutionNIF, varNifInstitution);
            }
          });
        }
      }

      return {
        ...state,
        email: user.email,
        pass: user.pass,
        validLogin: true,
        validToken: false,
        token: null,
        listOfInstitutions: JSON.stringify(action.payload.result),
        listOfInstitutionsParam: getListParam(JSON.stringify(action.payload.result)),
        institution: varInstitution,
        nameInstitution: varNameInstitution,
        nifInstitution: varNifInstitution,
        resetPassSucess: true,
        showLogin: false,
        showInstitution: showInstitution,
        showChangePass: false,
        firstLogin: false,
        showLoginUser: false,
        showLoginListUsers: false,
        error: false,
        errorEmailMsg: null,
        errorPassMsg: null,
        errorMsg: null,
        listOfUsersInstitution: [],
        listOfAllUsersInstitutions: [],
        loginExtEmail: '',
        loginExtInstitution: '',
        spaceUsed: '',
        spaceAll: '',
        validateUserAcessInLogin: valLogin,
        getUsersDone: false
      };
    case 'LOGIN_ERROR':
      localStorage.setItem(userEmail, action.acvalues.email);

      if (action.payload != undefined) {
        var errorCode = action.payload.status;
        var erros = action.payload.data.applicationMessages;

        var errosEmail = null;
        var errosPass = null;
        var errosGeral = null;

        if (errorCode === 502) {
          if (erros[0] === 'Invalid data') {
            erros = action.payload.data.modelErros || [];
            errosEmail = 'INVALID_EMAIL';
          }
        } else if (errorCode === 500) {
          if (erros[0] === 'ERROR: INVALID EMAIL OR PASSWORD.') {
            errosGeral = 'INVALID_EMAIL_OR_PASSWORD';
          }
        } else if (errorCode === 404) {
          if (erros[0] === 'ERROR: USER WITHOUT INSTITUTIONS.') {
            errosEmail = 'USER_WITHOUT_INSTITUTIONS';
          } else if (
            erros[0] === 'ERROR: THE USER IS NOT ASSOCIATED WITH ANY INSTITUTION.'
          ) {
            errosEmail = 'USER_WITHOUT_INSTITUTIONS';
          }
        } else if (erros[0] === 'ERROR: INVALID INSTITUTION_ID.') {
          errosEmail = 'INVALID_INSTITUTION_ID';
        } else if (erros[0] === 'ERROR: INVALID TOKEN REFRESH.') {
          errosGeral = 'INVALID_TOKEN_REFRESH';
        }

        return {
          ...state,
          pass: null,
          validLogin: false,
          validToken: false,
          token: null,
          resetPassSucess: true,
          showLogin: true,
          showInstitution: false,
          showChangePass: false,
          firstLogin: false,
          errorEmailMsg: errosEmail,
          errorPassMsg: errosPass,
          errorMsg: errosGeral,
          listOfUsersInstitution: [],
          listOfAllUsersInstitutions: [],
          spaceUsed: '',
          spaceAll: '',
          getUsersDone: false
        };
      } else {
        return {
          ...state,
          pass: null,
          validLogin: false,
          validToken: false,
          token: null,
          resetPassSucess: true,
          showLogin: true,
          showInstitution: false,
          showChangePass: false,
          firstLogin: false,
          errorEmailMsg: '',
          errorPassMsg: '',
          errorMsg: 'fail_service',
          listOfUsersInstitution: [],
          listOfAllUsersInstitutions: [],
          spaceUsed: '',
          spaceAll: '',
          getUsersDone: false
        };
      }

    case 'LOGOUT':
      sessionStorage.removeItem(acessToken);
      sessionStorage.removeItem(acessTokenRefresh);
      localStorage.removeItem(userEmail);
      sessionStorage.removeItem(Institutions);
      sessionStorage.removeItem(patientIDSel);
      sessionStorage.removeItem(woundIDSel);
      sessionStorage.removeItem(showClosedWounds);
      sessionStorage.removeItem(showOpenWounds);
      sessionStorage.removeItem(lgEmail);
      sessionStorage.removeItem(lgInstitution);
      sessionStorage.removeItem(lgPatient);

      return {
        ...state,
        email: null,
        pass: null,
        validToken: false,
        token: null,
        tokenRefresh: '',
        institution: localStorage.getItem(InstitutionId),
        nameInstitution: localStorage.getItem(InstitutionName),
        nifInstitution: localStorage.getItem(InstitutionNIF),
        userInfo: false,
        userName: null,
        userSpeciality: null,
        userDescription: null,
        userPhotoUri: null,
        userContact: null,
        resetPass: false,
        resetPassSucess: true,
        showLogin: true,
        showInstitution: false,
        showChangePass: false,
        firstLogin: false,
        showLoginUser: numListUsers() === 1,
        showLoginListUsers: numListUsers() >= 2,
        listaLogins: JSON.parse(localStorage.getItem(loginsStorage)),
        errorEmailMsg: null,
        errorPassMsg: null,
        errorMsg: null,
        listOfUsersInstitution: [],
        listOfAllUsersInstitutions: [],
        isLoading: false,
        ClientName: '',
        ClientNIF: '',
        spaceUsed: '',
        spaceAll: '',
        userAcess: { wounds: false, settings: false },
        userProfile: null,
        getUsersDone: false,
        userCardListView: false,
        userDarkMode: false
      };

    case 'GETUSER_VALIDATED':
      if (!action.erro) {
        var lista = JSON.parse(localStorage.getItem(loginsStorage)) || [];

        var utilizador = {
          email: localStorage.getItem(userEmail),
          name: action.payload.name,
          specialty: action.payload.specialty,
          photoUri: action.payload.photoUri
        };

        if (utilizador.email != null) {
          const index = lista.findIndex((l) => l.email === utilizador.email);

          /* if (index === 0) {
            lista.splice(index, index + 1);
          } else if (index >= 1) {
            lista.splice(index, index); // remove o item selecionado
          } */
          if (index >= 0) {
            lista.splice(index, 1);
          }
          lista.push(utilizador);

          localStorage.setItem(loginsStorage, JSON.stringify(lista));
        }

        let profile = action.payload.profileId;
        let userAcess = getUserAcess(profile);

        return {
          ...state,
          userInfo: true,
          userName: action.payload.name,
          userSpeciality: action.payload.specialty,
          userDescription: action.payload.description,
          userPhotoUri: action.payload.photoUri,
          userContact: action.payload.contact,
          resetPassSucess: true,
          listaLogins: JSON.parse(localStorage.getItem(loginsStorage)),
          listOfUsersInstitution: [],
          changePhotoStorage: true,
          userProfile: action.payload.profileName, //profile,
          userAcess: userAcess,
          getUsersDone: false,
          userCardListView: action.payload.isCardListView,
          isDarkMode: action.payload.isDarkMode
        };
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          return {
            ...state,
            needTokenRefresh: true
          };
        } else return state;
      }

    case 'RESETPASSWORDOTHERUSER_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          resetPasswordOtherUserSucess: true,
          resetPasswordOtherUserMessage: null
        };
      } else {
        let errorMsg;
        if (
          action.payload.applicationMessages == 'ERROR: THE NEW PASSWORD IS INSECURE!'
        ) {
          errorMsg = 'THE_NEW_PASSWORD_IS_INSECURE';
        } else if (action.payload.applicationMessages == 'Invalid data') {
          errorMsg = 'INVALID_EMAIL';
        } else {
          errorMsg = action.payload.applicationMessages;
        }
        return {
          ...state,
          resetPasswordOtherUserSucess: false,
          resetPasswordOtherUserMessage: errorMsg
        };
      }

    case 'CHANGEPASSWORD_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          changePasswordAfterLoginSucess: true,
          changePasswordAfterLoginMessage: null
        };
      } else {
        let errorMsg;
        if (
          action.payload.applicationMessages == 'ERROR: THE NEW PASSWORD IS INSECURE!'
        ) {
          errorMsg = 'THE_NEW_PASSWORD_IS_INSECURE';
        } else if (action.payload.applicationMessages == 'Invalid data') {
          errorMsg = 'INVALID_EMAIL';
        } else {
          errorMsg = action.payload.applicationMessages;
        }
        return {
          ...state,
          changePasswordAfterLoginSucess: false,
          changePasswordAfterLoginMessage: errorMsg
        };
      }

    case 'RESETPASSWORD_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          email: null,
          pass: null,
          validToken: false,
          token: null,
          userInfo: false,
          userName: null,
          userSpeciality: null,
          userDescription: null,
          userPhotoUri: null,
          userContact: null,
          resetPassSucess: true,
          showLogin: true,
          showInstitution: false,
          showChangePass: false,
          firstLogin: false,
          error: false,
          errorMessage: null
        };
      } else {
        if (
          action.payload.applicationMessages == 'ERROR: THE NEW PASSWORD IS INSECURE!'
        ) {
          errosPass = 'THE_NEW_PASSWORD_IS_INSECURE';
          errosGeral = null;
        } else if (action.payload.applicationMessages == 'Invalid data') {
          errosGeral = 'INVALID_EMAIL';
          errosPass = null;
        } else {
          errosGeral = action.payload.applicationMessages;
          errosPass = null;
        }
        return {
          ...state,
          resetPassSucess: false,
          errorMsg: errosGeral,
          errorPassMsg: errosPass
        };
      }

    case 'GETUSERINSTITUTION_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          listOfUsersInstitution: action.payload,
          getUsersInProgress: false,
          getUsersDone: true
        };
      } else {
        return {
          ...state,
          listOfUsersInstitution: [],
          getUsersInProgress: false,
          getUsersDone: false
        };
      }
    case 'GET_USER_AND_USERINSTITUTION':
      if (!action.error) {
        var lista1 = JSON.parse(localStorage.getItem(loginsStorage)) || [];

        var utilizador1 = {
          email: localStorage.getItem(userEmail),
          name: action.payload.name,
          specialty: action.payload.specialty,
          photoUri: action.payload.photoUri
        };

        if (utilizador1.email != null) {
          const index1 = lista1.findIndex((l) => l.email === utilizador1.email);

          /* if (index1 === 0) {
            lista1.splice(index1, index1 + 1);
          } else if (index1 >= 1) {
            lista1.splice(index1, index1); // remove o item selecionado
          } */
          if (index1 >= 0) {
            lista1.splice(index1, 1);
          }
          lista.push(utilizador1);

          localStorage.setItem(loginsStorage, JSON.stringify(lista1));
        }

        return {
          ...state,
          userInfo: true,
          userName: action.payload.name,
          userSpeciality: action.payload.specialty,
          userDescription: action.payload.description,
          userPhotoUri: action.payload.photoUri,
          userContact: action.payload.contact,
          resetPassSucess: true,
          listaLogins: JSON.parse(localStorage.getItem(loginsStorage)),
          listOfUsersInstitution: action.usersInst,
          changePhotoStorage: true,
          isLoading: false,
          getUsersDone: true,
          userCardListView: action.payload.isCardListView,
          userDarkMode: action.payload.isDarkMode
        };
      } else {
        return {
          ...state,
          listOfUsersInstitution: [],
          isLoading: false,
          getUsersDone: false
        };
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      };
    case 'UPDATE_USER_INFO_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          changeUserInfoState: true,
          changeUserErrorMessage: null
        };
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true
          };
        } else {
          let errorMsg;
          if (action.payload.data.modelErros.Role.length > 0) {
            errorMsg = action.payload.data.modelErros.Role[0];
          } else {
            errorMsg = action.payload.data.applicationMessages[0];
          }
          return {
            ...state,
            changeUserInfoState: false,
            changeUserErrorMessage: errorMsg
          };
        }
      }
    case 'GETINSTITUTIONSINFO':
      if (!action.erro) {
        sessionStorage.setItem(Institutions, JSON.stringify(action.payload));

        return {
          ...state,
          listOfInstitutions: JSON.stringify(action.payload),
          listOfInstitutionsParam: getListParam(
            JSON.stringify(action.payload),
            action.listState
          ),
          refreshInst: false,
          isLoading: false
        };
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true,
            isLoading: false
          };
        } else {
          return {
            ...state
          };
        }
      }
    case 'GETINFOCLIENT':
      if (!action.erro) {
        return {
          ...state,
          ClientName: action.payload.value.name,
          ClientNIF: action.payload.value.nif,
          getClientInProgress: false
        };
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true,
            getClientInProgress: false
          };
        } else {
          return {
            ...state,
            ClientName: ' ',
            ClientNIF: '',
            getClientInProgress: false
          };
        }
      }
    case 'UPDATE_LIST_INSTITUTIONS':
      return {
        ...state,
        infoInstitutionsUpdate: action.payload,
        updateInstitutionInProgress: true,
        updateInstitutionIndex: 0,
        updateNext: true
      };
    case 'UPDATE_INSTITUTION':
      if (!action.erro) {
        if (action.lastUpdate) {
          return {
            ...state,
            updateInstitutionInProgress: true,
            updateInstitutionIndex: -1,
            refreshInst: true,
            showMessageUpdateSucess: true
          };
        } else {
          return {
            ...state,
            updateInstitutionInProgress: true,
            updateInstitutionIndex: action.updateInstitutionIndex + 1,
            updateNext: true
          };
        }
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          return {
            ...state,
            needTokenRefresh: true,
            updateNext: true
          };
        } else {
          if (action.lastUpdate) {
            return {
              ...state,
              showMessageUpdateErro: true,
              errorMessage: action.payload.data
            };
          } else {
            return {
              ...state,
              errorMessage: action.payload.data
            };
          }
        }
      }

    case 'GET_ALLUSERS_ALLINSTITUTIONS':
      if (!action.error) {
        return {
          ...state,
          getAllUsersInProgress: false,
          listOfAllUsersInstitutions: getListInstitutionsExpanded(action.payload),
          inLoadInfo: false
        };
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true,
            inUserInfoRefresh: true
            /* getAllUsersInProgress: false,
            listOfAllUsersInstitutions: [] */
          };
        } else {
          return {
            ...state,
            getAllUsersInProgress: false,
            listOfAllUsersInstitutions: [],
            inLoadInfo: false
          };
        }
      }

    case 'GET_ALL_USERS_AND_INSTITUTIONS':
      if (!action.error) {
        sessionStorage.setItem(Institutions, JSON.stringify(action.payload));
        let infoActualUser = getInfoActualUser(action.usersUser);

        return {
          ...state,
          getAllUsersInProgress: false,
          listOfAllUsersInstitutions: getListInstitutionsExpanded(
            action.usersUser,
            action.listStateUsers
          ),
          listOfInstitutions: JSON.stringify(action.payload),
          listOfInstitutionsParam: getListParam(
            JSON.stringify(action.payload),
            action.listState
          ),
          refreshInst: false,
          isLoading: false,
          userName: infoActualUser.name,
          userSpeciality: infoActualUser.specialty,
          userPhotoUri: infoActualUser.photoUri,
          userContact: infoActualUser.contact,
          userAcess: infoActualUser.userAcess,
          userProfile: infoActualUser.userProfile,
          inLoadInfo: false,
          userCardListView: infoActualUser.isCardListView,
          userDarkMode: infoActualUser.isDarkMode
        };
      } else {
        if (
          action.payload !== undefined &&
          (action.payload.status === 403 || action.payload.status === 401)
        ) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true,
            inUserInfoRefresh: true,
            getAllUsersInProgress: false,
            isLoading: false
            /*           listOfAllUsersInstitutions: [],
            listOfInstitutionsParam: [] */
          };
        } else {
          return {
            ...state,
            getAllUsersInProgress: false,
            listOfAllUsersInstitutions: [],
            isLoading: false,
            inLoadInfo: false
            /* listOfInstitutions: [],
            listOfInstitutionsParam: [] */
          };
        }
      }

    case 'GET_ALL_ADMIN_INFO':
      if (!action.error) {
        sessionStorage.setItem(Institutions, JSON.stringify(action.payload));
        let infoActualUser = getInfoActualUser(action.usersUser);

        return {
          ...state,
          getAllUsersInProgress: false,
          //isLoading: false,
          listOfAllUsersInstitutions: getListInstitutionsExpanded(
            action.usersUser,
            action.listStateUsers
          ),
          listOfInstitutions: JSON.stringify(action.payload),
          listOfInstitutionsParam: getListParam(
            JSON.stringify(action.payload),
            action.listState
          ),
          refreshInst: false,
          spaceUsed: action.space.usedSpace,
          spaceAll: action.space.spaceCapacity,
          userName: infoActualUser.name,
          userSpeciality: infoActualUser.specialty,
          userPhotoUri: infoActualUser.photoUri,
          userContact: infoActualUser.contact,
          userAcess: infoActualUser.userAcess,
          userProfile: infoActualUser.userProfile,
          userCardListView: infoActualUser.isCardListView,
          userDarkMode: infoActualUser.isDarkMode
        };
      } else {
        if (
          action.payload !== undefined &&
          (action.payload.status === 403 || action.payload.status === 401)
        ) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true,
            getAllUsersInProgress: false,
            isLoading: false,
            inUserInfoRefresh: true
          };
        } else {
          return {
            ...state,
            getAllUsersInProgress: false,
            listOfAllUsersInstitutions: [],
            spaceUsed: '0 MB',
            spaceAll: '10 GB',
            isLoading: false,
            getAllInfoInProgress: false
          };
        }
      }
    case 'URIPHOTO_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          uriToUserPhoto: action.payload.uriToUpload,
          fileNameToUserPhoto: action.payload.fileName,
          showPersonalUserInfoProgress: true
        };
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true,
            uriToUserPhoto: null,
            fileNameToUserPhoto: null,
            showPersonalUserInfoProgress: true
          };
        } else {
          return {
            ...state,
            uriToUserPhoto: null,
            fileNameToUserPhoto: null,
            showPersonalUserInfoProgress: true
          };
        }
      }
    case 'URIPHOTOADMIN_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          uriToUserPhoto: action.payload.uriToUpload,
          fileNameToUserPhoto: action.payload.fileName,
          createUserInProgress: true,
          stepsCreateUser: 'create', //'photo',
          errorCreateUser: false,
          msgErrorCreateUser: ''
        };
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true
          };
        } else {
          return {
            ...state,
            uriToUserPhoto: null,
            fileNameToUserPhoto: null,
            stepsCreateUser: 'addInstitution',
            errorCreateUser: false,
            msgErrorCreateUser: ''
          };
        }
      }
    case 'CREATE_USER_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          createUserInProgress: true,
          stepsCreateUser: 'photo', //'photoURI',
          errorCreateUser: false,
          msgErrorCreateUser: '',
          index: -1
        };
      } else {
        if (action.payload.data.applicationMessages.length === 1) {
          if (
            action.payload.data.applicationMessages[0] === 'ERROR: EMAIL ALREADY EXISTS. '
          ) {
            return {
              ...state,
              createUserInProgress: true,
              stepsCreateUser: 'update',
              errorCreateUser: false,
              msgErrorCreateUser: '',
              index: -1
            };
          }
        }
        return {
          ...state,
          createUserInProgress: true,
          errorCreateUser: true,
          msgErrorCreateUser: 'ERROR CREATE USER',
          index: -1
        };
      }
    case 'UPDATE_USER_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          createUserInProgress: true,
          stepsCreateUser: 'photo', // 'photoURI',
          errorCreateUser: false,
          msgErrorCreateUser: '',
          index: -1
        };
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true
          };
        } else {
          return {
            ...state,
            createUserInProgress: true,
            errorCreateUser: true,
            msgErrorCreateUser: 'ERROR UPDATE USER',
            index: -1
          };
        }
      }
    case 'ADDUSERTOINSTITUTION_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          createUserInProgress: true,
          stepsCreateUser: !action.last ? 'addInstitution' : 'updateProfile',
          errorCreateUser: false,
          msgErrorCreateUser: '',
          index: !action.last ? action.index : -1,
          showSucessMessage: false
        };
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true
          };
        } else if (action.payload.data.applicationMessages.length === 1) {
          if (
            action.payload.data.applicationMessages[0] === 'ERROR: USER ALREADY EXISTS. '
          ) {
            return {
              ...state,
              createUserInProgress: true,
              stepsCreateUser: !action.last ? 'addInstitution' : 'updateProfile',
              errorCreateUser: false,
              msgErrorCreateUser: '',
              index: !action.last ? action.index : -1,
              showSucessMessage: false
            };
          } else {
            return {
              ...state,
              createUserInProgress: true,
              stepsCreateUser: 'addInstitution',
              errorCreateUser: true,
              msgErrorCreateUser: 'ERROR ADD INSTITUTION USER',
              showSucessMessage: false
            };
          }
        } else {
          return {
            ...state,
            createUserInProgress: true,
            stepsCreateUser: 'addInstitution',
            errorCreateUser: true,
            msgErrorCreateUser: 'ERROR ADD INSTITUTION USER',
            showSucessMessage: false
          };
        }
      }
    case 'REMOVEUSERFROMINSTITUTION_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          removeUserSucess: true,
          msgRemoveUser: ''
        };
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true
          };
        } else {
          return {
            ...state,
            removeUserSucess: false,
            msgErrorRemove: 'ERROR'
          };
        }
      }
    case 'ADDPROFILETOUSERINSTITUTION_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          createUserInProgress: true,
          stepsCreateUser: 'updateProfile',
          errorCreateUser: false,
          msgErrorCreateUser: '',
          index: action.index,
          showSucessMessage: action.last
        };
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true
          };
        } else {
          return {
            ...state,
            createUserInProgress: true,
            stepsCreateUser: 'updateProfile',
            errorCreateUser: true,
            msgErrorCreateUser: 'ERROR ADD INSTITUTION USER',
            showSucessMessage: false
          };
        }
      }
    case 'GETPROFILESINSTITUTION_VALIDATED':
      if (!action.erro) {
        let listProf = [];
        let listServ = action.payload || [];
        for (let i = 0; i < listServ.length; i++) {
          //listProf.push({ id: listServ[i].rowKey, name: listServ[i].profileName });
          listProf.push({ id: listServ[i].rowKey, name: listServ[i].profileName, description: listServ[i].description });
          //listServ[i].description
          //listServ[i].requests -- Array com todos os requests permitidos
        }

        let list = action.list;
        list.push({ rowKey: action.institution, profile: listProf });

        return {
          ...state,
          listOfAllInstitutionsProfils: list,
          getProfilesInProgress: action.last ? false : true,
          isLoading: action.last ? false : true,
          getAllInfoInProgress: action.last ? false : true
        };
      } else {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            needTokenRefresh: true
          };
        } else {
          return {
            ...state,
            listOfAllInstitutionsProfils: [],
            getProfilesInProgress: false,
            isLoading: false,
            getAllInfoInProgress: false
          };
        }
      }
    case 'ALL_INSTITUTIONS_ADDED':
      return {
        ...state,
        stepsCreateUser: 'updateProfile',
        createUserInProgress: true,
        errorCreateUser: false,
        showSucessMessage: false,
        index: -1
      };
    case 'ALL_PROFILES_GET':
      return {
        ...state,
        getProfilesInProgress: false,
        isLoading: false,
        getAllInfoInProgress: false
      };
    case 'ALL_PROFILES_ADDED':
      return {
        ...state,
        createUserInProgress: true,
        stepsCreateUser: 'updateProfile',
        errorCreateUser: false,
        msgErrorCreateUser: '',
        index: action.index,
        showSucessMessage: true
      };
    case 'GETUSERBYEMAIL_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          validateUser: {
            name: action.payload.name,
            email: action.payload.rowKey,
            contact: action.payload.contact,
            specialty: action.payload.specialty,
            photoUri: action.payload.photoUri
          },
          validateUserInProgress: true,
          validateUserEmail: '',
          userExist: true
        };
      } else {
        if (action.payload.status == 403 || action.payload.status == 401) {
          return {
            ...state,
            needTokenRefresh: true,
            validateUserInProgress: true,
            validateUserEmail: action.email,
            validateUser: null,
            userExist: null
          };
        } else {
          return {
            ...state,
            validateUser: null,
            validateUserInProgress: true,
            validateUserEmail: '',
            userExist: false
          };
        }
      }
    case 'GETSPACEUSED':
      if (!action.erro) {
        return {
          ...state,
          spaceUsed: action.payload.usedSpace,
          spaceAll: action.payload.spaceCapacity,
          getSpaceUsedInProgress: false
        };
      } else {
        if (action.payload.status == 403 || action.payload.status == 401) {
          return {
            ...state,
            needTokenRefresh: true
          };
        } else {
          return {
            ...state,
            spaceUsed: '0 MB',
            spaceAll: '10 GB',
            getSpaceUsedInProgress: false
          };
        }
      }
    case 'SET_REFRESH_INST':
      return {
        ...state,
        refreshInst: true
      };
    case 'GETVERSIONCOMPATIBILITY':
      if (!action.erro) {
        return {
          ...state,
          versionCompatible: action.payload.isSuccess,
        };
      } else {
        return {
          ...state,
          versionCompatible: false
        };
      }
    case 'UPDATE_CARDLIST_VIEW_VALIDATED':
      if (!action.erro) {
        return {
          ...state,
          userCardListView: action.isCardListView,
        };
      } else {
        return {
          ...state,
        };
      }
    case 'FETCHUSERS':
      if (!action.erro) {
        return {
          ...state,
          fetchUsers: action.payload.result
        };
      } else {
        return {
          ...state
        }
      }
    default:
      return state;
  }
};
