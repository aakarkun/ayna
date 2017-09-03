import React from 'react';
import { browserHistory } from 'react-router';
import { getUserData, getUserModules, postUserModule, deleteUserModule } from '../../utils/users-api';
import { getModule, patchModule } from '../../utils/modules-api';
import { EditableLabel } from './mini-components/EditableLabel';
import { Spinner } from './mini-components/Spinner';
import { MiniSpinner } from './mini-components/MiniSpinner';

export class ModuleProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            user: '',
            category: '',
            surface_area: '',
            position: '',
            header: '',
            __v: '',
            defaul: '',
            visible: '',
            error: '',
            isInstalled: '',
            userModules: [],
            btnStatus: 'success'
        }

        this.getModuleData = this.getModuleData.bind(this);
        this.handleIsInstalled = this.handleIsInstalled.bind(this);
        this.checkUserModule = this.checkUserModule.bind(this);
        this.isToggle = this.isToggle.bind(this);
    }

    getModuleData() {
        var moduleId = this.props.params.id;
        getModule(moduleId)
            .then((response) => {
                this.setState({
                    name: response.name,
                    id: response._id,
                    user: response.user,
                    category: response.category,
                    surface_area: response.surface_area,
                    position: response.position,
                    header: response.header,
                    __v: response.__v,
                    defaul: response.defaul,
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
            response.map((module) => {
                userModules.push(module.name);    
            })
            if(userModules.indexOf(this.state.name) != -1) {
                console.log("Uninstall");
                this.setState({
                    isInstalled: "Uninstall"
                })
            } else {
                console.log("Install");
                this.setState({
                    isInstalled: "Install"
                })
            }
        })
    }

    handleIsInstalled() {
        this.setState({
            btnStatus: 'loading'
        })        
         if(this.state.isInstalled === "Install") {
            const { name, category, surface_area, position, header, defaul, isInstalled } = this.state;            
            postUserModule(name, category, surface_area, position, header, defaul)
                .then((response, error) => {
                    if(response) {
                        console.log("Module Installed Successfully!");
                        browserHistory.push('/modules');
                    } else {
                        console.log("Module Not Installed, Error: " + error);
                    }
                });
        } else {
            const { id, name } = this.state;
            getUserModules().then((uModules) => {
                var userModules = [];
                var userModulesId = [];
                var userModulesName = [];
                uModules.map((module) => {
                    userModules.push(module);
                    userModulesId.push(module._id);
                    userModulesName.push(module.name);
                })
                if(userModulesId.indexOf(id) != -1) {
                    deleteUserModule(id).then((response, error) => {
                        if(response) {
                            console.log("Module has been uninstalled!");
                            browserHistory.push('/modules');
                        } else {
                            console.log("Error during Uninstall! Error: " + error);
                        }
                    });
                } else if(userModulesName.indexOf(name) != -1){
                    for(var i = 0; i < userModules.length; i++) {
                        if(userModules[i].name === name) {
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
                    console.log("ERROR!!");
                }
            })
            
        }
    }

    isToggle() {
        if(this.state.visible === true) {
            patchModule(this.state.id, false).then((response) => {
                console.log(response);
                window.location.reload();
            })
        } else {
            patchModule(this.state.id, true).then((response) => {
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
        const { name, id, category, surface_area, position, header, defaul, btn_color, isInstalled, visible, userModules } = this.state; 
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
                                                    (visible === true) ? <div><span>Visible</span><input type="checkbox" checked onClick={this.isToggle}/><span className="lever"></span></div> : <div><span>Not Visible</span><input type="checkbox" onClick={this.isToggle}/><span className="lever"></span></div>
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