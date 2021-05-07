import React from 'react';

import { login} from '../../services/apiService'

export class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            pass: ''
        }
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeValue(event){
        this.setState(()=>({
            [event.target.id]: event.target.value
        }));
    }

    onSubmit(event){
        let req = {
            username: this.state.username,
            encPassword: window.btoa(this.state.pass)
        };
        login(req).then(res=>{
            console.log(res);
            //TODO: write login redirection and validation
        }).catch(err=>console.log(err));
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
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}