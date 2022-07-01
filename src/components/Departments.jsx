import React from 'react';
import { Card, CardText, CardTitle } from 'reactstrap';
import Loading from './Loading';
import { Fade, Stagger } from 'react-animation-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Departments = () => {
    const navigate = useNavigate();
    const { departments, isLoading, errMess } = useSelector(state => state.departments);
    if (isLoading) return <Loading />;
    if (errMess) return <h4 className="text-danger">{errMess}</h4>;
    const handleClick = (id) => {
        navigate(`/departments/${id}`);
    }
    return (
        <div className='container'>
            <Stagger delay={50} in className="row pt-4">
                {
                    departments.map(department => (
                        <Fade key={department.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className='department' onClick={() => handleClick(department.id)}>
                                <Card className='p-3'>
                                    <CardTitle>{department.name}</CardTitle>
                                    <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
                                </Card>
                            </div>
                        </Fade>
                    ))
                }
            </Stagger>
        </div>
    )
}

export default Departments