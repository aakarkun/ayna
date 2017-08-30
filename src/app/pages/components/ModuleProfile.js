import React from 'react';
import { getUserData, getUserModules, postUserModule, deleteUserModule } from '../../utils/users-api';
import { getModule, checkModule } from '../../utils/modules-api';
import { EditableLabel } from './mini-components/EditableLabel';
import { Spinner } from './mini-components/Spinner';

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
            isInstalled: ''
        }

        this.getModuleData = this.getModuleData.bind(this);
        this.checkUserModule = this.checkUserModule.bind(this);
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
                console.log(error.error);
                this.setState({
                    error
                })
            })
    }

    checkUserModule() {
        var moduleId = this.props.params.id;
        checkModule(moduleId)
            .then((response) => {
                console.log(response);
                this.setState({
                    isInstalled: response[0].status
                })
            }).catch((error) => {
                console.log(error);
                this.setState({
                    error
                })
            })
    }

    componentDidMount() {
        this.getModuleData();
        this.checkUserModule();
    }

    render() {
        const { name, id, category, surface_area, position, header, defaul, btn_color, isInstalled, visible } = this.state; 
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
                                    <div className="panel-heading"></div>
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
                                                <button className="badge blue badge-primary" style={{float: "right", fontSize: "16px"}}>{isInstalled}</button>                                                
                                            </div> :
                                            <div className="modules">
                                             <button className="badge red badge-danger margin-left" style={{float: "right", fontSize: "16px"}}>Uninstall</button>                                             
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