import { createContext, useReducer } from "react";

/* action type constants */
const USER_SIGNED_UP = "USER_SIGNED_UP";
const USER_SIGNED_IN = "USER_SIGNED_IN";
const LOGOUT = "LOGOUT";

/* useReducer initial state  */
const initialState = {
  user: null,
  token: null,
};

/* useReducer reducer function */
export const appReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case USER_SIGNED_IN:
      newState = {
        ...state,
        user: {
          id: action.id,
          name: action.name,
          email: action.email,
          postal: action.postal,
          pic: action.pic,
          bio: action.bio,
          requests: action.requests,
        },
        token: action.token,
      };
      return newState;
    case USER_SIGNED_UP:
      newState = {
        ...state,
        user: { id: action.id, name: action.name, email: action.email, postal: action.postal },
        token: action.token,
      };
      return newState;
    case LOGOUT:
      newState = initialState;
      return newState;
    default:
      return state;
  }
};

/* functions to pass action object to useReducer dispatch function */
export const userSignUp = (id, name, email, postal, token) => {
  return {
    type: USER_SIGNED_UP,
    id,
    name,
    email,
    postal,
    token,
  };
};

export const userSignIn = (id, name, email, postal, pic, bio, requests, token) => {
  return {
    type: USER_SIGNED_IN,
    id,
    name,
    email,
    postal,
    pic,
    bio,
    requests,
    token,
  };
};

export const userLogOut = () => {
  return {
    type: LOGOUT,
  };
};

/* single context instance to encapsulate app reducer */
export const Context = createContext();

export const AppProvider = ({ children }) => {
  const [store, dispatch] = useReducer(appReducer, initialState);
  return (
    <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>
  );
};
