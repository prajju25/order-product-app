import React from "react";
import { Upload } from '@progress/kendo-react-upload';

export class UploadProduct extends React.Component {

    constructor(props){
        super(props);
        if(!props.isAuthenticated){
            props.history.push('/login');
        }
    }

    render(){
        return (
            <div className="uploadProduct">
                <h3>For Bulk upload of products insert the product list files below:</h3>
                <div>Click on this <a href="/ProductUploadTemplate.xlsx" target="_blank">link</a> for product file format</div>
                <Upload autoUpload={false} batch={false} multiple={false} defaultFiles={[]} withCredentials={false} 
                saveUrl={'/upload/save'}
                /* removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'} *//>
            </div>
        );
    }
}