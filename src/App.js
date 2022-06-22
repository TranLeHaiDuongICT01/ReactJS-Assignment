import React, { Component } from 'react';
import './App.css';
import { DISHES } from './shared/dishes'
import { COMMENTS } from './shared/comments'
import Main from './components/MainComponent'
import { BrowserRouter } from 'react-router-dom';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dishes: DISHES,
      comments: COMMENTS
    }
  }
  render() {
    return (

      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter >

    );
  }
}

export default App;