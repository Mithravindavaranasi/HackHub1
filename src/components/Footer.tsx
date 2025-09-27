import React from 'react';
import { FileText, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-blue-400 mr-2" />
              <h3 className="text-2xl font-bold">SmartDoc</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Smart document checker analysis platform powered by  AI. 
              Helping businesses and researchers analyze text content with precision and speed.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@smartdoc.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Document Analyzer
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 9000987689</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Hyderabad,India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 SmartDoc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
