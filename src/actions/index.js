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

export const showAlert = (message) => {
  return {
    type: "SHOW_ALERT",
    payload: message
  }
}

export const removeAlert = () => {
  return {
    type: "REMOVE_ALERT",
  }
}

export const setSearchText = (searchText) => {
  return {
    type: "SET_SEARCH_TEXT",
    payload: searchText
  }
}
