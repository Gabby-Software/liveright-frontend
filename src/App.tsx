import React, {Suspense} from 'react';
import './App.css';
import {Link, Route, Switch} from 'react-router-dom';
import routes from "./config/routes.config";
import {useSeo} from "./hooks/seo.hook";
import {Space} from "antd";

function App() {
  useSeo();
  return (
    <div className="App">
        <Space>
          <Link to={'/'}>Home</Link>
          <Link to={'/test'}>Test</Link>
          <Link to={'/login'}>Login</Link>
        </Space>
        <Suspense fallback={<div/>}>
          <Switch>
            {
              routes.map(R => (
                  <Route path={R.url} key={R.url} {...R.props}>
                    <R.Component/>
                  </Route>
              ))
            }
          </Switch>
        </Suspense>
    </div>
  );
}

export default App;
