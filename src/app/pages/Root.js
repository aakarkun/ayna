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
<<<<<<< HEAD
                    <div className="col-xs-12 col-md-12 col-lg-10 col-lg-offset-1">
=======
                    <div className="col-xs-10 col-md-10 col-lg-10 col-lg-offset-1">
>>>>>>> 8c9b9fced4ba2c0e262cffdcbd25356aa9e131e7
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}