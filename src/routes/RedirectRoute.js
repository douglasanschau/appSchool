import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

import { Navigate } from 'react-router-dom';

function RedirectRoute(){

    const { signed, loadingAuth  } = useContext(AuthContext);

    if(loadingAuth){
        return (
            <>
            </>
        );
    }

    if(!signed){
        return <Navigate to='/login'/>
    } 
        
    return <Navigate to='/home'/>
}

export default RedirectRoute;