import React from 'react';
import { Link, browserHistory } from 'react-router';
import { loggedOut } from '../../utils/AuthService';
import { getUsername } from '../../utils/users-api';
import { Spinner } from './mini-components/Spinner';
import { NoInternet } from './mini-components/NoInternet';

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
    window.location.reload();
  }

  componentDidMount() {
    getUsername()
      .then((response) => {
        var uname = response;
        console.log(uname);
        this.setState({
          username: uname
        })        
      }).catch((error) => {
          console.log(error);
      })
  }

  render() {
    var { brandname, menu_i, menu_ii } = this.props;
    var { username } = this.state;
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
                  <a className="navbar-brand" href="" onClick={ this.onNavigateHome }>{ brandname }</a>
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to="/dashboard" activeStyle={{fontWeight: "400"}}>{ menu_i }</Link>
                    </li>
                    <li>
                      <Link to="/modules" activeStyle={{fontWeight: "500"}}>{ menu_ii }</Link>
                    </li>
                  </ul>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                      <a href="" className="dropdown-toggle" data-toggle="dropdown">
                        {
                          (this.state.username === '') ? <Spinner /> :
                          <span>Welcome! { username.charAt(0).toUpperCase() + username.slice(1) } <span className="caret"></span></span>
                        }
                      </a>
                      <ul className="dropdown-menu">
                        <li><Link to="/profile" activeStyle={{fontWeight: "400"}}>Profile</Link></li>
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