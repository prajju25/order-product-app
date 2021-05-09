import React from 'react';

import { login} from '../../services/apiService';

export class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            pass: '',
            errorMsg: ''
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeValue(event){
        this.setState(()=>({
            [event.target.id]: event.target.value,
            errorMsg: ''
        }));
    }

    onSubmit(event){
        let req = {
            username: this.state.username,
            encPassword: window.btoa(this.state.pass)
        };
        login(req).then(res=>{
            console.log(res);
            if(res && res.data && res.data.isloggedIn){
                sessionStorage.setItem("user-session", JSON.stringify(res.data));
                this.props.isLoggedIn(true);
                if(res.data.isAdmin){
                    this.props.history.push('/uploadProduct');
                } else {
                    this.props.history.push('/products');
                }
            } else {
                this.setState(()=>({
                    errorMsg: 'Invalid Username and Password. Try Again.'
                }))
            }
        }).catch(err=>{
            console.log(err)
            this.setState(()=>({
                errorMsg: 'Invalid Username and Password. Try Again.'
            }))
        });
        event.preventDefault();
    }

    render(){
        return (
            <div>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label htmlFor="username" style={{marginRight: '35px'}}>UserName:</label>
                        <input type="text" id="username" value={this.state.uName} onChange={this.onChangeValue}/>
                    </div>
                    <div>
                        <label htmlFor="pass" style={{marginRight: '43px'}}>Password:</label>
                        <input type="password" id="pass" value={this.state.pass} onChange={this.onChangeValue}/>
                    </div>
                    {this.state.errorMsg !== ''&& <div style={{color: 'red'}}>{this.state.errorMsg}</div>}
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}