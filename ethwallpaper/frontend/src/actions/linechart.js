import axios from "axios";
import { chartDataUrl } from '../config/apiClient';


export function getChartData() {
  const type = 'GET_CHART_DATA';
  return function(dispatch) {
    dispatch({ type: `${type}_PENDING` });
    axios
        .get(chartDataUrl)
        .then(response => {
          let chartdata = processChartData(response.data);
          dispatch({ type: `${type}_FULFILLED`, payload: chartdata });
        })
        .catch(err => {
          dispatch({ type: `${type}_REJECTED`, payload: err });
        });
  };
}

let processChartData = function (response) {
  let data = [];

  response.forEach(function (v, k) {
    data.push({ 'gasprice': v.gasprice, 'expectedTime': v.expectedTime < 120 ? v.expectedTime : 120 });
  });

  let lowExpectedTimeData = data.filter(obj => obj.expectedTime === data[data.length - 1].expectedTime);
  let highExpectedTimeData = data.filter(obj => obj.expectedTime === data[0].expectedTime);

  data.splice(data.length - lowExpectedTimeData.length + 2, lowExpectedTimeData.length);
  data.splice(0, highExpectedTimeData.length - 2);

  return data;
};