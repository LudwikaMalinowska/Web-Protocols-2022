const initState = {
    games: [],
    // loading: false,
    // error: ''
}

const gameReducer = (state = [], action) => {
    switch(action.type) {
        case "GAME_ADD":
            return [...state, action.payload];
        case "GAME_ADD_START": 
            return state;
        case "GAME_ADD_FAILED":
            return state;
        case "GAME_LIST_REQUEST_START": 
            return state;
        case "GAME_LIST_REQUEST_FAILED":
            return state;
        case "GAME_LIST_REQUEST":
            return action.payload.allGames;
        default:
            return state;
    }
}

export default gameReducer;