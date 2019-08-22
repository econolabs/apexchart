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
      userdata: [],
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
    this.handleSeriesDataChange = this.handleSeriesDataChange.bind(this);
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

      let seriename = this.state.series[0].name;
      let seriedata = [...this.state.series[0].data];
      let newseriedata = this.state.series[0].data.map((item, index) => {
 //       let userdataitem = userdata.find(dataitem => dataitem.dimension1 === seriename && dataitem.dimension2===)
        return item;
      });
      console.log(newseriedata);
      this.setState({
        userdata: userdataList,
        isUpdating: false
      });
    });
  }

  handleSeriesDataChange(datalineNumber, datalineArrayElement, elementValue) {
    this.setState({
      isUpdating: true
    });
    let series = [...this.state.series];
    let datalineDataArray = [...series[datalineNumber].data];
    datalineDataArray[datalineArrayElement] = parseFloat(elementValue);
    series[datalineNumber].data = datalineDataArray;

    let timestamp = Date.now();
    let category = this.state.xaxis.categories[datalineArrayElement];
    let xaxe = this.state.series[datalineNumber].name;
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
        dimension1: this.state.series[datalineNumber].name,
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
    let { isUpdating } = this.state;
    console.log(this.state.userdata);
    //console.log(username, useruid);

    return (
      <div className="ChartEditorContainer">
        <div style={{ minWidth: "900px", maxHeight: "500px" }}>
          {isUpdating ? (
            <div>...</div>
          ) : (
            <ChartLayout
              useruid={this.props.useruid}
              series={this.state.series}
              xaxis={this.state.xaxis}
            />
          )}
        </div>
        <div>
          <span style={{ marginRight: "2rem" }}>{this.props.username}</span>
          <span>
            <SignOutButton onLogin={this.props.onLogin} />
          </span>
          <hr />
          <TableLayout
            useruid={this.props.useruid}
            series={this.state.series}
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
