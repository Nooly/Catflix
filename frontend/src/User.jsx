import userReducer from "./Reducers/userReducer.jsx";
import { createContext, useReducer } from "./imports.js";


const User = createContext();

const userInfo = localStorage.getItem('userInfo');

const initialState = {
    userInfo: userInfo ? JSON.parse(userInfo) : null
};

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);
    const body = { state, dispatch };
    return <User.Provider value={body}>{children}</User.Provider>
};

export { User, UserProvider };