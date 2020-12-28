import React, { Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";
import Moment from 'react-moment';
import 'moment/locale/pt';
import 'moment/locale/en-gb';

//OUTSIDE COMPONENTS
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CameraOff from "../../../utils/camera-off.svg"


//INSIDE COMPONENTS
/* import WoundsRepoCharaHeader from "../WoundsReportCharaHeader"
import WoundsCharacterisation from "../WoundsCharacterisation"
import WoundsReport from "../WoundsReport" */
import HeaderInfoPatient from "../../../components/header_info_patient/header_info_patient"
import NavTabs from '../../../components/NavTabs/NavTabs'
import LocalizationCard from '../../localization/localization'
import BackToTop from "../../../components/BackToTop"
import LocalizationModal from '../../localization/localizationModal'
import LoadingModal from '../../../components/Loadings/LoadingModal'

//Actions
import { getTokenRefresh } from "../../../store/actions/login/loginActions";
import { getPatientInfoAndStrutureCards } from "../../../store/actions/patient/patientActions";
import { getWoundById, openWound, closeWound, changeIndexInterventions, updateIntervention } from "../../../store/actions/Module_wounds/woundInfoActions"

// CONSTANTS
import { patientIDSel, showClosedWounds, showOpenWounds, woundIDSel, woundsTab } from "../../../utils/constants"

//ICONS
import ChatIcon from '@material-ui/icons/Chat';
import PollIcon from '@material-ui/icons/Poll';
import PatientIcon from '../../../utils/account-circle.svg';
import ListIcon from '@material-ui/icons/List';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import PhotoIcon from '@material-ui/icons/Photo';

//UTILS
import { calculateAge, isDefined } from "../../../utils/utils"
import emptyStateMajor from '../../../utils/empty_state_geral.svg';
import "./PatientPage.scss"
import "../../../components/woundsCard/woundsCard.scss"
import variables from "../../../assets/bootstrap/scss/_variables.scss";
import Backdrop from '@material-ui/core/Backdrop';
import { createMuiTheme } from '@material-ui/core/styles';

const WoundsRepoCharaHeader = React.lazy(() => import('../WoundsReportCharaHeader'));
const WoundsCharacterisation = React.lazy(() => import('../WoundsCharacterisation'));
const WoundsReport = React.lazy(() => import('../WoundsReport'));
//Scss variable
const { primaryFont, lgNoPx, xlNoPx, xxlNoPx } = variables;

const theme = createMuiTheme();

const styles = theme => ({
    title: {
        flexGrow: 1,
    },

    mpdsModalBackground: {
        [theme.breakpoints.between(0, 767)]: {
            marginRight: 30,
            marginLeft: 30,
            marginTop: 30,
            marginBottom: 30
        },
        [theme.breakpoints.between(768, 992)]: {
            marginRight: 40,
            marginLeft: 40,
            marginTop: 80,
            marginBottom: 80
        },
    },


    mpdsDetailPaper: {
        [theme.breakpoints.up(992)]: {
            minWidth: 799,
            maxWidth: 800,
            maxHeight: 550,
            minHeight: 549,
        },
        minWidth: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        minHeight: "100%",
        backgroundColor: "#fff",
        margin: 80,
    },

    mpdsDetailPaperContent: {
        [theme.breakpoints.between(0, 768)]: {
            paddingLeft: 24,
            paddingRight: 24
        },
        paddingLeft: 54,
        paddingRight: 54
    },

    mpdsLocalPaper: {
        [theme.breakpoints.up('sm')]: {
            minWidth: 549,
            maxWidth: 550,
            maxHeight: 600,
            minHeight: 499,
        },
        [theme.breakpoints.up('md')]: {
            minWidth: 799,
            maxWidth: 800,
            maxHeight: 520,
            minHeight: 519,
        },
        minWidth: 299,
        maxWidth: 300,
        minHeight: 539,
        maxHeight: 540,
        backgroundColor: "#fff",
        margin: 20,
    },
});

let language = localStorage.getItem("i18nextLng") || "PT";
if (language.length > 2) {
    language = language.substr(0, 2).toUpperCase();
    language = "PT"
}

class PatientPage extends React.Component {
    constructor(props) {
        super(props)
        this.slider = []
        this.state = {
            showCards: true, showAllInfo: false, showCardInfo: false, idCard: -1, indexTabs: 0, indexTabsPrev: -1, indexIntervention: -1,
            openDialogMsg: false, closeDialogMsg: false, idWoundOpenOrClose: -1, openDialogConfirm: false,
            openDialogWoundPhotos: false, indexWoundDialogPhotos: -1, indexInterventionsWoundDialogPhotos: -1, listPhotos: [], listPhotosSelected: -1,
            openDialogWoundPhotosFullScreen: false, indexWoundFullScreen: -1, indexInterventionFullScreen: -1,
            showWoundsClose: this.props.patient.IncludeWoundsClosed,
            showWoundsOpen: this.props.patient.IncludeWoundsOpen,
            showLocationInfo: false, showLocationWoundIndex: -1,
            caracterizationCanEditMode: false,
            saveInProgress: false,
            width: 0,
            openDialogConfirmCancel: false, showSucessMessage: false, showErrorMessage: false, errorMessage: "",
            isLoading: true
        }

        this.onChangeIntervention = this.onChangeIntervention.bind(this)
        this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
    }

    componentDidMount() {
        const { PatientInfo, PatientID, getPatienInfoInProgress, IncludeWoundsClosed, IncludeWoundsOpen, TokenRefresh } = this.props.patient
        const { WoundID, woundDate, changeState } = this.props.woundInfo

        if (!TokenRefresh) {
            if (PatientInfo == null) {
                let varSessionPatientID = sessionStorage.getItem(patientIDSel) || 0
                if (varSessionPatientID !== PatientID && varSessionPatientID > 0 && !getPatienInfoInProgress) {
                    this.props.patient.isLoading = true
                    this.props.patient.getPatienInfoInProgress = true
                    this.props.getPatientInfoAndStrutureCards(varSessionPatientID, IncludeWoundsClosed, IncludeWoundsOpen)
                }
            } else {
                if (WoundID > 0) {
                    if (this.state.indexTabs === 0) {
                        let tab = sessionStorage.getItem(woundsTab)
                        if (isDefined(tab) && tab === "2") {
                            this.setState({ indexTabs: 2 })
                        } else {
                            this.setState({ indexTabs: 1 })
                        }
                    } else if (woundDate == null) {
                        this.props.woundInfo.isLoading = true
                        this.props.getWoundById(WoundID)
                    } else {
                        if (changeState) {
                            this.props.woundInfo.isLoading = true
                            this.props.woundInfo.changeState = false
                            this.props.getWoundById(WoundID)
                        }
                    }
                }
            }
        }
        window.addEventListener("resize", this.handleResize);
        this.updateWindowDimensions();
    }

    componentWillUnmount() {
        window.addEventListener("scroll", this.resizeHeaderOnScroll);
        window.removeEventListener("resize", this.handleResize);
    }

    componentDidUpdate() {
        const { PatientInfo, PatientID, getPatienInfoInProgress, IncludeWoundsClosed, IncludeWoundsOpen, RefreshInfo } = this.props.patient
        const { WoundID, woundDate, changeState, TokenRefresh, interventionSave } = this.props.woundInfo

        if (!this.props.patient.TokenRefresh) {
            if (PatientInfo == null || RefreshInfo) {
                let varSessionPatientID = sessionStorage.getItem(patientIDSel) || 0
                if (parseInt(varSessionPatientID) !== parseInt(PatientID) && parseInt(varSessionPatientID) > 0 && !getPatienInfoInProgress) {
                    this.props.patient.isLoading = true
                    this.props.patient.getPatienInfoInProgress = true
                    this.props.getPatientInfoAndStrutureCards(varSessionPatientID, IncludeWoundsClosed, IncludeWoundsOpen)
                } else if ((RefreshInfo || PatientInfo == null) && !getPatienInfoInProgress) {
                    this.props.patient.isLoading = true
                    this.props.patient.getPatienInfoInProgress = true
                    this.props.patient.RefreshInfo = false
                    this.props.getPatientInfoAndStrutureCards(PatientID, IncludeWoundsClosed, IncludeWoundsOpen)
                }
            } /* else if (TokenRefresh) {
                this.props.woundInfo.TokenRefresh = false
                this.props.getTokenRefresh()
            }  */ else if (changeState === true && PatientID > 0 && WoundID == 0 && !getPatienInfoInProgress) {
                this.props.patient.isLoading = true
                this.props.woundInfo.changeState = false
                this.props.patient.getPatienInfoInProgress = true
                this.props.getPatientInfoAndStrutureCards(PatientID, IncludeWoundsClosed, IncludeWoundsOpen)
            } else if (!getPatienInfoInProgress && this.state.isLoading) {
                this.setState({ isLoading: false })
            } else if (WoundID > 0) {
                if (this.state.indexTabs === 0) {
                    let tab = sessionStorage.getItem(woundsTab)
                    if (isDefined(tab) && tab === "2") {
                        this.setState({ indexTabs: 2 })
                    } else {
                        this.setState({ indexTabs: 1 })
                    }
                    this.props.woundInfo.isLoading = true
                    this.props.getWoundById(WoundID)
                } else if (woundDate == null) {
                    this.props.woundInfo.isLoading = true
                    this.props.getWoundById(WoundID)
                } else if (changeState) {
                    this.props.woundInfo.isLoading = true
                    this.props.woundInfo.changeState = false
                    this.props.getWoundById(WoundID)
                } else if (interventionSave) {
                    this.props.woundInfo.isLoading = true
                    this.props.getWoundById(WoundID)
                }
            }

            if (this.state.indexTabs != this.state.indexTabsPrev) {
                let divName
                if (this.state.indexTabs === 0) {
                    divName = "back-to-top-anchor-patient"
                } else if (this.state.indexTabs === 2) {
                    divName = "back-to-top-anchor-report"
                } else {
                    divName = "back-to-top-anchor"
                }
                let elmnt = document.getElementById(divName);
                if (elmnt != null) {
                    elmnt.scrollIntoView(true); // Top
                }
                this.setState({ isLoading: false, indexTabsPrev: this.state.indexTabs })
            }


        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.woundInfo.interventionSave && nextProps.woundInfo.interventionSave !== prevState.interventionSave) {
            return {
                interventionSave: nextProps.woundInfo.interventionSave,
                saveInProgress: false,
                showSucessMessage: true,
                showErrorMessage: false,
                caracterizationCanEditMode: false
            }
        }
        else if (!nextProps.woundInfo.interventionSave && nextProps.woundInfo.msgErrorUpdate !== "" && nextProps.woundInfo.msgErrorUpdate !== prevState.errorMessage) {
            return {
                interventionSave: nextProps.woundInfo.interventionSave,
                saveInProgress: false,
                showSucessMessage: false,
                showErrorMessage: true,
                errorMessage: nextProps.woundInfo.msgErrorUpdate
            }
        }
        else return null;
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth })
    }

    handleResize = () => this.setState({ width: window.innerWidth })

    handleChangeTabs = (value) => {
        if (value === 0) {
            this.props.woundInfo.WoundID = 0
            sessionStorage.setItem(woundIDSel, 0)
            this.props.patient.RefreshInfo = true
            sessionStorage.removeItem(woundsTab)
        } else if (value === 2) {
            sessionStorage.setItem(woundsTab, "2")
        } else {
            sessionStorage.removeItem(woundsTab)
        }

        let previous = this.state.indexTabs
        this.setState({
            indexTabsPrev: previous,
            indexTabs: value
        })

    }

    onGoBack() {
        this.props.patient.PatientID = 0
        this.props.woundInfo.WoundID = 0

        this.props.patient.PatientInfo = null
        this.props.patient.Cards = null
        this.props.patient.Wounds = null
        this.props.patient.Internments = null

        this.props.patient.WoundsInterventionsSelect = null
        sessionStorage.setItem(woundIDSel, 0)
        sessionStorage.removeItem(woundsTab)
        this.props.callbackParent()
    }

    changeViewMode(v, i) {
        switch (i) {
            case -1:
                this.setState({
                    showCards: false,
                    showAllInfo: true,
                    showCardInfo: false
                });
                break
            default:
                this.setState({
                    showCards: false,
                    showAllInfo: false,
                    showCardInfo: true,
                    idCard: i
                });
                break
        }
    }

    changeToCardsView() {
        this.setState({
            showCards: true,
            showAllInfo: false,
            showCardInfo: false,
            showLocationInfo: false,
        });
    }

    changeToLocationView(v, index) {
        this.setState({
            showLocationInfo: true,
            showCards: false,
            showLocationWoundIndex: index
        })
    }

    onClickCharacterisationOrReport(type, woundID) {
        if (woundID > 0) {
            this.props.woundInfo.isLoading = true
            this.props.woundInfo.WoundID = woundID
            sessionStorage.setItem(woundIDSel, woundID)
            if (type === 2) {
                sessionStorage.setItem(woundsTab, "2")
            }
            // Seleccionar a tab Caracterização ou Relatório
            this.setState({
                indexTabs: type,
                indexIntervention: -1
            })
            this.props.getWoundById(woundID)
        }
    }

    onClickOpenOrCloseWound(action, woundID) {
        this.props.woundInfo.isLoading = true
        if (action === 'Open') {
            this.props.openWound(woundID)
        } else {
            this.props.closeWound(woundID)
        }
        this.setState({
            openDialogMsg: false,
            closeDialogMsg: false,
            idWoundOpenOrClose: -1
        })
    }

    handleOpenDialog(value, id) {
        if (value !== this.state.openDialogMsg) {
            this.setState({ openDialogMsg: value, idWoundOpenOrClose: id })
        }
    }

    handleCloseDialog(value, id) {
        if (value !== this.state.closeDialogMsg) {
            this.setState({ closeDialogMsg: value, idWoundOpenOrClose: id })
        }
    }

    onChangeIntervention(index) {
        this.props.changeIndexInterventions(index)
        this.setState({ indexIntervention: index })
    }

    onClickCloseConfirmationMsg() {
        this.props.woundInfo.msgWoundOpen = false
        this.props.woundInfo.msgWoundClosed = false

        this.setState({
            openDialogConfirm: !this.state.openDialogConfirm //false
        })
    }

    handleShowDialogPhotos(indexInterventionWound, indexWound, showDialog) {
        let atualSlider = -1
        if (isDefined(this.state.listWoundsInterventionsSel) && isDefined(this.state.listWoundsInterventionsSel[indexWound])) {
            atualSlider = this.state.listWoundsInterventionsSel[indexWound]
        } else {
            atualSlider = this.props.patient.Wounds[indexWound].intervention.length - 1
        }

        if (atualSlider > indexInterventionWound) {
            this.slider[indexWound].slickPrev()
        } else if (atualSlider < indexInterventionWound) {
            this.slider[indexWound].slickNext()
        } else {
            if (showDialog !== this.state.openDialogWoundPhotos) {

                let listAux = []
                let selectedAux = 0

                if (indexInterventionWound !== -1 && indexWound !== -1) {
                    const listWounds = this.props.patient.Wounds || []
                    let maxi = listWounds[indexWound].intervention.length - 1

                    for (let i = maxi; i >= 0; i--) {
                        let intervention = [{ createdAt: listWounds[indexWound].intervention[i].createdAt, createdBy: listWounds[indexWound].intervention[i].createdBy, woundPhoto: listWounds[indexWound].intervention[i].woundPhoto }]
                        listAux = listAux.concat(intervention)
                        if (i === indexInterventionWound) {
                            selectedAux = listAux.length - 1
                        }

                    }
                }

                this.setState({
                    openDialogWoundPhotos: showDialog,
                    indexInterventionsWoundDialogPhotos: indexInterventionWound,
                    indexWoundDialogPhotos: indexWound,

                    listPhotos: listAux,
                    listPhotosSelected: selectedAux
                })
            }
        }

    }

    handleCloseDialogPhotos() {
        this.setState({
            openDialogWoundPhotos: false,
        })
    }

    handleShowDialogPhotosFullScreen(v, indexWound, indexInterv, show) {
        this.setState({
            openDialogWoundPhotosFullScreen: show,
            indexWoundFullScreen: indexWound,
            indexInterventionFullScreen: indexInterv
        })
    }

    handleCloseDialogPhotosFullScreen() {
        this.setState({
            openDialogWoundPhotosFullScreen: false,
        })
    }

    handleChangeIntervention(value, index) {
        let listAux = this.props.patient.WoundsInterventionsSelect
        if (listAux) {
            listAux[index] = value

            this.props.patient.WoundsInterventionsSelect = listAux

            this.setState({
                indexWoundIntervention: value,
                listWoundsInterventionsSel: listAux
            })
        }
    }

    handleChangeShowWoundsClosed(state) {
        //state: 
        //0 -> Por cicatrizar
        //1 -> Cicatrizadas
        //2 -> Todas
        let showOpen = false, showClose = false

        if (state === 1) {
            showClose = true
            showOpen = false

        } else if (state === 2) {
            showClose = true
            showOpen = true
        }
        else {
            showClose = false
            showOpen = true
        }

        this.props.patient.IncludeWoundsClosed = showClose
        sessionStorage.setItem(showClosedWounds, this.props.patient.IncludeWoundsClosed)
        this.props.patient.IncludeWoundsOpen = showOpen
        sessionStorage.setItem(showOpenWounds, this.props.patient.IncludeWoundsOpen)

        this.props.patient.isLoading = true
        this.props.patient.getPatienInfoInProgress = true
        this.props.getPatientInfoAndStrutureCards(this.props.patient.PatientID, this.props.patient.IncludeWoundsClosed, this.props.patient.IncludeWoundsOpen)

        this.setState({
            isLoading: true,
            showWoundsClose: showClose,
            showWoundsOpen: showOpen
        })

    }

    createTable = (data) => {
        let table = []
        const { t } = this.props;
        if (data !== undefined) {


            // Outer loop to create parent
            for (let i = 0; i < 4; i++) {
                let children = []

                //Inner loop to create children
                for (let j = 0; j < data.length; j++) {
                    if (i === 0) {
                        if (data[1][1] !== undefined) {
                            children.push(<th>{data[j][i]}</th>)
                        } else {

                            table.push(<div className="text-center">
                                <Image className="empty-state-card pt-4" fluid src={emptyStateMajor} alt="empty state" />
                                <Box className="pt-2" fontFamily={primaryFont} fontWeight={700} fontSize={15}>{t('EmptyStates.SeeIt')}</Box>
                            </div>)
                            break;
                        }

                    } else {
                        if (data[j][i] !== "" && data[j][i] !== undefined) {
                            children.push(<td><div className="space-control">{data[j][i]}</div></td>)
                        }
                        else if (j > 0 && data[0][i] !== undefined) {
                            children.push(<td><div className="space-control">{data[j][i]}</div></td>)
                        }
                    }
                }

                //Create the parent and add the children
                table.push(<tr>{children}</tr>)
            }
        }

        return table

    }

    createTableAll = (data) => {
        let table = []

        if (data !== undefined) {

            // Outer loop to create parent
            for (let i = 0; i < data[0].length; i++) {
                let children = []
                //Inner loop to create children
                for (let j = 0; j < data.length; j++) {
                    if (i === 0) {
                        if (data[1][1] !== undefined) {
                            children.push(<th className="font-size-table-all py-2">{data[j][i]}</th>)
                        }
                    } else {
                        if (data[j][i] !== "" && data[j][i] !== undefined) {
                            children.push(<td className="font-size-table-all py-2">{data[j][i]}</td>)
                        }
                        else if (j > 0 && data[0][i] !== undefined) {
                            children.push(<td className="font-size-table-all py-2">{data[j][i]}</td>)
                        }
                    }
                }
                //Create the parent and add the children
                table.push(<tr>{children}</tr>)
            }
        }


        return table

    }

    changeStateToUpdateOrRead(mode) {
        if (mode === "READ") {
            this.props.woundInfo.changeState = true
        }
        this.setState({
            caracterizationCanEditMode: (mode === "READ" ? false : true),
            saveInProgress: false,
            openDialogConfirmCancel: false
        })
    }

    onSaveCharacterisation() {
        this.setState({
            saveInProgress: true,
            interventionSave: false
        })
    }

    saveCharacterisation(values) {
        this.props.woundInfo.isLoading = true
        this.props.updateIntervention(values)
    }

    onCancel() {
        this.setState({
            openDialogConfirmCancel: true
        })
    }

    closeDialogCancel() {
        this.setState({
            openDialogConfirmCancel: false
        })
    }

    handleCloseSnackBar() {
        this.setState({
            showSucessMessage: false,
            showErrorMessage: false
        })
    }

    cancelSave() {
        this.setState({
            saveInProgress: false
        })
    }

    render() {
        const { t } = this.props;
        const { classes } = this.props;
        const listWounds = this.props.patient.Wounds || []
        const listInternments = this.props.patient.Internments || []

        // construção dos cartões dinâmicos
        const cards = this.props.patient.Cards || []

        const layoutCards = cards.map((option, index) => (
            <Col xs={10} sm={5} md={4} lg={3} xl={3} className="card-row mr-4 mr-lg-0 pr-1">
                <Paper className="card-user card-topic">
                    <Box fontSize={18} fontFamily="Roboto" fontWeight={700} display='inline'>
                        {option.title}
                    </Box>

                    {option.contentCard.map(optionCard => (
                        <>
                            {/* Cartão com texto*/}
                            <div className="position-relative" hidden={optionCard.texto === undefined}>

                                <div className={`content-text-card pt-1 ${!optionCard.texto ? "content-text-card-empty" : ""}`}>
                                    {!optionCard.texto ?
                                        <div className="text-center">
                                            <Image className="empty-state-card pt-4" fluid src={emptyStateMajor} alt="empty state" />
                                            <Box className="pt-1" fontFamily={primaryFont} fontWeight={700} fontSize={15}>{t('EmptyStates.SeeIt')}</Box>
                                        </div>

                                        : optionCard.texto}
                                    {option.title == "História Clínica Relevante" || option.title == "Clinical History" ? <Box className="text-center" fontFamily={primaryFont} fontWeight={500} fontSize={12}>{t('EmptyStates.ClinicalState')}</Box> : ""}
                                </div>

                                {optionCard.texto ? <div class="more-information-adviser "></div> : null}
                            </div>
                            {optionCard.texto ?
                                <ButtonBase
                                    disableRipple
                                    disableTouchRipple
                                    focusRipple
                                    variant="contained"
                                    type="submit"
                                    className="position-absolute bottom-0 mb-3 outline-none"
                                    onClick={v => this.changeViewMode(v, index)}>
                                    <Box
                                        color="text.secondary"
                                        fontSize={14}
                                        className="roboto-bold text-uppercase">
                                        {t('SeeAll')}
                                    </Box>
                                </ButtonBase> : ""}
                            {/* Cartão com informação em tabela*/}
                            <div hidden={optionCard.columns === undefined}>
                                {(() => {
                                    switch (optionCard.columns) {
                                        case undefined: return ""
                                        default: return <table className="card-table roboto-regular">
                                            {this.createTable(optionCard.columns)}
                                            {option.contentCard.map((item) => {
                                                for (let i = 0; i < 4; i++) {
                                                    for (let j = 0; j < 3; j++) {
                                                        if (i === 0) {
                                                            if (optionCard.columns[1][1] !== undefined) {
                                                                return <ButtonBase
                                                                    disableRipple
                                                                    disableTouchRipple
                                                                    focusRipple
                                                                    variant="contained"
                                                                    type="submit"
                                                                    className="position-absolute bottom-0 mb-3 outline-none"
                                                                    onClick={v => this.changeViewMode(v, index)}>
                                                                    <Box
                                                                        color="text.secondary"
                                                                        fontSize={14}
                                                                        className="roboto-bold text-uppercase">
                                                                        {t('SeeAll')}
                                                                    </Box>
                                                                </ButtonBase>
                                                            } else {
                                                                return <div>
                                                                    {option.title == "Diagnósticos" || option.title == "Diagnosis" ? <Box fontFamily={primaryFont} fontWeight={500} className={`text-center ${language == "PT" && this.state.width >= 576 && this.state.width <= 666 ? "font-size-10-px pt-1" : "font-size-12-px"}`}>{t('EmptyStates.DiagnosisState')}</Box> : ""}
                                                                    {option.title == "Medicação" || option.title == "Medication" ? <Box fontFamily={primaryFont} fontWeight={500} className={`text-center ${language == "PT" && this.state.width < 330 || language == "PT" && this.state.width >= 576 && this.state.width <= 666 || language == "PT" && this.state.width >= 768 && this.state.width <= 1199 ? "font-size-10-px pt-1" : "font-size-12-px"}`}>{t('EmptyStates.MedicationState')}</Box> : ""}
                                                                </div>
                                                            }
                                                        }
                                                    }
                                                }
                                            })}
                                        </table>;
                                    }
                                })()}
                            </div>
                        </>
                    ))}
                </Paper>
            </Col>
        ))

        const layoutAllInfo = cards.map(option => (
            <div className="px-lg-5">

                <Typography variant="h5" fontSize={20} display='inline' className="pt-1">
                    {option.title}
                </Typography>


                {option.contentCard.map(optionCard => (
                    <>
                        {/* Cartão com texto*/}
                        <Typography variant="body2" className="pt-3 pb-5" hidden={optionCard.texto === undefined}>
                            {!optionCard.texto ? t('Patient.NoHistory') : optionCard.texto}
                        </Typography>

                        <div className="pt-1 pb-5" hidden={optionCard.columns === undefined}>
                            {(() => {
                                switch (optionCard.columns) {
                                    case undefined: return ''; //para não dar erro quando é undefined
                                    default: return <table className="card-table roboto-regular">
                                        {this.createTableAll(optionCard.columns)}
                                    </table>;

                                }
                            })()}
                        </div>
                    </>
                ))}
            </div>
        ))

        const layoutCardAllInfo = cards.map((option, index) => (
            <div hidden={index !== this.state.idCard} className="px-lg-5">

                <Typography variant="h5" fontSize={20} display='inline' className="pt-1">
                    {cards[this.state.idCard] !== undefined ? cards[this.state.idCard].title : ""}
                </Typography>

                {option.contentCard.map(optionCard => (
                    <>
                        {/* Cartão com texto*/}
                        <div className="pt-3 pb-5" hidden={optionCard.texto === undefined}>
                            <Typography variant="body2">{!optionCard.texto ? t('Patient.NoHistory') : optionCard.texto}</Typography>                        </div>
                        {/* Cartão com informação em tabela*/}
                        <div className="pt-1 pb-5" hidden={optionCard.columns === undefined}>
                            {(() => {
                                switch (optionCard.columns) {
                                    case undefined: return ''; //para não dar erro quando é undefined
                                    default: return <table className="card-table roboto-regular">
                                        {this.createTableAll(optionCard.columns)}
                                    </table>;
                                }
                            })()}
                        </div>
                    </>
                ))}
            </div>
        ))

        const settings = {
            speed: 300,
            dots: true,
            centerMode: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 2,
            centerPadding: "55px",
            infinite: false,
            /*             afterChange: (v, index) =>
                            this.handleChangeIntervention(v, index)
                        , */
            responsive: [
                {
                    breakpoint: 1439,
                    settings: {
                        centerPadding: "30px",
                    }
                },
                {
                    breakpoint: 1199,
                    settings: {
                        centerPadding: "45px",
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        centerPadding: "45px",
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        centerPadding: "70px",
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        centerPadding: "45px",
                    }
                },
                {
                    breakpoint: 666,
                    settings: {
                        centerPadding: "16px",
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        centerPadding: "116px",
                    }
                },
                {
                    breakpoint: 550,
                    settings: {
                        centerPadding: "106px",
                    }
                },
                {
                    breakpoint: 520,
                    settings: {
                        centerPadding: "96px",
                    }
                },
                {
                    breakpoint: 490,
                    settings: {
                        centerPadding: "86px",
                    }
                },
                {
                    breakpoint: 460,
                    settings: {
                        centerPadding: "86px",
                    }
                },
                {
                    breakpoint: 430,
                    settings: {
                        centerPadding: "77px",
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        centerPadding: "67px",
                    }
                },
                {
                    breakpoint: 370,
                    settings: {
                        centerPadding: "57px",
                    }
                },
                {
                    breakpoint: 340,
                    settings: {
                        centerPadding: "47px",
                    }
                }
            ]

        };

        let woundsCards =
            listWounds.map((wound, index) => (
                <Col xs={12} sm={6} md={6} lg={4} xl={3} className="my-4">
                    <Paper className={wound.isClosed ? "wounds-card position-relative wounds-card-closed" : "wounds-card position-relative"}>
                        <div className="title-photo-height p-4 pb-1 d-flex justify-content-between">
                            <Box fontSize={16} fontWeight={700} className="text-uppercase my-auto pr-3 white-space-break-spaces" display='inline' color="white">
                                {wound.intervention[wound.intervention.length - 1] !== undefined ? wound.intervention[wound.intervention.length - 1].typology.type : ""} {/* (SJR) - Type Wounds Table */}
                             </Box>

                            <ButtonBase align="right" fontSize="large" className={`my-auto state-button-card-wound outline-none ${wound.isClosed ? "wounds-card-closed" : ""} `} variant="contained" type="submit"
                                onClick={v => { wound.isClosed ? this.handleOpenDialog(true, wound.intervention[0].woundId) : this.handleCloseDialog(true, wound.intervention[0].woundId) }}>
                                <Box
                                    color="white"
                                    fontSize={12}
                                    className="roboto-bold text-uppercase py-1 px-3">
                                    {wound.isClosed ? t('OpenWound') : t('CloseWound')}
                                </Box>
                            </ButtonBase>

                            <Dialog
                                open={this.state.openDialogMsg}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description">
                                {/* <DialogTitle id="alert-dialog-title">{t('OpenWound')}</DialogTitle> */}
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description" style={{ color: "black", fontFamily: "Roboto" }}>
                                        {t('confirmOpenWound')}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions style={{ color: "black", fontFamily: "Roboto" }}>
                                    <Button className="outline-none" onClick={v => this.handleOpenDialog(false, 0)} color="primary" autoFocus>
                                        {t('No')}
                                    </Button>
                                    <Button className="outline-none" onClick={v => this.onClickOpenOrCloseWound("Open", this.state.idWoundOpenOrClose)} color="primary">
                                        {t('Yes')}
                                    </Button>

                                </DialogActions>
                            </Dialog>
                            <Dialog
                                open={this.state.closeDialogMsg}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                {/* <DialogTitle id="alert-dialog-title">{t('CloseWound')}</DialogTitle> */}
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description" style={{ color: "black", fontFamily: "Roboto" }}>
                                        {t('confirmCloseWound')}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions style={{ color: "black", fontFamily: "Roboto" }}>
                                    <Button className="outline-none" onClick={v => this.handleCloseDialog(false, 0)} color="primary" autoFocus>
                                        {t('No')}
                                    </Button>
                                    <Button className="outline-none" onClick={v => this.onClickOpenOrCloseWound("Close", this.state.idWoundOpenOrClose)} color="primary">
                                        {t('Yes')}
                                    </Button>

                                </DialogActions>
                            </Dialog>

                        </div>

                        {wound.intervention.length > 0 ?
                            <Slider {...settings}
                                afterChange={(v) => this.handleChangeIntervention(v, index)}
                                ref={c => (this.slider[index] = c)}
                                initialSlide={this.props.patient.WoundsInterventionsSelect != null && this.props.patient.WoundsInterventionsSelect.length === listWounds.length ? this.props.patient.WoundsInterventionsSelect[index] : wound.intervention.length - 1}
                            >
                                {wound.intervention.map((option, indexPhoto) => (
                                    <div key={"photo-patient-" + indexPhoto}>
                                        <Box fontSize={12} fontWeight={700} className="w-100 text-uppercase my-auto" display='inline' color="white">
                                            <Moment className="text-center" format="DD.MM.YYYY">{option.createdAt}</Moment>
                                        </Box>

                                        <div className="image-container-wounds-card">
                                            <div className="position-relative w-100" >

                                                <div className={`${option.woundPhoto.length > 0 ? "transparent-gradient-container" : ""} mx-auto`}></div>
                                                
                                                <Box color="white" fontSize={12} fontFamily="Roboto" variant="body2" className="position-absolute container-wound-card-detail" hidden={option.woundPhoto.length === 0} >
                                                    <PhotoCameraIcon className="icon-color-wounds-card p-1"></PhotoCameraIcon>
                                                    {option.woundPhoto.length}
                                                </Box>

                                                {
                                                    option.woundPhoto.length > 0 ? 
                                                    <>
                                                        <img className="mx-auto cursor-pointer"
                                                            onClick={v => this.handleShowDialogPhotos(indexPhoto, index, true)}
                                                            src={option.woundPhoto[0].photoUri} alt="" />
                                                    </>
                                                    :
                                                    <>
                                                        <div className={isDefined(this.state.listWoundsInterventionsSel)  && isDefined(this.state.listWoundsInterventionsSel[index]) ?
                                                                (this.state.listWoundsInterventionsSel[index] !== indexPhoto ? "state-no-photo text-center mx-auto cursor-pointer" : "state-no-photo text-center mx-auto")
                                                                : ((this.props.patient.Wounds[index].intervention.length - 1) !== indexPhoto ?
                                                                    "state-no-photo text-center mx-auto cursor-pointer" : "state-no-photo text-center mx-auto")}
                                                                onClick={v => this.handleShowDialogPhotos(indexPhoto, index, false)}>
                                                           <div className="icon-image">
                                                                <Image className="icon-image transparent-container" src={CameraOff} className="d-block"></Image>
                                                           </div>
                                                       </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </Slider>
                            : <></>}

                        {/* LOCALIZACAO */}
                        <div className={`footer-wounds-card d-flex w-100 position-absolute bottom-0 ${wound.isClosed ? "wounds-card-closed" : ""} `}>
                            <div className="w-25 my-auto">
                                <ButtonBase
                                    disableRipple
                                    disableTouchRipple
                                    focusRipple
                                    variant="contained"
                                    type="submit"
                                    className="d-block mx-auto outline-none"
                                    onClick={v => this.changeToLocationView(v, index)}
                                >

                                    <AccessibilityIcon
                                        className="icon-color-wounds-card d-block mx-auto mt-2 mb-1"
                                    ></AccessibilityIcon>

                                    <Box
                                        color="white"
                                        fontSize={11}
                                        className="font-weight-bold">
                                        {t('Location')}
                                    </Box>
                                </ButtonBase>
                            </div>
                            <div className="w-25 my-auto">
                                <ButtonBase
                                    disableRipple
                                    disableTouchRipple
                                    focusRipple
                                    variant="contained"
                                    type="submit"
                                    className="d-block mx-auto outline-none"
                                    onClick={v => this.onClickCharacterisationOrReport(1, wound.intervention[0].woundId)}
                                >
                                    <ListIcon
                                        className="icon-color-wounds-card d-block mx-auto mt-2 mb-1"
                                    ></ListIcon>

                                    <Box
                                        color="white"
                                        fontSize={11}
                                        //aqui
                                        className={`font-weight-bold ${this.state.width < xxlNoPx && this.state.width > xlNoPx - 1 || this.state.width > lgNoPx - 1 && this.state.width < 1100 || this.state.width > 575 && this.state.width < 720 || this.state.width < 370 ? "ellipse-button-card" : " "}`}>
                                        {t('Characterisation')}

                                    </Box>
                                </ButtonBase>
                            </div>
                            <div className="w-25 my-auto">
                                <ButtonBase
                                    disableRipple
                                    disableTouchRipple
                                    focusRipple
                                    variant="contained"
                                    type="submit"
                                    className="d-block mx-auto outline-none"
                                    onClick={v => this.onClickCharacterisationOrReport(2, wound.intervention[0].woundId)}>
                                    <PollIcon
                                        className="icon-color-wounds-card d-block mx-auto mt-2 mb-1"
                                    ></PollIcon>
                                    <Box
                                        color="white"
                                        fontSize={11}
                                        className="font-weight-bold">
                                        {t('Report')}
                                    </Box>
                                </ButtonBase>
                            </div>
                            <div className="w-25 my-auto opacity-50 ">
                                <ButtonBase
                                    disableRipple
                                    disableTouchRipple
                                    focusRipple
                                    variant="contained"
                                    className="d-block mx-auto outline-none pointer-none"
                                    disabled={true}
                                >
                                    <ChatIcon
                                        className="icon-color-wounds-card d-block mx-auto mt-2 mb-1 pointer-none"
                                    ></ChatIcon>
                                    <Box
                                        color="white"
                                        fontSize={11}
                                        className="font-weight-bold pointer-none">
                                        {t('2ndOpinion')}
                                    </Box>
                                </ButtonBase>
                            </div>
                        </div>
                    </Paper >
                </Col >
            ));

        let infoPage;


        if (this.props.patient.PatientInfo != null && this.state.indexTabs === 0) {
            //if (this.state.showCards) {
            // {/* VISTA DE CARTOES*/}
            infoPage = <div >
                {/* {BackAndTabs} */}
                <div id="back-to-top-anchor-patient"></div>
                <NavTabs callbackParent={() => this.onGoBack()} onChangeTabs={(value) => this.handleChangeTabs(value)} indexTabsParent={this.state.indexTabs}>{this.props}</NavTabs>

                <HeaderInfoPatient
                    patientName={this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.name : ""}
                    patientType={this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.type : ""}
                    patientIdentification={this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.identification : ""}
                    patientBirthDate={this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.birthDate : ""}
                    patientGender={this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.gender : ""}
                    bed={listInternments.length > 0 ? listInternments[0].bed : ""}
                    room={listInternments.length > 0 ? listInternments[0].room : ""}
                    traduction={t}
                    yAxisMdToogleHeader={358}
                    yAxisXsToogleHeader={344}
                    yAxisLgToogleHeader={356}
                    stickyContainerClass="sticky-container"></HeaderInfoPatient>

                <div className="pb-5">
                    {this.state.width < 992 ? <>
                        <Container className="horizontal-scrollable">
                            <Row className="px-4 pt-4 pb-3 fix-last-item-card-row fix-cards-vertically fix-spacing-no-gutters no-gutters">
                                <Col xs={10} sm={5} md={4} className="mr-4 pr-1">
                                    <Paper className="card-user">
                                        <div>
                                            <div className="d-flex">
                                                <Image className={"my-auto avatar-card fit-photo" + (!(isDefined(this.props.patient.PatientInfo.photoURI)) || this.props.patient.PatientInfo.photoURI === "" ? "" : " border-img-grd")} roundedCircle
                                                    src={this.props.patient.PatientInfo.photoURI == null || this.props.patient.PatientInfo.photoURI === '' ? PatientIcon : this.props.patient.PatientInfo.photoURI}
                                                    onError={(event) => { event.target.src = PatientIcon; event.target.className = "my-auto avatar-card" }}
                                                ></Image>

                                                <div className="text-left my-auto ml-3 flex-2">
                                                    <div className="d-flex ml-2">
                                                        <Box fontFamily="Roboto" fontSize={14} className="name-info-card pr-2 d-block m-0">
                                                            {this.props.patient.PatientInfo.name}
                                                        </Box>
                                                    </div>
                                                    <div className="d-flex ml-2 patient-details">
                                                        <Typography fontFamily="Roboto" variant="body2" className="font-weight-light m-0 font-size-12-px"> <span className="font-weight-bold font-size-12-px">{this.props.patient.PatientInfo.type} </span><span className="identification-code font-size-12-px"> {this.props.patient.PatientInfo.identification}</span> {listInternments.length > 0 ? <span className="px-1 font-size-12-px">|</span> : ""}</Typography>
                                                        <Typography fontFamily="Roboto" variant="body2" className="font-weight-light m-0 font-size-12-px" hidden={listInternments.length === 0}> <span class="font-weight-bold font-size-12-px"> {t('WoundsPage.RoomAbbreviation')}</span> {listInternments.length > 0 ? <span className="font-size-12-px">{listInternments[0].room}<span className="px-1 font-size-12-px">|</span></span> : ""}</Typography>
                                                        <Typography fontFamily="Roboto" variant="body2" className="font-weight-light m-0 font-size-12-px" hidden={listInternments.length === 0}> <span class="font-weight-bold font-size-12-px"> {t('WoundsPage.BedAbbreviation')}</span> {listInternments.length > 0 ? <span className="font-size-12-px">{listInternments[0].bed}</span> : ""}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex pt-4">
                                                <ul className="list-wounds-card roboto-thin">
                                                    <li><span>{t('Patient.Age')}</span></li>
                                                    <li><span>{t('Patient.Gender')}</span></li>
                                                    <li><span>{t('Patient.Occupation')}</span></li>
                                                    <li><span>{t('Patient.Nationality')}</span></li>
                                                    <li hidden={listInternments.length === 0}><span>{t('Patient.Internment')}</span></li>
                                                </ul>

                                                <ul className="list-wounds-card pl-5 ml-4 roboto-bold">
                                                    <li>
                                                            {!this.props.patient.PatientInfo.birthDate ? "--" : calculateAge(this.props.patient.PatientInfo.birthDate)} (
                                                                <Moment format="DD.MM.YYYY">{this.props.patient.PatientInfo.birthDate.toString()}</Moment>)
                                                    </li>
                                                    <li>
                                                        {!this.props.patient.PatientInfo.gender ? <span>&nbsp;</span> : this.props.patient.PatientInfo.gender}
                                                    </li>
                                                    <li>
                                                        {!this.props.patient.PatientInfo.career ? <span>&nbsp;</span> : this.props.patient.PatientInfo.career}
                                                    </li>
                                                    <li>
                                                        {!this.props.patient.PatientInfo.nationality ? <span>&nbsp;</span> : this.props.patient.PatientInfo.nationality}
                                                    </li>
                                                    <li hidden={listInternments.length === 0}>
                                                            {listInternments.length > 0 ? listInternments[listInternments.length - 1].internmentDuration : ""} {t('days')} (
                                                                <Moment format="DD.MM.YYYY">{listInternments.length > 0 ? listInternments[listInternments.length - 1].entryDate.toString() : ""}</Moment>)
                                                    </li>
                                                </ul>

                                            </div>
                                            <ButtonBase
                                                disableRipple
                                                disableTouchRipple
                                                focusRipple
                                                variant="contained"
                                                type="submit"
                                                className="position-absolute bottom-0 mb-3 outline-none"
                                                onClick={v => this.changeViewMode(v, -1)}>
                                                <Box
                                                    color="text.secondary"
                                                    fontSize={14}
                                                    className="roboto-bold text-uppercase">
                                                    {t('SeeAll')}
                                                </Box>
                                            </ButtonBase>
                                        </div>
                                    </Paper>
                                </Col>
                                {layoutCards}

                            </Row>
                        </Container>
                    </> :
                        <>
                            <Container>
                                <Row className="px-4 pt-4 pb-3">
                                    <Col lg={3} xl={3} className="mr-4 mr-lg-0 pl-0 pr-1">
                                        <Paper className="card-user">
                                            <div>
                                                <div className="d-flex">
                                                    <Image className={"my-auto avatar-card fit-photo" + (!(isDefined(this.props.patient.PatientInfo.photoURI)) || this.props.patient.PatientInfo.photoURI === "" ? "" : " border-img-grd")} roundedCircle
                                                        src={this.props.patient.PatientInfo.photoURI == null || this.props.patient.PatientInfo.photoURI === '' ? PatientIcon : this.props.patient.PatientInfo.photoURI}
                                                        onError={(event) => { event.target.src = PatientIcon; event.target.className = "my-auto avatar-card" }}
                                                    ></Image>

                                                    <div className="text-left my-auto ml-3 flex-2">
                                                        <div className="d-flex ml-2">
                                                            <Box fontFamily="Roboto" fontSize={14} className="name-info-card pr-2 d-block m-0">
                                                                {this.props.patient.PatientInfo.name}
                                                            </Box>
                                                        </div> 
                                                        <div className="d-flex ml-2 patient-details">
                                                            <Typography fontFamily="Roboto" variant="body2" className="font-weight-light m-0 font-size-12-px"> <span className="font-weight-bold font-size-12-px">{this.props.patient.PatientInfo.type} </span><span className="identification-code font-size-12-px"> {this.props.patient.PatientInfo.identification}</span> {listInternments.length > 0 ? <span className="px-1 font-size-12-px">|</span> : ""}</Typography>
                                                            <Typography fontFamily="Roboto" variant="body2" className="font-weight-light m-0 font-size-12-px" hidden={listInternments.length === 0}> <span class="font-weight-bold font-size-12-px"> {t('WoundsPage.RoomAbbreviation')}</span> {listInternments.length > 0 ? <span className="font-size-12-px">{listInternments[0].room}<span className="px-1 font-size-12-px">|</span></span> : ""}</Typography>
                                                            <Typography fontFamily="Roboto" variant="body2" className="font-weight-light m-0 font-size-12-px" hidden={listInternments.length === 0}> <span class="font-weight-bold font-size-12-px"> {t('WoundsPage.BedAbbreviation')}</span> {listInternments.length > 0 ? <span className="font-size-12-px">{listInternments[0].bed}</span> : ""}</Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex pt-4">
                                                    <ul className="list-wounds-card roboto-thin">
                                                        <li><span>{t('Patient.Age')}</span></li>
                                                        <li><span>{t('Patient.Gender')}</span></li>
                                                        <li><span>{t('Patient.Occupation')}</span></li>
                                                        <li><span>{t('Patient.Nationality')}</span></li>
                                                        <li hidden={listInternments.length === 0}><span>{t('Patient.Internment')}</span></li>
                                                    </ul>

                                                    <ul className="list-wounds-card pl-5 ml-4 roboto-bold">
                                                        <li>
                                                            <span className="font-weight-bold">
                                                                {!this.props.patient.PatientInfo.birthDate ? "--" : calculateAge(this.props.patient.PatientInfo.birthDate)} (
                                                            <Moment format="DD.MM.YYYY">{this.props.patient.PatientInfo.birthDate.toString()}</Moment>)
                                                    </span>
                                                        </li>
                                                        <li>
                                                            {!this.props.patient.PatientInfo.gender ? <span>&nbsp;</span> : <span className="font-weight-bold">{this.props.patient.PatientInfo.gender}</span>}
                                                        </li>
                                                        <li>
                                                            {!this.props.patient.PatientInfo.career ? <span>&nbsp;</span> : <span className="font-weight-bold">{this.props.patient.PatientInfo.career}</span>}
                                                        </li>
                                                        <li>
                                                            {!this.props.patient.PatientInfo.nationality ? <span>&nbsp;</span> : <span className="font-weight-bold">{this.props.patient.PatientInfo.nationality}</span>}
                                                        </li>
                                                        <li hidden={listInternments.length === 0}>
                                                            {/* <span className="font-weight-bold">
                                                        {infoInternment}
                                                    </span> */}
                                                            {/* <span className="font-weight-bold">
                                                        {listInternments.length > 0 ? calculateDurationInDays(listInternments[listInternments.length - 1].entryDate, Date.now()) : ""} {t('days')} (
                                                            <Moment format="DD.MM.YYYY">{listInternments.length > 0 ? listInternments[listInternments.length - 1].entryDate.toString() : ""}</Moment>)
                                                    </span> */}
                                                            <span className="font-weight-bold">
                                                                {listInternments.length > 0 ? listInternments[listInternments.length - 1].internmentDuration : ""} {t('days')} (
                                                            <Moment format="DD.MM.YYYY">{listInternments.length > 0 ? listInternments[listInternments.length - 1].entryDate.toString() : ""}</Moment>)
                                                    </span>
                                                        </li>
                                                    </ul>

                                                </div>
                                                <ButtonBase
                                                    disableRipple
                                                    disableTouchRipple
                                                    focusRipple
                                                    variant="contained"
                                                    type="submit"
                                                    className="position-absolute bottom-0 mb-3 outline-none"
                                                    onClick={v => this.changeViewMode(v, -1)}>
                                                    <Box
                                                        color="text.secondary"
                                                        fontSize={14}
                                                        className="roboto-bold text-uppercase">
                                                        {t('SeeAll')}
                                                    </Box>
                                                </ButtonBase>
                                            </div>
                                        </Paper>
                                    </Col>
                                    {layoutCards}
                                </Row>
                            </Container>
                        </>}


                    <Container>
                        <div className="d-flex pt-4">
                            <ButtonGroup color="primary" className={`mx-auto outline-none justify-content-center box-shadow-button-group ${this.state.width < 768 ? "w-100" : ""}`} aria-label="outlined primary button group">
                                <Button className={((!this.state.showWoundsClose && this.state.showWoundsOpen) || (!this.state.showWoundsClose && !this.state.showWoundsOpen)) ? `text-uppercase selected py-0 px-4 button-filter-wounds ${language == "PT" && this.state.width <= 768 ? "font-size-12-px" : "font-size-14-px"} roboto-bold outline-none` : ` ${language == "PT" && this.state.width <= 768 ? "font-size-12-px" : "font-size-14-px"} text-uppercase py-0 px-4 button-filter-wounds roboto-bold outline-none`} onClick={v => this.handleChangeShowWoundsClosed(0)}>{t('ForHealing')}</Button>
                                <Button className={(this.state.showWoundsClose && !this.state.showWoundsOpen) ? ` ${language == "PT" && this.state.width <= 768 ? "font-size-12-px" : "font-size-14-px"} text-uppercase selected py-0 px-4 button-filter-wounds roboto-bold outline-none` : ` ${language == "PT" && this.state.width <= 768 ? "font-size-12-px" : "font-size-14-px"} text-uppercase py-0 px-4 button-filter-wounds roboto-bold outline-none`} onClick={v => this.handleChangeShowWoundsClosed(1)}>{t('Healed')}</Button>
                                <Button className={(this.state.showWoundsClose && this.state.showWoundsOpen) ? `text-uppercase selected py-0 px-4 button-filter-wounds ${language == "PT" && this.state.width <= 768 ? "font-size-12-px" : "font-size-14-px"} roboto-bold outline-none` : `text-uppercase py-0 px-4 button-filter-wounds ${language == "PT" && this.state.width <= 768 ? "font-size-12-px" : "font-size-14-px"} roboto-bold outline-none`} onClick={v => this.handleChangeShowWoundsClosed(2)}>{t('All')}</Button>
                            </ButtonGroup>
                        </div>

                        <Row className="pb-5">
                            {/* <LoadingModal hidden={!this.state.isLoading} /> */}
                            <LocalizationCard changeState={this.props.woundInfo.changeState}></LocalizationCard>
                            {woundsCards}
                        </Row>
                    </Container>
                </div>
                <BackToTop iddiv={'#back-to-top-anchor-patient'}></BackToTop>
            </div>

        } else if (this.state.indexTabs === 1) {
            // CARACTERIZACAO DA FERIDA
            infoPage =
                <div>
                    <div id="back-to-top-anchor"></div>
                    <NavTabs callbackParent={() => this.onGoBack()} onChangeTabs={(value) => this.handleChangeTabs(value)} indexTabsParent={this.state.indexTabs} changeStateToUpdateOrRead={(mode) => this.changeStateToUpdateOrRead(mode)} editMode={this.state.caracterizationCanEditMode} onSaveCharacterisation={() => this.onSaveCharacterisation()} onCancel={() => this.onCancel()}>{this.props}</NavTabs>
                    <LoadingModal hidden={!this.state.saveInProgress} />
                    <Suspense fallback={<LoadingModal />}>
                        <WoundsRepoCharaHeader closeOrOpenWound={action => this.onClickOpenOrCloseWound(action, this.props.woundInfo.WoundID)} onChangeInterventionSelected={index => this.onChangeIntervention(index)} indexSelected={this.state.indexIntervention} onChangeViewMode={v => this.changeViewMode(v, -1)} canUserEdit={!this.state.caracterizationCanEditMode}>{this.props}</WoundsRepoCharaHeader>
                        <WoundsCharacterisation onChangeInterventionSelected={index => this.onChangeIntervention(index)} canUserEdit={this.state.caracterizationCanEditMode} saveInProgress={this.state.saveInProgress} saveCharacterisation={values => this.saveCharacterisation(values)} cancelSave={v => this.cancelSave()}>{this.props}</WoundsCharacterisation>
                    </Suspense>
                    <BackToTop iddiv={'#back-to-top-anchor'}></BackToTop>
                </div>
        } else if (this.state.indexTabs === 2) {
            // RELATORIO
            infoPage = <div>
                <div id="back-to-top-anchor-report"></div>
                <NavTabs callbackParent={() => this.onGoBack()} onChangeTabs={(value) => this.handleChangeTabs(value)} indexTabsParent={this.state.indexTabs} >{this.props}</NavTabs>
                <Suspense fallback={<LoadingModal />}>
                    <WoundsRepoCharaHeader
                        closeOrOpenWound={action => this.onClickOpenOrCloseWound(action, this.props.woundInfo.WoundID)}
                        onChangeInterventionSelected={index => this.onChangeIntervention(index)}
                        indexSelected={this.state.indexIntervention}
                        onChangeViewMode={v => this.changeViewMode(v, -1)}
                        canUserEdit={true}>
                        {this.props}
                    </WoundsRepoCharaHeader>
                    <WoundsReport woundReport={this.props.woundInfo.WoundID}>{this.props}</WoundsReport>
                </Suspense>
                <BackToTop iddiv={'#back-to-top-anchor-report'}></BackToTop>

            </div>
        }

        //this.state.openDialogConfirm = this.props.woundInfo.msgWoundOpen || this.props.woundInfo.msgWoundClosed || false


        const ref = React.createRef();

        const handleClick = () =>
            ref.current.scrollIntoView({
                behavior: 'auto',
                inline: 'start',
            });

        const modalGalleries = this.state.listPhotos.map((wound, index) => {
            return (
                <Col id={index === this.state.listPhotosSelected ? `modal-photos-${index}-selected` : `modal-photos-${index}`} 
                    onLoad={index !== this.state.listPhotosSelected ? undefined : handleClick} 
                    ref={index !== this.state.listPhotosSelected ? undefined : ref} xs sm={8} md={8} lg={4} xl={4} className="my-4"
                    hidden={wound.woundPhoto.length === 0}
                >

                    <Carousel className="py-3 carousel-modal"
                        centerMode
                        statusFormatter={(current) =>
                            <div className="position-relative d-inline">
                                <Box color="white" fontSize={12} fontFamily="Roboto" variant="body2" className="mt-5 mr-4 container-wound-card-detail d-flex" >
                                    <PhotoCameraIcon className="icon-color-wounds-card mr-1 mt-3"></PhotoCameraIcon>
                                    <Box color="white" fontSize={15} className="mt-3">{current}/{wound.woundPhoto.length}</Box>
                                </Box>
                            </div>
                        }
                        showArrows={true}
                        showIndicators={false}
                        centerSlidePercentage={100}
                        showThumbs={false}
                        selectedItem={index === this.state.indexWoundFullScreen ? (this.state.indexInterventionFullScreen !== -1 ? this.state.indexInterventionFullScreen : 0) : 0}
                    >

                        {this.state.listPhotos.length > 0 ?
                            wound.woundPhoto.map((option, indexInterv) => (

                                <div>
                                    <Box fontSize={16} fontWeight={700} className="mb-2 text-uppercase text-left d-block">
                                        <Moment format="DD.MM.YYYY">{option.createdAt}</Moment>

                                        {/* Nº de fotos por intervenção */}
                                    </Box>
                                    <div className={`${index !== this.state.listPhotosSelected ? "transparent-bg-container" : "transparent-bg-container transparent-bg-container-selected"} position-absolute w-100`}>
                                        <Typography variant="body2">
                                            <Moment className="ml-4 mt-4 position-absolute text-white" format="HH:mm:ss">{option.createdAt}</Moment>
                                        </Typography>
                                    </div>
                                    <img src={option.photoUri} alt="" className={index !== this.state.listPhotosSelected ? "" : "border-selected"}
                                    />
                                    <Fab
                                        className="position-absolute right-0 bottom-0 m-3 outline-none m-5"
                                        size="medium"
                                        color="primary"
                                        aria-label="zoomIn"
                                        onClick={v => this.handleShowDialogPhotosFullScreen(v, index, indexInterv, true)}>
                                        <ZoomInIcon />
                                    </Fab>


                                </div>
                            ))
                            : <div></div>}
                    </Carousel>

                </Col>
            )
        }

        );

        return (
            < div >
                {/* <LoadingModal hidden={!this.state.isLoading} /> */}
                {infoPage}
                <Dialog
                    //open={this.state.openDialogConfirm}
                    open={this.props.woundInfo.msgWoundOpen || this.props.woundInfo.msgWoundClosed || false}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title"></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" style={{ color: "black", fontFamily: "Roboto" }}>
                            {this.props.woundInfo.msgWoundOpen ? t('woundOpenedSuccess') : t('woundClosedSuccess')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button className="outline-none" onClick={v => this.onClickCloseConfirmationMsg()} color="primary">
                            {t('Ok')}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* INFORMACAO DO UTENTE */}
                <Dialog
                    maxWidth="md"
                    fullWidth
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={this.state.showAllInfo}
                    onClose={v => this.changeToCardsView()}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    classes={{
                        root: classes.mpdsModalBackground
                    }}
                    PaperProps={{
                        classes: {
                            root: classes.mpdsDetailPaper
                        }
                    }}
                    disableBackdropClick //don't close modal when click outside
                    disableEscapeKeyDown //don't close modal with ESC KEY
                >
                    <DialogTitle id="alert-dialog-title" className="main-shadow reducing-padding-detail">
                        <div className="d-flex position-relative">
                            <Image className={"my-md-auto mt-2 avatar-modal fit-photo" + (isDefined(this.props.patient.PatientInfo) ? (this.props.patient.PatientInfo.photoURI == null || this.props.patient.PatientInfo.photoURI === '' ? "" : " border-img-grd") : "")}
                                roundedCircle
                                src={isDefined(this.props.patient.PatientInfo) ? (this.props.patient.PatientInfo.photoURI == null || this.props.patient.PatientInfo.photoURI === '' ? PatientIcon : this.props.patient.PatientInfo.photoURI) : PatientIcon}
                                onError={(event) => { event.target.src = PatientIcon; event.target.className = "my-md-auto mt-2 avatar-modal" }}
                            ></Image>
                            <IconButton onClick={v => this.changeToCardsView()} aria-label="f3m" className="position-absolute mr-2 right-0 outline-none" color="primary">
                                <CloseIcon fontSize="large" />
                            </IconButton>
                            <div class="text-left my-auto">
                                <div className="d-flex mr-md-0 mr-5 pr-5 ">
                                    <Box fontFamily="Roboto" fontSize={18} variant="body1" className="pl-4 name-info-card d-block m-0 name-line-height">
                                        {isDefined(this.props.patient.PatientInfo) ? this.props.patient.PatientInfo.name : ""}
                                    </Box>
                                </div>


                                <ul class="list-header-info m-0 pl-4 d-flex pt-1 pr-5 list-style-none">
                                    <li>
                                        <Typography fontFamily="Roboto" variant="body2" className="font-weight-light m-0 ">
                                            <span className="font-weight-bold">{isDefined(this.props.patient.PatientInfo) ? this.props.patient.PatientInfo.type : ""} </span>
                                            <span className="pl-2"> {isDefined(this.props.patient.PatientInfo) ? this.props.patient.PatientInfo.identification : ""}</span> {listInternments.length > 0 ? <span className="pr-1">|</span> : ""}
                                            <span className={`font-weight-bold pr-1 ${listInternments.length === 0 ? "d-none" : ""}`}> {t('WoundsPage.RoomAbbreviation')} </span>
                                            {listInternments.length > 0 ? <span>{listInternments[0].room}<span className="px-1">|</span></span> : ""}

                                            <span className={`font-weight-bold pr-1 ${listInternments.length === 0 ? "d-none" : ""}`}> {t('WoundsPage.BedAbbreviation')}</span>
                                            {listInternments.length > 0 ? <span>{listInternments[0].bed}</span> : ""}

                                        </Typography>
                                    </li>

                                    <li>
                                        <Typography fontFamily="Roboto" variant="body2" className="font-weight-light ml-md-4 ml-0">
                                            <span className="font-weight-bold">{t('Patient.Age')}</span>
                                            <span className="pl-2">
                                                {isDefined(this.props.patient.PatientInfo) ? (!this.props.patient.PatientInfo.birthDate ? "--" : calculateAge(this.props.patient.PatientInfo.birthDate)) : "--"} (
                                                        <Moment format="DD.MM.YYYY">{isDefined(this.props.patient.PatientInfo) ? this.props.patient.PatientInfo.birthDate.toString() : ""}</Moment>)
                                                    </span>
                                        </Typography>
                                    </li>

                                    <li>
                                        <Typography fontFamily="Roboto" variant="body2" className="font-weight-light ml-md-4 ml-0">
                                            <span className="font-weight-bold">{t('Patient.Gender')}</span>
                                            <span className="pl-2"> {isDefined(this.props.patient.PatientInfo) ? (!this.props.patient.PatientInfo.gender ? "--" : this.props.patient.PatientInfo.gender) : "--"}
                                            </span>
                                        </Typography>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent classes={{ root: classes.mpdsDetailPaperContent }}>
                        <div className="d-flex px-lg-5 py-3">
                            <div className="flex-1">
                                <Typography fontFamily="Roboto" variant="body2" className="float-left font-weight-light">
                                    <span class="font-weight-bold pr-3">{t('Patient.Occupation')}</span>
                                </Typography>
                                <Typography fontFamily="Roboto" variant="body2" className="font-weight-light pl-1">

                                    {isDefined(this.props.patient.PatientInfo) ? (!this.props.patient.PatientInfo.career ? <span>&nbsp;</span> : <span>{this.props.patient.PatientInfo.career}</span>) : <span>&nbsp;</span>}

                                </Typography>
                            </div>

                            <div className="flex-1">
                                <Typography fontFamily="Roboto" variant="body2" className="float-left font-weight-light">
                                    <span class="font-weight-bold pr-3">{t('Patient.Nationality')}</span>
                                </Typography>
                                <Typography fontFamily="Roboto" variant="body2" className="font-weight-light pl-1">

                                    {isDefined(this.props.patient.PatientInfo) ? (!this.props.patient.PatientInfo.nationality ? <span>&nbsp;</span> : <span>{this.props.patient.PatientInfo.nationality}</span>) : <span>&nbsp;</span>}

                                </Typography>
                            </div>

                            <div className="flex-1" hidden={listInternments.length === 0}>
                                <Typography fontFamily="Roboto" variant="body2" className="float-left font-weight-light">
                                    <span class="font-weight-bold pr-3">{t('Patient.Internment')}</span>
                                </Typography>
                                <Typography fontFamily="Roboto" variant="body2" className="font-weight-light pl-1">
                                    {/* <span>
                                                {listInternments.length > 0 ? calculateDurationInDays(listInternments[listInternments.length - 1].entryDate, Date.now()) : ""} {t('days')} (
                                                        <Moment format="DD.MM.YYYY">{listInternments.length > 0 ? listInternments[listInternments.length - 1].entryDate.toString() : ""}</Moment>)
                                                </span> */}
                                    <span>
                                        {listInternments.length > 0 ? listInternments[listInternments.length - 1].internmentDuration : ""} {t('days')} (
                                                        <Moment format="DD.MM.YYYY">{listInternments.length > 0 ? listInternments[listInternments.length - 1].entryDate.toString() : ""}</Moment>)
                                                </span>

                                </Typography>
                            </div>

                        </div>
                        {layoutAllInfo}

                    </DialogContent>
                </Dialog>

                {/* INFORMACAO DE UM CARTAO */}

                <Dialog
                    maxWidth="md"
                    fullWidth
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={this.state.showCardInfo}
                    onClose={v => this.changeToCardsView()}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    classes={{
                        root: classes.mpdsModalBackground
                    }}
                    PaperProps={{
                        classes: {
                            root: classes.mpdsDetailPaper
                        }
                    }}
                    disableBackdropClick //don't close modal when click outside
                    disableEscapeKeyDown //don't close modal with ESC KEY
                >
                    <DialogTitle id="alert-dialog-title" className="main-shadow reducing-padding-detail">
                        <div className="d-flex position-relative">
                            <Image className={"my-md-auto mt-2 avatar-modal fit-photo" + (isDefined(this.props.patient.PatientInfo) ? (this.props.patient.PatientInfo.photoURI == null || this.props.patient.PatientInfo.photoURI === '' ? "" : " border-img-grd") : "")}
                                roundedCircle
                                src={isDefined(this.props.patient.PatientInfo) ? (this.props.patient.PatientInfo.photoURI == null || this.props.patient.PatientInfo.photoURI === '' ? PatientIcon : this.props.patient.PatientInfo.photoURI) : PatientIcon}
                                onError={(event) => { event.target.src = PatientIcon; event.target.className = "my-md-auto mt-2 avatar-modal" }}
                            ></Image>
                            <IconButton onClick={v => this.changeToCardsView()} aria-label="f3m" className="position-absolute mr-2 right-0 outline-none" color="primary">
                                <CloseIcon fontSize="large" />
                            </IconButton>
                            <div class="text-left my-auto">
                                <div className="d-flex mr-md-0 mr-5 pr-5">
                                    <Box fontFamily="Roboto" fontSize={18} variant="body1" className="pl-4 name-info-card d-block m-0 name-line-height">
                                        {isDefined(this.props.patient.PatientInfo) ? this.props.patient.PatientInfo.name : ""}
                                    </Box>
                                </div>


                                <ul class="list-header-info m-0 pl-4 d-flex pt-1 pr-5 list-style-none">
                                    <li>
                                        <Typography fontFamily="Roboto" variant="body2" className="font-weight-light m-0 ">
                                            <span className="font-weight-bold">{isDefined(this.props.patient.PatientInfo) ? this.props.patient.PatientInfo.type : ""} </span>
                                            <span className="pl-2"> {isDefined(this.props.patient.PatientInfo) ? this.props.patient.PatientInfo.identification : ""}</span> {listInternments.length > 0 ? <span className="pr-1">|</span> : ""}
                                            <span className={`font-weight-bold pr-1 ${listInternments.length === 0 ? "d-none" : ""}`}> {t('WoundsPage.RoomAbbreviation')} </span>
                                            {listInternments.length > 0 ? <span>{listInternments[0].room}<span className="px-1">|</span></span> : ""}
                                            <span className={`font-weight-bold pr-1 ${listInternments.length === 0 ? "d-none" : ""}`}> {t('WoundsPage.BedAbbreviation')}</span>
                                            {listInternments.length > 0 ? <span>{listInternments[0].bed}</span> : ""}
                                        </Typography>
                                    </li>

                                    <li>
                                        <Typography fontFamily="Roboto" variant="body2" className="font-weight-light ml-md-4 ml-0">
                                            <span className="font-weight-bold">{t('Patient.Age')}</span>
                                            <span className="pl-2">
                                                {isDefined(this.props.patient.PatientInfo) ? (!this.props.patient.PatientInfo.birthDate ? "--" : calculateAge(this.props.patient.PatientInfo.birthDate)) : "--"} (
                                                        <Moment format="DD.MM.YYYY">{isDefined(this.props.patient.PatientInfo) ? this.props.patient.PatientInfo.birthDate.toString() : ""}</Moment>)
                                                    </span>
                                        </Typography>
                                    </li>

                                    <li>
                                        <Typography fontFamily="Roboto" variant="body2" className="font-weight-light ml-md-4 ml-0">
                                            <span className="font-weight-bold">{t('Patient.Gender')}</span>
                                            <span className="pl-2"> {isDefined(this.props.patient.PatientInfo) ? (!this.props.patient.PatientInfo.gender ? "--" : this.props.patient.PatientInfo.gender) : "--"}
                                            </span>
                                        </Typography>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogContent classes={{ root: classes.mpdsDetailPaperContent }}>
                        <div className="d-flex px-lg-5 py-3">
                            <div className="flex-1">
                                <Typography fontFamily="Roboto" variant="body2" className="float-left font-weight-light">
                                    <span class="font-weight-bold pr-3">{t('Patient.Occupation')}</span>
                                </Typography>
                                <Typography fontFamily="Roboto" variant="body2" className="font-weight-light pl-1">
                                    {isDefined(this.props.patient.PatientInfo) ? (!this.props.patient.PatientInfo.career ? <span>&nbsp;</span> : <span>{this.props.patient.PatientInfo.career}</span>) : <span>&nbsp;</span>}
                                </Typography>
                            </div>

                            <div className="flex-1">
                                <Typography fontFamily="Roboto" variant="body2" className="float-left font-weight-light">
                                    <span class="font-weight-bold pr-3">{t('Patient.Nationality')}</span>
                                </Typography>
                                <Typography fontFamily="Roboto" variant="body2" className="font-weight-light pl-1">

                                    {isDefined(this.props.patient.PatientInfo) ? (!this.props.patient.PatientInfo.nationality ? <span>&nbsp;</span> : <span>{this.props.patient.PatientInfo.nationality}</span>) : <span>&nbsp;</span>}

                                </Typography>
                            </div>


                            <div className="flex-1" hidden={listInternments.length === 0}>
                                <Typography fontFamily="Roboto" variant="body2" className="float-left font-weight-light">
                                    <span class="font-weight-bold pr-3">{t('Patient.Internment')}</span>
                                </Typography>
                                <Typography fontFamily="Roboto" variant="body2" className="font-weight-light pl-1">
                                    {/* <span>
                                                {listInternments.length > 0 ? calculateDurationInDays(listInternments[listInternments.length - 1].entryDate, Date.now()) : ""} {t('days')} (
                                                        <Moment format="DD.MM.YYYY">{listInternments.length > 0 ? listInternments[listInternments.length - 1].entryDate.toString() : ""}</Moment>)
                                                </span> */}
                                    <span>
                                        {listInternments.length > 0 ? listInternments[listInternments.length - 1].internmentDuration : ""} {t('days')} (
                                                        <Moment format="DD.MM.YYYY">{listInternments.length > 0 ? listInternments[listInternments.length - 1].entryDate.toString() : ""}</Moment>)
                                                </span>


                                </Typography>
                            </div>

                        </div>
                        {layoutCardAllInfo}
                    </DialogContent>
                </Dialog>

                {/* INFORMACAO LOCALIZACAO*/}

                <Dialog
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={this.state.showLocationInfo}
                    onClose={v => this.changeToCardsView()}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    classes={classes.mpdsModalBackground}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    classes={{
                        root: classes.mpdsModalBackground
                    }}
                    PaperProps={{
                        classes: {
                            root: classes.mpdsDetailPaper
                        }
                    }}
                    disableBackdropClick //don't close modal when click outside
                    disableEscapeKeyDown //don't close modal with ESC KEY     
                >
                    <DialogTitle id="alert-dialog-title" className="main-shadow">
                        <div className="d-flex position-relative">
                            <Box
                                fontFamily="Nunito"
                                fontSize={20}
                                className="roboto-bold text-uppercase pl-2 pt-3"
                            >{t('Location')}</Box>
                            <IconButton onClick={v => this.changeToCardsView()} aria-label="f3m" className="position-absolute mr-2 right-0 outline-none" color="primary">
                                <CloseIcon fontSize="large" />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent classes={{ root: classes.mpdsDetailPaperContent }}>
                        <Row className="px-lg-5 py-3 center-info-localization">
                            <Col lg={7} md={7}>
                                <LocalizationModal areaClasses={"mx-auto"} indexWound={this.state.showLocationWoundIndex}></LocalizationModal>
                            </Col>
                            <Col lg={5} md={5}>
                                <div >
                                    <Typography variant="body2" className="font-weight-bold">
                                        {t('Remarks')}
                                        <Moment className="pl-2" format="DD.MM.YYYY" >
                                            {this.state.showLocationWoundIndex > -1 ? (listWounds[this.state.showLocationWoundIndex] !== undefined ? listWounds[this.state.showLocationWoundIndex].intervention[listWounds[this.state.showLocationWoundIndex].intervention.length - 1].createdAt.toString() : "") : ""}
                                        </Moment>
                                    </Typography>

                                    <Typography variant="body2">
                                        {this.state.showLocationWoundIndex > -1 ? (listWounds[this.state.showLocationWoundIndex] !== undefined ? (listWounds[this.state.showLocationWoundIndex].note === "null" ? "" : listWounds[this.state.showLocationWoundIndex].note) : "") : ""}
                                    </Typography>

                                </div>
                            </Col>
                        </Row>
                    </DialogContent>
                </Dialog>

                {/* IMAGENS DAS FERIDAS*/}
                <Dialog fullScreen open={this.state.openDialogWoundPhotos}>

                    <AppBar position="static" className={listWounds[this.state.indexWoundDialogPhotos] !== undefined ? (listWounds[this.state.indexWoundDialogPhotos].isClosed ? "wounds-card-closed" : "appbar-wound") : ""}>
                        <Toolbar >
                            <Typography variant="h6" color="inherit" className={classes.title} >
                                {listWounds[this.state.indexWoundDialogPhotos] !== undefined ? listWounds[this.state.indexWoundDialogPhotos].intervention[listWounds[this.state.indexWoundDialogPhotos].intervention.length - 1].typology.type : ""} {/* (SJR) - Type Wounds Table */}
                            </Typography>

                            <IconButton fontSize="large" edge="end" color="inherit" className="outline-none"
                                onClick={v => this.handleCloseDialogPhotos()}
                                aria-label="close">
                                <CloseIcon />
                            </IconButton>

                        </Toolbar>
                    </AppBar>

                    <div className="viewport-margins-modal-wound horizontal-scrollable">
                        <Row className="pt-4 pb-2 pr-4 d-block">

                            {modalGalleries}

                        </Row>
                    </div>

                </Dialog>

                {/* IMAGENS DAS FERIDAS MAXIMIZADAS*/}
                <Dialog fullScreen open={this.state.openDialogWoundPhotosFullScreen}>

                    <Carousel className="carousel-fullscreen"
                        centerMode
                        statusFormatter={(current, total) =>
                            <Box color="white" fontSize={12} fontFamily="Roboto" variant="body2" className="mr-1 left-0 position-absolute d-flex" >
                                <PhotoCameraIcon className="icon-color-wounds-card mr-1"></PhotoCameraIcon>
                                <Box color="white" fontSize={15} className="text-white">{current}/{total}</Box>
                            </Box>
                        }
                        showArrows={true}
                        showIndicators={false}
                        centerSlidePercentage={100}
                        showThumbs={false}
                        selectedItem={this.state.indexInterventionFullScreen}
                    >

                        {this.state.listPhotos.length > 0 && this.state.listPhotos[this.state.indexWoundFullScreen] !== undefined ?
                            this.state.listPhotos[this.state.indexWoundFullScreen].woundPhoto.map((option, indexInterv) => (
                                <div>
                                    <div className="transparent-bg-container position-absolute w-100">
                                        <IconButton fontSize="large" className="m-2 text-white position-absolute right-0 outline-none"
                                            onClick={v => this.handleCloseDialogPhotosFullScreen()}
                                            aria-label="close">
                                            <CloseIcon />
                                        </IconButton>

                                        <IconButton fontSize="large" className="m-2 text-white position-absolute download-position outline-none"
                                            href={option.photoUri} target="_blank">
                                            <GetAppIcon />
                                        </IconButton>
                                    </div>
                                    <img src={option.photoUri} alt="" />
                                </div>
                            ))
                            : <div></div>}
                    </Carousel>
                </Dialog>

                {/* DIALOG CONFIRM CANCEL */}
                <Dialog
                    open={this.state.openDialogConfirmCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title-confirm-cancel"> </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-confirm-cancel" style={{ color: "#494949", fontFamily: "Roboto", fontSize: "14px" }}>
                            {t('loseUnsavedChanges')}
                            {t('confirmQuestion')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ color: "#494949", fontFamily: "Roboto" }}>
                        <Button className="outline-none" onClick={v => this.closeDialogCancel()} color="primary" autoFocus>
                            {t('No')}
                        </Button>
                        <Button className="outline-none" onClick={v => this.changeStateToUpdateOrRead("READ")} color="primary">
                            {t('Yes')}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* MESSAGE SAVE WITH SUCESS */}
                <Snackbar open={this.state.showSucessMessage} autoHideDuration={5000} onClose={this.handleCloseSnackBar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSnackBar} severity="success">
                        {t('sucessChangesSaved')}
                    </MuiAlert>
                </Snackbar>

                {/* MESSAGE ERROR ON SAVE */}
                <Snackbar open={this.state.showErrorMessage} autoHideDuration={5000} onClose={this.handleCloseSnackBar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <MuiAlert elevation={6} variant="filled" onClose={this.handleCloseSnackBar} severity="error">
                        {t(this.state.errorMessage)}
                    </MuiAlert>
                </Snackbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({ login: state.login, wounds: state.wounds, patient: state.patient, woundInfo: state.woundInfo });
const mapDispatchToProps = dispatch => bindActionCreators({ getPatientInfoAndStrutureCards, getWoundById, openWound, closeWound, changeIndexInterventions, getTokenRefresh, updateIntervention }, dispatch);
export default withTranslation()(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(PatientPage)))



