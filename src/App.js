import React, { Component } from 'react';
import './App.css';
import { Route, Routes, Navigate, useParams } from 'react-router-dom';
import StaffList from './components/StaffList';
import Header from './components/Header';
import Footer from './components/Footer';
import StaffDetail from './components/StaffDetail';
import Departments from './components/Departments';
import SalaryTable from './components/SalaryTable';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}
class App extends Component {
  render() {
    const StaffWithId = () => {
      const { id } = useParams()
      return (
        <StaffDetail staff={this.props.staffs.find(st => st.id === Number(id))} />
      )
    }
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route exact path='/staffs' element={<StaffList staffs={this.props.staffs} departments={this.props.departments} />} />
          <Route path='/staffs/:id' element={<StaffWithId />} />
          <Route exact path='/departments' element={<Departments departments={this.props.departments} />} />
          <Route exact path='/salaryTable' element={<SalaryTable staffs={this.props.staffs} />} />
          <Route path='*' element={<Navigate to='/staffs' replace />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();
    return <Component history={history} {...props} />;
  };
  return Wrapper;
};

export default withRouter(connect(mapStateToProps)(App));