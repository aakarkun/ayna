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


class App extends React.Component {
  render() {
    return(
      <Router history={browserHistory}>
        <Route path={"/"} component={MainSurface}>
          <IndexRoute component={SurfaceArea} />
        </Route>
        <Route path={"/dashboard"} component={Root}>
          <IndexRoute component={Dashboard} /> 
          <Route path="/modules" component={Modules} />         
          <Route path="/users" component={Users} />                   
        </Route>
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />
        
      </Router>
    );
  }
}

render(<App />, window.document.getElementById('root'));
