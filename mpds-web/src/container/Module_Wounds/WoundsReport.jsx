import React, {Suspense} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";
import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/pt';
import 'moment/locale/en-gb';
import { enGB, pt } from 'date-fns/locale'

//OUTSIDE COMPONENTS
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import IconButton from '@material-ui/core/IconButton';

// INSIDE COMPONENTS
import DateCalendarField from '../../components/DateCalendar/DateCalendarField'
import ContentHeaderTitle from "../../components/content_header_title/contentHeader";
import MainChart from "../../components/charts/MainChart.tsx"
import LocalizationModal from '../../container/localization/localizationModal'
import LoadingF3M from '../../components/Loadings/LoadingF3M'
import HeaderInfoPatient from "../../components/header_info_patient/header_info_patient"
//Actions
import { setLoading } from "../../store/actions/login/loginActions";

// ICONS
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Face0Legend from '../../utils/painImages/face0_legend.jsx';
import Face1Legend from '../../utils/painImages/face1_legend.jsx';
import Face2Legend from '../../utils/painImages/face2_legend.jsx';
import Face3Legend from '../../utils/painImages/face3_legend.jsx';
import Face4Legend from '../../utils/painImages/face4_legend.jsx';
import Face5Legend from '../../utils/painImages/face5_legend.jsx';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

//CONSTANTS
import {isDefined} from "../../utils/utils"

import "./WoundsReport.scss"

const Carousel = React.lazy(() => import('@brainhubeu/react-carousel'));

class WoundsReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateFromReport: null,
            dateToReport: null,
            minDateFromReport: null,
            maxDateToReport: null,
            dateFromApplyReport: null,
            dateToApplyReport: null,
            dimensionLength: [],
            dimensionDepth: [],
            dimensionWidth: [],
            products: [],
            observations: [],
            width: 0,
            expansionPanelOpen: false,
            rotateArrow: false
        }
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    componentDidMount(){
        const {dateFromReport, dateToReport, minDateFromReport, maxDateToReport} = this.props.woundInfo;
        if ( isDefined(dateFromReport) && isDefined(dateToReport)){
            const values = WoundsReport.dateForReport(moment(dateFromReport).format("YYYY/MM/DD"), moment(dateToReport).format("YYYY/MM/DD"), this.props.woundInfo.interventions)
            this.setState({
                woundID: this.props.woundReport,
                dateFromReport: moment(dateFromReport).format("YYYY/MM/DD"), 
                dateToReport: moment(dateToReport).format("YYYY/MM/DD"), 
                minDateFromReport: moment(minDateFromReport).format("YYYY/MM/DD"), 
                maxDateToReport: moment(maxDateToReport).format("YYYY/MM/DD"),
                dateFromApplyReport: ""+moment(dateFromReport).format("MM/DD/YYYY")+"", 
                dateToApplyReport: ""+moment(dateToReport).format("MM/DD/YYYY")+"",
                dimensionLength: values.dimensionLength, 
                dimensionWidth: values.dimensionWidth, 
                dimensionDepth: values.dimensionDepth, 
                purulentoType: values.purulentoType,
                serosoType: values.serosoType,
                hematicoType: values.hematicoType,
                outroType: values.outroType,
                exudateSmellQuantaty: values.exudateSmellQuantaty,
                exudateSmaellType: values.exudateSmaellType,
                exudateQuantaty: values.exudateQuantaty,
                painScale1: values.painScale1,
                painScale2: values.painScale2,
                epithelialTissueScale: values.epithelialTissueScale,
                fibrinTissueScale: values.fibrinTissueScale,
                necroticTissueScale: values.necroticTissueScale,
                devitalizedTissueScale: values.devitalizedTissueScale,
                granulationTissueScale: values.granulationTissueScale,
                SkinIntegra: values.SkinIntegra,
                SkinRuborizada: values.SkinRuborizada,
                SkinMacerada: values.SkinMacerada,
                SkinSeca: values.SkinSeca,
                SkinDescamativa: values.SkinDescamativa,
                edges: values.edges,
                inflammatorySigns: values.inflammatorySigns,
                products: values.products,
                observations: values.observations, 
                indexProducts: values.indexProducts,
                indexProductsMobile: values.indexProductsMobile,
                indexObs: values.indexObs,
                indexObsMobile: values.indexObsMobile
            })
        }
        else {
            this.setState({
                woundID: 0,
                dateFromReport: null, 
                dateToReport: null, 
                minDateFromReport: null, 
                maxDateToReport: null,
                dateFromApplyReport: null, 
                dateToApplyReport: null,
                dimensionLength: [], 
                dimensionWidth: [], 
                dimensionDepth: [],  
                purulentoType: [], 
                serosoType: [], 
                hematicoType: [], 
                outroType: [], 
                exudateSmellQuantaty: [],
                exudateSmaellType: [], 
                exudateQuantaty: [], 
                painScale1: [], 
                painScale2: [], 
                epithelialTissueScale: [], 
                fibrinTissueScale: [], 
                necroticTissueScale: [], 
                devitalizedTissueScale: [], 
                granulationTissueScale: [], 
                SkinIntegra: [], 
                SkinRuborizada: [], 
                SkinMacerada: [], 
                SkinSeca: [], 
                SkinDescamativa: [], 
                edges: [], 
                inflammatorySigns: [], 
                products: [], 
                observations: [], 
                indexProducts: 0,
                indexProductsMobile: 0,
                indexObs: 0,
                indexObsMobile: 0
            })
        }
        window.addEventListener("scroll", this.resizeHeaderOnScroll);
        window.addEventListener("resize", this.handleResize);
        this.updateWindowDimensions();
    }

    componentWillUnmount() {
        window.addEventListener("scroll", this.resizeHeaderOnScroll);
        window.removeEventListener("resize", this.handleResize);
    }


    static getDerivedStateFromProps(nextProps, prevState){
        const {dateFromReport, dateToReport, minDateFromReport, maxDateToReport} = nextProps.woundInfo;
        
        if ( prevState.woundID !== nextProps.woundReport ){
            if (isDefined(dateFromReport) && isDefined(dateToReport)) {
                const values = WoundsReport.dateForReport(moment(dateFromReport).format("YYYY/MM/DD"), moment(dateToReport).format("YYYY/MM/DD"), nextProps.woundInfo.interventions)
                return {
                    woundID: nextProps.woundReport,
                    dateFromReport: moment(dateFromReport).format("YYYY/MM/DD"), 
                    dateToReport: moment(dateToReport).format("YYYY/MM/DD"), 
                    minDateFromReport: moment(minDateFromReport).format("YYYY/MM/DD"), 
                    maxDateToReport: moment(maxDateToReport).format("YYYY/MM/DD"),
                    dateFromApplyReport: ""+moment(dateFromReport).format("MM/DD/YYYY")+"", 
                    dateToApplyReport: ""+moment(dateToReport).format("MM/DD/YYYY")+"",
                    dimensionLength: values.dimensionLength, 
                    dimensionWidth: values.dimensionWidth, 
                    dimensionDepth: values.dimensionDepth, 
                    purulentoType: values.purulentoType,
                    serosoType: values.serosoType,
                    hematicoType: values.hematicoType,
                    outroType: values.outroType,
                    exudateSmellQuantaty: values.exudateSmellQuantaty,
                    exudateSmaellType: values.exudateSmaellType,
                    exudateQuantaty: values.exudateQuantaty,
                    painScale1: values.painScale1,
                    painScale2: values.painScale2,
                    epithelialTissueScale: values.epithelialTissueScale,
                    fibrinTissueScale: values.fibrinTissueScale,
                    necroticTissueScale: values.necroticTissueScale,
                    devitalizedTissueScale: values.devitalizedTissueScale,
                    granulationTissueScale: values.granulationTissueScale,
                    SkinIntegra: values.SkinIntegra,
                    SkinRuborizada: values.SkinRuborizada,
                    SkinMacerada: values.SkinMacerada,
                    SkinSeca: values.SkinSeca,
                    SkinDescamativa: values.SkinDescamativa,
                    edges: values.edges,
                    inflammatorySigns: values.inflammatorySigns,
                    products: values.products,
                    observations: values.observations,   
                    indexProducts: values.indexProducts,
                    indexProductsMobile: values.indexProductsMobile,
                    indexObs: values.indexObs,
                    indexObsMobile: values.indexObsMobile
                }
            }
            else {
                return {
                    woundID: 0,
                    dateFromReport: null, 
                    dateToReport: null, 
                    minDateFromReport: null, 
                    maxDateToReport: null,
                    dateFromApplyReport: null, 
                    dateToApplyReport: null,
                    dimensionLength: [], 
                    dimensionWidth: [], 
                    dimensionDepth: [],  
                    purulentoType: [], 
                    serosoType: [], 
                    hematicoType: [], 
                    outroType: [], 
                    exudateSmellQuantaty: [],
                    exudateSmaellType: [], 
                    exudateQuantaty: [], 
                    painScale1: [], 
                    painScale2: [], 
                    epithelialTissueScale: [], 
                    fibrinTissueScale: [], 
                    necroticTissueScale: [], 
                    devitalizedTissueScale: [], 
                    granulationTissueScale: [], 
                    SkinIntegra: [], 
                    SkinRuborizada: [], 
                    SkinMacerada: [], 
                    SkinSeca: [], 
                    SkinDescamativa: [], 
                    edges: [], 
                    inflammatorySigns: [], 
                    products: [], 
                    observations: [], 
                    indexProducts: 0,
                    indexProductsMobile: 0,
                    indexObs: 0,
                    indexObsMobile: 0,
                }
            }
        }
        else {
            if (moment(minDateFromReport).format("YYYY/MM/DD") !== prevState.minDateFromReport || moment(maxDateToReport).format("YYYY/MM/DD") !== prevState.maxDateToReport) {
                const values = WoundsReport.dateForReport(moment(dateFromReport).format("YYYY/MM/DD"), moment(dateToReport).format("YYYY/MM/DD"), nextProps.woundInfo.interventions)
                return {
                    woundID: nextProps.woundReport,
                    dateFromReport: moment(dateFromReport).format("YYYY/MM/DD"), 
                    dateToReport: moment(dateToReport).format("YYYY/MM/DD"), 
                    minDateFromReport: moment(minDateFromReport).format("YYYY/MM/DD"), 
                    maxDateToReport: moment(maxDateToReport).format("YYYY/MM/DD"),
                    dateFromApplyReport: ""+moment(dateFromReport).format("MM/DD/YYYY")+"", 
                    dateToApplyReport: ""+moment(dateToReport).format("MM/DD/YYYY")+"",
                    dimensionLength: values.dimensionLength, 
                    dimensionWidth: values.dimensionWidth, 
                    dimensionDepth: values.dimensionDepth, 
                    purulentoType: values.purulentoType,
                    serosoType: values.serosoType,
                    hematicoType: values.hematicoType,
                    outroType: values.outroType,
                    exudateSmellQuantaty: values.exudateSmellQuantaty,
                    exudateSmaellType: values.exudateSmaellType,
                    exudateQuantaty: values.exudateQuantaty,
                    painScale1: values.painScale1,
                    painScale2: values.painScale2,
                    epithelialTissueScale: values.epithelialTissueScale,
                    fibrinTissueScale: values.fibrinTissueScale,
                    necroticTissueScale: values.necroticTissueScale,
                    devitalizedTissueScale: values.devitalizedTissueScale,
                    granulationTissueScale: values.granulationTissueScale,
                    SkinIntegra: values.SkinIntegra,
                    SkinRuborizada: values.SkinRuborizada,
                    SkinMacerada: values.SkinMacerada,
                    SkinSeca: values.SkinSeca,
                    SkinDescamativa: values.SkinDescamativa,
                    edges: values.edges,
                    inflammatorySigns: values.inflammatorySigns,
                    products: values.products,
                    observations: values.observations,
                    indexProducts: values.indexProducts,
                    indexProductsMobile: values.indexProductsMobile,
                    indexObs: values.indexObs,
                    indexObsMobile: values.indexObsMobile
                }
            } else {
                return null;
            } 
        }
     }

    static dateForReport = (dateFrom, dateTo, interventions) => {
        let dimensionLength = [];
        let dimensionWidth = [];
        let dimensionDepth = [];
        let products = [];
        let observations = [];
        let purulentoType = [];
        let serosoType = [];
        let hematicoType = [];
        let outroType = [];
        let exudateSmellQuantaty = [];
        let exudateSmaellType = [];
        let exudateQuantaty = [];
        let painScale1 = [];
        let painScale2 = [];
        let epithelialTissueScale = [];
        let fibrinTissueScale=[];
        let necroticTissueScale=[];
        let devitalizedTissueScale=[];
        let granulationTissueScale=[];
        let SkinIntegra = [];
        let SkinRuborizada = [];
        let SkinMacerada = [];
        let SkinSeca = [];
        let SkinDescamativa = [];
        let edges = [];
        let inflammatorySigns = [];
        let indexProducts = 0;
        let indexProductsMobile = 0;
        let indexObs = 0;
        let indexObsMobile = 0;

        for (let i = 0; i < interventions.length; i++)
        {
            let dateIntervention = moment(interventions[i].createdAt).format("YYYY/MM/DD")
            if(moment(dateIntervention).isBetween(dateFrom, dateTo, null, '[]')){

                if ( isDefined(interventions[i].dimensionLength)){
                    dimensionLength.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: interventions[i].dimensionLength})
                }
                if ( isDefined(interventions[i].dimensionWidth)){
                    dimensionWidth.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: interventions[i].dimensionWidth})
                }
                if ( isDefined(interventions[i].dimensionDepth)){
                    dimensionDepth.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: interventions[i].dimensionDepth})
                }
                if ( isDefined(interventions[i].exudateType) && interventions[i].exudateType !== ""){
                    let exudateTypes = interventions[i].exudateType.split(";");
                    for(let ex of exudateTypes)
                    {
                        if(ex.includes("Purulento")){
                            purulentoType.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 0});
                        }              
                        if(ex.includes("Seroso")){
                            serosoType.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"",y: 1});
                        }
                        
                        if(ex.includes("Hematico")){
                            hematicoType.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"",y: 2}); 
                        } 
                        if(!ex.includes("Hematico") && !ex.includes("Seroso") && !ex.includes("Purulento") && !(ex.length === 0 || !ex.trim())){
                            outroType.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"",y: 3});
                        }
                    
                    }
                }
                if ( isDefined(interventions[i].exudateSmellQuantaty) && interventions[i].exudateSmellQuantaty !== ""){
                    switch (interventions[i].exudateSmellQuantaty){
                        
                        case 'Elevada':
                            exudateSmellQuantaty.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 3});
                            break;
                        case 'Moderada':
                            exudateSmellQuantaty.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 2});
                            break;
                        case 'Reduzida':
                            exudateSmellQuantaty.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 1});
                            break;
                        default:
                            exudateSmellQuantaty.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 0});
                            break;
                    }
                }

                if ( isDefined(interventions[i].exudateSmaellType) && interventions[i].exudateSmaellType !== ""){
                    switch (interventions[i].exudateSmaellType){
                        case 'Fetido':
                            exudateSmaellType.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 2});
                            break;
                        case 'Caracteristico':
                            exudateSmaellType.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 1});
                            break;
                        case 'Normal':
                            exudateSmaellType.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 0});
                            break;
                    }
                }

                if ( isDefined(interventions[i].exudateQuantaty) && interventions[i].exudateQuantaty !== ""){
                    switch (interventions[i].exudateQuantaty){
                        case 'Elevada':
                            exudateQuantaty.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 2});
                            break;
                        case 'Moderada':
                            exudateQuantaty.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 1});
                            break;
                        case 'Reduzida':
                            exudateQuantaty.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 0});
                            break;
                    }
                }
                
                if(interventions[i].painScale1 !== null){
                    painScale1.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: interventions[i].painScale1})
                } else if (interventions[i].painScale2 !== null){
                    switch (interventions[i].painScale2){
                        case 0:
                            painScale1.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 1});
                            painScale2.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 1});
                            break;
                        case 1:
                            painScale1.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 3})
                            painScale2.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 3})
                            break;
                        case 2:
                            painScale1.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 5})
                            painScale2.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 5})
                            break;
                        case 3:
                            painScale1.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 7})
                            painScale2.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 7})
                            break;
                        case 4:
                            painScale1.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 9})
                            painScale2.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 9})
                            break;
                        case 5:
                            painScale1.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 10})
                            painScale2.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 10})
                            break;
                    }
                }

                
                if ( isDefined(interventions[i].epithelialTissueScale) && interventions[i].epithelialTissueScale !== ""){
                    epithelialTissueScale.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: interventions[i].epithelialTissueScale});
                }

                if ( isDefined(interventions[i].fibrinTissueScale) && interventions[i].fibrinTissueScale !== ""){
                    fibrinTissueScale.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: interventions[i].fibrinTissueScale});
                }

                if ( isDefined(interventions[i].necroticTissueScale) && interventions[i].necroticTissueScale !== ""){
                    necroticTissueScale.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: interventions[i].necroticTissueScale});
                }

                if ( isDefined(interventions[i].devitalizedTissueScale) && interventions[i].devitalizedTissueScale !== ""){
                    devitalizedTissueScale.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: interventions[i].devitalizedTissueScale});
                }

                if ( isDefined(interventions[i].granulationTissueScale) && interventions[i].granulationTissueScale !== ""){
                    granulationTissueScale.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: interventions[i].granulationTissueScale});
                }

                if ( isDefined(interventions[i].surroundingSkin) && interventions[i].surroundingSkin !== ""){
                    let surroundingSkin =  interventions[i].surroundingSkin.split(';');
                    for(let skin of surroundingSkin)
                    {
                        if(skin.includes("Integra")){
                            SkinIntegra.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 0});
                        }              
                        if(skin.includes("Ruborizada")){
                            SkinRuborizada.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"",y: 1});
                        }
                        if(skin.includes("Macerada")){
                            SkinMacerada.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"",y: 2}); 
                        } 
                        if(skin.includes("Seca")){
                            SkinSeca.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"",y: 3}); 
                        } 
                        if(skin.includes("Descamativa")){
                            SkinDescamativa.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"",y: 4}); 
                        }                     
                    }
                }
                if ( isDefined(interventions[i].edges) /* && interventions[i].edges != "" */){
                    switch (interventions[i].edges){
                        case 'Aderentes ao leito da ferida':
                            edges.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 0});
                            break;
                        case 'Concavos':
                            edges.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 1});
                            break;
                        case 'Espessos':
                            edges.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 2});
                            break;
                        case 'Nao':
                            edges.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 3});
                            break;
