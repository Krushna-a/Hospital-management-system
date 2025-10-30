import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { userRole } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/api/profile/me');
        setProfile(response.data);
        setFormData(response.data);
      } catch (error) {
        toast.error('Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5001/api/profile/me', formData);
      setProfile(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Could not load profile.</div>;

  const renderDoctorProfile = () => (
    <>
      <div><span className="font-semibold">Specialty:</span> {profile.specialty}</div>
      <div><span className="font-semibold">Bio:</span> {profile.bio}</div>
      <div><span className="font-semibold">Contact:</span> {profile.contact_number}</div>
    </>
  );

  const renderPatientProfile = () => (
    <>
      <div><span className="font-semibold">Blood Group:</span> {profile.blood_group}</div>
      <div><span className="font-semibold">Address:</span> {profile.address}</div>
      <div><span className="font-semibold">Contact:</span> {profile.contact_number}</div>
    </>
  );

  const renderDoctorEditForm = () => (
    <>
      <input name="specialty" value={formData.specialty || ''} onChange={handleInputChange} placeholder="Specialty" className="p-2 border rounded w-full" />
      <textarea name="bio" value={formData.bio || ''} onChange={handleInputChange} placeholder="Bio" className="p-2 border rounded w-full" />
      <input name="contactNumber" value={formData.contact_number || ''} onChange={handleInputChange} placeholder="Contact Number" className="p-2 border rounded w-full" />
    </>
  );

  const renderPatientEditForm = () => (
    <>
      <input name="bloodGroup" value={formData.blood_group || ''} onChange={handleInputChange} placeholder="Blood Group" className="p-2 border rounded w-full" />
      <input name="address" value={formData.address || ''} onChange={handleInputChange} placeholder="Address" className="p-2 border rounded w-full" />
      <input name="contactNumber" value={formData.contact_number || ''} onChange={handleInputChange} placeholder="Contact Number" className="p-2 border rounded w-full" />
    </>
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="full_name" value={formData.full_name || ''} onChange={handleInputChange} placeholder="Full Name" className="p-2 border rounded w-full" />
          <input name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="Email" className="p-2 border rounded w-full" />
          {userRole === 'doctor' ? renderDoctorEditForm() : renderPatientEditForm()}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Cancel</button>
        </form>
      ) : (
        <div className="space-y-2">
          <div><span className="font-semibold">Name:</span> {profile.full_name}</div>
          <div><span className="font-semibold">Email:</span> {profile.email}</div>
          <div><span className="font-semibold">Role:</span> {userRole}</div>
          {userRole === 'doctor' ? renderDoctorProfile() : renderPatientProfile()}
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
