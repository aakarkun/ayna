import React from 'react';
import { browserHistory, Link } from 'react-router';

import { getUserModules, postUserModule, deleteUserModule, getUsername } from '../../utils/users-api';
import { getModule, setVisible } from '../../utils/modules-api';

import { Spinner } from './mini-components/Spinner';
import { MiniSpinner } from './mini-components/MiniSpinner';

export class ModuleProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
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
            userModulesName: [],
            userModulesId: [],
            btnStatus: 'success',
            error: '',
            isAynaModule: true
        }

        this.getModuleData = this.getModuleData.bind(this);
        this.handleIsInstalled = this.handleIsInstalled.bind(this);
        this.isToggle = this.isToggle.bind(this);
    }
    
    getModuleData() {
        var moduleId = this.props.params.id;
        var currentModule = [];
        var id = '';
        var name = '';
        var category = '';
        var surface_area = '';
        var position = '';
        var header = '';
        var visible = '';
        
        getModule(moduleId).then((cModule) => {
            currentModule = cModule;
            id = cModule._id;
            name = cModule.name;
            category =  cModule.category;
            surface_area = cModule.surface_area;
            position = cModule.position;
            header = cModule.header;
            visible = cModule.visible;

            this.setState({
                module: currentModule,
                id,
                name,
                category,
                surface_area,
                position,
                header,
                visible
            })

            var userModules = [];
            var userModulesName = [];
            var userModulesId = [];
            
            getUserModules().then((uModules) => {
                userModules = uModules;
    
                uModules.map((module) => {
                    userModulesName.push(module.name);
                    userModulesId.push(module._id);
                    
                })
    
                if(userModulesName.indexOf(currentModule.name) === -1) {
                    this.setState({
                        isInstalled: "Install",
                        visible: currentModule.visible
                    })
                } else {
                    this.setState({
                        isInstalled: "Uninstall"
                    })
                }

                if(userModulesId.indexOf(currentModule._id) === -1) {
                    this.setState({
                        isAynaModule: true
                    })
                } else {
                    this.setState({
                        isAynaModule: false
                    })
                }
                
                this.setState({
                    userModules,
                    userModulesName,
                    userModulesId
                    
                })
            })



        }).catch((error) => {
            console.log(error);
            console.log("Module not found!");
            this.setState({
                error
            })
        });
    }
    
    handleIsInstalled() {
        this.setState({
            btnStatus: 'loading'
        })

        if(this.state.isInstalled === "Install") {
            const { name, category, surface_area, position, header } = this.state;            
            getUserModules().then((modules) => {
                var modulesName = [];
                modules.map((module) => {
                    modulesName.push(module.name);
                });
                
                if(modulesName.indexOf(name) === -1) {
                    postUserModule(name, category, surface_area, position, header).then((response, error) => {
                        if(response) {
                            console.log(name);
                            window.location.reload();
                            console.log("Module Installed Successfully!");
                        } else {
                            console.log("Module Not Installed, Error: " + error);
                        }
                    });       
                } else {
                    console.log("same module found!");
                }
            })
            
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
        console.log(this.state.visible);
        console.log(this.state.id);        
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
        this.handleIsInstalled;
        this.isToggle;
        getUsername().then(username => {
            this.setState({
                username
            })
        })
    }

    render() {
        var { username, module, name, category, surface_area, position, header, visible, isInstalled, isAynaModule, btnStatus } = this.state;
        // Module Profile Name Split

        var headerLen = header.split(' ').length;
        console.log(headerLen);
        var h = header.split(' ').slice(0, 1).toString();
        h = h.substring(0, 1).toUpperCase();
        var _h = header.split(' ').slice(-1).toString();
        _h = _h.substring(0, 1).toUpperCase();
        var Header = '';
        (headerLen != 1) ? Header= h + _h : Header= h;        

        // Module Surface Area Split
        const s = surface_area.split('_').slice(0, 1).toString();
        const a = surface_area.split('_').slice(-1).toString();
        const surface = s.substring(0, 1).toUpperCase() + s.slice(1);       
        const area = a.substring(0, 1).toUpperCase() + a.slice(1); 

        return(
            <div>
                <ol className="breadcrumb" style={{backgroundColor: "transparent", fontSize: "12px"}}>
                <li><Link to={'/modules'}>{(isAynaModule === true) ? "Ayna Modules" : username.charAt(0).toUpperCase() + username.slice(1) + " Modules"}</Link></li>
                <li>{header}</li>
                </ol>
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
                                                            <span>Not Visible</span><input type="checkbox" onClick={this.isToggle} /><span className="lever"></span> 
                                                            </div> : 
                                                            <div>
                                                            <span>Visible</span><input defaultChecked type="checkbox" onClick={this.isToggle} /><span className="lever"></span>
                                                            </div>
                                                }                                                
                                            </label>
                                        </div>
                                    </div>
                                    <div className="panel-body">
                                        <div className="media">
                                            <div className="badge-circle-bg pull-left margin-right" style={{marginBottom: "4px"}}>
                                                    <span style={{paddingLeft: "14px"}}>{Header}</span>
                                                </div>
                                            <div className="media-body">
                                                <h4 className="media-heading">{header}{(isAynaModule === true) ? <sup><span className="fa fa-check-circle-o margin-small-left" style={{fontSize: "16px", color: "#fff"}} title="This is Ayna Module!"></span></sup> : ''}</h4>
                                                <p style={{color: "#e0e0e0"}}>This Module is located in {surface} {area} of your Mirror, which is placed in {position} position.</p>
                                                {(isInstalled === "Install") ? <p className="text-muted">FREE</p> : <p className="text-muted">This Product is Installed.</p>}
                                            </div>
                                        </div>

                                        {
                                            (btnStatus === "loading") ? <div className="margin-large-right" style={{float: "right"}}><MiniSpinner /></div> : 
                                            (isInstalled === "Install") ? 
                                            <div className="modules">
                                                <button className="badge blue badge-primary" style={{float: "right", fontSize: "16px"}} onClick={this.handleIsInstalled}>{isInstalled}</button>                                                
                                            </div> :
                                            <div className="modules">
                                             <button className="badge red badge-danger margin-left" style={{float: "right", fontSize: "16px"}} onClick={this.handleIsInstalled}>Uninstall</button>                                             
                                            </div>
                                        }
                                        
                                        <table className="table table-striped table-hover margin-large-top">
                                            <tbody>
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