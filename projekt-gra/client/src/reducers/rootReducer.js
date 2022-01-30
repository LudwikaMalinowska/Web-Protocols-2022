import { combineReducers } from "redux";

import boardReducer from "./BoardReducer";
import gameReducer from "./GameReducer";
import gameUsersReducer from "./GameUsersReducer";
import moveReducer from "./MoveReducer";
import userReducer from "./UserReducer";


const rootReducer = combineReducers({
    games: gameReducer,
    users: userReducer,
    gameUsers: gameUsersReducer,
    moves: moveReducer,
    board: boardReducer
});

export default rootReducer;