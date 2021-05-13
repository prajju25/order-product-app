import React from "react";
import { createUser } from '../../services/apiService';

export class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            pass: '',
            isAdmin: false,
            errorMsg: ''
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    onChangeValue(event){
        if(event.target.id === 'isAdmin'){
            this.setState(()=>({
                isAdmin: !this.state.isAdmin,
                errorMsg: ''
            }));
        } else {
            this.setState(()=>({
                [event.target.id]: event.target.value,
                errorMsg: ''
            }));
        }
    }

    onRegister(event){
        let req = {
            userName: this.state.username,
            password: this.state.pass,//window.btoa(this.state.pass)
            isAdmin: this.state.isAdmin
        };
        createUser(req).then(res=>{
            console.log(res);
            if(res && res.data && res.data.isSuccess === 'true'){
                this.props.history.push('/login');
            } else {
                this.setState(()=>({
                    errorMsg: 'Something failed. Please try again'
                }));
            }
        }).catch(err=>{
            console.log(err);
            this.setState(()=>({
                errorMsg: 'Something failed. Please try again'
            }));
        });
        event.preventDefault();
    }

    redirect(){
        this.props.history.push('/login');
    }

    render(){
        return(
            <div className="signin">
                <h3>Verizon Enterprise Registeration</h3>
                <div className="login-page">
                    <form onSubmit={this.onRegister}>
                        <div className="form-field">
                            <input type="text" id="username" placeholder="Verizon User Id" value={this.state.uName} onChange={this.onChangeValue}/>
                        </div>
                        <div className="form-field">
                            <input type="password" id="pass" placeholder="Password" value={this.state.pass} onChange={this.onChangeValue}/>
                        </div>
                        <div className="form-field">
                            <label for="isAdmin">Admin: </label>
                            <input type="checkbox" id="isAdmin" value={this.state.isAdmin} onChange={this.onChangeValue}/>
                        </div>
                        {this.state.errorMsg !== ''&& <div style={{color: 'red'}}>{this.state.errorMsg}</div>}
                        <input className="red-button" type="submit" value="Register"/>
                    </form>
                </div>
                <div className="register">
                    <span>Already Registered ?</span><br/>
                    <span>Click on Sign In</span><br/>
                    <input className="red-button" type="submit" value="Sign In"  onClick={this.redirect.bind(this)}/>
                </div>
            </div>
        )
    }
}