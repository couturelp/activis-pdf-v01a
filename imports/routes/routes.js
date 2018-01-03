import  { Meteor } from 'meteor/meteor';
import React  from 'react';
import { Router, Switch, Route, withRouter } from 'react-router';
import history from './history'
    
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import Reset from '../ui/Reset';
import RequestReset from '../ui/RequestReset';
import PdfRequest from '../ui/PdfRequest';

const unauthenticatedPages = ['/','/signup','reset-password','request-reset'];
const authenticatedPages = ['/dashboard','/pdfrequest']
let isUnauthenticatedPage = true;
let isAuthenticatedPage = false;

const ChangeTracker = withRouter(({match, location, history}) => {
    const pathName = location.pathname;
    isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    isAuthenticatedPage = authenticatedPages.includes(pathName);
    
    return false;
});

export const onAuthChange = (isAuthenticated) => {
    if (isAuthenticated){
      if (isUnauthenticatedPage){
        history.replace('/pdfrequest');
      }
    }else{
      if (isAuthenticatedPage) {
        history.replace('/');
      }
    }
};

export const routes = (
  <Router history={history}>
    <div>
    <Switch>
    <Route exact path="/" component={Login}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/request-reset" component={RequestReset} />
    <Route path="/reset-password/:token" component={Reset} />
    <Route path="/pdfrequest" component={PdfRequest} />
    <Route component={NotFound}/>
    </Switch>
    <ChangeTracker/>
    </div>
  </Router>
);