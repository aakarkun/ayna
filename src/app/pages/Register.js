import React from 'react';
import { Link } from 'react-router';
import { registerUser } from '../utils/users-api';
import { browserHistory } from 'react-router';
import { Flash } from './components/mini-components/Flash';

export class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(event) {
        event.preventDefault();
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        var error = '';
        registerUser(username, email, password)
            .then((response) => {
                // console.log(response[0].code);
                if(response.username) {
                    console.log(response.username + " has registered successfully.");
                    browserHistory.push('/login');
                } else if(response[0].code === "400") {
                    console.log(response[0].error);
                    error =  response[0].error;
                    this.setState({
                        error
                    })
                } else if(response[0].code === "403"){
                    console.log(response[0].error);
                    error =  response[0].error;
                    this.setState({
                        error
                    })
                }
            }).catch((error) => {
                console.log(error);
                return error;
            })
    }

    render() {
        return(
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                    <center><h2>Register</h2></center>
                    {(this.state.error == '')? '' : <Flash type={(this.state.error === "")? "Success" : "danger"} name={(this.state.error === "")? "Success" : "Error"} content={this.state.error}/>}
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2">
                            <form>
                                <div className="form margin-large-top text-center">
                                    <div className="form-group">
                                        <input type="text" ref="username" className="form-control" id="inputUsername"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" ref="email" className="form-control" id="inputEmail"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" ref="password" className="form-control" id="inputPassword"/>
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