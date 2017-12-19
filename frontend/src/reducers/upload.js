export default function reducer(
  state = {
    payload: {},
    fetching: false,
    fetched: false,
    error: null,
  },
  action,
) {
  const docsType = 'UPLOAD_WALLPAPER';
  switch (action.type) {
    case `${docsType}_PENDING`:
      return {
        ...state,
        payload: {},
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
      };

    case `${docsType}_REJECTED`:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };

    case `${docsType}_FINISHED`:
      return {
        ...state,
        payload: {},
        fetching: false,
        fetched: false,
        error: null,
      };

    default:
      return state;
  }
}
