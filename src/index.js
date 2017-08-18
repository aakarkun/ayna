import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { MainSurface } from './app/components/MainSurface';
import { SurfaceArea } from './app/components/SurfaceArea';
import annyang from 'annyang';

class App extends React.Component {
  
  constructor() {
    super();
  }
  
  render() {

    return(
      <Router history={browserHistory}>
        <Route path={"/"} component={MainSurface}>
          <IndexRoute component={SurfaceArea} />
        </Route>
      </Router>
    );
  }
}

render(<App />, window.document.getElementById('root'));
