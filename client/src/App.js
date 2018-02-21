import React, { Component } from 'react';
import './App.css';
import { Header } from './components/Header.js';
import { Sidebar } from './components/sidebar.js';
import { Product } from "./components/product";

class App extends Component {
  state = {products: []};

  componentDidMount() {
    fetch('/products')
      .then(res => res.json())
      .then(products => this.setState({ products }))
  }

  render() {

    const { products } = this.state;

    return (
      <div className="App">
        <Header/>
        <h1>Products</h1>
        {products.map(product =>
          <Product key={ product.id } id={ product.id } product={ product }/>)}
        <Sidebar/>
      </div>
    );
  }
}

export default App;
