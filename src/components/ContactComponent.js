import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap'
import { Link } from 'react-router-dom'
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            telNum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched: {
                firstname: false,
                lastname: false,
                telNum: false,
                email: false
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
            touched: {
                ...this.state.touched,
                [e.target.name]: true
            }
        });
    }

    handleBlur = (field) => (e) => {
        this.setState({
            ...this.state,
            touched: {
                ...this.state.touched,
                [field]: true
            }
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }
    validate(firstname, lastname, telNum, email) {
        const errors = {
            firstname: '',
            lastname: '',
            telNum: '',
            email: ''
        };
        if (this.state.touched.firstname && firstname.length < 3) {
            errors.firstname = 'First Name should contain more than 3 characters';
        } else if (this.state.touched.firstname && firstname.length > 10) {
            errors.firstname = 'First Name should contain less than 10 characters';
        }
        if (this.state.touched.lastname && lastname.length < 3) {
            errors.lastname = 'Last Name should contain more than 3 characters';
        } else if (this.state.touched.lastname && lastname.length > 10) {
            errors.lastname = 'Last Name should contain less than 10 characters';
        }
        const reg = /^\d+$/;
        if (this.state.touched.telNum && !reg.test(telNum))
            errors.telNum = 'Contact tel should contain only numbers';
        if (this.state.touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain @';

        return errors;
    }
    render() {
        const errors = this.validate(this.state.firstname, this.state.lastname, this.state.telNum, this.state.email);
        return (
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Contact Us</h3>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href="# "><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className='row row-content'>
                    <div className='col-12'>
                        <h3>Send us your feedback</h3>
                    </div>
                    <div className='col-12 col-md-9'>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor='firstname' md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input valid={errors.firstname === ''}
                                        invalid={errors.firstname !== ''}
                                        type='text' name='firstname'
                                        id='firstname' placeholder='First Name'
                                        value={this.state.firstname}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur('firstname')} />
                                    <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor='lastname' md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input valid={errors.lastname === ''}
                                        invalid={errors.lastname !== ''}
                                        type='text' name='lastname'
                                        id='lastname' placeholder='Last Name'
                                        value={this.state.lastname}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur('lastname')} />
                                    <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor='telNum' md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Input valid={errors.telNum === ''}
                                        invalid={errors.telNum !== ''}
                                        type='tel' name='telNum'
                                        id='telNum' placeholder='Contact Tel.'
                                        value={this.state.telNum}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur('telNum')} />
                                    <FormFeedback>{errors.telNum}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor='email' md={2}>Email</Label>
                                <Col md={10}>
                                    <Input valid={errors.email === ''}
                                        invalid={errors.email !== ''}
                                        type='email' name='email'
                                        id='email' placeholder='Email'
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur('email')} />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md={{ size: 6, offset: 2 }}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type='checkbox' name='agree'
                                                checked={this.state.agree}
                                                onChange={this.handleChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Input style={{ width: '100%' }} type='select'
                                        name='contactType'
                                        value={this.state.contactType}
                                        onChange={this.handleChange}>
                                        <option value="Tel.">Tel.</option>
                                        <option value="Email">Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label htmlFor='message' md={2}>Your Message</Label>
                                <Col md={10}>
                                    <Input type='textarea' name='message'
                                        id='message' rows='12'
                                        value={this.state.message}
                                        onChange={this.handleChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type='submit' color='primary'>Send Feedback</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;