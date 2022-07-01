import React, { useEffect, useState } from 'react'
import { Breadcrumb, BreadcrumbItem, Card, CardText, CardTitle, Form, Button, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { useSelector } from 'react-redux';
import { Fade } from 'react-animation-components';
const calculateSalary = (salaryScale, overTime) => {
    return Number(salaryScale * 3000000 + overTime * 200000).toFixed(0);
}

const Salaries = ({ staffs, isLoading, errMess }) => {
    if (isLoading) return <Loading />;
    if (errMess) return <h4 className="text-danger">{errMess}</h4>;
    return (
        staffs?.map(staff => (
            <div key={staff.id} className="col-12 col-md-6 col-lg-4 p-2">
                <Fade in>
                    <Card className='p-2'>
                        <CardTitle>{staff.name}</CardTitle>
                        <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                        <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
                        <CardBody className='salary'>{calculateSalary(staff.salaryScale, staff.overTime)}</CardBody>
                    </Card>
                </Fade>
            </div>
        ))
    )
}
const SalaryTable = () => {
    const [staffs, setStaffs] = useState();
    const { staffs: staffList, isLoading, errMess } = useSelector(state => state.staffs);
    useEffect(() => {
        if (!isLoading) setStaffs(staffList);
    }, [isLoading, staffList])

    const handleSort = (e) => {
        e.preventDefault();
        let sort = e.target.querySelector('select').value;
        let asc = true;
        if (sort[0] === '-') {
            sort = sort.slice(1);
            asc = false;
        }
        setStaffs([...staffs].sort((a, b) => asc ? a[`${sort}`] - b[`${sort}`] : b[`${sort}`] - a[`${sort}`]))
    }
    return (
        <div className="container-fluid">
            <Form className="p-3" style={{ display: 'flex', flexDirection: 'row', gap: '20px' }} onSubmit={handleSort}>
                <select className="form-control form-select" defaultValue="">
                    <option value="" disabled>Select sort field</option>
                    <option value="salary">Salary(asc)</option>
                    <option value="-salary">Salary(desc)</option>
                    <option value="id">Staff ID(asc)</option>
                    <option value="-id">Staff ID(desc)</option>
                </select>
                <Button color='primary' type='submit'>Sort</Button>
            </Form>
            <div className="row mt-3 pl-2">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/staffs'>Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                <Salaries staffs={staffs} isLoading={isLoading} errMess={errMess} />
            </div>
        </div>
    )

}
export default SalaryTable