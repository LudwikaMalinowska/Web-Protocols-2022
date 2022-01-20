import axios from "axios";

export const addGameAction = (payload) => ({
    type: 'GAME_ADD',
    payload
});

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


export const getGameList = () => {
    return async dispatch => {
        dispatch(gamesListRequestStartAction);
        console.log('Create user action');
        setTimeout(async () => {
            try{
                const response = await axios.get('http://localhost:5000/games');
                dispatch(gamesListRequestAction(response.data));        
            }catch(ex) {
                dispatch(gamesListRequestFailAction(ex));
            }
        }, 4000)
    }
}