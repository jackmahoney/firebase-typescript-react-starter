import * as React from "react";
import { User } from "./../models/User";
import { UserData } from "./../models/UserData";
import * as FirebaseService from "./../services/Firebase"

export interface IncrementorProps {
  user: User
}

export interface IncrementorState {
  count: number 
}

export class Incrementor extends React.Component<IncrementorProps, IncrementorState> {

  constructor(props: IncrementorProps) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    FirebaseService
    .getUserData(this.props.user)
    .then(userData => this.setState({ count: userData.count }))
  }

  increment() {
    const count = this.state.count + 1;
    this.setState({ count });
    FirebaseService.updateUserData(this.props.user, (userData: UserData) => {
      userData.count = count;
      return userData;
    });
  }

  render() {
    return (
      <div>
        <h4>Count: {this.state.count}</h4>
        <p>
          <a className="btn btn-success" onClick={this.increment.bind(this)}>Increment</a>
        </p>
      </div>
    );
  }
}