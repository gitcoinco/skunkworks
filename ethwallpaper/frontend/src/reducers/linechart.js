export default function reducer(
    state = {
      chartdata: null,
      loading: false,
      error: null,
    },
    action,
) {
  const docsType = 'GET_CHART_DATA';
  switch (action.type) {
    case `${docsType}_PENDING`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case `${docsType}_FULFILLED`:
      return {
        ...state,
        loading: false,
        chartdata: action.payload,
        error: null,
      };

    case `${docsType}_REJECTED`:
      return {
        ...state,
        loading: false,
        chartdata: null,
        error: action.payload,
      };

    default:
      return state;
  }
}