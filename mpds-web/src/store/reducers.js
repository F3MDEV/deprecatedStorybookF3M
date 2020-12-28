import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';

import woundsReducer from './reducers/Module_Wounds/woundsReducer';
import loginReducer from './reducers/login/loginReducer';
import patientReducer from './reducers/patient/patientReducer';
import woundInfoReducer from './reducers/Module_Wounds/woundInfoReducer';

const rootReducer = combineReducers({
  wounds: woundsReducer,
  form: formReducer,
  login: loginReducer,
  loadingBar: loadingBarReducer,
  patient: patientReducer,
  woundInfo: woundInfoReducer
});

export default rootReducer;
