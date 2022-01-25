import { combineReducers } from "redux";

import gameReducer from "./GameReducer";
import gameUsersReducer from "./GameUsersReducer";
import userReducer from "./UserReducer";

const rootReducer = combineReducers({
    games: gameReducer,
    users: userReducer,
    gameUsers: gameUsersReducer
});

export default rootReducer;