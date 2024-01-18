import React from 'react';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function EmployeeIndex() {

    const[employees, setEmployees] = useState([]);

    useEffect(() => {

        const apiUrl = 'http://localhost:8080/employee';

        axios.get(apiUrl)
        .then(response => {

            setEmployees(response.data);
            // console.log(response.data)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []); 

    const handleDelete = async (recordId) => {

        const isConfirmed = window.confirm('Are you sure you want to delete this record?');

        if (isConfirmed) {
        try {
            await axios.delete(`http://localhost:8080/employee/${recordId}`);

            const updatedData = await axios.get('http://localhost:8080/employee');
            setEmployees(updatedData.data);
        } catch (error) {
            console.error('Error deleting record:', error);
        }
        }
    };

    return (
        <div className='mt-3 w-75'>
            <h2 className=''>Simple Employee API</h2>
            <table className="table table-success table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <th scope="row">{employee.id}</th>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <button onClick={() => handleDelete(employee.id)} className="btn btn-danger mx-2"><i className="fa-solid fa-trash"></i></button>

                                <Link to={`/updateEmployee/${employee.id}`} className="btn btn-success"><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-end">
                <Link to='/createEmployee' className="btn btn-outline-primary"><i className="fa-solid fa-plus ml-2"></i>Add Employee</Link>
            </div>
        </div>
    )
}
export default EmployeeIndex;
