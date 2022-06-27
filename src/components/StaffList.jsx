import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardImg, Input, Button, Modal, ModalHeader, ModalBody, Form, Row, Label, Col } from 'reactstrap';
import { Control, LocalForm } from "react-redux-form";
const { text: Text, select: Select } = Control;
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
            isModalOpen: false
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
    handleSubmit(values) {
        const department = this.props.departments.find(de => de.name === values.department);
        const staffs = this.props.staffs;
        const newStaff = {
            id: staffs.length,
            name: values?.name,
            doB: new Date(values?.doB),
            salaryScale: values.salaryScale,
            startDate: values.startDate,
            department: department || null,
            annualLeave: values.annualLeave,
            overTime: values.overTime,
            salary: values,
            image: '/assets/images/alberto.png',
        }
        staffs.push(newStaff);
        localStorage.setItem('staffs', JSON.stringify(staffs));
        this.toggleModal();
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
                        <select className="form-control" defaultValue="">
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
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} className='form'>
                            <Row className="form-group">
                                <Label htmlFor="name" md={5}>Tên</Label>
                                <Col md={7}>
                                    <Text
                                        className="form-control"
                                        model=".name"
                                        id="name"
                                        name="name"
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                                <Col md={7}>
                                    <Text
                                        type="date"
                                        className="form-control"
                                        model=".doB"
                                        id="doB"
                                        name="doB"
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                                <Col md={7}>
                                    <Text
                                        type="date"
                                        className="form-control"
                                        model=".startDate"
                                        id="startDate"
                                        name="startDate"
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="department" md={5}>Phòng ban</Label>
                                <Col md={7}>
                                    <Select
                                        className="form-control form-select"
                                        model=".department"
                                        id="department"
                                        name="department"
                                        defaultValue="Sale"
                                    >
                                        {this?.props?.departments?.map(department => (
                                            <option key={department.id} value={department.name}>{department.name}</option>
                                        ))}
                                    </Select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={5}>Hệ số lương</Label>
                                <Col md={7}>
                                    <Text
                                        type="number"
                                        className="form-control"
                                        model=".salaryScale"
                                        id="salaryScale"
                                        name="salaryScale"
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                                <Col md={7}>
                                    <Text
                                        type="number"
                                        className="form-control"
                                        model=".annualLeave"
                                        id="annualLeave"
                                        name="annualLeave"
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                                <Col md={7}>
                                    <Text
                                        type="number"
                                        className="form-control"
                                        model=".overTime"
                                        id="overTime"
                                        name="overTime"
                                    />
                                </Col>
                            </Row>

                            <Row className='form-group mt-3 m-auto'>
                                <Col>
                                    <Button type='submit' color='primary'>Thêm</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default StaffList;