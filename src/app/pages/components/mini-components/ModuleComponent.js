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

        // Module Profile Name Split
        var header = module.header;
        var headerLen = header.split(' ').length;
        console.log(headerLen);
        var h = header.split(' ').slice(0, 1).toString();
        h = h.substring(0, 1).toUpperCase();
        var _h = header.split(' ').slice(-1).toString();
        _h = _h.substring(0, 1).toUpperCase();
        var Header = '';
        (headerLen != 1) ? Header= h + _h : Header= h;

        return(
            <div className="col-lg-4 col-md-6 col-sm-6 margin-bottom modules">
                
                <div className="media">
                    <div className="badge-circle-bg medium pull-left margin-right" style={{marginBottom: "4px", marginRight: "10px"}}>
                            <span style={{paddingLeft: "14px"}}>{Header}</span>
                        </div>
                    <div className="media-body" style={{paddingLeft: "6px"}}>
                        <h5 className="media-heading margin-bottom-remove" style={{fontSize: "18px", fontWeight: "400"}}>
                            <Link to={`/modules/${id}`}>{header}</Link>
                        </h5>
                        <p><span style={{color: "#bdbdbd"}}>Category: {module.category}</span><br />
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
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}