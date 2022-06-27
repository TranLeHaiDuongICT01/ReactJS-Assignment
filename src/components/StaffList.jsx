import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardImg, Input, Button, Modal, ModalHeader, ModalBody, Form, Label, Col, FormGroup } from 'reactstrap';
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
                overTime: '',
                salary: ''
            }
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        const department = this.props.departments.find(de => de.name === this.state.formData.department);
        const staffs = this.props.staffs;
        const newStaff = {
            id: staffs.length,
            name: this.state.formData?.name,
            doB: new Date(this.state.formData?.doB),
            salaryScale: this.state.formData.salaryScale,
            startDate: this.state.formData.startDate,
            department: department || null,
            annualLeave: this.state.formData.annualLeave,
            overTime: this.state.formData.overTime,
            salary: this.state.formData,
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
    render() {
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
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} unmountOnClose={false}>
                    <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit} className='form'>
                            <FormGroup>
                                <Label htmlFor="name" md={5}>Tên</Label>
                                <Col md={7}>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={this.state.formData.name}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                                <Col md={7}>
                                    <Input
                                        type="date"
                                        id="doB"
                                        name="doB"
                                        value={this.state.formData.doB}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                                <Col md={7}>
                                    <Input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={this.state.formData.startDate}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="department" md={5}>Phòng ban</Label>
                                <Col md={7}>
                                    <select
                                        className="form-select"
                                        id="department"
                                        name="department"
                                        defaultValue={this.state.formData.department}
                                    >
                                        {this?.props?.departments?.map(department => (
                                            <option key={department.id} value={department.name}>{department.name}</option>
                                        ))}
                                    </select>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="salaryScale" md={5}>Hệ số lương</Label>
                                <Col md={7}>
                                    <Input
                                        type="number"
                                        id="salaryScale"
                                        name="salaryScale"
                                        value={this.state.formData.salaryScale}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                                <Col md={7}>
                                    <Input
                                        type="number"
                                        id="annualLeave"
                                        name="annualLeave"
                                        value={this.state.formData.annualLeave}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                                <Col md={7}>
                                    <Input
                                        type="number"
                                        id="overTime"
                                        name="overTime"
                                        value={this.state.formData.overTime}
                                        onChange={this.handleChange}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col>
                                    <Button type='submit' color='primary'>Thêm</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default StaffList;