import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFacebook, 
  faTwitter, 
  faInstagram,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Logo</h3>
          <p className="text-gray-400">
            Providing quality healthcare services with compassion and excellence 
            since 2010. Our team of dedicated professionals is here for you.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/doctors" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Our Doctors
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/services" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/appointments" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Our Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white transition-colors cursor-pointer">General Medicine</li>
            <li className="hover:text-white transition-colors cursor-pointer">Cardiology</li>
            <li className="hover:text-white transition-colors cursor-pointer">Neurology</li>
            <li className="hover:text-white transition-colors cursor-pointer">Pediatrics</li>
            <li className="hover:text-white transition-colors cursor-pointer">Dermatology</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Contact Us</h3>
          <div className="space-y-3 text-gray-400">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1" />
              <p>VIT Pune</p>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faPhone} />
              <p>+91 1234567890</p>
            </div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>info@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
        <p>&copy; {currentYear} MediCare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;