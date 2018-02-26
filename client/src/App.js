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
        <div className="App grid-container">
          <div className="grid-header">
            <Header/>
          </div>
          <div className="grid-sidebar">
            <Sidebar/>
          </div>
          <div className="grid-main">
            <GridView products={products}/>
          </div>

          <style jsx="true">{`
            .grid-container{
              display:grid;
              grid-template-rows: 150px auto;
              grid-template-columns: 20% 80%;
              grid-template-areas:
                "grid-header grid-header"
                "grid-sidebar grid-main"
            }
            .grid-header{
              display:grid;
              grid-area: grid-header;
              height: 100%;
              width:100%;
              background-color: #B5C7CB;
            }

            .grid-sidebar{
              display: grid;
              grid-area: grid-sidebar;
              background-color: #EAEAEA;
            }

            .grid-main{
              display: grid;
              grid-area: grid-main;
              background-color: #EAEAEA;
              height: 100%;
              width: 100%;
            }


          `}</style>

        </div>
      );
    } else {
      return (
        <div className="App-no-products">
          <Header/>
          <h2>PRODUCTS LOADING..</h2>
        </div>
      );
    }
  }
}

export default App;
