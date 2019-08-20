import React, { Component } from "react";
import { FirebaseContext } from "../config/Firebase";

const FirebaseUserInput = props => (
  <FirebaseContext.Consumer>
    {firebase => <MyForm firebase={firebase} {...props} />}
  </FirebaseContext.Consumer>
);

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();

    let timestamp =Date.now();

    this.props.firebase
      .user(this.props.useruid)
      .child(this.props.firebasecode)
      .set({
        value: this.state.value,
        name: this.props.name,
        timestamp
      })
      .then(() => {
        console.log("Successfully set for User");
      });

      this.props.firebase
      .databycode(this.props.firebasecode)
      .child(this.props.useruid)
      .set({
        value: this.state.value,
        name: this.props.name,
        timestamp
      })
      .then(() => {
        console.log("Successfully set for Code");
        this.props.handleClick(null);
      });
  }

  componentWillUnmount() {
    this.props.firebase.user().off();
    this.props.firebase.databycode().off();
  }

  render() {
    const { value } = this.state;
    console.log(this.props);
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {this.props.name}:
          <input type="text" value={value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default FirebaseUserInput;
