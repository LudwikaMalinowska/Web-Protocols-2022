import axios from "axios";



export const gamesListRequestAction = (users) => ({
    type: "GAME_LIST_REQUEST",
    payload: users
})

export const gamesListRequestStartAction = ({
    type: "GAME_LIST_REQUEST_START"
});

export const gamesListRequestFailAction = (error) => ({
    type: "GAME_LIST_REQUEST_FAILED",
    payload: error
})

//-----
export const addGameAction = (payload) => ({
    type: 'GAME_ADD',
    payload
});

export const addGameStartAction = ({
    type: "GAME_ADD_START"
});

export const addGameFailAction = (error) => ({
    type: "GAME_ADD_FAILED",
    payload: error
})

//-----
export const deleteGameAction = (payload) => ({
    type: 'GAME_DELETE',
    payload
});

export const deleteGameStartAction = ({
    type: "GAME_DELETE_START"
});

export const deleteGameFailAction = (error) => ({
    type: "GAME_DELETE_FAILED",
    payload: error
})

//-----
export const updateGameAction = (payload) => ({
    type: 'GAME_UPDATE',
    payload
});

export const updateGameStartAction = ({
    type: "GAME_UPDATE_START"
});

export const updateGameFailAction = (error) => ({
    type: "GAME_UPDATE_FAILED",
    payload: error
})

export const getGameList = () => {
    return async dispatch => {
        dispatch(gamesListRequestStartAction);
        console.log('Create user action');
        setTimeout(async () => {
            try{
                const response = await axios.get('http://localhost:5000/games');
                console.log("res", response);
                dispatch(gamesListRequestAction(response.data));        
            }catch(ex) {
                dispatch(gamesListRequestFailAction(ex));
            }
        }, 1000)
    }
}

export const addGame = (game) => {
    return async dispatch => {
        dispatch(addGameStartAction);
        console.log('Create game action');
        setTimeout(async () => {
            try{
                const response = await axios.post('http://localhost:5000/games', game);
                dispatch(addGameAction(response.data));        
            }catch(ex) {
                dispatch(addGameFailAction(ex));
            }
        }, 1000)
    }
}


export const deleteGame = (id) => {
    console.log("del action id", id);
    return async dispatch => {
        dispatch(deleteGameStartAction);
        console.log('Delete game action');
        setTimeout(async () => {
            try{
                const response = await axios.delete(`http://localhost:5000/games/${id}`);
                dispatch(deleteGameAction(response.data));        
            }catch(ex) {
                dispatch(deleteGameFailAction(ex));
            }
        }, 1000)
    }
}

export const updateGame = (id) => {
    return async dispatch => {
        dispatch(updateGameStartAction);
        console.log('Delete game action');
        setTimeout(async () => {
            try{
                const response = await axios.put(`http://localhost:5000/games/${id}`);
                dispatch(updateGameAction(response.data));        
            }catch(ex) {
                dispatch(updateGameFailAction(ex));
            }
        }, 1000)
    }
}