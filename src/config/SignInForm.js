import React, { Component } from 'react';
import { FirebaseContext } from '../config/Firebase';

import "../app.css";

const SignInForm = (props) => (
  <FirebaseContext.Consumer>
    {firebase => <MyForm firebase={firebase} {...props}/>}
  </FirebaseContext.Consumer>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  user: null
};

class MyForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then((res) => {
        this.setState({ ...INITIAL_STATE, user: res.user.email });
     //   console.log('Signed in!!!');
     //   console.log(res);
        this.props.onLogin(res.user.providerData); 
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div>
        {this.state.user ?
          <p>{this.state.user}</p> :
          <form onSubmit={this.onSubmit} style={{marginBottom: '20px'}}>
          <div className="flexRowOrColumn">
             {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}> */}
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
            <button disabled={isInvalid} type="submit">
              Войти
        </button>
        </div>
            {error && <p>{error.message}</p>}
          </form>
        }
      </div>

    );
  }
}

export default SignInForm;
