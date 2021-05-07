import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import { Header } from './components/header';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './components/login/login';
import { Products } from './components/products/products';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route path="/products" component={Products}/>
          <Redirect exact from='/' to='/login'/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
