import React, { Component } from 'react';
import { STAFFS, DEPARTMENTS } from './shared/staffs';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import StaffList from './components/StaffList';
import Header from './components/Header';
import Footer from './components/Footer';
import StaffDetail from './components/StaffDetail';
import Departments from './components/Departments';
import SalaryTable from './components/SalaryTable';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS
    }
  }
  render() {
    const StaffWithId = () => {
      const { id } = useParams()
      return (
        <StaffDetail staff={this.state.staffs.find(st => st.id === Number(id))} />
      )
    }
    return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path='/staffs' element={<StaffList staffs={this.state.staffs} />} />
            <Route path='/staffs/:id' element={<StaffWithId />} />
            <Route exact path='/departments' element={<Departments departments={this.state.departments} />} />
            <Route exact path='/salaryTable' element={<SalaryTable staffs={this.state.staffs} />} />
            <Route path='*' element={<Navigate to='/staffs' replace />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;