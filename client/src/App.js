import React, { Component } from 'react';
import './App.css';
import Layout from './Layout.js';
import { Header } from './components/Header.js';
import { Sidebar } from './components/Sidebar.js';
import { GridView } from "./components/Gridview";
import { Authentication } from "./components/Authentication-view";
import { Route } from 'react-router-dom';
import Checkout from './components/Checkout.js';
import ProductDetails from './components/Product-details.js';

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
