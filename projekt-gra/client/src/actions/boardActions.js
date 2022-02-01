import axios from "axios";


export const gameBoardGetAction = (board) => ({
    type: "BOARD_REQUEST",
    payload: board
})

export const gameBoardGetStartAction = ({
    type: "BOARD_REQUEST_START"
});

export const gameBoardGetFailAction = (error) => ({
    type: "BOARD_REQUEST_FAILED",
    payload: error
})
//-----
export const gameBoardUpdateAction = (board) => ({
    type: "BOARD_UPDATE",
    payload: board
})

export const gameBoardUpdateStartAction = ({
    type: "BOARD_UPDATE_START"
});

export const gameBoardUpdateFailAction = (error) => ({
    type: "BOARD_UPDATE_FAILED",
    payload: error
})
//-----


export const getGameBoard = (gameId) => {
    return async dispatch => {
        dispatch(gameBoardGetStartAction);
        setTimeout(async () => {
            try{
                const response = await axios.get(`http://localhost:5000/games/${gameId}/board`);
                // console.log("res", response);
                dispatch(gameBoardGetAction(response.data));        
            }catch(ex) {
                dispatch(gameBoardGetFailAction(ex));
            }
        }, 0)
    }
}

export const updateGameBoard = (id, board) => {
    
    
    return async dispatch => {
        console.log("board22", board);
        dispatch(gameBoardUpdateStartAction);
        console.log('---Update BOARD action');
        setTimeout(async () => {
            try{
                const response = await axios.put(`http://localhost:5000/games/${id}/board`, board);
                // console.log(response);
                dispatch(gameBoardUpdateAction(response.data));        
            }catch(ex) {
                dispatch(gameBoardUpdateFailAction(ex));
            }
        }, 0)
    }
}