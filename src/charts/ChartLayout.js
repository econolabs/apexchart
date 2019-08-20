import React, { Component } from "react";
import Chart from "react-apexcharts";

class ChartLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: this.props.series ? this.props.series :
      [
        {
          name: "series-1",
          data: [100, 100, 100, 100, 100, 100, 100, 100]
        }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="880"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartLayout;