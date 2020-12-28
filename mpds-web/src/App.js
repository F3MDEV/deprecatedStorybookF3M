import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/bootstrap/custom.scss";
import "./App.scss";
import Home from "./main/Home";
import LoginPage from "./container/loginPage/LoginPage";
import MaintenanceBondary from "./main/MaintenanceBondary";
import {
  getToken,
  getTokenRefresh,
  getUserAndUsersInstitution,
  getVersionCompatibility,
  fetchUsers
} from "./store/actions/login/loginActions";

//CONSTANTS
import { lgEmail, lgInstitution, lgPatient, userEmail, InstitutionId, InstitutionName, InstitutionNIF, loginsStorage } from "./utils/constants";
import { isDefined } from "./utils/utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshToken: false, errorVersion: false, firstTime: true };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.login.email !== nextProps.login.email ||
      toString(this.props.login.tokenRefresh) !=
      toString(nextProps.login.tokenRefresh) ||
      /* this.props.wounds.TokenRefresh !== nextProps.wounds.TokenRefresh ||
      this.props.patient.TokenRefresh !== nextProps.patient.TokenRefresh ||
      this.props.woundInfo.TokenRefresh !== nextProps.woundInfo.TokenRefresh ||
      this.props.login.needTokenRefresh !== nextProps.login.needTokenRefresh || */
      this.props.login.institution != nextProps.login.institution ||
      this.props.login.validToken !== nextProps.login.validToken ||
      this.props.login.token != nextProps.login.token ||
      // this.props.login.tokenRefresh != nextProps.login.tokenRefresh || 
      this.props.login.showLoginUser != nextProps.login.showLoginUser ||
      this.props.login.errorLimitUsers != nextProps.login.errorLimitUsers ||
      this.props.login.firstLogin != nextProps.login.firstLogin ||
      this.props.login.errorAccessDenied != nextProps.login.errorAccessDenied ||
      this.props.login.versionCompatible != nextProps.login.versionCompatible ||
      this.props.login.fetchUsers != nextProps.login.fetchUsers
    ) {
      return true;
    }
    if (this.state.refreshToken !== nextState.refreshToken || this.state.errorVersion !== nextState.errorVersion || this.state.firstTime !== nextState.firstTime) {
      return true;
    }
    return false;
    //return true;
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let email = params.get('email');
    let institution = params.get('institution');
    let patient = params.get('patient');

    if (!isDefined(this.props.login.versionCompatible)) {
      this.props.getVersionCompatibility()
    } else {
      if (!this.props.login.versionCompatible) {
        this.setState({
          errorVersion: true
        });
      } else {
        if (this.props.login.fetchUsers == null) {
          this.props.fetchUsers('MpDSWeb')
        } else {
          if (email !== null) {
            sessionStorage.setItem(lgEmail, email)
            sessionStorage.setItem(lgInstitution, institution)
            sessionStorage.setItem(lgPatient, patient)

            let url = window.location.href;
            window.location.assign(url.replace(search, ""))

          } else {
            if (this.props.login.loginExtEmail != null && this.props.login.loginExtEmail !== "null" && this.props.login.email !== this.props.login.loginExtEmail) {
              localStorage.setItem(userEmail, this.props.login.loginExtEmail)
              localStorage.setItem(InstitutionId, this.props.login.loginExtInstitution)
              localStorage.setItem(InstitutionName, "")
              localStorage.setItem(InstitutionNIF, "")

              this.props.login.email = this.props.login.loginExtEmail
              this.props.login.showLogin = true
              this.props.login.institution = this.props.login.loginExtInstitution
              this.props.login.nameInstitution = ""
              this.props.login.nifInstitution = ""

              // Validar se o user passado como parametro existe no array de utilizadores
              // Se sim então entra nesse utilizador
              // Se não deve fazer ficar no login para o novo user, com o campo email preenchido

              let listUser = JSON.parse(localStorage.getItem(loginsStorage)) || [];
              let findUser = false;
              for (let i = 0; i < listUser.length; i++) {
                if (listUser[i].email === this.props.login.loginExtEmail) {
                  findUser = true;
                  this.props.login.email = listUser[i].email;
                  this.props.login.userName = listUser[i].name;
                  this.props.login.userSpeciality = listUser[i].specialty;
                  this.props.login.userPhotoUri = listUser[i].photoUri;
                  this.props.login.showLoginUser = true;
                  this.props.login.showLoginListUsers = false;
                  break;
                }
              }
              if (!findUser) {
                this.props.login.showLogin = true;
                this.props.login.showLoginUser = false;
                this.props.login.showLoginListUsers = false;
              }

            } else if (
              this.props.login.email != null &&
              this.props.login.tokenRefresh != null &&
              this.props.login.institution != null
            ) {
              if (!this.props.login.tokenRefeshinProgress) {
                this.props.login.tokenRefeshinProgress = true;
                this.props.getTokenRefresh();
              }

              this.setState({
                refreshToken: !this.state.refreshToken
              });
            } else if (
              this.props.login.email != null &&
              this.props.login.pass != null &&
              this.props.login.institution != null
            ) {
              if (!this.props.login.tokenRefeshinProgress) {
                this.props.login.tokenRefeshinProgress = true;
                this.props.getToken(this.props.login.pass);
              }

              this.setState({
                refreshToken: !this.state.refreshToken
              });
            }
          }
        }
      }
    }
  }


  componentDidUpdate() {
    if (!isDefined(this.props.login.versionCompatible)/*  && this.props.login.tokenRefresh != null */) {
      this.props.getVersionCompatibility()
    } else if (!this.props.login.versionCompatible && !this.state.errorVersion) {
      this.setState({
        errorVersion: true
      });
    } else if (this.props.login.fetchUsers == null) {
      this.props.fetchUsers('MpDSWeb')
    } else if (this.state.firstTime) {
      let search = window.location.search;
      let params = new URLSearchParams(search);
      let email = params.get('email');
      let institution = params.get('institution');
      let patient = params.get('patient');

      if (email !== null) {
        sessionStorage.setItem(lgEmail, email)
        sessionStorage.setItem(lgInstitution, institution)
        sessionStorage.setItem(lgPatient, patient)

        let url = window.location.href;
        window.location.assign(url.replace(search, ""))

      } else {
        if (this.props.login.loginExtEmail != null && this.props.login.loginExtEmail !== "null" && this.props.login.loginExtEmail !== "" && this.props.login.email !== this.props.login.loginExtEmail) {
          localStorage.setItem(userEmail, this.props.login.loginExtEmail)
          localStorage.setItem(InstitutionId, this.props.login.loginExtInstitution)
          localStorage.setItem(InstitutionName, "")
          localStorage.setItem(InstitutionNIF, "")

          this.props.login.email = this.props.login.loginExtEmail
          this.props.login.showLogin = true
          this.props.login.institution = this.props.login.loginExtInstitution
          this.props.login.nameInstitution = ""
          this.props.login.nifInstitution = ""

          // Validar se o user passado como parametro existe no array de utilizadores
          // Se sim então entra nesse utilizador
          // Se não deve fazer ficar no login para o novo user, com o campo email preenchido

          let listUser = JSON.parse(localStorage.getItem(loginsStorage)) || [];
          let findUser = false;
          for (let i = 0; i < listUser.length; i++) {
            if (listUser[i].email === this.props.login.loginExtEmail) {
              findUser = true;
              this.props.login.email = listUser[i].email;
              this.props.login.userName = listUser[i].name;
              this.props.login.userSpeciality = listUser[i].specialty;
              this.props.login.userPhotoUri = listUser[i].photoUri;
              this.props.login.showLoginUser = true;
              this.props.login.showLoginListUsers = false;
              break;
            }
          }
          if (!findUser) {
            this.props.login.showLogin = true;
            this.props.login.showLoginUser = false;
            this.props.login.showLoginListUsers = false;
          }
          this.setState({ firstTime: false })

        } else if (
          this.props.login.email != null &&
          this.props.login.tokenRefresh != null &&
          this.props.login.institution != null
        ) {
          if (!this.props.login.tokenRefeshinProgress) {
            this.props.login.tokenRefeshinProgress = true;
            this.props.getTokenRefresh();
          }

          this.setState({
            refreshToken: !this.state.refreshToken,
            firstTime: false
          });
        } else if (
          this.props.login.email != null &&
          this.props.login.pass != null &&
          this.props.login.institution != null
        ) {
          if (!this.props.login.tokenRefeshinProgress) {
            this.props.login.tokenRefeshinProgress = true;
            this.props.getToken(this.props.login.pass);
          }

          this.setState({
            refreshToken: !this.state.refreshToken,
            firstTime: false
          });
        }
      }
    }
  }


  render() {
    if (isDefined(this.props.login.versionCompatible) && !this.props.login.versionCompatible) {
      return <MaintenanceBondary />;
    } else if (this.props.login.tokenRefeshinProgress) {
      console.log("App 0");
      return <></>;
    } else if (
      this.props.login.validToken /*&&
      !this.props.wounds.TokenRefresh &&
      !this.props.patient.TokenRefresh && 
      !this.props.woundInfo.TokenRefresh &&
      !this.props.login.needTokenRefresh*/
    ) {
      console.log("App 1");
      return <Home>{this.props.children}</Home>;
    } else if (
      !this.props.login.validToken && (
        this.props.login.errorLimitUsers !== "" ||
        this.props.login.showLogin ||
        this.props.login.showInstitution ||
        this.props.login.showChangePass ||
        this.props.login.firstLogin ||
        isDefined(this.props.login.errorAccessDenied))
    ) {
      console.log("App 3");
      return <LoginPage>{this.props.children}</LoginPage>;
    } else if (
      this.props.login.tokenRefresh !== "" &&
      this.props.login.tokenRefresh != null &&
      this.props.login.institution != null &&
      !this.props.login.resetPass
    ) {
      console.log("App 4");
      if (!this.props.login.tokenRefeshinProgress) {
        this.props.wounds.TokenRefresh = false;
        this.props.patient.TokenRefresh = false;
        this.props.woundInfo.TokenRefresh = false;
        this.props.login.needTokenRefresh = false;
        this.props.login.tokenRefeshinProgress = true;
        this.props.getTokenRefresh();
      }
      return <></>;
    } else if (
      this.props.login.pass != null &&
      this.props.login.institution != null &&
      !this.props.login.resetPass
    ) {
      console.log("App 5");
      if (!this.props.login.tokenRefeshinProgress) {
        this.props.wounds.TokenRefresh = false;
        this.props.patient.TokenRefresh = false;
        this.props.woundInfo.TokenRefresh = false;
        this.props.login.needTokenRefresh = false;
        this.props.login.tokenRefeshinProgress = true;
        this.props.getToken(this.props.login.pass);
      }
      return <></>;
    } else {
      console.log("App 6");
      return <LoginPage>{this.props.children}</LoginPage>;
    }
  }
}

const mapStateToProps = state => ({
  login: state.login,
  wounds: state.wounds,
  patient: state.patient,
  woundInfo: state.woundInfo
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getToken, getTokenRefresh, getUserAndUsersInstitution, getVersionCompatibility, fetchUsers },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(App);
