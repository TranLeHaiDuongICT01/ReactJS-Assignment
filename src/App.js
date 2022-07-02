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
import { useLocation } from 'react-router-dom';
import { fetchStaffs, fetchStaffsSalary } from './redux/action/staffs';
import { fetchDepartments } from './redux/action/departments';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import StaffsDepartment from './components/StaffsDepartment';
const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}
const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => { dispatch(fetchStaffs()) },
  fetchDepartments: () => { dispatch(fetchDepartments()) },
  fetchStaffSalary: () => { dispatch(fetchStaffsSalary()) }
})
class App extends Component {
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffSalary();
  }
  render() {
    const StaffWithId = () => {
      const { id } = useParams();
      return (
        <StaffDetail staff={this.props.staffs.staffs.find(st => st.id === Number(id))}
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
        />
      )
    }
    return (
      <div className="App">
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} timeout={300} classNames='page'>
            <Routes>
              <Route exact path='/staffs' element={<StaffList fetchDepartments={this.props.fetchDepartments} />} />
              <Route path='/staffs/:id' element={<StaffWithId />} />
              <Route exact path='/departments' element={<Departments />} />
              <Route exact path='/salaryTable' element={<SalaryTable />} />
              <Route exact path='/departments/:id' element={<StaffsDepartment />} />
              <Route path='*' element={<Navigate to='/staffs' replace />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const location = useLocation();
    return <Component location={location} {...props} />;
  };
  return Wrapper;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));