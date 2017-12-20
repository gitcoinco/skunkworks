export function setFilter(size) {
  return function(dispatch) {
    dispatch({ type: `FILTER_FULFILLED`, payload: size });
  };
}

export function setSearch(search) {
  return function(dispatch) {
    dispatch({ type: `SEARCH_FULFILLED`, payload: search });
  };
}
