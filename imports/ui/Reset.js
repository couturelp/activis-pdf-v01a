import React  from 'react';
import { Link } from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base'

import history from './../routes/history' 

export default class Reset extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: '' 
      };
  }
  onSubmit(e){
      e.preventDefault();

      let password = this.refs.password.value.trim();
      let passwordConfirm = this.refs.passwordconfirm.value.trim();

      if (password.length > 7 && passwordConfirm == password) {
        Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
          if (err) {
            console.log('We are sorry but something went wrong.');
          } else {
            console.log('Your password has been changed. Welcome back!');
            Session.set('resetPassword', null);
            history.replace('/dashboard');
          }
        });
      }else{
        return this.setState({error: 'Password must be more than 8 characters long.'})
      }
  }
  componentDidMount(){
    if (Meteor.userId()){
      this.props.history.replace('/dashboard');
    }
    if (this.props.match.params.token) {
      Session.set('resetPassword', this.props.match.params.token);
    }
  };
  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
            <h1>Set your new password</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <p>Please enter you new password below.</p>
            
            <form onSubmit={this.onSubmit.bind(this)}  noValidate className="boxed-view__form">
              <input name="password" ref="password" placeholder="New Password" type="password"/>
              <input name="passwordconfirm" ref="passwordconfirm" placeholder="Confirm" type="password"/>
              <button className="button">Reset</button>
            </form>
        </div>
      </div>
    );
  }
}