import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import EmployeeIndex from './components/index';
import EmployeeForm from './components/AddEmployee';
import EmployeeUpdateForm from './components/updateEmployee';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App flex flex-column align-items-center">
      <Router>
        <Routes>
          <Route exact path='/' element={<EmployeeIndex />}></Route>
          <Route exact path='/createEmployee' element={<EmployeeForm />}></Route>
          <Route exact path='/updateEmployee/:id' element={<EmployeeUpdateForm />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
