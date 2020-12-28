import axios from "axios";
import {
  config,
  GetPatientInfo,
  GetMedication,
  GetDiagnosis,
  GetInternments,
  GetWounds,
  StructureCardsPatient
} from "../../../utils/constants";

export function getPatientInfo(patientID) {
  var language = localStorage.getItem("i18nextLng") || "pt";
  if (language.length > 2) {
    language = language.substr(0, 2).toUpperCase();
  }
  else {
    language = language.toUpperCase();
  }

  var url = `${config.url.API_URL}${GetPatientInfo}?id=${patientID}&language=${language}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch([
          {
            type: "PATIENT_INFO",
            payload: resp,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "PATIENT_INFO",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}

export function getMedication(patientID) {
  var url = `${config.url.API_URL}${GetMedication}?id=${patientID}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch([
          {
            type: "PATIENT_MEDICATION_INFO",
            payload: resp,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "PATIENT_MEDICATION_INFO",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}

export function getInternments(patientID) {
  var url = `${config.url.API_URL}${GetInternments}?id=${patientID}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch([
          {
            type: "PATIENT_INTERNMENTS_INFO",
            payload: resp,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "PATIENT_INTERNMENTS_INFO",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}

export function getDiagnosis(patientID) {
  var url = `${config.url.API_URL}${GetDiagnosis}?id=${patientID}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch([
          {
            type: "PATIENT_DIAGNOSIS_INFO",
            payload: resp,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "PATIENT_DIAGNOSIS_INFO",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}

export function getWoundsOpened(patientID) {
  var language = localStorage.getItem("i18nextLng") || "pt";
  if (language.length > 2) {
    language = language.substr(0, 2).toUpperCase();
  }
  else {
    language = language.toUpperCase();
  }

  var url = `${config.url.API_URL}${GetWounds}?patientId=${patientID}&state=Opened&language=${language}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch([
          {
            type: "PATIENT_WOUNDS_INFO",
            payload: resp,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "PATIENT_WOUNDS_INFO",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}

//promise.all permite fazer vários pedido e retorna o resultado de cada um deles
/* export function getAllPatientInfo(patientID) {
  var urlPatient = `${config.url.API_URL}${GetPatientInfo}?id=${patientID}`;
  var urlMedication = `${config.url.API_URL}${GetMedication}?id=${patientID}`;
  var urlDiagnosis = `${config.url.API_URL}${GetDiagnosis}?id=${patientID}`;
  var urlWounds = `${config.url.API_URL}${GetWounds}?id=${patientID}`;

  return dispatch => {
    Promise.all([
      axios.get(urlPatient),
      axios.get(urlMedication),
      axios.get(urlDiagnosis),
      axios.get(urlWounds)
    ])
      .then(([respPatient, respMedication, respDiagnosis, respWounds]) => {
        dispatch([
          {
            type: "PATIENT_ALL_INFO",
            payload: respPatient,
            medication: respMedication,
            diagnosis: respDiagnosis,
            wounds: respWounds,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "PATIENT_ALL_INFO",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
} */

export function getStructureCards(patientID) {
  var language = localStorage.getItem("i18nextLng") || "pt";
  if (language.length > 2) {
    language = language.substr(0, 2).toUpperCase();
  }
  else{
    language = language.toUpperCase();
  }
  var url = `${config.url.API_URL}${StructureCardsPatient}?patientId=${patientID}&language=${language}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch([
          {
            type: "PATIENT_STRUCTURECARDS",
            payload: resp,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "PATIENT_STRUCTURECARDS",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}

//promise.all permite fazer vários pedido e retorna o resultado de cada um deles
export function getPatientInfoAndStrutureCards(
  patientID,
  includeWoundsClosed,
  includeWoundsOpen
) {

  var language = localStorage.getItem("i18nextLng") || "pt";
  if (language.length > 2) {
    language = language.substr(0, 2).toUpperCase();
  }
  else{
    language = language.toUpperCase();
  }
  var urlPatient = `${config.url.API_URL}${GetPatientInfo}?id=${patientID}&language=${language}`;

  var urlCards = `${config.url.API_URL}${StructureCardsPatient}?patientId=${patientID}&language=${language}`;

  var urlWounds;
  if (includeWoundsClosed && includeWoundsOpen) {
    urlWounds = `${config.url.API_URL}${GetWounds}?patientId=${patientID}&state=All&language=${language}`;
  } else if (includeWoundsClosed && !includeWoundsOpen) {
    urlWounds = `${config.url.API_URL}${GetWounds}?patientId=${patientID}&state=Closed&language=${language}`;
  } else {
    urlWounds = `${config.url.API_URL}${GetWounds}?patientId=${patientID}&state=Opened&language=${language}`;
  }
  //var urlInternment = `${config.url.API_URL}${GetInternments}?id=${patientID}`;

  return dispatch => {
    Promise.all([
      axios.get(urlPatient),
      axios.get(urlCards),
      axios.get(urlWounds),
      //axios.get(urlInternment)
    ])
      .then(([respPatient, respCards, respWounds/* , respInternment */]) => {
        dispatch([
          {
            type: "PATIENT_INFO_AND_CARDS",
            payload: respPatient,
            cards: respCards,
            wounds: respWounds,
            //internments: respInternment,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "PATIENT_INFO_AND_CARDS",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}
