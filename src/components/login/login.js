import React from 'react';

import { login } from '../../services/apiService';

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
            userName: this.state.username,
            password: this.state.pass//window.btoa(this.state.pass)
        };
        login(req).then(res=>{
            console.log(res);
            if(res && res.data && res.data.isSuccess === 'true'){
                sessionStorage.setItem("user-session", JSON.stringify(res.data));
                this.props.isLoggedIn(true, res.data);
                if(res.data.isAdmin === 'true'){
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

    redirect(){
        this.props.history.push('/register');
    }

    render(){
        return (
            <div className="signin">
                <h3>Verizon Enterprise Login</h3>
                <div className="login-page">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-field">
                            <input type="text" id="username" placeholder="Verizon User Id" value={this.state.uName} onChange={this.onChangeValue}/>
                        </div>
                        <div className="form-field">
                            <input type="password" id="pass" placeholder="Password" value={this.state.pass} onChange={this.onChangeValue}/>
                        </div>
                        {this.state.errorMsg !== ''&& <div style={{color: 'red'}}>{this.state.errorMsg}</div>}
                        <input className="red-button" type="submit" value="Sign In"/>
                    </form>
                </div>
                <div className="register">
                    <span>New to Verizon Application ?</span><br/>
                    <span>Click on Register</span><br/>
                    <input className="red-button" type="submit" value="Register" onClick={this.redirect.bind(this)}/>
                </div>
            </div>
        );
    }
}