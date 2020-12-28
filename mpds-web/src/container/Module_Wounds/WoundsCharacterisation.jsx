import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";
import Moment from 'react-moment';
import 'moment/locale/pt';
import 'moment/locale/en-gb';
import { reduxForm, Field } from 'redux-form'

//OUTSIDE COMPONENTS
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

//INSIDE COMPONENTS
import ContentHeaderTitle from "../../components/content_header_title/contentHeader";
import TreatmentsList from "../../components/treatments_list/treatments_list";
import SliderWithScales from "../../components/sliderWithScale/sliderWithScale";
import HeaderInfoPatient from "../../components/header_info_patient/header_info_patient"
import WoundsCharacterisationObs from "./WoundsCharacterisationObs.tsx";
import WoundsCharacterisationExudateOther from "./WoundsCharacterisationExudateOther.tsx";

//Actions
import { setLoading } from "../../store/actions/login/loginActions";

//ICONS
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Scale0, Scale1, Scale2, Scale3, Scale4, Scale5, Scale6, Scale7, Scale8, Scale9, Scale10, Scale0Active, Scale1Active, Scale2Active, Scale3Active, Scale4Active, Scale5Active, Scale6Active, Scale7Active, Scale8Active, Scale9Active, Scale10Active } from '../../utils/painImages/scales.jsx';
import Face0 from '../../utils/painImages/face0.jsx';
import Face1 from '../../utils/painImages/face1.jsx';
import Face2 from '../../utils/painImages/face2.jsx';
import Face3 from '../../utils/painImages/face3.jsx';
import Face4 from '../../utils/painImages/face4.jsx';
import Face5 from '../../utils/painImages/face5.jsx';
import Face0Active from '../../utils/painImages/face0_active.jsx';
import Face1Active from '../../utils/painImages/face1_active.jsx';
import Face2Active from '../../utils/painImages/face2_active.jsx';
import Face3Active from '../../utils/painImages/face3_active.jsx';
import Face4Active from '../../utils/painImages/face4_active.jsx';
import Face5Active from '../../utils/painImages/face5_active.jsx';

import "./WoundsCharacterisation.scss";
import { isDefined } from "../../utils/utils";

const INTERVENTION_FIELDS = {
    IS_PRESENT_ON_ADMISSION: "isPresentOnAdmission",
    CATEGORY: "category",
    DIMENSION_LENGTH: "dimensionLength",
    DIMENSION_WIDTH: "dimensionWidth",
    DIMENSION_DEPTH: "dimensionDepth",
    DIMENSION_LOCA: "dimensionLoca",
    EXUDATE_PRESENT: "exudatePresent",
    EXUDATE_TYPE_HEM: "exudateTypeHem",
    EXUDATE_TYPE_SER: "exudateTypeSer",
    EXUDATE_TYPE_PUR: "exudateTypePur",
    EXUDATE_TYPE_OTHER: "exudateTypeOther",
    EXUDATE_QUANTATY: "exudateQuantaty",
    ODOR_PRESENT: "odorPresent",
    EXUDATE_SMELL_QUANTATY: "exudateSmellQuantaty",
    EXUDATE_SMELL_TYPE: "exudateSmaellType",
    PAIN_PRESENT: "painPresent",
    PAIN_SCALE_1: "painScale1",
    PAIN_SCALE_2: "painScale2",
    SURROUNDING_SKIN_INTACT: "surroundingSkinIntact",
    SURROUNDING_SKIN_RED: "surroundingSkinRed",
    SURROUNDING_SKIN_MACERATED: "surroundingSkinMacerated",
    SURROUNDING_SKIN_DRY: "surroundingSkinDry",
    SURROUNDING_SKIN_DESQUAMATION: "surroundingSkinDesquamation",
    EDGES_PRESENT: "edgesPresent",
    EDGES: "edges",
    INFLAMATORY_SIGNS: "inflammatorySigns",
    OBSERVATIONS: "observations",
    EPITHELIAL_TISSUE_SCALE: "epithelialTissueScale",
    GRANULATION_TISSUE_SCALSE: "granulationTissueScale",
    FIBRIN_TISSUE_SCLASE: "fibrinTissueScale",
    NECROTIC_TISSUE_SCALE: "necroticTissueScale",
    DEVITALIZED_TISSUE_SCALE: "devitalizedTissueScale"
}

const EXUDATE_TYPE = { HEMATICO: "Hematico", SEROSO: "Seroso", PURULENTO: "Purulento", OUTRO: "Outro:" }
const SURROUNDING_SKIN = { INTEGRA: "Integra", RUBORIZADA: "Ruborizada", MACERADA: "Macerada", SECA: "Seca", DESCAMATIVA: "Descamativa" }

const CharacterizationSwitch = withStyles({
    switchBase: {
        '&$checked + $track': {
            backgroundColor: "#4CB3BA",
        },
    },
    //checked: {},
    track: {},
})(Switch);

