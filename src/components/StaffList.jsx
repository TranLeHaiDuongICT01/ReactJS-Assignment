import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardImg, Input, Button, Form } from 'reactstrap';
import ModalAddStaff from "./ModalAddStaff";
import { actions } from "react-redux-form";
import { useSelector } from 'react-redux';
import Loading from './Loading';
const Staffs = ({ staffs, isLoading, errMess }) => {
    if (isLoading) return <Loading />;
    if (errMess) return <h4 className="text-danger">{errMess}</h4>;
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
const StaffList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [staffs, setStaffs] = useState();
    const { staffs: staffList, isLoading, errMess } = useSelector(state => state.staffs);
    useEffect(() => {
        if (!isLoading) setStaffs(staffList);
    }, [isLoading, staffList])
    const { departments } = useSelector(state => state.departments)
    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.querySelector('input').value;
        setStaffs([...staffList].filter(staff => staff.name.toLowerCase().includes(search.toLowerCase())))
    }
    const handleSort = (e) => {
        e.preventDefault();
        const sort = e.target.querySelector('select').value;
        if (sort === 'doB' || sort === '-doB')
            setStaffs(
                [...staffs].sort((a, b) => sort === 'doB' ?
                    new Date(a.doB).getTime() - new Date(b.doB).getTime() :
                    new Date(b.doB).getTime() - new Date(a.doB).getTime()
                )
            );
    }
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }
    const handleSubmit = (values, dispatcher) => {
        const index = departments.findIndex(de => de.name === values.department);
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
        dispatcher(actions.reset('staff', {
            name: '',
            doB: '',
            salaryScale: '',
            startDate: '',
            department: 'Sale',
            annualLeave: '',
            overTime: ''
        }));
        setIsModalOpen(false);
    }
    return (
        <React.Fragment>
            <div className="row m-auto container p-0">
                <div className="col-12 col-lg-4 mt-4" style={{ display: 'flex', gap: '20px' }}>
                    <h3 className="staff-list-title">Nhân Viên</h3>
                    <Button className="btn-form" onClick={toggleModal}>Add</Button>
                </div>
                <Form className="col-12 col-lg-4 mt-4" style={{ display: 'flex', gap: '20px' }} onSubmit={handleSearch}>
                    <Input type='text' placeholder='Search by name' />
                    <Button className="btn-form" type="submit" color='primary'>Search</Button>
                </Form>
                <Form className="col-12 col-lg-4 mt-4" style={{ display: 'flex', gap: '20px' }} onSubmit={handleSort}>
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
                    <Staffs staffs={staffs} isLoading={isLoading} errMess={errMess} />
                </div>
            </div>
            <ModalAddStaff
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                handleSubmit={handleSubmit}
                departments={departments}
            />

        </React.Fragment>
    );
}

export default StaffList;