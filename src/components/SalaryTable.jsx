import React from 'react'
import { Breadcrumb, BreadcrumbItem, Card, CardText, CardTitle, CardBlock } from 'reactstrap';
import { Link } from 'react-router-dom';
const SalaryTable = ({ staffs }) => {
    const calculateSalary = (salaryScale, overTime) => {
        return Number(salaryScale * 3000000 + overTime * 200000).toFixed(0);
    }
    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/staffs'>Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                {staffs.map(staff => (
                    <div key={staff.id} className="col-12 col-md-6 col-lg-4 p-2">
                        <Card className='p-2'>
                            <CardTitle>{staff.name}</CardTitle>
                            <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                            <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
                            <CardBlock className='salary'>{calculateSalary(staff.salaryScale, staff.overTime)}</CardBlock>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SalaryTable