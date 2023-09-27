import { API_URL } from "../config";
/* SELECTORS */
export const getAds = ({ ads }) => ads.data;
export const getRequest = ({ ads }) => ads.request;

/* ACTIONS */

const createActionName = (name) => `app/ads/${name}`;
const START_REQUEST = createActionName("START_REQUEST");
const END_REQUEST = createActionName("END_REQUEST");
const ERROR_REQUEST = createActionName("ERROR_REQUEST");
const LOAD_ADS = createActionName("LOAD_ADS");
const ADD_AD = createActionName("ADD_AD");
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });
export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const addAd = (payload) => ({ payload, type: ADD_AD });

/* THUNKS */
export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest({ name: "LOAD_ADS" }));

    try {
      let response = await fetch(`${API_URL}/ads`);
      
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      let data = await response.json();
      dispatch(loadAds(data));
      dispatch(endRequest({ name: "LOAD_ADS" }));
    } catch (error) {
      dispatch(errorRequest({ name: "LOAD_ADS", error: error.message }));
    }
  };
};

export const addAdRequest = (ad) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: "ADD_AD" }));

    try {
      let response = await fetch(`${API_URL}/ads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ad),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      let data = await response.json();
      dispatch(addAd(data));
      dispatch(endRequest({ name: "ADD_AD" }));
    } catch (error) {
      dispatch(errorRequest({ name: "ADD_AD", error: error.message }));
    }
  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  requests: {},
};

/* REDUCER */

const adsReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload] };
    case ADD_AD:
      return { ...statePart, data: [...statePart.data, action.payload] };
    case START_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: true, error: null, success: false },
        },
      };
    case END_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: false, error: null, success: true },
        },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: {
            pending: false,
            error: action.payload.error,
            success: false,
          },
        },
      };
    default:
      return statePart;
  }
}
export default adsReducer;