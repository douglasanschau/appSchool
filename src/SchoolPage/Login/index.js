
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import './login.css';

import { BiSolidMagicWand } from "react-icons/bi";
import { FaBroom } from "react-icons/fa";
import { GiCauldron } from "react-icons/gi";

import { AuthContext } from '../../contexts/auth';

function Login () {

    const { loginUser } = useContext(AuthContext);

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function isValidEmail(email){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email.match(regex) ? true : false;
    }
    
    function handleFocusForm(input){
        input.classList.remove('form-error');       
    }
    
    function handleLoginUser(e) {
        e.preventDefault();
        if(!isValidEmail(login)){
          toast.error("Informed login is not a valid email, try again!");
          document.getElementById('login').classList.add('form-error');
          return false;
        }
 
        if(password.length < 6){
           toast.error("Password must have at least 6 characters!");
           document.getElementById('password').classList.add('form-error');
           return false;
        }
 
       loginUser(login, password);
     }
     

    return (
        <div id='loginApp' className='AppContent'>

            <div className='pageInfo'>
                <form id='formLoginUser'>
                    <h2 className='titleCard'>
                        <span>Hogwarts</span>
                    </h2>
                    <div className='fieldInfo'>
                        <label htmlFor='password'>Login</label>
                        <input type='text' className='form-field' id='login'  name='login' onFocus={(e) => handleFocusForm(e.target)}  onChange={(e) => setLogin(e.target.value)} value={login} placeholder="Inform your email of access here" />
                    </div>
                    <div className='fieldInfo'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' className='form-field' id='password' name='password' onFocus={(e) => handleFocusForm(e.target)} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Your personal password must be filled" />
                    </div>
                    <button tyṕe='button' onClick={(e) => handleLoginUser(e)}>Login</button>
                </form>
            </div>

            <div className='pageInfo'>
                <div className='stickInfographic'>
                    <ul>
                        <li>
                            <BiSolidMagicWand className='icon' size={40} />
                            <span>Have acesss to all wizards and witches studantes</span>
                        </li>
                        <li>
                            <FaBroom className='icon' size={40} />
                            <span>Create, update and delete personal infos</span>
                        </li>
                        <li>
                            <GiCauldron className='icon' size={40} />
                            <span>Define which Hogwarts House they will atend</span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}


export default Login;