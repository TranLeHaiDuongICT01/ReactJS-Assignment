import { createStore } from "redux";
import { reducer, initialState } from "./reducer";
export const Store = () => {
    return createStore(reducer, initialState);
}