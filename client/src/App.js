import React, { Component } from 'react';
import './App.css';
import Layout from './Layout.js';
import { GridView } from "./components/Gridview";
import { Authentication } from "./components/Authentication-view";
import { Route } from 'react-router-dom';
import { Checkout } from './components/Checkout.js';
import { ProductDetails } from './components/Product-details.js';

class App extends Component {
  constructor() {
    super();

    const savedUserId = sessionStorage.getItem('userId');
    const savedAuthenticated = sessionStorage.getItem('authenticated');
    this.createUser = this.createUser.bind(this);

    this.state = {
      authenticated: savedAuthenticated,
      userId: savedUserId,
      searchTerm: '',
      profilePicture: undefined,
      profile: null
    };
  }

  createUser() {
    const id = this.state.userId;
    fetch(`/users/${id}`)
      .then(res => res.json())
      .then(result => {
        if (result.hasOwnProperty('message')) {
          return fetch('/users', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: id.toString(),
              firstName: this.state.profile.firstName,
              lastName: this.state.profile.familyName,
              email: this.state.profile.email,
              role: 'customer',
              userimgurl: this.state.profile.imageUrl,
            })
          });
        }
        else {
          console.log("Creating user since it didn't exist before.")
        }
      })
   }

  logIn(userId) {
    this.setState({
      authenticated: true,
      userId: userId
    });
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('authenticated', true);
  }

  logOut() {
    this.setState({
      authenticated: false,
      userId: null
    });
    sessionStorage.setItem('userId', null);
    sessionStorage.setItem('authenticated', false);
  }

  setProfilePicture(profileObject) {
    this.setState({
      profile: profileObject
    });
    sessionStorage.setItem('profilePictureUrl', profileObject.imageUrl);
    sessionStorage.setItem('profileFirstName', profileObject.givenName);
    sessionStorage.setItem('profileLastName', profileObject.familyName);
    sessionStorage.setItem('profileFullName', profileObject.name);
    sessionStorage.setItem('profileEmail', profileObject.email);
    this.createUser();
  }

  changeSearchTerm(newTerm) {
    this.setState({
      searchTerm: newTerm
    });
  }

  async componentDidMount() {}

  render() {
    if (!this.state.authenticated || this.state.authenticated === 'false') {
      return <Authentication logIn={ this.logIn.bind(this) } setProfile={this.setProfilePicture.bind(this)}/>
    }

    return (
      <Layout logOut={ this.logOut.bind(this) } changeTerm={ this.changeSearchTerm.bind(this) }
      profilePicture={this.state.profile}>
        <Route path="/" exact component={ () => <GridView searchTerm={ this.state.searchTerm }/> } />
        <Route path="/checkout" exact component={ () => <Checkout searchTerm={ this.state.searchTerm } /> } />
        <Route path="/product/:product_id" exact component={ ProductDetails } />
      </Layout>
    );
  }
}

export default App;
