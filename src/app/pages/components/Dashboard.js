import React from 'react';
import { DashboardInfo } from './mini-components/DashboardInfo';
import { getDefaultModules } from '../../utils/modules-api';
import { getUsersData, getUserModules } from '../../utils/users-api';
import { Flash } from './mini-components/Flash';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dCount: 0,
            mCount: 0,
            uCount: 0,
            error: ''
        }
    }

    counter(c) {
        if(c < 1) {
            c = '' + c;
        } else if(c < 10) {
            c = '0' + c;
        } else if(c >= 10){
            c = '' + c; 
        } else {
            c = 0;
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
        getUsersData().then((users, error) => {
            if(users) {
                var count = users.length;
                console.log(count);
                this.setState({
                    uCount: this.counter(count)
                })
            } else {
                this.setState({
                    error
                })
            }
        });
        getUsersData().then((users, error) => {
            if(users) {
                return users;
            } else {
                return error;
            }
        })   
    }


    componentDidMount() {
        this.count();
    }

    render() {
        return(
            <div>
                {/* <Flash type="success" name="Success" content="Logged in Successfully!" /> */}
                <h5>DASHBOARD</h5>
                <div className="row margin-large-top margin-bottom">
                    <DashboardInfo header="AYNA MODULES" subheader="Available" count={this.state.dCount} />
                    <DashboardInfo header="USER MODULES" subheader="Your Modules" count={this.state.mCount} />
                    <DashboardInfo header="USERS" subheader="Total Users" count={this.state.uCount} />   
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