const INITIAL_STATE = {
  list: [],
  listSearch: [],
  FilterDateFrom: null,
  FilterDateTo: null,
  FilterUserIntervention: null,
  FilterWoundType: null,
  FilterRoom: null,
  FilterBed: null,
  Order: "ASC",
  PropertyOrder: "NextIntervention",
  Page: 0,
  NumberRowsPerPage: 10,
  NumberOfRecords: 0,
  Refresh: true,
  TokenRefresh: false,
  SearchRefresh: false,
  SearchValues: "",
  isLoading:false,
  WoundTypologies: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "WOUNDS_PATIENTS_FETCHED":
      if (action.error) {
        // se deu erro
        if (action.payload !== undefined) {
          if (action.payload.status === 403 || action.payload.status === 401) {
            // Token invalido
            return {
              ...state,
              list: [],
              //Refresh: false,
              TokenRefresh: true,
              isLoading:false
            };
          } else {
            return { ...state, list: [], isLoading:false };
          }
        } else {
          return { ...state, list: [], isLoading:false };
        }
      } else {
        return {
          ...state,
          list: action.payload.data.result.patients,
          NumberOfRecords: action.payload.data.result.count,
          Refresh: false,
          TokenRefresh: false,
          isLoading:false
        };
      }
    case "WOUNDS_PATIENTS_SEARCH":
      if (action.error) {
        // se deu erro
        if (action.payload.status === 403 || action.payload.status === 401) {
          // Token invalido
          return {
            ...state,
            listSearch: [],
            Refresh: false,
            TokenRefresh: true,
            SearchRefresh: true,
            SearchValues: action.searchData,
            isLoading:false
          };
        } else {
          return {
            ...state,
            Refresh: false,
            listSearch: [],
            SearchRefresh: false,
            SearchValues: "",
            isLoading:false
          };
        }
      } else {
        return {
          ...state,
          listSearch: action.payload.data.result,
          Refresh: false,
          TokenRefresh: false,
          SearchRefresh: false,
          SearchValues: "",
          isLoading:false
        };
      }
    case "WOUNDS_TYPOLOGIES":
      if (action.error) {
        // se deu erro
/*         if (action.payload.status === 403 || action.payload.status === 401) {
          // Token invalido
          return {
            ...state,
            WoundTypologies: [],
            TokenRefresh: true,
          };
        } else { */
          return {
            ...state,
            WoundTypologies: [] ,
            TokenRefresh: false,
          };
        /* } */
      } else {
        return {
          ...state,
          WoundTypologies: action.payload.data.result,
          TokenRefresh: false
        };
      }
    default:
      return state;
  }
}
