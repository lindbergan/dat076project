import React, { Component } from 'react';
import './App.css';
import Layout from './Layout.js';
import { Header } from './components/header.js';
import { Sidebar } from './components/sidebar.js';
import { GridView } from "./components/gridview";
import { Authentication } from "./components/authentication-view";
import { Route } from 'react-router-dom';
import Checkout from './components/checkout.js';
import ProductDetails from './components/product-details.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: sessionStorage.getItem('authenticated')
    }
  }

  async componentDidMount() {}

  render() {
    if (!this.state.authenticated) {
      return <Authentication authFunc={
        () => {
          this.setState({ authenticated: true });
          sessionStorage.setItem('authenticated', this.state.authenticated);
        }
      }/>
    }
    return (
      <Layout>
        <Route path="/" exact component={GridView} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/product" exact component={ProductDetails} />
      </Layout>
    );
  }
}

export default App;
