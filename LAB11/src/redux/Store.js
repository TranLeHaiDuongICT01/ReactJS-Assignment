import { createStore, combineReducers, applyMiddleware } from "redux";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
const reducers = combineReducers({
    dishes: Dishes,
    comments: Comments,
    leaders: Leaders,
    promotions: Promotions
});
export const Store = () => {
    return createStore(
        reducers,
        applyMiddleware(thunk, logger)
    );
};