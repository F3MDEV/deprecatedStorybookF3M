import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import moment from 'moment';

//OUTSIDE COMPONENTS
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { withStyles } from '@material-ui/core/styles';

//CSS, STYLES & MEDIA ASSETS
import logo_icon from '../../utils/icon_MPDS.svg';
import variables from "../../assets/bootstrap/scss/_variables.scss"
import "./navTabs.scss"

//ICONS
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CreateIcon from '@material-ui/icons/Create';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';

const secondaryFont = variables.secondaryFont
const styles = theme => ({
    bigIndicator: {
        height: 4,
    },
});
class NavTabs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            indexTabs: 0,
            //  sticky: "sticky d-flex border-nav ", 
            scrolled: false,
            rotateArrow: false,
            width: 0
        }

        //this.onChangeScroll = this.onChangeScroll.bind(this)
        this.resizeHeaderOnScroll = this.resizeHeaderOnScroll.bind(this)
    }

    componentDidMount() {
        //window.addEventListener('scroll', this.onChangeScroll);

        window.addEventListener("scroll", this.resizeHeaderOnScroll);
        this.updateWindowDimensions();
        if (this.props.woundInfo.WoundID > 0 && this.state.indexTabs === 0) {
            this.setState({ indexTabs: 1 })
            //this.props.getWoundById(this.props.woundInfo.woundID)
        }

    }

    componentDidUpdate() {
        if (this.state.indexTabs !== this.props.indexTabsParent) {
            this.setState({ indexTabs: this.props.indexTabsParent })
        }
        else if (this.props.woundInfo.WoundID > 0 && this.state.indexTabs === 0) {
            this.setState({ indexTabs: 1 })
            //this.props.getWoundById(this.props.woundInfo.woundID)
        }
    }

    componentWillUnmount() {
        // window.removeEventListener('scroll', this.onChangeScroll);
        window.removeEventListener("scroll", this.resizeHeaderOnScroll);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth })
    }

    resizeHeaderOnScroll() {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 80,
            headerE = document.getElementById("nav-container")

        if (distanceY > shrinkOn) {
            this.setState({ scrolled: true })

            if (this.state.width >= 768 && this.state.width <= 992 && window.scrollY <= 358) {   //parseInt(lgBreakpoint)
                headerE.classList.add("shadow-nav")
            } else if (this.state.width > 992 && window.pageYOffset <= 355 ) {
                headerE.classList.add("shadow-nav")
            } else if (this.state.width >= 576 && this.state.width < 768 && window.pageYOffset <= 371) {
                headerE.classList.add("shadow-nav")
            } else if (this.state.width < 576 && window.pageYOffset <= 342) {
                headerE.classList.add("shadow-nav")
            }
            else {
                headerE.classList.remove("shadow-nav")
            }

        } else {
            headerE.classList.remove("shadow-nav")
            this.setState({ scrolled: false })
        }
    }

    handleChangeTabs = (event, value) => {
        if (!this.props.editMode){
            if (value === 0) {
                this.props.woundInfo.WoundID = 0
            }
            this.setState({
                indexTabs: value
            })
            this.props.onChangeTabs(value)
        }
    }

    handleChangeMenu = (value) =>{
        if (!this.props.editMode){
            if (value === 0) {
                this.props.woundInfo.WoundID = 0
            }
            this.setState({
                indexTabs: value
            })
            this.props.onChangeTabs(value)
        }
    }

    onGoBack() {
        this.props.patient.PatientID = 0
        this.props.woundInfo.WoundID = 0
        this.props.callbackParent()
    }

    changeStateToUpdateOrRead(mode) {
        this.props.changeStateToUpdateOrRead(mode)
    }

    onSaveCharacterisation(){
        this.props.onSaveCharacterisation()
    }

    onCancel(){
        this.props.onCancel()
    }

    render() {
        const { t } = this.props;
        const { classes } = this.props;

        const CustomToggleInstitution = React.forwardRef(({ children, onClick }, ref) => (
            <a
                className="text-decoration-none font-weight-bold d-block"
                ref={ref}
                href="/"
                onClick={e => {
                    this.setState({
                        rotateArrow: !this.state.rotateArrow
                    });
                    e.preventDefault();
                    onClick(e);
                   
                }}>
                <Box fontFamily={secondaryFont} fontWeight={700} fontSize={14} className="inst-dropdown d-block">         
                    <span className="pt-3 dropdown-tab-item text-uppercase text-right pr-2">
                        {this.state.indexTabs === 0 ? t('PatientDetail') : (this.state.indexTabs === 1 ? t('Characterisation') : t('Report'))}
                    </span> 
                    <ExpandMoreIcon className={`mt-2 outline-none ${this.state.rotateArrow ? "rotate-opened" :  "rotate-closed"}`} fontSize='large' hidden={parseInt(this.props.woundInfo.WoundID) === 0}/>
                </Box>
            </a>
        ));

        let tabs = <>
            <Dropdown className="d-block d-lg-none dropdown-tabs">
                <Dropdown.Toggle as={CustomToggleInstitution}></Dropdown.Toggle>
                <Dropdown.Menu alignRight className="pt-3 pb-4 dropdown-list" hidden={parseInt(this.props.woundInfo.WoundID) === 0}>
                  <Dropdown.Item as="button" className="dropdown-list-item text-uppercase" active={this.state.indexTabs === 0} onClick={(v) => this.handleChangeMenu(0)} eventKey={0} >{t('PatientDetail')}</Dropdown.Item>
                  <Dropdown.Item as="button" className="dropdown-list-item text-uppercase" active={this.state.indexTabs === 1} onClick={(V) => this.handleChangeMenu(1)} eventKey={1} hidden={parseInt(this.props.woundInfo.WoundID) === 0}>{t('Characterisation')}</Dropdown.Item>
                  <Dropdown.Item as="button" className="dropdown-list-item text-uppercase" active={this.state.indexTabs === 2} onClick={(V) => this.handleChangeMenu(2)} eventKey={2} hidden={parseInt(this.props.woundInfo.WoundID) === 0}>{t('Report')}</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        
            <Tabs
                className="navbar-tab-height d-none d-lg-block"
                classes={{ indicator: classes.bigIndicator }}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, value) => this.handleChangeTabs(event, value)}
                value={this.state.indexTabs}>
                <Tab className={this.state.indexTabs === 0 ? "" : "opacity-50"} label={t('PatientDetail')} key={0} />
                <Tab className={this.state.indexTabs === 1 ? "" : "opacity-50"} hidden={parseInt(this.props.woundInfo.WoundID) === 0} label={t('Characterisation')} key={1} />
                <Tab className={this.state.indexTabs === 2 ? "" : "opacity-50"} hidden={parseInt(this.props.woundInfo.WoundID) === 0} label={t('Report')} key={2} />
            </Tabs>
        </>
            
        let showButtonAlt = false
        if (!this.props.editMode) {
            if (this.state.indexTabs === 1 && this.props.woundInfo.interventions !== undefined && this.props.woundInfo.interventions !== null) {
                if (this.props.woundInfo.interventions.length > 0 && this.props.woundInfo.indexInterventionSelected !== -1) {
                    if (this.props.woundInfo.interventions[this.props.woundInfo.indexInterventionSelected] !== undefined && this.props.woundInfo.interventions[this.props.woundInfo.indexInterventionSelected] !== null) {
                        if (this.props.woundInfo.interventions[this.props.woundInfo.indexInterventionSelected].createdBy != null && this.props.login.email != null) {
                            if (this.props.woundInfo.interventions[this.props.woundInfo.indexInterventionSelected].createdBy.toUpperCase() === this.props.login.email.toUpperCase() && !this.props.woundInfo.isClosed) {
                                // É o mesmo utilizador
                                // Falta validar o tempo de alteração da instituição
                                //editingTimePeriod
                                let listOfInstitutions = JSON.parse(this.props.login.listOfInstitutions) || []
                                for(let i = 0; i < listOfInstitutions.length; i++){
                                    if (this.props.login.institution === listOfInstitutions[i].rowKey){
                                        let time = listOfInstitutions[i].editingTimePeriod;
                                        let creatDate = this.props.woundInfo.interventions[this.props.woundInfo.indexInterventionSelected].createdAt

                                        if (parseInt(time) === 0){
                                            // não tem limite de tempo a aplicar
                                            showButtonAlt = true
                                        } else {
                                            var a = moment(creatDate).utc();
                                            var b = moment().utc();
                                            if (b.diff(a, 'minutes') <= parseInt(time)){
                                                showButtonAlt = true
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        let BackAndTabs =
        <>
            <div className={`border-nav sticky nav-container ${this.state.indexTabs !== 1 ? "" : "sticky-characterization"}`} id="nav-container">
                <div className='container d-flex'>
                    <ButtonBase
                        className="pr-3 pr-lg-0 mb-2 outline-none"
                        disableRipple
                        disableTouchRipple
                        focusRipple
                        variant="contained"
                        type="submit"
                        disabled={this.props.editMode}
                        onClick={v => this.onGoBack(v)}>
                        {
                            (this.state.scrolled ? (
                                <>
                                  <Image
                                    fluid
                                    src={logo_icon}
                                    height="30"
                                    width="30"
                                    className="mr-5 d-none d-md-inline"
                                    alt="logo" />
                                    <IconButton
                                        fontSize="large"
                                        className="mr-1 navbar-return outline-none"
                                        color="primary">
                                        <ArrowBackIcon fontSize={'large'} />
                                    </IconButton>
                                    
                                </>
                                    ) : (
                                    null
                                ))
                        } 
                        {
                            (this.state.scrolled ? (
                                null
                            ) : (
                                <>
                                    <IconButton
                                        fontSize="large"
                                        className="mr-1 navbar-return outline-none"
                                        color="primary">
                                        <ArrowBackIcon fontSize={'large'} />
                                    </IconButton>
                                    <Box
                                        fontFamily="Nunito"
                                        fontSize={20}
                                        fontWeight={700}
                                        color="text.secondary"
                                        className="text-uppercase pr-5 d-none d-md-block">
                                        {t('WoundsPage.patients')}
                                    </Box>
                                </>
                                ))
                        }
                    </ButtonBase>
                    {tabs}
                    <div className="edit-controls" hidden={this.state.indexTabs !== 1}>
                        <IconButton color="primary"
                            className="pt-2 outline-none"                            
                            onClick={() => this.changeStateToUpdateOrRead("ALT")}
                            disabled={!showButtonAlt}
                            centerRipple>
                            <CreateIcon fontSize="large"/>
                        </IconButton>
                        <IconButton color="primary"
                            className="pt-2 outline-none"
                            onClick={() => this.onSaveCharacterisation()}
                            disabled={!this.props.editMode}
                            id="sabeButtonCharacterisation"
                            >
                            <SaveIcon fontSize="large"/>
                        </IconButton>
                        <IconButton color="primary"
                            className="pt-2 outline-none"
                            onClick={() => this.onCancel()}
                            disabled={!this.props.editMode}>
                            <ClearIcon fontSize="large"/>
                        </IconButton>
                        </div>
                    </div>
                </div>
        </>
        return (
            <>
                {BackAndTabs}
            </>
        )
    }
}


const mapStateToProps = state => ({ login: state.login, wounds: state.wounds, patient: state.patient, woundInfo: state.woundInfo });
export default withTranslation()(connect(
    mapStateToProps,
    null
)(withStyles(styles)(NavTabs)))
