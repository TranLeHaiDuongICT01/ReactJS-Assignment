import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Contact from './ContactComponent';
import { fetchComments, fetchDishes, fetchFeedbacks, fetchLeaders, fetchPromos, postComment, postFeedback } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};
const mapDishpatchToProps = (dispatch) => ({
    fetchDishes: () => { dispatch(fetchDishes()) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
    fetchLeaders: () => { dispatch(fetchLeaders()) },
    fetchFeedbacks: () => { dispatch(fetchFeedbacks()) },
    postComment: (dishId, rating, author, comment) => { dispatch(postComment(dishId, rating, author, comment)) },
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => { dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)) },

})
class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        this.props.fetchFeedbacks();
    }
    render() {
        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesError={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    promoErr={this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
                    leaderErr={this.props.leaders.errMess}
                />
            )
        }

        const DishWithId = () => {
            const { id } = useParams();
            return (
                <DishDetail dish={this.props.dishes.dishes.find(dish => Number(dish.id) === Number(id))}
                    comments={this.props.comments.comments.filter(comment => comment.dishId === Number(id))}
                    postComment={this.props.postComment}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    commentError={this.props.comments.errMess}
                />
            )
        }
        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
                        <Routes>
                            <Route path='/home' element={<HomePage />} />
                            <Route exact path='/menu' element={<Menu
                                dishes={this.props.dishes}

                            />} />
                            <Route exact path='/menu/:id' element={<DishWithId />} />
                            <Route exact path='/contactus' element={<Contact postFeedback={this.props.postFeedback} />} />
                            <Route exact path='/aboutus' element={<About
                                leaders={this.props.leaders.leaders}
                                isLoading={this.props.leaders.isLoading}
                                errMess={this.props.leaders.errMess}
                            />} />
                            <Route path='*' element={<Navigate to='/home' replace />} />
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const location = useLocation();
        return <Component location={location} {...props} />;
    };
    return Wrapper;
};

export default withRouter(connect(mapStateToProps, mapDishpatchToProps)(Main));