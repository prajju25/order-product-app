import React from "react";
import '@progress/kendo-theme-default/dist/all.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import { Header } from './components/header';
import { Login } from './components/login/login';
import { Products } from './components/products/products';
import { UploadProduct } from './components/uploadProduct/uploadProduct';

export class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }

  isLoggedIn(val){
    this.setState(()=>({
      isAuthenticated: val
    }));
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Header isAuthenticated={this.state.isAuthenticated} isLoggedIn={this.isLoggedIn.bind(this)}/>
          <hr/>
          <Switch>
            <Route exact path="/login" render={(props) => <Login {...props} isLoggedIn={this.isLoggedIn.bind(this)}/>} />
            <Route path="/products" render={(props) => <Products {...props} isAuthenticated={this.state.isAuthenticated}/>}/>
            <Route path="/uploadProduct" render={(props) => <UploadProduct {...props} isAuthenticated={this.state.isAuthenticated}/>}/>
            <Redirect exact from='/' to='/login'/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
