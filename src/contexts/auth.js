import { useState, useEffect, createContext } from 'react';

import { toast } from 'react-toastify';

import axios from 'axios';

export const AuthContext = createContext({});

function AuthProvider({children}){
    
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {

        function loadStorage() { 
            
              const storageUser = localStorage.getItem('UserInfo');
  
              if(storageUser){
                  setUser(JSON.parse(storageUser));
                  setLoadingAuth(false);
              }


              setLoadingAuth(false);
        }
  
        loadStorage();
     }, [setUser]);

     async function loginUser(login, password){
        setLoadingAuth(true);

        const urlBase = 'http://localhost:8080/api/login';

        const data = { 
            params: {
                'email': login, 'password': password 
            }
        };


        await axios.get(urlBase, data)
        .then(async (response) => {
             const data  = response.data;

             if(data.error) {
                toast.error(data.message);
             } else {
                if(data.user !== null) {
                    setUser(data.user);
                    localStorage.setItem('UserInfo', JSON.stringify(data.user));
                    toast.success('Welcome to Hogwarts!');
                } else {
                    toast.error('We couldn\'t manage to find your registration :(');
                }
             }

             setLoadingAuth(false);

        })
        .catch((error) => {
            console.log(error);
            toast.error('Something unexpected happend, try again later :(');
            setLoadingAuth(false);
        });
     }

     async function logoutUser(){
        const urlBase = 'http://localhost:8080/api/logout';

        await axios.get(urlBase, user)
        .then(async (response) => {
            setUser(null);
            localStorage.removeItem("UserInfo");
            toast.success('We are looking forward to see you soon  ;)');
        })
        .catch((error) =>{
            toast.error('Something wrong happend!');
        });
    }


     return (
        <AuthContext.Provider value={{ signed: !!user, user, loadingAuth, setLoadingAuth, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
