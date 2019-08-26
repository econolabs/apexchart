import React, { Component } from 'react';
import { FirebaseContext } from '../config/Firebase';

const UserData = (props) => (
  <FirebaseContext.Consumer>
    {firebase => <AllData firebase={firebase} {...props} />}
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
        <table style={{minWidth: '1000px'}}>
          <thead>
            <tr>
              <th>uid</th>
              <th>value</th>
              <th>dimension1</th>
              <th>dimension2</th>
              <th>source</th>
              <th>timestamp</th>
            </tr>
          </thead>
          <tbody>
            {userdata.length > 0 && userdata.map(user => (
              <tr key={user.uid}>
                <td>{user.uid}</td>
                <td>{user.value}</td>
                <td>{user.dimension1}</td>
                <td>{user.dimension2}</td>
                <td>{user.source}</td>
                <td>{user.timestamp}</td>
              </tr>

              //   <li key={user.uid}>
              //     <span>
              //       <strong>UID</strong> {user.uid}
              //     </span>
              //     <span>
              //       <strong>value:</strong> {user.value}
              //     </span>
              //     <span>
              //       <strong>Name:</strong> {user.name}
              //     </span>
              //     <span>
              //       <strong>Time:</strong> {user.timestamp}
              //     </span>
              //   </li>
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}
export default UserData;