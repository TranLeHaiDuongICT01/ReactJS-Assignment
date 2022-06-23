import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardImg, Input, Button } from 'reactstrap';
class StaffList extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }
    handleSearch(e) {
        e.preventDefault();
        this.props.handleSearch(e.target.querySelector('input').value);
    }
    handleSort(e) {
        e.preventDefault();
        this.props.handleSort(e.target.querySelector('select').value);
    }
    render() {
        const list = this.props.staffs.map(staff => (
            <div key={staff.id} className='col-6 col-md-4 col-lg-2 mt-3'>
                <Card className='hover-effect'>
                    <Link to={`/staffs/${staff.id}`} className='text'>
                        <CardImg src={staff.image} alt={staff.name} />
                        <CardText className='p-1 text'>{staff.name}</CardText>
                    </Link>
                </Card>
            </div>
        ));
        return (
            <div className="container">
                <form className="row mt-3 p-3" onSubmit={this.handleSearch}>
                    <Input type='text' className='col-9 mr-2' placeholder='Search by name' />
                    <Button color='primary' type='submit'>Search</Button>
                </form>
                <form className="row p-3" onSubmit={this.handleSort}>
                    <select className="col-9 mr-2 select-sort" defaultValue="">
                        <option value="" disabled>Select sort field</option>
                        <option value="doB">Date of birth(asc)</option>
                        <option value="-doB">Date of birth(desc)</option>
                    </select>
                    <Button color='primary' type='submit'>Sort</Button>
                </form>
                <div className="row mb-3">
                    {list}
                </div>
            </div>
        );
    }
}

export default StaffList;