import React from 'react';
import { Link } from 'react-router';
import { registerUser } from '../utils/users-api';
import { browserHistory } from 'react-router';
import { Flash } from './components/mini-components/Flash';

export class Register extends React.Component {
    
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(event) {
        event.preventDefault();
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        registerUser(username, email, password)
            .then((response) => {
                console.log(response.username + ", has been Registered Successfully!");
                browserHistory.push("/dashboard");
            }).catch((error) => {
                return error;
                console.log(error);
            })
    }

    render() {
        return(
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                    <center><h2>Register</h2></center>
                    {/* <Flash type="danger" content="User not Registered!"/> */}
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2">
                            <form>
                                <div className="form margin-large-top text-center">
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">account_circle</i>
                                            <input id="icon_prefix" ref="username" type="text" className="validate" />
                                            <label for="icon_prefix">Username</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">email</i>
                                            <input id="icon_prefix" ref="email" type="email" className="validate" />
                                            <label for="icon_prefix">Email</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">lock</i>
                                            <input id="icon_prefix" ref="password" type="password" className="validate" />
                                            <label for="icon_prefix">Password</label>
                                        </div>
                                    </div>
                                    <div className="margin-large-top">
                                        <a type="submit" className="btn btn-default margin-top" onClick={this.handleRegister}>Register</a>
                                        <Link to={"/login"} type="button" className="btn btn-default margin-top margin-left">Login</Link>
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