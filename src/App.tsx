import React, {Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import routes from "./config/routes.config";

function App() {
  return (
    <div className="App">
      <Router>
        <div style={{display:'flex'}}>
          <Link to={'/aaa'}>AAA</Link>
          <Link to={'/bbb'}>BBB</Link>
          <Link to={'/ccc'}>CCC</Link>
        </div>
        <Suspense fallback={<div/>}>
          <Switch>
            {
              routes.map(R => (
                  <Route path={R.url} key={R.url}>
                    <R.Component/>
                  </Route>
              ))
            }
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
