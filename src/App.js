import React, { Component } from 'react';
import { STAFFS, DEPARTMENTS } from './shared/staffs';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import StaffList from './components/StaffList';
import Header from './components/Head';
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
  handleSearch(search) {
    this.setState({
      ...this.state,
      staffs: STAFFS.filter(staff => staff.name.includes(search))
    })
  }
  handleSort(sort) {
    if (sort === 'doB' || sort === '-doB')
      this.setState({
        ...this.state,
        staffs: STAFFS.sort((a, b) => sort === 'doB' ?
          new Date(a.doB).getTime() - new Date(b.doB).getTime() :
          new Date(b.doB).getTime() - new Date(a.doB).getTime()
        )
      })
  }
  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail staff={this.state.staffs.find(st => st.id === Number(match.params.id))} />
      )
    }
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path='/staffs' component={() => <StaffList staffs={this.state.staffs}
              handleSearch={(search) => this.handleSearch(search)}
              handleSort={(sort) => this.handleSort(sort)}
            />}
            />
            <Route path='/staffs/:id' component={StaffWithId} />
            <Route exact path='/departments' component={() => <Departments departments={this.state.departments} />} />
            <Route exact path='/salaryTable' component={() => <SalaryTable staffs={this.state.staffs} />} />
            <Redirect to='/staffs' />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;