/*                         default:
                            edges.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 3});
                            break; */
                    }
                }
                if ( isDefined(interventions[i].inflammatorySigns) /* && interventions[i].inflammatorySigns != "" */){
                    if (interventions[i].inflammatorySigns){
                        inflammatorySigns.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 1});
                    } else {
                        inflammatorySigns.push({t: ""+moment(dateIntervention).format("MM/DD/YYYY")+"", y: 0});
                    }
                }
                products.push({createdAt: dateIntervention, products: interventions[i].products})
                observations.push({createdAt: dateIntervention, observations: interventions[i].observations})
            }
        }

        indexProducts = products.length > 3 ? products.length - 3 : 0
        indexProductsMobile = products.length + 1
        indexObs = observations.length > 3 ? observations.length - 3 : 0
        indexObsMobile = observations.length + 1

        return {dimensionLength, dimensionWidth, dimensionDepth, products, observations, purulentoType, serosoType, hematicoType, outroType, exudateSmellQuantaty,
            exudateSmaellType, exudateQuantaty, painScale1, painScale2, epithelialTissueScale, fibrinTissueScale, necroticTissueScale, devitalizedTissueScale,
            granulationTissueScale, SkinIntegra, SkinRuborizada, SkinMacerada, SkinSeca, SkinDescamativa, edges, inflammatorySigns, indexProducts, indexProductsMobile, indexObs, indexObsMobile}
    }

    updateWindowDimensions= () => {
        this.setState({ width: window.innerWidth})
    }

    handleResize = () => this.setState({ width: window.innerWidth})

    handleDateChange = name => date => {
        switch (name) {
            case "dateFrom":
                if (date != null) {  
                    this.setState({
                        dateFromReport: moment(date).format("YYYY/MM/DD")
                    })
                } else {
                    //min date
                    this.setState({
                        dateFromReport: isDefined(this.props.woundInfo.minDateFromReport)? moment(this.props.woundInfo.minDateFromReport).format("YYYY/MM/DD") : null
                    })
                }
                break;
            case "dateTo":
                if (date != null) {
                        this.setState({
                            dateToReport: moment(date).format("YYYY/MM/DD")
                        })
                } else {
                    // maxDate
                    this.setState({
                        dateToReport: isDefined(this.props.woundInfo.maxDateToReport)? moment(this.props.woundInfo.maxDateToReport).format("YYYY/MM/DD") : null
                    })
                }
                break;
            default:
                break;
        }
    };

    onClickRefreshReport(event) {
        event.stopPropagation()
        if (moment(this.state.dateFromReport).isValid() && moment(this.state.dateToReport).isValid()){
            let dateFrom = this.state.dateFromReport
            let dateTo = this.state.dateToReport
            let interventions = this.props.woundInfo.interventions || []

            let values = WoundsReport.dateForReport(dateFrom, dateTo, interventions)

            this.setState({
                dateFromApplyReport:""+moment(dateFrom).format("MM/DD/YYYY")+"",
                dateToApplyReport: ""+moment(dateTo).format("MM/DD/YYYY")+"",
                dimensionLength: values.dimensionLength, 
                dimensionWidth: values.dimensionWidth, 
                dimensionDepth: values.dimensionDepth, 
                purulentoType: values.purulentoType,
                serosoType: values.serosoType,
                hematicoType: values.hematicoType,
                outroType: values.outroType,
                exudateSmellQuantaty: values.exudateSmellQuantaty,
                exudateSmaellType: values.exudateSmaellType,
                exudateQuantaty: values.exudateQuantaty,
                painScale1: values.painScale1,
                painScale2: values.painScale2,
                epithelialTissueScale: values.epithelialTissueScale,
                fibrinTissueScale: values.fibrinTissueScale,
                necroticTissueScale: values.necroticTissueScale,
                devitalizedTissueScale: values.devitalizedTissueScale,
                granulationTissueScale: values.granulationTissueScale,
                SkinIntegra: values.SkinIntegra,
                SkinRuborizada: values.SkinRuborizada,
                SkinMacerada: values.SkinMacerada,
                SkinSeca: values.SkinSeca,
                SkinDescamativa: values.SkinDescamativa,
                edges: values.edges,
                inflammatorySigns: values.inflammatorySigns,
                products: values.products,
                observations: values.observations,   
                indexProducts: values.indexProducts,
                indexProductsMobile: values.indexProductsMobile,
                indexObs: values.indexObs,
                indexObsMobile: values.indexObsMobile
            })
        }
    }

    toogleHeader = (shrinkOn) => {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
        // validar este tamanho!!! 
        headerEl = document.getElementById("reportHeader");
      
        if(headerEl != null){
            if (distanceY > shrinkOn) {
                headerEl.classList.add("visible-header-report");
                headerEl.classList.remove("hidden-header-report");
            } else {
                headerEl.classList.remove("visible-header-report");
                headerEl.classList.add("hidden-header-report");
            }
        }
    }

    toogleHeaderReport = (shrinkOn) => {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
        // validar este tamanho!!! 
        headerEl = document.getElementById("reportHeaderFilter");
      
        if(headerEl != null){
            if (distanceY > shrinkOn) {
                headerEl.classList.add("visible-header-report-filter");
                headerEl.classList.remove("hidden-header-report-filter");
            } else {
                headerEl.classList.remove("visible-header-report-filter");
                headerEl.classList.add("hidden-header-report-filter");
            }
        }
    }

    resizeHeaderOnScroll = () => {
        if (this.state.width >= 768 && this.state.width <= 992) {   //parseInt(lgBreakpoint)
            this.toogleHeader(410)
            this.toogleHeaderReport(430)
        } else if(this.state.width >= 576 && this.state.width < 768){
            this.toogleHeader(440)
            this.toogleHeaderReport(460)
        } else if(this.state.width < 576){
            this.toogleHeader(750)
            this.toogleHeaderReport(770)
        } else{ 
            this.toogleHeader(395)
            this.toogleHeaderReport(415)
        }
    }

    onChangeExpanded = event =>{
        this.setState({
            expansionPanelOpen: !this.state.expansionPanelOpen
        })
      }
   
    onChangeCarouselProducts = value =>{
        this.setState({
            indexProducts: value,
            indexProductsMobile: value 
        }) 
    }

    onChangeCarouselObs = value => {
        this.setState({
            indexObs: value,
            indexObsMobile: value
        })
    }

    render() {
        const { t } = this.props;
        let listInterventions = this.props.woundInfo.interventions || []
        const listWounds = this.props.patient.Wounds || []
        const listInternments = this.props.patient.Internments || []
        let indexWound = -1
        for (let i = 0; i < listWounds.length; i++){
           /*  if (isDefined(listWounds[i].intervention)){
                if (listWounds[i].intervention[0].woundId === this.props.woundInfo.WoundID){
                    indexWound = i;
                    break;
                }
            } */
            if(parseInt(listWounds[i].id) === parseInt(this.props.woundInfo.WoundID)){
                indexWound = i;
                    break;
            }
        }

        var language = localStorage.getItem("i18nextLng") || "pt";
        if (language.length > 2) {
            language = language.substr(0, 2).toUpperCase();
        }


        /* Giving color to the bars on pain chart by value */
        const coloringComboChartBars = (data) => {
            if(isDefined(data)){
                let storageOFColorFaces = []
                for (let i = 0; i < data.length; i++) {
                    if(data[i].y <= 1)         
                        storageOFColorFaces.push("rgb(55, 177, 32)")
                    if(data[i].y > 1 && data[i].y <= 3)   
                        storageOFColorFaces.push("rgb(119, 220, 54)")
                    if(data[i].y > 3 && data[i].y <= 5)   
                        storageOFColorFaces.push("rgb(230, 184, 0)")
                    if(data[i].y > 5 && data[i].y <= 7)   
                        storageOFColorFaces.push("rgb(255, 102, 0)")
                    if(data[i].y > 7 && data[i].y <= 9)   
                        storageOFColorFaces.push("rgb(204, 0, 0)")
                    if(data[i].y > 9)   
                        storageOFColorFaces.push("rgb(128, 0, 0)")  
                }
            return storageOFColorFaces;
            }
        }

        let showCategory
        let professionalIntervention

        //Profissionais
        var healthProfissionalService = this.props.login.listOfUsersInstitution || []
        //adicionar o proprio
        var currentProfissional = [{ rowKey: this.props.login.email, name: this.props.login.userName }]
        healthProfissionalService = healthProfissionalService.concat(currentProfissional)
        // ordenar o array
        healthProfissionalService.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); // ordenar por nome
        //var healthProfessionals1 = healthProfissionalService.filter(function (value) { return value.name !== 'WinGCS' })
        var healthProfessionals1 = healthProfissionalService
        
        if (listInterventions !== [] && listInterventions !== undefined) {
            if (listInterventions.length > 0) {
                /* (SJR) - Type Wounds Table */ 
                //showCategory = (listInterventions[listInterventions.length - 1].typology === TYPE_WOUND_WITH_CATEGORY_PT || listInterventions[listInterventions.length - 1].typology === TYPE_WOUND_WITH_CATEGORY_EN)
                showCategory = listInterventions[listInterventions.length - 1].typology.hasCategory 

                professionalIntervention = listInterventions[listInterventions.length - 1].createdBy.toUpperCase()
                /* professionalIntervention = healthProfessionals1.filter(function (value) { return value.rowKey.toUpperCase() == professionalIntervention })[0].name */
                professionalIntervention = healthProfessionals1.filter(function (value) { return (value.rowKey != null && value.rowKey.toUpperCase() === professionalIntervention) })
                if (professionalIntervention.length > 0) {
                    professionalIntervention = professionalIntervention[0].name
                } else {
                   // professionalIntervention = ""
                    if (isDefined(listInterventions[listInterventions.length - 1].createdByName)) {
                        professionalIntervention = listInterventions[listInterventions.length - 1].createdByName
                    } else {
                        professionalIntervention = listInterventions[listInterventions.length - 1].createdBy.toUpperCase()
                    }
                }
            } else {
                showCategory = false
                professionalIntervention = ""
            }

        } else {
            showCategory = false
            professionalIntervention = ""
        }

        return (
            <>
                <div id="reportHeader" className="hidden-header-report sticky-report shadow-nav">
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
                        yAxisXsToogleHeader={600}
                        yAxisLgToogleHeader={357}
                        stickyContainerClass="sticky-container"></HeaderInfoPatient>
                </div>
                <div id="reportHeaderFilter" className="hidden-header-report sticky-report sticky-report-filter shadow-nav">    
                    <ExpansionPanel className="report-filter-info-panel shadow-nav" expanded={this.state.width >= 992 ? true : this.state.expansionPanelOpen} onChange={(v) => this.onChangeExpanded(v)}>
                        <ExpansionPanelSummary
                           className="d-lg-none px-5 characterization-date-res report-date-expansion-summary "
                            expandIcon={ <ExpandMoreIcon className="d-none d-sm-block"/>}
                            onClick={() => this.setState({
                                rotateArrow: !this.state.rotateArrow
                            })}
                            aria-controls="panel1a-content"
                            aria-label="Expand"
                            id="panel1a-header">
                            
                            <div className="report-first-container-accordion w-100">
                                <div>
                                    <Typography variant="subtitle2" className="d-sm-none font-weight-bold my-auto pr-md-4 pr-0">
                                        {t('TimeView')}
                                        <IconButton size="small" className={`outline-none float-right ${this.state.rotateArrow ? "rotate-opened" :  "rotate-closed" } `} aria-label="expand">
                                            <ExpandMoreIcon/>
                                        </IconButton>
                                    </Typography>
                                </div>
                                <div className="my-auto d-inline-flex">
                                    <Typography variant="subtitle2" className="d-md-inline d-none font-weight-bold my-auto pr-4">
                                        {t('TimeView')}
                                    </Typography>

                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={language === "PT" ? pt : enGB}>
                            
                                    <DateCalendarField
                                        id='DateFromReportr2'
                                        labelText={t('WoundsFilter.FromAb')}
                                        inputLabelProps={{ shrink: true}}
                                        valueInput={this.state.dateFromReport}
                                        onChangeInput={this.handleDateChange('dateFrom')}
                                        minDate={this.state.minDateFromReport}
                                        maxDate={this.state.maxDateToReport}
                                        className= "text-nowrap report-time-view ml-md-3 ml-0"
                                        invalidDateMessage={t('invalidDateFormat')}
                                    />
                            
                                    <DateCalendarField
                                        id='DateToReportr2'
                                        fullWidth = {false}
                                        labelText={t('WoundsFilter.ToAb')}
                                        valueInput={this.state.dateToReport}
                                        inputLabelProps={{ shrink: true }}
                                        minDate={this.state.dateFromReport}
                                        maxDate={this.state.maxDateToReport}
                                        onChangeInput={this.handleDateChange('dateTo')}
                                        className= "text-nowrap report-time-view mx-4"
                                        invalidDateMessage={t('invalidDateFormat')}
                                    />
                            </MuiPickersUtilsProvider>

                            <Button 
                                className="pl-3 pr-4 button-report-apply my-auto text-capitalize  mr-xl-3" 
                                color="primary" 
                                variant="contained" 
                                disableRipple
                                disableTouchRipple
                                focusRipple
                                onClick={(event) => this.onClickRefreshReport(event)}
                                type="submit">
                                    <CheckCircleIcon className="pr-2" fontSize="small"></CheckCircleIcon>
                                    {t('Apply')}</Button>
                                    
                                    </div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="justify-content-lg-center no-padding-y border-mobile expanded-content-report-sticky mx-3 mx-md-0 px-1 px-md-4">
                            <div className="px-xl-0 mx-xl-0 mobile-flex-none d-flex justify-content-center position-relative">
                                
                            <div className="d-none d-lg-flex">
                                <Typography variant="subtitle2" className="font-size-12-px d-md-inline d-none font-weight-bold my-auto pr-4 report-time-title">
                                    {t('TimeView')}
                                </Typography>
                     
                                <MuiPickersUtilsProvider  utils={DateFnsUtils} locale={language === "PT" ? pt : enGB}>
                            
                                        <DateCalendarField
                                            id='DateFromReportr1'
                                            labelText={t('WoundsFilter.FromAb')}
                                            inputLabelProps={{ shrink: true, className:"font-size-12-px"}}
                                            valueInput={this.state.dateFromReport}
                                            onChangeInput={this.handleDateChange('dateFrom')}
                                            minDate={this.state.minDateFromReport}
                                            maxDate={this.state.maxDateToReport}
                                            className= "text-nowrap report-time-view ml-md-3 ml-0 my-auto my-xl-2"
                                            invalidDateMessage={t('invalidDateFormat')}
                                        />
                            
                                        <DateCalendarField
                                            id='DateToReportr1'
                                            fullWidth = {false}
                                            labelText={t('WoundsFilter.ToAb')}
                                            valueInput={this.state.dateToReport}
                                            inputLabelProps={{ shrink: true, className:"font-size-12-px"}}
                                            minDate={this.state.dateFromReport}
                                            maxDate={this.state.maxDateToReport}
                                            onChangeInput={this.handleDateChange('dateTo')}
                                            className= "text-nowrap report-time-view mx-4 my-auto my-xl-2"
                                            invalidDateMessage={t('invalidDateFormat')}
                                        />
                                </MuiPickersUtilsProvider>

                                <div className="border-right pr-5 d-none d-lg-flex">
                                    <Button 
                                        className="pl-3 pr-4 button-report-apply my-auto text-capitalize mr-lg-0" 
                                        color="primary" 
                                        variant="contained" 
                                        disableRipple
                                        disableTouchRipple
                                        focusRipple
                                        onClick={(event) => this.onClickRefreshReport(event)}
                                        type="submit">
                                            <CheckCircleIcon className="pr-2" fontSize="small"></CheckCircleIcon>
                                            {t('Apply')}
                                    </Button>
                                 </div>
                            </div>

                                <div className="d-flex border-right-soft py-3 px-0 pr-lg-5 flex-md-fill pl-md-0 pl-lg-5 flex-lg-grow-0">
                                    <Typography  variant="caption" className="font-weight-light my-auto font-size-12-px"> 
                                        <span className="roboto-bold pr-2">{t('NextIntervention')} </span>  
                                        <Typography className="font-size-12-px" fontFamily="Roboto" variant="caption"><Moment format="DD.MM.YYYY">{this.props.woundInfo.nextIntervention}</Moment></Typography>
                                    </Typography>
                                </div>

                                <div className="d-flex py-sm-3 border-right-soft px-0 px-lg-5 flex-md-fill flex-lg-grow-0" hidden={!showCategory}>
                                    <Typography fontFamily="Roboto" variant="caption" className="pr-4 font-weight-light my-auto font-size-12-px" hidden={!showCategory}>
                                        <span className="roboto-bold pr-2"> {t('WoundsTerms.Category')}</span>
                                        <span className="text-uppercase font-size-category-header">{listInterventions.length > 0 ? (listInterventions[listInterventions.length - 1].category === "null" ? "" : t('WoundsTerms.' + listInterventions[listInterventions.length - 1].category)) : ""}</span>
                                    </Typography>
                                </div>

                                <div className="d-flex pr-0 py-3 py-sm-3 px-0 pl-lg-5 flex-md-fill flex-lg-grow-0">
                                    <Typography fontFamily="Roboto" variant="caption" className="font-weight-light my-auto pr-lg-5 pr-0 font-size-12-px" > <span className="roboto-bold pr-2"> {t('Professional')}</span>  {professionalIntervention} </Typography>
                                </div>
                                
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>

            <div className="container pb-3 content-report-wounds">
                <ExpansionPanel defaultExpanded={true} className="card-shadow border-radius-card custom-expanded-margin characterization-date-summary">
                        <ExpansionPanelSummary
                            className="d-lg-none px-md-4 mx-md-3 px-4 characterization-date-res report-date-expansion-summary "
                            expandIcon={ <ExpandMoreIcon className="d-none d-sm-block"/>}
                            onClick={() => this.setState({
                                rotateArrow: !this.state.rotateArrow
                            })}
                            aria-controls="panel1a-content"
                            aria-label="Expand"
                            id="panel1a-header">
                                <div className="report-first-container-accordion w-100">
                                    <div>
                                        <Typography variant="subtitle2" className="d-sm-none font-weight-bold my-auto pr-md-4 pr-0">
                                            {t('TimeView')}
                                            <IconButton size="small" className={`outline-none float-right ${this.state.rotateArrow ? "rotate-opened" :  "rotate-closed" } `} aria-label="expand">
                                                <ExpandMoreIcon/>
                                            </IconButton>
                                        </Typography>
                                    </div>
                                    <div className="my-auto d-inline-flex">
                                        <Typography variant="subtitle2" className="d-md-inline d-none font-weight-bold my-auto pr-4">
                                            {t('TimeView')}
                                        </Typography>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={language === "PT" ? pt : enGB}>
                            
                                        <DateCalendarField
                                            id='DateFromReportr3'
                                            labelText={t('WoundsFilter.FromAb')}
                                            inputLabelProps={{ shrink: true}}
                                            valueInput={this.state.dateFromReport}
                                            onChangeInput={this.handleDateChange('dateFrom')}
                                            minDate={this.state.minDateFromReport}
                                            maxDate={this.state.maxDateToReport}
                                            className= "text-nowrap report-time-view ml-md-3 ml-0"
                                            invalidDateMessage={t('invalidDateFormat')}
                                        />
                            
                                        <DateCalendarField
                                            id='DateToReportr3'
                                            fullWidth = {false}
                                            labelText={t('WoundsFilter.ToAb')}
                                            valueInput={this.state.dateToReport}
                                            inputLabelProps={{ shrink: true }}
                                            minDate={this.state.dateFromReport}
                                            maxDate={this.state.maxDateToReport}
                                            onChangeInput={this.handleDateChange('dateTo')}
                                            className= "text-nowrap report-time-view mx-4"
                                            invalidDateMessage={t('invalidDateFormat')}
                                        />
                                </MuiPickersUtilsProvider>

                            <Button 
                                className="pl-3 pr-4 button-report-apply my-auto text-capitalize  mr-xl-3" 
                                color="primary" 
                                variant="contained" 
                                disableRipple
                                disableTouchRipple
                                focusRipple
                                onClick={(event) => this.onClickRefreshReport(event)}
                                type="submit">
                                    <CheckCircleIcon className="pr-2" fontSize="small"></CheckCircleIcon>
                                    {t('Apply')}</Button>

                                    </div>
                                </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="no-padding-y border-mobile py-3 mx-3 mx-md-3 px-1 py-md-0 border-radius-card">
                        <div className="mobile-flex-none d-flex justify-content-center position-relative report-first-container">
                                <div className="py-1 border-right-card-first-panel ipad-pro-fix-wound-date center-item d-none d-lg-flex flex-grow-1">
                                    <div className="my-auto d-flex ">
                                        <Typography variant="subtitle2" className="d-inline font-weight-bold my-auto pr-4">
                                            {t('TimeView')}
                                        </Typography>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={language === "PT" ? pt : enGB}>

                                        <DateCalendarField
                                            id='DateFromReport'
                                            labelText={t('WoundsFilter.FromAb')}
                                            inputLabelProps={{ shrink: true}}
                                            valueInput={this.state.dateFromReport}
                                            onChangeInput={this.handleDateChange('dateFrom')}
                                            minDate={this.state.minDateFromReport}
                                            maxDate={this.state.maxDateToReport}
                                            className= "text-nowrap report-time-view ml-3"
                                            invalidDateMessage={t('invalidDateFormat')}
                                        />
                            
                                        <DateCalendarField
                                            id='DateToReport'
                                            fullWidth = {false}
                                            labelText={t('WoundsFilter.ToAb')}
                                            valueInput={this.state.dateToReport}
                                            inputLabelProps={{ shrink: true }}
                                            minDate={this.state.dateFromReport}
                                            maxDate={this.state.maxDateToReport}
                                            onChangeInput={this.handleDateChange('dateTo')}
                                            className= "text-nowrap report-time-view mx-4"
                                            invalidDateMessage={t('invalidDateFormat')}
                                        />
                                </MuiPickersUtilsProvider>

                            <Button 
                                className="pl-3 pr-4 button-report-apply my-auto text-capitalize  mr-xl-3" 
                                color="primary" 
                                variant="contained" 
                                disableRipple
                                disableTouchRipple
                                focusRipple
                                onClick={(event) => this.onClickRefreshReport(event)}
                                type="submit">
                                    <CheckCircleIcon className="pr-2" fontSize="small"></CheckCircleIcon>
                                    {t('Apply')}</Button>

                                    </div>
                                </div>

                                <div className="my-lg-0 my-md-auto py-3 pb-1 pb-md-3 pr-2 center-item border-right-card-first-panel d-lg-flex px-lg-5 flex-grow-1">
                                    <div className="my-lg-auto my-md-0">
                                        <Typography variant="subtitle2" className="d-inline font-weight-bold pr-3">
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
                                        <span className="text-uppercase font-size-category-card">{listInterventions.length > 0 ? (listInterventions[listInterventions.length - 1].category === "null" ? "" : t('WoundsTerms.' + listInterventions[listInterventions.length - 1].category)) : ""}</span>
                                    </div>
                                </div>

                                <div className="py-3 pt-1 pt-md-3 my-md-auto center-item px-lg-5 flex-grow-1">
                                    <Typography variant="subtitle2" className="pr-3 d-inline font-weight-bold">{t('Professional')}</Typography>
                                    <Typography variant="subtitle2" className="d-inline pr-2">{professionalIntervention}</Typography>
                                </div>
                            </div>
                           
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
               
                <ExpansionPanel defaultExpanded={true} className="border-radius-card" hidden={this.state.dimensionWidth.length===0 && this.state.dimensionLength.length === 0 && this.state.dimensionDepth.length === 0}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase" title={t("WoundsTerms.Size")} />  
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="px-3">
                        <MainChart typeOfChart="line" 
                            xAxisData={new Date()}
                            firstLabelData={t('WoundsTerms.Width')}
                            firstBorderColorData={"red"}
                            firstBackgroundColorData={"red"}
                            firstData={this.state.dimensionWidth}
                            secondLabelData={t('WoundsTerms.Length')}
                            secondBorderColorData={"blue"}
                            secondBackgroundColorData={"blue"}
                            secondData={this.state.dimensionLength}
                            thirdLabelData={t('WoundsTerms.Depth')}
                            thirdBorderColorData={"green"}
                            thirdBackgroundColorData={"green"}
                            thirdData={this.state.dimensionDepth}
                            dateFrom={isDefined(this.state.dateFromApplyReport)? this.state.dateFromApplyReport : "01/01/2020" }
                            dateTo={isDefined(this.state.dateToApplyReport) ? this.state.dateToApplyReport: "12/31/2020"}
                            legendDisplay={true}
                            tooltipCallback={{ 
                                // Use the footer callback to display the sum of the items showing in the tooltip
                                footer(tooltipItems) {
                                    let multi = 1;
                                    tooltipItems.forEach(function(tooltipItem) {
                                        multi *= tooltipItem.yLabel;
                                    });
                                    return 'Resultado: ' + multi.toFixed(2);
                                }
                            }}
                            yAxesTicksMin={0}
                            yAxesTicksCallback={function(value, position, array) {
                                if (position === array.length - 1) {
                                    return (value = "");
                                }
                                return value + " cm";
                            }}
                            > 
                        </MainChart>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel defaultExpanded={true} className="border-radius-card"
                    hidden={this.state.hematicoType.length===0 && this.state.serosoType.length===0 && this.state.purulentoType.length===0 && this.state.outroType.length===0 && this.state.exudateQuantaty.length===0 && this.state.exudateSmaellType.length===0 && this.state.exudateSmellQuantaty.length===0}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase" title={t("WoundsTerms.Exudate")} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="flex-column px-3">
                        <MainChart typeOfChart="scatter"
                             firstLabelData={t("WoundsTerms.TypeHem")}
                             firstBorderColorData={"red"}
                             firstBackgroundColorData={"red"}
                             firstData={this.state.hematicoType}
                             secondLabelData={t("WoundsTerms.TypeSer")}
                             secondBorderColorData={"blue"}
                             secondBackgroundColorData={"blue"}
                             secondData={this.state.serosoType}
                             thirdLabelData={t("WoundsTerms.TypePur")}
                             thirdBorderColorData={"green"}
                             thirdBackgroundColorData={"green"}
                             thirdData={this.state.purulentoType}
                             fourthLabelData={t("WoundsTerms.Ohter")}
                             fourthBorderColorData={"black"}
                             fourthBackgroundColorData={"black"}
                             fourthData={this.state.outroType}
                             legendDisplay={true}
                             dateFrom={isDefined(this.state.dateFromApplyReport)? this.state.dateFromApplyReport : null }
                             dateTo={isDefined(this.state.dateToApplyReport) ? this.state.dateToApplyReport: null}
                             tooltipCallback={{}}
                             yAxesTicksMin = {0}
                             yAxesTicksMax = {3}
                             yAxesTicksCallback= {function (value, position, array) {
                                let exsudadoLabels = [t('WoundsTerms.TypePur'), t('WoundsTerms.TypeSer'), t('WoundsTerms.TypeHem'), t('WoundsTerms.Ohter')];
                                return exsudadoLabels[value]
                              }}
                            hidden={this.state.hematicoType.length===0 && this.state.serosoType.length===0 && this.state.purulentoType.length===0 && this.state.outroType.length===0}
                        ></MainChart>
                        <ContentHeaderTitle fontSize={20} fontFamily='Nunito' classes="pl-2 d-inline text-uppercase pb-2" title={t("WoundsTerms.Amount")} hidden={this.state.exudateQuantaty.length===0}/>
                        <MainChart typeOfChart="line" 
                            xAxisData={new Date()}
                            firstLabelData={t('WoundsTerms.Amount')}
                            firstBorderColorData={"green"}
                            firstBackgroundColorData={"green"}
                            firstData={this.state.exudateQuantaty}
                            dateFrom={isDefined(this.state.dateFromApplyReport)? this.state.dateFromApplyReport : "01/01/2020" }
                            dateTo={isDefined(this.state.dateToApplyReport) ? this.state.dateToApplyReport: "12/31/2020"}
                            legendDisplay={false}
                            tooltipCallback={{}}
                            yAxesTicksMin = {0}
                            yAxesTicksMax = {2}
                            yAxesTicksCallback={
                                function (value, position, array) {
                                    let exsudadoQtdLabels = [t("WoundsTerms.LowF"),t("WoundsTerms.ModerateF"),t("WoundsTerms.HighF")];
                                    return exsudadoQtdLabels[value]
                                }
                            }
                            hidden={this.state.exudateQuantaty.length===0}
                        > 
                        </MainChart>
                        <ContentHeaderTitle fontSize={20} fontFamily='Nunito' classes="pl-2 d-inline text-uppercase pt-4 pb-3" title={t("WoundsTerms.Odour")} hidden={this.state.exudateSmaellType.length===0 && this.state.exudateSmellQuantaty.length===0}/>
                        <ContentHeaderTitle fontSize={16} fontFamily='Nunito' classes="pl-2 d-inline text-uppercase pb-2" title={t("WoundsTerms.Amount")} hidden={this.state.exudateSmellQuantaty.length===0} />
                        <MainChart typeOfChart="line" 
                            xAxisData={new Date()}
                            firstLabelData={t('WoundsTerms.Odour')}
                            firstBorderColorData={"green"}
                            firstBackgroundColorData={"green"}
                            firstData={this.state.exudateSmellQuantaty}
                            dateFrom={isDefined(this.state.dateFromApplyReport)? this.state.dateFromApplyReport : "01/01/2020" }
                            dateTo={isDefined(this.state.dateToApplyReport) ? this.state.dateToApplyReport: "12/31/2020"}
                            legendDisplay={false}
                            tooltipCallback={{}}
                            yAxesTicksMin = {0}
                            yAxesTicksMax = {3}
                            yAxesTicksCallback={function (value, position, array) {
                                let exsudadoCheiroLabels = [t("WoundsTerms.Absent"),t("WoundsTerms.LowM"),t("WoundsTerms.ModerateM"),t("WoundsTerms.HighM")];
                                return exsudadoCheiroLabels[value]
                              }
                            }
                            hidden={this.state.exudateSmellQuantaty.length===0}
                        > 
                        
                        </MainChart>
                        <ContentHeaderTitle fontSize={16} fontFamily='Nunito' classes="pl-2 d-inline text-uppercase pb-2 pt-3" title={t("WoundsTerms.Type")} hidden={this.state.exudateSmaellType.length===0}/>
                        <MainChart typeOfChart="line" 
                            xAxisData={new Date()}
                            firstLabelData={t('WoundsTerms.Type')}
                            firstBorderColorData={"green"}
                            firstBackgroundColorData={"green"}
                            firstData={this.state.exudateSmaellType}
                            dateFrom={isDefined(this.state.dateFromApplyReport)? this.state.dateFromApplyReport : "01/01/2020" }
                            dateTo={isDefined(this.state.dateToApplyReport) ? this.state.dateToApplyReport: "12/31/2020"}
                            legendDisplay={false}
                            tooltipCallback={{}}
                            yAxesTicksMin = {0}
                            yAxesTicksMax = {2}
                            yAxesTicksCallback={
                                function (value, position, array) {
                                    let exsudadoTipoCheiroLabels = [t("WoundsTerms.Normal"),t("WoundsTerms.Typical"),t("WoundsTerms.Fetid")];
                                    return exsudadoTipoCheiroLabels[value]
                                  }
                            }
                            hidden={this.state.exudateSmaellType.length===0}
                        > 
                        </MainChart>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                
                <ExpansionPanel defaultExpanded={true} className="border-radius-card" hidden={this.state.painScale1.length===0 && this.state.painScale2.length===0}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase" title={t("WoundsTerms.Pain")} />

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="px-3 flex-column pain-scale">      
                        <MainChart typeOfChart="combo"
                            firstData={this.state.painScale1}
                            secondData={this.state.painScale2}
                            dateFrom={isDefined(this.state.dateFromApplyReport) ? this.state.dateFromApplyReport : "01/01/2020" }
                            dateTo={isDefined(this.state.dateToApplyReport) ? this.state.dateToApplyReport: "12/31/2020"}
                            tooltipCallback={{}}
                            barColors={this.state.painScale2 !== undefined ? coloringComboChartBars(this.state.painScale2) : null}
                           >
                        </MainChart>
                            <div className="mx-auto pain-scale-emoticons">
                                <RadioGroup
                                    name="spacing"
                                    aria-label="spacing"
                                    value=""
                                    row>
                                    <FormControlLabel
                                        key={'0'}
                                        value={'0'}
                                        label="0-1"
                                        labelPlacement="bottom"
                                        control={<Checkbox icon={<Face0Legend />} color="default" checked={false} />}
                                    />
                                    <FormControlLabel
                                        key={'1'}
                                        value={'1'}
                                        label="1-3"
                                        labelPlacement="bottom"
                                        control={<Checkbox icon={<Face1Legend />} color="default" checked={false} />}
                                    />
                                    <FormControlLabel
                                        key={'2'}
                                        value={'2'}
                                        label="3-5"
                                        labelPlacement="bottom"
                                        control={<Checkbox icon={<Face2Legend />} color="default" checked={false} />}
                                    />
                                    <FormControlLabel
                                        key={'3'}
                                        value={'3'}
                                        label="5-7"
                                        labelPlacement="bottom"
                                        control={<Checkbox icon={<Face3Legend />} color="default" checked={false} />}
                                    />
                                    <FormControlLabel
                                        key={'4'}
                                        value={'4'}
                                        label="7-9"
                                        labelPlacement="bottom"
                                        control={<Checkbox icon={<Face4Legend />} color="default" checked={false} />}
                                    />
                                    <FormControlLabel
                                        key={'5'}
                                        value={'5'}
                                        label="9-10"
                                        labelPlacement="bottom"
                                        control={<Checkbox icon={<Face5Legend />} color="default" checked={false} />}
                                    />
                                </RadioGroup>
                            </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel defaultExpanded={true} className="border-radius-card"
                    hidden={this.state.epithelialTissueScale.length===0 && this.state.granulationTissueScale.length===0 && this.state.fibrinTissueScale.length===0 && this.state.necroticTissueScale.length===0 && this.state.devitalizedTissueScale.length === 0}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase" title={t("WoundsTerms.PredominantTissue")} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="px-3">
                        <MainChart typeOfChart="line" 
                            xAxisData={new Date()}
                            firstLabelData={t("WoundsTerms.Epithelial")}
                            firstBorderColorData={"red"}
                            firstBackgroundColorData={"red"}
                            firstData={this.state.epithelialTissueScale}
                            secondLabelData={t("WoundsTerms.Granulation")}
                            secondBorderColorData={"blue"}
                            secondBackgroundColorData={"blue"}
                            secondData={this.state.granulationTissueScale}
                            thirdLabelData={t("WoundsTerms.Fibrin")}
                            thirdBorderColorData={"green"}
                            thirdBackgroundColorData={"green"}
                            thirdData={this.state.fibrinTissueScale}
                            fourthLabelData={t("WoundsTerms.Necrotic")}
                            fourthBorderColorData={"orange"}
                            fourthBackgroundColorData={"orange"}
                            fourthData={this.state.necroticTissueScale}
                            fifthLabelData={t("WoundsTerms.Debridement")}
                            fifthBorderColorData={"purple"}
                            fifthBackgroundColorData={"purple"}
                            fifthData={this.state.devitalizedTissueScale}
                            dateFrom={isDefined(this.state.dateFromApplyReport)? this.state.dateFromApplyReport : "01/01/2020" }
                            dateTo={isDefined(this.state.dateToApplyReport) ? this.state.dateToApplyReport: "12/31/2020"}
                            legendDisplay={true}
                            tooltipCallback={{}}
                            yAxesTicksMin={0}
                            yAxesTicksMax={101}
                            yAxesTicksCallback={function(value, position, array) {
                                if (position === 0 || position === array.length -1) {
                                  return value = '';
                                }
                                  /* switch (value) {
                                    case 25:
                                      return '(Reduzido) \n 25%';
                                    case 50:
                                      return '(Moderado) \n 50%';
                                    case 70:
                                      return '(Elevado) \n 75%';
                                  } */
                                  return value + ' %';
                              }
                            }
                            yAxesStepSize={10}
                        > 
                        </MainChart>
                    </ExpansionPanelDetails>

                </ExpansionPanel>
                
                <ExpansionPanel defaultExpanded={true} className="border-radius-card"
                    hidden={this.state.SkinDescamativa.length===0 && this.state.SkinSeca.length===0 && this.state.SkinMacerada.length===0 && this.state.SkinRuborizada.length===0 && this.state.SkinIntegra.length===0}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase" title={t("WoundsTerms.SurroundingSkin")} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="px-3">
                        <MainChart typeOfChart="scatter"
                            firstLabelData={t("WoundsTerms.Desquamation")}
                            firstBorderColorData={"pink"}
                            firstBackgroundColorData={"pink"}
                            firstData={this.state.SkinDescamativa}
                            secondLabelData={t("WoundsTerms.Dry")}
                            secondBorderColorData={"black"}
                            secondBackgroundColorData={"black"}
                            secondData={this.state.SkinSeca}
                            thirdLabelData={t("WoundsTerms.Macerated")}
                            thirdBorderColorData={"blue"}
                            thirdBackgroundColorData={"blue"}
                            thirdData={this.state.SkinMacerada}
                            fourthLabelData={t("WoundsTerms.Red")}
                            fourthBorderColorData={"red"}
                            fourthBackgroundColorData={"red"}
                            fourthData={this.state.SkinRuborizada}
                            fifthLabelData={t("WoundsTerms.Intact")}
                            fifthBorderColorData={"green"}
                            fifthBackgroundColorData={"green"}
                            fifthData={this.state.SkinIntegra}
                            dateFrom={isDefined(this.state.dateFromApplyReport)? this.state.dateFromApplyReport : null }
                            dateTo={isDefined(this.state.dateToApplyReport) ? this.state.dateToApplyReport: null}
                            tooltipCallback={{}}
                            yAxesTicksMin={0}
                            yAxesTicksMax={4}
                            yAxesTicksCallback={function(value, position, array) {
                                let peleCircundanteLabels = [t("WoundsTerms.Intact"),t("WoundsTerms.Red"), t("WoundsTerms.Macerated"), t("WoundsTerms.Dry"), t("WoundsTerms.Desquamation")];
                                return peleCircundanteLabels[value]
                            }}
                        ></MainChart>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                
                <ExpansionPanel defaultExpanded={true} className="border-radius-card"
                    hidden={this.state.edges.length===0}
                >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase" title={t("WoundsTerms.Edges")} />

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="px-3">
                        <MainChart typeOfChart="line"
                            firstLabelData={t("WoundsTerms.Edges")}
                            firstBorderColorData={"green"}
                            firstBackgroundColorData={"green"}
                            firstData={this.state.edges}
                            dateFrom={isDefined(this.state.dateFromApplyReport)? this.state.dateFromApplyReport : "01/01/2020" }
                            dateTo={isDefined(this.state.dateToApplyReport) ? this.state.dateToApplyReport: "12/31/2020"}
                            legendDisplay={false}
                            tooltipCallback={{}}
                            yAxesTicksMin = {0}
                            yAxesTicksMax= {3}
                            yAxesTicksCallback={
                                function(value, position, array) {
                                    let bordosLabels = [t("WoundsTerms.Adher"), t("WoundsTerms.Concave"),  t("WoundsTerms.Thick"), t("No")];
                                    return bordosLabels[value];
                                }
                            }
                        ></MainChart>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                
                <ExpansionPanel defaultExpanded={true} className="border-radius-card" hidden={this.state.inflammatorySigns.length===0}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase" title={t("WoundsTerms.InflammatorySigns")} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="px-3">
                        <MainChart typeOfChart="line"
                            firstLabelData={t("WoundsTerms.InflammatorySigns")}
                            firstBorderColorData={"red"}
                            firstBackgroundColorData={"red"}
                            firstData={this.state.inflammatorySigns}
                            dateFrom={isDefined(this.state.dateFromApplyReport)? this.state.dateFromApplyReport : "01/01/2020" }
                            dateTo={isDefined(this.state.dateToApplyReport) ? this.state.dateToApplyReport: "12/31/2020"}
                            legendDisplay={false}
                            tooltipCallback={{}}
                            yAxesTicksMin = {0}
                            yAxesTicksMax= {1}
                            yAxesTicksCallback={function(value, position, array) {
                                let bordosLabels = [t("No"),t("Yes")];
                                return bordosLabels[value]
                            }}
                        ></MainChart>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                
                <ExpansionPanel defaultExpanded={true} className="border-radius-card" hidden={this.state.products.length === 0}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase" title={t("WoundsTerms.Treatments")} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="galleries-spacing">
                        <div className="carousel-container /* carousel-same-height */">
                            <Suspense fallback={<LoadingF3M/>}>
                            <Carousel
                                arrows
                                arrowLeft={<ArrowBackIosIcon name="angle-double-left" className="cursor-pointer" />}
                                arrowLeftDisabled={<ArrowBackIosIcon className="disabled-arrow" name="angle-left" />}
                                arrowRight={<ArrowForwardIosIcon name="angle-double-right" className="cursor-pointer" />}
                                arrowRightDisabled={<ArrowForwardIosIcon className="disabled-arrow" name="angle-right" />}
                                addArrowClickHandler
                                slidesPerPage={3}
                                breakpoints={{
                                    575: {
                                      slidesPerPage: 1,
                                    },
                                    991: {
                                      slidesPerPage: 1,
                                    }
                                  }}
                                value={this.state.width <= 991 ? this.state.indexProductsMobile : this.state.indexProducts}
                                onChange={this.onChangeCarouselProducts}
                                >
                                {this.state.products.map((prod, index) => (
                                    <div className="text-center item-gallery-treatments" key={"report-products-"+index}>
                                        <p className="roboto-bold font-size-12-px">{t('WoundsTerms.ProductsUsed')}</p>
                                        <div className="item-gallery-treatments-products">
                                        {
                                            prod.products.split(";").map( (o,indexProd) => (
                                                <p className="roboto-regular font-size-12-px" key={"report-" + index + "-prod-"+indexProd}>{o}</p>
                                            ))
                                        }
                                        </div>
                                        <p className="roboto-regular font-size-12-px">{moment(prod.createdAt).format("DD.MM.YYYY")}</p>
                                    </div>
                                ))
                                }
                            </Carousel>
                            </Suspense>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                
                <ExpansionPanel defaultExpanded={true} className="observations-expansion-panel border-radius-card" hidden={this.state.observations.length===0}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <ContentHeaderTitle fontSize={24} fontFamily='Nunito' classes="d-inline text-uppercase" title={t("Remarks")} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="galleries-spacing">
                       <div className="carousel-container carousel-same-height">
                       <Suspense fallback={<LoadingF3M/>}>
                            <Carousel
                                arrows
                                arrowLeft={<ArrowBackIosIcon className="cursor-pointer" name="angle-double-left" />}
                                arrowLeftDisabled={<ArrowBackIosIcon className="disabled-arrow" name="angle-left" />}
                                arrowRight={<ArrowForwardIosIcon className="cursor-pointer" name="angle-double-right" />}
                                arrowRightDisabled={<ArrowForwardIosIcon className="disabled-arrow" name="angle-right" />}
                                addArrowClickHandler
                                slidesPerPage={3}
                                breakpoints={{
                                    991: {
                                      slidesPerPage: 1,
                                    }
                                  }}
                                value={this.state.width <= 991 ? this.state.indexObsMobile : this.state.indexObs}
                                onChange={this.onChangeCarouselObs}
                                >
                                {this.state.observations.map((obs, index) => (
                                    <div className="text-center px-5 item-gallery-observations" key={"report-obsevations-"+index}>
                                        <p className="roboto-regular font-size-12-px item-gallery-observations-text">{obs.observations}</p>
                                        <p className="roboto-regular font-size-12-px">{ moment(obs.createdAt).format("DD.MM.YYYY")}</p>
                                    </div>
                                ))
                                }
                            </Carousel>
                        </Suspense>
                        </div> 
                    </ExpansionPanelDetails>
                </ExpansionPanel>

               <Paper className="margin-footer-fix">
                    <Row className="px-lg-5 py-5">
                        <Col lg={{ span: 5, offset: 1}}
                            md={6}
                            sm={12}
                            >
                            <LocalizationModal indexWound={indexWound} areaClasses={this.state.width <= 992 ? "mx-auto" : ""} className="mr-3"></LocalizationModal>
                        </Col>
                        <Col lg={3} 
                            md={6}
                            sm={12}
                            className={`pt-5 pt-md-4 ${this.state.width <= 992 && this.state.width >= 768 ? "pl-0" : ""}`}>
                            <div className="px-5 pr-0 pl-md-0 pr-lg-0">
                                <Typography variant="body2" className="font-weight-bold pb-3">
                                    {t('Remarks')}
                                    <Moment className="pl-2" format="DD.MM.YYYY" >
                                        {indexWound > -1 ? (listWounds[indexWound] !== undefined ? listWounds[indexWound].intervention[listWounds[indexWound].intervention.length - 1].createdAt.toString() : "") : ""}
                                    </Moment>
                                </Typography>

                                <Typography variant="body2">
                                    {indexWound > -1 ? (listWounds[indexWound] !== undefined ? (listWounds[indexWound].note === "null" ? "" : listWounds[indexWound].note) : "") : ""}
                                </Typography>

                            </div>
                        </Col>
                    </Row>
               </Paper> 
            </div>
        </>
        );
    }
}


const mapStateToProps = state => ({ patient: state.patient, woundInfo: state.woundInfo, login: state.login });
const mapDispatchToProps = dispatch => bindActionCreators({ setLoading }, dispatch);
export default withTranslation()(connect(
    mapStateToProps,
    mapDispatchToProps
)(WoundsReport))