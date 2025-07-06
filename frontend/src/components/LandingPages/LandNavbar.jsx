import React, { useEffect, useState } from 'react';
import Logo from '../../assets/CPMS.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function LandingNavbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [buttonSize, setButtonSize] = useState('lg');
  const [logoText, setLogoText] = useState('TPMS');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);

    const handleResize = () => {
      const width = window.innerWidth;
      setButtonSize(width <= 600 ? 'sm' : 'md');
      setLogoText('TPMS');
    };

    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Placements', id: 'placement-stats' },
    { label: 'Coordinators', id: 'placement-coordinators' },
  ];

  return (
    <header
      className={`w-full z-50 transition-all duration-300 ${
        isScrolled ? 'sticky top-0 backdrop-blur-lg bg-white/80 shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-5">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={() => navigate('/')}
        >
          <img
            src={Logo}
            alt="TPMS Logo"
            className="w-10 h-10 rounded-xl border border-gray-300 shadow-sm object-contain"
          />
          <h1 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-purple-700 whitespace-nowrap">
            {logoText}
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-base font-medium text-gray-800">
          {navItems.map(({ label, id }) => (
           <a key={id}
  href={`#${id}`}
  className="relative group no-underline text-gray-700 hover:text-purple-700 transition-colors duration-200"
>
  <span>{label}</span>
  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-purple-700 transition-all duration-300 group-hover:w-full" />
</a>

          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex gap-2 md:gap-3">
          <Button
            variant="outline-primary"
            size={buttonSize}
            className="transition-all duration-200 hover:scale-105 hover:shadow-sm px-3 md:w-28"
            onClick={() => navigate('/student/login')}
          >
            Login
          </Button>
          <Button
            variant="success"
            size={buttonSize}
            className="bg-purple-600 border-purple-600 text-white hover:bg-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-sm px-3 md:w-28"
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
