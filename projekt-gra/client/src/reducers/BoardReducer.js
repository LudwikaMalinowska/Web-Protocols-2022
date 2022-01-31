
const pointsInit = {
    '1': {value: 0, clicked: false},
    '2': {value: 0, clicked: false},
    '3': {value: 0, clicked: false},
    '4': {value: 0, clicked: false},
    '5': {value: 0, clicked: false},
    '6': {value: 0, clicked: false},
    'x3': {value: 0, clicked: false},
    'x4': {value: 0, clicked: false},
    'mały strit': {value: 0, clicked: false},
    'duży strit': {value: 0, clicked: false}, 
    'generał': {value: 0, clicked: false},
    'szansa': {value: 0, clicked: false}
};

const boardInit = {
    player1: pointsInit,
    player2: pointsInit
}

const boardReducer = (state = [], action) => {
    // console.log(action.type);
    switch(action.type) {
        
        case "BOARD_REQUEST_START": 
            return state;
        case "BOARD_REQUEST_FAILED":
            return state;
        case "BOARD_REQUEST":
            return action.payload.board;

        case "BOARD_UPDATE":
            // console.log("payload", action.payload);
            // console.log("a", action.payload.board);
            return action.payload.board;
        case "BOARD_UPDATE_START":
            return state;
        case "BOARD_UPDATE_FAILED":
            return state;
            
        
        default:
            return state;
    }
}

export default boardReducer;