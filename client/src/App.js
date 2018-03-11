import React, { Component } from 'react';
import './App.css';
import Layout from './static/Layout.js';
import { GridView } from "./components/Gridview";
import { Authentication } from "./components/Authentication-view";
import { Route } from 'react-router-dom';
import { Checkout } from './components/Checkout.js';
import { ProductDetails } from './components/Product-details.js';
import { Payview } from './components/Payview.js';

class App extends Component {
  constructor(props) {
    super(props);

    const savedUserId = sessionStorage.getItem('userId');
    const savedAuthenticated = sessionStorage.getItem('authenticated');
    this.createUser = this.createUser.bind(this);

    this.state = {
      authenticated: savedAuthenticated,
      userId: savedUserId,
      searchTerm: '',
      profilePicture: undefined,
      profile: null,
      sortCheapest: false,
      sortReversingOrder: false,
    };
    this.updateCart();
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
              firstName: this.state.profile.givenName,
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
    sessionStorage.setItem('profilePictureUrl', profileObject.imageUrl);
    sessionStorage.setItem('profileFirstName', profileObject.givenName);
    sessionStorage.setItem('profileLastName', profileObject.familyName);
    sessionStorage.setItem('profileFullName', profileObject.name);
    sessionStorage.setItem('profileEmail', profileObject.email);
    this.createUser();
    this.setState({
      profile: profileObject
    });
    this.updateCart();
  }

  changeSearchTerm(newTerm) {
    this.setState({
      searchTerm: newTerm
    });
  }

  sortAscending() {
    this.setState({ sortReversingOrder: false, sortCheapest: null });
  }

  sortDescending() {
    this.setState({ sortReversingOrder: true, sortCheapest: null });
  }

  sortCheapest() {
    this.setState({ sortCheapest: true, sortReversingOrder: null });
  }

  sortMostExpensive() {
    this.setState({ sortCheapest: false, sortReversingOrder: null });
}
  updateCart() {
    const user_id = this.state.userId;
    fetch(`/carts/${user_id}`)
      .then(res => res.json())
      .then(cart => {
        this.setState({ cart: cart.cart, total_amount: cart.total_amount });
      });
  }

  render() {
    if (!this.state.authenticated || this.state.authenticated === 'false') {
      return <Authentication logIn={ this.logIn.bind(this) } setProfile={ this.setProfilePicture.bind(this) }/>
    }
    return (

      <Layout logOut={ this.logOut.bind(this) }
              changeTerm={ this.changeSearchTerm.bind(this) }
              profilePicture={ this.state.profile }
              sortAscending={ this.sortAscending.bind(this) }
              sortDescending={ this.sortDescending.bind(this) }
              sortCheapest={ this.sortCheapest.bind(this) }
              sortMostExpensive={ this.sortMostExpensive.bind(this) }
              total_amount={this.state.total_amount}
              cartContent={this.state.cart}>
        <Route path="/" exact component={ () =>
          <GridView searchTerm={ this.state.searchTerm }
                    sortReversingOrder={ this.state.sortReversingOrder }
                    sortCheapest={ this.state.sortCheapest }
                    updateCart={ this.updateCart.bind(this) }/> } />
        <Route path="/checkout" exact component={ () =>
          <Checkout searchTerm={ this.state.searchTerm }
                    updateCart={ this.updateCart.bind(this) }
                    cart={ this.state.cart }
                    total_amount={this.state.total_amount} /> } />
        <Route path="/product/:product_id" exact component={ ProductDetails } />
        <Route path="/Payview" exact component={ Payview } />
      </Layout>
    );
  }
}

export default App;
