import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

//---------------- components -----------------//
import { Navbar, Landing, Footer, Posts, Post } from './component';
import { Register, Login } from './component/auth';
import { Dashboard, CreateProfile, Profile } from './component/profile';
import { PrivateRoute } from './component/common';
import {
  EditProfile,
  AddExperience,
  AddEducation
} from './component/profile/add-credential';
import ProfileIndividual from './component/profile/individual';
//------------------ redux --------------------//
import { setCurrentUser, userLogout } from './redux/actions';
import initStore from './redux/store';

import { setAuthToken } from './utils';

const { store } = initStore();

if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token');
  setAuthToken(token);
  const user = jwt_decode(token);
  store.dispatch(setCurrentUser(user));

  // Check for expire token
  const currentTime = Date.now() / 1000;
  if (user.exp < currentTime) {
    // Logout user
    store.dispatch(userLogout());
    // Clear token
    localStorage.removeItem('token');
    // Redirect to login
    window.location.href = '/login';
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <div className='container'>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profile' component={Profile} />
            <Route
              exact
              path='/profile/:user_id'
              component={ProfileIndividual}
            />
            <Switch>
              <PrivateRoute path='/dashboard' component={Dashboard} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/experience'
                component={AddExperience}
              />
              <PrivateRoute exact path='/education' component={AddEducation} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/post/:id' component={Post} />
            </Switch>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
