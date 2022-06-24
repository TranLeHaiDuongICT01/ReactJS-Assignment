import React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
const StaffDetail = ({ staff }) => {

  return (
    <div>
      <Card className='p-3'>
        <div className="row ml-0">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/staffs'>Nhân Viên</Link></BreadcrumbItem>
            <BreadcrumbItem active>{staff.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <CardTitle>Họ và tên: {staff.name}</CardTitle>
        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
        <CardText>Phòng ban: {staff.department.name}</CardText>
        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
      </Card>
    </div>
  )
}

export default StaffDetail