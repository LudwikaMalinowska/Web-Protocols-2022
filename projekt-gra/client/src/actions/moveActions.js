import axios from "axios";



export const movesListRequestAction = (moves) => ({
    type: "MOVE_LIST_REQUEST",
    payload: moves
})

export const movesListRequestStartAction = ({
    type: "MOVE_LIST_REQUEST_START"
});

export const movesListRequestFailAction = (error) => ({
    type: "MOVE_LIST_REQUEST_FAILED",
    payload: error
})

//-----
export const addMoveAction = (payload) => ({
    type: 'MOVE_ADD',
    payload
});

export const addMoveStartAction = ({
    type: "MOVE_ADD_START"
});

export const addMoveFailAction = (error) => ({
    type: "MOVE_ADD_FAILED",
    payload: error
})

//-----
export const deleteMoveAction = (payload) => ({
    type: 'MOVE_DELETE',
    payload
});

export const deleteMoveStartAction = ({
    type: "MOVE_DELETE_START"
});

export const deleteMoveFailAction = (error) => ({
    type: "MOVE_DELETE_FAILED",
    payload: error
})
//-----
export const changeMoveAction = (payload) => ({
    type: 'MOVE_CHANGE',
    payload
});

export const changeMoveStartAction = ({
    type: "MOVE_CHANGE_START"
});

export const changeMoveFailAction = (error) => ({
    type: "MOVE_CHANGE_FAILED",
    payload: error
})






export const getMoveList = (gameId) => {
    return async dispatch => {
        dispatch(movesListRequestStartAction);
        // console.log('Create move action');
        setTimeout(async () => {
            try{
                const response = await axios.get(`http://localhost:5000/games/${gameId}/moves`);
                // console.log("res", response);
                dispatch(movesListRequestAction(response.data));        
            }catch(ex) {
                dispatch(movesListRequestFailAction(ex));
            }
        }, 0)
    }
}

export const addMove = (gameId, move) => {
    return async dispatch => {
        dispatch(addMoveStartAction);
        console.log('Create move action');
        setTimeout(async () => {
            try{
                const response = await axios.post(`http://localhost:5000/games/${gameId}/moves`, move);
                dispatch(addMoveAction(response.data));        
            } catch(ex) {
                dispatch(addMoveFailAction(ex));
            }
        }, 0)
    }
}


export const deleteMove = (gameId) => {
    // console.log("del action id", id);
    return async dispatch => {
        dispatch(deleteMoveStartAction);
        console.log('Delete move action');
        setTimeout(async () => {
            try{
                const response = await axios.delete(`http://localhost:5000/games/${gameId}/moves`);
                dispatch(deleteMoveAction(response.data));        
            }catch(ex) {
                dispatch(deleteMoveFailAction(ex));
            }
        }, 0)
    }
}

export const changeMove = (gameId, move) => {
    return async dispatch => {
        dispatch(changeMoveStartAction);
        setTimeout(async () => {
            try{
                const response = await axios.put(`http://localhost:5000/games/${gameId}/moves`, move);
                dispatch(changeMoveAction(response.data));        
            }catch(ex) {
                dispatch(changeMoveFailAction(ex));
            }
        }, 0)
    }
}

