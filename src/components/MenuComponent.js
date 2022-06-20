import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardTitle } from 'reactstrap'
import DishDetail from './DishdetailComponent'
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null,
            comments: null
        }
    }
    onDishSelect = (dish) => {
        if (this.state.selectedDish !== dish) {
            this.setState({
                ...this.state,
                selectedDish: dish,
                comments: this.props.comments.filter(comment => dish.id === comment.dishId)
            })
        }
    }
    renderDish(dish) {
        if (dish !== null) {
            return (
                <DishDetail dish={dish} />
            )
        } else {
            return (
                <div></div>
            );
        }
    }
    renderComments(comments) {
        if (comments && comments.length > 0) {
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
                </div >
            )
        }
    }
    render() {
        const menu = this.props.dishes.map(dish => (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card onClick={() => this.onDishSelect(dish)}>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>
        ));
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    {this.renderDish(this.state.selectedDish)}
                    {this.renderComments(this.state.comments)}
                </div>
            </div>
        );
    }
}

export default Menu;