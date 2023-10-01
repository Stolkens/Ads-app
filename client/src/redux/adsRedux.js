import axios from 'axios';
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
    dispatch(loadAds(""));
    try {
      let res = await axios.get(`${API_URL}/ads`);
      dispatch(loadAds(res.data));
    } catch (e) {
      console.log(e);
    }
  };
};

export const addAdRequest = (ad) => {
  return async (dispatch) => {
    try {
      await axios.post(`${API_URL}/ads`, ad, {
        withCredentials: true,
      });
      dispatch(loadAdsRequest());
    } catch (e) {
      console.log(e);
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