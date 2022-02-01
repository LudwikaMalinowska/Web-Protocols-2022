import axios from "axios";



export const gameUsersListRequestAction = (gameUsers) => ({
    type: "GAME_USERS_LIST_REQUEST",
    payload: gameUsers
})

export const gameUsersListRequestStartAction = ({
    type: "GAME_USERS_LIST_REQUEST_START"
});

export const gameUsersListRequestFailAction = (error) => ({
    type: "GAME_USERS_LIST_REQUEST_FAILED",
    payload: error
})

//-----
export const addGameUserAction = (payload) => ({
    type: 'GAME_USERS_ADD',
    payload
});

export const addGameUserStartAction = ({
    type: "GAME_USERS_ADD_START"
});

export const addGameUserFailAction = (error) => ({
    type: "GAME_USERS_ADD_FAILED",
    payload: error
})

//-----
export const deleteGameUserAction = (payload) => ({
    type: 'GAME_USERS_DELETE',
    payload
});

export const deleteGameUserStartAction = ({
    type: "GAME_USERS_DELETE_START"
});

export const deleteGameUserFailAction = (error) => ({
    type: "GAME_USERS_DELETE_FAILED",
    payload: error
})
//-------
export const updateGameUserAction = (payload) => ({
    type: 'GAME_USER_UPDATE',
    payload
});

export const updateGameUserStartAction = ({
    type: "GAME_USER_UPDATE_START"
});

export const updateGameUserFailAction = (error) => ({
    type: "GAME_USER_UPDATE_FAILED",
    payload: error
})






export const getGameUserList = (gameId) => {
    return async dispatch => {
        dispatch(gameUsersListRequestStartAction);
        setTimeout(async () => {
            try{
                const response = await axios.get(`http://localhost:5000/games/${gameId}/users`);
                dispatch(gameUsersListRequestAction(response.data));        
            }catch(ex) {
                // console.log("er");
                dispatch(gameUsersListRequestFailAction(ex));
            }
        }, 1000)
    }
}

export const addUserToGame = (gameId, user) => {
    return async dispatch => {
        dispatch(addGameUserStartAction);
        console.log('Create gameUser action');
        setTimeout(async () => {
            try{
                const response = await axios.post(`http://localhost:5000/games/${gameId}/users`, user);
                dispatch(addGameUserAction(response.data));        
            }catch(ex) {
                dispatch(addGameUserFailAction(ex));
            }
        }, 1000)
    }
}


export const deleteUserFromGame = (gameId, userId) => {
    // console.log("del action id", id);
    return async dispatch => {
        dispatch(deleteGameUserStartAction);
        console.log('Delete gameUser action');
        setTimeout(async () => {
            try{
                const response = await axios.delete(`http://localhost:5000/games/${gameId}/users/${userId}`);
                dispatch(deleteGameUserAction(response.data));        
            }catch(ex) {
                dispatch(deleteGameUserFailAction(ex));
            }
        }, 1000)
    }
}

export const updateGameUser = (gameId, userId, updates) => {
    return async dispatch => {
        dispatch(updateGameUserStartAction);
        setTimeout(async () => {
            try{
                const response = await axios.patch(`http://localhost:5000/games/${gameId}/users/${userId}`, updates);
                dispatch(updateGameUserAction(response.data));        
            }catch(ex) {
                dispatch(updateGameUserFailAction(ex));
            }
        }, 1000)
    }
}
