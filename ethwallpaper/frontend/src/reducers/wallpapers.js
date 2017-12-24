export default function reducer(
  state = {
    payload: [],
    fetching: false,
    fetched: false,
    error: null,
  },
  action,
) {
  const docsType = 'GET_WALLPAPERS';
  switch (action.type) {
    case `${docsType}_PENDING`:
      return {
        ...state,
        fetching: true,
      };

    case `${docsType}_FULFILLED`:
      return {
        ...state,
        fetching: false,
        fetched: true,
        payload: action.payload,
      };

    case `${docsType}_REJECTED`:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
