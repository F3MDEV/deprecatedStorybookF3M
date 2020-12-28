import {
  patientIDSel,
  showClosedWounds,
  showOpenWounds
} from "../../../utils/constants";

const INITIAL_STATE = {
  PatientID: sessionStorage.getItem(patientIDSel) || 0,
  PatientInfo: null,
  Medication: null,
  Diagnosis: null,
  Wounds: null,
  WoundsOpened: null,
  Internments: null,
  Cards: null,
  TokenRefresh: false,
  RefreshInfo: false,
  IncludeWoundsClosed:
    sessionStorage.getItem(showClosedWounds) === "true" ? true : false,
  IncludeWoundsOpen:
    sessionStorage.getItem(showOpenWounds) === "false" ? false : true,
  WoundsInterventionsSelect: null,
  getPatienInfoInProgress: false,
  isLoading:false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "PATIENT_INFO":
      if (action.error) {
        // se deu erro
        return {
          ...state,
          PatientID: 0,
          PatientInfo: null,
          Medication: null,
          Diagnosis: null,
          Wounds: null,
          Cards: null,
          WoundsInterventionsSelect: null,
          isLoading:false
          //IncludeWoundsClosed: false
        };
      } else {
        return {
          ...state,
          PatientInfo: action.payload.result,
          IncludeWoundsClosed:
            sessionStorage.getItem(showClosedWounds) === "true" ? true : false,
          IncludeWoundsOpen:
            sessionStorage.getItem(showOpenWounds) === "false" ? false : true
        };
      }
    case "PATIENT_MEDICATION_INFO":
      if (action.error) {
        // se deu erro
        return {
          ...state,
          Medication: null,
          isLoading:false
        };
      } else {
        return {
          ...state,
          Medication: action.payload.data.result,
          isLoading:false
        };
      }
    case "PATIENT_INTERNMENTS_INFO":
      if (action.error) {
        // se deu erro
        return {
          ...state,
          Internments: null,
          isLoading:false
        };
      } else {
        return {
          ...state,
          Internments: action.payload.data.result,
          isLoading:false
        };
      }

    case "PATIENT_DIAGNOSIS_INFO":
      if (action.error) {
        // se deu erro
        return {
          ...state,
          Diagnosis: null,
          isLoading:false
        };
      } else {
        return {
          ...state,
          Diagnosis: action.payload.data.result,
          isLoading:false
        };
      }

    case "PATIENT_WOUNDS_INFO":
      if (action.error) {
        // se deu erro
        return {
          ...state,
          WoundsOpened: null,
          isLoading:false
        };
      } else {
        return {
          ...state,
          WoundsOpened: action.payload.data.result,
          isLoading:false
        };
      }
    case "PATIENT_STRUCTURECARDS":
      if (action.error) {
        // se deu erro
        return {
          ...state,
          Cards: null,
          isLoading:false
        };
      } else {
        return {
          ...state,
          Cards: action.payload.data.result,
          isLoading:false
        };
      }

    case "PATIENT_INFO_AND_CARDS":
      if (action.error) {
        if (action.payload === undefined) {
          return {
            ...state,
            PatientInfo: null,
            Cards: null,
            Wounds: null,
            Internments: null,
            WoundsInterventionsSelect: null,
            getPatienInfoInProgress: false,
            isLoading:false
            //IncludeWoundsClosed: false
          };
        } else if (
          action.payload.status === 401 ||
          action.payload.status === 403
        ) {
          // Token invalido
          return {
            ...state,
            PatientInfo: null,
            Cards: null,
            Wounds: null,
            Internments: null,
            TokenRefresh: true,
            WoundsInterventionsSelect: null,
            getPatienInfoInProgress: false,
            isLoading:false
            //IncludeWoundsClosed: false
          };
        } else {
          return {
            ...state,
            PatientInfo: null,
            Cards: null,
            Wounds: null,
            WoundsInterventionsSelect: null,
            Internments: null,
            getPatienInfoInProgress: false,
            isLoading:false
          };
        }
      } else {
        let listWounds = action.wounds.data.result;
        let listInterventions1 = [];

        for (let i = 0; i < listWounds.length; i++) {
          listInterventions1.push(listWounds[i].intervention.length - 1);
        }

        return {
          ...state,
          PatientID: action.payload.data.result.id,
          PatientInfo: action.payload.data.result,
          Cards: action.cards.data.result,
          Wounds: action.wounds.data.result,
          Internments: action.payload.data.result.internment, //action.internments.data.result,
          WoundsInterventionsSelect: listInterventions1,
          getPatienInfoInProgress: false,
          isLoading:false
        };
      }
    /*  case "PATIENT_ALL_INFO":
      if (action.error) {
        return {
          ...state,
          PatientInfo: null,
          Diagnosis: null,
          Medication: null,
          Wounds: null
          //IncludeWoundsClosed: false
        };
      } else {
        return {
          ...state,

          PatientInfo: action.payload.data.result,
          Diagnosis: action.diagnosis.data.result,
          Medication: action.medication.data.result,
          Wounds: action.wounds.data.result
        };
      } */
    default:
      return state;
  }
}
