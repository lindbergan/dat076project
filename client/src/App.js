import React, { Component } from 'react';
import './App.css';
import Layout from './Layout.js';
import { Header } from './components/header.js';
import { Sidebar } from './components/sidebar.js';
import { GridView } from "./components/gridview";
import { Authentication } from "./components/authentication-view";

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
        <GridView />
      </Layout>
    );
  }
}

export default App;
