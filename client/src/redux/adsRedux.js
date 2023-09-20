import { API_URL } from "../config";

//selectors
export const getAds = ({ ads }) => ads.data;

// action names
const createActionName = actionName => `app/ads//${actionName}`;
const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');

// action creators
export const loadAds = (payload) => ({type: LOAD_ADS, payload});
export const addAd = (payload) => ({type: ADD_AD, payload});