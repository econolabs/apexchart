import React, { Component } from 'react';
import { FirebaseContext } from './Firebase';

const AllUsers = () => (
    <FirebaseContext.Consumer>
        {firebase => <UsersList firebase={firebase} />}
    </FirebaseContext.Consumer>
);

class UsersList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }

    render() {
        const { users, loading } = this.state;
        return (
            <div>
                <p>Users List</p>
                {loading && <div>...</div>}
                <ul>
                    {users.length > 0 && users.map(user => (
                        <li key={user.uid}>
                            <span>
                                <strong>ID:</strong> {user.uid}
                            </span>
                            <span>
                                <strong>E-Mail:</strong> {user.email}
                            </span>
                            <span>
                                <strong>Username:</strong> {user.username}
                            </span>
                        </li>
                    ))}
                </ul>

            </div>
        );
    }
}

export default AllUsers;