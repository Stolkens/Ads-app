import { applyMiddleware, combineReducers, compose } from "redux";
import { legacy_createStore as createStore} from 'redux';
import thunk from "redux-thunk";
import adsReducer from "./adsRedux";

const subreducers = {
 ads: adsReducer,
}


const rootReducer = combineReducers(subreducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;