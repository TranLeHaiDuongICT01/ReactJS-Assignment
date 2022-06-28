import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardImg, Input, Button, Form } from 'reactstrap';
import ModalAddStaff from "./ModalAddStaff";
import { actions } from "react-redux-form";
const Staffs = ({ staffs }) => {
    return (
        staffs?.map(staff => (
            <div key={staff.id} className='col-6 col-md-4 col-lg-2 mt-3'>
                <Card className='hover-effect'>
                    <Link to={`/staffs/${staff.id}`} className='text'>
                        <CardImg src={staff.image} alt={staff.name} />
                        <CardText className='p-1 text'>{staff.name}</CardText>
                    </Link>
                </Card>
            </div>
        ))
    )
}
class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            staffs: this.props.staffs
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSearch(e) {
        e.preventDefault();
        const search = e.target.querySelector('input').value;
        this.setState({
            ...this.state,
            staffs: this.props.staffs.filter(staff => staff.name.toLowerCase().includes(search.toLowerCase()))
        });
    }
    handleSort(e) {
        e.preventDefault();
        const sort = e.target.querySelector('select').value;
        if (sort === 'doB' || sort === '-doB')
            this.setState({
                ...this.state,
                staffs: this.props.staffs.sort((a, b) => sort === 'doB' ?
                    new Date(a.doB).getTime() - new Date(b.doB).getTime() :
                    new Date(b.doB).getTime() - new Date(a.doB).getTime()
                )
            });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values, dispatcher) {
        const departments = this.props.departments;
        const index = departments.findIndex(de => de.name === values.department);
        const staffs = this.props.staffs;
        const newStaff = {
            id: staffs.length,
            name: values?.name,
            doB: new Date(values?.doB),
            salaryScale: values.salaryScale,
            startDate: values.startDate,
            department: departments[index] || 'Sale',
            annualLeave: values.annualLeave,
            overTime: values.overTime,
            salary: values,
            image: '/assets/images/alberto.png',
        }
        staffs.push(newStaff);
        localStorage.setItem('staffs', JSON.stringify(staffs));
        departments[index].numberOfStaff = departments[index].numberOfStaff + 1;
        localStorage.setItem('departments', JSON.stringify(departments));
        dispatcher(actions.reset('staff', {
            name: '',
            doB: '',
            salaryScale: '',
            startDate: '',
            department: 'Sale',
            annualLeave: '',
            overTime: ''
        }));
        this.toggleModal();
    }
    render() {
        return (
            <React.Fragment>
                <div className="row m-auto container p-0">
                    <div className="col-12 col-lg-4 mt-4" style={{ display: 'flex', gap: '20px' }}>
                        <h3 className="staff-list-title">Nhân Viên</h3>
                        <Button className="btn-form" onClick={this.toggleModal}>Add</Button>
                    </div>
                    <Form className="col-12 col-lg-4 mt-4" style={{ display: 'flex', gap: '20px' }} onSubmit={this.handleSearch}>
                        <Input type='text' placeholder='Search by name' />
                        <Button className="btn-form" type="submit" color='primary'>Search</Button>
                    </Form>
                    <Form className="col-12 col-lg-4 mt-4" style={{ display: 'flex', gap: '20px' }} onSubmit={this.handleSort}>
                        <select className="form-control form-select" defaultValue="">
                            <option value="" disabled>Select sort field</option>
                            <option value="doB">Date of birth(asc)</option>
                            <option value="-doB">Date of birth(desc)</option>
                        </select>
                        <Button className="btn-form" color='primary' type='submit'>Sort</Button>
                    </Form>
                </div>
                <div className="container">
                    <div className="row mb-3">
                        <Staffs staffs={this.state.staffs} />
                    </div>
                </div>
                <ModalAddStaff
                    isModalOpen={this.state.isModalOpen}
                    toggleModal={this.toggleModal}
                    handleSubmit={this.handleSubmit}
                    departments={this.props.departments}
                />

            </React.Fragment>
        );
    }
}

export default StaffList;