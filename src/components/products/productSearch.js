import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';

import { orderSave, fetchAllProducts } from '../../services/apiService';
import products from '../../data/products.json';
import { ActionCell } from './ActionCell';

export class ProductSearch extends React.Component {

    ActionColumn = props => (
        <ActionCell {...props} isOrder={true} addToCart={this.addToCart} cancelOrder={this.cancelOrder} />
    );
    cartColumn = props => (
        <ActionCell {...props} isOrder={false} addToCart={this.addToCart} cancelOrder={this.cancelOrder} />
    );
    constructor(props){
        super(props);
        this.state = {
            sort: [{
                field: 'ProductName',
                dir: 'asc'
            }],
            rows: [],
            loading: false,
            userInput: "",
            productsList: products,
            orderCart: []
        };
        fetchAllProducts().then(res=>{
            console.log(res);
            this.setState(()=>({
                productsList: res
            }));
        }).catch(err=>console.log(err));
    }

    onChange = (event) => {
        const userInput = event.currentTarget.value
    
        const rows = this.state.productsList.filter(
          product =>
            product.ProductName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
    
        this.setState(()=>({
          rows: rows,
          loading: true,
          userInput: event.target.value,
        }));
    }
    
    onClick = (event) => {
        this.setState(()=>({
          rows: [],
          loading: false,
          userInput: event.target.innerText,
        }));
    }

    orderProduct = () =>{
        let req={
            "orderId": 1,
            "userId": "1",
            "product": this.state.orderCart
        }
        orderSave(req).then(res=>{
            console.log(res);
        }).catch(err=>console.log(err));
    }

    cancelOrder = (product) => {
        let data = this.state.orderCart;
        for (let i=0; i<data.length; i++){
            if(data[i].ProductName === product.ProductName){
                data.splice(i,1);
            }
        }
        this.setState(()=>({
            orderCart: data
        }));
    }

    addToCart = (product) => {
        let data = this.state.orderCart;
        data.push(product);
        this.setState(()=>({
            orderCart: data
        }));
    }

    render(){
        let autoComplete;
        if (this.state.loading && this.state.userInput) {
            if (this.state.rows.length) {
                autoComplete = (
                <ul className="list-produt">
                    {this.state.rows.map((product, index) => {
                    return (
                        <li className="list-item" key={index} onClick={this.onClick.bind(this)}>
                        {product.ProductName}
                        </li>
                    )
                    })}
                </ul>
                )
            } else {
                autoComplete = (
                <>
                    <p>Cannot find the products.</p>
                </>
                )
            }
        };
        return (
            <div className="product-container">
                <div className="product-list">
                    <div>
                    <React.Fragment>
                        <label htmlFor="search">Search Product:</label>
                        <input id="search" type="search" onChange={this.onChange.bind(this)} 
                        value={this.state.userInput} />
                        <div className={"autocomplete "+ (this.state.loading 
                            && this.state.userInput ? 'show' : 'hidden')}>
                            {autoComplete}
                        </div>
                    </React.Fragment>
                    </div>
                    <div>
                        <Grid style={{height:'350px', margin: '40px 10px 10px 10px',width: 'auto'}} data={orderBy(this.state.productsList, this.state.sort)}
                        sortable={true} sort={this.state.sort}
                        onSortChange={(e) => {
                            this.setState({
                                sort: e.sort
                            });
                        }}>
                            <Column field="ProductID" title="ID" width="100px" />
                            <Column field="ProductName" width="200px" title="Product Name" />
                            <Column field="QuantityPerUnit" width="115px"/>
                            <Column field="UnitPrice" width="150px" title="Price"/>
                            <Column title="Actions" width="150px" cell={this.ActionColumn}/>
                        </Grid>
                    </div>
                </div>
                <div className="cart-list">
                    <h3>Cart Details</h3>
                    <div>
                    <Grid style={{height:'350px', margin: '10px',width: 'auto'}} data={this.state.orderCart}>
                        <Column field="ProductID" title="ID" width="50px" />
                        <Column field="ProductName" width="200px" title="Product Name" />
                        <Column field="UnitPrice" width="100px" title="Price"/>
                        <Column title="Actions" width="150px" cell={this.cartColumn}/>
                    </Grid>
                    </div>
                    <input type="submit" onClick={this.orderProduct} value="Submit Order"/>
                </div>
            </div>
        );
    }
}