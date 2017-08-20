import React from 'react';
import { Link } from 'react-router';
<<<<<<< HEAD
import { login } from '../utils/users-api';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: '',
            token: ''
        }

=======
import { loginUser, isLoggedIn } from '../utils/users-api';
import { browserHistory } from 'react-router';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: ''
        }
>>>>>>> 3813ff38f66edb817bf37253c5e74167bef8ac1d
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var username = this.refs.username.value;
        var password = this.refs.password.value;
<<<<<<< HEAD
        login(username, password).then(users => {
            this.setState({
                users,
                token: users.token
            })
        });
    }
    
=======
        loginUser(username, password).then((userInfo, err) => {
            if(userInfo.success === true) {
                this.setState({
                    userInfo
                })
                console.log("Welcome " + userInfo.user.username + "! to Dashboard");
                console.log(userInfo.user.username);
                browserHistory.push("/dashboard");
            } else if(userInfo.success === false) {
                console.log("Error: " + userInfo.msg);
            } else {
                console.log(userInfo);
            }
        });
    }
>>>>>>> 3813ff38f66edb817bf37253c5e74167bef8ac1d

    render() {
        console.log(this.state.token);
        return(
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                     <center><h2>Login</h2></center>
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2">
                            <form id="login-form">
                                <div className="form margin-large-top text-center">
                                    <div className="form-group">
<<<<<<< HEAD
                                        <input type="text" className="form-control" id="inputUsername" ref="username" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="inputPassword" ref="password" />
=======
                                        <input type="text" ref="username" className="form-control" id="inputUsername"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" ref="password" className="form-control" id="inputPassword"/>
>>>>>>> 3813ff38f66edb817bf37253c5e74167bef8ac1d
                                    </div>
                                    <div className="margin-large-top">
                                        <a type="submit" className="btn btn-default margin-top" onClick={this.handleSubmit}>Login</a>
                                        <Link to={"/register"} type="button" className="btn btn-default margin-top margin-left">Register</Link>
                                    </div>
                                </div>
                            </form>    
                        </div>    
                    </div> 
                </div>
            </div>
        );
    }

}