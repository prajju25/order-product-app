import React from 'react';

import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { orderBy } from '@progress/kendo-data-query';
import { ExcelExport, ExcelExportColumn } from "@progress/kendo-react-excel-export";

import { fetchUserOrders } from '../../services/apiService';

const _exporter = React.createRef();

const exportExcel = () => {
    if (_exporter.current) {
    _exporter.current.save();
    }
};

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
                <div>
                    <button className="k-button red-button small ml20" onClick={exportExcel}>Export</button>
                    <ExcelExport data={this.state.userOrders} fileName="User-Orders.xlsx" ref={_exporter}>
                        <ExcelExportColumn field="orderId" title="ID" width={200}/>
                        <ExcelExportColumn field="orderedAt"title="Order Date" width={350}/>
                    </ExcelExport>
                </div>
                <Grid style={{height:'350px', margin: '20px',width: '80%'}} data={orderBy(this.state.userOrders, this.state.sort)}
                sortable={true} sort={this.state.sort}
                onSortChange={(e) => {
                    this.setState({
                        sort: e.sort
                    });
                }}>
                    <Column field="orderId" title="ID" width="100px" />
                    <Column field="orderedAt" width="800px" title="Order Date"/>
                </Grid>
            </div>
        );
    }
}