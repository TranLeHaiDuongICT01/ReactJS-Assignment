import { createStore, combineReducers, applyMiddleware } from "redux";
import staffReducer from "./reducer/staff";
import departmentReducer from "./reducer/department";
import thunk from "redux-thunk";
import logger from "redux-logger";
const reducers = combineReducers({
    staffs: staffReducer,
    departments: departmentReducer
})
const store = createStore(reducers, applyMiddleware(thunk, logger));

export default store;