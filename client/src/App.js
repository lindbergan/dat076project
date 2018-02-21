import React, { Component } from 'react';
import './App.css';
import { Header } from './components/Header.js';
import { Sidebar } from './components/sidebar.js';

class App extends Component {
  state = {products: []};

  componentDidMount() {
    fetch('/products')
      .then(res => res.json())
      .then(products => this.setState({ products }))
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <h1>Products</h1>
        {this.state.products.map(product =>
          <div>{product.name}</div>)}
        <Sidebar/>
      </div>
    );
  }
}

export default App;
