import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-10 py-4 bg-white shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png"
            alt="ProHealth Logo"
            className="h-10 mr-4" // Adjusted the height of the logo to be smaller
          />
          <span className="font-bold text-xl text-blue-900">TheraWell</span> {/* Adjusted font size to be smaller */}
        </div>
        <ul className="hidden md:flex space-x-12">
          <li>
            <a
              href="/"
              className="text-blue-900 hover:text-blue-600 text-lg font-medium relative after:absolute after:bg-blue-600 after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/aboutus"
              className="text-blue-900 hover:text-blue-600 text-lg font-medium relative after:absolute after:bg-blue-600 after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/catalog"
              className="text-blue-900 hover:text-blue-600 text-lg font-medium relative after:absolute after:bg-blue-600 after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
            >
              Find Doctor
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-blue-900 hover:text-blue-600 text-lg font-medium relative after:absolute after:bg-blue-600 after:h-0.5 after:w-0 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
