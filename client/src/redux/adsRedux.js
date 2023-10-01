import { API_URL } from "../config";
/* SELECTORS */
export const getAds = ({ ads }) => ads;

/* ACTIONS */
const reducerName = 'ads';
const createActionName = (name) => `app/${reducerName}/${name}`;

const LOAD_ADS = createActionName("LOAD_ADS");
const ADD_AD = createActionName("ADD_AD");

export const loadAds = (payload) => ({ type: LOAD_ADS, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });

/* THUNKS */
export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(loadAds(null));

    try {
      let response = await fetch(`${API_URL}/ads`);
      let data = await response.json();
      dispatch(loadAds(data));
      console.log('data', data);
      console.log('response', response);
      
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAdRequest = (ad) => {
  return async (dispatch) => {
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
     
    } catch (error) {
      console.log(error);
    }
  };
};


/* REDUCER */

const adsReducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOAD_ADS:
      return [...action.payload];
    case ADD_AD:
      return [...statePart, action.payload];
    default:
      return statePart;
  }
}
export default adsReducer;