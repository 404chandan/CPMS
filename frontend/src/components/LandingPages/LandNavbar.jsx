import React, { useEffect, useState } from 'react';
import Logo from '../../assets/CPMS.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LandingNavbar() {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [buttonSize, setButtonSize] = useState('lg');
  const [logoText, setLogoText] = useState('College Placement Management System');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setButtonSize('sm');
        setLogoText('CPMS');
      } else if (width <= 768) {
        setButtonSize('md');
        setLogoText('Training and Placement Management System');
      } else {
        setButtonSize('lg');
        setLogoText('Training and Placement Management System');
      }
    };

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'backdrop-blur-md bg-white/60 shadow-md sticky top-0' : ''
        }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center py-2 px-3">
        {/* Logo Section */}
        <div
          className="flex items-center max-md:gap-2 md:gap-4 cursor-pointer transition-transform hover:scale-105 duration-150"
          onClick={() => navigate('/')}
        >
          <img
            src={Logo}
            alt="CPMS Logo"
            className="rounded-xl border border-gray-300 w-5 h-5 md:w-8 md:h-10 shadow-sm"
          />
          <h1 className={`text-2xl md:text-4xl font-extrabold text-purple-700`}>
            {logoText}
          </h1>
        </div>

        {/* Button Section */}
        <div className="flex max-md:gap-1 md:gap-3 items-center">
          <Button
            variant="outline-primary"
            size={buttonSize}
            className="transition-all hover:scale-105 hover:shadow-md px-3 md:w-32"
            onClick={() => navigate('/student/login')}
          >
            Login
          </Button>

          <Button
            variant="success"
            size={buttonSize}
            className="bg-purple-600 text-white hover:bg-purple-700 transition-all hover:scale-105 hover:shadow-md px-3 md:w-32"
            onClick={() => navigate('/student/signup')}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;
