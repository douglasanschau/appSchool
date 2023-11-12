import { useState } from 'react'; 

import { FiX } from 'react-icons/fi';
import './modal.css';

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';

import axios from 'axios';


function ModalNewStudent({modalNewStudent, setModalNewStudent}){

    const [studentName, setStudentName] = useState('');    
    const [studentEmail, setStudentEmail] = useState('');  
    const [studentHouse, setStudentHouse] = useState('G');  
    
    const navigate = useNavigate();

    async function registerNewStudent(){
        const urlBase = 'http://localhost:8080/api/students';

        const data = { 'name' : studentName, 'email': studentEmail, 'house': studentHouse };

        await axios.post(urlBase, data)
        .then(async (response) =>  {
            const data = response.data;

            if(data.error){
                toast.error(data.message);
            } else {
                toast.success('Student registered successfully');
                navigate(`/student/${data.student['id']}`);
             }

        })
        .catch((e) => {
            toast.error('Somenthing wrong happend :(');
        })

    }

    return (
        <div id="modalNewStudent">
            <div className="container">
                <button className='close' onClick={() => setModalNewStudent(!modalNewStudent)}>
                  <FiX size={25} />
                </button>
                <div className='modalContent'>
                    <form id='formNewStudent'>
                        <label>Name</label>
                        <input type='text' className='form-field' name='name' onChange={(e) => setStudentName(e.target.value)} placeholder="Include here the name of student"  />
                        <label>E-mail</label>
                        <input type='email' className='form-field' name='email' onChange={(e) => setStudentEmail(e.target.value)}  placeholder="studant@email.com" />
                        <label>Hogwarts House</label>
                        <select className='select-field' name='student-house' onChange={(e) => setStudentHouse(e.target.value)}>
                            <option value='G'>Gryffindor</option>
                            <option value='H'>Hufflepuff</option>
                            <option value='R'>Ravenclaw</option>
                            <option value='S'>Slytherin</option>
                        </select>
                    </form>
                </div>
                <div className='modalFooter'>
                    <button className='closeModal' onClick={() => setModalNewStudent(!modalNewStudent)}>
                      Close
                    </button>
                    <button className='save' onClick={() => registerNewStudent()}>
                     Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalNewStudent;