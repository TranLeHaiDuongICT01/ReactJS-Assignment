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
import { addComment, fetchDishes } from '../redux/ActionCreators';
const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};
const mapDishpatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) }
})
class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
    }
    render() {
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesError={this.props.dishes.errMess}
                    promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                    leader={this.props.leaders.filter(leader => leader.featured)[0]}
                />
            )
        }

        const DishWithId = () => {
            const { id } = useParams();
            return (
                <DishDetail dish={this.props.dishes.dishes.find(dish => Number(dish.id) === Number(id))}
                    comments={this.props.comments.filter(comment => comment.dishId === Number(id))}
                    addComment={this.props.addComment}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                />
            )
        }
        return (
            <div>
                <Header />
                <Routes>
                    <Route path='/home' element={<HomePage />} />
                    <Route exact path='/menu' element={<Menu
                        dishes={this.props.dishes}

                    />} />
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