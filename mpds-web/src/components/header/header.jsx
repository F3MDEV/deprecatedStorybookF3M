import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//INSIDE COMPONENTS
import DialogChangePasswordForm from '../../container/Settings/DialogChangePasswordForm'
import DialogPersonalUserInfoForm from "../../container/Settings/DialogPersonalUserInfoForm";

//OUTSIDE COMPONENTS
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

//ICONS
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SettingsIcon from '@material-ui/icons/Settings';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//CSS, STYLES & MEDIA ASSETS
import logo_header from '../../utils/logo_MPDS_mini.svg';
import PatientIcon from '../../utils/account-circle.svg';
import variables from "../../assets/bootstrap/scss/_variables.scss";
import "./header.scss";

//Actions
import { getTokenRefresh, logout, setLoading, updatePersonalUserInfo, changePassword, getURItoUploadPhoto, getUser, setRefreshInst } from '../../store/actions/login/loginActions';

//Constants
import { loginsStorage, InstitutionId, InstitutionName, acessToken, patientIDSel, woundIDSel, AZURE_CONTAINER_NAME, AZURE_BLOB_NAME, settingsTab } from "../../utils/constants";
import { getBase64Image, isDefined } from "../../utils/utils";


//Scss variable
const mainText = variables.mainText;
const { secondaryFont } = variables;

