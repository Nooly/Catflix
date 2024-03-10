import { USER_SIGNIN, USER_SIGNUP, USER_SIGNOUT, USER_ADD_MY_LIST, USER_REMOVE_MY_LIST } from "../actions";

const userReducer = (state, action) => {
    switch (action.type) {
        case USER_SIGNIN: {
            return { ...state, userInfo: action.payload };
        }
        case USER_SIGNUP: {
            return { ...state, userInfo: action.payload };
        }
        case USER_SIGNOUT: {
            return { ...state, userInfo: null };
        }
        case USER_ADD_MY_LIST: {
            const updatedUserInfo = {
                ...state.userInfo,
                myList: [...state.userInfo.myList, action.payload], // Assuming action.payload is the new movie to add
            };
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            return { ...state, userInfo: updatedUserInfo };
        }
        case USER_REMOVE_MY_LIST: {
            const updatedUserInfo = {
                ...state.userInfo,
                myList: state.userInfo.myList.filter(movie => movie._id !== action.payload), // Assuming action.payload is the movie id to remove
            };
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            return { ...state, userInfo: updatedUserInfo };
        }
        default: return { ...state };
    }
}

export default userReducer;