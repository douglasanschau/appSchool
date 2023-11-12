import { useEffect, useContext, useState  } from 'react'; 

import './home.css';
import  DataTableStudents  from '../../components/DataTableStudents';

import { Tooltip } from 'react-tooltip';
import { toast } from 'react-toastify';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ModalNewStudent from '../../components/ModalNewStudent';

import { BsPersonCircle } from "react-icons/bs";
import { MdLogout, MdPersonRemoveAlt1 }  from "react-icons/md";

import { AuthContext } from '../../contexts/auth';

import axios from 'axios';

function Home() {
     
    const { logoutUser } = useContext(AuthContext);


    const [ tablePending, setTablePending ] = useState(false);
    const [ tableResults, setTableResults ] = useState([]);
    const [ tableData, setTableData ] = useState([]);

    const [ modalNewStudent, setModalNewStudent ] = useState(false);

    const tableColumns = [
        {
            'name' : 'Student',
            selector: row => row.name,
            sortable: true,
        }, 
        {
            'name' : 'Email',
            selector: row => row.email,
            sortable: true,
        }, 
        {
            'name' : 'Telephone',
            selector: row => row.telephone,
            sortable: true,
        }, 
        {
            'name' : 'House',
            selector: row => row.house,
            sortable: true,

        },
        {
            'name' : '',
            'style' : {
                minHeight: '70px',
                justifyContent: 'flex-end'
            },
            'width' : '12%',
            selector: row => actionsStudentes(row.id),
            sortable: false,

        }, 
    ];

    function handleNewStudent(){
        setModalNewStudent(!modalNewStudent);
    }

    useEffect(() =>{

        setTablePending(true);
        loadStudents();

    }, []);

    async function loadStudents(){
        const urlBase = 'http://localhost:8080/api/students';

        await axios.get(urlBase)
        .then(async (response) =>  {
            const data = response.data;

            setTableResults(data.students);
            setTableData(data.students);
            setTablePending(false);
        })
        .catch((e) => {
            toast.error('Somenthing wrong happend :(');
            setTablePending(false);
        })
    }

    function actionsStudentes(id){
        return (
            <div className='actionsStudents'>
                <Tooltip id="tooltipEditStudent" />
                <a href={'/student/' + id}  data-tooltip-id="tooltipEditStudent" data-tooltip-content="Edit Student Profile" >
                    <BsPersonCircle size={25}  style={{color:'#198754'}} />
                </a>
                <Tooltip id="tooltipRemoveStudent" />
                <a href='#' onClick={() => confirmDeleteUser(id)} data-tooltip-id="tooltipRemoveStudent" data-tooltip-content="Remove Student Registration" >
                    <MdPersonRemoveAlt1 size={25}  style={{color:'#198754'}} />
                </a>
            </div>
        );
    }

    function confirmDeleteUser(id){
        withReactContent(Swal).fire({
            title: 'Attention!',
            text: 'Do you want to remove this student register?',
            icon: 'info',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true,
        }).then((result) => {
             if(result.isConfirmed){
                deleteUser(id);
             }
        });
    }

    async function deleteUser(id){
        const urlBase = `http://localhost:8080/api/students/${id}`;

        await axios.delete(urlBase)
        .then(async (response) =>  {
            const data = response.data;

            if(data.error) {
                toast.error('It wasn\'t possible to delete this student registration.');
            } else {
                toast.success('User deleted successfully');
                setTablePending(true);
                loadStudents();
            }
        })
        .catch((e) => {
            toast.error('Somenthing wrong happend :(');
        })
    }


    return (
        <div id='homePage' className='AppContent'>
            <div className='logOut'>
                <Tooltip id="tooltipLogOut" place={'left'} />
               <button type='button' data-tooltip-id="tooltipLogOut" onClick={() => logoutUser()} data-tooltip-content="Log Out">
                  <MdLogout size={35} />
               </button>

            </div>
           <div className='cardContent'>
                <div className='cardTitle'>
                    <h1>List of Students</h1>
                </div>
                <div className='cardBody'>
                    <div className='actions'>
                        <button type='button' className='newStudent' onClick={() => handleNewStudent()}>New Student</button>
                    </div>
                    <div className='dataTable'>
                        {DataTableStudents('', tableColumns, tableData, tablePending)}
                    </div>
                    {modalNewStudent && (
                        <ModalNewStudent setModalNewStudent={setModalNewStudent} modalNewStudent={modalNewStudent} />
                    )}
                </div>
           </div>
        </div>
    );
}

export default Home;