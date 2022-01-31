import axios from "axios";



export const usersListRequestAction = (users) => ({
    type: "USER_LIST_REQUEST",
    payload: users
})

export const usersListRequestStartAction = ({
    type: "USER_LIST_REQUEST_START"
});

export const usersListRequestFailAction = (error) => ({
    type: "USER_LIST_REQUEST_FAILED",
    payload: error
})

//-----
export const addUserAction = (payload) => ({
    type: 'USER_ADD',
    payload
});

export const addUserStartAction = ({
    type: "USER_ADD_START"
});

export const addUserFailAction = (error) => ({
    type: "USER_ADD_FAILED",
    payload: error
})

//-----
export const deleteUserAction = (payload) => ({
    type: 'USER_DELETE',
    payload
});

export const deleteUserStartAction = ({
    type: "USER_DELETE_START"
});

export const deleteUserFailAction = (error) => ({
    type: "USER_DELETE_FAILED",
    payload: error
})

//-----
export const updateUserAction = (payload) => ({
    type: 'USER_UPDATE',
    payload
});

export const updateUserStartAction = ({
    type: "USER_UPDATE_START"
});

export const updateUserFailAction = (error) => ({
    type: "USER_UPDATE_FAILED",
    payload: error
})




export const getUserList = () => {
    return async dispatch => {
        dispatch(usersListRequestStartAction);
        setTimeout(async () => {
            try{
                const response = await axios.get('http://localhost:5000/users');
                dispatch(usersListRequestAction(response.data));        
            }catch(ex) {
                dispatch(usersListRequestFailAction(ex));
            }
        }, 1000)
    }
}

export const addUser = (user) => {
    return async dispatch => {
        dispatch(addUserStartAction);
        // console.log('Create user action');
        setTimeout(async () => {
            try{
                const response = await axios.post('http://localhost:5000/users', user);
                dispatch(addUserAction(response.data));        
            }catch(ex) {
                dispatch(addUserFailAction(ex));
            }
        }, 1000)
    }
}


export const deleteUser = (id) => {
    console.log("del action id", id);
    return async dispatch => {
        dispatch(deleteUserStartAction);
        console.log('Delete user action');
        setTimeout(async () => {
            try{
                const response = await axios.delete(`http://localhost:5000/users/${id}`);
                dispatch(deleteUserAction(response.data));        
            }catch(ex) {
                dispatch(deleteUserFailAction(ex));
            }
        }, 1000)
    }
}

export const updateUser = (id, updatedUser) => {
    console.log("upd");
    return async dispatch => {
        dispatch(updateUserStartAction);
        console.log('Update user action');
        setTimeout(async () => {
            try{
                const response = await axios.put(`http://localhost:5000/users/${id}`, updatedUser);
                console.log(response);
                dispatch(updateUserAction(response.data));        
            }catch(ex) {
                dispatch(updateUserFailAction(ex));
            }
        }, 1000)
    }
}