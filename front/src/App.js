import React, { Component } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Home />
      </React.Fragment>
    );
  }
}

export default App;
