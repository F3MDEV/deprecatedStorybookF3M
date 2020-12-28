import React, {Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";
import Moment from 'react-moment';
import 'moment/locale/pt';
import 'moment/locale/en-gb';

//OUTSIDE COMPONENTS
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
//import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from 'react-responsive-carousel';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import CameraOff from "../../utils/camera-off.svg"

//CSS, STYLES & MEDIA ASSETS
import PatientIcon from '../../utils/account-circle.svg';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import "./WoundsReportCharaHeader.scss"
import PhotoIcon from '@material-ui/icons/Photo';

//ICONS
import LaunchIcon from '@material-ui/icons/Launch';
import Fab from '@material-ui/core/Fab';
import SliderArrow from '../../components/slider_arrow/slider_arrow'
import CloseIcon from '@material-ui/icons/Close';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import GetAppIcon from '@material-ui/icons/GetApp';

//UTILS
import { calculateAge } from "../../utils/utils";
import LoadingF3M from '../../components/Loadings/LoadingF3M';


const Slider = React.lazy(() => import('react-slick'));

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    titleGallery: {
        flexGrow: 1,
    },
});

class WoundsRepoCharaHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openDialogMsg: false,
            windowSize: "",
            openDialogWoundPhotos: false,
            indexWoundDialogPhotos: 0
        }
    }

    changeDate(value, canEdit) {
        if (canEdit) {
            // TEM QUE ALTERAR A CARACTERIZAÇAO SELECIONADA PARA A DA IMAGEM
            const list = this.props.woundInfo.interventions || []
            let maxi = list.length - 1
            let indexSelected = -1;
            let listAux = [];

            for (let i = maxi; i >= 0; i--) {
                let intervention = list[i]
                listAux = listAux.concat(intervention)
                if (listAux.length - 1 === value) {
                    indexSelected = i
                }
            }

            this.props.onChangeInterventionSelected(indexSelected)
        }
    }

    onClickCloseOrOpenWound(action) {
        this.setState({ openDialogMsg: false })
        this.props.closeOrOpenWound(action)
    }

    handleOpenCloseDialog(value) {
        if (value !== this.state.openDialogMsg) {
            this.setState({ openDialogMsg: value })
        }
    }

    changeViewMode(v) {
        this.props.onChangeViewMode(v)
    }

    handleShowDialogPhotos(indexInterventionWound, indexWound, showDialog) {

        if (showDialog !== this.state.openDialogWoundPhotos) {

            this.setState({
                openDialogWoundPhotos: showDialog,
                indexWoundDialogPhotos: indexWound,
            })
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

    render() {
        const { t } = this.props;
        const listInternments = this.props.patient.Internments || []
        const { classes } = this.props;
        const listWounds = this.props.patient.Wounds || []

        let wound
        let idWoundSelectd = 0

        listWounds.map((w, index) => (
            idWoundSelectd = idWoundSelectd + (w.intervention[0] !== undefined ? (w.intervention[0].woundId === this.props.woundInfo.WoundID ? index : 0) : 0)
        ))
        // Ferida selecionada
        wound = this.props.woundInfo

        const list = wound.interventions || []
        let maxi = list.length - 1
        let listAux = [];
        let indexSelected = -1;

        for (let i = maxi; i >= 0; i--) {
            let intervention = list[i]
            listAux = listAux.concat(intervention)
            if (this.props.indexSelected === i) {
                indexSelected = listAux.length - 1
            }
        }

        const settings = {
            speed: 300,
            variableWidth: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            prevArrow: <SliderArrow to="prev" />,
            nextArrow: <SliderArrow to="next" />
        };


        let woundsCards =
            <Paper className={wound.isClosed ? "wounds-card-characterization wounds-card-closed" : "wounds-card-characterization"}>
                <div className="py-2 px-4">
                    <div className="pt-3 pb-3 d-flex">
                        <Box fontFamily="Roboto" fontSize={19} fontWeight={700} className="text-uppercase one-line-only" display='inline' color="white">
                            {wound.interventions != null ? (wound.interventions.length > 0 ? wound.interventions[wound.interventions.length - 1].typology.type : "") : ""} {/* (SJR) - Type Wounds Table */}
                        </Box>

                        <ButtonBase align="right" fontSize="large" className={`mx-5 state-button-card-wound ${wound.isClosed ? "wounds-card-closed" : ""} outline-none`} color={wound.isClosed ? "red" : "text.secondary"} variant="contained" type="submit" onClick={v => this.handleOpenCloseDialog(true)} disabled={!this.props.canUserEdit}>
                            <Box 
                                color="white"
                                fontSize={12}
                                className="font-weight-bold text-uppercase px-3">
                                {wound.isClosed ? t('OpenWound') : t('CloseWound')}
                            </Box>
                        </ButtonBase>

                        <Dialog
                            open={this.state.openDialogMsg}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description" style={{ color: "black", fontFamily: "Roboto" }}>
                                    {wound.isClosed ? t('confirmOpenWound') : t('confirmCloseWound')}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button className="outline-none" onClick={v => this.handleOpenCloseDialog(false)} color="primary" autoFocus>
                                    {t('No')}
                                </Button>
                                <Button className="outline-none" onClick={v => this.onClickCloseOrOpenWound(wound.isClosed ? "Open" : "Close")} color="primary">
                                    {t('Yes')}
                                </Button>

                            </DialogActions>
                        </Dialog>
                    </div>

                    <Slider className="mx-3" {...settings}>
                        {listAux != null ? listAux.map((option, index) => (
                            <div className="pl-2">
                                <div className={(index === indexSelected || (indexSelected === -1 && index === 0)) ? (wound.isClosed ? "border-selected-img-closedWound position-relative p-0" : "border-selected-img position-relative p-0") : "border-img position-relative p-0 mt-2"} 
                                key={"photo-charac-"+index}>
                                    {option.woundPhoto.length > 0 ? 
                                        <>
                                            <img src={option.woundPhoto[0].photoUri} 
                                                onClick={v => this.changeDate(index, this.props.canUserEdit)}
                                                alt=""
                                                onLoad={v => {return (<CircularProgress color="primary"/>)}}
                                            />
                                        </>
                                        :
                                        <>
                                            <div onClick={v => this.changeDate(index, this.props.canUserEdit)} className={`state-no-photo text-center`}> {/*  ${(index === indexSelected || (indexSelected === -1 && index === 0)) ? (wound.isClosed ? "border-selected-img-closedWound" : "border-selected-img") : "border-img"} */}
                                                <div className="icon-image">
                                                    <Image className="icon-image "  src={CameraOff} className="d-block"></Image>
                                                </div>
                                            {/* <PhotoIcon color="secondary" className="d-block mx-auto"/>
                                            <Typography variant='caption' color="secondary">{t('NoRecords')}</Typography> */}
                                            </div>
                                        </>
                                    }

                                    <Box color="white" fontSize={12} fontFamily="Roboto" variant="body2" className={`w-100 position-absolute container-photo-charac pr-2 pt-1 ${option.woundPhoto.length > 0 ? "transparent-gradient-container" : "container-photo-charac-no-data" }`} >
                                        <Moment format="DD.MM.YYYY">{option.createdAt}</Moment>
                                        <PhotoCameraIcon className="icon-color-wounds-card ml-2  p-1" hidden={option.woundPhoto.length === 0}></PhotoCameraIcon>
                                        <span className="pr-1" hidden={option.woundPhoto.length === 0}>{option.woundPhoto.length}</span>
                                    </Box>
                                    <Fab size="small" color="primary" aria-label="add" className="fab-photo-gallery outline-none"
                                        style={{ width: "30px", height: "30px", minHeight: "30px", marginRight: (index === indexSelected || (indexSelected === -1 && index === 0)) ? "5px" : "0px" }}
                                        onClick={v => this.handleShowDialogPhotos(v, index, true)}
                                        hidden={option.woundPhoto.length === 0}
                                        >
                                        <LaunchIcon />
                                    </Fab>
                                </div>
                            </div>
                            )) : null}
                            
                    </Slider>

                </div>
            </Paper >

        const ref = React.createRef();

        const handleClick = () =>
            ref.current.scrollIntoView({
                behavior: 'auto',
                inline: 'start',
            });

        const modalGalleries = listAux.map((wound, index) => {
            return (

                <Col key={'modal-photos'+index} id={index === this.state.indexWoundDialogPhotos ? `modal-photos-${index}-selected` : `modal-photos-${index}`} 
                    onLoad={index === this.state.indexWoundDialogPhotos ? handleClick : undefined} ref={index === this.state.indexWoundDialogPhotos ? ref : undefined} 
                    xs sm={8} md={8} lg={4} xl={4} className="my-4"
                    hidden={wound.woundPhoto.length === 0}
                >
                    <Carousel className="py-3 carousel-modal"
                        centerMode
                        statusFormatter={(current) =>
                            <div className="position-relative d-inline">
                                <Box color="white" fontSize={12} fontFamily="Roboto" variant="body2" className="pt-1 mt-5 mr-4 container-wound-card-detail d-flex" >
                                    <PhotoCameraIcon className="icon-color-wounds-card mr-1 mt-3"></PhotoCameraIcon>
                                    <Box color="white" fontSize={15} className="mt-3">{current}/{wound.woundPhoto.length}</Box>
                                </Box>
                            </div>
                        }
                        showArrows={true}
                        showIndicators={false}
                        centerSlidePercentage={100}
                        showThumbs={false}
                        selectedItem={0}
                        >

                        {listAux.length > 0 ?
                            wound.woundPhoto.map((option, indexInterv) => (
                                <div key={"headerPhoto"+indexInterv}>
                                    <Box fontSize={16} fontWeight={700} className="mb-2 text-uppercase text-left d-block">
                                        <Moment format="DD.MM.YYYY">{option.createdAt}</Moment>

                                        {/* Nº de fotos por intervenção */}
                                    </Box>
                                    <div className={`${index === this.state.indexWoundDialogPhotos ? "transparent-gradient-container transparent-bg-container-selected" : "transparent-gradient-container "} position-absolute w-100`}>
                                        <Typography variant="body2">
                                            <Moment className="ml-4 mt-4 position-absolute text-white" format="HH:mm:ss">{option.createdAt}</Moment>
                                        </Typography>
                                    </div> 
                                    <img src={option.photoUri}
                                        className={index === this.state.indexWoundDialogPhotos ? "border-selected" : ""}
                                        alt=""
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
        <Suspense fallback={<LoadingF3M/>}>
                <div className="container">
                    <Row className="position-relative pt-4">
                        <Col sm={6} md={6} lg={4} className="pb-4 pt-2 pb-md-0">
                            <Paper className="card-user px-4 position-relative">
                                <div>
                                    <div className="d-flex my-3">
                                        <Image className={"my-auto avatar-card fit-photo" + (this.props.patient.PatientInfo == null || this.props.patient.PatientInfo.photoURI == null || this.props.patient.PatientInfo.photoURI === '' ? "" : " border-img-grd")}
                                        roundedCircle 
                                        src={this.props.patient.PatientInfo == null || this.props.patient.PatientInfo.photoURI == null || this.props.patient.PatientInfo.photoURI === '' ? PatientIcon : this.props.patient.PatientInfo.photoURI}
                                        onError={(event) => {event.target.src = PatientIcon; event.target.src = "my-auto avatar-card"}}
                                        ></Image>

                                        <div className="text-left my-auto ml-3 flex-2">
                                            <div className="d-flex ml-2">
                                                <Box fontFamily="Roboto" fontSize={18} className="name-info-card pr-2 d-block m-0">
                                                    {this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.name : ""}
                                                </Box>
                                            </div>
                                            <div className="d-flex ml-2 patient-details">
                                                <Typography fontFamily="Roboto" variant="body2" className="font-weight-light m-0 "> 
                                                    <span class="font-weight-bold pr-1">{this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.type : ""} </span>
                                                    <span className="identification-code"> {this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.identification : ""}</span> {listInternments.length > 0 ? <span className="px-1">|</span> : ""}</Typography>
                                                <Typography fontFamily="Roboto" variant="body2" className="font-weight-light m-0 " hidden={listInternments.length === 0}> <span class="font-weight-bold"> {t('WoundsPage.RoomAbbreviation')}</span> {listInternments.length > 0 ? <span>{listInternments[0].room}<span className="px-1">|</span></span> : ""}</Typography>
                                                <Typography fontFamily="Roboto" variant="body2" className="font-weight-light m-0 " hidden={listInternments.length === 0}> <span class="font-weight-bold"> {t('WoundsPage.BedAbbreviation')}</span> {listInternments.length > 0 ? <span>{listInternments[0].bed}</span> : ""}</Typography>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <ul className="list-wounds-card pt-2">
                                            <li><span>{t('Patient.Age')}</span></li>
                                            <li><span>{t('Patient.Gender')}</span></li>
                                            <li><span>{t('Patient.Occupation')}</span></li>
                                            <li><span>{t('Patient.Nationality')}</span></li>
                                            <li hidden={listInternments.length === 0}><span>{t('Patient.Internment')}</span></li>
                                        </ul>

                                        <ul className="list-wounds-card pl-5 ml-4 pt-2">
                                            <li>
                                                <span className="font-weight-bold">
                                                    { this.props.patient.PatientInfo == null ? "--" : !this.props.patient.PatientInfo.birthDate ? "--" : calculateAge(this.props.patient.PatientInfo.birthDate)} (
                                                    { this.props.patient.PatientInfo == null ? <span>&nbsp;</span> : <Moment format="DD.MM.YYYY">{this.props.patient.PatientInfo.birthDate.toString()}</Moment>})
                                                </span>
                                            </li>
                                            <li>
                                                {this.props.patient.PatientInfo == null ? <span>&nbsp;</span> : !this.props.patient.PatientInfo.gender ? <span>&nbsp;</span> : <span className="font-weight-bold">{this.props.patient.PatientInfo.gender}</span>}
                                            </li>
                                            <li>
                                                {this.props.patient.PatientInfo == null ? <span>&nbsp;</span> : !this.props.patient.PatientInfo.career ? <span>&nbsp;</span> : <span className="font-weight-bold">{this.props.patient.PatientInfo.career}</span>}
                                            </li>
                                            <li>
                                                {this.props.patient.PatientInfo == null ? <span>&nbsp;</span> : !this.props.patient.PatientInfo.nationality ? <span>&nbsp;</span> : <span className="font-weight-bold">{this.props.patient.PatientInfo.nationality}</span>}
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
                                            className="font-weight-bold text-uppercase">
                                            {t('SeeAll')}
                                        </Box>
                                    </ButtonBase>
                                </div>
                            </Paper>
                        </Col>
                        <Col sm={6} md={6} lg={8} className="pb-1 pt-2 pb-md-0">
                            {woundsCards}
                        </Col>
                    </Row>
                </div >


                {/* IMAGENS DAS FERIDAS*/}
                <Dialog fullScreen open={this.state.openDialogWoundPhotos}>
                    <AppBar position="static" className="appbar-wound">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className={classes.titleGallery} style={{ color: "white" }} >
                                {wound.interventions != null ? (wound.interventions.length > 0 ? wound.interventions[wound.interventions.length - 1].typology.type : "") : ""} {/* (SJR) - Type Wounds Table */} 
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

                        {listAux.length > 0 && listAux[this.state.indexWoundFullScreen] !== undefined ?
                            listAux[this.state.indexWoundFullScreen].woundPhoto.map((option, indexInterv) => (
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
            </Suspense>
        );
    }
}

const mapStateToProps = state => ({ patient: state.patient, woundInfo: state.woundInfo });
export default withTranslation()(connect(
    mapStateToProps,
    null
)(withStyles(styles)(WoundsRepoCharaHeader)))


