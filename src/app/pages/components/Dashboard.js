import React from 'react';
import { ModuleInfoComponent } from './mini-components/ModuleInfoComponent';

export class Dashboard extends React.Component {
    render() {
        return(
            <div>
                <h5>DASHBOARD</h5>
                <div className="row margin-large-top margin-bottom">
                    <ModuleInfoComponent name="Default Modules" count="04" />
                    <ModuleInfoComponent name="User Modules" count="03" />
                    <ModuleInfoComponent name="Active Users" count="04" />
                    
                </div>

                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8">
                        <div className="panel panel-default margin-top">
                            <div className="panel-heading">POPULAR MODULES</div>
                            <div className="panel-body">
                                <table className="table table-hover">
                                    <tbody>
                                        <tr>
                                            <td>Analog Clock</td>
                                            <td>1.2k Downloads</td>
                                        </tr>
                                        <tr>
                                            <td>Greetings</td>
                                            <td>1.1k Downloads</td>
                                        </tr>
                                        <tr>
                                            <td>News Feed</td>
                                            <td>1.0k Downloads</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}