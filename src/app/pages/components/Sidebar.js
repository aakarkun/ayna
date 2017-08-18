import React from 'react';
import { Link } from 'react-router';

export class Sidebar extends React.Component {
    render() {
        return(
            <div className="col-lg-2 col-md-2 col-sm-4">
                <ul className="nav nav-pills nav-stacked">
                    <li><Link to={"/modules"} activeStyle={{color: "red"}}>Modules</Link></li>
                    <li><Link to={"/users"} activeStyle={{color: "red"}}>Users</Link></li>
                    
                </ul>
            </div>
        );
    }
}