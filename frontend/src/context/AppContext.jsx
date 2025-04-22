import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user,setUser] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [credits,setCredits] = useState(false);
    const [image,setImage] = useState('');
    const [imageData,setImageData] = useState();

    const getCredits = async () => {
        const response = await axios.post(backendUrl+'/api/user/credits',{user},{withCredentials:true});
        if(response.data.success)
        {
            setCredits(response.data.credits);
            console.log(response.data.credits);
            setUser(response.data.user.name);
            console.log(response.data.user.name);
            console.log(response);
        }
    }

    const value = {
        user, setUser, backendUrl, credits, setCredits, image, setImage, getCredits, imageData, setImageData
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