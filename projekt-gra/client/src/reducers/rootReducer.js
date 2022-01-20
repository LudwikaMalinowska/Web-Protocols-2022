import { combineReducers } from "redux";
// import userReducer  from "./UserReducer";
// import productReducer from "./ProductReducer";
import gameReducer from "./GameReducer";

const rootReducer = combineReducers({
    // users: userReducer,
    // products: productReducer,
    games: gameReducer,
});

export default rootReducer;