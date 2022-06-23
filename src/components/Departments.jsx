import React from 'react'
import { Card, CardSubtitle, CardText, CardTitle } from 'reactstrap'

const Departments = ({ departments }) => {
    return (
        <div className='container'>
            <div className="row pt-4">
                {departments.map(department => (
                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                        <Card className='p-3'>
                            <CardTitle>{department.name}</CardTitle>
                            <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Departments