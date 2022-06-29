import React, { Component } from 'react';
import './App.css';
import { DISHES } from './shared/dishes';
import { COMMENTS } from './shared/comments';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './redux/Store';
const store = Store();
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
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter >
      </Provider>
    );
  }
}

export default App;