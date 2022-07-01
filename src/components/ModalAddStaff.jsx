import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, Row, Label, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from "react-redux-form";
const { text: Text, select: Select } = Control;

const required = (val) => val && String(val).length;
const maxLength = (len) => (val) => !val || val.length < len;
const minLength = (len) => (val) => val && val.length > len;
const notNegative = (val) => Number(val) >= 0;
let dispatcher;
const ModalAddStaff = ({ isModalOpen, toggleModal, handleSubmit, departments, initialState, edit }) => {

    const attachDispatch = (dispatch) => {
        dispatcher = dispatch;
    }
    return (
        <Modal isOpen={isModalOpen} toggle={toggleModal} unmountOnClose={false}>
            <ModalHeader toggle={toggleModal}>Thêm Nhân Viên</ModalHeader>
            <ModalBody>
                <LocalForm model='staff' onSubmit={(values) => handleSubmit(values, dispatcher)} className='form' initialState={initialState}
                    getDispatch={(dispatch) => {
                        attachDispatch(dispatch);
                    }}>
                    <Row className="form-group">
                        <Label htmlFor="name" md={5}>Tên</Label>
                        <Col md={7}>
                            <Text
                                className="form-control"
                                model=".name"
                                id="name"
                                name="name"
                                validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(30)
                                }}
                            />
                            <Errors
                                model='.name'
                                show='touched'
                                messages={{
                                    required: 'Yêu cầu nhập',
                                    minLength: 'Yêu cầu nhiều hơn 2 ký tự',
                                    maxLength: 'Yêu cầu ít hơn 30 ký tự'
                                }}
                                component={(props) => <p className="error text-danger">{props.children}</p>}
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
                                validators={{ required }}
                            />
                            <Errors
                                component={(props) => <p className="error text-danger">{props.children}</p>}
                                className='text-danger'
                                model='.doB'
                                show='touched'
                                messages={{
                                    required: 'Yêu cầu nhập'
                                }}
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
                                validators={{ required }}
                            />
                            <Errors
                                component={(props) => <p className="error text-danger">{props.children}</p>}
                                className='text-danger'
                                model='.startDate'
                                show='touched'
                                messages={{
                                    required: 'Yêu cầu nhập'
                                }}
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
                            >
                                {departments?.map(department => (
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
                                validators={{
                                    required, notNegative
                                }}
                            />
                            <Errors
                                component={(props) => <p className="error text-danger">{props.children}</p>}
                                className='text-danger'
                                model='.salaryScale'
                                show='touched'
                                messages={{
                                    required: 'Yêu cầu nhập',
                                    notNegative: 'Yêu cầu lớn hơn hoặc bằng 0'
                                }}
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
                                validators={{
                                    required, notNegative
                                }}
                            />
                            <Errors
                                component={(props) => <p className="error text-danger">{props.children}</p>}
                                className='text-danger'
                                model='.annualLeave'
                                show='touched'
                                messages={{
                                    required: 'Yêu cầu nhập',
                                    notNegative: 'Yêu cầu lớn hơn hoặc bằng 0'
                                }}
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
                                validators={{
                                    required, notNegative
                                }}
                            />
                            <Errors
                                component={(props) => <p className="error text-danger">{props.children}</p>}
                                className='text-danger'
                                model='.overTime'
                                show='touched'
                                messages={{
                                    required: 'Yêu cầu nhập',
                                    notNegative: 'Yêu cầu lớn hơn hoặc bằng 0'
                                }}
                            />
                        </Col>
                    </Row>

                    <Row className='form-group mt-3 m-auto'>
                        <Col>
                            <Button type='submit' color='primary'>{
                                edit ? 'Sửa' : 'Thêm'
                            }</Button>
                        </Col>
                    </Row>
                </LocalForm>
            </ModalBody>
        </Modal>
    )
}

export default ModalAddStaff