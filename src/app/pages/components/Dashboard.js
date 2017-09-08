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
            error: '',
            commands: [
                {
                    text: "Hello | Hi | Hey | Howdy | Whats up | Yo!",
                    reg: true,
                    unreg: true 
                },
                {
                    text: "How | Who are you?",
                    reg: true,
                    unreg: true
                },
                {
                    text: "Go to Dashboard | Modules | Profile | Home",
                    reg: true,
                    unreg: false
                },
                {
                    text: "Go to Login | Register",
                    reg: true,
                    unreg: true
                },
                {
                    text: "Position 'Clock' (module name) to center",
                    reg: true,
                    unreg: false
                },
                {
                    text: "Good Morning | Afternoon | Evening | Night",
                    reg: true,
                    unreg: true
                },
                {
                    text: "Do you know me?",
                    reg: true,
                    unreg: false
                },
                {
                    text: "Show | Remove 'Clock' (module name)",
                    reg: true,
                    unreg: false
                },
                {
                    text: "Search 'Smart Mirror' (keyword)",
                    reg: true,
                    unreg: true
                }
            ]
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
                // console.log(count);
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
        var { commands } = this.state;
        return(
            <div>
                {/* <Flash type="success" name="Success" content="Logged in Successfully!" /> */}
                <h6 style={{fontWeight: "300"}}>DASHBOARD</h6>
                <div className="row margin-large-top margin-bottom">
                    <DashboardInfo header="AYNA MODULES" subheader="Available" count={this.state.dCount} />
                    <DashboardInfo header="USER MODULES" subheader="Your Modules" count={this.state.mCount} />
                    <DashboardInfo header="USERS" subheader="Total Users" count={this.state.uCount} />   
                </div>

                <div className="row">
                    <div className="col-lg-8 col-md-9 col-sm-12">
                        <div className="panel panel-default white-gradient margin-top">
                            <div className="panel-heading" style={{fontWeight: "400"}}>AVAILABLE VOICE COMMANDS</div>
                            <div className="panel-body">
                                <table className="table table-striped table-hover">
                                    <thead style={{fontWeight: "400", fontSize: "14px"}}>
                                        <td>Commands</td>
                                        <td>Unregistered</td>
                                        <td>Registered</td>                                                                                                                        
                                    </thead>
                                    <tbody style={{fontWeight: "400"}}>
                                        { commands.map((command, id) => {
                                            return <tr key={id}>
                                                        <td>{command.text}</td>
                                                        <td className="text-center"><i className={`fa fa-${(command.unreg === true) ? "check text-success" : "times text-danger"}`}></i></td>                                                        
                                                        <td className="text-center"><i className={`fa fa-${(command.reg === true) ? "check text-success" : "times text-danger"}`}></i></td>
                                                    </tr>
                                        })}
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