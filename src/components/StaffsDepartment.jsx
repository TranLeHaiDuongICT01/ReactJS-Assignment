import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardText, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { fetchStaffsOfDepartment } from '../redux/action/staffs';
import { Fade } from 'react-animation-components';
import Loading from './Loading';

const Staffs = ({ staffs }) => {
    return (
        <>
            {staffs?.map(staff => (
                <div key={staff.id} className='col-6 col-md-4 col-lg-2 mt-3'>
                    <Fade in>
                        <Card className='hover-effect'>
                            <Link to={`/staffs/${staff.id}`} className='text'>
                                <CardImg src={staff.image} alt={staff.name} />
                                <CardText className='p-1 text'>{staff.name}</CardText>
                            </Link>
                        </Card>
                    </Fade>
                </div>
            ))}
        </>
    )
}
const StaffsDepartment = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchStaffsOfDepartment(id));
    }, [dispatch, id]);
    const { staffsOfDepartment: staffs, isLoading, errMess } = useSelector(state => state.staffs);
    if (isLoading) return <Loading />;
    if (errMess) return <h4 className="text-danger">{errMess}</h4>;
    if (!staffs || staffs.length === 0) {
        return <h3 style={{ textAlign: 'center' }}>Staffs Not Found</h3>;
    }
    return (
        <div className="container">
            <div className="row mb-3">
                <Staffs staffs={staffs} />
            </div>
        </div>
    )
}

export default StaffsDepartment;