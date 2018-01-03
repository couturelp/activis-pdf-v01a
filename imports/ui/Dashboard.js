import React from 'react';
import PrivateHeader from './PrivateHeader';

import history from './../routes/history' ;



export default () => {
  if (!Meteor.userId()){
    history.replace('/');
  }
  return (
    <div>
      <PrivateHeader title='Dashboard'/>
      <div className="page-content">
      Dashboard page content.
      </div>
    </div>
  );
};