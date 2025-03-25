import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user,setUser] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [token,setToken] = useState();
    const [credits,setCredits] = useState(false);

    const value = {
        user, setUser, backendUrl, token, setToken, credits, setCredits
    }

    const getCredits = async () => {
        const response = await axios.post(backendUrl+'/api/user/credits',{user},{withCredentials:true});
        if(response.data.success)
        {
            setCredits(response.data.credits);
            console.log(credits);
            console.log(response);
        }
    }

    useEffect(()=>{
        getCredits();
    },[user])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;