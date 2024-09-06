import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Appointment from './components/Appointment'
import AboutUs from './components/AboutUs'
import Register from './components/Register'
import "react-toastify/dist/ReactToastify.css";
import Patient_login from './components/PatientLogin'
import Dashboard from './admin/Dashboard'
import Login from './admin/Login'
import Doctors from './admin/Doctors'
import AddDoctor from './admin/AddDoctor'
import AddAdmin from './admin/AddAdmin'
import Messages from './admin/Messages'
import ViewDoctor from './admin/ViewDoctor'
import TodayAppointment from './admin/TodayAppointment'
import DeptLogin from './admin/department/DeptLogin'
import DeptDashboard from './admin/department/DeptDashboard'
import DeptPatients from './admin/department/DeptPatients'
import DeptAppointment from './admin/department/DeptAppointment'
import DoctorProfile from './admin/department/DoctorProfile'
import Department from './admin/Department'
import AddDepartment from './admin/AddDepartment'

const comp = '<App></App>'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:id' element={<Home />}></Route>
        <Route path='/:id/appointment' element={<Appointment />}></Route>
        <Route path='/:id/about' element={<AboutUs />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Patient_login />}></Route>
        <Route path='/adminlogin' element={<Login />}></Route>
        <Route path='/admin_dashboard' element={<Dashboard />}> </Route>
        <Route path='/admin_dashboard/doctors' element={<Doctors />}> </Route>
        <Route path='/admin_dashboard/appointments' element={<TodayAppointment />}> </Route>
        <Route path='/admin_dashboard/view_doctor/:id' element={<ViewDoctor />}> </Route>
        <Route path='/admin_dashboard/doctor/addnew' element={<AddDoctor />}></Route>
        <Route path='/admin_dashboard/admin/addnew' element={<AddAdmin />}></Route>
        <Route path='/admin_dashboard/department' element={<Department />}></Route>
        <Route path='/admin_dashboard/add_department' element={<AddDepartment />}></Route>
        <Route path='/admin_dashboard/messages' element={<Messages />}></Route>
        <Route path='/deptlogin' element={<DeptLogin />}></Route>
        <Route path='/dept_dashboard' element={<DeptDashboard />}></Route>
        <Route path='/dept_dashboard/appointments' element={<DeptAppointment />}></Route>
        <Route path='/dept_dashboard/patients' element={<DeptPatients />}></Route>
        <Route path='/dept_dashboard/doctor_profile' element={<DoctorProfile />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
