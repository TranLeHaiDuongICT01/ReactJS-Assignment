import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'
import Menu from './components/MenuComponent'
import './App.css';
import { DISHES } from './shared/dishes'
import { COMMENTS } from './shared/comments'
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
      <div className="App">
        <Navbar dark color='primary'>
          <div className='container'>
            <NavbarBrand href='/'>Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} comments={this.state.comments} />
      </div>
    );
  }
}

export default App;