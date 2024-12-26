import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [userData, setUserData] = useState(false)
    const [classes, setClasses] = useState([]);


     // Getting User Profile using API
     const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

     // Add these functions to your existing context
     const getAllClasses = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/user/get-classes`,
                { headers: { token } }
            );
            
            if (data.success) {
                setClasses(data.classes);
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
            toast.error('Failed to fetch classes');
        }
    };

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        }
    }, [token])
   

    const value = {
        backendUrl,
        token, setToken,
        userData, setUserData, loadUserProfileData,
        getAllClasses, classes
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider