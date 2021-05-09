import React from "react";
import '@progress/kendo-theme-default/dist/all.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import { Header } from './components/header';
import { Login } from './components/login/login';
import { Products } from './components/products/products';
import { BulkUpload } from './components/bulkUpload/bulkUpload';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route path="/products" component={Products}/>
          <Route path="/bulkUpload" component={BulkUpload}/>
          <Redirect exact from='/' to='/login'/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
