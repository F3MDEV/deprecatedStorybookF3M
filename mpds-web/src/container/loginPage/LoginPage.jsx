//React
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useTranslation, withTranslation } from "react-i18next";

//CSS, STYLES & MEDIA ASSETS
import "./LoginPage.scss";
import logo from "../../utils/logo_MPDS.svg";
import "../../App.scss";
import PatientIcon from '../../utils/account-circle.svg';

//ACTIONS
import { login, getToken, resetPassword } from '../../store/actions/login/loginActions'

//CONSTANTS
import { InstitutionId, InstitutionName, loginsStorage } from "../../utils/constants";
import { isDefined } from "../../utils/utils";

//INSIDE COMPONENTS
import Input from '../../components/form/inputAuth'
import InputPassword from '../../components/input_password/input_password'
import ErrorBoundary from '../../main/ErrorBoundary'

//OUTSIDE COMPONENTS
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//ICONS
import ClearIcon from '@material-ui/icons/Clear';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const languages = [
  {
    value: 'pt-PT',
    label: 'Português',

  },
  {
    value: 'en-US',
    label: 'English',
  }
];

function Page() {
  const { i18n } = useTranslation();

  const changeLanguage = (event, lng) => {
    i18n.changeLanguage(event, lng);
  };

  let languageStorage = localStorage.getItem('i18nextLng')
  if (languageStorage != null && languageStorage !== "") {
    if (languageStorage !== "pt-PT" && languageStorage !== "en-US") {
      if (languageStorage.length > 2) {
        let abrvLang = languageStorage.substr(0, 2).toLowerCase();
        if (abrvLang === "en") {
          languageStorage = 'en-US'
        } else {
          languageStorage = 'pt-PT'
        }
      } else {
        languageStorage = 'pt-PT'
      }
    }
  } else {
    languageStorage = 'pt-PT'
  }

  const [values, setValues] = React.useState({
    language: languageStorage
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    /** Change to the clicked language */
    changeLanguage(event.target.value)
  };

  return (
    <div className="text-center pb-5">

      <TextField
        id="standard-select-currency"
        select
        inputProps={{ className: "pl-3" }}
        value={values.language}
        onChange={handleChange('language')}
        margin="normal"
      >

        {languages.map(option => (
          <MenuItem key={option.value} value={option.value} dense={true}>
            {option.label}
          </MenuItem>
        ))}


      </TextField>

    </div>
  );
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { loginMode: true, selectedInstitution: null, resetPass: false, showError: true, error: null, showErrorMessage: false, errorMessageSnack: "", showedError: false }
    this.handleChangeInstitution = this.handleChangeInstitution.bind(this);
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangeUserLogin = this.handleChangeUserLogin.bind(this);
    this.handleRemoverUserFromList = this.handleRemoverUserFromList.bind(this);
    this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);

    document.getElementById('root').style.background = "#f4fafb"

  }

  componentDidUpdate() {
    if (this.props.loginU.errorLimitUsers !== "" && !this.state.showErrorMessage && !this.state.showedError) {
      this.setState({ showErrorMessage: true, errorMessageSnack: this.props.loginU.errorLimitUsers, showedError: true })
    } else if (isDefined(this.props.loginU.errorAccessDenied) && !this.state.showErrorMessage && !this.state.showedError) {
      this.setState({ showErrorMessage: true, errorMessageSnack: this.props.loginU.errorAccessDenied, showedError: true })
    } else if (!this.props.loginU.validToken && !this.props.loginU.firstLogin && !isDefined(this.props.loginU.errorAccessDenied) && !this.props.login.tokenRefeshinProgress) {
      this.refreshToken();
    }
  }

  handleCloseSnackBar() {
    this.setState({
      showErrorMessage: false,
      errorMessageSnack: ""
    })
  }

  refreshToken() {

    if (
      this.props.loginU.email != null &&
      this.props.loginU.pass != null &&
      this.props.loginU.institution != null &&
      this.props.loginU.firstLogin === false
    ) {
      if (!this.props.login.tokenRefeshinProgress) {
        this.props.login.tokenRefeshinProgress = true;
        this.props.getToken(this.props.loginU.pass);
      }
    }
  }

  onSubmit(values) {
    if (this.state.loginMode) {
      const { login } = this.props


      this.props.patient.PatientID = 0
      this.setState({
        loginMode: true,
        showError: true
      })

      login(values)
    }
  }

  onSubmitUser(values) {
    if (this.state.loginMode) {
      const { login } = this.props
      const value = {
        email: this.props.loginU.email,
        password: values.password
      }


      this.props.patient.PatientID = 0
      this.setState({
        loginMode: true,
        showError: true
      })

      login(value)
    }
  }

  onSubmitPass(values) {
    this.props.loginU.errorEmailMsg = null
    this.props.loginU.errorPassMsg = null
    this.props.loginU.errorMsg = null

    if (values.password !== values.newpassword) {
      this.props.loginU.errorPassMsg = 'passDiff'
      this.setState({
        loginMode: true,
        resetPass: true,
        showError: true
      })
    }
    else {
      this.props.resetPassword(values.email, values.password)

      this.setState({
        loginMode: true,
        resetPass: false,
        showError: true
      })
    }
  }

  onSubmitPassWithoutEmail(values) {
    this.props.loginU.errorEmailMsg = null
    this.props.loginU.errorPassMsg = null
    this.props.loginU.errorMsg = null

    if (values.password !== values.newpassword) {
      this.props.loginU.errorPassMsg = 'passDiff'
      this.setState({
        loginMode: true,
        showError: true
      })
    }
    else {
      this.props.resetPassword(this.props.loginU.email, values.password)

      this.setState({
        loginMode: true,
        showError: true
      })
    }
  }

  handleChangeLogin(event) {
    try {
      this.props.loginU.pass = null;
      this.props.loginU.email = null;
      this.props.loginU.showInstitution = false;
      this.props.loginU.showLogin = true;
      this.props.loginU.showChangePass = false;
      this.props.loginU.showLoginUser = false;
      this.props.loginU.showLoginListUsers = false;

      this.props.loginU.userName = null;
      this.props.loginU.userSpeciality = null;
      this.props.loginU.userPhotoUri = null;
      this.props.loginU.errorEmailMsg = null;
      this.props.loginU.errorPassMsg = null;
      this.props.loginU.errorMsg = null;


      this.setState({
        selectedInstitution: null,
        loginMode: true,
      });
    } catch (error) {
      this.setState({ error: error });
    }
  }

  handleChangePass(event) {
    try {

      this.props.loginU.showChangePass = true;
      this.props.loginU.showLogin = false;
      this.props.loginU.showInstitution = false;
      this.props.loginU.showLoginUser = false;
      this.props.loginU.showLoginListUsers = false;
      this.props.loginU.errorEmailMsg = null;
      this.props.loginU.errorPassMsg = null;
      this.props.loginU.errorMsg = null;

      this.setState({
        resetPass: true,
        loginMode: false,
        showError: true
      })
    } catch (error) {
      this.setState({ error: error });
    }
  }

  handleChangeInstitution(event) {
    try {
      var institutionArr = event.currentTarget.value.split('$%$');

      this.props.loginU.institution = institutionArr[0];
      this.props.loginU.nameInstitution = institutionArr[1];
      this.props.loginU.showInstitution = false;
      this.props.loginU.errorEmailMsg = null;
      this.props.loginU.errorPassMsg = null;
      this.props.loginU.errorMsg = null;
      this.props.loginU.errorAccessDenied = null;

      localStorage.setItem(InstitutionId, institutionArr[0]);
      localStorage.setItem(InstitutionName, institutionArr[1]);

      this.setState({
        selectedInstitution: event.currentTarget.value,
        showedError: false
      });
    } catch (error) {
      this.setState({ error: error });
    }

  }

  handleChangeUserLogin(event) {
    try {
      this.props.loginU.email = event.currentTarget.value;
      this.props.loginU.errorEmailMsg = null;
      this.props.loginU.errorPassMsg = null;
      this.props.loginU.errorMsg = null;

      const index = this.props.loginU.listaLogins.findIndex(l => l.email === this.props.loginU.email);

      if (index !== -1) {
        this.props.loginU.userName = this.props.loginU.listaLogins[index].name;
        this.props.loginU.userSpeciality = this.props.loginU.listaLogins[index].specialty;
        this.props.loginU.userPhotoUri = this.props.loginU.listaLogins[index].photoUri;

        this.props.loginU.showLoginListUsers = false;
        this.props.loginU.showLoginUser = true;

        this.setState({
          loginMode: true,
          showError: true
        });
      }
    } catch (error) {
      this.setState({ error: error });
    }

  }

  handleRemoverUserFromList(event) {
    try {
      event.stopPropagation();
      var emailRemove = event.currentTarget.value;
      var list = JSON.parse(localStorage.getItem(loginsStorage)) || [];
      //const index = this.props.loginU.listaLogins.findIndex(l => l.email === emailRemove);
      const index = list.findIndex(l => l.email === emailRemove);

      list.splice(index, 1)

      this.props.loginU.listaLogins = list

      // Atualizar o array em storage
      localStorage.setItem(loginsStorage, JSON.stringify(list))

      // atualizar as variáveis
      var dimList = list.length;

      if (dimList <= 0) {
        this.props.loginU.showLoginUser = false
        this.props.loginU.showLoginListUsers = false
      } else {
        if (this.props.loginU.listaLogins.length === 1) {
          this.props.loginU.showLoginUser = true
          this.props.loginU.showLoginListUsers = false
        } else {
          this.props.loginU.showLoginUser = false
          this.props.loginU.showLoginListUsers = true
        }
      }

      this.props.loginU.errorEmailMsg = null;
      this.props.loginU.errorPassMsg = null;
      this.props.loginU.errorMsg = null;

      this.setState({
        loginMode: true,
        showError: true
      });
    } catch (error) {
      this.setState({ error: error });
    }
  }

  changeErrorState() {
    this.props.loginU.errorEmailMsg = null;
    this.props.loginU.errorPassMsg = null;
    this.props.loginU.errorMsg = null;

    this.setState({
      showError: false
    })
  }

  render() {
    const { handleSubmit } = this.props;
    const { t } = this.props;
    const list = JSON.parse(this.props.loginU.listOfInstitutions) || []; //Se vazio ou undefined assume lista vazia
    //var listUser = this.props.loginU.listaLogins || []; // ao alterar entre idioma voltava a reordenar a lista ficando ao contrário
    var listUser = JSON.parse(localStorage.getItem(loginsStorage)) || []
    /*
    listUser.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); // ordenar por nome
    */
    listUser.reverse() // último que fez login

    console.log(listUser)
    console.log(this.props.loginU.fetchUsers)

    let listUserApi = this.props.loginU.fetchUsers || [];
    let i = 0;
    let j = 0;
    let len = listUser.length || 0;
    let lenApi = listUserApi.length || 0;
    for (i = 0; i < len; i++) {
      for (j = 0; j < lenApi; j++) {
        if (listUser[i].email === listUserApi[j].rowKey) {
          listUser[i].photoUri = listUserApi[j].photoUri
          break;
        }
      }
    }

    console.log(listUser)

    let showLogin = this.props.loginU.showLogin
    let showInstitution = this.props.loginU.showInstitution
    let showChangePass = this.props.loginU.showChangePass
    let firstLogin = this.props.loginU.firstLogin

    let showLoginUser = this.props.loginU.showLoginUser
    let showLoginListUsers = this.props.loginU.showLoginListUsers

    if (showLoginListUsers || showLoginUser) {
      showLogin = false
    }

    if (showLoginUser) {
      if (listUser.length === 1) {
        this.props.loginU.email = listUser[0].email
        this.props.loginU.userName = listUser[0].name;
        this.props.loginU.userSpeciality = listUser[0].specialty;
        this.props.loginU.userPhotoUri = listUser[0].photoUri;
      }
    }

    const itensButtons = list.map((item, key) =>
      <div>
        <Divider hidden={key === 0 ? "true" : "false"} />
        <Button key={item.rowKey} value={item.rowKey + '$%$' + item.name} onClick={this.handleChangeInstitution} className="px-2 py-2 text-left my-auto mr-2 w-100 institution-select-btn institition-fsize outline-none">
          {item.name}
        </Button>
      </div>
    );

    const itensButtonsUsers = listUser.map((item, key) =>

      <ButtonBase className="w-100 d-block outline-none" key={item.email} value={item.email} color="primary" onClick={this.handleChangeUserLogin}>
        <Row className="p-2 justify-content-center flexwrap-margin-unset">

          <Image className={"text-left mr-3 my-auto fit-photo" + (item.photoUri === "" || item.photoUri === null ? "" : " border-image")}
            roundedCircle width="38" height="38"
            src={(item.photoUri === '' || item.photoUri == null) ? PatientIcon : item.photoUri}
            onError={(event) => { event.target.src = PatientIcon; event.target.className = "text-left mr-3 my-auto" }}
          ></Image>

          <div className="text-left my-auto mr-2 w-100 ellipsis-info">
            <Box color="text.primary" fontFamily="Nunito" fontWeight={700} fontSize={14} className="ellipsis-info d-block m-0 name-line-height">{item.name}</Box>
            <Box color="text.primary" fontFamily="Nunito" fontSize={14} className="ellipsis-info m-0 ">{item.specialty}</Box>
          </div>
          <IconButton display="false"
            width="38"
            height="38"
            className="my-auto outline-none"
            key={item.email + 'X'}
            value={item.email}
            onClick={this.handleRemoverUserFromList}>
            <ClearIcon />
          </IconButton>
        </Row>
      </ButtonBase>
    );

    let form;


    if (showLogin) {

      form = <form className="p-4 pt-5 mx-auto" onSubmit={e => handleSubmit(v => this.onSubmit(v))(e)}>
        <Field
          color="primary"
          component={Input}
          type="email"
          name="email"
          required={true}
          label={t('Login.Email')}
          classes="login-input-bbottom mt-4"
          classesLabel="login-input-label"
          onChange={() => this.changeErrorState()}
          errorState={this.state.showError && (this.props.loginU.errorEmailMsg != null || this.props.loginU.errorMsg != null) ? true : false}
          errorMessage={(this.state.showError && this.props.loginU.errorEmailMsg != null) ? t(this.props.loginU.errorEmailMsg) : ""}
        />

        <Field
          component={InputPassword}
          classesLabel="login-input-label"
          classes="login-input-bbottom"
          type="password"
          name="password"
          required={true}
          onChange={() => this.changeErrorState()}
          errorState={(this.state.showError && this.props.loginU.errorMsg != null) ? true : false}
          errorMessage={this.props.loginU.errorMsg != null ? t(this.props.loginU.errorMsg) : ""}
          placeholder={t('Login.password')}
          label={t('Login.password')} />

        <Link color="textSecondary" className="text-right d-block login-info" href="#" onClick={v => { this.handleChangePass(v) }}>{t('Login.textForgotPass')}</Link>
        <Button className="button-login d-block mx-auto my-5" color="primary" variant="contained" type="submit"><span className="px-5">{t('Login.Login')}</span></Button>
        <img width="200px" src="images\f3mfeelit-fundobranco.png" className="mx-auto d-block pt-5" alt=""></img>
        <Box className="text-center pt-3" fontSize={12} fontFamily="Roboto">{t('Login.textNotUser')}, <Link color="textSecondary" href={t('urlInformationRequest')} target="_blank">{t('clickHere')}</Link>.</Box>
      </form>
    } else if (showLoginListUsers) {
      //{/* MORE THAN USER LOGIN */ }
      form =
        <div>
          <form className="p-4 pt-5 mx-auto" onSubmit={v => this.handleChangeUserLogin(v)}>
            {itensButtonsUsers}
          </form>
          <Link variant="body2" color="textSecondary" className="py-5 text-center font-weight-bold d-block" href="#" onClick={v => { this.handleChangeLogin(v) }}>{t('Login.anotherUser')}</Link>
          <img width="200px" src="images\f3mfeelit-fundobranco.png" className="mx-auto d-block mt-5" alt=""></img>
          <Box className="text-center pt-3" fontSize={12} fontFamily="Roboto">{t('Login.textNotUser')}, <Link color="textSecondary" className="font-weight-bold" href={t('urlInformationRequest')} target="_blank">{t('clickHere')}</Link>.</Box>        </div >
    } else if (showLoginUser) {
      //{/* ONE USER LOGIN */ }
      form = < form className="p-4 pt-5 mx-auto" onSubmit={handleSubmit(v => this.onSubmitUser(v))} >
        <Row className="pb-4 justify-content-center flexwrap-margin-unset">
          <Image id="imgData"
            className={"text-left mr-3 my-auto fit-photo" + (this.props.loginU.userPhotoUri === "" || this.props.loginU.userPhotoUri === null ? "" : " border-image")}
            roundedCircle width="38" height="38"
            src={(this.props.loginU.userPhotoUri == null || this.props.loginU.userPhotoUri === '') ? PatientIcon : this.props.loginU.userPhotoUri}
            onError={(event) => { event.target.src = PatientIcon; event.target.className = "text-left mr-3 my-auto" }}
          ></Image>
          <div className="text-left my-auto mr-2 w-100 ellipsis-info">
            <Box color="text.primary" fontFamily="Nunito" fontWeight={700} fontSize={14} className="ellipsis-info d-block m-0 name-line-height">{this.props.loginU.userName}</Box>
            <Box color="text.primary" fontFamily="Nunito" fontSize={14} className="ellipsis-info m-0 ">{this.props.loginU.userSpeciality}</Box>
          </div>

          <IconButton display="false"
            width="38"
            height="38"
            className="my-auto outline-none"
            key={this.props.loginU.email + 'X'}
            value={this.props.loginU.email}
            onClick={this.handleRemoverUserFromList}><ClearIcon />
          </IconButton>
        </Row>
        <div className="container-password">
          <Field
            component={InputPassword}
            classesLabel="login-input-label"
            classes="login-input-bbottom"
            type="password"
            name="password"
            placeholder={t('Login.password')}
            label={t('Login.password')}
            required={true}
            onChange={() => this.changeErrorState()}
            errorState={this.state.showError && this.props.loginU.errorMsg != null ? true : false}
            errorMessage={this.props.loginU.errorMsg != null ? t(this.props.loginU.errorMsg) : ""}
          />

          <Link color="textSecondary" className="text-right d-block login-info mb-5" href="#" onClick={v => { this.handleChangePass(v) }}>{t('Login.textForgotPass')}</Link>
        </div>
        <Button className="button-login d-block mx-auto mt-5 mb-4" color="primary" variant="contained" type="submit">{t('Login.Login')}</Button>

        <Link variant="body2" color="textSecondary" className="pt-1 text-center font-weight-bold d-block" href="#" onClick={v => { this.handleChangeLogin(v) }}>{t('Login.anotherUser')}</Link>

        <img width="200px" src="images\f3mfeelit-fundobranco.png" className="mx-auto d-block mt-5" alt=""></img>
        <Box className="text-center pt-3" fontSize={12} fontFamily="Roboto">
          {t('Login.textNotUser')}, <Link color="textSecondary" className="font-weight-bold" href={t('urlInformationRequest')} target="_blank">{t('clickHere')}</Link>.</Box>
      </form >
    }
    else if (showInstitution) {
      //{/* SHOW INSTITUTIONS */ }
      form =
        < div >
          <form className="px-2 pt-3 pb-2 mx-auto" onSubmit={v => this.handleChangeLogin(v)}>
            <ButtonBase
              className="outline-none"
              disableRipple
              disableTouchRipple
              focusRipple
              variant="contained"
              type="submit">
              <IconButton fontSize="large" className="mr-1 outline-none" color="primary" type="submit">
                <ArrowBackIcon />
              </IconButton>
              <Box
                color="text.secondary"
                fontFamily="Roboto"
                fontSize={14}
                fontWeight={700} >
                {t('goBack')}
              </Box>
            </ButtonBase>
          </form>
          <form className="px-4 pb-4 pt-2 mx-auto" onSubmit={v => this.handleChangeInstitution(v)}>
            <Card>
              {itensButtons}
            </Card>
          </form>
        </div >
    } else if (showChangePass) {
      //{/* CHANGE PASSWORD */}
      form = <div >
        <form className="px-2 pt-3 pb-2 mx-auto" onSubmit={v => this.handleChangeLogin(v)}>
          <ButtonBase
            className="outline-none"
            disableRipple
            disableTouchRipple
            focusRipple
            variant="contained"
            type="submit">
            <IconButton fontSize="large" className="mr-1 outline-none" color="primary" type="submit">
              <ArrowBackIcon className="fix-margin-go-back" />
            </IconButton>
            <Box
              color="text.secondary"
              fontFamily="Roboto"
              fontSize={14}
              fontWeight={700} >
              {t('goBack')}
            </Box>
          </ButtonBase>
        </form>
        <form className="px-4 mx-auto" onSubmit={handleSubmit(v => this.onSubmitPass(v))}>
          <Field
            classesLabel="login-input-label"
            classes="login-input-bbottom"
            color="primary"
            component={Input}
            type="email"
            name="email"
            label={t('Login.Email')}
            onChange={() => this.changeErrorState()}
            errorState={this.state.showError && this.props.loginU.errorMsg != null ? true : false}
            errorMessage={this.props.loginU.errorMsg != null ? t(this.props.loginU.errorMsg) : ""}
            required={true}
          />

          <Field
            component={InputPassword}
            classesLabel="login-input-label"
            classes="login-input-bbottom"
            type="password"
            name="password"
            placeholder={t('Login.newpassword')}
            label={t('Login.newpassword')}
            onChange={() => this.changeErrorState()}
            errorState={this.state.showError && this.props.loginU.errorPassMsg != null ? true : false}
            required={true}
          />

          <Field
            component={InputPassword}
            classesLabel="login-input-label"
            classes="login-input-bbottom"
            type="password"
            name="newpassword"
            placeholder={t('Login.confirmPassword')}
            label={t('Login.confirmPassword')}
            onChange={() => this.changeErrorState()}
            errorState={this.state.showError && this.props.loginU.errorPassMsg != null ? true : false}
            errorMessage={this.props.loginU.errorPassMsg != null ? t(this.props.loginU.errorPassMsg) : ""}
            required={true}
          />
          <Button className="button-login d-block mx-auto mt-4 mb-5" color="primary" variant="contained" type="submit">{t('Login.ChangePass')}</Button>
        </form>
      </div>
    } else if (firstLogin) {
      // {/* FIRST LOGIN */}
      form = <div >

        <form className="px-2 pt-3 pb-2 mx-auto" onSubmit={v => this.handleChangeLogin(v)}>
          <ButtonBase
            className="outline-none"
            disableRipple
            disableTouchRipple
            focusRipple
            variant="contained"
            type="submit">
            <IconButton fontSize="large" className="mr-1 outline-none" color="primary" type="submit">
              <ArrowBackIcon />
            </IconButton>
            <Box
              color="text.secondary"
              fontFamily="Roboto"
              fontSize={14}
              fontWeight={700} >
              {t('goBack')}
            </Box>
          </ButtonBase>
        </form>
        <form className="px-4 pb-4 pt-0 mx-auto" onSubmit={handleSubmit(v => this.onSubmitPassWithoutEmail(v))}>
          <Field
            component={InputPassword}
            classesLabel="login-input-label"
            classes="login-input-bbottom"
            type="password"
            name="password"
            placeholder={t('Login.newpassword')}
            label={t('Login.newpassword')}
            required={true}
            onChange={() => this.changeErrorState()}
            errorState={this.state.showError && this.props.loginU.errorPassMsg != null ? true : false}
          />
          <Field
            component={InputPassword}
            classesLabel="login-input-label"
            classes="login-input-bbottom"
            type="password"
            name="newpassword"
            placeholder={t('Login.confirmPassword')}
            label={t('Login.confirmPassword')}
            error={this.props.loginU.errorPassMsg !== null}
            required={true}
            onChange={() => this.changeErrorState()}
            errorState={this.state.showError && this.props.loginU.errorPassMsg != null ? true : false}
            errorMessage={this.props.loginU.errorPassMsg != null ? t(this.props.loginU.errorPassMsg) : ""}
          />

          <Button className="button-login d-block mx-auto mt-4 mb-5" color="primary" variant="contained" type="submit">{t('Login.ChangePass')}</Button>
        </form>
      </div>
    }


    return (
      <ErrorBoundary>
        <Container className="background login-illustration">
          <Row className="vh-100">
            <Col xs sm md={12} lg={4}>
              <Page />
              <Image src={logo} className="App-logo d-block mx-auto my-md-5 my-3" fluid alt="logo" />
              {form}
            </Col >
            <Col lg={8} className="d-none d-lg-block">
            </Col>
          </Row>

          {/* Mensagem de Erro */}
          <Snackbar open={this.state.showErrorMessage} autoHideDuration={5000} onClose={this.handleCloseSnackBar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSnackBar} severity="error">
              {t(this.state.errorMessageSnack)}
            </MuiAlert>
          </Snackbar>
        </Container>
      </ErrorBoundary>
    )
  }
}

Login = reduxForm({ form: 'loginForm' })(Login)
//const mapStateToProps = state => ({ loginU: state.login, patient: state.patient });
const mapStateToProps = (state, ownProps) => ({ loginU: state.login, patient: state.patient, initialValues: { email: state.login.loginExtEmail } });
const mapDispatchToProps = dispatch => bindActionCreators({ login, getToken, resetPassword }, dispatch)
export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Login))


