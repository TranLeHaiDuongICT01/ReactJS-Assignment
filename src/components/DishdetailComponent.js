import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { COMMENTS } from '../shared/comments'
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
        <div className="row">
            <RenderDish dish={props.dish} />
            <RenderComments comments={COMMENTS.filter(c => c.dishId === props.dish.id)} />
        </div>
    );
}

export default DishDetail