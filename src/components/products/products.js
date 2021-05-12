import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { ProductSearch } from './productSearch';
import { UserOrders } from './userOrders';

export class Products extends React.Component {

    constructor(props){
        super(props);
        if(!props.isAuthenticated){
            props.history.push('/login');
        }
    }

    render(){
        return (
            <div>
                <div className="nav-bar">
                    <div className="nav-list"><NavLink to={"/products/search"} 
                    activeStyle={{color: '#ed0909'}}><strong>Product Search</strong></NavLink></div>
                    <div className="nav-list"><NavLink to={"/products/orders"} 
                    activeStyle={{color: '#ed0909'}}><strong>User Orders</strong></NavLink></div>
                </div>
                <hr/>
                <Switch>
                    <Route path="/products/search" component={ProductSearch}/>
                    <Route path="/products/orders" component={UserOrders}/>
                    <Redirect exact from="/products" to="/products/search"/>
                </Switch>
            </div>
        );
    }
}