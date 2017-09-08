import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { MainSurface } from './app/components/MainSurface';
import { SurfaceArea } from './app/components/SurfaceArea';
import { Root } from './app/pages/Root';
import { Login } from './app/pages/Login';
import { Register } from './app/pages/Register';
import { Dashboard } from './app/pages/components/Dashboard';
import { Modules } from './app/pages/components/Modules';
import { Users } from './app/pages/components/Users';
import { Profile } from './app/pages/components/Profile';
import { ModuleProfile } from './app/pages/components/ModuleProfile';

import { isLoggedIn, requireAuth } from './app/utils/AuthService';
import { NotFound } from './app/pages/components/mini-components/NotFound';
import { NoInternet } from './app/pages/components/mini-components/NoInternet';
import { getModules } from './app/utils/modules-api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: isLoggedIn(),
      online: ''
    }
  }

  componentDidMount() {
    getModules()
      .then((response) => {
        if(response) {
          this.setState({
            online: "online"
          });
        } else {
          console.log("error");
          this.setState({
            online: "offline"
          })
        }
      }).catch((error) => {
        if(!navigator.online) {
          this.setState({
          online: "offline"          
          })
        }
      });
  }

  render() {
    var { online } = this.state;
    console.log(online);
  
    return(
      (online == "offline") ? <NoInternet /> :
      <Router history={browserHistory}>
        <Route path={"/"} component={MainSurface}>
          <IndexRoute component={SurfaceArea} />
        </Route>
        <Route path={"/dashboard"} component={Root} onEnter={requireAuth}>
          <IndexRoute component={Dashboard} /> 
          <Route path="/modules" component={Modules} />         
          <Route path="/users" component={Users} />   
          <Route path="/profile" component={Profile} /> 
          <Route path="/modules/:id" component={ModuleProfile} />
          <Route path="*" component={NotFound} />
        </Route>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        <Route path="*" component={NotFound} />
      </Router>
    );
  }
}

render(<App />, window.document.getElementById('root'));
