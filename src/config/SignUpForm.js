import React, { Component, useState } from "react";

import { FirebaseContext } from "../config/Firebase";

import "../app.css";

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const SignUpForm = () => (
  <FirebaseContext.Consumer>
    {firebase => <MyForm firebase={firebase} />}
  </FirebaseContext.Consumer>
);

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <div>
        <form onSubmit={this.onSubmit} style={{ marginTop: "20px" }}>
          <div className="SignUpFormInput">
            <h3 className="SignUpFormInput">Или зарегистрируйтесь</h3>

            <input
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="SignUpFormInput">
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="SignUpFormInput">
            <input
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="SignUpFormInput">
            <input
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <div className="SignUpFormInput">
            <button disabled={isInvalid} type="submit">
              Зарегистрироваться
            </button>
            {error && <p>{error.message}</p>}
          </div>
        </form>
        {/* <BaseuIForm /> */}
      </div>
    );
  }
}

export default SignUpForm;

// function BaseuIForm() {
//   // Declare a new state variable, which we'll call "count"
//   const [value, setValue] = React.useState('');
//   return (
//     <FormControl label="Input label" caption="Input caption">
//       <Input
//         id="input-id"
//         value={value}
//         onChange={event => setValue(event.currentTarget.value)}
//       />
//     </FormControl>
//   );
// }
