import React from "react";

import { FirebaseContext } from "../config/Firebase";

import ChartLayout from "../charts/ChartLayout";
import TableLayout from "./TableLayout";
import SignOutButton from "../config/SignOutButton";

import "../app.css";

const ChartEditorLayout = props => (
  <FirebaseContext.Consumer>
    {firebase => (
      <ChartEditorLayoutWithFirebase firebase={firebase} {...props} />
    )}
  </FirebaseContext.Consumer>
);

class ChartEditorLayoutWithFirebase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUpdating: true,
      series: [
        {
          name: "series-1",
          data: [100, 40, 45, 100, 49, 60, 70, 100]
        },
        {
          name: "series-2",
          data: [10, 20, 30, 100, 80, 70, 30, 10]
        },
        {
          name: "series-3",
          data: [50, 25, 35, 60, 50, 40, 20, 10]
        }
      ],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      },
      activeSeriesLine: 0,
    };
    this.handleSeriesDataChange = this.handleSeriesDataChange.bind(this);
    this.setActiveLine = this.setActiveLine.bind(this);
  }

  setActiveLine(activeLine) {
    this.setState({ activeSeriesLine: activeLine });
 //   console.log(activeLine);
  }

  componentDidMount() {
    this.props.firebase.user(this.props.useruid).once("value", snapshot => {
      const userdataObject = snapshot.val();

      let userdataList = [];

      if (!!userdataObject) {
        userdataList = Object.keys(userdataObject).map(key => ({
          ...userdataObject[key],
          uid: key
        }));
      }

      let series = [...this.state.series];

      this.state.series.map((line, lineIndex) => {
        let seriename = line.name;
        let newseriedata = this.state.series[lineIndex].data.map((oldValue, index) => {
          let xaxisItem = this.state.xaxis.categories[index];
          // console.log(xaxisItem);
          // console.log(seriename);
          // console.log(oldValue);
          let userdataitem = userdataList.filter(
            dataitem =>
              dataitem.dimension1 === seriename &&
              dataitem.dimension2 === xaxisItem
          );
          if (userdataitem.length > 0) {
            let newValue = parseFloat(userdataitem[0].value);
         //   console.log(newValue);
            return newValue
          }
          return oldValue;
        });

        series[lineIndex].data = newseriedata;
     //   console.log(newseriedata);
      }
      );




      this.setState({
        series,
        isUpdating: false
      });
    });
  }

  handleSeriesDataChange(datalineArrayElement, elementValue) {
    this.setState({
      isUpdating: true
    });
    let activeSeriesLine = this.state.activeSeriesLine;

    let series = [...this.state.series];
    let datalineDataArray = [...series[activeSeriesLine].data];
    datalineDataArray[datalineArrayElement] = parseFloat(elementValue);
    series[activeSeriesLine].data = datalineDataArray;

    let timestamp = Date.now();
    let category = this.state.xaxis.categories[datalineArrayElement];
    let xaxe = this.state.series[activeSeriesLine].name;
    let firebasecode = xaxe + "___" + category;

    this.props.firebase
      .user(this.props.useruid)
      .child(firebasecode)
      .set({
        value: elementValue,
        dimension1: xaxe,
        dimension2: category,
        source: "Basic Line",
        timestamp
      })
      .then(() => {
        console.log("Successfully set for User");
      });

    this.props.firebase
      .databycode(firebasecode)
      .child(this.props.useruid)
      .set({
        value: elementValue,
        dimension1: this.state.series[activeSeriesLine].name,
        dimension2: this.state.xaxis.categories[datalineArrayElement],
        source: "Basic Line",
        timestamp
      })
      .then(() => {
        console.log("Successfully set for Code");
        this.setState({ series, isUpdating: false });
      });

    // setTimeout(
    //   function() {
    //     this.setState({ series, isUpdating: false });
    //   }.bind(this),
    //   2000
    // );
  }

  componentWillUnmount() {
    this.props.firebase.user().off();
    this.props.firebase.databycode().off();
  }

  render() {
    let { isUpdating, series, activeSeriesLine } = this.state;
    let seriesLine = series[activeSeriesLine];
    let lines = series.map((item) => item.name);

   // console.log(series);
    return (
      <div className="flexRowOrColumn">
        <div style={{ width: "900px", maxHeight: "500px" }}>
          {isUpdating ? '...' :
            <ChartLayout
              useruid={this.props.useruid}
              series={this.state.series}
              xaxis={this.state.xaxis}
            />
          }
        </div>
        <div style={{ marginRight: "2rem" }}>
          <span style={{ marginRight: "2rem" }}>{this.props.username}</span>
          <span>
            <SignOutButton onLogin={this.props.onLogin} />
          </span>
          <ChooseLineInSeries lines={lines} activeSeriesLine={activeSeriesLine} setActiveLine={this.setActiveLine} />
          <TableLayout
            useruid={this.props.useruid}
            seriesLine={seriesLine}
            xaxis={this.state.xaxis}
            typeofchart={this.props.typeofchart}
            handleSeriesDataChange={this.handleSeriesDataChange}
          />
        </div>
      </div>
    );
  }
}

export default ChartEditorLayout;

function ChooseLineInSeries({ lines, activeSeriesLine, setActiveLine }) {
 // console.log(activeSeriesLine);
  return <div className="flexRowOrColumn">
    {lines.map((item, index) =>
      <p
        key={item}
        onClick={() => setActiveLine(index)}
        className="hover-underline-animation">
        {activeSeriesLine === index ? <b>{item}</b> : item}
      </p>)}
  </div>
}
