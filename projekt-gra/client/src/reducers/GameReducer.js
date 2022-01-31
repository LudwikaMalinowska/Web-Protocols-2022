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


        case "GAME_GET_BY_NAME":
            console.log(action.payload);
            return action.payload.games;
        case "GAME_GET_BY_NAME_START":
            return state;
        case "GAME_GET_BY_NAME_FAILED":
            return state;
        
        case "GAME_GET_BY_ID":
            console.log(action.payload);
            return action.payload.games;
        case "GAME_GET_BY_ID_START":
            return state;
        case "GAME_GET_BY_ID_FAILED":
            return state;
        
        case "GAME_UPDATE":
            return state;
        case "GAME_UPDATE_START": 
            return state;
        case "GAME_UPDATE_FAILED":
            return state;

        
        default:
            return state;
    }
}

export default gameReducer;