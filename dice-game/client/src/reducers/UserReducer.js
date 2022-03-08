

const userReducer = (state = [], action) => {
    switch(action.type) {
        case "USER_ADD":
            return [...state, action.payload];
        case "USER_ADD_START": 
            return state;
        case "USER_ADD_FAILED":
            return state;
        case "USER_LIST_REQUEST_START": 
            return state;
        case "USER_LIST_REQUEST_FAILED":
            return state;
        case "USER_LIST_REQUEST":
            return action.payload.allUsers;
        case "USER_UPDATE":
            return state;
        case "USER_UPDATE_START": 
            return state;
        case "USER_UPDATE_FAILED":
            return state;
        default:
            return state;
    }
}

export default userReducer;