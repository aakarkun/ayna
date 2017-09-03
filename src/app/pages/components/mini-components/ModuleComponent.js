import React from 'react';
import { Link } from 'react-router';
import { postUserModule, deleteUserModule } from '../../../utils/users-api';
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
            const { name, category, surface_area, position, header, defaul, isInstalled } = this.props;            
            postUserModule(name, category, surface_area, position, header, defaul).then((response, error) => {
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
        const { btnStatus }  = this.state;
        const { name, id, category, surface_area, position, header, defaul, isInstalled, btn_color } = this.props;
        return(
            <div className="col-lg-6 col-md-6 col-sm-6 margin-bottom modules">
                <div className="media">
                    <div className="badge-circle-bg pull-left"><span style={{paddingLeft: "12px"}}>{name.substring(0,2)}</span></div>
                    <div className="media-body" style={{paddingLeft: "12px", }}>
                        <Link to={`/modules/${id}`}><strong style={{fontSize: "16px"}}>{name}</strong></Link>
                        <p>
                            <strong>Category:</strong> {category}<br />
                            {(isInstalled) === '' ? <Spinner /> :
                                <div>
                                    {
                                        (btnStatus === "loading") ? <MiniSpinner /> :
                                        <div> 
                                            {
                                                (btn_color === "success") ? 
                                                    <span className={'badge green badge-' + btn_color}>INSTALLED</span> :  
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