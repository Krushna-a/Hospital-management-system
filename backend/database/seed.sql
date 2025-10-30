-- Seed data for Hospital Management System

USE hospital_management;

-- Insert sample users
INSERT INTO users (full_name, email, password_hash, role) VALUES
('Dr. John Smith', 'john.smith@hospital.com', '$2a$10$example.hash.for.doctor', 'doctor'),
('Dr. Sarah Johnson', 'sarah.johnson@hospital.com', '$2a$10$example.hash.for.doctor2', 'doctor'),
('Dr. Michael Brown', 'michael.brown@hospital.com', '$2a$10$example.hash.for.doctor3', 'doctor'),
('Alice Wilson', 'alice.wilson@email.com', '$2a$10$example.hash.for.patient', 'patient'),
('Bob Davis', 'bob.davis@email.com', '$2a$10$example.hash.for.patient2', 'patient'),
('Admin User', 'admin@hospital.com', '$2a$10$example.hash.for.admin', 'admin');

-- Insert doctor profiles
INSERT INTO doctors (user_id, specialty, age, gender, contact_number, bio) VALUES
(1, 'Cardiology', 45, 'male', '+1234567890', 'Experienced cardiologist with 20+ years in heart disease treatment'),
(2, 'Neurology', 38, 'female', '+1234567891', 'Specialist in neurological disorders and brain health'),
(3, 'Orthopedics', 50, 'male', '+1234567892', 'Expert in bone and joint surgeries and treatments');

-- Insert patient profiles
INSERT INTO patients (user_id, blood_group, address, contact_number) VALUES
(4, 'A+', '123 Main St, City, State 12345', '+1987654321'),
(5, 'O-', '456 Oak Ave, City, State 12346', '+1987654322');

-- Insert sample appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, reason_for_visit, status) VALUES
(1, 1, '2024-01-15', '09:00-10:00', 'Regular checkup', 'confirmed'),
(1, 2, '2024-01-20', '14:00-15:00', 'Headache consultation', 'pending'),
(2, 3, '2024-01-18', '10:00-11:00', 'Back pain', 'confirmed');
