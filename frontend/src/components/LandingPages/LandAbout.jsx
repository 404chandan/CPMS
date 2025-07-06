import React from 'react';
import Student from '../../assets/student.jpg';
import TPO from '../../assets/tpo.jpeg';
import Management from '../../assets/management.jpg';
import Admin from '../../assets/admin.jpg';

function LandAbout() {
  const roles = [
    {
      title: "Student",
      image: Student,
      description:
        "Students can register, explore job opportunities, apply for jobs, and track application status with a personalized dashboard.",
    },
    {
      title: "Training & Placement Coordinators",
      image: TPO,
      description:
        "Facilitates smooth campus recruitment by connecting students with companies and managing placement processes efficiently.",
    },
    // {
    //   title: "Supervisors",
    //   image: Management,
    //   description:
    //     "Management can monitor overall placement activities, review analytics, and control system access and quality assurance.",
    // },
    {
      title: "Placement Stats",
      image: Admin,
      description:
        "Placement statistics provide insights into student placements, company participation, and overall placement success rates.",
    },
  ];
    const loginLinks = [
  { label: 'Login as TPO', path: '/tpo/login' },
  { label: 'Login as Management', path: '/management/login' },
  { label: 'Login as Super Admin', path: '/admin' },
];

  return (
    <div
      id="about"
      className="bg-gradient-to-tr from-[#7C3AED] via-[#A78BFA] to-[#C4B5FD] pb-20"
    >
      <br />
      <br />

                {/* Admin Login Buttons */}
        <div className="flex flex-wrap justify-center items-center max-md:gap-3 md:gap-6 mb-8">
          {loginLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => navigate(link.path)}
              className="bg-[#146b23] hover:bg-purple-500 px-5 py-2 rounded-md text-white text-sm font-medium shadow-md transition-all duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-3 playfair">About TPMS</h2>
        <p className="text-md md:text-lg max-w-3xl mx-auto text-gray-700 px-3">
          Developed by Three final year students (Adarsh kr, Chandan & Gangadhar) of National Institute of Technology Jamshedpur, TPMS (Training and Placement Management System) is a powerful web-based platform to streamline and manage campus placements efficiently.
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-stretch gap-10">
        {roles.map((role, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 shadow-lg rounded-xl w-80 max-md:py-3 max-md:px-2 md:p-5 flex flex-col items-center transform hover:scale-105 transition duration-300"
          >
            <img
              src={role.image}
              alt={role.title}
              className="w-48 h-48 object-cover rounded-full border-4 border-green-300 shadow-md"
            />
            <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2 text-green-700 text-center">{role.title}</h3>
            <p className="text-gray-600 text-sm text-center">{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandAbout;
