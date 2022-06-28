import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Contact from './ContactComponent';
import { addComment } from '../redux/ActionCreators';
const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};
const mapDishpatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
})
class Main extends Component {

    render() {
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.filter(dish => dish.featured)[0]}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    leader={this.props.leaders.filter(leader => leader.featured)[0]}
                />
            )
        }

        const DishWithId = () => {
            const { id } = useParams();
            return (
                <DishDetail dish={this.props.dishes.find(dish => Number(dish.id) === Number(id))}
                    comments={this.props.comments.filter(comment => comment.dishId === Number(id))}
                    addComment={this.props.addComment}
                />
            )
        }
        return (
            <div>
                <Header />

                {/* <Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
                {/* <DishDetail dish={this.props.dishes.filter((dish) => dish.id === this.props.selectedDish)[0]} /> */}
                <Routes>
                    <Route path='/home' element={<HomePage />} />
                    <Route exact path='/menu' element={<Menu dishes={this.props.dishes} />} />
                    <Route exact path='/menu/:id' element={<DishWithId />} />
                    <Route exact path='/contactus' element={<Contact />} />
                    <Route exact path='/aboutus' element={<About leaders={this.props.leaders} />} />
                    <Route path='*' element={<Navigate to='/home' replace />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const history = useNavigate();
        return <Component history={history} {...props} />;
    };
    return Wrapper;
};

export default withRouter(connect(mapStateToProps, mapDishpatchToProps)(Main));