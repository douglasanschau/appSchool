import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../contexts/auth';


function PrivateRoute({children, isPrivate}){

    const { signed, loadingAuth  } = useContext(AuthContext);

    if(loadingAuth){
        return (
            <>
            </>
        );
    }

    if(!signed && isPrivate){
        return <Navigate to='/login'/>
    } else if(signed && !isPrivate){
        return <Navigate to='/home'/>
    }

    return children;
}

export default PrivateRoute;