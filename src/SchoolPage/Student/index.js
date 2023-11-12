
import React from 'react';
import { useEffect, useContext, useState  } from 'react'; 

import FormData from 'form-data'

import './student.css';

import { useNavigate, useParams } from "react-router-dom";

import { BsPersonBoundingBox } from "react-icons/bs"; 
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import axios from 'axios';

import { toast } from 'react-toastify';


function  Student(){

    const navigate = useNavigate();
    const params = useParams();

    const [ awaitingText, setAwaitingText ] = useState('Loading Information');
    const [loadingStudent, setLoadingStudent] = useState(true);

    const [ studentPhoto, setStudentPhoto ] = useState(null);
    const [ studentProfilePhoto, setStudentProfilePhoto ] = useState(null);

    const [ studentName, setStudentName ] = useState('');
    const [ studentEmail, setStudentEmail ] = useState('');
    const [ studentTelephone, setStudentTelephone ] = useState('');
    const [ studentHouse, setStudentHouse] = useState('');

    const [ studentStreetAvenue, setStudentStreetAvenue ] = useState('');
    const [ studentDistrict, setStudentDistrict ] = useState('');
    const [ studentCity, setStudentCity ] = useState('');
    const [ studentState, setStudentState ] = useState('');


   useEffect(() => {

    studentInfo(params.id);

   }, [params]);

   async function studentInfo(id){
        const urlBase = `http://localhost:8080/api/students/${id}`;

        await axios.get(urlBase)
        .then(async (response) =>  {
            const student = response.data;

            console.log(student);
            setStudentPhoto(student.photo);
            setStudentProfilePhoto(student.photo);

            setStudentName(student.name !== null ? student.name : '');
            setStudentEmail(student.email !== null ? student.email : '');
            setStudentTelephone(student.telephone !== null ? student.telephone : '');
            setStudentHouse(student.hogwarts_house !== null ? student.hogwarts_house : 'G');

            setStudentStreetAvenue(student.street_avenue);
            setStudentDistrict(student.district);
            setStudentCity(student.city);
            setStudentState(student.state);

            setLoadingStudent(false);

            
        })
        .catch((e) => {
            toast.error('Somenthing wrong happend :(');
            navigate('/home')
        })
   }

   function handleFile(e){
        if(e.target.files[0]){

            const image    = e.target.files[0];
            const extension = image.name.split('.').pop();

            if(['jpg', 'png'].indexOf(extension) !== -1){
                updateFile(image);
            } else{
                toast.error("Photo must have extension PNG or JPG.");
            }
        }
   }

   async function updateFile(image){
      setAwaitingText('Uploading Photo');
      setLoadingStudent(true);
    

      const formData = new FormData();
      formData.append('id', params.id);
      formData.append('photo', image);

      await axios({
        'method': "POST",
        'url': 'http://localhost:8080/api/photos',
        'data': formData, 
        'headers': {
            "Content-Type": "multipart/form-data;charset=utf-8",
        }
      })
      .then(async (response) =>  {
         const data = response.data;

         toast.success(data.message);
         setStudentPhoto(data.photo);
         
         setLoadingStudent(false);
      })
      .catch((error) => {
        toast.error('Somenthing wrong happend :(');
        setLoadingStudent(false);
      })
   }


  function handleTelephone(e){

    const result = e.target.value.replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1')

    setStudentTelephone(result);
  }

   async function updateStudentInfo(){
        const urlBase = `http://localhost:8080/api/students/${params.id}`;

        const data = {

            'name'     : studentName,
            'email'    : studentEmail,
            'telephone': studentTelephone,
            'house'    : studentHouse,

            'street_avenue' : studentStreetAvenue,
            'district'      : studentDistrict,
            'state'         : studentState,
            'city'          : studentCity

        }

        await axios.put(urlBase, data)
        .then((response) => {
            const data = response.data;

            if(data.error){
                toast.error(data.message);
            } else {
                toast.success(data.message);
            }

        })
        .catch((error) => {
            toast.error('Somenthing wrong happend :(');
        })
   }


    if(loadingStudent){
        return (
            <div className='loadingPage'>
                <div className='loadingContent'>
                  <h5>
                      {awaitingText}
                      <AiOutlineLoading3Quarters size={40} />
                  </h5>
                  </div>
            </div>
          );
    }
    

    return (
        <div id='studentInfo' className='AppContent'>
            <div className='cardStudent'>
                <div className='cardTitle'>
                    <h1>{studentName}</h1>
                </div>
                <div className='cardBody'>
                    <div className='row'>
                        <div className='studentPhoto'>
                            <div className='cardPhoto' >
                                {studentPhoto ? 
                                    <img src={`http://localhost:8080/api/photos/${studentPhoto}`} id='studentProfilePhoto' alt='Student Profile Pic' />
                                    :
                                    <BsPersonBoundingBox size={80} />
                                }
                            </div>
                            <button type='button' className='alterPhoto' onClick={() => document.getElementById('image-upload').click()}>Alter Photo</button>
                            <input type='file' id='image-upload' style={{'display': 'none'}} accept='imagem/*'  onChange={handleFile}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='personalInfo'>
                            <div className='infoStudent'>
                                <label>Name</label>
                                <input type='text' className='form-field'  name='student-name' value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                            </div>
                            <div className='infoStudent'>
                                <label>E-mail</label>
                                <input type='text' className='form-field'  name='student-email' value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
                            </div>
                            <div className='infoStudent'>
                                <label>Telephone</label>
                                <input type='text'className='form-field' placeholder='(00) 00000-0000' name='student-email' value={studentTelephone} onChange={(e) => handleTelephone(e)} />
                            </div>
                            <div className='infoStudent'>
                                <label>House</label>
                                <select className='select-field' name='student-house' value={studentHouse} onChange={(e) => setStudentHouse(e.target.value)} >
                                    <option value='G'>Gryffindor</option>
                                    <option value='H'>Hufflepuff</option>
                                    <option value='R'>Ravenclaw</option>
                                    <option value='S'>Slytherin</option>
                                </select>
                            </div>
                        </div>
                        <div className='addressInfo'>
                            <div className='row'>
                                <div className='infoStudent'>
                                    <label>Street/Avenue</label>
                                    <input type='text' className='form-field'  name='student-street' value={studentStreetAvenue} onChange={(e) => setStudentStreetAvenue(e.target.value)} />
                                </div>
                                <div className='infoStudent'>
                                    <label>District</label>
                                    <input type='text' className='form-field'  name='student-district' value={studentDistrict} onChange={(e) => setStudentDistrict(e.target.value)} />
                                </div>
                                <div className='infoStudent'>
                                    <label>State</label>
                                    <input type='text' className='form-field'  name='student-state' value={studentState} onChange={(e) => setStudentState(e.target.value)} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='infoStudent'>
                                    <label>City</label>
                                    <input type='text' className='form-field'  name='student-city' value={studentCity} onChange={(e) => setStudentCity(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='saveButton'>
                            <button type='button' className='buttonBack' onClick={() => navigate('/home') } >Back</button>
                            <button type='button' className='buttonSave' onClick={() => updateStudentInfo()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Student;