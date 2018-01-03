import React  from 'react';
import { Link } from 'react-router-dom';
import  { Meteor } from 'meteor/meteor';

import history from './../routes/history' 

export default class RequestReset extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: '' 
      };
  }
  componentDidMount(){
    if (Meteor.userId()){
      this.props.history.replace('/dashboard');
    }
  };
  onSubmit(e){
    e.preventDefault();
    
    let email = this.refs.email.value.trim();
    Accounts.forgotPassword({email: email}, function (e, r) {
      if (e) {
          console.log(e.reason);
      } else {
          console.log("Sent email");
          history.replace('/');
      }
    }); 
  }

  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Forgotten password</h1>
          <p>Fill in your email below and if it is valid we will send you a link to reset your password.</p>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
              <input type="email" ref="email" name="email" placeholder="Email"/>
              <button className="button">Reset</button>
          </form>
          <Link to="/">Return to login</Link>
        </div>
      </div>
    );
  }
}