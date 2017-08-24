import React from 'react';
import { Link } from 'react-router';
import { loginUser, isLoggedIn } from '../utils/users-api';
import { browserHistory } from 'react-router';
import { Flash } from './components/mini-components/Flash';


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            error: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        loginUser(username, password)
            .then((userInfo) => {
                if(userInfo.success === true) {
                    // console.log(userInfo.success);
                    this.setState({
                        userInfo
                    })
                    browserHistory.push("/dashboard");
                    window.location.reload();
                    console.log("Welcome " + userInfo.user.username + "! to Dashboard");
                    console.log(userInfo.user.username);
                    // window.location.reload();
                    // console.log("Welcome " + userInfo.user.username + "! to Dashboard");
                    // console.log(userInfo.user.username);
                    // browserHistory.push("/dashboard");
                } else if(userInfo.success === false) {
                    console.log(userInfo);
                } 
                else {
                    console.log(userInfo);
                    this.setState({
                        error: userInfo
                    })

                }
        }).catch((error) => {
            console.log("Username or Password invalid!");
            this.setState({
                error: "Username or Password invalid."
            })
        })
    }

    render() {
        return(
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                     <center><h2>Login</h2></center>
                    {(this.state.error == '')? '' : <Flash type="danger" name="Error" content={this.state.error}/>}
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2">
                            <form id="login-form">
                                <div className="form margin-large-top text-center">
                                    <div className="form-group">
                                        <input type="text" ref="username" className="form-control" id="inputUsername"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" ref="password" className="form-control" id="inputPassword"/>
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