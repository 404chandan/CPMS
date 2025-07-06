import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/CPMS.png';
import Toast from '../../components/Toast';
import isAuthenticated from '../../utility/auth.utility';
import { BASE_URL } from '../../config/backend_url';
import { Button } from 'react-bootstrap';

function Login() {
  document.title = 'TPMS | Student Login';
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isEyeOpen, setEyeOpen] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("../student/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'email') return setError({ ...error, email: '' });
    if (e.target.name === 'password') return setError({ ...error, password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) return setError({ email: 'Email Required!', password: 'Password Required!' });
    if (!email) return setError({ email: 'Email Required!' });
    if (!password) return setError({ password: 'Password Required!' });

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/student/login`, formData);
      localStorage.setItem('token', response.data.token);
      navigate('../student/dashboard');
    } catch (error) {
      if (error?.response?.data?.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
      console.error("Error in Student login.jsx => ", error);
      setLoading(false);
    }
  };

  const { showToastPass, toastMessagePass } = location.state || {};
  useEffect(() => {
    if (showToastPass) {
      setToastMessage(toastMessagePass);
      setShowToast(showToastPass);
      navigate('.', { replace: true, state: {} });
    }
  }, []);

  const handleEye = () => setEyeOpen(!isEyeOpen);

  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        delay={3000}
        position="bottom-end"
      />

      <div className="relative min-h-screen flex items-center justify-center px-4">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm scale-105 z-0"
          style={{
            backgroundImage: "url('https://media.collegedekho.com/media/img/institute/crawled_images/None/AGHGFHJFGHJGJ.jpg?width=1080')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Form */}
        <form
          className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300 border border-white/20"
          onSubmit={handleSubmit}
        >
          <div className="text-center">
            <img src={Logo} alt="CPMS Logo" className="mx-auto h-20 w-20 lg:h-24 lg:w-24 rounded-xl shadow-md mb-4" />
            <h1 className="text-2xl font-bold text-gray-800">Student Login</h1>
            <p className="text-sm text-gray-500">Welcome back to TPMS</p>
          </div>

          <div>
            <label htmlFor="inputEmail" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            {error?.email && <p className="text-sm text-red-600 mt-1">{error.email}</p>}
          </div>

          <div>
            <label htmlFor="inputPassword" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={isEyeOpen ? 'text' : 'password'}
                id="inputPassword"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none pr-10"
              />
              <i
                className={`absolute top-2.5 right-3 cursor-pointer text-gray-500 ${isEyeOpen ? 'fa-solid fa-eye' : 'fa-regular fa-eye-slash'}`}
                onClick={handleEye}
              ></i>
            </div>
            {error?.password && <p className="text-sm text-red-600 mt-1">{error.password}</p>}
          </div>

          <div className="text-center">
            <Button
              type="submit"
              variant="primary"
              className="w-full py-2 font-semibold rounded-md transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?
            <span
              className="text-indigo-600 font-medium cursor-pointer ml-1 hover:underline"
              onClick={() => navigate('../student/signup')}
            >
              Sign up
            </span>
          </div>

          <p className="text-xs text-center text-gray-400 mt-4">
            © Training Placement Management System 2024 - 25
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
