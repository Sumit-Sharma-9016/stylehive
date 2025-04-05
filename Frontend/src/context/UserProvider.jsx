import { createContext, useEffect, useState } from "react";
import User from "../../../backend/models/UserModel";
import api from "../api";

export const UserContext = createContext();

const UserProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([]);
    
    const fetchUser = async() => {
        try {
            const response = await api.get('/user/me');
            if(response)
            setUser(response.data.user)
        } catch (error) {
            console.log(error.message);
        }
    }

    const getUsers = async() => {
        try {
            const result = await api.get('/user');
            setUsers(result.data.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getUsers();
    },[])
    
    useEffect(() => {
        fetchUser();
    },[])

    return(
        <UserContext.Provider value={{user, setUser,users, fetchUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider