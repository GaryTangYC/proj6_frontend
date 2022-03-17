import { createContext, useReducer } from "react";

/* action type constants */
const USER_SIGNED_IN = "USER_SIGNED_IN";
const POPULATE_HOME = "POPULATE_HOME";
const LOGOUT = "LOGOUT";
const UPDATE_PIC = "UPDATE_PIC";
const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_BIO = "UPDATE_BIO";
const UPDATE_POSTAL = "UPDATE_POSTAL";

/* useReducer initial state  */
const initialState = {
  user: {pic:null},
  token: null,
  tasks: [],
  partnerTasks: [],
  otherUsers: null,
};

/* useReducer reducer function */
export const appReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case USER_SIGNED_IN:
      newState = {
        ...state,
        token: action.token,
      };
      return newState;
    case LOGOUT:
      newState = initialState;
      return newState;
    case POPULATE_HOME:
      newState = {
        ...state,
        user: action.user,
        tasks: action.tasks,
        partnerTasks: action.partnerTasks,
        otherUsers: action.otherUsers,
      };
      return newState;
    case UPDATE_PIC:
      newState = {
        ...state,
        user: { ...state.user, pic: action.picPath },
      };
      return newState;
    case UPDATE_NAME:
      newState = {
        ...state,
        user: { ...state.user, name: action.newDetail },
      };
      return newState;
    case UPDATE_EMAIL:
      newState = {
        ...state,
        user: { ...state.user, email: action.newDetail },
      };
      return newState;
    case UPDATE_BIO:
      newState = {
        ...state,
        user: { ...state.user, bio: action.newDetail },
      };
      return newState;
    case UPDATE_POSTAL:
      newState = {
        ...state,
        user: { ...state.user, postal: action.newDetail },
      };
      return newState;
    default:
      return state;
  }
};

/* functions to pass action object to useReducer dispatch function */

export const userSignIn = (token) => {
  return {
    type: USER_SIGNED_IN,
    token,
  };
};

export const userLogOut = () => {
  return {
    type: LOGOUT,
  };
};

export const populateHome = (user, tasks, partnerTasks, otherUsers) => {
  return {
    type: POPULATE_HOME,
    user,
    tasks,
    partnerTasks,
    otherUsers,
  };
};

export const updatePic = (picPath) => {
  return {
    type: UPDATE_PIC,
    picPath,
  };
};

export const updateDetail = (field, newDetail) => {
  console.log("detailing run");
  let obj;

  if (field === "name") {
    obj = {
      type: UPDATE_NAME,
      newDetail,
    };
  } else if (field === "email") {
    obj = {
      type: UPDATE_EMAIL,
      newDetail,
    };
  } else if (field === "bio") {
    obj = {
      type: UPDATE_BIO,
      newDetail,
    };
  } else if (field === "postal") {
    obj = {
      type: UPDATE_POSTAL,
      newDetail,
    };
  }

  return obj;
};

/* single context instance to encapsulate app reducer */
export const Context = createContext();

export const AppProvider = ({ children }) => {
  const [store, dispatch] = useReducer(appReducer, initialState);
  return (
    <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>
  );
};