import React from 'react';

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';

import userProducts from '../../data/userProducts.json';
import { fetchUserOrders } from '../../services/apiService'

export class UserOrders extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            sort: [{
                field: 'ProductName',
                dir: 'asc'
            }],
            userOrders: userProducts
        };
        let req = {
            userId: 6382372
        }
        fetchUserOrders(req).then(res=>{
            console.log(res);
            //TODO:fetch user orders
            this.setState(()=>({
                userOrders: userProducts
            }));
        }).catch(err=>console.log(err));
    }

    render(){
        return (
            <div>
                <Grid style={{height:'350px', margin: 'auto',width: '60%'}} data={orderBy(this.state.userOrders, this.state.sort)}
                sortable={true} sort={this.state.sort}
                onSortChange={(e) => {
                    this.setState({
                        sort: e.sort
                    });
                }}>
                    <Column field="ProductID" title="ID" width="100px" />
                    <Column field="ProductName" width="300px" title="Product Name" />
                    <Column field="QuantityPerUnit" width="200px"/>
                    <Column field="UnitPrice" width="200px" title="Price"/>
                </Grid>
            </div>
        );
    }
}