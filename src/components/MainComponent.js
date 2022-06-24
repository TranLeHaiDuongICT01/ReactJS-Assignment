import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Contact from './ContactComponent'
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    // onDishSelect(dishId) {
    //     this.setState({
    //         ...this.state,
    //         selectedDish: dishId
    //     });
    // }

    render() {
        const HomePage = () => {
            return (
                <Home dish={this.state.dishes.filter(dish => dish.featured)[0]}
                    promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                    leader={this.state.leaders.filter(leader => leader.featured)[0]}
                />
            )
        }

        const DishWithId = () => {
            const {id} = useParams();
            return (
                <DishDetail dish={this.state.dishes.find(dish => Number(dish.id) === Number(id))}
                    comments={this.state.comments.filter(comment => comment.dishId === Number(id))} />
            )
        }
        return (
            <div>
                <Header />

                {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
                {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
                <Routes>
                    <Route path='/home' element={<HomePage />} />
                    <Route exact path='/menu' element={<Menu dishes={this.state.dishes} />} />
                    <Route exact path='/menu/:id' element={<DishWithId />} />
                    <Route exact path='/contactus' element={<Contact />} />
                    <Route exact path='/aboutus' element={<About leaders={this.state.leaders} />} />
                    <Route path='*' element={<Navigate to='/home' replace />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;