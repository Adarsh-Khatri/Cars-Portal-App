import React, { Component } from 'react';
import MainComponent from "./components/AllCarsPortal/MainComponent"
import { BrowserRouter } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    )
  }
}
