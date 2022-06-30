import React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, Breadcrumb, BreadcrumbItem, CardImg } from 'reactstrap';
import Loading from './Loading';
const StaffDetail = ({ staff, isLoading, errMess }) => {
  if (isLoading) return <Loading />;
  if (errMess) return <h4 className="text-danger">{errMess}</h4>;
  if (!staff) {
    return <h3 style={{ textAlign: 'center' }}>Staff Not Found</h3>;
  }
  return (
    <div>
      <Card className='p-3'>
        <div className="row ml-0">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/staffs'>Nhân Viên</Link></BreadcrumbItem>
            <BreadcrumbItem active>{staff?.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">
          <div className="col-5 col-md-3 col-lg-2">
            <CardImg src={staff?.image} />
          </div>
          <div className="col-7">
            <CardTitle>Họ và tên: {staff?.name}</CardTitle>
            <CardText>Ngày sinh: {dateFormat(staff?.doB, "dd/mm/yyyy")}</CardText>
            <CardText>Ngày vào công ty: {dateFormat(staff?.startDate, "dd/mm/yyyy")}</CardText>
            <CardText>Phòng ban: {staff?.department?.name}</CardText>
            <CardText>Số ngày nghỉ còn lại: {staff?.annualLeave}</CardText>
            <CardText>Số ngày đã làm thêm: {staff?.overTime}</CardText>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default StaffDetail