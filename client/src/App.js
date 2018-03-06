import React, { Component } from 'react';
import './App.css';
import Layout from './Layout.js';
import { GridView } from "./components/Gridview";
import { Authentication } from "./components/Authentication-view";
import { Route } from 'react-router-dom';
import {Checkout} from './components/Checkout.js';
import {ProductDetails} from './components/Product-details.js';

class App extends Component {
  constructor() {
    super();

    const savedUserId = sessionStorage.getItem('userId');
    const savedAuthenticated = sessionStorage.getItem('authenticated');

    this.state = {
      authenticated: savedAuthenticated,
      userId: savedUserId,
      searchTerm: ''
    };
  }

  // createUser(user_id){
  //   fetch()
  // }

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

  changeSearchTerm(newTerm) {
    this.setState({
      searchTerm: newTerm
    });
  }

  async componentDidMount() {}

  render() {
    if (!this.state.authenticated || this.state.authenticated === 'false') {
      return <Authentication logIn={ this.logIn.bind(this) }/>
    }
    // const user_id = sessionStorage.getItem('userId');
    // createUser(user_id);
    return (
      <Layout logOut={ this.logOut.bind(this) } changeTerm={ this.changeSearchTerm.bind(this) }>
        <Route path="/" exact component={ () => <GridView searchTerm={ this.state.searchTerm }/> } />
        <Route path="/checkout" exact component={ Checkout } />
        <Route path="/product/:product_id" exact component={ ProductDetails } />
      </Layout>
    );
  }
}

export default App;
