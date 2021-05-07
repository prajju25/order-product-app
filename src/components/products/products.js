import React from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { ProductSearch } from './productSearch';
import { UserOrders } from './userOrders';

export class Products extends React.Component {

    render(){
        return (
            <div>
                <div className="nav-bar">
                    <div className="nav-list"><NavLink to={"/products/search"} 
                    activeStyle={{ backgroundColor: '#d4d4d4'}}>Product Search</NavLink></div>|
                    <div className="nav-list"><NavLink to={"/products/orders"} 
                    activeStyle={{ backgroundColor: '#d4d4d4'}}>User Orders</NavLink></div>
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