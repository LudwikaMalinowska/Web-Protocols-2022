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

//-------
export const gameGetByNameAction = (users) => ({
    type: "GAME_GET_BY_NAME",
    payload: users
})

export const gameGetByNameStartAction = ({
    type: "GAME_GET_BY_NAME_START"
});

export const gameGetByNameFailAction = (error) => ({
    type: "GAME_GET_BY_NAME_FAILED",
    payload: error
})

//-----
export const gameGetByIdAction = (users) => ({
    type: "GAME_GET_BY_ID",
    payload: users
})

export const gameGetByIdStartAction = ({
    type: "GAME_GET_BY_ID_START"
});

export const gameGetByIdFailAction = (error) => ({
    type: "GAME_GET_BY_ID_FAILED",
    payload: error
})
//-----



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

export const getGamesByName = (name) => {
    console.log('-action');
    console.log(name);
    return async dispatch => {
        dispatch(gameGetByNameStartAction);
        console.log('----action');
        setTimeout(async () => {
            try{
                const response = await axios.get(`http://localhost:5000/games/searchName?name=${name}`);
                console.log("-----res", response);
                dispatch(gameGetByNameAction(response.data));        
            }catch(ex) {
                dispatch(gameGetByNameFailAction(ex));
            }
        }, 1000)
    }
}

export const getGamesById = (id) => {
    return async dispatch => {
        dispatch(gameGetByIdStartAction);
        // console.log('Create user action');
        setTimeout(async () => {
            try{
                const response = await axios.get(`http://localhost:5000/games/searchId?id=${id}`);
                console.log("res", response);
                dispatch(gameGetByIdAction(response.data));        
            }catch(ex) {
                dispatch(gameGetByIdFailAction(ex));
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

export const updateGame = (id, updatedGame) => {
    console.log("upd");
    return async dispatch => {
        dispatch(updateGameStartAction);
        console.log('Update game action');
        setTimeout(async () => {
            try{
                const response = await axios.put(`http://localhost:5000/games/${id}`, updatedGame);
                console.log(response);
                dispatch(updateGameAction(response.data));        
            }catch(ex) {
                dispatch(updateGameFailAction(ex));
            }
        }, 1000)
    }
}