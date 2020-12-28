import { woundIDSel, patientIDSel } from "../../../utils/constants";

const INITIAL_STATE = {
  WoundID: sessionStorage.getItem(woundIDSel) || 0,
  patientID: sessionStorage.getItem(patientIDSel) || 0,
  note: null,
  isClosed: null,
  closedAt: null,
  closedBy: null,
  isPresentOnAdmission: null,
  woundDate: null,
  nextIntervention: null,
  interventions: null,
  createdAt: null,
  TokenRefresh: false,
  changeState: false,
  indexInterventionSelected: -1,
  dateFromReport: null,
  dateToReport: null,
  RefreshReport: false,
  minDateFromReport: null,
  maxDateToReport: null,
  msgWoundClosed: false,
  msgWoundOpen: false,
  interventionChange: {
    isPresentOnAdmission: null,
    interventionID: 0,
    category: "",
    typology: null,
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
    painPresent: false
  },
  msgErrorUpdate: "",
  interventionSave: false,
  isLoading:false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "WOUND_INFO_GET":
      if (action.error) {
        if (action.payload != undefined && (action.payload.status === 403 || action.payload.status === 401)) {
          // invalid token
          return {
            ...state,
            TokenRefresh: true,
            isLoading:false
          };
        } else {
          return {
            ...state,
            WoundID: 0,
            patientID: 0,
            interventions: [],
            msgWoundClosed: false,
            msgWoundOpen: false,
            isLoading:false
          };
        }
      } else {
        let interventionChange = action.payload.intervention[action.payload.intervention.length -1]
        return {
          ...state,
          WoundID: action.woundID,
          patientID: action.payload.patientId,
          note: action.payload.note,
          isClosed: action.payload.isClosed,
          closedAt: action.payload.closedAt,
          closedBy: action.payload.closedBy,
          isPresentOnAdmission: action.payload.isPresentOnAdmission,
          woundDate: action.payload.woundDate,
          nextIntervention: action.payload.nextIntervention,
          interventions: action.payload.intervention,
          createdAt: action.payload.createdAt,
          indexInterventionSelected: action.payload.intervention.length - 1,
          dateFromReport: action.payload.intervention[0].createdAt,
          dateToReport: interventionChange.createdAt,
          minDateFromReport: action.payload.intervention[0].createdAt,
          maxDateToReport: interventionChange.createdAt,
          changeState: false,
          interventionChange: {
            interventionID: interventionChange.id,
            isPresentOnAdmission: action.payload.isPresentOnAdmission,
            category: interventionChange.category,
            typology: interventionChange.typology,  //interventionChange.typology, // (SJR) - Type Wounds Table
            dimensionLength: interventionChange.dimensionLength,
            dimensionWidth: interventionChange.dimensionWidth,
            dimensionDepth: interventionChange.dimensionDepth,
            dimensionLoca: interventionChange.dimensionLoca,
            dimensionResult: interventionChange.dimensionResult,
            exudateType: interventionChange.exudateType,
            exudateQuantaty: interventionChange.exudateQuantaty,
            exudateSmellQuantaty: interventionChange.exudateSmellQuantaty,
            exudateSmaellType: interventionChange.exudateSmaellType,
            painScale1: interventionChange.painScale1,
            painScale2: interventionChange.painScale2,
            epithelialTissueScale: interventionChange.epithelialTissueScale,
            fibrinTissueScale: interventionChange.fibrinTissueScale,
            necroticTissueScale: interventionChange.necroticTissueScale,
            devitalizedTissueScale: interventionChange.devitalizedTissueScale,
            granulationTissueScale: interventionChange.granulationTissueScale,
            surroundingSkin: interventionChange.surroundingSkin,
            edges: interventionChange.edges,
            inflammatorySigns: interventionChange.inflammatorySigns,
            observations: interventionChange.observations,
            products: interventionChange.products,
            exudatePresent: (interventionChange.exudateType != "" || interventionChange.exudateQuantaty != "" || interventionChange.exudateSmellQuantaty !== "" || interventionChange.exudateSmaellType !== ""),
            odorPresent: (interventionChange.exudateSmellQuantaty !== "" || interventionChange.exudateSmaellType !== ""), 
            edgesPresent: (interventionChange.edges != ""),
            painPresent: (interventionChange.painScale1 !== "" || interventionChange.painScale2 !== ""), 
          },
          msgErrorUpdate: "",
          interventionSave: false,
          isLoading:false
        };
      }
    case "WOUND_CLOSE":
      if (action.error) {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token 
          return {
            ...state,
            TokenRefresh: true,
            isLoading:false
          };
        } else {
          return {
            ...state,
            isLoading:false
          };
        }
      } else {
        return {
          ...state,
          changeState: true,
          msgWoundClosed: true,
          msgWoundOpen: false,
          msgErrorUpdate: "",
          interventionSave: false,
          isLoading:false
        };
      }
    case "WOUND_OPEN":
      if (action.error) {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            TokenRefresh: true,
            isLoading:false
          };
        } else {
          return {
            ...state,
            isLoading:false
          };
        }
      } else {
        return {
          ...state,
          changeState: true,
          msgWoundClosed: false,
          msgWoundOpen: true,
          msgErrorUpdate: "",
          interventionSave: false,
          isLoading:false
        };
      }
    case "CHANGE_INDEX_INTERVENTIONS":
      return {
        ...state,
        indexInterventionSelected: action.payload,
        msgWoundClosed: false,
        msgWoundOpen: false,
        interventionChange: {
          interventionID: state.interventions[action.payload].id,
          isPresentOnAdmission: state.isPresentOnAdmission,
          category: state.interventions[action.payload].category,
          //typology: state.interventions[action.payload].typology,
          typology: state.interventions[action.payload].typology, // (SJR) - Type Wounds Table
          dimensionLength: state.interventions[action.payload].dimensionLength,
          dimensionWidth: state.interventions[action.payload].dimensionWidth,
          dimensionDepth: state.interventions[action.payload].dimensionDepth,
          dimensionLoca: state.interventions[action.payload].dimensionLoca,
          dimensionResult: state.interventions[action.payload].dimensionResult,
          exudateType: state.interventions[action.payload].exudateType,
          exudateQuantaty: state.interventions[action.payload].exudateQuantaty,
          exudateSmellQuantaty:
            state.interventions[action.payload].exudateSmellQuantaty,
          exudateSmaellType:
            state.interventions[action.payload].exudateSmaellType,
          painScale1: state.interventions[action.payload].painScale1,
          painScale2: state.interventions[action.payload].painScale2,
          epithelialTissueScale:
            state.interventions[action.payload].epithelialTissueScale,
          fibrinTissueScale:
            state.interventions[action.payload].fibrinTissueScale,
          necroticTissueScale:
            state.interventions[action.payload].necroticTissueScale,
          devitalizedTissueScale:
            state.interventions[action.payload].devitalizedTissueScale,
          granulationTissueScale:
            state.interventions[action.payload].granulationTissueScale,
          surroundingSkin: state.interventions[action.payload].surroundingSkin,
          edges: state.interventions[action.payload].edges,
          inflammatorySigns:
            state.interventions[action.payload].inflammatorySigns,
          observations: state.interventions[action.payload].observations,
          products: state.interventions[action.payload].products,
          exudatePresent: (state.interventions[action.payload].exudateType !== "" || state.interventions[action.payload].exudateQuantaty !== "" || state.interventions[action.payload].exudateSmellQuantaty !== "" || state.interventions[action.payload].exudateSmaellType !== ""),
          odorPresent: (state.interventions[action.payload].exudateSmellQuantaty !== "" || state.interventions[action.payload].exudateSmaellType !== ""), 
          edgesPresent: (state.interventions[action.payload].edges !== ""),
          painPresent: (state.interventions[action.payload].painScale1 !== "" || state.interventions[action.payload].painScale2 !== ""),
        },
        msgErrorUpdate: "",
        interventionSave: false,
        isLoading:false
      };
    case "UPDATE_INTERVENTION":
      if (action.error) {
        if (action.payload.status === 403 || action.payload.status === 401) {
          // invalid Token
          return {
            ...state,
            TokenRefresh: true,
            isLoading:false
          };
        } else {
          let error = "error_default"
          if (action.payload.data.applicationMessages.length === 1) {
            if (action.payload.data.applicationMessages[0].includes('Expired')){
              error = "error_editing_time_expired"
            }
          }
          return {
            ...state,
            msgErrorUpdate: error,
            interventionSave: false,
            isLoading:false
          };
        }
      } else {
        return {
          ...state,
          msgErrorUpdate: "",
          interventionSave: true,
          isLoading:false
        };
      }
    default:
      return state;
  }
}
