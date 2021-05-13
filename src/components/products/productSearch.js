import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';

import { orderSave, fetchAllProducts, searchProducts } from '../../services/apiService';
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
        let user = JSON.parse(sessionStorage.getItem("user-session"));
        this.state = {
            sort: [{
                field: 'productName',
                dir: 'asc'
            }],
            rows: [],
            loading: false,
            userInput: "",
            productsList: [],
            orderCart: [],
            user: user,
            successMsg: '',
            orderError: ''
        };
    }

    componentWillMount(){
        fetchAllProducts().then(res=>{
            console.log(res);            
            let response = res.data !== null && res.data !== '' ? res.data:[];
            this.setState(()=>({
                productsList: response
            }));
        }).catch(err=>console.log(err));
    }

    onChange(event){
        const userInput = event !== '' ? event.currentTarget.value: '';
        
        /* const rows = this.state.productsList.filter(
            product =>
              product.productName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        ); */
        if(userInput && userInput !== ''){
            searchProducts(userInput, this.state.user.userName).then((res)=>{
                console.log(res);
                let response = res.data !== null && res.data !== '' ? res.data:[];
                this.setState(()=>({
                    rows: response,
                    loading: true
                }));
            });
        } else {
            fetchAllProducts().then(res=>{
                console.log(res);            
                let response = res.data !== null && res.data !== '' ? res.data:[];
                this.setState(()=>({
                    productsList: response
                }));
            }).catch(err=>console.log(err));
        }
        if(event !== ''){
            this.setState(()=>({
                userInput: event.target.value,
            }));
        }
    }
    
    onClick(event){
        this.setState(()=>({
          loading: false,
          userInput: event.target.innerText ==='' ? this.state.userInput : event.target.innerText,
        }));
        searchProducts(this.state.userInput, this.state.user.userName).then((res)=>{
            console.log(res);
            let response = res.data !== null && res.data !== '' ? res.data:[];
            this.setState(()=>({
                productsList: response
            }));
        });
    }

    orderProduct(){
        let req={
            "orderId": Math.floor(Math.random()*90000) + 10000,
            "userId": +this.state.user.userId,
            "products": this.state.orderCart,
            "orderedAt": new Date()
        }
        orderSave(req).then(res=>{
            console.log(res);
            this.setState(()=>({
                orderCart: [],
                successMsg: `Order success!! Order ID: ${res.data.orderId}`,
                orderError: ''
            }));
        }).catch(err=>{
            this.setState(()=>({
                orderError: 'Order Failed.'
            }))
            console.log(err);
        });
    }

    cancelOrder = (product) => {
        let data = this.state.orderCart;
        for (let i=0; i<data.length; i++){
            if(data[i].productName === product.productName){
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

    clearMsg(param){
        this.setState(()=>({
            [param.target.id]: ''
        }));
        if(param.target.id === 'userInput'){
            this.onChange('');
        }
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
                        {product.productName}
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
                    <div className="search-bar">
                    <React.Fragment>
                        <label htmlFor="search">Search Product:</label>
                        <input id="search" type="search" onChange={this.onChange.bind(this)} 
                        value={this.state.userInput} />
                        <div className={"autocomplete "+ (this.state.loading 
                            && this.state.userInput ? 'show' : 'hidden')}>
                            {autoComplete}
                        </div>
                        <input className="red-button small" type="submit" value="Search" 
                        onClick={this.onClick.bind(this)}/>
                        <input id="userInput" className="black-button small" type="submit" 
                        value="Reset" onClick={this.clearMsg.bind(this)}/>
                    </React.Fragment>
                    </div>
                    <div>
                        <Grid style={{height:'380px', margin: '20px 0px 0px 20px',width: 'auto'}} data={orderBy(this.state.productsList, this.state.sort)}
                        sortable={true} sort={this.state.sort}
                        onSortChange={(e) => {
                            this.setState({
                                sort: e.sort
                            });
                        }}>
                            <Column field="id" title="ID" width="100px" />
                            <Column field="productName" width="230px" title="Product Name" />
                            <Column field="productType" width="140px"/>
                            <Column field="productCost" width="150px" title="Price"/>
                            <Column title="Actions" width="120px" cell={this.ActionColumn}/>
                        </Grid>
                    </div>
                </div>
                <div className="cart-list">
                    <div className="cart-header">
                        <strong>Cart Items</strong>               
                        <input type="submit" className="red-button" onClick={this.orderProduct.bind(this)} value="Submit Order" disabled={this.state.orderCart.length===0}/>
                        {this.state.orderError !== ''&& <div className="error-msg" style={{color: 'red'}}>{this.state.orderError}
                        <input id="orderError" type="submit" style={{marginLeft: '20px'}} onClick={this.clearMsg.bind(this)} value="X"/></div>}
                        {this.state.successMsg !== ''&& <div className="error-msg" style={{color: 'green'}}>{this.state.successMsg}
                        <input id="successMsg" type="submit" style={{marginLeft: '20px'}} onClick={this.clearMsg.bind(this)} value="X"/></div>}
                    </div>
                    <div>
                        <Grid style={{height:'380px', margin: '15px 10px 10px 10px',width: 'auto'}} data={this.state.orderCart}>
                            <Column title="Actions" width="150px" cell={this.cartColumn}/>
                            <Column field="productName" width="230px" title="Product Name" />
                            <Column field="productCost" width="100px" title="Price"/>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}