import React from 'react';
import { Link } from 'react-router';
import { loginUser } from '../utils/users-api';
import { browserHistory } from 'react-router';
import { Flash } from './components/mini-components/Flash';
import annyang from 'annyang';


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
            error: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.acceptVoiceCommand = this.acceptVoiceCommand.bind(this);
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
                'go back': function() {
                    browserHistory.push("/");                    
                }
            }

            annyang.addCommands(commands);
            annyang.start();
        
    }

    componentDidMount() {
        this.acceptVoiceCommand();
    }

    handleSubmit(event) {
        event.preventDefault();
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        console.log(this.refs.username.value);
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
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <i className="material-icons prefix">account_circle</i>
                                            <input id="icon_prefix" ref="username" type="text" className="validate" />
                                            <label for="icon_prefix">Username</label>
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
                                        <Link to={"/dashboard"} type="submit" className="btn btn-default margin-top" onClick={this.handleSubmit}>Login</Link>
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