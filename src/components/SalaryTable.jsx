import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem, Card, CardText, CardTitle, Button, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
const calculateSalary = (salaryScale, overTime) => {
    return Number(salaryScale * 3000000 + overTime * 200000).toFixed(0);
}

const Salaries = ({ staffs }) => {
    return (
        staffs.map(staff => (
            <div key={staff.id} className="col-12 col-md-6 col-lg-4 p-2">
                <Card className='p-2'>
                    <CardTitle>{staff.name}</CardTitle>
                    <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                    <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
                    <CardBody className='salary'>{calculateSalary(staff.salaryScale, staff.overTime)}</CardBody>
                </Card>
            </div>
        ))
    )
}
class SalaryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffs: this.props.staffs.map(staff => {
                staff.salary = Number(calculateSalary(staff.salaryScale, staff.overTime))
                return staff;
            })
        };

        this.handleSort = this.handleSort.bind(this);
    }
    handleSort(e) {
        e.preventDefault();
        let sort = e.target.querySelector('select').value;
        let asc = true;
        if (sort[0] === '-') {
            sort = sort.slice(1);
            asc = false;
        }
        this.setState({
            ...this.state,
            staffs: [...this.state.staffs].sort((a, b) => asc ? a[`${sort}`] - b[`${sort}`] : b[`${sort}`] - a[`${sort}`])
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <form className="row p-3" onSubmit={this.handleSort}>
                    <select className="col-9 mr-2 select-sort" defaultValue="">
                        <option value="" disabled>Select sort field</option>
                        <option value="salary">Salary(asc)</option>
                        <option value="-salary">Salary(desc)</option>
                        <option value="id">Staff ID(asc)</option>
                        <option value="-id">Staff ID(desc)</option>
                    </select>
                    <Button color='primary' type='submit'>Sort</Button>
                </form>
                <div className="row mt-3 pl-2">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/staffs'>Nhân Viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row">
                    <Salaries staffs={this.state.staffs} />
                </div>
            </div>
        )

    }
}
export default SalaryTable