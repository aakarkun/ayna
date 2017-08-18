import React from 'react';
import { Link, browserHistory } from 'react-router';

export class Navbar extends React.Component {

  onNavigateHome() {
    browserHistory.push("/dashboard");
  }

  render() {
      return(
          <div>
              <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="" onClick={this.onNavigateHome}>{this.props.brandname}</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to={"/login"}>Logout</Link></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
      );
  }
}