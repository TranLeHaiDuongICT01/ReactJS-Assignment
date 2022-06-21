import React, { Component } from "react";
import { Card, CardText, CardTitle } from 'reactstrap'
import dateFormat from 'dateformat'
class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffInfo: null,
            colNum: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetColNum = this.resetColNum.bind(this);
    }
    onStaffSelect(staff) {
        this.setState({
            ...this.state,
            staffInfo: staff
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const selectValue = e.target.querySelector('select').value;
        if (selectValue !== 'select') {
            this.setState({
                ...this.state,
                colNum: selectValue
            })
        }
    }
    resetColNum() {
        this.setState({
            ...this.state,
            colNum: null
        })
    }
    // componentDidUpdate() {
    //     console.log(12 / this.state.colNum);
    // }

    renderStaffDetail() {
        if (this.state.staffInfo) {
            const staff = this.state.staffInfo;

            return (
                <Card className='p-2'>
                    <CardTitle>Họ và tên: {staff.name}</CardTitle>
                    <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                    <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                    <CardText>Phòng ban: {staff.department.name}</CardText>
                    <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                    <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                </Card>
            );
        }
        return <div></div>;
    }
    render() {
        const list = this.props.staffs.map(staff => (
            <div key={staff.id} className={this.state.colNum ? `col-${12 / this.state.colNum} mt-3` : 'col-12 col-md-6 col-lg-4 mt-3'}>
                <Card onClick={() => this.onStaffSelect(staff)} className='hover-effect'>
                    <CardText className='p-1'>{staff.name}</CardText>
                </Card>
            </div>
        ));
        return (
            <div className="container">
                <form className="choose-container" onSubmit={this.handleSubmit}>
                    <select className="form-select form-select-lg p-1">
                        <option value="select">Select number of columns in one row</option>
                        <option value="2">Two Columns</option>
                        <option value="3">Three Columns</option>
                        <option value="6">Six Columns</option>
                    </select>
                    <button type="submit" className="btn btn-primary">Click to show</button>
                    <button type="button" className="btn btn-warning" onClick={this.resetColNum}>Reset to default</button>
                </form>
                <div className="row">
                    {list}
                </div>
                <div className="row mb-3">
                    <div className={this.state.colNum ? `col-${12 / this.state.colNum} mt-3` : 'col-12 col-md-6 col-lg-4 mt-3'}>
                        {
                            this.state.staffInfo ? this.renderStaffDetail() :
                                <CardText>Bấm vào tên nhân viên để xem thông tin</CardText>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default StaffList;