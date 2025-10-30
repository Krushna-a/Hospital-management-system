-- Seed data for Hospital Management System
-- This file should be run after the schema is created.
-- The password for all users is: password123

USE hospital_management;

-- Clear existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE bills;
TRUNCATE TABLE appointments;
TRUNCATE TABLE doctors;
TRUNCATE TABLE patients;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Hashed password for 'password123'
SET @password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

-- USERS
INSERT INTO users (id, full_name, email, password_hash, role) VALUES
(1, 'Admin User', 'admin@hospital.com', @password_hash, 'admin'),
(2, 'Dr. Benjamin Carter', 'b.carter@hospital.com', @password_hash, 'doctor'),
(3, 'Dr. Olivia Chen', 'o.chen@hospital.com', @password_hash, 'doctor'),
(4, 'Michael Rodriguez', 'm.rodriguez@email.com', @password_hash, 'patient'),
(5, 'Jessica Lowell', 'j.lowell@email.com', @password_hash, 'patient'),
(6, 'David Smith', 'd.smith@email.com', @password_hash, 'patient');

-- DOCTORS
INSERT INTO doctors (id, user_id, specialty, age, gender, contact_number, bio) VALUES
(1, 2, 'Cardiology', 45, 'male', '555-0101', 'Experienced cardiologist with over 15 years of practice.'),
(2, 3, 'Neurology', 38, 'female', '555-0102', 'Specializes in neurological disorders and patient care.');

-- PATIENTS
INSERT INTO patients (id, user_id, blood_group, address, contact_number) VALUES
(1, 4, 'AB+', '123 Maple Street, Anytown', '555-1000'),
(2, 5, 'O+', '456 Oak Avenue, Anytown', '555-1918'),
(3, 6, 'A-', '789 Pine Lane, Anytown', '555-2222');

-- APPOINTMENTS
INSERT INTO appointments (id, patient_id, doctor_id, appointment_date, appointment_time, reason_for_visit, status) VALUES
(1, 1, 1, CURDATE() + INTERVAL 2 DAY, '09:00-10:00', 'Annual heart checkup', 'confirmed'),
(2, 2, 2, CURDATE() + INTERVAL 3 DAY, '11:00-12:00', 'Migraine consultation', 'pending'),
(3, 3, 1, CURDATE() - INTERVAL 5 DAY, '14:00-15:00', 'Follow-up on blood pressure', 'completed'),
(4, 1, 2, CURDATE() + INTERVAL 1 WEEK, '10:00-11:00', 'Headache follow-up', 'confirmed');

-- BILLS
-- Note: This assumes the appointments above were created with IDs 1, 2, 3, 4
INSERT INTO bills (patient_id, appointment_id, amount, issue_date, due_date, status) VALUES
(3, 3, 350.00, CURDATE() - INTERVAL 5 DAY, CURDATE() + INTERVAL 25 DAY, 'unpaid'),
(1, 1, 150.00, CURDATE() - INTERVAL 10 DAY, CURDATE() + INTERVAL 20 DAY, 'paid');

