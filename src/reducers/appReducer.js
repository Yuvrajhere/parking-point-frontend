export const initialState = {
  loading: false,
  alert: "",
  searchText: ""
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING_ON": {
      return {
        ...state,
        loading: true,
      };
    }

    case "LOADING_OFF": {
      return {
        ...state,
        loading: false,
      };
    }

    case "REMOVE_ALERT": {
      return {
        ...state,
        alert: "",
      };
    }

    case "SHOW_ALERT": {
      return {
        ...state,
        alert: action.payload
      }
    }

    case "SET_SEARCH_TEXT": {
      return {
        ...state,
        searchText: action.payload
      }
    }

    default: {
      return state;
    }
  }
};
