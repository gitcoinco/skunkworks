export default function reducer(
  state = {
    payload: {},
    fetching: false,
    fetched: false,
    error: null,
  },
  action,
) {

  const docsType = 'WALLPAPER_ACTIVITY';
  switch (action.type) {
    case `${docsType}_PENDING`:
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null,
      };

    case `${docsType}_FULFILLED`:
      return {
        ...state,
        fetching: false,
        fetched: true,
        payload: action.payload,
        error: null,
      };

    case `${docsType}_REJECTED`:
      return {
        ...state,
        fetching: false,
        fetched: false,
        payload: {},
        error: action.payload,
      };

    default:
      return state;
  }
}
