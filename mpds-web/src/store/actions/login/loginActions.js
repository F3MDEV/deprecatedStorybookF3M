import axios from "axios";
import {
  config,
  userEmail,
  InstitutionId,
  GetInstitutions,
  Logout,
  Token,
  User,
  ResetPassword,
  acessTokenRefresh,
  UserInstitution,
  InfoClient,
  Institution,
  AllUsersAllInstitutions,
  AddUserToInstitution,
  RemoverUserFromInstitution,
  UserPhoto,
  UserPhotoAdmin,
  InfoSpace,
  InstitutionProfiles,
  UserProfile,
  ClearPassword,
  CompatibleVersion,
  VERSION,
  CardListView,
  UserFetch
} from "../../../utils/constants";

export function setLoading(isLoading) {
  return {
    type: "SET_LOADING",
    isLoading: isLoading
  };
}

export function login(values) {
  const url = `${config.url.API_URL}${GetInstitutions}`;
  return dispatch => {
    axios
      .post(url, values)
      .then(resp => {
        dispatch([
          { type: "LOGIN_SUCESS", payload: resp.data, acvalues: values }
        ]);
      })
      .catch(e => {
        dispatch([
          { type: "LOGIN_ERROR", payload: e.response, acvalues: values }
        ]);
      });
  };
}

export function logout() {
  const url = `${config.url.API_URL}${Logout}`;
  return dispatch => {
    axios
      .post(url)
      .then(resp => {
        dispatch([{ type: "LOGOUT", payload: resp.data }]);
      })
      .catch(e => {
        dispatch([{ type: "LOGOUT", payload: e.response.data }]);
      });
  };
}

export function getToken(pass) {
  var vEmail = localStorage.getItem(userEmail);

  var values = {
    Email: vEmail,
    Password: pass,
    InstitutionID: localStorage.getItem(InstitutionId),
    GrantType: "password",
    App: "MpDSWeb",
    deviceId: "MpDSWeb"
  };

  const url = `${config.url.API_URL}${Token}`;
  return dispatch => {
    axios
      .post(url, values)
      .then(resp => {
        dispatch({ type: "TOKEN_VALIDATED", payload: resp.data, erro: false });
      })
      .catch(e =>
        dispatch({ type: "TOKEN_VALIDATED", payload: e.response, erro: true })
      );
  };
}

export function getTokenRefresh() {
  const cEmail = localStorage.getItem(userEmail);
  const cTokenRefresh = sessionStorage.getItem(acessTokenRefresh);

  var values = {
    Email: cEmail,
    InstitutionID: localStorage.getItem(InstitutionId),
    GrantType: "refresh_token",
    App: "MpDSWeb",
    RefreshToken: cTokenRefresh
  };

  const url = `${config.url.API_URL}${Token}`;
  return dispatch => {
    axios
      .post(url, values)
      .then(resp => {
        dispatch({
          type: "TOKEN_VALIDATED",
          payload: resp.data,
          erro: false
        });
      })
      .catch(e =>
        dispatch({ type: "TOKEN_VALIDATED", payload: e.response, erro: true })
      );
  };
}

