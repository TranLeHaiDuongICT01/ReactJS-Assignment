import React from 'react'
import { Input, Button, Modal, ModalHeader, ModalBody, Form, Label, Col, FormGroup, FormFeedback } from 'reactstrap';
const ModalAddStaff = ({isModalOpen, toggleModal, handleSubmit, formData, errors, departments, handleChange, handleBlur}) => {
    return (
        <Modal isOpen={isModalOpen} toggle={toggleModal} unmountOnClose={false}>
            <ModalHeader toggle={toggleModal}>Thêm Nhân Viên</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit} className='form'>
                    <FormGroup>
                        <Label htmlFor="name" md={5}>Tên</Label>
                        <Col md={7}>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                valid={errors.name === ''}
                                invalid={errors.name !== ''}
                                onBlur={handleBlur}
                            />
                            <FormFeedback>{errors.name}</FormFeedback>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="doB" md={5}>Ngày sinh</Label>
                        <Col md={7}>
                            <Input
                                type="date"
                                id="doB"
                                name="doB"
                                value={formData.doB}
                                onChange={handleChange}
                                valid={errors.doB === ''}
                                invalid={errors.doB !== ''}
                                onBlur={handleBlur}
                            />
                            <FormFeedback>{errors.doB}</FormFeedback>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="startDate" md={5}>Ngày vào công ty</Label>
                        <Col md={7}>
                            <Input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                valid={errors.startDate === ''}
                                invalid={errors.startDate !== ''}
                                onBlur={handleBlur}
                            />
                            <FormFeedback>{errors.startDate}</FormFeedback>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="department" md={5}>Phòng ban</Label>
                        <Col md={7}>
                            <select
                                className="form-select"
                                id="department"
                                name="department"
                                defaultValue={formData.department}
                            >
                                {departments?.map(department => (
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
                                value={formData.salaryScale}
                                onChange={handleChange}
                                valid={errors.salaryScale === ''}
                                invalid={errors.salaryScale !== ''}
                                onBlur={handleBlur}
                            />
                            <FormFeedback>{errors.salaryScale}</FormFeedback>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="annualLeave" md={5}>Số ngày nghỉ còn lại</Label>
                        <Col md={7}>
                            <Input
                                type="number"
                                id="annualLeave"
                                name="annualLeave"
                                value={formData.annualLeave}
                                onChange={handleChange}
                                valid={errors.annualLeave === ''}
                                invalid={errors.annualLeave !== ''}
                                onBlur={handleBlur}
                            />
                            <FormFeedback>{errors.annualLeave}</FormFeedback>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="overTime" md={5}>Số ngày đã làm thêm</Label>
                        <Col md={7}>
                            <Input
                                type="number"
                                id="overTime"
                                name="overTime"
                                value={formData.overTime}
                                onChange={handleChange}
                                valid={errors.overTime === ''}
                                invalid={errors.overTime !== ''}
                                onBlur={handleBlur}
                            />
                            <FormFeedback>{errors.overTime}</FormFeedback>
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
    )
}

export default ModalAddStaff