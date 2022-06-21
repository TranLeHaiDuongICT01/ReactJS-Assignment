import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap'
import { STAFFS } from './shared/staffs';
import './App.css';
import StaffList from './components/StaffList';
class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar dark color='primary'>
          <div className='container-fluid'>
            <NavbarBrand href='/'>Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <StaffList staffs={STAFFS} />
      </div>
    );
  }
}

export default App;