import React from 'react';
import { ModuleComponent} from './mini-components/ModuleComponent';
import { getDefaultModules } from '../../utils/modules-api';
import { getUserId, getUserModules } from '../../utils/users-api';
import { Spinner } from './mini-components/Spinner';


export class Modules extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultModules: [],
            userModules: [],
            installedModules: [],
            userId: getUserId()
        }
    }

    defaultModules() {
        getDefaultModules()
        .then((defaultModules) => {
            this.setState({
                defaultModules
            })
        }).catch((error) => {
            console.log(error);
            return error;
        })
    }

    userModules() {
        getUserModules()
            .then((userModules) => {
                this.setState({
                    userModules
                })
            }).catch((error) => {
                console.log(error);
                return error;
            })
    }

    componentDidMount() {
        this.defaultModules();
        this.userModules();
    }

    render() {
        var { defaultModules, userModules } = this.state;

        // To identify the installed Modules by the user from available Ayna Modules  

        var defModulesName = [];
        var userModulesName = [];
        defaultModules.map((defaultModule, index) => {
            defModulesName.push(defaultModule.name);
        });
        userModules.map((userModule, index) => {
            userModulesName.push(userModule.name);
        });
        function intersectModules(defaul, user) {
            var sorted_defaul = defaul.concat().sort();
            var sorted_user = user.concat().sort();
            var common = [];
            var defaul_i = 0;
            var user_i = 0;
        
            while (defaul_i < defaul.length
                   && user_i < user.length)
            {
                if (sorted_defaul[defaul_i] === sorted_user[user_i]) {
                    common.push(sorted_defaul[defaul_i]);
                    defaul_i++;
                    user_i++;
                }
                else if(sorted_defaul[defaul_i] < sorted_user[user_i]) {
                    defaul_i++;
                }
                else {
                    user_i++;
                }
            }
            return common;
        }
        var installedModules = intersectModules(defModulesName, userModulesName);
        
        function isInstalled(name) {
            var install;
            if(userModulesName.indexOf(name) !== -1) {
                install = "INSTALLED";
            } else {
                install = "INSTALL";
            }
            return install;
        }

        return(
            <div>
                <h5>MODULES</h5>
                <div className="panel panel-default margin-large-top padding">
                    <div className="panel-heading">AYNA MODULES<span className="badge badge-default"><strong>{defaultModules.length}</strong></span></div>
                    <div className="panel-body">
                        <div className="row">
                            {
                                (defaultModules.length === 0) ? <center><Spinner /></center> :
                                defaultModules.map((defaultModule, index) => (      
                                    <ModuleComponent 
                                        module={defaultModule}
                                        key={index} 
                                        isInstalled={isInstalled(defaultModule.name)}
                                        btn_color={(isInstalled(defaultModule.name) === "INSTALL") ? "primary" : "success"}
                                    />    
                                ))
                            }                            
                        </div>
                    </div>
                </div>

                <div className="panel panel-default margin-large-top padding">
                    <div className="panel-heading">USER MODULES<span className="badge badge-default"><strong>{userModules.length}</strong></span></div>
                    <div className="panel-body">
                        <div className="row">
                            {
                                (userModules.length === '') ? <Spinner /> :
                                (userModules.length === 0) ? <center><p>EMPTY USER MODULES</p></center> : 
                                userModules.map((userModule, index) => (
                                    <ModuleComponent 
                                        module={ userModule } 
                                        key={ index } 
                                        isInstalled="UNINSTALL"
                                        btn_color= "danger"
                                    />                                
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}