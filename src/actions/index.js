export const startLoading = () => {
  return {
    type: "LOADING_ON",
  }
}

export const stopLoading = () => {
  return {
    type: "LOADING_OFF",
  }
}

export const showError = (message) => {
  return {
    type: "SHOW_ERROR",
    payload: message
  }
}

export const removeError = () => {
  return {
    type: "REMOVE_ERROR",
  }
}

export const setSearchText = (searchText) => {
  return {
    type: "SET_SEARCH_TEXT",
    payload: searchText
  }
}
