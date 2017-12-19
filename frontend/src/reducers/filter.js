export default function reducer(state = '', action) {
  if (action.type === 'FILTER_FULFILLED') {
    return action.payload;
  }
  return state;
}
