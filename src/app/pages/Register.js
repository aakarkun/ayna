import React from 'react';
import { Link } from 'react-router';
import { registerUser } from '../utils/users-api';
import { browserHistory } from 'react-router';
import { Flash } from './components/mini-components/Flash';
import annyang from 'annyang';

export class Register extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }

    acceptVoiceCommand() {
        annyang.debug();
        
            annyang.addCallback('error', function(err) {
              console.log('There was an error in Annyang!',err);
            });
        
            annyang.addCallback('errorNetwork', function() {
              console.log('ERROR: ' + 'Speech Recognition fails because of a network error');      
            });
            annyang.addCallback('errorPermissionBlocked', function() {
              console.log('ERROR: ' + 'Browser blocks the permission request to use Speech Recognition');      
              
            });
            annyang.addCallback('errorPermissionDenied', function() {
              console.log('ERROR: ' + 'The user blocks the permission request to use Speech Recognition');      
              
            });
        
        
            annyang.setLanguage('en-IN');

            var commands = {
                'go :path': function(path) {
                    if(path === "back") {
                        window.history.back();
                    } else if(path === "home") {
                        browserHistory.push("/");
                    }
                },
                'login': function() {
                    browserHistory.push("/login");
                }.bind(this)
            }

            annyang.addCommands(commands);
            annyang.start();
        
    }

    
    handleRegister(event) {
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

    keyPressed(event) {
        if(event.key == 'Enter') {
            this.handleRegister();
        }
    }

    componentDidMount() {
        this.keyPressed;
        this.acceptVoiceCommand();
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
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">account_circle</i>
                                            <input id="icon_prefix" ref="username" type="text" className="validate" onKeyPress={this.keyPressed} />
                                            <label for="icon_prefix">Username</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">email</i>
                                            <input id="icon_prefix" ref="email" type="email" className="validate" onKeyPress={this.keyPressed} />
                                            <label for="icon_prefix">Email</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">lock</i>
                                            <input id="icon_prefix" ref="password" type="password" className="validate" onKeyPress={this.keyPressed} />
                                            <label for="icon_prefix">Password</label>
                                        </div>
                                    </div>
                                    <div className="margin-large-top">
                                        <Link type="submit" className="btn btn-default margin-top" onClick={this.handleRegister}>Register</Link>
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