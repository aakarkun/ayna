import React from 'react';
import { Link, browserHistory } from 'react-router';
import { loggedOut } from '../../utils/AuthService';
import { getUsername } from '../../utils/users-api';

export class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  onNavigateHome() {
    browserHistory.push("/");
  }
  onNavigateDashboard() {
    browserHistory.push("/dashboard");
  }
  onNavigateModules() {
    browserHistory.push("/modules");
  }
  logOut() {
    loggedOut();
  }

  componentDidMount() {
    getUsername()
    .then((response) => {
      var uname = response;
      this.setState({
        username: uname
      })        
    })
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
                  <ul className="nav navbar-nav">
                    <li>
                      <a className="" href="" onClick={this.onNavigateDashboard}>{this.props.menu_i}</a>
                    </li>
                    <li>
                      <a className="" href="" onClick={this.onNavigateModules}>{this.props.menu_ii}</a>
                    </li>
                  </ul>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                      <a href="" className="dropdown-toggle" data-toggle="dropdown">
                        Welcome! {this.state.username} <span className="caret"></span>
                      </a>
                      <ul className="dropdown-menu">
                        <li><Link to="/account" activeStyle={{fontWeight: 400}}>Account</Link></li>
                        <li><Link to="/profile" activeStyle={{fontWeight: 400}}>Profile</Link></li>
                        <li><Link to={"/"} onClick={this.logOut}>Logout</Link></li>                        
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
      );
  }
}