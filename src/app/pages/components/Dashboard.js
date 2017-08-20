import React from 'react';
import { DashboardInfo } from './mini-components/DashboardInfo';
import { getDefaultModules } from '../../utils/modules-api';
import { getUserModules } from '../../utils/users-api';
import { getUsersData } from '../../utils/users-api';

export class Dashboard extends React.Component {
    constructor() {
        super();

        this.state = {
            dCount: 0,
            mCount: 0,
            uCount: 0
        }
    }

    counter(c) {
        if(c < 1) {
            c = '' + c;
        } else if(c < 10) {
            c = '0' + c;
        } else {
            c = '' + c; 
        }
        return c;
    }
    
    count() {
        getDefaultModules().then((modules => {
            var count = modules.length;
            this.setState({
                dCount: this.counter(count)
            })
        }));
        getUserModules().then((modules => {
            var count = modules.length;
            this.setState({
                mCount: this.counter(count)
            })
        }));
        getUsersData().then((users) => {
            var count = users.length;
            this.setState({
                uCount: this.counter(count)
            })
        })   
    }

    componentDidMount() {
        this.count();
    }

    render() {
        return(
            <div>
                <h5>DASHBOARD</h5>
                <div className="row margin-large-top margin-bottom">
                    <DashboardInfo header="AYNA MODULES" subheader="Available" count={this.state.dCount} />
                    <DashboardInfo header="USER MODULES" subheader="Your Modules" count={this.state.mCount} />
                    <DashboardInfo header="USERS" subheader="Active Users" count={this.state.uCount} />   
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