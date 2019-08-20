import React, { Component } from 'react';
import { FirebaseContext } from '../config/Firebase';

const UserData = (props) => (
  <FirebaseContext.Consumer>
    {firebase => <AllData firebase={firebase} {...props}/>}
  </FirebaseContext.Consumer>
);



class AllData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      userdata: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.user(this.props.useruid).on('value', snapshot => {
      const userdataObject = snapshot.val();

      let userdataList = [];

      if (!!userdataObject) {
        userdataList = Object.keys(userdataObject).map(key => ({
          ...userdataObject[key],
          uid: key,
        }));
      }      

      this.setState({
        userdata: userdataList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user().off();
  }

  render() {
    const { userdata, loading } = this.state;
    return (
      <div>
        User Data
         {loading && <div>...</div>}
        <ul>
          {userdata.length > 0 && userdata.map(user => (
            <li key={user.uid}>
              <span>
                <strong>UID</strong> {user.uid}
              </span>
              <span>
                <strong>Name:</strong> {user.name}
              </span>
              <span>
                <strong>Value:</strong> {user.value}
              </span>
              <span>
                <strong>Time:</strong> {user.timestamp}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default UserData;