import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label } from 'reactstrap';
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";
import Loading from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const { text: Text, textarea: Textarea, select: Select } = Control;
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
function RenderDish({ dish }) {

    return (
        <div className="col-12 col-md-5 m-1">
            <FadeTransform in transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                    <CardImg width="100%" src={`${baseUrl}/${dish.image}`} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    )
}

function RenderComments({ comments, toggle, isModalOpen, handleSubmit, errMess }) {
    if (errMess) return <h4 className="text-danger">{errMess}</h4>;
    return (
        <div className="col-12 col-md-6 m-1">
            <div className="mb-3">
                <h4>Comments</h4>
                <Stagger in>
                    {
                        comments.map(comment => {
                            const date = new Date(comment.date)
                            return (
                                <Fade in key={comment.id}>
                                    <div>
                                        <CardText style={{
                                            margin: '15px 0px'
                                        }}>{comment.comment}</CardText>
                                        <CardText style={{
                                            margin: '15px 0px'
                                        }}>-- {comment.author}, {months[date.getMonth()]} {date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}, {date.getFullYear()}</CardText>
                                    </div>
                                </Fade>
                            )
                        })
                    }
                    </Stagger>
                    <Button onClick={toggle}>Submit Comment</Button>
                <Modal isOpen={isModalOpen} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => handleSubmit(values)} className="p-2 form">
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Select
                                    model=".rating"
                                    className="form-control form-select"
                                    name="rating"
                                    id="rating"
                                    defaultValue="1"
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Select>
                                <Errors
                                    className="text-danger"
                                    model=".rating"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        isNumber: 'Must be a number',
                                        ratingRange: 'Rating must be between 0 and 5'
                                    }}
                                />
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Text
                                    model=".author"
                                    className="form-control"
                                    name="author"
                                    id="author"
                                    placeholder="Your Name"
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be less or equal to 15 characters'
                                    }}
                                />
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Textarea
                                    model=".comment"
                                    className="form-control"
                                    name="comment"
                                    id="comment"
                                />
                            </Row>

                            <Row className="form-group">
                                <Button type="submit" color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}
class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            ...this.state,
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        this.props.postComment(
            this.props.dish.id, values.rating, values.author, values.comment
        );
        this.toggleModal();
    }
    render() {
        if (this.props.isLoading) return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
        if (this.props.errMess) return (
            <div className="container">
                <div className="row">
                    <h4 className="text-danger">{this.props.errMess}</h4>
                </div>
            </div>
        );
        if (!this.props.dish) return <div></div>;
        return (
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{this.props.dish.name}</h3>
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={this.props.dish} />
                    <RenderComments comments={this.props.comments}
                        toggle={this.toggleModal}
                        isModalOpen={this.state.isModalOpen}
                        handleSubmit={this.handleSubmit}
                        errMess={this.props.commentError} />
                </div>
            </div>
        );
    }
}

export default DishDetail