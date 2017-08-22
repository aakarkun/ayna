import React from 'react';
import { postUserModules, deleteUserModule } from '../../../utils/users-api';

export class ModuleComponent extends React.Component {
    constructor(props) {
        super(props);

        this.handleIsInstalled = this.handleIsInstalled.bind(this);
    }

    handleIsInstalled() {
        if(this.props.isInstalled === "INSTALL") {
            const { name, category, surface_area, position, header, defaul, isInstalled } = this.props;            
            postUserModules(name, category, surface_area, position, header, defaul).then((response, error) => {
                if(response) {
                    window.location.reload();
                    console.log("Module Installed Successfully!");
                } else {
                    console.log("Module Not Installed, Error: " + error);
                }
            });
        } else if(this.props.isInstalled === "UNINSTALL"){
            const { id } = this.props;
            deleteUserModule(id).then((response, error) => {
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
        return(
            <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="media">
                    <div className="badge-circle-bg pull-left"><span style={{paddingLeft: "12px"}}>{this.props.name.substring(0,2)}</span></div>
                    <div className="media-body" style={{paddingLeft: "12px", }}>
                        <strong style={{fontSize: "16px"}}>{this.props.name}</strong>
                        <p>
                            <strong>Category:</strong> {this.props.category}<br />
                            <button className="badge" onClick={this.handleIsInstalled}>{this.props.isInstalled}</button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}