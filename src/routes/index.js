import { Routes, Route } from 'react-router-dom';

import Home from '../SchoolPage/Home';
import Login from '../SchoolPage/Login';
import Student from '../SchoolPage/Student';

import PrivateRoute from './PrivateRoute';
import RedirectView from './RedirectRoute';

function RoutesApp(){
    return(
        <Routes>
            <Route path='/login' element={<PrivateRoute isPrivate={false}><Login /></PrivateRoute>} />
            <Route path='/home' element={<PrivateRoute isPrivate={true}><Home /></PrivateRoute>} />
            <Route path='/student/:id' element={<PrivateRoute isPrivate={true}><Student /></PrivateRoute>} />
            <Route path='*' element={<RedirectView/>} />
        </Routes>
    );
}

export default RoutesApp;