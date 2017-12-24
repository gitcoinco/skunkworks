export default function reducer(state = '', action) {
  if (action.type === 'SEARCH_FULFILLED') {
    return action.payload;
  }
  return state;
}
