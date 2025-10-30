import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import Appointment from './Pages/Appointment';
import Appointments from './Pages/Appointments';
import Doctors from './Pages/Doctors';
import Patients from './Pages/Patients'; // Assuming this page exists for doctors
import ProtectedRoute from './Components/ProtectedRoute';

// Placeholder components for routes that don't have a file yet.
const Bills = () => <div>Patient Bills Page</div>;
const Profile = () => <div>User Profile Page</div>;
const DoctorManagement = () => <div>Admin: Doctor Management</div>;
const PatientManagement = () => <div>Admin: Patient Management</div>;
const Inventory = () => <div>Admin: Inventory Management</div>;

const App = () => {
  return (
    <div className=''>
      <Navbar />
      <div className='h-20'></div>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/appointment' element={<Appointment />} />

        {/* Patient & Doctor Routes */}
        <Route element={<ProtectedRoute allowedRoles={['patient', 'doctor']} />}>
          <Route path='/appointments' element={<Appointments />} />
          <Route path='/profile' element={<Profile />} />
        </Route>

        {/* Patient Only Routes */}
        <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
          <Route path='/bills' element={<Bills />} />
        </Route>

        {/* Doctor Only Routes */}
        <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
          <Route path='/patients' element={<Patients />} />
        </Route>

        {/* Admin Only Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path='/admin/doctors' element={<DoctorManagement />} />
          <Route path='/admin/patients' element={<PatientManagement />} />
          <Route path='/admin/inventory' element={<Inventory />} />
        </Route>

      </Routes>
      <Footer />
    </div>
  );
};

export default App;