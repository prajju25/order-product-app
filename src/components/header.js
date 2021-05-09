import React from 'react';
import { NavLink } from 'react-router-dom';

export class Header extends React.Component {

    constructor(props){
        super(props);
        this.logout = this.handleLogout.bind(this);
    }

    handleLogout() {
        sessionStorage.removeItem("user-session");
    }

    render() {
        return (
            <div className="header">
                <h1 className="heading">Order Product App</h1>
                <span style={{float: 'right'}}>
                    {window.location.pathname !== '/login' ?(
                        <NavLink to={"/login"} onClick={this.logout}>Logout</NavLink>
                    ):(<>
                    {window.location.pathname}
                    </>
                    )}
                </span>
            </div>
        );
    }
}