class WoundsCharacterisation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            isPresentOnAdmission: null,
            WoundID: 0,
            patientID: 0,
            interventionID: 0,
            category: "",
            typology: "",
            typologyID: 0,
            hasCategory: false,
            dimensionLength: 0,
            dimensionWidth: 0,
            dimensionDepth: 0,
            dimensionLoca: false,
            dimensionResult: 0,
            exudateType: "",
            exudateQuantaty: "",
            exudateSmellQuantaty: "",
            exudateSmaellType: "",
            painScale1: 0,
            painScale2: 0,
            epithelialTissueScale: "",
            fibrinTissueScale: "",
            necroticTissueScale: "",
            devitalizedTissueScale: "",
            granulationTissueScale: "",
            surroundingSkin: "",
            edges: "",
            inflammatorySigns: true,
            observations: "",
            products: "",
            exudatePresent: false,
            odorPresent: false,
            edgesPresent: false,
            painPresent: false,
            openDialogSaveProducts: false,
            productToAdd: "",
            productAddToList: false,
            refresh: false,
            isExpanded: false,
            width: 0,
            showLabelsSlider: true,
            changeScroll: -1,
            expansionPanelOpen: false
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.resizeHeaderOnScroll);
        window.addEventListener("resize", this.handleResize);
        this.updateWindowDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.resizeHeaderOnScroll);
        window.removeEventListener("resize", this.handleResize);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.woundInfo.indexInterventionSelected !== prevState.index || nextProps.woundInfo.interventionChange.interventionID !== prevState.interventionID) {
            return {
                index: nextProps.woundInfo.indexInterventionSelected,
                canUserEdit: nextProps.canUserEdit,
                WoundID: nextProps.woundInfo.WoundID,
                patientID: nextProps.woundInfo.patientID,
                isPresentOnAdmission: nextProps.woundInfo.interventionChange.isPresentOnAdmission,
                interventionID: nextProps.woundInfo.interventionChange.interventionID,
                category: nextProps.woundInfo.interventionChange.category,
                // (SJR) - Type Wounds Table
                //typology: nextProps.woundInfo.interventionChange.typology,
                typology: isDefined(nextProps.woundInfo.interventionChange.typology) ? nextProps.woundInfo.interventionChange.typology.type : "",
                hasCategory: isDefined(nextProps.woundInfo.interventionChange.typology) ? nextProps.woundInfo.interventionChange.typology.hasCategory : false,
                typologyID: isDefined(nextProps.woundInfo.interventionChange.typology) ? nextProps.woundInfo.interventionChange.typology.id : 0,
                dimensionLength: nextProps.woundInfo.interventionChange.dimensionLength,
                dimensionWidth: nextProps.woundInfo.interventionChange.dimensionWidth,
                dimensionDepth: nextProps.woundInfo.interventionChange.dimensionDepth,
                dimensionLoca: nextProps.woundInfo.interventionChange.dimensionLoca,
                dimensionResult: nextProps.woundInfo.interventionChange.dimensionResult,
                exudateType: nextProps.woundInfo.interventionChange.exudateType,
                exudateQuantaty: nextProps.woundInfo.interventionChange.exudateQuantaty,
                exudateSmellQuantaty: nextProps.woundInfo.interventionChange.exudateSmellQuantaty,
                exudateSmaellType: nextProps.woundInfo.interventionChange.exudateSmaellType,
                painScale1: nextProps.woundInfo.interventionChange.painScale1,
                painScale2: nextProps.woundInfo.interventionChange.painScale2,
                epithelialTissueScale: nextProps.woundInfo.interventionChange.epithelialTissueScale,
                fibrinTissueScale: nextProps.woundInfo.interventionChange.fibrinTissueScale,
                necroticTissueScale: nextProps.woundInfo.interventionChange.necroticTissueScale,
                devitalizedTissueScale: nextProps.woundInfo.interventionChange.devitalizedTissueScale,
                granulationTissueScale: nextProps.woundInfo.interventionChange.granulationTissueScale,
                surroundingSkin: nextProps.woundInfo.interventionChange.surroundingSkin,
                edges: nextProps.woundInfo.interventionChange.edges,
                inflammatorySigns: nextProps.woundInfo.interventionChange.inflammatorySigns,
                observations: nextProps.woundInfo.interventionChange.observations,
                products: nextProps.woundInfo.interventionChange.products,
                exudatePresent: nextProps.woundInfo.interventionChange.exudatePresent,
                odorPresent: nextProps.woundInfo.interventionChange.odorPresent,
                edgesPresent: nextProps.woundInfo.interventionChange.edgesPresent,
                painPresent: nextProps.woundInfo.interventionChange.painPresent,
            }
        }
        else if (nextProps.canUserEdit !== prevState.canUserEdit ||
            nextProps.woundInfo.WoundID !== prevState.WoundID ||
            nextProps.woundInfo.patientID !== prevState.patientID ||
            nextProps.woundInfo.interventionChange.interventionID !== prevState.interventionID
        ) {
            return {
                canUserEdit: nextProps.canUserEdit,
                WoundID: nextProps.woundInfo.WoundID,
                patientID: nextProps.woundInfo.patientID,
                isPresentOnAdmission: nextProps.woundInfo.interventionChange.isPresentOnAdmission,
                interventionID: nextProps.woundInfo.interventionChange.interventionID,
                category: nextProps.woundInfo.interventionChange.category,
                // (SJR) - Type Wounds Table
                //typology: nextProps.woundInfo.interventionChange.typology,
                typology: isDefined(nextProps.woundInfo.interventionChange.typology) ? nextProps.woundInfo.interventionChange.typology.type : "",
                hasCategory: isDefined(nextProps.woundInfo.interventionChange.typology) ? nextProps.woundInfo.interventionChange.typology.hasCategory : false,
                typologyID: isDefined(nextProps.woundInfo.interventionChange.typology) ? nextProps.woundInfo.interventionChange.typology.id : 0,
                dimensionLength: nextProps.woundInfo.interventionChange.dimensionLength,
                dimensionWidth: nextProps.woundInfo.interventionChange.dimensionWidth,
                dimensionDepth: nextProps.woundInfo.interventionChange.dimensionDepth,
                dimensionLoca: nextProps.woundInfo.interventionChange.dimensionLoca,
                dimensionResult: nextProps.woundInfo.interventionChange.dimensionResult,
                exudateType: nextProps.woundInfo.interventionChange.exudateType,
                exudateQuantaty: nextProps.woundInfo.interventionChange.exudateQuantaty,
                exudateSmellQuantaty: nextProps.woundInfo.interventionChange.exudateSmellQuantaty,
                exudateSmaellType: nextProps.woundInfo.interventionChange.exudateSmaellType,
                painScale1: nextProps.woundInfo.interventionChange.painScale1,
                painScale2: nextProps.woundInfo.interventionChange.painScale2,
                epithelialTissueScale: nextProps.woundInfo.interventionChange.epithelialTissueScale,
                fibrinTissueScale: nextProps.woundInfo.interventionChange.fibrinTissueScale,
                necroticTissueScale: nextProps.woundInfo.interventionChange.necroticTissueScale,
                devitalizedTissueScale: nextProps.woundInfo.interventionChange.devitalizedTissueScale,
                granulationTissueScale: nextProps.woundInfo.interventionChange.granulationTissueScale,
                surroundingSkin: nextProps.woundInfo.interventionChange.surroundingSkin,
                edges: nextProps.woundInfo.interventionChange.edges,
                inflammatorySigns: nextProps.woundInfo.interventionChange.inflammatorySigns,
                observations: nextProps.woundInfo.interventionChange.observations,
                products: nextProps.woundInfo.interventionChange.products,
                exudatePresent: nextProps.woundInfo.interventionChange.exudatePresent,
                odorPresent: nextProps.woundInfo.interventionChange.odorPresent,
                edgesPresent: nextProps.woundInfo.interventionChange.edgesPresent,
                painPresent: nextProps.woundInfo.interventionChange.painPresent,
            }
        }
        else return null;
    }

    componentDidUpdate() {
        if (this.props.saveInProgress) {
            var doc = document.getElementById("buttonAddTreatments")
            var text = document.getElementById("addProduct")
            if (!doc.disable & text.value !== "" & !this.state.productAddToList) {
                if (!this.state.openDialogSaveProducts) {
                    this.setState({ openDialogSaveProducts: true, productToAdd: text.value })
                }
            }
            else {
                let sliderEpithelialTissue = document.getElementsByName("sliderEpithelialTissue");
                let epithelialTissueScale = this.state.epithelialTissueScale
                if (isDefined(sliderEpithelialTissue) && sliderEpithelialTissue.length > 0) {
                    epithelialTissueScale = sliderEpithelialTissue[0].value
                }

                let sliderFibrinTissue = document.getElementsByName("sliderFibrinTissue");
                let fibrinTissueScale = this.state.fibrinTissueScale
                if (isDefined(sliderFibrinTissue) && sliderFibrinTissue.length > 0) {
                    fibrinTissueScale = sliderFibrinTissue[0].value
                }

                let sliderNecroticTissue = document.getElementsByName("sliderNecroticTissue");
                let necroticTissueScale = this.state.necroticTissueScale
                if (isDefined(sliderNecroticTissue) && sliderNecroticTissue.length > 0) {
                    necroticTissueScale = sliderNecroticTissue[0].value
                }

                let sliderDevitalizedTissue = document.getElementsByName("sliderDevitalizedTissue");
                let devitalizedTissueScale = this.state.devitalizedTissueScale
                if (isDefined(sliderDevitalizedTissue) && sliderDevitalizedTissue.length > 0) {
                    devitalizedTissueScale = sliderDevitalizedTissue[0].value
                }

                let sliderGranulationTissue = document.getElementsByName("sliderGranulationTissue");
                let granulationTissueScale = this.state.granulationTissueScale
                if (isDefined(sliderGranulationTissue) && sliderGranulationTissue.length > 0) {
                    granulationTissueScale = sliderGranulationTissue[0].value
                }

                let values = {
                    id: this.state.interventionID,
                    woundId: this.state.WoundID,
                    patientId: this.state.patientID,
                    category: this.state.category,
                    typology: this.state.typology,
                    typologyID: this.state.typologyID,
                    dimensionLength: this.state.dimensionLength,
                    dimensionWidth: this.state.dimensionWidth,
                    dimensionDepth: this.state.dimensionDepth,
                    dimensionLoca: this.state.dimensionLoca,
                    dimensionResult: this.state.dimensionResult,
                    exudateType: this.state.exudateType,
                    exudateQuantaty: this.state.exudateQuantaty,
                    exudateSmellQuantaty: this.state.exudateSmellQuantaty,
                    exudateSmaellType: this.state.exudateSmaellType,
                    painScale1: this.state.painScale1,
                    painScale2: this.state.painScale2,
                    epithelialTissueScale: epithelialTissueScale,
                    fibrinTissueScale: fibrinTissueScale,
                    necroticTissueScale: necroticTissueScale,
                    devitalizedTissueScale: devitalizedTissueScale,
                    granulationTissueScale: granulationTissueScale,
                    surroundingSkin: this.state.surroundingSkin,
                    edges: this.state.edges === "" ? null : this.state.edges,
                    inflammatorySigns: this.state.inflammatorySigns,
                    observations: this.state.observations,
                    products: this.state.products
                }

                this.props.saveCharacterisation(values)
            }

        } else if (this.state.productAddToList) {
            this.setState({ productAddToList: false })
        } else if (this.state.changeScroll > -1) {
            window.scroll(0, this.state.changeScroll)
            this.setState({ changeScroll: -1 })
        }
    }

    onChangeExpanded() {
        let sliderEpithelialTissue = document.getElementsByName("sliderEpithelialTissue");
        let epithelialTissueScale = this.state.epithelialTissueScale
        if (isDefined(sliderEpithelialTissue) && sliderEpithelialTissue.length > 0) {
            epithelialTissueScale = sliderEpithelialTissue[0].value
        }

        let sliderFibrinTissue = document.getElementsByName("sliderFibrinTissue");
        let fibrinTissueScale = this.state.fibrinTissueScale
        if (isDefined(sliderFibrinTissue) && sliderFibrinTissue.length > 0) {
            fibrinTissueScale = sliderFibrinTissue[0].value
        }

        let sliderNecroticTissue = document.getElementsByName("sliderNecroticTissue");
        let necroticTissueScale = this.state.necroticTissueScale
        if (isDefined(sliderNecroticTissue) && sliderNecroticTissue.length > 0) {
            necroticTissueScale = sliderNecroticTissue[0].value
        }

        let sliderDevitalizedTissue = document.getElementsByName("sliderDevitalizedTissue");
        let devitalizedTissueScale = this.state.devitalizedTissueScale
        if (isDefined(sliderDevitalizedTissue) && sliderDevitalizedTissue.length > 0) {
            devitalizedTissueScale = sliderDevitalizedTissue[0].value
        }

        let sliderGranulationTissue = document.getElementsByName("sliderGranulationTissue");
        let granulationTissueScale = this.state.granulationTissueScale
        if (isDefined(sliderGranulationTissue) && sliderGranulationTissue.length > 0) {
            granulationTissueScale = sliderGranulationTissue[0].value
        }


        let valScroll = window.scrollY

        this.setState({
            showLabelsSlider: !this.state.showLabelsSlider,
            epithelialTissueScale: epithelialTissueScale,
            fibrinTissueScale: fibrinTissueScale,
            necroticTissueScale: necroticTissueScale,
            devitalizedTissueScale: devitalizedTissueScale,
            granulationTissueScale: granulationTissueScale,
            changeScroll: valScroll
        })
        //window.scroll(0,valScroll-2)       
    }

    onChangeExpandedSticky = event => {
        this.setState({
            expansionPanelOpen: !this.state.expansionPanelOpen
        })
    }

    cancelSave() {
        this.setState({
            openDialogSaveProducts: false,
            productToAdd: ""
        })
        this.props.cancelSave()

    }

    addProductAndSave() {
        // Force the click in add button
        document.getElementById("buttonAddTreatments").click();
        this.setState({
            openDialogSaveProducts: false,
            productToAdd: "",
            productAddToList: true
        })
    }

    changeIndexInterventions(inBack) {
        if (inBack) {
            this.props.onChangeInterventionSelected(this.props.woundInfo.indexInterventionSelected - 1)
            //this.setState({ index: this.state.index - 1 })
        } else {
            this.props.onChangeInterventionSelected(this.props.woundInfo.indexInterventionSelected + 1)
            //this.setState({ index: this.state.index + 1 })
        }
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth })
    }

    toogleHeader = (shrinkOn) => {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
            // validar este tamanho!!! 
            headerEl = document.getElementById("characterisationHeader");

        if (headerEl != null) {
            if (distanceY > shrinkOn) {
                headerEl.classList.add("visible-header-characterisation");
                headerEl.classList.remove("hidden-header-characterisation");
            } else {
                headerEl.classList.remove("visible-header-characterisation");
                headerEl.classList.add("hidden-header-characterisation");
            }
        }
    }

    resizeHeaderOnScroll = () => {
        if (this.state.width >= 768 && this.state.width <= 992) {   //parseInt(lgBreakpoint)
            this.toogleHeader(470)
        } else if (this.state.width >= 576 && this.state.width < 768) {
            this.toogleHeader(340)
        } else if (this.state.width < 576) {
            this.toogleHeader(750)
        }
        else {
            this.toogleHeader(408)
        }
    }

    deleteProduct(value) {
        let listProducts = this.state.products;
        listProducts = listProducts.replace(value + ";", "");
        this.setState({
            products: listProducts
        })
    }

    addProduct(value) {
        let listProducts = this.state.products;
        listProducts = listProducts.concat(value + ";")
        this.setState({
            products: listProducts
        })
    }
    handleResize = () => this.setState({ width: window.innerWidth })

    valuetext(value) {
        return `${value} %`;
    }

    clearIntervention = field => event => {
        if (this.props.canUserEdit) {
            switch (field) {
                case INTERVENTION_FIELDS.EXUDATE_QUANTATY:
                    this.setState({
                        exudateQuantaty: "",
                        exudatePresent: (this.state.exudateType !== "" || this.state.exudateSmellQuantaty !== "" || this.state.exudateSmaellType !== "")
                    })
                    break;
                case INTERVENTION_FIELDS.CATEGORY:
                    this.setState({
                        category: ""
                    })
                    break;
                case INTERVENTION_FIELDS.EXUDATE_SMELL_QUANTATY:
                    this.setState({
                        exudateSmellQuantaty: "",
                        odorPresent: (this.state.exudateSmaellType !== ""),
                        exudatePresent: (this.state.exudateType !== "" || this.state.exudateQuantaty !== "" || this.state.exudateSmaellType !== "")
                    })
                    break;
                case INTERVENTION_FIELDS.EXUDATE_SMELL_TYPE:
                    this.setState({
                        exudateSmaellType: "",
                        odorPresent: this.state.exudateSmellQuantaty !== "",
                        exudatePresent: (this.state.exudateType !== "" || this.state.exudateQuantaty !== "" || this.state.exudateSmellQuantaty !== "")
                    });
                    break;
                case INTERVENTION_FIELDS.EDGES:
                    this.setState({
                        edges: "",
                        edgesPresent: false
                    });
                    break;
                default:
                    break;
            }
        }
    }

    handleChangeObservations = value => {
        if (this.props.canUserEdit) {
            this.setState({
                observations: value
            })
        }
    }

    handleChangeExudateOther = value => {
        if (this.props.canUserEdit) {
            let originVal = this.state.exudateType;
            let val = originVal.replace(EXUDATE_TYPE.HEMATICO + ";", '').replace(EXUDATE_TYPE.SEROSO + ";", '').replace(EXUDATE_TYPE.PURULENTO + ";", '').replace(EXUDATE_TYPE.OUTRO, '');
            originVal = originVal.replace(EXUDATE_TYPE.OUTRO + val, "")

            let varExudateType = ""
            if (value === "") {
                varExudateType = originVal
            }
            else {
                varExudateType = "Outro:" + value + ";" + originVal
            }
            this.setState({
                exudateType: varExudateType,
                exudatePresent: (varExudateType !== "" || this.state.exudateQuantaty !== "" || this.state.exudateSmellQuantaty !== "" || this.state.exudateSmaellType !== "")
            })
        }
    }

    handleChangeIntervention = field => event => {
        if (this.props.canUserEdit) {
            switch (field) {
                case INTERVENTION_FIELDS.IS_PRESENT_ON_ADMISSION:
                    this.setState({
                        isPresentOnAdmission: !this.state.isPresentOnAdmission
                    })
                    break;
                case INTERVENTION_FIELDS.CATEGORY:
                    this.setState({
                        category: event.target.value
                    })
                    break;
                case INTERVENTION_FIELDS.DIMENSION_LENGTH:
                    let value = event.target.value
                    if (value < 0) { value = 0 } else if (value > 9999999) { value = 9999999 }
                    this.setState({
                        dimensionLength: value,
                        dimensionResult: (value * this.state.dimensionWidth * this.state.dimensionDepth).toFixed(3)
                    })
                    break;
                case INTERVENTION_FIELDS.DIMENSION_WIDTH:
                    value = event.target.value
                    if (value < 0) { value = 0 } else if (value > 9999999) { value = 9999999 }
                    this.setState({
                        dimensionWidth: value,
                        dimensionResult: (this.state.dimensionLength * value * this.state.dimensionDepth).toFixed(3)
                    })
                    break;
                case INTERVENTION_FIELDS.DIMENSION_DEPTH:
                    value = event.target.value
                    if (value < 0) { value = 0 } else if (value > 9999999) { value = 9999999 }
                    this.setState({
                        dimensionDepth: value,
                        dimensionResult: (this.state.dimensionLength * this.state.dimensionWidth * value).toFixed(3)
                    })
                    break;
                case INTERVENTION_FIELDS.DIMENSION_LOCA:
                    this.setState({
                        dimensionLoca: !this.state.dimensionLoca
                    })
                    break;
                case INTERVENTION_FIELDS.EXUDATE_PRESENT:
                    event.stopPropagation();
                    if (this.state.exudatePresent) {
                        this.setState({
                            exudatePresent: !this.state.exudatePresent,
                            exudateType: "",
                            exudateQuantaty: "",
                            odorPresent: false,
                            exudateSmellQuantaty: "",
                            exudateSmaellType: ""
                        })
                    }
                    else {
                        this.setState({
                            exudatePresent: !this.state.exudatePresent
                        })
                    }
                    break;
                case INTERVENTION_FIELDS.EXUDATE_TYPE_HEM:
                    let varExudateType = this.state.exudateType
                    if (event.target.value !== "true") {

                        varExudateType = varExudateType.concat(EXUDATE_TYPE.HEMATICO + ";")
                        this.setState({
                            exudateType: varExudateType,
                            exudatePresent: true
                        })
                    } else {
                        varExudateType = varExudateType.replace(EXUDATE_TYPE.HEMATICO + ";", "")
                        this.setState({
                            exudateType: varExudateType,
                            exudatePresent: (varExudateType !== "" || this.state.exudateQuantaty !== "" || this.state.exudateSmellQuantaty !== "" || this.state.exudateSmaellType !== "")
                        })
                    }
                    break;
                case INTERVENTION_FIELDS.EXUDATE_TYPE_SER:
                    let varExudateType1 = this.state.exudateType
                    if (event.target.value !== "true") {
                        varExudateType1 = varExudateType1.concat(EXUDATE_TYPE.SEROSO + ";")
                        this.setState({
                            exudateType: varExudateType1,
                            exudatePresent: true
                        })
                    } else {
                        varExudateType1 = varExudateType1.replace(EXUDATE_TYPE.SEROSO + ";", "")
                        this.setState({
                            exudateType: varExudateType1,
                            exudatePresent: (varExudateType1 !== "" || this.state.exudateQuantaty !== "" || this.state.exudateSmellQuantaty !== "" || this.state.exudateSmaellType !== "")
                        })
                    }
                    break;
                case INTERVENTION_FIELDS.EXUDATE_TYPE_PUR:
                    let varExudateType2 = this.state.exudateType
                    if (event.target.value !== "true") {
                        varExudateType2 = varExudateType2.concat(EXUDATE_TYPE.PURULENTO + ";")
                        this.setState({
                            exudateType: varExudateType2,
                            exudatePresent: true
                        })
                    } else {
                        varExudateType2 = varExudateType2.replace(EXUDATE_TYPE.PURULENTO + ";", "")
                        this.setState({
                            exudateType: varExudateType2,
                            exudatePresent: (varExudateType2 !== "" || this.state.exudateQuantaty !== "" || this.state.exudateSmellQuantaty !== "" || this.state.exudateSmaellType !== "")
                        })
                    }
                    break;
                /* case INTERVENTION_FIELDS.EXUDATE_TYPE_OTHER:
                    let originVal = this.state.exudateType;
                    let val = originVal.replace(EXUDATE_TYPE.HEMATICO + ";", '').replace(EXUDATE_TYPE.SEROSO + ";", '').replace(EXUDATE_TYPE.PURULENTO + ";", '').replace(EXUDATE_TYPE.OUTRO, '');
                    originVal = originVal.replace(EXUDATE_TYPE.OUTRO + val, "")

                    if (event.target.value === "") {
                        varExudateType = originVal
                    }
                    else {
                        varExudateType = "Outro:" + event.target.value + ";" + originVal
                    }
                    this.setState({
                        exudateType: varExudateType,
                        exudatePresent: (varExudateType !== "" || this.state.exudateQuantaty !== "" || this.state.exudateSmellQuantaty !== "" || this.state.exudateSmaellType !== "")
                    })
                    break; */
                case INTERVENTION_FIELDS.EXUDATE_QUANTATY:
                    this.setState({
                        exudateQuantaty: event.target.value,
                        exudatePresent: (this.state.exudateType !== "" || event.target.value !== "" || this.state.exudateSmellQuantaty !== "" || this.state.exudateSmaellType !== "")
                    })
                    break;
                case INTERVENTION_FIELDS.ODOR_PRESENT:
                    if (this.state.odorPresent) {
                        this.setState({
                            odorPresent: false,
                            exudateSmellQuantaty: "",
                            exudateSmaellType: "",
                            exudatePresent: (this.state.exudateType !== "" || this.state.exudateQuantaty !== "")
                        })
                    }
                    else {
                        this.setState({
                            odorPresent: true,
                            exudatePresent: true
                        })
                    }
                    break;
                case INTERVENTION_FIELDS.EXUDATE_SMELL_QUANTATY:
                    this.setState({
                        exudateSmellQuantaty: event.target.value,
                        odorPresent: (event.target.value !== "" || this.state.exudateSmaellType !== ""),
                        exudatePresent: (this.state.exudateType !== "" || this.state.exudateQuantaty !== "" || event.target.value !== "" || this.state.exudateSmaellType !== "")
                    })
                    break;
                case INTERVENTION_FIELDS.EXUDATE_SMELL_TYPE:
                    this.setState({
                        exudateSmaellType: event.target.value,
                        odorPresent: (this.state.exudateSmellQuantaty !== "" || event.target.value !== ""),
                        exudatePresent: (this.state.exudateType !== "" || this.state.exudateQuantaty !== "" || this.state.exudateSmellQuantaty !== "" || event.target.value !== "")
                    })
                    break;
                case INTERVENTION_FIELDS.PAIN_PRESENT:
                    event.stopPropagation();
                    if (this.state.painPresent) {
                        this.setState({
                            painPresent: !this.state.painPresent,
                            painScale1: null,
                            painScale2: null
                        })
                    } else {
                        this.setState({
                            painPresent: !this.state.painPresent,
                        })
                    }
                    break;
                case INTERVENTION_FIELDS.PAIN_SCALE_1:
                    this.setState({
                        painScale1: parseInt(event.target.value),
                        painScale2: null,
                        painPresent: true
                    })
                    break;
                case INTERVENTION_FIELDS.PAIN_SCALE_2:
                    this.setState({
                        painScale2: parseInt(event.target.value),
                        painScale1: null,
                        painPresent: true
                    })
                    break;
                case INTERVENTION_FIELDS.SURROUNDING_SKIN_INTACT:
                    let varSkin = this.state.surroundingSkin;

                    if (event.target.value !== "true") {
                        varSkin = varSkin.concat(SURROUNDING_SKIN.INTEGRA + ";")
                    } else {
                        varSkin = varSkin.replace(SURROUNDING_SKIN.INTEGRA + ";", "")
                    }
                    this.setState({
                        surroundingSkin: varSkin
                    })
                    break;
                case INTERVENTION_FIELDS.SURROUNDING_SKIN_RED:
                    let varSkinRed = this.state.surroundingSkin;
                    if (event.target.value !== "true") {
                        varSkinRed = varSkinRed.concat(SURROUNDING_SKIN.RUBORIZADA + ";")
                    } else {
                        varSkinRed = varSkinRed.replace(SURROUNDING_SKIN.RUBORIZADA + ";", "")
                    }
                    this.setState({
                        surroundingSkin: varSkinRed
                    })
                    break;
                case INTERVENTION_FIELDS.SURROUNDING_SKIN_MACERATED:
                    let varSkinMac = this.state.surroundingSkin;
                    if (event.target.value !== "true") {
                        varSkinMac = varSkinMac.concat(SURROUNDING_SKIN.MACERADA + ";")
                    } else {
                        varSkinMac = varSkinMac.replace(SURROUNDING_SKIN.MACERADA + ";", "")
                    }
                    this.setState({
                        surroundingSkin: varSkinMac
                    })
                    break;
                case INTERVENTION_FIELDS.SURROUNDING_SKIN_DRY:
                    let varSkinDry = this.state.surroundingSkin;
                    if (event.target.value !== "true") {
                        varSkinDry = varSkinDry.concat(SURROUNDING_SKIN.SECA + ";")
                    } else {
                        varSkinDry = varSkinDry.replace(SURROUNDING_SKIN.SECA + ";", "")
                    }
                    this.setState({
                        surroundingSkin: varSkinDry
                    })
                    break;
                case INTERVENTION_FIELDS.SURROUNDING_SKIN_DESQUAMATION:
                    let varSkinDesq = this.state.surroundingSkin;
                    if (event.target.value !== "true") {
                        varSkinDesq = varSkinDesq.concat(SURROUNDING_SKIN.DESCAMATIVA + ";")
                    } else {
                        varSkinDesq = varSkinDesq.replace(SURROUNDING_SKIN.DESCAMATIVA + ";", "")
                    }
                    this.setState({
                        surroundingSkin: varSkinDesq
                    })
                    break;
                case INTERVENTION_FIELDS.EDGES_PRESENT:
                    event.stopPropagation();
                    if (this.state.edgesPresent) {
                        this.setState({
                            edges: "",
                            edgesPresent: !this.state.edgesPresent
                        })
                    }
                    else {
                        this.setState({
                            edgesPresent: !this.state.edgesPresent
                        })
                    }
                    break;
                case INTERVENTION_FIELDS.EDGES:
                    this.setState({
                        edges: event.target.value,
                        edgesPresent: (event.target.value !== "")
                    })
                    break;
                case INTERVENTION_FIELDS.INFLAMATORY_SIGNS:
                    event.stopPropagation();
                    this.setState({
                        inflammatorySigns: !this.state.inflammatorySigns
                    })
                    break;
                /*                 case INTERVENTION_FIELDS.OBSERVATIONS:
                                    this.setState({
                                        observations: event.target.value
                                    })
                                    break; */
                default:
                    break;
            }
        }
    };

    render() {
        const { t } = this.props;
        let listDatesOfIntervention = []
        let listInterventions = this.props.woundInfo.interventions || []
        const listInternments = this.props.patient.Internments || []
        listInterventions.map(option => (
            listDatesOfIntervention = listDatesOfIntervention.concat([{ date: option.createdAt, id: option.id }])
            //listDatesOfIntervention = listDatesOfIntervention.concat([{ date: option.woundPhoto[0].createdAt, id: option.woundPhoto[0].interventionId }])
        ))

        let AtualDate;

        if (listDatesOfIntervention.length > 0) { AtualDate = listDatesOfIntervention[this.props.woundInfo.indexInterventionSelected].date }

        //Profissionais
        var healthProfissionalService = this.props.login.listOfUsersInstitution || []
        //adicionar o proprio
        var currentProfissional = [{ rowKey: this.props.login.email, name: this.props.login.userName }]
        healthProfissionalService = healthProfissionalService.concat(currentProfissional)
        // ordenar o array
        healthProfissionalService.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); // ordenar por nome
        //var healthProfessionals1 = healthProfissionalService.filter(function (value) { return value.name !== 'WinGCS' })
        var healthProfessionals1 = healthProfissionalService

        let products_array
        let showCategory
        let professionalIntervention

        if (listInterventions[this.state.index] !== undefined && listInterventions[this.state.index] !== null) {
            if (this.state.products) {
                products_array = this.state.products.split(';')
                products_array = products_array.filter(function (value) { return value !== "" })
            } else {
                products_array = []
            }

            /* (SJR) - Type Wounds Table */
            //showCategory = (this.state.typology === TYPE_WOUND_WITH_CATEGORY_PT || this.state.typology === TYPE_WOUND_WITH_CATEGORY_EN)
            if (isDefined(this.state.hasCategory)) {
                showCategory = this.state.hasCategory
            } else {
                showCategory = false
            }

            professionalIntervention = listInterventions[this.state.index].createdBy.toUpperCase()

            professionalIntervention = healthProfessionals1.filter(function (value) { return (value.rowKey != null && value.rowKey.toUpperCase() === professionalIntervention) })
            if (professionalIntervention.length > 0) {
                professionalIntervention = professionalIntervention[0].name
            } else {
                if (isDefined(listInterventions[this.state.index].createdByName)) {
                    professionalIntervention = listInterventions[this.state.index].createdByName
                } else {
                    professionalIntervention = listInterventions[this.state.index].createdBy.toUpperCase()
                }
            }
        } else {
            products_array = []
            showCategory = false
            professionalIntervention = ""
        }

        const marks = [
            {
                value: 0,
                label: "0%"
            },
            {
                value: 20,
                label: "20%"
            },
            {
                value: 40,
                label: "40%"
            },
            {
                value: 60,
                label: "60%"
            },
            {
                value: 80,
                label: "80%"
            },
            {
                value: 100,
                label: "100%"
            }
        ];


        let renderRadioGroup = ({ input, ...rest }) => (
            <FormControl component="fieldset" >
                < RadioGroup {...input} {...rest} value={rest.value2} >

                </RadioGroup >
            </FormControl>)

        let renderCheckBoxGroup = ({ input, ...rest }) => (
            <FormControl component="fieldset" >
                <FormLabel component="label" >{rest.labelText}</FormLabel>
                <FormGroup {...input} {...rest} >
                </FormGroup>
                <TextField disable id="other" value={rest.labelOther} className={rest.display} />
            </FormControl>
        )

        return (
            <>
                <HeaderInfoPatient
                    patientName={this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.name : ""}
                    patientType={this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.type : ""}
                    patientIdentification={this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.identification : ""}
                    patientBirthDate={this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.birthDate : ""}
                    patientGender={this.props.patient.PatientInfo != null ? this.props.patient.PatientInfo.gender : ""}
                    bed={listInternments.length > 0 ? listInternments[0].bed : ""}
                    room={listInternments.length > 0 ? listInternments[0].room : ""}
                    traduction={t}
                    yAxisMdToogleHeader={360}
                    yAxisXsToogleHeader={609}
                    yAxisLgToogleHeader={357}
                    stickyContainerClass="sticky-container"
                >

                    <div id="characterisationHeader" className="hidden-header-characterisation sticky-characterisationHeader">
                        <ExpansionPanel className="pl-lg-4 shadow-nav" expanded={this.state.width >= 992 ? true : this.state.expansionPanelOpen} onChange={(v) => this.onChangeExpandedSticky(v)}>
                            <ExpansionPanelSummary
                                className="pl-2 d-lg-none"
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                aria-label="Expand"
                                id="panel1a-header">
                                <Typography variant="caption" className="roboto-bold name-info-card py-3 pr-2 d-block m-0 name-line-height my-auto">
                                    {t('CharacterisationDate')}
                                </Typography>

                                <ButtonBase
                                    disableRipple
                                    disableTouchRipple
                                    focusRipple
                                    variant="contained"
                                    type="submit"
                                    ariaLabel="Go back"
                                    className={this.props.woundInfo.indexInterventionSelected === 0 ? "disabled-arrow pl-4 pr-1" : "pl-4 pr-1"}
                                    onClick={(event) => { this.changeIndexInterventions(true); event.stopPropagation() }}
                                    onFocus={event => event.stopPropagation()}
                                    disabled={this.props.canUserEdit ? true : this.props.woundInfo.indexInterventionSelected === 0}>
                                    <IconButton size="small" className="mr-1" color="primary">
                                        <ArrowBackIosIcon />
                                    </IconButton>
                                </ButtonBase>
                                <Moment className="my-auto MuiTypography-caption" format="DD.MM.YYYY HH:mm">{AtualDate}</Moment>
                                <ButtonBase
                                    className={this.props.woundInfo.indexInterventionSelected === (listDatesOfIntervention.length - 1) ? "disabled-arrow pl-3" : "pl-3"}
                                    disableRipple
                                    disableTouchRipple
                                    focusRipple
                                    ariaLabel="Go ahead"
                                    variant="contained"
                                    type="submit"
                                    onClick={(event) => { this.changeIndexInterventions(false); event.stopPropagation() }}
                                    onFocus={event => event.stopPropagation()}
                                    disabled={this.props.canUserEdit ? true : this.props.woundInfo.indexInterventionSelected === (listDatesOfIntervention.length - 1)}
                                >
                                    <IconButton size="small" className="mr-1" color="primary">
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </ButtonBase>

                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails className="no-padding-y border-mobile px-4">
                                <div className="mobile-flex-none d-flex justify-content-center position-relative">
                                    <div className="py-1 d-none border-right-soft d-lg-flex">

                                        <Typography variant="caption" className="roboto-bold name-info-card py-3 pr-2 name-line-height my-auto">
                                            {t('CharacterisationDate')}
                                        </Typography>

                                        <ButtonBase
                                            disableRipple
                                            disableTouchRipple
                                            focusRipple
                                            variant="contained"
                                            type="submit"
                                            onClick={v => this.changeIndexInterventions(true)}
                                            disabled={this.props.canUserEdit ? true : this.props.woundInfo.indexInterventionSelected === 0}>
                                            <IconButton size="small" className="mr-1" color="primary">
                                                <ArrowBackIosIcon />
                                            </IconButton>
                                        </ButtonBase>

                                        <Moment className="my-auto MuiTypography-caption" format="DD.MM.YYYY HH:mm">{AtualDate}</Moment>

                                        <ButtonBase
                                            className="pr-5"
                                            disableRipple
                                            disableTouchRipple
                                            focusRipple
                                            variant="contained"
                                            type="submit"
                                            onClick={v => this.changeIndexInterventions(false)}
                                            disabled={this.props.canUserEdit ? true : this.props.woundInfo.indexInterventionSelected === (listDatesOfIntervention.length - 1)}>
                                            <IconButton size="small" className="mr-1" color="primary">
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                        </ButtonBase>

                                    </div>

                                    <div className="px-lg-5 pr-md-5 pt-3 pb-1 py-sm-3 pr-2 center-item border-right-soft">
                                        <Typography variant="caption" className="font-weight-light my-auto"> <span className="roboto-bold pr-2">{t('NextIntervention')} </span>  <Typography fontFamily="Roboto" variant="caption"><Moment format="DD.MM.YYYY">{this.props.woundInfo.nextIntervention}</Moment></Typography></Typography>
                                    </div>

                                    <div className="px-lg-5 px-md-5 py-1 py-sm-3 center-item border-right-soft" hidden={!showCategory}>
                                        <Typography fontFamily="Roboto" variant="caption" className="pr-4 font-weight-light my-auto" hidden={!showCategory}>
                                            <span className="roboto-bold pr-2"> {t('WoundsTerms.Category')}</span>
                                            <span className="mt-3 text-uppercase font-size-category-header">{listInterventions[this.state.index] !== undefined ? (listInterventions[listInterventions.length - 1].category === "null" ? "" : t('WoundsTerms.' + listInterventions[listInterventions.length - 1].category)) : ""}</span>
                                        </Typography>
                                    </div>

                                    <div className="px-lg-5 px-md-5 pr-0 pt-1 pb-3 py-sm-3 center-item">
                                        <Typography fontFamily="Roboto" variant="caption" className="font-weight-light my-auto pr-lg-5 pr-0" > <span className="roboto-bold pr-2"> {t('Professional')}</span>  {professionalIntervention} </Typography>
                                    </div>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>

                </HeaderInfoPatient>

                <div className="container pb-md-2 pb-5">
                    {/* CharacterisationDate */}
                    <ExpansionPanel defaultExpanded={true} className="card-shadow border-radius-card custom-expanded-margin characterization-date-summary">
                        <ExpansionPanelSummary
                            className="d-lg-none pl-2 characterization-date-res"
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            aria-label="Expand"
                            id="panel1a-header">
                            <div className="my-auto characterization-date-title">
                                <Typography variant="subtitle2" className="d-inline font-weight-bold my-auto">
                                    {t('CharacterisationDate')}
                                </Typography>
                            </div>
                            <div>
                                <ButtonBase
                                    disableRipple
                                    disableTouchRipple
                                    focusRipple
                                    variant="contained"
                                    type="submit"
                                    className={this.props.woundInfo.indexInterventionSelected === 0 ? "disabled-arrow ml-0 ml-md-4 date-controls-sm-fix" : "ml-0 ml-md-4 date-controls-sm-fix"}
                                    ariaLabel="Go back"
                                    onClick={(event) => { this.changeIndexInterventions(true); event.stopPropagation() }}
                                    onFocus={event => event.stopPropagation()}
                                    disabled={this.props.canUserEdit ? true : this.props.woundInfo.indexInterventionSelected === 0}>
                                    <IconButton fontSize="small" color="primary">
                                        <ArrowBackIosIcon className="arrow-icon-size" />
                                    </IconButton>
                                </ButtonBase>

                                <Moment className="my-auto font-size-14-px" format="DD.MM.YYYY HH:mm">{AtualDate}</Moment>

                                <ButtonBase
                                    disableRipple
                                    disableTouchRipple
                                    focusRipple
                                    variant="contained"
                                    type="submit"
                                    ariaLabel="Go ahead"
                                    onClick={(event) => { this.changeIndexInterventions(false); event.stopPropagation() }}
                                    onFocus={event => event.stopPropagation()}
                                    className={this.props.woundInfo.indexInterventionSelected === (listDatesOfIntervention.length - 1) ? "disabled-arrow" : ""}
                                    disabled={this.props.canUserEdit ? true : this.props.woundInfo.indexInterventionSelected === (listDatesOfIntervention.length - 1)}
                                >
                                    <IconButton fontSize="small" color="primary">
                                        <ArrowForwardIosIcon className="arrow-icon-size" />
                                    </IconButton>
                                </ButtonBase>
                            </div>

                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="no-padding-y border-mobile py-3 py-md-0">
                            <div className="mobile-flex-none d-flex justify-content-center position-relative">
                                <div className="py-1 border-right-card-first-panel ipad-pro-fix-wound-date center-item d-none d-lg-flex flex-grow-1">
                                    <div className="my-auto">

                                        <Typography variant="subtitle2" className="d-inline font-weight-bold my-auto">
                                            {t('CharacterisationDate')}
                                        </Typography>

                                        <ButtonBase
                                            disableRipple
                                            disableTouchRipple
                                            focusRipple
                                            variant="contained"
                                            type="submit"
                                            className="ml-4"
                                            onClick={v => this.changeIndexInterventions(true)}
                                            disabled={this.props.canUserEdit ? true : this.props.woundInfo.indexInterventionSelected === 0}>

                                            <IconButton fontSize="small" color="primary">
                                                <ArrowBackIosIcon className="arrow-icon-size" />
                                            </IconButton>
                                        </ButtonBase>

                                        <Moment style={{ fontSize: 12 }} className="my-auto" format="DD.MM.YYYY HH:mm">{AtualDate}</Moment>

                                        <ButtonBase
                                            disableRipple
                                            disableTouchRipple
                                            focusRipple
                                            variant="contained"
                                            type="submit"
                                            onClick={v => this.changeIndexInterventions(false)}
                                            disabled={this.props.canUserEdit ? true : this.props.woundInfo.indexInterventionSelected === (listDatesOfIntervention.length - 1)}>
                                            <IconButton fontSize="small" color="primary">
                                                <ArrowForwardIosIcon className="arrow-icon-size" />
                                            </IconButton>
                                        </ButtonBase>

                                    </div>
                                </div>

                                <div className="my-lg-0 my-md-auto py-3 pb-1 pb-md-3 pr-2 center-item border-right-card-first-panel d-lg-flex px-lg-5 flex-grow-1">
                                    <div className="my-lg-auto my-md-0">
                                        <Typography variant="subtitle2" className="d-inline font-weight-bold pr-2">
                                            {this.props.woundInfo.isClosed ? t('WoundHealingDate') : t('NextIntervention')}
                                        </Typography>
                                        <Typography variant="subtitle2" className="d-inline pr-2">
                                            <Moment format="DD.MM.YYYY">{this.props.woundInfo.isClosed ? this.props.woundInfo.closedAt : this.props.woundInfo.nextIntervention}</Moment>
                                        </Typography>
                                    </div>
                                </div>

                                <div className="category-container  my-md-auto center-item border-right-card-first-panel px-lg-5 flex-grow-1" hidden={!showCategory}>
                                    <div className="my-lg-auto my-md-0">
                                        <Typography variant="subtitle2" className="d-inline font-weight-bold pr-3 vertical-align"> {t('WoundsTerms.Category')}</Typography>
                                        <span className="text-uppercase font-size-category-card">{listInterventions[this.state.index] !== undefined ? (listInterventions[listInterventions.length - 1].category === "null" ? "" : t('WoundsTerms.' + listInterventions[listInterventions.length - 1].category)) : ""}</span>
                                    </div>
                                </div>

                                <div className="py-3 pt-1 pt-md-3 my-md-auto center-item px-lg-5 flex-grow-1">
                                    <Typography variant="subtitle2" className="pr-3 d-inline font-weight-bold">{t('Professional')}</Typography>
                                    <Typography variant="subtitle2" className="d-inline pr-2">{professionalIntervention}</Typography>
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded={true} className="card-shadow border-radius-card custom-expanded-margin">

                        {/* PresentDateAdmission */}
                        <ExpansionPanelDetails className="no-padding-y">
                            <Row>
                                <Col md={4} lg={3} className="pb-4 pb-md-2 py-2 border-right-card">
                                    <Typography variant="subtitle2" className="font-weight-bold pt-2 " >
                                        {t('WoundsTerms.PresentDateAdmission')}
                                    </Typography>

                                    <div className="d-flex pt-1">
                                        <Typography className={`my-auto ${!this.state.isPresentOnAdmission ? "set-color-text" : "set-color-disabled"}`} variant="subtitle2">{t('No')}</Typography>
                                        <CharacterizationSwitch
                                            checked={this.state.isPresentOnAdmission}
                                            color="default"
                                            className={this.state.isPresentOnAdmission ? "set-color-primary" : null}
                                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                                            // Apenas é registado/alterado na 1ª intervenção
                                            //disabled={this.props.canUserEdit ? (this.state.index === 0 ? false : true) : true}
                                            disabled={true}
                                            onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.IS_PRESENT_ON_ADMISSION)}
                                        />
                                        <Typography className={`my-auto ${this.state.isPresentOnAdmission ? "set-color-text" : "set-color-disabled"}`} variant="subtitle2">{t('Yes')}</Typography>
                                    </div>
                                </Col>

                                {/* Category */}
                                <Col md={8} lg={3} className="py-4 pb-md-2 pt-lg-2 pt-md-0 category-container border-right-card" hidden={!showCategory}>
                                    <div>
                                        <Typography variant="subtitle2" className="font-weight-bold pt-2 pt-md-3 pt-lg-2">
                                            {t('WoundsTerms.Category')}
                                        </Typography>
                                        <Field component={renderRadioGroup} row aria-label="Category" name="Category"
                                            value2={this.state.category}
                                            onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.CATEGORY)}
                                        >
                                            <FormControlLabel value="1" className={this.state.category === "1" ? "checked-input" : ""} control={<Radio color="default" className={this.state.category === "1" ? "set-color-primary" : ""} />} label="I" disabled={this.props.canUserEdit ? false : true} />
                                            <FormControlLabel value="2" className={this.state.category === "2" ? "checked-input" : ""} control={<Radio color="default" className={this.state.category === "2" ? "set-color-primary" : ""} />} label="II" disabled={this.props.canUserEdit ? false : true} />
                                            <FormControlLabel value="3" className={this.state.category === "3" ? "checked-input" : ""} control={<Radio color="default" className={this.state.category === "3" ? "set-color-primary" : ""} />} label="III" disabled={this.props.canUserEdit ? false : true} />
                                            <FormControlLabel value="4" className={this.state.category === "4" ? "checked-input clean-right-margin" : "clean-right-margin"} control={<Radio color="default" className={this.state.category === "4" ? "set-color-primary" : ""} />} label="IV" disabled={this.props.canUserEdit ? false : true} />
                                        </Field>
                                    </div>
                                    <Link className="d-block clean-option w-100" hidden={this.props.canUserEdit ? false : true} onClick={this.clearIntervention(INTERVENTION_FIELDS.CATEGORY)}>{t('CleanSelectedOption')}</Link>
                                </Col>

                                <Col md={12} lg={!showCategory ? 8 : 6} xl={6} className="pb-4 py-2 pt-4 pt-md-2 border-mobile">

                                    <Typography variant="subtitle2" className="font-weight-bold py-2">
                                        {t('WoundsTerms.Size_cm')}
                                    </Typography>

                                    <TextField
                                        className="mr-4 textfield-dimension"
                                        label={t('WoundsTerms.Length_S')}
                                        InputLabelProps={{ shrink: true }}
                                        id="length"
                                        disabled={this.props.canUserEdit ? false : true}
                                        type="number"
                                        inputProps={{
                                            min: 0,
                                            step: 0.001,
                                            max: 9999999
                                        }}
                                        value={this.state.dimensionLength}
                                        onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.DIMENSION_LENGTH)}
                                    />

                                    <TextField
                                        className="mr-4 textfield-dimension"
                                        label={t('WoundsTerms.Width_S')}
                                        id="width"
                                        disabled={this.props.canUserEdit ? false : true}
                                        type="number"
                                        inputProps={{
                                            min: 0,
                                            step: 0.001,
                                            max: 9999999
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        value={this.state.dimensionWidth}
                                        onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.DIMENSION_WIDTH)}
                                    />

                                    <TextField
                                        className="mr-1 textfield-dimension"
                                        label={t('WoundsTerms.Depth_S')}
                                        id="depth"
                                        InputLabelProps={{ shrink: true }}
                                        disabled={this.props.canUserEdit ? false : true}
                                        type="number"
                                        inputProps={{
                                            min: 0,
                                            step: 0.001,
                                            max: 9999999
                                        }}
                                        value={this.state.dimensionDepth}
                                        onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.DIMENSION_DEPTH)}
                                    />
                                    <div className="break-line-fix-loca-sizes">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state.dimensionLoca}
                                                    value="loca"
                                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                                    color="default"
                                                    className={this.state.dimensionLoca ? "set-color-primary" : ""}
                                                />}
                                            label={t('WoundsTerms.Local')}
                                            labelPlacement="top"
                                            className={`dimension-radio ${this.state.dimensionLoca ? "checked-input" : ""}`}
                                            disabled={this.props.canUserEdit ? false : true}
                                            onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.DIMENSION_LOCA)}
                                        />

                                        <Box className={`white-space-nowrap dimension-result  ${showCategory ? "ipad-pro-fix-wound-size" : ""}`} fontSize={24} fontWeight={700}>
                                            {t('WoundsTerms.Size_S')} {this.state.dimensionResult === 0 ? "--" : this.state.dimensionResult}
                                        </Box>
                                    </div>
                                </Col>

                            </Row>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    {/* Exudate */}
                    <ExpansionPanel defaultExpanded={true} className="card-shadow border-radius-card custom-expanded-margin">
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            aria-label="Expanded"
                            id="panel1a-header"
                            className="expanded-content-direction-column"
                        >

                            <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="pt-4 pt-md-0 pl-0 d-inline text-uppercase my-auto" title={t("WoundsTerms.Exudate")} />

                            <div className="d-flex pt-1 pl-0 pl-md-5 pb-4 pb-md-0">
                                <Typography className={`my-auto ${!this.state.exudatePresent ? "set-color-text" : "set-color-disabled"}`} variant="subtitle2" onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.EXUDATE_PRESENT)}>{t('WoundsTerms.Absent')}</Typography>
                                <CharacterizationSwitch
                                    checked={this.state.exudatePresent}
                                    className={this.state.exudatePresent ? "set-color-primary" : null}
                                    color="default"
                                    inputProps={{ 'aria-label': 'Present or absent exudate' }}
                                    ariaLabel="Present or absent exudate"
                                    onFocus={event => event.stopPropagation()}
                                    type="input"
                                    disabled={this.props.canUserEdit ? false : true}
                                    onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.EXUDATE_PRESENT)}
                                />
                                <Typography className={`my-auto ${this.state.exudatePresent ? "set-color-text" : "set-color-disabled"}`} variant="subtitle2" onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.EXUDATE_PRESENT)}>{t('WoundsTerms.Present')}</Typography>
                            </div>

                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="no-padding-y pb-4">
                            <Row className="mb-3">
                                <Col sm={6} md={6} lg={4} xl={3} className="pb-4 pb-md-0">
                                    <Typography variant="subtitle2" className="font-weight-bold">
                                        {t('WoundsTerms.Type')}
                                    </Typography>

                                    <FormControlLabel
                                        control={<Checkbox
                                            checked={this.state.exudateType.includes(EXUDATE_TYPE.HEMATICO)}
                                            onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.EXUDATE_TYPE_HEM)}
                                            disabled={this.props.canUserEdit ? false : true}
                                            value={this.state.exudateType.includes(EXUDATE_TYPE.HEMATICO)}
                                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                                            className={this.state.exudateType.includes(EXUDATE_TYPE.HEMATICO) ? "set-color-primary" : ""}
                                            color="default" />}
                                        className={this.state.exudateType.includes(EXUDATE_TYPE.HEMATICO) ? "checked-input" : ""}
                                        label={t('WoundsTerms.TypeHem')} />
                                    <FormControlLabel
                                        control={<Checkbox
                                            checked={this.state.exudateType.includes(EXUDATE_TYPE.SEROSO)}
                                            onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.EXUDATE_TYPE_SER)}
                                            disabled={this.props.canUserEdit ? false : true}
                                            value={this.state.exudateType.includes(EXUDATE_TYPE.SEROSO)}
                                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                                            className={this.state.exudateType.includes(EXUDATE_TYPE.SEROSO) ? "set-color-primary" : ""}
                                            color="default" />}
                                        className={this.state.exudateType.includes(EXUDATE_TYPE.SEROSO) ? "checked-input" : ""}
                                        label={t('WoundsTerms.TypeSer')} />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.exudateType.includes(EXUDATE_TYPE.PURULENTO)}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.EXUDATE_TYPE_PUR)}
                                                disabled={this.props.canUserEdit ? false : true}
                                                value={this.state.exudateType.includes(EXUDATE_TYPE.PURULENTO)}
                                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                                                className={this.state.exudateType.includes(EXUDATE_TYPE.PURULENTO) ? "set-color-primary" : ""}
                                                color="default" />
                                        }
                                        className={this.state.exudateType.includes(EXUDATE_TYPE.PURULENTO) ? "checked-input" : ""}
                                        label={t('WoundsTerms.TypePur')} />

                                    {/* <TextField
                                        disabled={this.props.canUserEdit ? false : true}
                                        InputLabelProps={{ shrink: true }}
                                        className="w-100"
                                        label={t('WoundsType.other')}
                                        value={this.state.exudateType.replace(EXUDATE_TYPE.HEMATICO, '').replace(EXUDATE_TYPE.SEROSO, '').replace(EXUDATE_TYPE.PURULENTO, '').replace(';', '').replace(';', '').replace(';', '').replace(EXUDATE_TYPE.OUTRO, '')}
                                        onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.EXUDATE_TYPE_OTHER)}
                                    /> */}
                                    <WoundsCharacterisationExudateOther
                                        disabled={this.props.canUserEdit ? false : true}
                                        label={t('WoundsType.other')}
                                        value={this.state.exudateType.replace(EXUDATE_TYPE.HEMATICO, '').replace(EXUDATE_TYPE.SEROSO, '').replace(EXUDATE_TYPE.PURULENTO, '').replace(';', '').replace(';', '').replace(';', '').replace(EXUDATE_TYPE.OUTRO, '')}
                                        onBlur={(value) => this.handleChangeExudateOther(value)}
                                    />
                                </Col>

                                <Col sm={6} md={6} lg={4} xl={3}>
                                    <Typography variant="subtitle2" className="font-weight-bold">
                                        {t('WoundsTerms.Amount')}
                                    </Typography>
                                    <Field
                                        component={renderRadioGroup} row aria-label="exsudateAmount" name="exsudateAmount"
                                        value2={this.state.exudateQuantaty}
                                        onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.EXUDATE_QUANTATY)}
                                    >
                                        <FormControlLabel className={this.state.exudateQuantaty === "Reduzida" ? "checked-input" : ""} disabled={this.props.canUserEdit ? false : true} value="Reduzida" control={<Radio color="default" className={this.state.exudateQuantaty === "Reduzida" ? "set-color-primary" : ""} />} label={t('WoundsTerms.LowF')} />
                                        <FormControlLabel className={this.state.exudateQuantaty === "Moderada" ? "checked-input" : ""} disabled={this.props.canUserEdit ? false : true} value="Moderada" control={<Radio color="default" className={this.state.exudateQuantaty === "Moderada" ? "set-color-primary" : ""} />} label={t('WoundsTerms.ModerateF')} />
                                        <FormControlLabel className={this.state.exudateQuantaty === "Elevada" ? "checked-input" : ""} disabled={this.props.canUserEdit ? false : true} value="Elevada" control={<Radio color="default" className={this.state.exudateQuantaty === "Elevada" ? "set-color-primary" : ""} />} label={t('WoundsTerms.HighF')} />
                                    </Field>
                                    <Link className="d-block clean-option w-100" hidden={this.props.canUserEdit ? false : true} onClick={this.clearIntervention(INTERVENTION_FIELDS.EXUDATE_QUANTATY)}>{t('CleanSelectedOption')}</Link>
                                </Col>

                                <Col sm={8} md={9} lg={4} xl={4} className="pt-md-5 py-lg-0">

                                    <div className="d-flex">
                                        <Typography variant="subtitle2" className="my-auto pr-4 font-weight-bold">
                                            {t('WoundsTerms.Odour')}
                                        </Typography>
                                        <Typography className={`my-auto ${!this.state.odorPresent ? "set-color-text" : "set-color-disabled"}`} variant="subtitle2" onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.ODOR_PRESENT)}>{t('WoundsTerms.Absent')}</Typography>
                                        <CharacterizationSwitch
                                            checked={this.state.odorPresent}
                                            color="default"
                                            className={this.state.odorPresent ? "set-color-primary" : null}
                                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                                            disabled={this.props.canUserEdit ? false : true}
                                            onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.ODOR_PRESENT)}
                                        />
                                        <Typography className={`my-auto ${this.state.odorPresent ? "set-color-text" : "set-color-disabled"}`} variant="subtitle2" onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.ODOR_PRESENT)}>{t('WoundsTerms.Present')}</Typography>
                                    </div>

                                    <Typography variant="subtitle2" className="alt-subtitle-crctrzn">
                                        {t('WoundsTerms.Amount')}
                                    </Typography>
                                    <Field component={renderRadioGroup} row aria-label="exsudateOdorAmount" name="exsudateOdorAmount"
                                        value2={this.state.exudateSmellQuantaty}
                                        onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.EXUDATE_SMELL_QUANTATY)}
                                    >
                                        <FormControlLabel className={this.state.exudateSmellQuantaty === "Reduzida" ? "checked-input" : ""} disabled={this.props.canUserEdit ? false : true} value="Reduzida" control={<Radio color="default" className={this.state.exudateSmellQuantaty === "Reduzida" ? "set-color-primary" : ""} />} label={t('WoundsTerms.LowM')} />
                                        <FormControlLabel className={this.state.exudateSmellQuantaty === "Moderada" ? "checked-input" : ""} disabled={this.props.canUserEdit ? false : true} value="Moderada" control={<Radio color="default" className={this.state.exudateSmellQuantaty === "Moderada" ? "set-color-primary" : ""} />} label={t('WoundsTerms.ModerateM')} />
                                        <FormControlLabel className={this.state.exudateSmellQuantaty === "Elevada" ? "checked-input" : ""} disabled={this.props.canUserEdit ? false : true} value="Elevada" control={<Radio color="default" className={this.state.exudateSmellQuantaty === "Elevada" ? "set-color-primary" : ""} />} label={t('WoundsTerms.HighM')} />
                                    </Field>
                                    <Link className="d-block clean-option w-100" hidden={this.props.canUserEdit ? false : true} onClick={this.clearIntervention(INTERVENTION_FIELDS.EXUDATE_SMELL_QUANTATY)}>{t('CleanSelectedOption')}</Link>
                                    <Typography variant="subtitle2" className="alt-subtitle-crctrzn">
                                        {t('WoundsTerms.Type')}
                                    </Typography>

                                    <Field component={renderRadioGroup} row aria-label="exsudateOdorType" name="exsudateOdorType"
                                        value2={this.state.exudateSmaellType}
                                        onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.EXUDATE_SMELL_TYPE)}
                                    >
                                        <FormControlLabel className={this.state.exudateSmaellType === "Fetido" ? "checked-input" : ""} disabled={this.props.canUserEdit ? false : true} value="Fetido" control={<Radio color="default" className={this.state.exudateSmaellType === "Fetido" ? "set-color-primary" : ""} />} label={t('WoundsTerms.Fetid')} />
                                        <FormControlLabel className={this.state.exudateSmaellType === "Caracteristico" ? "checked-input" : ""} disabled={this.props.canUserEdit ? false : true} value="Caracteristico" control={<Radio color="default" className={this.state.exudateSmaellType === "Caracteristico" ? "set-color-primary" : ""} />} label={t('WoundsTerms.Typical')} />
                                        <FormControlLabel className={this.state.exudateSmaellType === "Normal" ? "checked-input" : ""} disabled={this.props.canUserEdit ? false : true} value="Normal" control={<Radio color="default" className={this.state.exudateSmaellType === "Normal" ? "set-color-primary" : ""} />} label={t('WoundsTerms.Normal')} />
                                    </Field>
                                    <Link className="d-block clean-option w-100" hidden={this.props.canUserEdit ? false : true} onClick={this.clearIntervention(INTERVENTION_FIELDS.EXUDATE_SMELL_TYPE)}>{t('CleanSelectedOption')}</Link>
                                </Col>
                            </Row>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    {/* Pain */}
                    <ExpansionPanel defaultExpanded={true} className="card-shadow border-radius-card custom-expanded-margin">
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            aria-label="Expanded"
                            id="panel1a-header"
                            className="expanded-content-direction-column">
                            <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="pt-4 pt-md-0 pl-0 d-inline text-uppercase my-auto" title={t("WoundsTerms.Pain")} />

                            <div className="d-flex pt-1 pl-0 pl-md-5 pb-4 pb-md-0">
                                <Typography className={`my-auto ${!this.state.painPresent ? "set-color-text" : "set-color-disabled"}`} variant="subtitle2" onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_PRESENT)}>{t('WoundsTerms.Absent')}</Typography>
                                <CharacterizationSwitch
                                    checked={this.state.painPresent ? true : false}
                                    className={this.state.painPresent ? "set-color-primary" : null}
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_PRESENT)}
                                    disabled={this.props.canUserEdit ? false : true}
                                    ariaLabel="Present or absent pain"
                                    onFocus={event => event.stopPropagation()}
                                    type="input"
                                />
                                <Typography className={`my-auto ${this.state.painPresent ? "set-color-text" : "set-color-disabled"}`} variant="subtitle2" onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_PRESENT)}>{t('WoundsTerms.Present')}</Typography>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="no-padding-y pb-4">
                            <Row>
                                <Col xs={12}>

                                    <RadioGroup
                                        className="pain-scales-group"
                                        name="spacing"
                                        aria-label="spacing"
                                        value={this.state.painScale1}
                                        row
                                    >
                                        <FormControlLabel
                                            key={'0'}
                                            value={'0'}
                                            disableFocusRipple
                                            disabled={this.props.canUserEdit ? false : true}
                                            className="quantitative-group quantitative-group-index-0"
                                            selected={(this.state.painScale1) === 0}
                                            control={<Checkbox
                                                icon={<Scale0 className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Scale0Active />} color="default"
                                                checked={this.state.painScale1 === 0}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_1)}
                                            />}
                                        //label={value.toString()}
                                        />

                                        <FormControlLabel
                                            key={'1'}
                                            value={'1'}
                                            disableFocusRipple
                                            disabled={this.props.canUserEdit ? false : true}
                                            className="quantitative-group quantitative-group-index-1"
                                            selected={(this.state.painScale1) === 1}
                                            control={<Checkbox
                                                icon={<Scale1 className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Scale1Active />} color="default"
                                                checked={this.state.painScale1 === 1}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_1)}
                                            />}
                                        //label={value.toString()}
                                        />

                                        <FormControlLabel
                                            key={'2'}
                                            value={'2'}
                                            disableFocusRipple
                                            disabled={this.props.canUserEdit ? false : true}
                                            className="quantitative-group quantitative-group-index-2"
                                            selected={(this.state.painScale1) === 2}
                                            control={<Checkbox
                                                icon={<Scale2 className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Scale2Active />} color="default"
                                                checked={this.state.painScale1 === 2}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_1)}
                                            />}
                                        //label={value.toString()}
                                        />

                                        <FormControlLabel
                                            key={'3'}
                                            value={'3'}
                                            disableFocusRipple
                                            disabled={this.props.canUserEdit ? false : true}
                                            className="quantitative-group quantitative-group-index-3"
                                            selected={(this.state.painScale1) === 3}
                                            control={<Checkbox
                                                icon={<Scale3 className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Scale3Active />}
                                                checked={this.state.painScale1 === 3}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_1)}
                                            />}
                                        //label={value.toString()}
                                        />

                                        <FormControlLabel
                                            key={'4'}
                                            value={'4'}
                                            disableFocusRipple
                                            disabled={this.props.canUserEdit ? false : true}
                                            className="quantitative-group quantitative-group-index-4"
                                            selected={(this.state.painScale1) === 4}
                                            control={<Checkbox
                                                icon={<Scale4 className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Scale4Active />} color="default"
                                                checked={this.state.painScale1 === 4}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_1)}
                                            />}

                                        />

                                        <FormControlLabel
                                            key={'5'}
                                            value={'5'}
                                            disableFocusRipple
                                            disabled={this.props.canUserEdit ? false : true}
                                            className="quantitative-group quantitative-group-index-5"
                                            selected={(this.state.painScale1) === 5}
                                            control={<Checkbox
                                                icon={<Scale5 className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Scale5Active />} color="default"
                                                checked={this.state.painScale1 === 5}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_1)}
                                            />}

                                        />

                                        <FormControlLabel
                                            key={'6'}
                                            value={'6'}
                                            disableFocusRipple
                                            disabled={this.props.canUserEdit ? false : true}
                                            className="quantitative-group quantitative-group-index-6"
                                            selected={(this.state.painScale1) === 6}
                                            control={<Checkbox
                                                icon={<Scale6 className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Scale6Active />} color="default"
                                                checked={this.state.painScale1 === 6}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_1)}
                                            />}

                                        />

                                        <FormControlLabel
                                            key={'7'}
                                            value={'7'}
                                            disableFocusRipple
                                            disabled={this.props.canUserEdit ? false : true}
                                            className="quantitative-group quantitative-group-index-7"
                                            selected={(this.state.painScale1) === 7}
                                            control={<Checkbox
                                                icon={<Scale7 className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Scale7Active />} color="default"
                                                checked={this.state.painScale1 === 7}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_1)}
                                            />}

                                        />

                                        <FormControlLabel
                                            key={'8'}
                                            value={'8'}
                                            disableFocusRipple
                                            disabled={this.props.canUserEdit ? false : true}
                                            className="quantitative-group quantitative-group-index-8"
                                            selected={(this.state.painScale1) === 8}
                                            control={<Checkbox
                                                icon={<Scale8 className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Scale8Active />} color="default"
                                                checked={this.state.painScale1 === 8}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_1)}
                                            />}
                                        //label={value.toString()}
                                        />

                                        <FormControlLabel
                                            key={'9'}
                                            value={'9'}
                                            disableFocusRipple
                                            disabled={this.props.canUserEdit ? false : true}
                                            className="quantitative-group quantitative-group-index-9"
                                            selected={(this.state.painScale1) === 9}
                                            control={<Checkbox
                                                icon={<Scale9 className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Scale9Active />} color="default"
                                                checked={this.state.painScale1 === 9}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_1)}
                                            />}
                                        //label={value.toString()}
                                        />

                                        <FormControlLabel
                                            key={'10'}
                                            value={'10'}
                                            disableFocusRipple
                                            disabled={this.props.canUserEdit ? false : true}
                                            className="quantitative-group quantitative-group-index-10"
                                            selected={(this.state.painScale1) === 10}
                                            control={<Checkbox
                                                icon={<Scale10 className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Scale10Active />}
                                                checked={this.state.painScale1 === 10}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_1)}
                                            />}
                                        //label={value.toString()}
                                        />
                                    </RadioGroup>
                                </Col>

                                <Col xs={12}>
                                    <RadioGroup
                                        className="pain-faces-group"
                                        name="spacing"
                                        aria-label="spacing"
                                        value={this.state.painScale2}
                                        row
                                    >
                                        <FormControlLabel
                                            key={'0'}
                                            disabled={this.props.canUserEdit ? false : true}
                                            value={'0'}
                                            control={<Checkbox icon={<Face0 className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Face0Active />}
                                                checked={this.state.painScale2 === 0}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_2)}
                                            />}
                                        />
                                        <FormControlLabel
                                            key={'1'}
                                            disabled={this.props.canUserEdit ? false : true}
                                            value={'1'}
                                            control={<Checkbox icon={<Face1
                                                className={!this.props.canUserEdit ? "opacity-40" : ""} />}
                                                checkedIcon={<Face1Active />}
                                                checked={this.state.painScale2 === 1}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_2)}
                                            />}
                                        />
                                        <FormControlLabel
                                            key={'2'}
                                            disabled={this.props.canUserEdit ? false : true}
                                            value={'2'}
                                            control={<Checkbox icon={<Face2 className={!this.props.canUserEdit ? "opacity-40" : ""} />} checkedIcon={<Face2Active />}
                                                checked={this.state.painScale2 === 2}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_2)}
                                            />}
                                        />
                                        <FormControlLabel
                                            key={'3'}
                                            disabled={this.props.canUserEdit ? false : true}
                                            value={'3'}
                                            control={<Checkbox icon={<Face3 className={!this.props.canUserEdit ? "opacity-40" : ""} />} checkedIcon={<Face3Active />}
                                                checked={this.state.painScale2 === 3}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_2)}
                                            />}
                                        />
                                        <FormControlLabel
                                            key={'4'}
                                            disabled={this.props.canUserEdit ? false : true}
                                            value={'4'}
                                            control={<Checkbox icon={<Face4 className={!this.props.canUserEdit ? "opacity-40" : ""} />} checkedIcon={<Face4Active />}
                                                checked={this.state.painScale2 === 4}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_2)}
                                            />}
                                        />
                                        <FormControlLabel
                                            key={'5'}
                                            disabled={this.props.canUserEdit ? false : true}
                                            value={'5'}
                                            control={<Checkbox icon={<Face5 className={!this.props.canUserEdit ? "opacity-40" : ""} />} checkedIcon={<Face5Active />}
                                                checked={this.state.painScale2 === 5}
                                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.PAIN_SCALE_2)}
                                            />}
                                        />

                                    </RadioGroup>
                                </Col>
                            </Row>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    {/* PredominantTissue */}
                    <ExpansionPanel defaultExpanded={true} className="card-shadow border-radius-card custom-expanded-margin" onChange={() => this.onChangeExpanded()}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase predominant-tissue-title" title={t("WoundsTerms.PredominantTissue")} />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="no-padding-y pb-4">
                            <Row>
                                <Col className="px-5" xs={12} sm={6} md={8} lg={4}>
                                    <Typography variant="subtitle2" className="pt-0 pb-4 font-weight-bold">
                                        {t('WoundsTerms.Epithelial')}
                                    </Typography>
                                    <SliderWithScales
                                        ariaLabelledby={"discrete-slider-always"}
                                        ariaLabel={t('WoundsTerms.Epithelial')}
                                        numberOfStepsPerMove={10}
                                        marksLabels={marks}
                                        min={0}
                                        max={100}
                                        thumbHTMLElement={'span'}
                                        displayValueBallon={this.state.showLabelsSlider ? 'on' : 'off'}
                                        labelFormat={(value) => { return value + ' %' }}
                                        barProps={!this.props.canUserEdit ? "set-background-color-disabled" : ""}
                                        sliderValue={this.state.epithelialTissueScale === "" ? 0 : parseInt(this.state.epithelialTissueScale)}
                                        className="top-60 h-slider-scales"
                                        disabled={this.props.canUserEdit ? false : true}
                                        name="sliderEpithelialTissue"
                                    ></SliderWithScales>
                                </Col>
                                <Col className="px-5" xs={12} sm={6} md={8} lg={4}>

                                    <Typography variant="subtitle2" className="pt-5 pt-lg-0 pb-4 font-weight-bold">
                                        {t('WoundsTerms.Granulation')}
                                    </Typography>

                                    <SliderWithScales
                                        ariaLabelledby={"discrete-slider-always"}
                                        ariaLabel={t('WoundsTerms.Granulation')}
                                        numberOfStepsPerMove={10}
                                        marksLabels={marks}
                                        min={0}
                                        max={100}
                                        thumbHTMLElement={'span'}
                                        displayValueBallon={this.state.showLabelsSlider ? 'on' : 'off'}
                                        labelFormat={this.valuetext}
                                        barProps={!this.props.canUserEdit ? "set-background-color-disabled" : ""}
                                        sliderValue={this.state.granulationTissueScale === "" ? 0 : parseInt(this.state.granulationTissueScale)}
                                        className="top-60 h-slider-scales"
                                        disabled={this.props.canUserEdit ? false : true}
                                        name="sliderGranulationTissue"
                                    ></SliderWithScales>

                                </Col>
                                <Col className="px-5" xs={12} sm={6} md={8} lg={4}>
                                    <Typography variant="subtitle2" className="pt-5 pt-lg-0 pb-4 font-weight-bold">
                                        {t('WoundsTerms.Fibrin')}
                                    </Typography>

                                    <SliderWithScales
                                        ariaLabelledby={"discrete-slider-always"}
                                        ariaLabel={t('WoundsTerms.Fibrin')}
                                        numberOfStepsPerMove={10}
                                        marksLabels={marks}
                                        min={0}
                                        max={100}
                                        thumbHTMLElement={'span'}
                                        displayValueBallon={this.state.showLabelsSlider ? 'on' : 'off'}
                                        labelFormat={this.valuetext}
                                        barProps={!this.props.canUserEdit ? "set-background-color-disabled" : ""}
                                        sliderValue={this.state.fibrinTissueScale === "" ? 0 : parseInt(this.state.fibrinTissueScale)}
                                        className="top-60 h-slider-scales"
                                        disabled={this.props.canUserEdit ? false : true}
                                        name="sliderFibrinTissue"
                                    ></SliderWithScales>
                                </Col>
                                <Col className="px-5" xs={12} sm={6} md={8} lg={4}>
                                    <Typography variant="subtitle2" className="pt-5 pb-4 font-weight-bold">
                                        {t('WoundsTerms.Necrotic')}
                                    </Typography>

                                    <SliderWithScales
                                        ariaLabelledby={"discrete-slider-always"}
                                        ariaLabel={t('WoundsTerms.Necrotic')}
                                        numberOfStepsPerMove={10}
                                        marksLabels={marks}
                                        min={0}
                                        max={100}
                                        thumbHTMLElement={'span'}
                                        displayValueBallon={this.state.showLabelsSlider ? 'on' : 'off'}
                                        labelFormat={this.valuetext}
                                        barProps={!this.props.canUserEdit ? "set-background-color-disabled" : ""}
                                        sliderValue={this.state.necroticTissueScale === "" ? 0 : parseInt(this.state.necroticTissueScale)}
                                        className="top-60 h-slider-scales"
                                        disabled={this.props.canUserEdit ? false : true}
                                        name="sliderNecroticTissue"
                                    ></SliderWithScales>
                                </Col>
                                <Col className="px-5" xs={12} sm={6} md={8} lg={4}>

                                    <Typography variant="subtitle2" className="pt-5 pb-4 font-weight-bold">
                                        {t('WoundsTerms.Debridement')}
                                    </Typography>
                                    <SliderWithScales
                                        ariaLabelledby={"discrete-slider-always"}
                                        ariaLabel={t('WoundsTerms.Debridement')}
                                        numberOfStepsPerMove={10}
                                        marksLabels={marks}
                                        min={0}
                                        max={100}
                                        thumbHTMLElement={'span'}
                                        displayValueBallon={this.state.showLabelsSlider ? 'on' : 'off'}
                                        labelFormat={this.valuetext}
                                        barProps={!this.props.canUserEdit ? "set-background-color-disabled" : ""}
                                        sliderValue={this.state.devitalizedTissueScale === "" ? 0 : parseInt(this.state.devitalizedTissueScale)}
                                        className="top-60 h-slider-scales"
                                        disabled={this.props.canUserEdit ? false : true}
                                        name="sliderDevitalizedTissue"
                                    ></SliderWithScales>
                                </Col>
                                <Col></Col>
                            </Row>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    {/* SurroundingSkin */}
                    <ExpansionPanel defaultExpanded={true} className="card-shadow border-radius-card custom-expanded-margin">
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase" title={t("WoundsTerms.SurroundingSkin")} />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="no-padding-y pb-4">
                            <Field component={renderCheckBoxGroup} display="d-none" row >
                                <FormControlLabel
                                    className={this.state.surroundingSkin.includes(SURROUNDING_SKIN.INTEGRA) ? "checked-input" : ""}
                                    control={<Checkbox
                                        checked={this.state.surroundingSkin.includes(SURROUNDING_SKIN.INTEGRA)}
                                        className={this.state.surroundingSkin.includes(SURROUNDING_SKIN.INTEGRA) ? "set-color-primary" : ""}
                                        onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.SURROUNDING_SKIN_INTACT)}
                                        disabled={this.props.canUserEdit ? false : true}
                                        value={this.state.surroundingSkin.includes(SURROUNDING_SKIN.INTEGRA)}
                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                        color="default" />}
                                    label={t('WoundsTerms.Intact')} />
                                <FormControlLabel
                                    className={this.state.surroundingSkin.includes(SURROUNDING_SKIN.RUBORIZADA) ? "checked-input" : ""}
                                    control={<Checkbox
                                        checked={this.state.surroundingSkin.includes(SURROUNDING_SKIN.RUBORIZADA)}
                                        className={this.state.surroundingSkin.includes(SURROUNDING_SKIN.RUBORIZADA) ? "set-color-primary" : ""}
                                        onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.SURROUNDING_SKIN_RED)}
                                        disabled={this.props.canUserEdit ? false : true}
                                        value={this.state.surroundingSkin.includes(SURROUNDING_SKIN.RUBORIZADA)}
                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                        color="default" />}
                                    label={t('WoundsTerms.Red')}
                                />
                                <FormControlLabel
                                    className={this.state.surroundingSkin.includes(SURROUNDING_SKIN.MACERADA) ? "checked-input" : ""}
                                    control={
                                        <Checkbox
                                            checked={this.state.surroundingSkin.includes(SURROUNDING_SKIN.MACERADA)}
                                            className={this.state.surroundingSkin.includes(SURROUNDING_SKIN.MACERADA) ? "set-color-primary" : ""}
                                            onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.SURROUNDING_SKIN_MACERATED)}
                                            disabled={this.props.canUserEdit ? false : true}
                                            value={this.state.surroundingSkin.includes(SURROUNDING_SKIN.MACERADA)}
                                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                                            color="default" />
                                    }
                                    label={t('WoundsTerms.Macerated')}
                                />
                                <FormControlLabel
                                    className={this.state.surroundingSkin.includes(SURROUNDING_SKIN.SECA) ? "checked-input" : ""}
                                    control={
                                        <Checkbox
                                            checked={this.state.surroundingSkin.includes(SURROUNDING_SKIN.SECA)}
                                            className={this.state.surroundingSkin.includes(SURROUNDING_SKIN.SECA) ? "set-color-primary" : ""}
                                            onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.SURROUNDING_SKIN_DRY)}
                                            disabled={this.props.canUserEdit ? false : true}
                                            value={this.state.surroundingSkin.includes(SURROUNDING_SKIN.SECA)}
                                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                                            color="default" />
                                    }
                                    label={t('WoundsTerms.Dry')}
                                />
                                <FormControlLabel
                                    className={this.state.surroundingSkin.includes(SURROUNDING_SKIN.DESCAMATIVA) ? "checked-input" : ""}
                                    control={
                                        <Checkbox
                                            checked={this.state.surroundingSkin.includes(SURROUNDING_SKIN.DESCAMATIVA)}
                                            className={this.state.surroundingSkin.includes(SURROUNDING_SKIN.DESCAMATIVA) ? "set-color-primary" : ""}
                                            onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.SURROUNDING_SKIN_DESQUAMATION)}
                                            disabled={this.props.canUserEdit ? false : true}
                                            value={this.state.surroundingSkin.includes(SURROUNDING_SKIN.DESCAMATIVA)}
                                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                                            color="default" />
                                    }
                                    label={t('WoundsTerms.Desquamation')}
                                />
                            </Field>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    {/* Edges */}
                    <ExpansionPanel defaultExpanded={true} className="card-shadow border-radius-card custom-expanded-margin">
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            aria-label="Expanded"
                            id="panel1a-header"
                            className="expanded-content-direction-column">

                            <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="pt-4 pt-md-0 pl-0 d-inline text-uppercase my-auto" title={t("WoundsTerms.Edges")} />
                            <div className="d-flex pt-1 pl-0 pl-md-5 pb-4 pb-md-0">
                                <Typography className={`my-auto ${!this.state.edgesPresent ? "set-color-text" : "set-color-disabled"}`} variant="subtitle2" onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.EDGES_PRESENT)}>{t('No')}</Typography>
                                <CharacterizationSwitch
                                    checked={this.state.edgesPresent}
                                    className={this.state.edgesPresent ? "set-color-primary" : null}
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.EDGES_PRESENT)}
                                    ariaLabel="Present or absent borders"
                                    onFocus={event => event.stopPropagation()}
                                    type="input"
                                    disabled={this.props.canUserEdit ? false : true}
                                />
                                <Typography className={`my-auto ${this.state.edgesPresent ? "set-color-text" : "set-color-disabled"}`} variant="subtitle2" onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.EDGES_PRESENT)}>{t('Yes')}</Typography>

                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="no-padding-y pb-4">
                            <RadioGroup row aria-label="gender" name="gender1"
                                value={this.state.edges}
                                onChange={this.handleChangeIntervention(INTERVENTION_FIELDS.EDGES)}
                            >
                                <FormControlLabel disabled={this.props.canUserEdit ? false : true} className={this.state.edges === "Espessos" ? "checked-input" : ""} value="Espessos" control={<Radio color="default" className={this.state.edges === "Espessos" ? "set-color-primary" : ""} />} label={t('WoundsTerms.Thick')} />
                                <FormControlLabel disabled={this.props.canUserEdit ? false : true} className={this.state.edges === "Concavos" ? "checked-input" : ""} value="Concavos" control={<Radio color="default" className={this.state.edges === "Concavos" ? "set-color-primary" : ""} />} label={t('WoundsTerms.Concave')} />
                                <FormControlLabel disabled={this.props.canUserEdit ? false : true} className={this.state.edges === "Aderentes ao leito da ferida" ? "checked-input" : ""} value="Aderentes ao leito da ferida" control={<Radio color="default" className={this.state.edges === "Aderentes ao leito da ferida" ? "set-color-primary" : ""} />} label={t('WoundsTerms.AdherWound')} />
                            </RadioGroup>
                            <Link className="d-block clean-option w-100" hidden={this.props.canUserEdit ? false : true} onClick={this.clearIntervention(INTERVENTION_FIELDS.EDGES)}>{t('CleanSelectedOption')}</Link>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    {/* InflammatorySigns */}
                    <ExpansionPanel defaultExpanded={true} className="card-shadow border-radius-card custom-expanded-margin">
                        <ExpansionPanelDetails className="no-pannel-summary expanded-content-direction-column">
                            <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="pt-4 pt-md-0 pl-0 d-inline text-uppercase my-auto" title={t("WoundsTerms.InflammatorySigns")} />

                            <div className="d-flex pt-1 pl-0 pl-md-5 pb-4 pb-md-0">
                                <Typography className={`my-auto ${!this.state.inflammatorySigns ? "set-color-text" : "set-color-disabled"}`} variant="subtitle2" onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.INFLAMATORY_SIGNS)}>{t('No')}</Typography>
                                <CharacterizationSwitch
                                    checked={this.state.inflammatorySigns}
                                    className={this.state.inflammatorySigns ? "set-color-primary" : null}
                                    onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.INFLAMATORY_SIGNS)}
                                    color="default"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    disabled={this.props.canUserEdit ? false : true}
                                />
                                <Typography className={`my-auto ${this.state.inflammatorySigns ? "set-color-text" : "set-color-disabled"}`} variant="subtitle2" onClick={this.handleChangeIntervention(INTERVENTION_FIELDS.INFLAMATORY_SIGNS)}>{t('Yes')}</Typography>
                            </div>

                        </ExpansionPanelDetails>

                    </ExpansionPanel>

                    {/* Treatments */}
                    <ExpansionPanel defaultExpanded={true} className="card-shadow border-radius-card custom-expanded-margin">
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase my-auto" title={t("WoundsTerms.Treatments")} />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="d-block">
                            <Typography variant="subtitle2" className="font-weight-bold">
                                {t('WoundsTerms.ProductsUsed')}
                            </Typography>
                            <TreatmentsList
                                products={products_array}
                                editMode={this.props.canUserEdit ? true : false}
                                deleteProduct={(value) => this.deleteProduct(value)}
                                addProduct={(value) => this.addProduct(value)}
                                disabled={this.props.canUserEdit ? false : true}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    {/* Observations */}
                    <ExpansionPanel defaultExpanded={true} className="card-shadow border-radius-card observations-panel mb-5 custom-expanded-margin">
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase" title={t("Remarks")} />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="d-block consult-mode">
                            <Typography className="font-weight-bold mb-2" fontFamily="Roboto" variant="body2"><Moment format="DD.MM.YYYY">{AtualDate}</Moment></Typography>
                            <WoundsCharacterisationObs value={this.state.observations} disabled={this.props.canUserEdit ? false : true} onBlurObs={(value) => this.handleChangeObservations(value)}></WoundsCharacterisationObs>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div >

                {/* DIALOG PRODUCTS TO SAVE */}
                <Dialog
                    open={this.state.openDialogSaveProducts}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title-confirm-cancel"> </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-confirm-cancel" style={{ color: "#494949", fontFamily: "Roboto", fontSize: "14px" }}>
                            {t('products_to_save')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{ color: "#494949", fontFamily: "Roboto" }}>
                        <Button onClick={v => this.cancelSave()} color="primary" autoFocus>
                            {t('Cancel')}
                        </Button>
                        <Button onClick={v => this.addProductAndSave()} color="primary">
                            {t('Yes')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

WoundsCharacterisation = reduxForm({ form: "WoundsCharacterisationForm" })(WoundsCharacterisation)
const mapStateToProps = state => ({ patient: state.patient, woundInfo: state.woundInfo, login: state.login });
const mapDispatchToProps = dispatch => bindActionCreators({ setLoading }, dispatch);
export default withTranslation()(connect(
    mapStateToProps,
    mapDispatchToProps
)(WoundsCharacterisation))


