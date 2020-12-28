import axios from 'axios';
import {
  config,
  HistoryInterventions,
  PatientsSearch,
  WoundTypologies
} from '../../../utils/constants';

export function setLoadingWounds(isLoading) {
  /*
  return dispatch => {
    {
      dispatch([
        {
          type: "SET_LOADING_WOUNDS",
          isLoading: isLoading
        }
      ]);
    }
  };*/
  return {
    type: 'SET_LOADING',
    isLoading: isLoading
  };
}

export function getPatientsSearch(searchData) {
  var language = localStorage.getItem("i18nextLng") || "pt";
  if (language.length > 2) {
    language = language.substr(0, 2).toUpperCase();
  }
  else {
    language = language.toUpperCase();
  }

  var url = `${config.url.API_URL}${PatientsSearch}`;

  var values = {
    searchfield: searchData,
    numberOfRecords: 5, // Está fixo 5 registos na pesquisa
    page: 1, // página 1,
    language: language
  };

  return dispatch => {
    axios
      .post(url, values)
      .then(resp => {
        dispatch([
          {
            type: 'WOUNDS_PATIENTS_SEARCH',
            payload: resp,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: 'WOUNDS_PATIENTS_SEARCH',
            payload: e.response,
            error: true,
            searchData: searchData
          }
        ]);
      });
  };
}

export function getPatientsHistoryInterventions(filterData) {
  let filterDateFrom = null;
  let filterDateTo = null;
  let filterUser = null;
  let filterWoundType = null;
  let filterRoom = null;
  let filterBed = null;
  let aux;
  let order = 'ASC';
  let propertyOrder = 'NextIntervention';
  let page = 1;
  let numberOfRecords = 10;

  var language = localStorage.getItem("i18nextLng") || "pt";
  if (language.length > 2) {
    language = language.substr(0, 2).toUpperCase();
  }
  else {
    language = language.toUpperCase();
  }

  if (filterData !== undefined) {
    if (filterData.From !== null && filterData.From !== undefined) {
      aux = filterData.From.toLocaleDateString();
      aux = aux.toString().split('/');
      filterDateFrom = aux[2] + '-' + aux[1] + '-' + aux[0];

      if (filterData.To !== null && filterData.To !== undefined) {
        aux = filterData.To.toLocaleDateString();
        aux = aux.toString().split('/');
        filterDateTo = aux[2] + '-' + aux[1] + '-' + aux[0];
      }
    }
    if (filterData.User !== 'all' || filterData.User !== 'todos') {
      filterUser = filterData.User;
    } else {
      filterUser = '';
    }
    if (filterData.Wound == '' || filterData.Wound == null) {
      filterWoundType = 0
    } else {
      filterWoundType = filterData.Wound
    }
    /* if (filterData.Wound !== 'all' || filterData.Wound !== 'todos') {
      filterWoundType = filterData.Wound;
    } else {
      filterWoundType = '';
    } */
    if (filterData.Room !== null && filterData.Room !== undefined) {
      filterRoom = filterData.Room;
    }
    if (filterData.Bed !== null && filterData.Bed !== undefined) {
      filterBed = filterData.Bed;
    }
    if (filterData.Order !== null && filterData.Order !== undefined) {
      order = filterData.Order;
    }
    if (
      filterData.PropertyOrder !== null &&
      filterData.PropertyOrder !== undefined
    ) {
      propertyOrder = filterData.PropertyOrder;
    }
    if (filterData.Page !== null && filterData.Page !== undefined) {
      page = filterData.Page + 1;
    }

    if (
      filterData.NumberOfRecordsPerPage !== null &&
      filterData.NumberOfRecordsPerPage !== undefined
    ) {
      numberOfRecords = filterData.NumberOfRecordsPerPage;
    }
  }

  // As datas de estão a null não podem estar na estrutura do request
  var values;

  if (filterDateFrom == null && filterDateTo == null) {
    values = {
      lastIntervUser: filterUser,
      lastWoundTypeId: filterWoundType,
      room: filterRoom,
      bed: filterBed,
      numberOfRecords: numberOfRecords,
      page: page,
      order: order,
      property: propertyOrder,
      language: language
    };
  } else if (filterDateTo == null) {
    values = {
      firstIntervDate: filterDateFrom,
      lastIntervUser: filterUser,
      lastWoundTypeId: filterWoundType,
      room: filterRoom,
      bed: filterBed,
      numberOfRecords: numberOfRecords,
      page: page,
      order: order,
      property: propertyOrder,
      language: language
    };
  } else {
    values = {
      firstIntervDate: filterDateFrom,
      lastIntervDate: filterDateTo,
      lastIntervUser: filterUser,
      lastWoundTypeId: filterWoundType,
      room: filterRoom,
      bed: filterBed,
      numberOfRecords: numberOfRecords,
      page: page,
      order: order,
      property: propertyOrder,
      language: language
    };
  }

  var url = `${config.url.API_URL}${HistoryInterventions}`;

  return dispatch => {
    axios
      .post(url, values)
      .then(resp => {
        dispatch([
          {
            type: 'WOUNDS_PATIENTS_FETCHED',
            payload: resp,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          { type: 'WOUNDS_PATIENTS_FETCHED', payload: e.response, error: true }
        ]);
      });
  };
}

export function getWoundsTypologies() {
  var language = localStorage.getItem("i18nextLng") || "pt";
  if (language.length > 2) {
    language = language.substr(0, 2).toUpperCase();
  }
  else {
    language = language.toUpperCase();
  }

  var url = `${config.url.API_URL}${WoundTypologies}?language=${language}`;

  return dispatch => {
    axios
      .get(url)
      .then(resp => {
        dispatch([
          {
            type: 'WOUNDS_TYPOLOGIES',
            payload: resp,
            error: false
          }
        ]);
      })
      .catch(e => {
        dispatch([
          {
            type: 'WOUNDS_TYPOLOGIES',
            payload: e.response,
            error: true
          }
        ]);
      });
  };
}