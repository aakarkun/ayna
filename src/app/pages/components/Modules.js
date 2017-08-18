import React from 'react';
import { ModuleComponent} from './mini-components/ModuleComponent';
import { getModulesData } from '../../utils/modules-api';

export class Modules extends React.Component {
    constructor() {
        super();
        this.state = {
            defaultModules: []
        }
    }

    getDefaultModules() {
        getModulesData().then((defaultModules) => {
            this.setState({
                defaultModules
            })
        })
    }

    componentDidMount() {
        this.getDefaultModules();
    }

    render() {

        const { defaultModules } = this.state;
        return(
            <div>
                <h5>MODULES</h5>
                <div className="panel panel-default margin-large-top">
                    <div className="panel-heading">DEFAULT MODULES</div>
                    <div className="panel-body">
                        <div className="row">                            
                            {defaultModules.map((defaultModule, index) => (
                                <ModuleComponent name={ defaultModule.name } category={ defaultModule.category } key={index} downloads="1.2k" />    
                            ))}
                        </div>
                    </div>
                </div>

                <div className="panel panel-default margin-large-top">
                    <div className="panel-heading">USER MODULES</div>
                    <div className="panel-body">
                        <div className="row">    
                            <ModuleComponent name="Analog Clock" category="Clock and Time" downloads="1.2k" />
                            <ModuleComponent name="Weather" category="Weather" downloads="0.9k" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}