import React, { Component } from "react";
import { connect } from "react-redux";

import { Area, AreaChart, Label, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

import { getChartData } from "../actions/linechart";
import "./LineChart.css";


class LineChartComponent extends Component {

  constructor(props) {
    super(props);

    this.area = null;
    this.tooltip = null;
    this.point = null;

    this.onChartMouseMove = this.onChartMouseMove.bind(this);
    this.onChartMouseLeave = this.onChartMouseLeave.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getChartData());
  }

  onChartMouseMove(chart) {
    if (chart.isTooltipActive) {
      let point = this.area.props.points[chart.activeTooltipIndex];

      if (point !== this.point) {
        this.point = point;
        this.updateTooltip();
      }
    }
  }

  onChartMouseLeave() {
    this.point = null;
    this.updateTooltip();
  }

  updateTooltip() {
    if (this.point) {
      let x = Math.round(this.point.x);
      let y = Math.round(this.point.y);

      this.tooltip.style.opacity = '1';
      this.tooltip.style.transform = `translate(${x}px, ${y}px)`;
      this.tooltip.childNodes[0].innerHTML = `${this.point.payload['gasprice']} GWEI`;
    }
    else {
      this.tooltip.style.opacity = '0';
    }
  }

  render() {
    return (
      <div>
        <h3>Live prediction confirmation time vs gas price</h3>
        {this.props.linechart.chartdata && (
          <div className="ui-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart width={600} height={300} data={this.props.linechart.chartdata}
                         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                         onMouseMove={this.onChartMouseMove}
                         onMouseLeave={this.onChartMouseLeave}
              >
                <defs>
                  <linearGradient id="colorExpectedTime" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#9fc4f6" stopOpacity={0.2}/>
                    <stop offset="75%" stopColor="#9fc4f6" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="gasprice" minTickGap={1000} stroke='#eee' tick={{ "fill": "#808080" }}>
                  <Label value='Gas Price (gwei)' position="insideBottom" style={{ textAnchor: "middle" }}/>
                </XAxis>
                <YAxis dataKey="expectedTime" scale="log" domain={["dataMin", "dataMax"]} minTickGap={1000} stroke='#eee'
                       tick={{ "fill": "#808080" }}>
                  <Label angle={270} value='Confirmation Time (min)' position='insideLeft' offset={30}
                         style={{ textAnchor: "middle", color: "#B6B8BF" }}/>
                </YAxis>
                <Tooltip cursor={false}/>
                <Area type='monotone' dataKey='expectedTime' dot={{ stroke: "#3098dc", strokeWidth: 2 }}
                      activeDot={{ r: 6 }} stroke='#3098dc' fillOpacity={1} fill="url(#colorExpectedTime)"
                      ref={ref => this.area = ref}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="tooltip-container" ref={ref => this.tooltip = ref}>
              <p className="gasprice"></p>
            </div>
          </div>
        )}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    linechart: state.linechart
  };
}


export default connect(mapStateToProps)(LineChartComponent);
