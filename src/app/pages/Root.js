import React from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

export class Root extends React.Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <Navbar brandname="ayna" menu_i="Dashboard" menu_ii="Modules"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-12 col-lg-10 col-lg-offset-1">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}