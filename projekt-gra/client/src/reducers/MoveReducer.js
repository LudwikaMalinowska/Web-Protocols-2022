

const moveReducer = (state = [], action) => {
    let newState;
    switch(action.type) {
        case "MOVE_ADD":
            // return action.payload.moves;
            return [...state, action.payload.move];
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
            newState = [...state]
            newState.pop()
            return newState;
        case "MOVE_DELETE_START": 
            return state;
        case "MOVE_DELETE_FAILED":
            return state;

        case 'MOVE_CHANGE':
            newState = [...state]
            newState.pop()
            return [...newState, action.payload.move];
        case "MOVE_CHANGE_START":
            return state;
        case "MOVE_CHANGE_FAILED":
            return state;

        default:
            return state;
    }
}

export default moveReducer;