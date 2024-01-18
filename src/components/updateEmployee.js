import React from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function UpdateEmployee() {

    let navigate = useNavigate();

    const{id} = useParams();

    const [employee, setEmployee] = useState({
        name:'',
        email:'',
        salary:''
    });

    const {name, email, salary} = employee;
    
    const loadEmployee = async () => {
        let result = await axios.get(`http://localhost:8080/employee/${id}`)
        setEmployee(result.data);
    }

    useEffect(() => {
        loadEmployee();
    }, [])

    const onInputChange = (e) => {
        setEmployee({...employee, [e.target.name]:e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/employee/${id}`, employee);
        navigate("/");
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Employee</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='name' className='form-label'>Name</label>
                            <input type='text' className='form-control' name='name' value={name} onChange={(e) => (onInputChange(e))}></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input type='text' className='form-control' name='email' value={email} onChange={(e) => (onInputChange(e))}></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='salary' className='form-label'>Salary</label>
                            <input type='text' className='form-control' name='salary' value={salary} onChange={(e) => (onInputChange(e))}></input>
                        </div>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        <Link to='/' className='btn btn-outline-danger mx-2'>Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
