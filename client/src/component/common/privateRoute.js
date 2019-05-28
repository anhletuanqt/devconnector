import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const privateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticate ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(privateRoute);
