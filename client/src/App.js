import React, { Component } from 'react';
import './App.css';
import { Header } from './components/header.js';
import { Sidebar } from './components/sidebar.js';

class App extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
        <Sidebar/>
      </div>
    );
  }
}

export default App;
