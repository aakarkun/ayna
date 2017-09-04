import React from 'react';
import { browserHistory } from 'react-router';

import { getUserModules, postUserModule, deleteUserModule } from '../../utils/users-api';
import { getModule, setVisible } from '../../utils/modules-api';
import { Spinner } from './mini-components/Spinner';
import { MiniSpinner } from './mini-components/MiniSpinner';

export class ModuleProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            module: [],
            id: '',
            name: '',
            category: '',
            surface_area: '',
            position: '',
            header: '',
            visible: '',
            isInstalled: '',
            userModules: [],
            btnStatus: 'success',
            error: '',
            isAynaModule: true
        }

        this.getModuleData = this.getModuleData.bind(this);
        this.checkUserModule = this.checkUserModule.bind(this);
        this.handleIsInstalled = this.handleIsInstalled.bind(this);
        this.isToggle = this.isToggle.bind(this);
    }
    
    getModuleData() {
        var moduleId = this.props.params.id;
        console.log(moduleId);
        getModule(moduleId)
        .then((response) => {
            this.setState({
                module: response,
                id: response._id,
                name: response.name,
                category: response.category,
                surface_area: response.surface_area,
                position: response.position,
                header: response.header,
                visible: response.visible
            })
        }).catch((error) => {
            console.log(error);
            console.log("Module not found!");
            this.setState({
                error
            })
        });
    }

    checkUserModule() {
        getUserModules().then((response) => {
            var userModules = [];
            var userModulesId = [];
            var userModulesName = [];
            response.map((module) => {
                userModules.push(module);
                userModulesId.push(module._id);
                userModulesName.push(module.name);
            })
            if(userModulesName.indexOf(this.state.name) != -1) {
                this.setState({
                    isInstalled: "Uninstall"
                })
            } else {
                this.setState({
                    isInstalled: "Install",
                    visible: this.state.visible
                })
            }
            if(userModulesId.indexOf(this.state.id) != -1) {
                this.setState({
                    isAynaModule: false
                })
            } else {
                this.setState({
                    isAynaModule: true
                })
            }
        })
    }
    
    handleIsInstalled() {
        this.setState({
            btnStatus: 'loading'
        })
        if(this.state.isInstalled === "Install") {
            const { name, category, surface_area, position, header } = this.state;            
            postUserModule(name, category, surface_area, position, header)
                .then((response, error) => {
                    if(response) {
                        console.log("Module Installed Successfully!");
                        browserHistory.push('/modules');
                    } else {
                        console.log("Module Not Installed, Error: " + error);
                    }
                });
        } else {
            getUserModules().then((response) => {
                var userModules = [];
                var userModulesId = [];
                var userModulesName = [];
                response.map((module) => {
                    userModules.push(module);
                    userModulesId.push(module._id);
                    userModulesName.push(module.name);
                })
                if(userModulesId.indexOf(this.state.id) != -1) {
                    deleteUserModule(this.state.id).then((response, error) => {
                        if(response) {
                            console.log("Module has been uninstalled!");
                            browserHistory.push('/modules');
                        } else {
                            console.log("Error during Uninstall! Error: " + error);
                        }
                    });
                } else if(userModulesName.indexOf(this.state.name) != -1){
                    for(var i = 0; i < userModules.length; i++) {
                        if(userModules[i].name === this.state.name) {
                            deleteUserModule(userModules[i]._id).then((response, error) => {
                                if(response) {
                                    console.log("Module has been uninstalled!");
                                    browserHistory.push('/modules');
                                } else {
                                    console.log("Error during Uninstall! Error: " + error);
                                }
                            });
                        }
                    }
                } else {
                    console.log("ERROR UNINSTALL!!");
                }
            })
        }
    }

    isToggle() {
        if(this.state.visible === true) {
            setVisible(this.state.id, false).then((response) => {
                console.log(response);
                window.location.reload();
            })
        } else {
            setVisible(this.state.id, true).then((response) => {
                console.log(response);
                window.location.reload();
            })
        }
    }

    componentDidMount() {
        this.getModuleData();
        this.checkUserModule();
        this.handleIsInstalled;
        this.isToggle;
    }

    render() {
        var { module, name, category, surface_area, position, header, visible, isInstalled, isAynaModule, btnStatus } = this.state;

        const s = surface_area.split('_').slice(0, 1).toString();
        const a = surface_area.split('_').slice(-1).toString();
        const surface = s.substring(0, 1).toUpperCase() + s.slice(1);       
        const area = a.substring(0, 1).toUpperCase() + a.slice(1); 

        return(
            <div>
                <h5>{name}</h5>
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <div className="panel panel-default margin-top padding">
                            {
                                (name === '') ? <Spinner /> :
                                <div>
                                    <div className="panel-heading">
                                        <div className="switch pull-right">
                                            <label>
                                                {       
                                                    (isAynaModule === true) ? 
                                                    <div>
                                                    </div> :
                                                    (visible !== true) ? 
                                                        <div>
                                                        <span>Not Visible</span><input type="checkbox" onClick={this.isToggle}/><span className="lever"></span> 
                                                        </div> : 
                                                        <div>
                                                        <span>Visible</span><input checked type="checkbox" onClick={this.isToggle}/><span className="lever"></span>
                                                        </div>
                                                }                                                
                                            </label>
                                        </div>
                                    </div>
                                    <div className="panel-body">
                                        <div className="media">
                                            <div className="badge-circle-bg pull-left">
                                                <span style={{paddingLeft: "12px"}}>{name.toUpperCase().substring(0,2)}</span>
                                            </div>
                                            <div className="media-body">
                                                <span className="margin-left" style={{fontSize: "18px"}}>{name}</span><br />
                                                <span className="text-muted margin-left">{category}</span>
                                            </div>
                                        </div>
                                        {
                                            (btnStatus === "loading") ? <div className="margin-right" style={{float: "right"}}><MiniSpinner /></div> : 
                                            (isInstalled === "Install") ? 
                                            <div className="modules">
                                                <button className="badge blue badge-primary" style={{float: "right", fontSize: "16px"}} onClick={this.handleIsInstalled}>{isInstalled}</button>                                                
                                            </div> :
                                            <div className="modules">
                                             <button className="badge red badge-danger margin-left" style={{float: "right", fontSize: "16px"}} onClick={this.handleIsInstalled}>Uninstall</button>                                             
                                            </div>
                                        }
                                    
                                        <table className="table table-hover margin-large-top">
                                            <tbody>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Category</td>
                                                    <td>{category}</td>
                                                </tr>
                                                <tr>
                                                    <td>Surface Area</td>
                                                    <td>{surface} {area}</td>
                                                </tr>
                                                <tr>
                                                    <td>Position</td>
                                                    <td>{position.substring(0,1).toUpperCase() + position.slice(1)}</td>
                                                </tr>
                                                <tr>
                                                    <td>Visible</td>
                                                    <td>{visible.toString().substring(0,1).toUpperCase() + visible.toString().slice(1)}</td>
                                                </tr>
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