export function getUser() {
  const field = `email=` + localStorage.getItem(userEmail);
  const url = `${config.url.API_URL}${User}?${field}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch({
          type: "GETUSER_VALIDATED",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({ type: "GETUSER_VALIDATED", payload: false, erro: true })
      );
  };
}

export function changePassword(values) {
  const url = `${config.url.API_URL}${ResetPassword}`;

  return dispatch => {
    axios
      .post(url, values)
      .then(resp => {
        dispatch({
          type: "CHANGEPASSWORD_VALIDATED",
          payload: resp.data,
          erro: false
        });
      })
      .catch(e =>
        dispatch({
          type: "CHANGEPASSWORD_VALIDATED",
          payload: e.response.data,
          erro: true
        })
      );
  };
}

export function resetPassword(email, pass) {
  var language = localStorage.getItem("i18nextLng") || "pt";
  if (language.length > 2) {
    language = language.substr(0, 2).toUpperCase();
  }
  else {
    language = language.toUpperCase();
  }

  var values = {
    Email: email,
    Password: pass,
    language: language
  };

  const url = `${config.url.API_URL}${ResetPassword}`;

  return dispatch => {
    axios
      .post(url, values)
      .then(resp => {
        dispatch({
          type: "RESETPASSWORD_VALIDATED",
          payload: resp.data,
          erro: false
        });
      })
      .catch(e =>
        dispatch({
          type: "RESETPASSWORD_VALIDATED",
          payload: e.response.data,
          erro: true
        })
      );
  };
}

export function resetPasswordOtherUser(email) {

  var language = localStorage.getItem("i18nextLng") || "pt";
  if (language.length > 2) {
    language = language.substr(0, 2).toUpperCase();
  }
  else {
    language = language.toUpperCase();
  }

  const url = `${config.url.API_URL}${ClearPassword}?user=${email}&language=${language}`;

  return dispatch => {
    axios
      .post(url)
      .then(resp => {
        dispatch({
          type: "RESETPASSWORDOTHERUSER_VALIDATED",
          payload: resp.data,
          erro: false
        });
      })
      .catch(e =>
        dispatch({
          type: "RESETPASSWORDOTHERUSER_VALIDATED",
          payload: e.response.data,
          erro: true
        })
      );
  };
}

export function getUsersInstitution() {
  const field = `institutionId=` + localStorage.getItem(InstitutionId);
  const url = `${config.url.API_URL}${UserInstitution}?${field}`;
  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch({
          type: "GETUSERINSTITUTION_VALIDATED",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({
          type: "GETUSERINSTITUTION_VALIDATED",
          payload: false,
          erro: true
        })
      );
  };
}

export function getUserAndUsersInstitution() {
  const fieldUser = `email=` + localStorage.getItem(userEmail);
  const urlUser = `${config.url.API_URL}${User}?${fieldUser}`;

  const fieldInst = `institutionId=` + localStorage.getItem(InstitutionId);
  const urlInst = `${config.url.API_URL}${UserInstitution}?${fieldInst}`;

  return dispatch => {
    Promise.all([axios.get(urlUser), axios.get(urlInst)])
      .then(([respUser, respInst]) => {
        dispatch([
          {
            type: "GET_USER_AND_USERINSTITUTION",
            payload: respUser.data.result,
            usersInst: respInst.data.result,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "GET_USER_AND_USERINSTITUTION",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}

export function updatePersonalUserInfo(values, uriPhoto) {
  const url = `${config.url.API_URL}${User}`;

  var body = {
    email: values.email,
    name: values.name,
    specialty: values.specialty,
    contact: values.contact,
    PhotoUri: uriPhoto
  };

  return dispatch => {
    axios
      .put(url, body)
      .then(resp => {
        dispatch({
          type: "UPDATE_USER_INFO_VALIDATED",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({ type: "UPDATE_USER_INFO_VALIDATED", payload: e.response, erro: true })
      );
  };
}

export function updateUser(values, uriPhoto) {
  const url = `${config.url.API_URL}${User}`;

  var body;
  if (uriPhoto !== null) {
    body = {
      email: values.email,
      name: values.name,
      specialty: values.specialty,
      contact: values.contact,
      PhotoUri: uriPhoto
    };
  } else {
    body = {
      email: values.email,
      name: values.name,
      specialty: values.specialty,
      contact: values.contact,
    };
  }


  return dispatch => {
    axios
      .put(url, body)
      .then(resp => {
        dispatch({
          type: "UPDATE_USER_VALIDATED",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({ type: "UPDATE_USER_VALIDATED", payload: e.response, erro: true })
      );
  };
}

export function createUser(values, uriPhoto) {
  const url = `${config.url.API_URL}${User}`;

  var language = localStorage.getItem("i18nextLng") || "pt";
  if (language.length > 2) {
    language = language.substr(0, 2).toUpperCase();
  }
  else {
    language = language.toUpperCase();
  }

  var body;
  if (uriPhoto !== null) {
    body = {
      email: values.email,
      name: values.name,
      specialty: values.specialty,
      contact: values.contact,
      PhotoUri: uriPhoto,
      language: language
    };
  } else {
    body = {
      email: values.email,
      name: values.name,
      specialty: values.specialty,
      contact: values.contact,
      language: language
    };
  }

  return dispatch => {
    axios
      .post(url, body)
      .then(resp => {
        dispatch({
          type: "CREATE_USER_VALIDATED",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({ type: "CREATE_USER_VALIDATED", payload: e.response, erro: true })
      );
  };
}

export function deleteUser(values) {
  const url = `${config.url.API_URL}${User}`;

  var body = {
    email: values.email
  };

  return dispatch => {
    axios
      .delete(url, { data: body })
      .then(resp => {
        dispatch({
          type: "DELETE_USER_VALIDATED",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({ type: "DELETE_USER_VALIDATED", payload: e, erro: true })
      );
  };
}

export function addUserToInstitution(body, index, last) {
  const url = `${config.url.API_URL}${AddUserToInstitution}?email=${body.email}&institutionId=${body.rowKey}&profile=${body.profile.id}`;

  return dispatch => {
    axios
      .put(url)
      .then(resp => {
        dispatch({
          type: "ADDUSERTOINSTITUTION_VALIDATED",
          payload: resp.data.result,
          erro: false,
          index: index,
          last: last
        });
      })
      .catch(e =>
        dispatch({
          type: "ADDUSERTOINSTITUTION_VALIDATED",
          payload: e.response,
          erro: true,
          index: index,
          last: last
        })
      );
  };
}

export function addProfileToUserInstitution(body, index, last) {
  const url = `${config.url.API_URL}${UserProfile}?InstitutionId=${body.rowKey}&email=${body.email}&profileName=${body.profile.id}`;

  return dispatch => {
    axios
      .put(url)
      .then(resp => {
        dispatch({
          type: "ADDPROFILETOUSERINSTITUTION_VALIDATED",
          payload: resp.data.result,
          erro: false,
          index: index,
          last: last
        });
      })
      .catch(e =>
        dispatch({
          type: "ADDPROFILETOUSERINSTITUTION_VALIDATED",
          payload: e.response,
          erro: true,
          index: index,
          last: last
        })
      );
  };
}

export function removeUserFromInstitution(values) {
  const url = `${config.url.API_URL}${RemoverUserFromInstitution}?email=${values.email}&institutionId=${values.rowKey}`;

  return dispatch => {
    axios
      .put(url)
      .then(resp => {
        dispatch({
          type: "REMOVEUSERFROMINSTITUTION_VALIDATED",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({
          type: "REMOVEUSERFROMINSTITUTION_VALIDATED",
          payload: e.response,
          erro: true
        })
      );
  };
}

export function getInstitutionsInfo(list) {
  const url = `${config.url.API_URL}${GetInstitutions}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch({
          type: "GETINSTITUTIONSINFO",
          payload: resp.data.result,
          erro: false,
          listState: list
        });
      })
      .catch(e =>
        dispatch({ type: "GETINSTITUTIONSINFO", payload: false, erro: true })
      );
  };
}

