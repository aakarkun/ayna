import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/mini-components/Footer';
import { browserHistory } from 'react-router';
import annyang from 'annyang';
import { loggedOut } from '../utils/AuthService';


export class Root extends React.Component {

    constructor(props) {
        super(props);

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
                'go (to) :path': function(path) {
                    if(path === "back") {
                        window.history.back();
                    } else if(path === "home") {
                        browserHistory.push("/");
                    } else if(path === "profile") {
                        browserHistory.push("/profile");
                    } else if(path === "modules" | path === "module") {
                        browserHistory.push("/modules");
                    } else if(path === "dashboard") {
                        browserHistory.push("/dashboard");
                    }
                },

                'logout': function(path) {
                    loggedOut();
                    window.location.reload();
                }
                
            }

            annyang.addCommands(commands);
            annyang.start();
        
    }

    componentDidMount() {
        this.acceptVoiceCommand();
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <Navbar brandname="ayna" menu_i="Dashboard" menu_ii="Modules"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-12 col-lg-10 col-lg-offset-1">
                        {this.props.children}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-12 col-lg-10 col-lg-offset-1">
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}