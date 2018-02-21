import React, { Component } from 'react';

export class Header extends Component {
    render() {
      return (
        <div className="headertest">
          <img alt="logo" className="headerlogo"/>
          <h1>
              Webbshop
          </h1>
          <input type="text" placeholder="Search.."/>
        </div>
      )
    }
}
