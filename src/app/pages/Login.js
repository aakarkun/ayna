import React from 'react';
import { Link } from 'react-router';
import { login } from '../utils/users-api';

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: '',
            token: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        login(username, password).then(users => {
            this.setState({
                users,
                token: users.token
            })
        });
    }
    

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
                                        <input type="text" className="form-control" id="inputUsername" ref="username" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="inputPassword" ref="password" />
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