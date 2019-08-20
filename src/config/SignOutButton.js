import React from "react";
import { FirebaseContext } from "../config/Firebase";

const SignOutButton = props => (
  <FirebaseContext.Consumer>
    {firebase => <DoSignOut firebase={firebase} {...props} />}
  </FirebaseContext.Consumer>
);

export default SignOutButton;

function DoSignOut(props) {
  function handleClick(e) {
    e.preventDefault();
    props.onLogin(null);
    props.firebase.doSignOut();
    console.log("The link was clicked.");
  }

  return <button onClick={handleClick}>Sign Out</button>;
}
