import React from "react";

import ChartLayout from "../charts/ChartLayout";
import TableLayout from "./TableLayout";

import "../app.css";

class ChartEditorLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      useruid: null,
      series: [
        {
          name: "series-1",
          data: [100, 40, 45, 100, 49, 60, 70, 100]
        }
      ],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    };
  }

  render() {
    //const { username, useruid } = this.state;
    //console.log(username, useruid);

    return (
      <div className="ChartEditorContainer">
        <div style={{ minWidth: "900px", maxHeight: "500px" }}>
          <ChartLayout
            useruid={this.props.useruid}
            series={this.state.series}
            xaxis={this.state.xaxis}
          />
        </div>
        <TableLayout
          useruid={this.props.useruid}
          series={this.state.series}
          xaxis={this.state.xaxis}
        />
      </div>
    );
  }
}

export default ChartEditorLayout;
