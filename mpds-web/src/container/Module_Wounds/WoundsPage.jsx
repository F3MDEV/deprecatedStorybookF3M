import React, { Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withTranslation } from "react-i18next";
import { useSelector } from 'react-redux';
// Actions
import { getPatientsHistoryInterventions, getPatientsSearch, getWoundsTypologies } from "../../store/actions/Module_wounds/woundsActions";
import { getPatientInfoAndStrutureCards } from "../../store/actions/patient/patientActions";
import { setLoading, updateCardListView } from "../../store/actions/login/loginActions";

// CONSTANTS
import { patientIDSel, woundIDSel, showClosedWounds, showOpenWounds } from "../../utils/constants";
import { isDefined, mobileAndTabletCheck, mobileCheck } from "../../utils/utils";

// INSIDE COMPONENTS
//import WoundsGrid from "./Data_grid/woundsGrid";
import ContentHeaderTitle from "../../components/content_header_title/contentHeader";
import Content from "../../components/template/content";
import WoundsSearch from "./Filters/woundsSearch";
import PatientPage from './PatientPage/PatientPage';
import TextFieldF3M from '../../components/textField/textFieldF3M';
import DropDownF3M from '../../components/dropdown/dropDownF3M';
import DateCalendarField from '../../components/DateCalendar/DateCalendarField';
import BackToTop from "../../components/BackToTop"
import LoadingF3M from '../../components/Loadings/LoadingF3M'
import LoadingModal from '../../components/Loadings/LoadingModal'
import StickySearch from './Filters/StickySearch/StickySearch'
import StickyFilter from './Filters/StickyFilters/StickyFilter'
//OUTSIDE COMPONENTS
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Typography } from "@material-ui/core";
import PatientCard from '../../components/patientCard/patientCard'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import { enGB, pt } from 'date-fns/locale'
import moment from "moment";
import Moment from 'react-moment';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import SelectionList from '../../components/selection_list/selection_list'
import IconButton from '@material-ui/core/IconButton';

//CSS & ICONS
import "./WoundsPage.scss";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ListIcon from '@material-ui/icons/List';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import PatientIcon from '../../utils/account-circle.svg';

const WoundsGrid = React.lazy(() => import('./Data_grid/woundsGrid'));
//const PatientPage = React.lazy(() => import('./PatientPage/PatientPage'));

const styles = theme => ({
  ListItem: {
    fontSize: 10,
    padding: 0,
  },
});

/*Next Interv Expired Date Logic*/
let now = moment().format('MM-DD-YYYY');

const CustomToggleButton = withStyles((theme) => ({
  root: {
    color: '#4CB3BA',
    backgroundColor: "#f2f2f2",
    borderColor: '#4CB3BA',
    padding: 0,
    margin: 0,
  },
  selected: {
    '&.Mui-selected': {
      backgroundColor: '#4CB3BA',
      color: '#ffffff',
      '&:hover, &:focus': {
        backgroundColor: "#019ea9",
      },
    },
  },
  sizeSmall: {
    '&.MuiToggleButton-sizeSmall': {
      height: 25,
      paddingLeft: 3,
      paddingRight: 3,
    }
  }
}))(ToggleButton);

class WoundsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mostraListaUtentes: true,
      viewModePrev: false,
      dateFrom: null, //new Date(),
      dateTo: null, //new Date()
      filtersExpanded: false,
      isLoading: false,
      optionView: "table",
      selectedIndex: 2,
      isDropdownVisible: false,
      verifyOptionView: false,
      //changeView: false
    }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChangeExpanded = this.onChangeExpanded.bind(this);
    this.changeView = this.changeView.bind(this);
    const { classes } = this.props;
    document.getElementById('root').style.background = "#f2f2f2"
  }

  componentDidMount() {
    if (!this.state.verifyOptionView) {
      //let mobile = mobileAndTabletCheck()
      let mobile = window.innerWidth < 800 ? true : false
      if (mobile) {
        this.props.wounds.NumberRowsPerPage = 1000;
        this.props.wounds.Refresh = true;
        this.setState({
          optionView: "cards",
          verifyOptionView: true
        })

      } else {
        if (this.props.login.userCardListView) {
          this.props.wounds.NumberRowsPerPage = 1000;
          this.props.wounds.Refresh = true;
          this.setState({
            optionView: "cards",
            verifyOptionView: true
          })
        } else {
          this.props.wounds.NumberRowsPerPage = 10;
          this.props.wounds.Refresh = true;
          this.setState({
            optionView: "table",
            verifyOptionView: true
          })
        }
      }
    } else if (this.props.login.loginExtPatient != null && this.props.login.loginExtPatient !== "null" && this.props.login.loginExtPatient !== "") {
      sessionStorage.setItem(patientIDSel, this.props.login.loginExtPatient)
      sessionStorage.setItem(woundIDSel, 0)
      sessionStorage.setItem(showClosedWounds, false)
      sessionStorage.setItem(showOpenWounds, true)

      this.props.patient.isLoading = true
      this.props.woundInfo.WoundID = 0
      this.props.patient.PatientID = this.props.login.loginExtPatient
      this.props.login.loginExtPatient = ""
      this.props.patient.IncludeWoundsClosed = false
      this.props.patient.IncludeWoundsOpen = true
      this.props.patient.getPatienInfoInProgress = true
      this.props.getPatientInfoAndStrutureCards(this.props.patient.PatientID, this.props.patient.IncludeWoundsClosed, this.props.patient.IncludeWoundsOpen)

      this.setState({
        mostraListaUtentes: false,
        viewModePrev: false,
      })
    }
    else if (this.props.login.validToken && !this.props.patient.TokenRefresh && !this.props.wounds.TokenRefresh) {
      if (this.props.wounds.WoundTypologies.length === 0) {
        this.props.getWoundsTypologies();
      } else {
        var dataFilter = {
          From: this.props.wounds.FilterDateFrom,
          To: this.props.wounds.FilterDateTo,
          User: this.props.wounds.FilterUserIntervention,
          Wound: this.props.wounds.FilterWoundType,
          Room: this.props.wounds.FilterRoom,
          Bed: this.props.wounds.FilterBed,
          Order: this.props.wounds.Order,
          PropertyOrder: this.props.wounds.PropertyOrder,
          NumberOfRecords: this.props.wounds.NumberRowsPerPage,
          Page: this.props.wounds.Page
        }

        //this.props.setLoading(true)
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.props.wounds.isLoading = true
          this.props.getPatientsHistoryInterventions(dataFilter);

          //this.props.setLoading(false)
        }, 300);
      }
    }
  }

  componentDidUpdate() {
    //alert("Did Update")
    if (this.props.wounds.Refresh) {
      var dataFilter = {
        From: this.props.wounds.FilterDateFrom,
        To: this.props.wounds.FilterDateTo,
        User: this.props.wounds.FilterUserIntervention,
        Wound: this.props.wounds.FilterWoundType,
        Room: this.props.wounds.FilterRoom,
        Bed: this.props.wounds.FilterBed,
        Order: this.props.wounds.Order,
        PropertyOrder: this.props.wounds.PropertyOrder,
        NumberOfRecordsPerPage: this.state.optionView == 'cards' ? 1000 : this.props.wounds.NumberRowsPerPage,
        Page: this.props.wounds.Page
      }

      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.props.wounds.isLoading = true
        this.props.getPatientsHistoryInterventions(dataFilter);
      }, 300);
    } else if (this.props.wounds.SearchRefresh) {
      this.props.patient.isLoading = true
      this.props.wounds.SearchRefresh = false
      this.props.getPatientsSearch(this.props.wounds.SearchValues)
    } else if (this.props.wounds.WoundTypologies.length === 0) {
      this.props.getWoundsTypologies();
    }

    if (this.state.viewModePrev !== this.state.mostraListaUtentes) {
      let elmnt = document.getElementById("div-patients-list");
      if (elmnt != null) {
        elmnt.scrollIntoView(true);
      }
      this.setState({ viewModePrev: this.state.mostraListaUtentes })
    }
    if (parseInt(this.props.patient.PatientID) === 0 && !this.state.mostraListaUtentes) {
      this.setState({ mostraListaUtentes: true })
    } else if (parseInt(this.props.patient.PatientID) > 0 && this.state.mostraListaUtentes) {
      this.setState({ mostraListaUtentes: false })
    }
    if (!this.props.wounds.Refresh && this.state.isLoading) {
      this.setState({ isLoading: false })
    }

    /* if (!this.props.wounds.Refresh && this.state.changeView)
    {
      this.setState({ changeView: false})
    } */
  }

  onFilterChanged() {
    if (this.props.wounds.Refresh) {

      // tratar o selectedIndex para quando altera entre cards e tabela manter a ordenação
      let index = -1
      if (this.props.wounds.PropertyOrder === "Name" && this.props.wounds.Order === "ASC") {
        index = 0;
      } else if (this.props.wounds.PropertyOrder === "Name" && this.props.wounds.Order === "DESC") {
        index = 1;
      } else if (this.props.wounds.PropertyOrder === "NextIntervention" && this.props.wounds.Order === "ASC") {
        index = 2;
      } else if (this.props.wounds.PropertyOrder === "LastInterventionUser" && this.props.wounds.Order === "ASC") {
        index = 3;
      } else if (this.props.wounds.PropertyOrder === "LastInterventionUser" && this.props.wounds.Order === "DESC") {
        index = 4;
      }

      this.setState({ isLoading: true, selectedIndex: index })

      var dataFilter = {
        From: this.props.wounds.FilterDateFrom,
        To: this.props.wounds.FilterDateTo,
        User: this.props.wounds.FilterUserIntervention,
        Wound: this.props.wounds.FilterWoundType,
        Room: this.props.wounds.FilterRoom,
        Bed: this.props.wounds.FilterBed,
        Order: this.props.wounds.Order,
        PropertyOrder: this.props.wounds.PropertyOrder,
        NumberOfRecordsPerPage: this.state.optionView == 'card' ? 1000 : this.props.wounds.NumberRowsPerPage,
        Page: this.props.wounds.Page
      }
      window.scrollTo(0, 0);
      this.props.wounds.isLoading = true
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        //search function
        this.props.getPatientsHistoryInterventions(dataFilter);
      }, 300);
    }
  }

  onSearchChanged(patientID) {
    // tem um utente selecionado
    // Deve abrir a página dos utentes

    if (patientID > 0) {
      //this.props.setLoading(true)

      //this.props.wounds.listSearch = []
      this.props.patient.isLoading = true
      this.props.patient.PatientID = patientID
      this.props.woundInfo.WoundID = 0
      sessionStorage.setItem(woundIDSel, 0)
      sessionStorage.setItem(patientIDSel, patientID)

      this.props.patient.IncludeWoundsClosed = false
      sessionStorage.setItem(showClosedWounds, this.props.patient.IncludeWoundsClosed)
      this.props.patient.IncludeWoundsOpen = true
      sessionStorage.setItem(showOpenWounds, this.props.patient.IncludeWoundsOpen)
      this.props.patient.getPatienInfoInProgress = true
      this.props.getPatientInfoAndStrutureCards(this.props.patient.PatientID, this.props.patient.IncludeWoundsClosed, this.props.patient.IncludeWoundsOpen)

      this.setState({
        mostraListaUtentes: false,
        viewModePrev: true
      })
    }
  }

  onPatientSelected() {
    if (this.props.patient.PatientID > 0) {
      //this.props.setLoading(true)
      this.props.patient.isLoading = true
      sessionStorage.setItem(patientIDSel, this.props.patient.PatientID)
      sessionStorage.setItem(woundIDSel, this.props.woundInfo.WoundID)

      this.props.patient.IncludeWoundsClosed = false
      sessionStorage.setItem(showClosedWounds, this.props.patient.IncludeWoundsClosed)
      this.props.patient.IncludeWoundsOpen = true
      sessionStorage.setItem(showOpenWounds, this.props.patient.IncludeWoundsOpen)

      this.props.patient.getPatienInfoInProgress = true
      this.props.getPatientInfoAndStrutureCards(this.props.patient.PatientID, this.props.patient.IncludeWoundsClosed, this.props.patient.IncludeWoundsOpen)

      this.setState({
        isLoading: true,
        mostraListaUtentes: false,
        viewModePrev: true
      })
    }
  }

  onPatientSelection(id) {
    this.props.patient.PatientID = id;
    this.onPatientSelected()
  }

  onPatientSelectionIntervention(id, woundId) {
    this.props.patient.PatientID = id;
    this.props.woundInfo.WoundID = woundId;
    this.onPatientSelected()
  }

  onGoBack() {
    this.props.patient.PatientID = 0
    sessionStorage.setItem(patientIDSel, 0)

    this.props.wounds.Refresh = true //forçar o refrescar da grelha
    this.props.wounds.Page = 0 // REFRESCA A GRELHA E VOLTA PARA A 1º PÁGINA

    this.setState({
      mostraListaUtentes: true,
      viewModePrev: false
    })
  }

  handleDateChange = name => date => {
    switch (name) {
      case "dateFrom":
        if (date != null) {
          if (this.props.wounds.FilterDateFrom !== date) {
            this.props.wounds.FilterDateFrom = date
            this.props.wounds.Refresh = moment(date).isValid()
            this.props.wounds.Page = 0
          }
        } else {
          if (this.props.wounds.FilterDateFrom != null) {
            this.props.wounds.FilterDateFrom = null
            this.props.wounds.Refresh = true
            this.props.wounds.Page = 0
          }
        }
        break;
      case "dateTo":
        if (date != null) {
          if (this.props.wounds.FilterDateTo !== date) {
            this.props.wounds.FilterDateTo = date
            this.props.wounds.Refresh = moment(date).isValid()
            this.props.wounds.Page = 0
          }
        } else {
          if (this.props.wounds.FilterDateTo != null) {
            this.props.wounds.FilterDateTo = null
            this.props.wounds.Refresh = true
            this.props.wounds.Page = 0
          }
        }
        break;
      default:
        break;
    }
    if (this.props.wounds.Refresh) {
      this.onFilterChanged()
    } /* else {
      this.props.setLoading(false)
    } */

  };

  handleChange = name => event => {
    const { t } = this.props;
    switch (name) {
      case "FilterUserIntervention":
        if (event.target.value === t('WoundsType.all')) {
          if (this.props.wounds.FilterUserIntervention != null) {
            this.props.wounds.FilterUserIntervention = null
            this.props.wounds.Refresh = true
            this.props.wounds.Page = 0
          }
        } else {
          if (event.target.value !== this.props.wounds.FilterUserIntervention) {
            this.props.wounds.FilterUserIntervention = event.target.value
            this.props.wounds.Refresh = true
            this.props.wounds.Page = 0
          }
        }
        break;
      case "FilterWoundType":
        // Passou a passar o id em vez do texto
        // o all tem o id 0
        //if (event.target.value === t('WoundsType.all')) {
        if (event.target.value === 0) {
          if (this.props.wounds.FilterWoundType != null) {
            this.props.wounds.FilterWoundType = null
            this.props.wounds.Refresh = true
            this.props.wounds.Page = 0
          }
        } else {
          if (event.target.value !== this.props.wounds.FilterWoundType) {
            this.props.wounds.FilterWoundType = event.target.value
            this.props.wounds.Refresh = true
            this.props.wounds.Page = 0
          }
        }
        break;
      case "FilterRoom":
        if (event.target.value !== this.props.wounds.FilterRoom) {
          this.props.wounds.FilterRoom = event.target.value
          this.props.wounds.Refresh = true
          this.props.wounds.Page = 0
        }
        break
      case "FilterBed":
        if (event.target.value !== this.props.wounds.FilterBed) {
          this.props.wounds.FilterBed = event.target.value
          this.props.wounds.Refresh = true
          this.props.wounds.Page = 0
        }
        break
      default:
        break;
    }

    if (this.props.wounds.Refresh) {
      this.onFilterChanged()
    }

  };

  onChangeExpanded = event => {
    this.setState({
      filtersExpanded: !this.state.filtersExpanded
    })
  }

  haveFilters() {
    let haveFilter = false
    if (isDefined(this.props.wounds.FilterDateFrom)) {
      haveFilter = true
    } else if (isDefined(this.props.wounds.FilterDateTo)) {
      haveFilter = true
    } else if (isDefined(this.props.wounds.FilterUserIntervention) && this.props.wounds.FilterUserIntervention !== "") {
      haveFilter = true
    } else if (isDefined() && this.props.wounds.FilterWoundType !== "") {
      haveFilter = true
    } else if (isDefined(this.props.wounds.FilterRoom) && this.props.wounds.FilterRoom !== "") {
      haveFilter = true
    } else if (isDefined(this.props.wounds.FilterBed) && this.props.wounds.FilterBed !== "") {
      haveFilter = true
    }

    return haveFilter
  }


  changeView = (event, nextView) => {
    if (nextView !== null) {
      let index = this.state.selectedIndex
      if (nextView === 'cards') {
        this.props.wounds.Refresh = true
        this.props.wounds.Page = 0
        this.props.wounds.NumberRowsPerPage = 1000

        if (this.state.selectedIndex == -1) {
          // se a ordenação não existe nos cartões deve selecionar por omissão
          this.props.wounds.PropertyOrder = "NextIntervention"
          this.props.wounds.Order = "ASC"
          index = 2
        }

      } else {
        this.props.wounds.Refresh = true
        this.props.wounds.Page = 0
        this.props.wounds.NumberRowsPerPage = 10
      }

      this.props.wounds.list = []

      this.setState({
        optionView: nextView,
        selectedIndex: index,
        isLoading: true
      })

      // Se não estamos em mobile, e se o user mudou a visualização tem que guardar as preferências do utilizador
      let mobile = window.innerWidth < 800 ? true : false
      if (!mobile) {
        if (nextView === 'cards') {
          this.props.updateCardListView(true)
        } else {
          this.props.updateCardListView(false)
        }
      }
    }
  };

  render() {
    const { t } = this.props;
    const { classes } = this.props;
    var allProfissional = [{ rowKey: "all", name: t('WoundsType.all') }]
    var healthProfissionalService = this.props.login.listOfUsersInstitution || []
    const listPatients = this.props.wounds.list;
    //adicionar o proprio
    var currentProfissional = [{ rowKey: this.props.login.email, name: this.props.login.userName }]
    healthProfissionalService = healthProfissionalService.concat(currentProfissional)
    // ordenar o array
    healthProfissionalService.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); // ordenar por nome
    //var healthProfessionals1 = allProfissional.concat(healthProfissionalService).filter(function (value) { return value.name !== 'WinGCS' })
    var healthProfessionals1 = allProfissional.concat(healthProfissionalService)

    const handleCloseDropdownMenu = () => {
      this.setState({
        isDropdownVisible: false
      })
    };

    const handleListItemClick = (event, index) => {

      this.setState({
        selectedIndex: index
      })
      handleCloseDropdownMenu();

      switch (index) {
        case 0:
          this.props.wounds.Refresh = true
          this.props.wounds.Order = "ASC"
          this.props.wounds.PropertyOrder = "Name"
          this.onFilterChanged()
          break;
        case 1:
          this.props.wounds.Refresh = true
          this.props.wounds.Order = "DESC"
          this.props.wounds.PropertyOrder = "Name"
          this.onFilterChanged()
          break;
        case 2: {
          this.props.wounds.Refresh = true
          this.props.wounds.Order = "ASC"
          this.props.wounds.PropertyOrder = "NextIntervention"
          this.onFilterChanged()
          break;
        }
        case 3: {
          this.props.wounds.Refresh = true
          this.props.wounds.Order = "ASC"
          this.props.wounds.PropertyOrder = "LastInterventionUser"
          this.onFilterChanged()
          break;
        }
        case 4: {
          this.props.wounds.Refresh = true
          this.props.wounds.Order = "DESC"
          this.props.wounds.PropertyOrder = "LastInterventionUser"
          this.onFilterChanged()
          break;
        }

        default:
          return console.log('Error')
      }


    };

    const typologiesWoundsAll = [{
      id: 0,
      type: t('WoundsType.all'),
      description: null,
      hasCategory: false
    }]
    const typologiesWounds = typologiesWoundsAll.concat(this.props.wounds.WoundTypologies);

    var language = localStorage.getItem("i18nextLng") || "pt";
    if (language.length > 2) {
      language = language.substr(0, 2).toUpperCase();
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
        href=""
        className="text-decoration-none"
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </a>
    ));

    const CustomMenu = React.forwardRef(
      ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        /* const [value, setValue] = useState(''); */

        return (
          <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}>
            <div className="d-flex p-2">
              <Typography variant="button" className="my-auto pl-3 w-100">{t('Sort')}</Typography>
              <IconButton size="small"
                edge="end"
                color="inherit"
                onClick={() => handleCloseDropdownMenu()}
                className="outline-none mr-3"
                aria-label="close">
                <CloseIcon />
              </IconButton>
            </div>
            <SelectionList
              titleItemOne={t('PatientAZ')}
              titleItemTwo={t('PatientZA')}
              titleItemThree={t('NextIntervention')}
              titleItemFour={t('HealthProfessionalAZ')}
              titleItemFive={t('HealthProfessionalZA')}
              selectedItemOne={this.state.selectedIndex === 0}
              selectedItemTwo={this.state.selectedIndex === 1}
              selectedItemThree={this.state.selectedIndex === 2}
              selectedItemFour={this.state.selectedIndex === 3}
              selectedItemFive={this.state.selectedIndex === 4}
              onClickItemOne={(event) => handleListItemClick(event, 0)}
              onClickItemTwo={(event) => handleListItemClick(event, 1)}
              onClickItemThree={(event) => handleListItemClick(event, 2)}
              onClickItemFour={(event) => handleListItemClick(event, 3)}
              onClickItemFive={(event) => handleListItemClick(event, 4)}
            >

            </SelectionList>
          </div>
        );
      },
    );

    const filterComponent = <ExpansionPanel className="filter-expand" expanded={this.state.filtersExpanded} onChange={(v) => this.onChangeExpanded(v)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Box fontFamily="Nunito" fontSize={18} fontWeight={700} gutterBottom display='inline'>
          {t('filters')}
          <Box fontFamily="Nunito" fontSize={14} className="px-2" fontWeight={700} gutterBottom display='inline'>
            {t('lastIntervention')}
          </Box>

          <Box className="mt-2 mt-md-0 mb-2 mb-md-0 list-filters-container" display={this.haveFilters() && !this.state.filtersExpanded ? "block" : "none"}>
            <List className="list-filters" hidden={this.state.filtersExpanded}>
              <ListItem className={`${classes.ListItem}`} hidden={this.state.filtersExpanded}>
                {isDefined(this.props.wounds.FilterDateFrom) && isDefined(this.props.wounds.FilterDateTo) ?
                  <><div
                    className={`${this.props.wounds.FilterDateFrom == !null || this.props.wounds.FilterDateFrom == !undefined && this.props.wounds.FilterDateFrom !== "" ? "add-padding-right " : ""} `}
                  >{t('WoundsFilter.FromAb')}
                    <span className="nunito-bold">&nbsp;{moment(this.props.wounds.FilterDateFrom).format("DD.MM.YYYY")}&nbsp;</span>
                  </div>
                    <div className={`${this.props.wounds.FilterDateTo == !null || this.props.wounds.FilterDateTo == !undefined && this.props.wounds.FilterDateTo !== "" ? "add-padding-left " : ""} `}>{t('WoundsFilter.ToAb').toLowerCase()}
                      <span className="nunito-bold">&nbsp;{moment(this.props.wounds.FilterDateTo).format("DD.MM.YYYY")}&nbsp;</span>
                    </div>
                  </>
                  :
                  (isDefined(this.props.wounds.FilterDateFrom) && !isDefined(this.props.wounds.FilterDateTo) ?
                    <div className={`${this.props.wounds.FilterDateFrom == !null || this.props.wounds.FilterDateFrom == !undefined && this.props.wounds.FilterDateFrom !== "" ? "add-padding-right " : ""} `}>{t('WoundsFilter.FromAb')} <span className="nunito-bold"> {moment(this.props.wounds.FilterDateFrom).format("DD.MM.YYYY")} </span></div>
                    :
                    (isDefined(this.props.wounds.FilterDateTo) ? <div className={`${this.props.wounds.FilterDateTo == !null || this.props.wounds.FilterDateTo == !undefined && this.props.wounds.FilterDateTo !== "" ? "add-padding-left " : ""} `}>{t('WoundsFilter.ToAb')} <span className="nunito-bold">{moment(this.props.wounds.FilterDateTo).format("DD.MM.YYYY")}</span></div> :
                      <></>
                    ))
                }
              </ListItem>

              <ListItem className={`${classes.ListItem} ` + `${this.props.wounds.FilterUserIntervention == null || this.props.wounds.FilterUserIntervention == undefined && this.props.wounds.FilterUserIntervention == '' ? "remove-padding-right " : ""} `} hidden={this.state.filtersExpanded}>{isDefined(this.props.wounds.FilterUserIntervention) && this.props.wounds.FilterUserIntervention !== '' ? <div>{t('WoundsFilter.ProfAb')}: <span className="nunito-bold">{this.props.wounds.FilterUserIntervention}</span></div> : ''}</ListItem>
              <ListItem className={`${classes.ListItem} ` + `${this.props.wounds.FilterWoundType == null || this.props.wounds.FilterWoundType == undefined && this.props.wounds.FilterWoundType == '' ? "remove-padding-right" : ""}`} hidden={this.state.filtersExpanded}>{isDefined(this.props.wounds.FilterWoundType) && this.props.wounds.FilterWoundType !== '' ? <div>{t('WoundsGrid.WoundType')}:  <span className="nunito-bold">{this.props.wounds.FilterWoundType.toUpperCase()}</span></div> : ''}</ListItem>
              <ListItem className={`${classes.ListItem} ` + `${this.props.wounds.FilterRoom == null || this.props.wounds.FilterRoom == undefined && this.props.wounds.FilterRoom == '' ? "remove-padding-right" : ""}`} hidden={this.state.filtersExpanded}>{isDefined(this.props.wounds.FilterRoom) && this.props.wounds.FilterRoom !== '' ? <div>{t('WoundsGrid.Room')}:  <span className="nunito-bold">{this.props.wounds.FilterRoom}</span></div> : ''}</ListItem>
              <ListItem className={`${classes.ListItem} ` + `${this.props.wounds.FilterBed == null || this.props.wounds.FilterBed == undefined && this.props.wounds.FilterBed == '' ? "remove-padding-right" : ""}`} hidden={this.state.filtersExpanded}>{isDefined(this.props.wounds.FilterBed) && this.props.wounds.FilterBed !== '' ? <div>{t('WoundsGrid.Bed')}:  <span className="nunito-bold">{this.props.wounds.FilterBed} </span></div> : ''} </ListItem>
            </List>
          </Box>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Row>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={language === "PT" ? pt : enGB}>
            <Col xs={6} md={3}>
              <DateCalendarField
                id='DateFrom1'
                fullWidth={true}
                className="fix-height-input-state ajust-margin-top text-nowrap"
                labelText={t('WoundsFilter.From')}
                inputLabelProps={{ shrink: true }}
                valueInput={this.props.wounds.FilterDateFrom}
                onChangeInput={
                  this.handleDateChange('dateFrom')
                }
                invalidDateMessage={t('invalidDateFormat')}
              />
            </Col>
            <Col xs={6} md={3}>
              <DateCalendarField
                id='DateTo1'
                fullWidth={true}
                labelText={t('WoundsFilter.To')}
                className="text-nowrap fix-height-input-state ajust-margin-top"
                valueInput={this.props.wounds.FilterDateTo}
                inputLabelProps={{ shrink: true }}
                onChangeInput={
                  this.handleDateChange('dateTo')
                }
                minDate={this.props.wounds.FilterDateFrom}
                invalidDateMessage={t('invalidDateFormat')}
              />
            </Col>
          </MuiPickersUtilsProvider>
          <Col xs={12} md={3}>
            <DropDownF3M
              id='UserInterventionFilter'
              labelText={t('WoundsGrid.WoundUser')}
              classes="fix-date-margin-top ajust-margin-top mt-md-4 mt-sm-0"
              onChangeInput={this.handleChange('FilterUserIntervention')}
              dataContent={healthProfessionals1.map(option => (
                <option key={option.rowKey} value={option.name} selected={this.props.wounds.FilterUserIntervention === option.name}>
                  {option.name}
                </option>
              ))}
            />
          </Col>
          <Col xs={12} md={3}>
            <DropDownF3M
              id='WoundsTypeFilter'
              labelText={t('WoundsGrid.WoundType')}
              classes="fix-date-margin-top ajust-margin-top mt-4"
              onChangeInput={this.handleChange('FilterWoundType')}
              dataContent={typologiesWounds.map(option => (
                <option key={option.id} value={option.id} selected={this.props.wounds.FilterWoundType === option.type}>
                  {option.type}
                </option>
              ))}
            />
          </Col>
          <Col xs={6} md={3}>
            <TextFieldF3M
              id='RoomFilter1'
              classes="fix-date-margin-top-md mt-sm-4"
              inputLabelProps={{ shrink: true }}
              labelText={t('WoundsGrid.Room')}
              onChangeInput={this.handleChange('FilterRoom')}
              defaultValueInput={this.props.wounds.FilterRoom}
            />
          </Col>
          <Col xs={6} md={3}>
            <TextFieldF3M
              id='BedFilter1'
              inputLabelProps={{ shrink: true }}
              classes="fix-date-margin-top-md mt-sm-4"
              labelText={t('WoundsGrid.Bed')}
              onChangeInput={this.handleChange('FilterBed')}
              defaultValueInput={this.props.wounds.FilterBed}
            />
          </Col>
        </Row>
      </ExpansionPanelDetails>
    </ExpansionPanel>

    // Tem que ser diferente por causa dos ids
    const filterComponentSticky = <ExpansionPanel expanded={this.state.filtersExpanded} onChange={(v) => this.onChangeExpanded(v)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Box fontFamily="Nunito" fontSize={18} fontWeight={700} gutterBottom display='inline'>
          {t('filters')}
          <Box fontFamily="Nunito" fontSize={14} className="px-2" fontWeight={700} gutterBottom display='inline'>
            {t('lastIntervention')}
          </Box>

          <Box className="mt-2 mt-md-0 mb-2 mb-md-0 list-filters-container" display={this.haveFilters() && !this.state.filtersExpanded ? "block" : "none"}>
            <List className="list-filters" hidden={this.state.filtersExpanded}>
              <ListItem className={`${classes.ListItem} remove-padding-right`} hidden={this.state.filtersExpanded}>
                {isDefined(this.props.wounds.FilterDateFrom) && isDefined(this.props.wounds.FilterDateTo) ?
                  <><div>{t('WoundsFilter.FromAb')}
                    <span className="nunito-bold">&nbsp;{moment(this.props.wounds.FilterDateFrom).format("DD.MM.YYYY")}&nbsp;</span>
                  </div>
                    <div>{t('WoundsFilter.ToAb').toLowerCase()}
                      <span className="nunito-bold">&nbsp;{moment(this.props.wounds.FilterDateTo).format("DD.MM.YYYY")}&nbsp;</span>
                    </div>
                  </>
                  :
                  (isDefined(this.props.wounds.FilterDateFrom) && !isDefined(this.props.wounds.FilterDateTo) ?
                    <div>{t('WoundsFilter.FromAb')} <span className="nunito-bold"> {moment(this.props.wounds.FilterDateFrom).format("DD.MM.YYYY")} </span></div>
                    :
                    (isDefined(this.props.wounds.FilterDateTo) ? <div>{t('WoundsFilter.ToAb')} <span className="nunito-bold">{moment(this.props.wounds.FilterDateTo).format("DD.MM.YYYY")}</span></div> :
                      <></>
                    ))
                }
              </ListItem>

              <ListItem className={`${classes.ListItem} `} hidden={this.state.filtersExpanded}>{isDefined(this.props.wounds.FilterUserIntervention) && this.props.wounds.FilterUserIntervention !== '' ? <div>{t('WoundsFilter.ProfAb')}: <span className="nunito-bold">{this.props.wounds.FilterUserIntervention}</span></div> : ''}</ListItem>
              <ListItem className={`${classes.ListItem} `} hidden={this.state.filtersExpanded}>{isDefined(this.props.wounds.FilterWoundType) && this.props.wounds.FilterWoundType !== '' ? <div>{t('WoundsGrid.WoundType')}:  <span className="nunito-bold">{this.props.wounds.FilterWoundType.toUpperCase()}</span></div> : ''}</ListItem>
              <ListItem className={`${classes.ListItem} `} hidden={this.state.filtersExpanded}>{isDefined(this.props.wounds.FilterRoom) && this.props.wounds.FilterRoom !== '' ? <div>{t('WoundsGrid.Room')}:  <span className="nunito-bold">{this.props.wounds.FilterRoom}</span></div> : ''}</ListItem>
              <ListItem className={`${classes.ListItem} `} hidden={this.state.filtersExpanded}>{isDefined(this.props.wounds.FilterBed) && this.props.wounds.FilterBed !== '' ? <div>{t('WoundsGrid.Bed')}:  <span className="nunito-bold">{this.props.wounds.FilterBed} </span></div> : ''} </ListItem>
            </List>
          </Box>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Row>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={language === "PT" ? pt : enGB}>
            <Col xs={6} md={3}>
              <DateCalendarField
                id='DateFrom2'
                fullWidth={true}
                className="text-nowrap fix-height-input-state ajust-margin-top"
                labelText={t('WoundsFilter.From')}
                inputLabelProps={{ shrink: true }}
                valueInput={this.props.wounds.FilterDateFrom}
                onChangeInput={
                  this.handleDateChange('dateFrom')
                }
                invalidDateMessage={t('invalidDateFormat')}
              />
            </Col>
            <Col xs={6} md={3}>
              <DateCalendarField
                id='DateTo2'
                fullWidth={true}
                labelText={t('WoundsFilter.To')}
                className="text-nowrap fix-height-input-state ajust-margin-top"
                valueInput={this.props.wounds.FilterDateTo}
                inputLabelProps={{ shrink: true }}
                onChangeInput={
                  this.handleDateChange('dateTo')
                }
                minDate={this.props.wounds.FilterDateFrom}
                invalidDateMessage={t('invalidDateFormat')}
              />
            </Col>
          </MuiPickersUtilsProvider>
          <Col xs={12} md={3}>
            <DropDownF3M
              id='UserInterventionFilter2'
              labelText={t('WoundsGrid.WoundUser')}
              classes="fix-date-margin-top ajust-margin-top mt-md-4 mt-sm-0"
              onChangeInput={this.handleChange('FilterUserIntervention')}
              dataContent={healthProfessionals1.map(option => (
                <option key={option.rowKey} value={option.name} selected={this.props.wounds.FilterUserIntervention === option.name}>
                  {option.name}
                </option>
              ))}
            />
          </Col>
          <Col xs={12} md={3}>
            <DropDownF3M
              id='WoundsTypeFilter2'
              labelText={t('WoundsGrid.WoundType')}
              classes="fix-date-margin-top ajust-margin-top mt-4"
              onChangeInput={this.handleChange('FilterWoundType')}
              /* dataContent={typeWounds.map(option => (
                <option key={option.value} value={option.label} selected={this.props.wounds.FilterWoundType === option.label}>
                  {option.label}
                </option>
              ))} */
              dataContent={typologiesWounds.map(option => (
                <option key={option.id} value={option.id} selected={this.props.wounds.FilterWoundType === option.type}>
                  {option.type}
                </option>
              ))}
            />
          </Col>
          <Col xs={6} md={3}>
            <TextFieldF3M
              id='RoomFilter2'
              classes="fix-date-margin-top-md mt-sm-4"
              inputLabelProps={{ shrink: true }}
              labelText={t('WoundsGrid.Room')}
              onChangeInput={this.handleChange('FilterRoom')}
              defaultValueInput={this.props.wounds.FilterRoom}
            />
          </Col>
          <Col xs={6} md={3}>
            <TextFieldF3M
              id='BedFilter2'
              inputLabelProps={{ shrink: true }}
              classes="fix-date-margin-top-md mt-sm-4"
              labelText={t('WoundsGrid.Bed')}
              onChangeInput={this.handleChange('FilterBed')}
              defaultValueInput={this.props.wounds.FilterBed}
            />
          </Col>
        </Row>
      </ExpansionPanelDetails>
    </ExpansionPanel>

    let form;
    if (this.state.mostraListaUtentes /* parseInt(this.props.patient.PatientID) === 0 */) {
      form = <>
        <div id="back-to-top-patients-list"></div>
        <StickySearch
          stickyContainerClass="sticky-container-top-fixed"
          title={t("WoundsPage.title")}
          loadComponent={<WoundsSearch selectPatient={(a) => this.onSearchChanged(a)}>{this.props}</WoundsSearch>}
          aside={
            <ToggleButtonGroup className="float-right" size="small" value={this.state.optionView} exclusive onChange={this.changeView}>
              <CustomToggleButton value="table" aria-label="table">
                <ListIcon fontSize="small" />
              </CustomToggleButton>
              <CustomToggleButton value="cards" aria-label="cards">
                <AccountBoxIcon fontSize="small" />
              </CustomToggleButton>
            </ToggleButtonGroup>
          }
        >
          <StickyFilter className="container">
            {filterComponentSticky}
          </StickyFilter>
        </StickySearch>
        <div className="container pb-5" id="div-patients-list">
          <Row className="pb-3">
            <Col /* sm={12} lg={9} */>
              <Row className="pb-3 pb-md-3 pb-lg-3 no-gutters">
                <div className="my-auto order-sm-first d-none d-md-block pl-md-0 pl-3 pr-4">
                  <ContentHeaderTitle fontFamily='Nunito' classes="d-inline text-uppercase title-search pr-md-4 pr-lg-0" title={t("WoundsPage.title")} />
                </div>
                <Col xs={10} sm={10} md lg xl className="pl-lg-4 pl-md-2 pl-0 pt-2 pt-md-0 my-sm-auto order-lg-last order-md-last">
                  <WoundsSearch selectPatient={(a) => this.onSearchChanged(a)}>{this.props}</WoundsSearch>
                </Col>
                <Col md={1} xs={2} className="my-auto order-lg-last order-md-last">
                  <ToggleButtonGroup className="float-right" size="small" value={this.state.optionView} exclusive onChange={this.changeView}>
                    <CustomToggleButton value="table" aria-label="table">
                      <ListIcon fontSize="small" />
                    </CustomToggleButton>
                    <CustomToggleButton value="cards" aria-label="cards">
                      <AccountBoxIcon fontSize="small" />
                    </CustomToggleButton>
                  </ToggleButtonGroup>
                </Col>
              </Row>
              <Content>
                {filterComponent}
                <div className="d-flex">
                  <Box className="flex-fill opacity-50 number-of-records pt-3" color="text" fontSize={10} lineHeight={1.4} textAlign="left">
                    {this.props.wounds.NumberOfRecords} {this.props.wounds.NumberOfRecords > 1 ? t("WoundsPage.PatientsList") : t("WoundsPage.PatientList")}
                  </Box>
                  {this.state.optionView === "cards" ?
                    <Dropdown alignRight className="pt-3 text-right"
                      show={this.state.isDropdownVisible ? true : false}
                      onToggle={() => {
                        this.setState({
                          isDropdownVisible: !this.state.isDropdownVisible
                        })
                      }}>
                      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                        <span className="sort-for">+ {t("Sort").toUpperCase()}</span>
                        {this.state.selectedIndex != 2 ? <span><CheckCircleIcon color="primary" className="ml-1 sort-check-icon"></CheckCircleIcon></span> : null}
                      </Dropdown.Toggle>

                      <Dropdown.Menu as={CustomMenu} className="mt-3 pb-3 dropdown-shadow border-none"></Dropdown.Menu>
                    </Dropdown>
                    : ""}

                </div>

                <LoadingModal hidden={!this.state.isLoading} isFixed={true} />
                <Suspense fallback={<LoadingModal />}>
                  {this.state.optionView === "cards" ?
                    <Container fluid>
                      <Row className="card-list-view">
                        {listPatients.map((option, index) => (
                          <Col xs={12} sm={6} lg={4} xl={3} className="card-list-view-item py-3 py-md-4">
                            <PatientCard
                              selectPatient={() => this.onPatientSelection(option.id)}
                              selectIntervention={() => this.onPatientSelectionIntervention(option.id, option.lastInterventionWoundId)}
                              imageOfPatient={option.photoURI === '' || option.photoURI === null ? PatientIcon : option.photoURI}
                              hasImage={option.photoURI === '' || option.photoURI === null ? false : true}
                              nameOfPatient={option.name}
                              patientTypeDoc={option.type}
                              patientIdentification={option.identification}
                              RoomCode={option.internment.length >= 1 &&
                                option.internment[0].exitDate == null &&
                                option.internment[0].room}
                              BedCode={option.internment.length >= 1 &&
                                option.internment[0].exitDate == null &&
                                option.internment[0].bed}
                              ButtonInfo={option.lastInterventionType.type}
                              dateLastIntervention={<Moment format='DD.MM.YYYY'>{option.lastIntervention}</Moment>}
                              nameHealthProfessional={option.lastInterventionUser}
                              dateNextIntervention={<Moment format='DD.MM.YYYY' className={`${moment(option.nextIntervention).isAfter(now) ? "" : "times-up"}`}>{option.nextIntervention}</Moment>}
                            ></PatientCard>
                          </Col>
                        ))}
                      </Row>
                    </Container>
                    :
                    <WoundsGrid searchData={this.props.getPatientsHistoryInterventions} selectPatient={() => this.onPatientSelected()} changeOrder={() => this.onFilterChanged()}>{this.props}</WoundsGrid>
                  }
                </Suspense>
              </Content>
            </Col>
          </Row>
        </div>
        <BackToTop iddiv={'#back-to-top-patients-list'}></BackToTop>
      </>
    } else {
      form = <>
        <LoadingF3M hidden={!this.state.isLoading} />
        <PatientPage callbackParent={() => this.onGoBack()}>{this.props.children}</PatientPage>
      </>
    }

    return (
      <>
        <div hidden={!this.props.login.userAcess.wounds}>
          {form}
        </div >
      </>
    );
  }
}

const mapStateToProps = state => ({ login: state.login, wounds: state.wounds, patient: state.patient, woundInfo: state.woundInfo });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getPatientsHistoryInterventions, getPatientsSearch, getPatientInfoAndStrutureCards, setLoading, getWoundsTypologies, updateCardListView }, dispatch);
export default withTranslation()(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WoundsPage)))


