import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
class DishDetail extends Component {
    render() {
        if (!this.props.dish) return <div></div>;
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                        <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-6 m-1">
                    <div>
                        <h4>Comments</h4>
                        {
                            this.props.comments.map(comment => {
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
            </div>
        );
    }

}

export default DishDetail