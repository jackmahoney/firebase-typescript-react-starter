import * as React from "react";
import * as FirebaseService from "./../services/Firebase";
import { User } from "./../models/User"
import { Config } from "./../Config";
import { Incrementor } from "./Incrementor"
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Navbar } from "./Navbar"

interface AppState {
  user: User;
}

export class App extends React.Component<{}, AppState> {

  constructor(props: any) {
   super(props);

   this.state = {
     user: FirebaseService.getUser()
   }; 
  }

  logout() {
    this.setState({ user: null })
  }
  
  login() {
    FirebaseService
      .openSigninPopup()
      .then(user => {
        this.setState({ user })
      })
      .catch(err => alert('Error occurred' + err))
  }

  render() {

    const body = this.state.user 
    ? <Incrementor user={this.state.user}/>
    : <p>Please sign in</p>

    return (
     <div className="container">
       
       <Navbar 
       brandName={Config.brandName}
       user={this.state.user} 
       onLogin={this.login.bind(this)} 
       onLogout={this.logout.bind(this)}/>
      
      {body}
      
     </div>
    )
  }
}
