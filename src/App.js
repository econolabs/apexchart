import React from "react";

import { HashRouter, Route, Link } from "react-router-dom";


import SignUpForm from "./config/SignUpForm";
import SignInForm from "./config/SignInForm";
import SignOutButton from "./config/SignOutButton";
import AllUsers from "./config/AllUsers";

import UserData from "./editor/UserData";
//import TableLayout from "./editor/TableLayout";

import ChartEditorLayout from "./editor/ChartEditorLayout";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      useruid: null
    };
  }

  onLogin = user => {
    if (user === null) {
      this.setState({ useruid: null, username: null });
    } else {
      let useruid = user[0].uid.replace(/@/g, "-");
      useruid = useruid.replace(/\./g, "_");
      this.setState({ useruid, username: user[0].uid });
    }
  };

  render() {
    const { username, useruid } = this.state;
    console.log(username, useruid);
    //   let useruid = str.replace(/@/g, "-");
    return (
      <HashRouter basename="/">
        <div>
          {/* <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/mychart">My Chart</Link>
            </li>
          </ul>
          <hr /> */}
          <Route exact path="/linechart/:id" component={LineChart} />
          <Route exact path="/areachart/:id" component={AreaChart} />
          <Route exact path="/columnchart/:id" component={ColumnChart} />
          <Route exact path="/barchart/:id" component={BarChart} />
          <Route exact path="/mixedchart/:id" component={MixedChart} />
          <Route
            exact
            path="/candlestickchart/:id"
            component={CandlestickChart}
          />
          <Route exact path="/scatterchart/:id" component={ScatterChart} />
          <Route path="/about" component={About} />
        </div>
      </HashRouter>
    );
  }
}

export default App;

const LineChart = ({ match }) => (
  <AppWithAuth typeofchart="Line" params={match.params} />
);
const AreaChart = ({ match }) => (
  <AppWithAuth typeofchart="Area" params={match.params} />
);
const ColumnChart = ({ match }) => (
  <AppWithAuth typeofchart="Column" params={match.params} />
);
const BarChart = ({ match }) => (
  <AppWithAuth typeofchart="Bar" params={match.params} />
);
const MixedChart = ({ match }) => (
  <AppWithAuth typeofchart="Mixed" params={match.params} />
);
const CandlestickChart = ({ match }) => (
  <AppWithAuth typeofchart="Candlestick" params={match.params} />
);
const ScatterChart = ({ match }) => (
  <AppWithAuth typeofchart="Scatter" params={match.params} />
);
const About = () => <h2>About</h2>;

class AppWithAuth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      useruid: null
    };
  }

  onLogin = user => {
    if (user === null) {
      this.setState({ useruid: null, username: null });
    } else {
      let useruid = user[0].uid.replace(/@/g, "-");
      useruid = useruid.replace(/\./g, "_");
      this.setState({ useruid, username: user[0].uid });
    }
  };

  render() {
    const { username, useruid } = this.state;
    console.log(username, useruid);
    //   let useruid = str.replace(/@/g, "-");
    return (
      <div>
        {useruid ? (
          <React.Fragment>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <p>Econolabs</p>
              <p>{this.state.username}</p>
              <p>{this.props.typeofchart}</p>
              <SignOutButton onLogin={this.onLogin} />
            </div>

            <hr/>
            <ChartEditorLayout useruid={useruid}/>
            {/* 
            <AllUsers />
            <UserData useruid={useruid} />
            */}
          </React.Fragment> 
        ) : (

          <React.Fragment>
            <SignInForm onLogin={this.onLogin} />
            <hr/>
            <SignUpForm />
          </React.Fragment>
        )}
      </div>
    );
  }
}
