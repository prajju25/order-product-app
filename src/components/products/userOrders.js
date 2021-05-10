import React from 'react';

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';

import { fetchUserOrders } from '../../services/apiService'

export class UserOrders extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            sort: [{
                field: 'ProductName',
                dir: 'asc'
            }],
            userOrders: []
        };
    }

    componentWillMount(){
        let user = JSON.parse(sessionStorage.getItem("user-session"));
        fetchUserOrders(user.userId).then(res=>{
            console.log(res);
            let response = res.data !== null && res.data !== ''?res.data:[];
            this.setState(()=>({
                userOrders: response
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
                    <Column field="id" title="ID" width="100px" />
                    <Column field="products" width="500px" title="Product Ids" />
                    <Column field="orderedAt" width="200px" title="Order Date"/>
                </Grid>
            </div>
        );
    }
}