import React from 'react'
import { Card, CardText, CardTitle } from 'reactstrap'
import Loading from './Loading'

const List = ({ departments }) => {
    return (
        departments.map(department => (
            <div key={department.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <Card className='p-3'>
                    <CardTitle>{department.name}</CardTitle>
                    <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
                </Card>
            </div>
        ))
    )
}
const Departments = ({ departments, isLoading, errMess }) => {
    if (isLoading) return <Loading />;
    if (errMess) return <h4 className="text-danger">{errMess}</h4>;
    return (
        <div className='container'>
            <div className="row pt-4">
                <List departments={departments} />
            </div>
        </div>
    )
}

export default Departments