import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardImg, Input, Button, Form } from 'reactstrap';
import ModalAddStaff from "./ModalAddStaff";
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
            formData: {
                name: '',
                doB: '',
                salaryScale: '',
                startDate: '',
                department: 'Sale',
                annualLeave: '',
                overTime: ''
            },
            touched: {
                name: false,
                doB: false,
                salaryScale: false,
                startDate: false,
                annualLeave: false,
                overTime: false
            }
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            touched: {
                name: true,
                doB: true,
                salaryScale: true,
                startDate: true,
                annualLeave: true,
                overTime: true
            }
        });
        const errors = this.validate(this.state.formData.name, this.state.formData.doB,
            this.state.formData.startDate, this.state.formData.salaryScale,
            this.state.formData.annualLeave, this.state.formData.overTime, true);
        if (errors.name !== '' || errors.doB !== '' || errors.startDate !== '' ||
            errors.salaryScale !== '' || errors.annualLeave !== '' || errors.overTime !== '')
            return;

        const department = this.props.departments.find(de => de.name === this.state.formData.department);
        const staffs = this.props.staffs;
        const newStaff = {
            id: staffs.length,
            name: this.state.formData?.name,
            doB: new Date(this.state.formData?.doB),
            salaryScale: Number(this.state.formData.salaryScale),
            startDate: this.state.formData.startDate,
            department: department || 'Sale',
            annualLeave: Number(this.state.formData.annualLeave),
            overTime: Number(this.state.formData.overTime),
            image: '/assets/images/alberto.png',
        }
        staffs.push(newStaff);
        localStorage.setItem('staffs', JSON.stringify(staffs));
        this.toggleModal();
    }
    handleChange(e) {
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value
            }
        })
    }
    handleBlur(e) {
        this.setState({
            ...this.state,
            touched: {
                ...this.state.touched,
                [e.target.name]: true
            }
        })
    }
    validate(name, doB, startDate, salaryScale, annualLeave, overTime, submit = false) {
        const errors = {
            name: '',
            doB: '',
            startDate: '',
            salaryScale: '',
            annualLeave: '',
            overTime: ''
        }
        if (this.state.touched.name || submit) {
            if (name.length === 0) errors.name = 'Yêu cầu nhập';
            else if (name.length < 3) errors.name = 'Yêu cầu nhiều hơn 2 ký tự';
            else if (name.length > 30) errors.name = 'Yêu cầu ít hơn 30 ký tự';
        }
        if ((this.state.touched.doB || submit) && doB.length === 0)
            errors.doB = 'Yêu cầu nhập';
        if ((this.state.touched.startDate || submit) && startDate.length === 0)
            errors.startDate = 'Yêu cầu nhập';
        if (this.state.touched.salaryScale || submit) {
            if (salaryScale.length === 0)
                errors.salaryScale = 'Yêu cầu nhập';
            else if (Number(salaryScale) < 0)
                errors.salaryScale = 'Cần lớn hơn hoặc bằng 0';
        }

        if (this.state.touched.annualLeave || submit) {
            if (annualLeave.length === 0)
                errors.annualLeave = 'Yêu cầu nhập';
            else if (Number(annualLeave) < 0)
                errors.annualLeave = 'Cần lớn hơn hoặc bằng 0';
        }
        if (this.state.touched.overTime || submit) {
            if (overTime.length === 0)
                errors.overTime = 'Yêu cầu nhập';
            else if (Number(overTime) < 0)
                errors.overTime = 'Cần lớn hơn hoặc bằng 0';
        }
        return errors;
    }
    render() {
        const errors = this.validate(this.state.formData.name, this.state.formData.doB,
            this.state.formData.startDate, this.state.formData.salaryScale,
            this.state.formData.annualLeave, this.state.formData.overTime);
        return (
            <React.Fragment>
                <div className="row m-auto container p-0">
                    <div className="col-12 col-lg-4 mt-4" style={{ display: 'flex', gap: '20px' }}>
                        <h3 style={{ width: '100%' }}>Nhân Viên</h3>
                        <Button className="btn-form" onClick={this.toggleModal}>Add</Button>
                    </div>
                    <Form className="col-12 col-lg-4 mt-4" style={{ display: 'flex', gap: '20px' }} onSubmit={this.handleSearch}>
                        <Input type='text' placeholder='Search by name' />
                        <Button className="btn-form" type="submit" color='primary'>Search</Button>
                    </Form>
                    <Form className="col-12 col-lg-4 mt-4" style={{ display: 'flex', gap: '20px' }} onSubmit={this.handleSort}>
                        <select className="form-select" defaultValue="">
                            <option value="" disabled>Select sort field</option>
                            <option value="doB">Date of birth(asc)</option>
                            <option value="-doB">Date of birth(desc)</option>
                        </select>
                        <Button className="btn-form" color='primary' type='submit'>Sort</Button>
                    </Form>
                </div>
                <div className="container">
                    <div className="row mb-3">
                        <Staffs staffs={this.props.staffs} />
                    </div>
                </div>
                <ModalAddStaff
                    isModalOpen={this.state.isModalOpen}
                    toggleModal={this.toggleModal}
                    handleSubmit={this.handleSubmit}
                    formData={this.state.formData}
                    errors={errors}
                    departments={this.props.departments}
                    handleChange={this.handleChange}
                    handleBlur={this.handleBlur}
                />
            </React.Fragment>
        );
    }
}

export default StaffList;