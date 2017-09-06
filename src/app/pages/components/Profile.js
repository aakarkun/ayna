import React from 'react';
import { getUserData, getUserModules } from '../../utils/users-api';
import { EditableLabel } from './mini-components/EditableLabel';
import { Spinner } from './mini-components/Spinner';

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            modules: []
        }
    }
    
    componentDidMount() {
        getUserData()
            .then((response) => {
                var uname = response.username;
                var email = response.email;
                this.setState({
                    username: uname,
                    email: email
                });       
            });
        getUserModules()
            .then((response) => {
                var modules = response;
                this.setState({
                    modules
                })
            });
    }

    render() {
        var { username, email, password, modules } = this.state;
        return(
            <div>
                <h5>Profile</h5>
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <div className="panel panel-default white-gradient margin-top padding">
                            {
                                (username === '' || email === '') ? <Spinner /> :
                                <div>
                                    <div className="panel-heading"></div>
                                    <div className="panel-body">
                                        <div className="media">
                                            <div className="badge-circle pull-left">
                                                <span style={{paddingLeft: "12px"}}>{username.toUpperCase().substring(0,2)}</span>
                                            </div>
                                            <div className="media-body">
                                                <span className="margin-left" style={{fontSize: "18px"}}>{username.charAt(0).toUpperCase() + username.slice(1)}</span><br />
                                                <span className="text-muted margin-left">{email}</span>
                                            </div>
                                        </div>
                                    
                                        <table className="table table-striped table-hover margin-large-top">
                                            <tbody>
                                                <tr>
                                                    <td>Username</td>
                                                    <td><EditableLabel text="username" /></td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td><EditableLabel text="email" /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <div className="panel panel-default white-gradient margin-top">
                            {(modules.length === 0) ? <div className="panel-body"><center>USER MODULE EMPTY!</center></div> : 
                            <div> 
                                <div className="panel-heading">MODULES SETTINGS</div>
                                <div className="panel-body">
                                    <table className="table table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Surface area</th>
                                                <th>Position</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {modules.map((module, id) => {
                                                return (
                                                    <tr key={id}>    
                                                        <td>{module.header}</td>
                                                        <td>{module.surface_area}</td>
                                                        <td>{module.position}</td>
                                                    </tr>
                                                );                                                                                             
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}