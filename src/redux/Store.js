import { createStore, combineReducers } from "redux";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
const reducers = combineReducers({
    dishes: Dishes,
    comments: Comments,
    leaders: Leaders,
    promotions: Promotions
});
export const Store = () => {
    return createStore(reducers);
}