import React from 'react';
import { NavLink } from 'react-router-dom';

export class Header extends React.Component {

    constructor(props){
        super(props);
        this.logout = this.handleLogout.bind(this);
    }

    handleLogout() {
        sessionStorage.removeItem("user-session");
        this.props.isLoggedIn(false);
    }

    render() {
        return (
            <div className="header">
                <img className="logo" src="./verizon-logo.png" alt="Verizon Logo"/>
                {this.props.isAuthenticated ?(
                    <div style={{float: 'right', width: '30%'}}>
                        <div className="profile">
                            
                        </div>
                        <NavLink style={{float: 'right'}} to={"/login"} onClick={this.logout}>Logout</NavLink>
                    </div>
                ):(<></>)}
            </div>
        );
    }
}