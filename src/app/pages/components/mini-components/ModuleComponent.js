import React from 'react';
import { Link } from 'react-router';
import { postUserModule, deleteUserModule, getUserModules } from '../../../utils/users-api';
import { Spinner } from './Spinner';
import { MiniSpinner } from './MiniSpinner';

export class ModuleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            btnStatus: 'success'
        }

        this.handleIsInstalled = this.handleIsInstalled.bind(this);
    }

    handleIsInstalled() {
        this.setState({
            btnStatus: "loading"
        })
        if(this.props.isInstalled === "INSTALL") {
            const { module, isInstalled } = this.props;
            getUserModules().then((modules) => {
                var modulesName = [];
                modules.map((module) => {
                    modulesName.push(module.name);
                });
                if(modulesName.indexOf(module.name) === -1) {
                    postUserModule(module.name, module.category, module.surface_area, module.position, module.header).then((response, error) => {
                        if(response) {
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
        } else if(this.props.isInstalled === "UNINSTALL"){
            const { module } = this.props;
            deleteUserModule(module._id).then((response, error) => {
                if(response) {
                    window.location.reload();
                    console.log("Module has been uninstalled!");
                } else {
                    console.log("Error during Uninstall! Error: " + error);
                }
            })
        }
    } 

    componentDidMount() {
        this.handleIsInstalled;
    }

    render() {
        const { btnStatus }  = this.state;
        const { module, isInstalled, btn_color } = this.props;
        var id = module._id;
        return(
            <div className="col-lg-4 col-md-6 col-sm-6 margin-bottom modules">
                <div className="media">
                    <div className="badge-circle-bg pull-left"><span style={{paddingLeft: "12px"}}>{module.name.substring(0,2)}</span></div>
                    <div className="media-body" style={{paddingLeft: "12px", }}>
                        <Link to={`/modules/${id}`}><strong style={{fontSize: "16px"}}>{module.name}</strong></Link>
                        <br />
                        <strong>Category:</strong> {module.category}
                        <br />
                        {(isInstalled) === '' ? <Spinner /> :
                            <div style={{marginTop: "5px", marginBottom: "5px", height: "25px"}}>
                                {
                                    (btnStatus === "loading") ? <MiniSpinner /> :
                                        <div>
                                        {
                                            (btn_color === "success") ? 
                                            <button className={'badge green badge-' + btn_color}>
                                                INSTALLED
                                            </button>:
                                            <button className={'badge red badge-' + btn_color} onClick={this.handleIsInstalled}>
                                                {isInstalled}
                                            </button>                                                
                                        }   
                                        </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}