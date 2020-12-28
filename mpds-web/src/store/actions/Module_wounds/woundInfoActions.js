import axios from "axios";
import {
  config,
  GetWoundById,
  WoundClose,
  WoundOpen,
  PutWoundsIntervention
} from "../../../utils/constants";

export function getWoundById(woundID) {
  var language = localStorage.getItem("i18nextLng") || "pt";
  if (language.length > 2) {
    language = language.substr(0, 2).toUpperCase();
  }
  else {
    language = language.toUpperCase();
  }

  var url = `${config.url.API_URL}${GetWoundById}?id=${woundID}&language=${language}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch([
          {
            type: "WOUND_INFO_GET",
            payload: resp.data.result,
            woundID: woundID,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "WOUND_INFO_GET",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}

export function closeWound(woundID) {
  var url = `${config.url.API_URL}${WoundClose}?id=${woundID}`;

  return dispatch => {
    axios
      .put(url)
      .then(resp => {
        dispatch([
          {
            type: "WOUND_CLOSE",
            payload: resp.data.result,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "WOUND_CLOSE",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}

export function openWound(woundID) {
  var url = `${config.url.API_URL}${WoundOpen}?id=${woundID}`;

  return dispatch => {
    axios
      .put(url)
      .then(resp => {
        dispatch([
          {
            type: "WOUND_OPEN",
            payload: resp.data.result,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: "WOUND_OPEN",
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}

export function changeIndexInterventions(index) {
  return { type: "CHANGE_INDEX_INTERVENTIONS", payload: index };
}

export function updateIntervention(values){
  var url = `${config.url.API_URL}${PutWoundsIntervention}`;

  return dispatch => {
    axios.put(url, values)
    .then(resp => {
      dispatch([
        {
          type: "UPDATE_INTERVENTION",
          payload: resp.data.result,
          error: false
        }
      ]);
    })
    .catch(e => {
      dispatch([
        {
          type: "UPDATE_INTERVENTION",
          payload: e.response,
          error: true
        }
      ]);
    });
  }; 
}
