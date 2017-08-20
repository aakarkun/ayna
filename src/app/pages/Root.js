import React from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

export class Root extends React.Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <Navbar brandname="Dashboard"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2">
                        <Sidebar />
                    </div>
                    <div className="col-xs-10">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}