import React from 'react';
import { NavLink } from 'react-router-dom';

export class Header extends React.Component {

    constructor(props){
        super(props);
        this.logout = this.handleLogout.bind(this);
        //let user = JSON.parse(sessionStorage.getItem("user-session"));        
        this.state = {
            profilePopup: false
        };
    }

    handleLogout() {
        sessionStorage.removeItem("user-session");
        this.props.isLoggedIn(false, null);
    }

    showPopup = () => {
        this.setState(()=>({
            profilePopup: !this.state.profilePopup
        }))
    }

    render() {
        let profieDisplay;
        if(this.props.user !== null && this.props.user !== undefined){
            profieDisplay  = (            
                <div className={"profile " + (this.state.profilePopup ? 'show' : 'hidden')}>
                    <div><strong>{this.props.user.userName}</strong></div>
                    <div><strong>{this.props.user.isAdmin == "true" ? 'Admin':'Non-Admin'}</strong></div>
                    <NavLink to={"/login"} onClick={this.logout}>Logout</NavLink>
                </div>
            );
        }
        return (
            <div className="header">
                <img className="logo" src="./verizon-logo.png" alt="Verizon Logo"/>
                {this.props.isAuthenticated ?(
                    <div style={{float: 'right', width: '30%'}} onClick={this.showPopup.bind(this)}>
                        <span tabindex="0" class="profile-pic">{this.props.user.userName.charAt(0).toUpperCase()}</span>
                        {profieDisplay}
                    </div>
                ):(<></>)}
            </div>
        );
    }
}