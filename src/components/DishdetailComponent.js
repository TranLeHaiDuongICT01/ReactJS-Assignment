import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from "react-router-dom";
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function RenderDish({ dish }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({ comments }) {
    return (
        <div className="col-12 col-md-6 m-1">
            <div>
                <h4>Comments</h4>
                {
                    comments.map(comment => {
                        const date = new Date(comment.date)
                        return (
                            <div key={comment.id}>
                                <CardText style={{
                                    margin: '15px 0px'
                                }}>{comment.comment}</CardText>
                                <CardText style={{
                                    margin: '15px 0px'
                                }}>-- {comment.author}, {months[date.getMonth()]} {date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`}, {date.getFullYear()}</CardText>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
const DishDetail = (props) => {
    if (!props.dish) return <div></div>;
    return (
        <div className="container">
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.dish.name}</h3>
                </div>
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} />
            </div>
        </div>
    );
}

export default DishDetail