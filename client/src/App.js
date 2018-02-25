import React, { Component } from 'react';
import './App.css';
import { Header } from './components/Header.js';
import { Sidebar } from './components/sidebar.js';
import {GridView} from "./components/gridview";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: null
    }
  }

  async componentDidMount() {
    fetch('/products')
      .then(res => res.json())
      .then(products => this.setState({ products }))
  }

  render() {
    const { products } = this.state;

    if (products) {
      return (
        <div className="App">
          <Header/>
          <h1>Products</h1>
          <GridView products={products}/>
          <Sidebar/>
        </div>
      );
    } else {
      return (
        <div>{/* Placeholder div */}</div>
      );
    }
  }
}

export default App;
