import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './App.css';

import {Recipes} from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <main className="App-main">
          <Router class="App-content">
            <Route path="/" exact component={Recipes} />
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
