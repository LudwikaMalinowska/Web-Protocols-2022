import { combineReducers } from "redux";

import gameReducer from "./GameReducer";
import gameUsersReducer from "./GameUsersReducer";
import moveReducer from "./MoveReducer";
import userReducer from "./UserReducer";


const rootReducer = combineReducers({
    games: gameReducer,
    users: userReducer,
    gameUsers: gameUsersReducer,
    moves: moveReducer
});

export default rootReducer;