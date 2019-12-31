import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import fetch from "isomorphic-unfetch";

const exampleInitialState = {
  studios: [],
  locations: {}
};

export const actionTypes = {
  GET_DATA: "GET_DATA"
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DATA:
      return Object.assign({}, state, {
        studios: action.data.studios,
        locations: action.data.locations
      });
    default:
      return state;
  }
};

export const getData = () => async (dispatch, getState) => {
  const { studios, locations } = getState();

  if (studios.length && Object.keys(locations).length) {
    return;
  }

  try {
    const url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api"
        : `https://designstudio.directory/api`;

    const response = await fetch(url);
    const { studios, locations } = await response.json();

    dispatch({ type: actionTypes.GET_DATA, data: { studios, locations } });
  } catch (error) {
    console.error(error);
  }
};

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
