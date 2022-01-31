

const userReducer = (state = {}, action) => {
    switch(action.type) {
        case"GAME_GET":
            console.log(action.payload);
            return action.payload.game;
        case "GAME_GET_START":
            return state;
        case "GAME_GET_FAILED":
            return state;

        default:
            return state;
    }
}

export default userReducer;