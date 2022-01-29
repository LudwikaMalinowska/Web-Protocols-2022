

const moveReducer = (state = [], action) => {
    switch(action.type) {
        case "MOVE_ADD":
            return [...state, action.payload];
        case "MOVE_ADD_START": 
            return state;
        case "MOVE_ADD_FAILED":
            return state;

        case "MOVE_LIST_REQUEST_START": 
            return state;
        case "MOVE_LIST_REQUEST_FAILED":
            return state;
        case "MOVE_LIST_REQUEST":
            return action.payload.moves;

        case "MOVE_DELETE":
            const newState = [...state]
            newState.pop()
            return newState;
        case "MOVE_DELETE_START": 
            return state;
        case "MOVE_DELETE_FAILED":
            return state;
        default:
            return state;
    }
}

export default moveReducer;