export function getInfoClient() {
  const url = `${config.url.API_URL}${InfoClient}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch({
          type: "GETINFOCLIENT",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({ type: "GETINFOCLIENT", payload: false, erro: true })
      );
  };
}
export function updateListInstitutionToSave(values) {
  return {
    type: "UPDATE_LIST_INSTITUTIONS",
    payload: values
  };
}

export function updateInstitution(values, lastUpdate, index) {
  const url = `${config.url.API_URL}${Institution}`;

  return dispatch => {
    axios
      .put(url, values)
      .then(resp => {
        dispatch([
          {
            type: "UPDATE_INSTITUTION",
            erro: false,
            payload: resp.data,
            lastUpdate: lastUpdate,
            updateInstitutionIndex: index
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "UPDATE_INSTITUTION",
            erro: true,
            payload: e.response,
            lastUpdate: lastUpdate,
            updateInstitutionIndex: index
          }
        ]);
      });
  };
}

export function getAllUsersAllInstitutions() {
  const url = `${config.url.API_URL}${AllUsersAllInstitutions}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch({
          type: "GET_ALLUSERS_ALLINSTITUTIONS",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({
          type: "GET_ALLUSERS_ALLINSTITUTIONS",
          payload: false,
          erro: true
        })
      );
  };
}

