import React, { Component, Suspense } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withTranslation } from 'react-i18next';
import { BrowserRouter as Router } from "react-router-dom";

//import Header from "../components/header/header";
import Routes from "./routes";
import LoadingF3M from '../components/Loadings/LoadingF3M';

import { getToken, logout, getUser, getUsersInstitution, setLoading, getUserAndUsersInstitution, getInfoClient, getTokenRefresh } from '../store/actions/login/loginActions';
import { InstitutionId, InstitutionName, acessToken, userEmail, userEmailVal, VERSION } from "../utils/constants";
import moment from 'moment';


//OUTSIDE COMPONENTS
import Link from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';

//INSIDE COMPONENTS
import ErrorBoundary from "./ErrorBoundary"
import MaintenanceBondary from "./MaintenanceBondary"

//CSS, STYLES & MEDIA ASSETS
import "./Home.scss"
import variables from "../assets/bootstrap/scss/_variables.scss"

const Header = React.lazy(() => import('../components/header/header'));

//Scss variable
const lgBreakpoint = variables.gridBreakLg;
const {primaryFont} = variables;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "", showInstitutions: true, selectedInstitution: "", nameOfInstitution: "", showUserInfo: false,
            counter: 0, isMenuOpen: false, width: 0, height: 0, scrolled: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleOpenMenu = this.handleOpenMenu.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.scrolledToTheFullest = this.scrolledToTheFullest.bind(this);
    }

    

    componentDidMount() {
        if (this.props.login.validToken) {
            if (this.props.login.ClientName === "" & !this.props.login.getClientInProgress) {
                this.props.login.getClientInProgress = true;
                this.props.getInfoClient()
            }
        }
        this.updateWindowDimensions();
        this.scrolledToTheFullest();
        window.addEventListener('resize', this.updateWindowDimensions);
        window.addEventListener('scroll', this.scrolledToTheFullest);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        window.removeEventListener('scroll', this.scrolledToTheFullest);
    }

    scrolledToTheFullest() {
        if (document.body.scrollHeight <= window.scrollY + window.innerHeight || document.body.scrollHeight - 1 <= window.scrollY + window.innerHeight) {
            this.setState({
                scrolled: true
            });
        } else {
            this.setState({
                scrolled: false
            });
        }
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        if (this.state.width > lgBreakpoint) {
            this.setState({
                isMenuOpen: false
            });
        }
    }

    componentDidUpdate() {
        if (this.props.wounds.TokenRefresh || this.props.patient.TokenRefresh || this.props.woundInfo.TokenRefresh || this.props.login.needTokenRefresh){
            this.props.wounds.TokenRefresh = false;
            this.props.patient.TokenRefresh = false;
            this.props.woundInfo.TokenRefresh = false;
            this.props.login.needTokenRefresh = false;
            this.props.getTokenRefresh();
        } else if (!this.props.login.validToken) {
            this.refreshToken();
        } 
        else {
            let lista = this.props.login.listOfUsersInstitution || []
            if (!this.props.login.userInfo) {
                if (localStorage.getItem(userEmail) != null) {
                    this.props.getUser();
                }
            } else if (!this.props.login.getClientInProgress && this.props.login.ClientName === "") {
                this.props.login.getClientInProgress = true
                this.props.getInfoClient()
            } else if (lista.length === 0) {
                if (!this.props.login.getUsersInProgress && !this.props.login.getUsersDone) {
                    this.props.login.getUsersInProgress = true;
                    this.props.getUsersInstitution();
                }
            } else if (this.props.login.validateUserAcessInLogin){
                let email = localStorage.getItem(userEmailVal)
                let url = window.location.href;

                if (email !== this.props.login.email){
                    if (!this.props.login.userAcess.wounds && this.props.login.userAcess.settings){
                        if (!url.includes("settings")){
                            url = url.replace("/#","")
                            if (url.endsWith("/")){
                                window.location.assign(url +"settings")
                            } else {
                                window.location.assign(url +"/settings")
                            }        
                        } 
                    } else {
                        if (url.includes("settings")){
                            window.location.assign(url.replace("settings",""))
                        }
                    }

                    localStorage.setItem(userEmailVal, this.props.login.email)
                }
                /* else {
                    if (url.includes("settings") && !this.props.login.userAcess.settings){
                        window.location.assign(url.replace("settings",""))
                        //window.location.assign(url.replace(urlPath, ""))
                    } else if (!url.includes("settings") && this.props.login.userAcess.settings && !this.props.login.userAcess.wounds){
                        url = url.replace("/#","")
                        if (url.endsWith("/")){
                            window.location.assign(url +"settings")
                        } else {
                            window.location.assign(url +"/settings")
                        }
                        //window.location.assign(url.replace(urlPath, "/settings") )
                    }
                } */

                this.props.login.validateUserAcess = false
            } /* else if (!this.props.login.getAllUsersInProgress && !this.props.login.getProfilesInProgress) {
                let url = window.location.href;
                //let urlhost = window.location.hostname;
                //let urlPath = window.location.pathname;
                if (url.includes("settings") && !this.props.login.userAcess.settings){
                    window.location.assign(url.replace("settings",""))
                    //window.location.assign(url.replace(urlPath, ""))
                } else if (!url.includes("settings") && this.props.login.userAcess.settings && !this.props.login.userAcess.wounds){
                    url = url.replace("/#","")
                    if (url.endsWith("/")){
                        window.location.assign(url +"settings")
                    } else {
                        window.location.assign(url +"/settings")
                    }
                    //window.location.assign(url.replace(urlPath, "/settings") )
                }
            }  */ 
        }
      
    }

    handleOpenMenu() {
        if (!this.state.isMenuOpen){
            // refresh user information to update user photo
            this.props.getUser();
        }
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    }

    refreshToken() {
        if (
            this.props.login.email != null &&
            this.props.login.pass != null &&
            this.props.login.institution != null
        ) {
            this.props.getToken(this.props.login.pass);
        }
    }

    handleClose() {
        this.props.getUser();

        this.setState({
            showUserInfo: false
        });
    }

    render() {
        const { t } = this.props;
        let year = moment().format("YYYY");

        return (
            
                <ErrorBoundary>
                <Router>
                    <div className={this.state.isMenuOpen ? "h-100 overflow-y-hidden" : "h-100"}>
                        <Suspense fallback={<LinearProgress />}>

                        <LoadingF3M hidden={!this.props.login.isLoading && /* !this.props.wounds.isLoading && */ !this.props.woundInfo.isLoading && !this.props.patient.isLoading} />
 
                        <div className="position-relative min-h-100">
                            <Suspense fallback={<LoadingF3M />}>
                                <Header scrollNavArea={this.state.isMenuOpen} toggleMenu={this.handleOpenMenu}>{this.props}</Header>
                            </Suspense>

                            <div hidden={!this.props.login.validToken} >
                                <Routes acess={this.props.login.userAcess} />
                            </div>

                            <div className={`footer px-4 position-fixed ${this.state.scrolled ? " " : "footer-box-shadow"} w-100 bottom-0 pt-2`} hidden={this.props.login.ClientName === ""}>

                                <Box
                                    color="#b3adad"
                                    fontSize={9}
                                    fontFamily={primaryFont} 
                                    fontWeight={700} 
                                    className="sm-footer d-inline font-weight-bold float-left">
                                    {t('Licensed')}: <label style={{ textTransform: "uppercase" }}>{this.props.login.ClientName}</label> | {t('taxpayer')}: {this.props.login.ClientNIF}
                                </Box>

                                <Box
                                    color="#b3adad"
                                    fontSize={9}
                                    fontFamily={primaryFont} 
                                    fontWeight={700} 
                                    className="sm-footer font-weight-bold d-inline float-right pb-md-0 pb-2">
                                    Copyright &#169; {year} <Link color="textSecondary" className="font-weight-bold" href={t('urlF3MSite')} target="_blank">F3M - Information Systems, S.A.</Link> | V {VERSION}
                                </Box>
                            </div>
                        </div>
                        </Suspense>
                    </div >
                </Router>
            </ErrorBoundary>
        
        );
    }
}

const mapStateToProps = state => ({ login: state.login, wounds: state.wounds, patient: state.patient, woundInfo: state.woundInfo });
const mapDispatchToProps = dispatch => bindActionCreators({ logout, getToken, getUser, getUsersInstitution, setLoading, getUserAndUsersInstitution, getInfoClient, getTokenRefresh }, dispatch)

export default withTranslation()(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home));
