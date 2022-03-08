

const gameUsersReducer = (state = [], action) => {
    switch(action.type) {
        case "GAME_USERS_ADD":
            return [...state, action.payload];
        case "GAME_USERS_ADD_START": 
            return state;
        case "GAME_USERS_ADD_FAILED":
            return state;
        case "GAME_USERS_LIST_REQUEST_START": 
            return state;
        case "GAME_USERS_LIST_REQUEST_FAILED":
            return state;
        case "GAME_USERS_LIST_REQUEST":
            return action.payload.users;
        case "GAME_USERS_UPDATE":
            return state;
        case "GAME_USERS_UPDATE_START": 
            return state;
        case "GAME_USERS_UPDATE_FAILED":
            return state;
        default:
            return state;
    }
}

export default gameUsersReducer;