export function getAllAdminInfo(list, listUsers) {
  const url1 = `${config.url.API_URL}${GetInstitutions}`;
  const url2 = `${config.url.API_URL}${AllUsersAllInstitutions}`;
  const url3 = `${config.url.API_URL}${InfoSpace}`

  return dispatch => {
    Promise.all([axios.get(url1), axios.get(url2), axios.get(url3)])
      .then(([respInst, respUser, respSpace]) => {
        dispatch([
          {
            type: "GET_ALL_ADMIN_INFO",
            payload: respInst.data.result,
            usersUser: respUser.data.result,
            listState: list,
            listStateUsers: listUsers,
            space: respSpace.data.result,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "GET_ALL_ADMIN_INFO",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}

export function getAllUsersAllInstitutionsAndInstitutionsInfo(list, listUsers) {
  const url1 = `${config.url.API_URL}${GetInstitutions}`;
  const url2 = `${config.url.API_URL}${AllUsersAllInstitutions}`;
  return dispatch => {
    Promise.all([axios.get(url1), axios.get(url2)])
      .then(([respInst, respUser]) => {
        dispatch([
          {
            type: "GET_ALL_USERS_AND_INSTITUTIONS",
            payload: respInst.data.result,
            usersUser: respUser.data.result,
            listState: list,
            listStateUsers: listUsers,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "GET_ALL_USERS_AND_INSTITUTIONS",
            payload: e.response,
            error: true
          }
        ]);
      });
  };

}

export function getURItoUploadPhoto() {
  const url = `${config.url.API_URL}${UserPhoto}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch({
          type: "URIPHOTO_VALIDATED",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({ type: "URIPHOTO_VALIDATED", payload: e.response, erro: true })
      );
  };
}

export function getURItoUploadPhotoAdmin(email) {
  const url = `${config.url.API_URL}${UserPhotoAdmin}?user=${email}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch({
          type: "URIPHOTOADMIN_VALIDATED",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({ type: "URIPHOTOADMIN_VALIDATED", payload: e.response, erro: true })
      );
  };
}

export function deleteUserPhoto(email) {
  const url = `${config.url.API_URL}${UserPhoto}`;

  var body = {
    email: email
  };

  return dispatch => {
    axios
      .delete(url, body)
      .then(resp => {
        dispatch({
          type: "DELETEUSERPHOTO_VALIDATED",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({
          type: "DELETEUSERPHOTO_VALIDATED",
          payload: false,
          erro: true
        })
      );
  };
}

export function allInstitutionsAdded() {
  return dispatch => {
    dispatch({
      type: "ALL_INSTITUTIONS_ADDED",
      paylaod: true
    })
  }
}
export function allProfilesAdded() {
  return dispatch => {
    dispatch({
      type: "ALL_PROFILES_ADDED",
      paylaod: true
    })
  }
}

export function allProfilesGet() {
  return dispatch => {
    dispatch({
      type: "ALL_PROFILES_GET",
      paylaod: true
    })
  }
}

export function setRefreshInst() {
  return dispatch => {
    dispatch({
      type: "SET_REFRESH_INST",
      paylaod: true
    })
  }
}


export function getUserByEmail(email) {
  const field = `email=` + email;
  const url = `${config.url.API_URL}${User}?${field}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch({
          type: "GETUSERBYEMAIL_VALIDATED",
          payload: resp.data.result,
          email: email,
          erro: false
        });
      })
      .catch(e =>
        dispatch({ type: "GETUSERBYEMAIL_VALIDATED", payload: e.response, email: email, erro: true })
      );
  };
}

export function getSpaceUsed() {
  const url = `${config.url.API_URL}${InfoSpace}`

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch({
          type: "GETSPACEUSED",
          payload: resp.data.result,
          erro: false
        });
      })
      .catch(e =>
        dispatch({ type: "GETSPACEUSED", payload: e.response, erro: true })
      );
  };
}

export function getProfilesInstitution(institution, list, last) {
  const url = `${config.url.API_URL}${InstitutionProfiles}?instituionId=${institution}`;

  /* return dispatch => {
    dispatch({
      type: "GETPROFILESINSTITUTION_VALIDATED",
      payload: true,
      erro: false,
      last: last,
      list: list,
      institution: institution
    })
  } */

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch({
          type: "GETPROFILESINSTITUTION_VALIDATED",
          payload: resp.data.result,
          erro: false,
          last: last,
          list: list,
          institution: institution
        });
      })
      .catch(e =>
        dispatch({
          type: "GETPROFILESINSTITUTION_VALIDATED",
          payload: false,
          erro: true,
          list: list,
          institution: institution
        })
      );
  };
}

export function getVersionCompatibility() {

  const url = `${config.url.API_URL}${CompatibleVersion}?app=MpDSWeb&version=${VERSION}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch({
          type: "GETVERSIONCOMPATIBILITY",
          payload: resp.data,
          erro: false,
        });
      })
      .catch(e =>
        dispatch({
          type: "GETVERSIONCOMPATIBILITY",
          payload: false,
          erro: true,
        })
      );
  };
}

export function updateCardListView(value) {
  const url = `${config.url.API_URL}${CardListView}?isCardListView=${value}`;

  return dispatch => {
    axios
      .put(url)
      .then(resp => {
        dispatch({
          type: "UPDATE_CARDLIST_VIEW_VALIDATED",
          payload: resp.data.result,
          erro: false,
          isCardListView: value
        });
      })
      .catch(e =>
        dispatch({ type: "UPDATE_CARDLIST_VIEW_VALIDATED", payload: e.response, erro: true })
      );
  };
}

export function fetchUsers(device) {
  const url = `${config.url.API_URL}${UserFetch}?deviceId=${device}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch({
          type: "FETCHUSERS",
          payload: resp.data,
          erro: false,
        });
      })
      .catch(e =>
        dispatch({
          type: "FETCHUSERS",
          payload: false,
          erro: true,
        })
      );
  };
}