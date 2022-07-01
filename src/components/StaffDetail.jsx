import React, { useState } from 'react';
import dateFormat from 'dateformat';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardTitle, CardText, Breadcrumb, BreadcrumbItem, CardImg, Button } from 'reactstrap';
import Loading from './Loading';
import { FadeTransform } from 'react-animation-components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStaff, patchStaff } from '../redux/action/staffs';
import { removeStaffFromDepartment, transferStaffDepartment } from '../redux/action/departments';
import ModalAddStaff from './ModalAddStaff';
const StaffDetail = ({ staff, isLoading, errMess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { departments, isLoading: isDepartmentsLoading, errMess: departmentErrMess } = useSelector(state => state.departments);
  if (isLoading || isDepartmentsLoading) return <Loading />;
  if (errMess || departmentErrMess) return <h4 className="text-danger">{errMess || departmentErrMess}</h4>;
  if (!staff) {
    return <h3 style={{ textAlign: 'center' }}>Staff Not Found</h3>;
  }
  const initialState = {
    ...staff,
    doB: new Date(staff.doB).toISOString().split('T')[0],
    startDate: new Date(staff.startDate).toISOString().split('T')[0],
    department: departments.find(de => de.id === staff.departmentId).name,
    salaryScale: Number(staff.salaryScale)
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }
  const handleSubmit = (values) => {
    const prevDepartment = staff.departmentId;
    const currentDepartment = departments.find(de => de.name === values.department).id;
    dispatch(patchStaff({
      ...values,
      departmentId: currentDepartment
    }));
    if (prevDepartment !== currentDepartment)
      dispatch(transferStaffDepartment(prevDepartment, currentDepartment));
  }
  const handleDelete = () => {
    dispatch(deleteStaff(staff.id));
    dispatch(removeStaffFromDepartment(staff.departmentId));
    navigate('/staffs');
  }
  return (
    <div>
      <FadeTransform in transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%) translateX(-50%)'
      }}>
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
              <CardText>Phòng ban: {departments.find(de => de.id === staff.departmentId).name}</CardText>
              <CardText>Số ngày nghỉ còn lại: {staff?.annualLeave}</CardText>
              <CardText>Số ngày đã làm thêm: {staff?.overTime}</CardText>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12" style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              gap: '15px'
            }}>
              <Button color='danger' onClick={handleDelete}>DELETE</Button>
              <Button color='primary' onClick={toggleModal}>EDIT</Button>
            </div>
          </div>
        </Card>
        <ModalAddStaff
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          handleSubmit={handleSubmit}
          departments={departments}
          initialState={initialState}
          edit
        />
      </FadeTransform>
    </div>
  )
}

export default StaffDetail