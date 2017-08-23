import * as React from "react";
import { User } from "./../models/User" 

export interface NavbarProps {
  brandName: string,
  user: User,
  onLogin: Function,
  onLogout: Function
}

export class Navbar extends React.Component<NavbarProps, {}> {

  render() {

    const authButton = !this.props.user
    ? <a className="mr-15 btn btn-primary" onClick={this.props.onLogin.bind(this)}>Login</a>
    : <a className="mr-15 btn" onClick={this.props.onLogout.bind(this)}>Logout</a>

    const userInfo = this.props.user    
    ? (<span>       
          <img src={this.props.user.image} className="navbar-img mr-15" alt={this.props.user.name}/>
          <span className="navbar-name mr-15">{this.props.user.name}</span>
      </span>)  
    : <span></span>;

    return (<nav className="navbar navbar-default">
      <div className="container-fluid">
          <div className="navbar-header"> 
            <a href="#" className="navbar-brand">{this.props.brandName}</a> 
          </div>
          <form className="navbar-form navbar-right">
            {userInfo}  
            {authButton}
            <a className="btn">Help</a>
          </form>
      </div>  
    </nav>);
    }
  }