const styles = theme => ({
  PaperElevation: {
    boxShadow: 'none',
    background: 'unset',
    color: mainText,
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshUser: false,
      selectedInstitution: null,
      nameOfInstitution: null,
      showUserInfoModal: false,
      showChangePassModal: false,
      showSucessMessage: false,
      showErrorMessage: false,
      errorMessage: null,
      width: 0,
      isOpenDropInstitution: false,
      isOpenDropUser: false,
      isOpenExpansionInstitution: false,
      isOpenExpansionUser: false,
      changeInstitution: false
    }
    this.handleChangeInstitutionDropDown = this.handleChangeInstitutionDropDown.bind(this);
    this.showUserInfo = this.showUserInfo.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.showChangePass = this.showChangePass.bind(this);
    this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
    this.editCompany = this.editCompany.bind(this);

    this.onClickSettings = this.onClickSettings.bind(this);
    this.onClickLogo = this.onClickLogo.bind(this);

    this.onToggleInstitution = this.onToggleInstitution.bind(this);
    this.onToggleUser = this.onToggleUser.bind(this);
    this.onChangeExpandedInstitution = this.onChangeExpandedInstitution.bind(this);
    this.onChangeExpandedUser = this.onChangeExpandedUser.bind(this);
    this.onClickToggleMenu = this.onClickToggleMenu.bind(this);

  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://dmrelease.blob.core.windows.net/azurestoragejssample/bundle/azure-storage.blob.js"
    document.body.appendChild(script);
    window.addEventListener("resize", this.handleResize);
    this.updateWindowDimensions();

    //throw new Error('404');
  }

  componentDidUpdate() {
    const { email, userName, changePasswordAfterLoginSucess, changePasswordAfterLoginMessage, changeUserInfoState, changeUserErrorMessage, changePhotoStorage, showPersonalUserInfoProgress, uriToUserPhoto, validToken } = this.props.login;
    if ((!isDefined(userName) || userName === "") && (isDefined(email) && email != null)) {
      this.props.getUser();
    } else if (changePasswordAfterLoginSucess) {
      this.props.login.changePasswordAfterLoginSucess = null
      this.setState({ showChangePassModal: false, showSucessMessage: true, errorMessage: null })
    } else if (changePasswordAfterLoginSucess === false) {
      this.props.login.changePasswordAfterLoginSucess = null
      this.setState({ showChangePassModal: true, showErrorMessage: true, errorMessage: changePasswordAfterLoginMessage })
    } else if (showPersonalUserInfoProgress) {
      if (isDefined(uriToUserPhoto)) {
        this.props.login.showPersonalUserInfoProgress = false
        this.setState({ showUserInfoModal: !this.state.showUserInfoModal })
      } else {
        this.props.login.showPersonalUserInfoProgress = false
        this.setState({ showErrorMessage: true, errorMessage: 'error_default' })
        //this.props.getURItoUploadPhoto()
      }
    } else if (changeUserInfoState) {
      this.props.login.changeUserInfoState = null
      this.props.getUser()
      this.setState({ showUserInfoModal: false, showSucessMessage: true, errorMessage: null })

      /* let bannerImage = document.getElementById('bannerImage');
      let imgData = ""
      let adiciona = false;
      if (!bannerImage.complete) {
        bannerImage = document.getElementById('bannerImage2');
      }
      if (bannerImage.complete) {
        if (bannerImage.src !== "" && bannerImage.src === this.props.login.userPhotoUri) {
          imgData = getBase64Image(bannerImage);
          adiciona = true;
        } else if (bannerImage.src.includes("account-circle") && this.props.login.userPhotoUri === null) {
          imgData = "";
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
            const index = lista.findIndex(l => l.email === utilizador.email);

            if (index >= 0) {
              lista.splice(index, 1);
            }
            lista.push(utilizador);

            localStorage.setItem(loginsStorage, JSON.stringify(lista));
          }
        } 
      }*/

    } else if (changeUserInfoState === false) {
      this.props.login.changeUserInfoState = null
      this.setState({ showUserInfoModal: true, showErrorMessage: true, errorMessage: changeUserErrorMessage })
    } else if (changePhotoStorage) {
      let v = this.changePhoto()
      if (v) {
        this.props.login.changePhotoStorage = false;
      }
    } else if (this.state.changeInstitution && validToken) {
      this.setState({ changeInstitution: false })
      this.props.getUser();
    }
  }

  changePhoto() {
    /* let bannerImage = document.getElementById('bannerImage');
    let imgData = ""
    let adiciona = false;

    if (bannerImage.complete) {
      if (bannerImage.src !== "" && bannerImage.src === this.props.login.userPhotoUri) {
        imgData = getBase64Image(bannerImage);
        adiciona = true;
      } else if (bannerImage.src.includes("account-circle") && this.props.login.userPhotoUri === null) {
        imgData = "";
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
          const index = lista.findIndex(l => l.email === utilizador.email);
          if (index >= 0) {
            lista.splice(index, 1);
          }
          lista.push(utilizador);

          localStorage.setItem(loginsStorage, JSON.stringify(lista));
          return true;
        }
      }
    } */
    return false;
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth })
  }

  handleChangeInstitutionDropDown(event) {
    var chave = event.currentTarget.getAttribute("value")
    var institutionArr = chave.split('$%$');

    this.props.login.institution = institutionArr[0];
    this.props.login.nameInstitution = institutionArr[1];
    this.props.login.validToken = false; //mudou a instituição tem que obter novo token
    this.props.login.getToken = null;
    this.props.login.ClientName = "";
    sessionStorage.removeItem(acessToken);

    this.setState({
      selectedInstitution: event.target.eventKey,
      nameOfInstitution: institutionArr[1],
      changeInstitution: true
    });

    localStorage.setItem(InstitutionId, institutionArr[0]);
    localStorage.setItem(InstitutionName, institutionArr[1]);

    this.props.patient.PatientID = 0
    this.props.patient.PatientInfo = null
    this.props.patient.Medication = null
    this.props.patient.Diagnosis = null
    this.props.patient.Wounds = null
    this.props.patient.Internments = null
    this.props.patient.Cards = null
    this.props.patient.TokenRefresh = true

    sessionStorage.setItem(patientIDSel, 0)
    sessionStorage.setItem(woundIDSel, 0)

    this.props.wounds.Refresh = true
    // limpar os filtros
    this.props.wounds.list = []
    this.props.wounds.listSearch = []
    this.props.wounds.FilterDateFrom = null
    this.props.wounds.FilterDateTo = null
    this.props.wounds.FilterUserIntervention = null
    this.props.wounds.FilterWoundType = null
    this.props.wounds.FilterRoom = null
    this.props.wounds.FilterBed = null
    this.props.wounds.Order = "ASC"
    this.props.wounds.PropertyOrder = "NextIntervention"
    this.props.wounds.Page = 0
    this.props.wounds.NumberRowsPerPage = 10

    this.props.woundInfo.WoundID = 0
    this.props.login.isLoading = true

    this.props.login.listOfAllUsersInstitutions = []
    //this.props.login.refreshUser = true
    this.props.login.tokenRefeshinProgress = true
    this.props.getTokenRefresh()
    //it will close navbar menu
    if (this.state.width < 992) {
      this.props.toggleMenu()
    }
  }

  handleCloseSnackBar() {
    this.setState({
      showSucessMessage: false,
      showErrorMessage: false
    })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => this.setState({ width: window.innerWidth })

  showUserInfo() {
    //it will close navbar menu
    if (this.props.scrollNavArea) {
      this.props.toggleMenu()
    }

    this.props.getURItoUploadPhoto()

    /* this.setState({
      showUserInfoModal: !this.state.showUserInfoModal
    }) */
  }

  onCancel(isTouched) {
    if (isTouched) {
      this.setState({
        openDialogConfirmCancel: true
      })
    } else {
      this.setState({
        openDialogConfirmCancel: false,
        showUserInfoModal: false
      })
    }

  }

  closeDialogCancel() {
    this.setState({
      openDialogConfirmCancel: false
    })
  }

  closeUserInfo() {
    this.setState({
      openDialogConfirmCancel: false,
      showUserInfoModal: false
    })
  }


  showChangePass() {
    this.setState({
      showChangePassModal: !this.state.showChangePassModal
    })
    if (this.props.scrollNavArea) {
      this.props.toggleMenu()
    }
    /* if (this.props.scrollNavArea || this.state.width < 992 && this.state.showChangePassModal == true) {
      this.props.toggleMenu()
    } */
  }

  closePassModal() {
    this.setState({
      showChangePassModal: false
    })
  }

  saveUser(values) {

    var file = document.getElementById('fileinput').files[0];
    if (file !== undefined) {
      var customBlockSize = 1024 * 512;

      var host = this.props.login.uriToUserPhoto
      host = host.split('?')[0].replace(AZURE_CONTAINER_NAME + '/' + AZURE_BLOB_NAME + '/', '').replace(this.props.login.email, '').replace('.jpg', '')
      var sasToken = this.props.login.uriToUserPhoto
      sasToken = sasToken.split('?')[1]

      var blobService = window.AzureStorage.Blob.createBlobServiceWithSas(host, sasToken)
      blobService.singleBlobPutThresholdInBytes = customBlockSize;

      var speedSummary = blobService.createBlockBlobFromBrowserFile(AZURE_CONTAINER_NAME, AZURE_BLOB_NAME + "/" + this.props.login.email + ".jpg", file, function (error, result, response) {
        // apresentar o erro
        if (error) {
          this.setState({ showUserInfoModal: true, showErrorMessage: true, errorMessage: response })
        }
      })
    }

    let uriPhoto = this.props.login.uriToUserPhoto.split('?')[0]
    this.props.updatePersonalUserInfo(values, uriPhoto);
  }

  saveChangePass(values, email) {
    //let userPass = {Email: email, Password: values.password}

    var language = localStorage.getItem("i18nextLng") || "pt";
    if (language.length > 2) {
      language = language.substr(0, 2).toUpperCase();
    }
    else {
      language = language.toUpperCase();
    }

    let userPass = { Email: email, Password: values.password, language: language }
    // chamar o método da api para alterar password
    this.props.changePassword(userPass)
  }

  onLogoutClick() {
    // limpar filtros
    this.props.wounds.Refresh = true
    this.props.wounds.list = []
    this.props.wounds.listSearch = []
    this.props.wounds.FilterDateFrom = null
    this.props.wounds.FilterDateTo = null
    this.props.wounds.FilterUserIntervention = null
    this.props.wounds.FilterWoundType = null
    this.props.wounds.FilterRoom = null
    this.props.wounds.FilterBed = null
    this.props.wounds.Order = "ASC"
    this.props.wounds.PropertyOrder = "NextIntervention"
    this.props.wounds.Page = 0
    this.props.wounds.NumberRowsPerPage = 10
    this.props.woundInfo.WoundID = 0

    sessionStorage.setItem(settingsTab, 0)

    this.props.logout()
  }

  editCompany() {
    sessionStorage.setItem(settingsTab, "1")
    let url = window.location.href;

    if (url.includes("settings")) {
      //this.props.login.refreshInst = true
      if (this.props.scrollNavArea) {
        this.props.toggleMenu()
      }
      this.props.setRefreshInst()

    } else {
      url = url.replace("/#", "")
      if (url.endsWith("/")) {
        window.location.assign(url + "settings")
      } else {
        window.location.assign(url + "/settings")
      }

    }
  }

  onClickSettings() {
    if (!this.confirmState()) {
      let url = window.location.href;
      if (url.includes("settings")) {
        //this.props.login.refreshInst = true
        if (this.props.scrollNavArea) {
          this.props.toggleMenu()
        }
        this.props.setRefreshInst();
      } else {
        url = url.replace("/#", "")
        if (url.endsWith("/")) {
          window.location.assign(url + "settings")
        } else {
          window.location.assign(url + "/settings")
        }
      }
    }
  }

  onClickLogo() {
    if (!this.confirmState()) {
      if (this.props.login.userAcess.wounds) {

        sessionStorage.setItem(patientIDSel, 0)
        sessionStorage.setItem(woundIDSel, 0)

        let url = window.location.href;
        if (url.includes("settings")) {
          url = url.replace("/settings", "")
          url = url.replace("/#", "")
          window.location.assign(url)
        } else {
          //alert("xyz")
          url = url.replace("/#", "")
          window.location.assign(url)
        }
      } else {
        let url = window.location.href;
        if (url.includes("settings")) {
          this.props.login.refreshInst = true
          if (this.props.scrollNavArea) {
            this.props.toggleMenu()
          }
        } else {
          url = url.replace("/#", "")
          if (url.endsWith("/")) {
            window.location.assign(url + "settings")
          } else {
            window.location.assign(url + "/settings")
          }
        }
      }
    }
  }

  confirmState() {
    let saveButtonCharacterisation = document.getElementById("sabeButtonCharacterisation");
    if (isDefined(saveButtonCharacterisation)) {
      if (!saveButtonCharacterisation.disabled) {
        return true;
      }
    }

    let saveButtonAdmin = document.getElementById("saveButtonAdmin");
    if (isDefined(saveButtonAdmin)) {
      if (!saveButtonAdmin.disabled) {
        return true;
      }
    }
    return false;
  }

  onToggleInstitution(isOpen, event, metadata) {
    if (!this.confirmState()) {
      this.setState({
        isOpenDropInstitution: !this.state.isOpenDropInstitution
      })
    }
  }

  onToggleUser(isOpen, event, metadata) {
    if (!this.confirmState()) {
      this.setState({
        isOpenDropUser: !this.state.isOpenDropUser
      })
    }
  }

  onChangeExpandedInstitution(v) {
    if (!this.confirmState()) {
      this.setState({
        isOpenExpansionInstitution: !this.state.isOpenExpansionInstitution
      })
    }
  }

  onChangeExpandedUser(v) {
    if (!this.confirmState()) {
      this.setState({
        isOpenExpansionUser: !this.state.isOpenExpansionUser
      })
    }
  }

  onClickToggleMenu() {
    if (!this.confirmState()) {
      this.props.toggleMenu()
    }
  }

  render() {
    const { t } = this.props;
    let listOfInstitutions = JSON.parse(this.props.login.listOfInstitutions) || []
    const { classes } = this.props;
    listOfInstitutions.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); // ordenar por nome

    const itensDropDown = listOfInstitutions.map((item, key) =>
      <Fragment key={item.rowKey}>
        <Dropdown.Item
          className="font-weight-bold institution-item"
          key={item.rowKey}
          value={item.rowKey + '$%$' + item.name}
          onClick={this.handleChangeInstitutionDropDown}
          hidden={this.props.login.institution === item.rowKey}>

          {item.name}

        </Dropdown.Item>
        <NavDropdown.Divider className="institution-divider" />
      </Fragment>
    );

    const itensDropDownXsToMd = listOfInstitutions.map((item, key) =>
      <Fragment key={item.rowKey}>
        <Link
          className="cursor-pointer font-weight-bold institution-item d-block py-3 break-text"
          key={item.rowKey}
          value={`${item.rowKey}$%$${item.name}`}
          onClick={this.handleChangeInstitutionDropDown}
          hidden={this.props.login.institution === item.rowKey}>

          {item.name}

        </Link>
      </Fragment>
    );

    const CustomToggleInstitution = React.forwardRef(({ children, onClick }, ref) => (
      <a
        className="text-decoration-none font-weight-bold d-block"
        ref={ref}
        href=""
        onClick={e => {
          e.preventDefault();
          onClick(e);
        }}
      >

        <Box fontFamily={secondaryFont} fontWeight={700} fontSize={14} className="inst-dropdown d-block">
          {this.props.login.nameInstitution} <ExpandMoreIcon className="my-auto" fontSize='large' color={listOfInstitutions.length > 1 || this.props.login.userAcess.settings ? 'inherit' : 'disabled'} />
        </Box>
      </a>
    ));

    let CustomToggleUser = React.forwardRef(({ children, onClick }, ref) => (
      <a
        className="text-decoration-none pointer"
        ref={ref}
        href=""
        onClick={e => {
          e.preventDefault();
          onClick(e);
        }}>
        {children}
        <div className="d-flex user-options">
          <Image id="bannerImage" crossOrigin="anonymous"
            className={"mr-3 my-auto d-none d-lg-block fit-photo" + (this.props.login.userPhotoUri === "" || this.props.login.userPhotoUri === null ? "" : " border-image-header")}
            roundedCircle width="38" height="38"
            src={(this.props.login.userPhotoUri === '' || this.props.login.userPhotoUri == null) ? PatientIcon : this.props.login.userPhotoUri}
            onError={(event) => { event.target.src = PatientIcon; event.target.className = "mr-3 my-auto d-none d-lg-block" }}
          ></Image>
          <div className="id-dropdown-parent text-left my-auto mr-1">
            <Box fontFamily={secondaryFont} fontWeight={700} fontSize={14} className="id-dropdown d-block">{this.props.login.userName}</Box>
            <Box fontFamily={secondaryFont} fontSize={14} className="id-dropdown m-0 d-none d-lg-block">{this.props.login.userSpeciality}</Box>
          </div>

          <ExpandMoreIcon className="my-auto" fontSize='large' />
        </div>
      </a>
    ));

    return (
      <header className="main-header container">
        <div className="negative-margins">
          <Navbar expand="lg" expanded={this.props.scrollNavArea} className={`pb-4 pt-4 mb-lg-0 mb-md-4 ${this.props.scrollNavArea ? "overflow-y-scroll" : ""}`}>
            <Navbar.Brand className="cursor-pointer" onClick={this.onClickLogo} >
              <Image
                fluid
                src={logo_header}
                width="120"
                alt="logo" />
            </Navbar.Brand>

            <Navbar.Toggle onClick={this.onClickToggleMenu} aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id={'NavBarCollapse'}>
              <Nav className="ml-auto">

                {/* DROPDOWN INSTITUTION */}

                <Dropdown className="mr-4 mt-2 my-lg-auto inst-dropdown-parent d-none d-lg-block" onToggle={(isOpen, event, metadata) => this.onToggleInstitution(isOpen, event, metadata)} show={this.state.isOpenDropInstitution}>
                  <Dropdown.Toggle as={CustomToggleInstitution}></Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-institution">
                    <Dropdown.Item className="institution-item" hidden={!this.props.login.userAcess.settings} onClick={this.editCompany}>{t('EditCompany')}</Dropdown.Item>
                    <NavDropdown.Divider className="institution-divider" hidden={!this.props.login.userAcess.settings || listOfInstitutions.length === 1} />
                    {itensDropDown}
                  </Dropdown.Menu>
                </Dropdown>
                <ExpansionPanel className={`PaperElevation d-lg-none d-lg-none mt-5 border-expand-menu py-5 ${classes.PaperElevation}`} expanded={this.state.isOpenExpansionInstitution} onChange={(v) => this.onChangeExpandedInstitution(v)}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon color={listOfInstitutions.length > 1 || this.props.login.userAcess.settings ? 'inherit' : 'disabled'} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Box fontFamily={secondaryFont} fontWeight={700} fontSize={18} className="inst-dropdown d-block break-text">
                      {this.props.login.nameInstitution}
                    </Box>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="flex-column no-padding-y pb-4 pl-5 ml-5" hidden={!(listOfInstitutions.length > 1 || this.props.login.userAcess.settings)}>
                    <Link className="institution-item d-block py-3 cursor-pointer" hidden={!this.props.login.userAcess.settings} onClick={this.editCompany}>{t('EditCompany')}</Link>
                    {itensDropDownXsToMd}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                {/* DROPDOWN USER */}
                <Dropdown className="mr-2 mt-2 my-lg-auto d-none d-lg-block" onToggle={(isOpen, event, metadata) => this.onToggleUser(isOpen, event, metadata)} show={this.state.isOpenDropUser}>
                  <Dropdown.Toggle as={CustomToggleUser} variant="none" id="dropdown-basic"></Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-user">
                    <Dropdown.Item disabled={true} className="font-weight-bold pointer-none">{this.props.login.userName}</Dropdown.Item>
                    <Dropdown.Item disabled={true}>{this.props.login.userSpeciality}</Dropdown.Item>
                    <NavDropdown.Divider />
                    <Dropdown.Item onClick={this.onLogoutClick} className="mt-2">{t('Login.Logout')}</Dropdown.Item>
                    <Dropdown.Item onClick={this.showUserInfo}>{t('PersonalInfo')}</Dropdown.Item>
                    <Dropdown.Item onClick={this.showChangePass}>{t('Login.ChangePass')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <ExpansionPanel className={`d-lg-none d-lg-none border-expand-menu py-5 mb-5 ${classes.PaperElevation}`} expanded={this.state.isOpenExpansionUser} onChange={(v) => this.onChangeExpandedUser(v)}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Image id="bannerImage2"
                      className={"mr-4 my-auto fit-photo" + (this.props.login.userPhotoUri === "" || this.props.login.userPhotoUri === null ? "" : " border-image-header")}
                      roundedCircle width="45" height="45"
                      src={(this.props.login.userPhotoUri === '' || this.props.login.userPhotoUri == null) ? PatientIcon : this.props.login.userPhotoUri}
                      onError={(event) => { event.target.src = PatientIcon; event.target.className = "mr-4 my-auto" }}
                    ></Image>
                    <div className="id-dropdown-parent text-left my-auto mr-1 ">
                      <Box fontFamily={secondaryFont} fontWeight={700} fontSize={18} className=" d-block">{this.props.login.userName}</Box>
                      <Box fontFamily={secondaryFont} fontSize={18} className="id-dropdown m-0">{this.props.login.userSpeciality}</Box>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className="no-padding-y pb-4 pl-5 ml-5 flex-column">
                    <Link className="nav-link institution-item d-block py-3 cursor-pointer" onClick={this.onLogoutClick}>{t('Login.Logout')}</Link>
                    <Link className="institution-item d-block py-3 cursor-pointer" onClick={this.showUserInfo}>{t('PersonalInfo')}</Link>
                    <Link className="institution-item d-block py-3 cursor-pointer" onClick={this.showChangePass}>{t('Login.ChangePass')}</Link>
                  </ExpansionPanelDetails>
                </ExpansionPanel>


                <Form inline className="mr-sm-2 mb-5 mb-lg-0" hidden={!this.props.login.userAcess.settings}>
                  {/*  <FormControl type="text" placeholder="Search" /> */}

                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip
                        className="tooltip-header">
                        {t('navBar.Admin')}
                      </Tooltip>
                    }>

                    <IconButton className="grey-icon-override outline-none" size="medium" aria-label="f3m" onClick={this.onClickSettings} /* href="/settings" */>
                      <SettingsIcon className="grey-icon-override" fontSize="large" />
                    </IconButton>

                  </OverlayTrigger>

                  <IconButton aria-label="f3m" hidden={true}>
                    <NotificationsNoneIcon fontSize="large" />
                  </IconButton>
                  <IconButton aria-label="f3m" hidden={true}>
                    <FullscreenIcon />
                  </IconButton>

                </Form>
              </Nav>
            </Navbar.Collapse>

          </Navbar>

          <DialogPersonalUserInfoForm
            showUserInfoModal={this.state.showUserInfoModal}
            onClose={(isTouched) => this.onCancel(isTouched)}
            saveUser={(v) => this.saveUser(v)}
            userInfo={this.props.login}
          >
          </DialogPersonalUserInfoForm>

          <DialogChangePasswordForm
            showChangePassModal={this.state.showChangePassModal}
            onClose={v => this.closePassModal()}
            changeShowFormPass={v => this.showChangePass()}
            saveChangePass={(values, email) => this.saveChangePass(values, email)}
            email={this.props.login.email}
          >
          </DialogChangePasswordForm>

          {/* DIALOG CONFIRM CANCEL */}
          <Dialog
            open={this.state.openDialogConfirmCancel || false}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title-confirm-cancel"> </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-confirm-cancel" style={{ color: "#494949", fontFamily: "Roboto", fontSize: "14px" }}>
                {t('loseUnsavedChanges')}
                {' ' + t('confirmQuestion')}
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ color: "#494949", fontFamily: "Roboto" }}>
              <Button className="outline-none" onClick={v => this.closeDialogCancel()} color="primary" autoFocus>
                {t('No')}
              </Button>
              <Button className="outline-none" onClick={v => this.closeUserInfo()} color="primary">
                {t('Yes')}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Mensagem de alterações gravadas com sucesso */}
          <Snackbar open={this.state.showSucessMessage} autoHideDuration={5000} onClose={this.handleCloseSnackBar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSnackBar} severity="success">
              {t('sucessChangesSaved')}
            </MuiAlert>
          </Snackbar>

          {/* Mensagem de Erro */}
          <Snackbar open={this.state.showErrorMessage} autoHideDuration={5000} onClose={this.handleCloseSnackBar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSnackBar} severity="error">
              {t(this.state.errorMessage)}
            </MuiAlert>
          </Snackbar>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({ login: state.login, wounds: state.wounds, patient: state.patient, woundInfo: state.woundInfo });
const mapDispatchToProps = dispatch => bindActionCreators({ logout, getTokenRefresh, setLoading, updatePersonalUserInfo, changePassword, getURItoUploadPhoto, getUser, setRefreshInst }, dispatch)

export default withTranslation()(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header)));