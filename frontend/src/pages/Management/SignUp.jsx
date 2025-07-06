import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from "../../assets/CPMS.png";
import Toast from '../../components/Toast';
import isAuthenticated from '../../utility/auth.utility';
import { BASE_URL } from '../../config/backend_url';

function ManagementSignup() {
  document.title = 'TPMS | Management Sign Up';
  const navigate = useNavigate();
  const location = useLocation();

  const prefillEmail = location?.state?.prefillEmail || '';

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("../management/dashboard");
    }
  }, [navigate]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: prefillEmail,
    number: '',
    password: '',
  });

  const { name, number, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'name') setError({ ...error, name: '' })
    if (e.target.name === 'email') setError({ ...error, email: '' })
    if (e.target.name === 'number') setError({ ...error, number: '' })
    if (e.target.name === 'password') {
      setError({ ...error, password: '' })
      if (!validatePassword(e.target.value)) setError({ ...error, password: 'Password must include at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character' })
    }
  }

  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !name && !number && !password) {
      return setError({ email: 'Email Required!', name: 'Name Required!', number: 'Number Required!', password: 'Password Required!' });
    }
    if (!email || !name || !number || !password) {
      let emailError, nameError, numberError, passwordError;
      if (!email) emailError = 'Email Required!';
      if (!name) nameError = 'Name Required!';
      if (!number) numberError = 'Number Required!';
      if (!password) passwordError = 'Password Required!';
      setError({ email: emailError, name: nameError, number: numberError, password: passwordError });
      return;
    }

    if (!validatePassword(password)) return setError({ password: 'Password must include at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character' });

    if (number.length !== 10) return setError({ ...error, number: 'Phone number must be exactly 10 digits' });

    try {
      const response = await axios.post(`${BASE_URL}/management/signup`, formData);
      setToastMessage("Management Account Created Successfully!");
      setShowToast(true);

      const dataToPass = {
        showToastPass: true,
        toastMessagePass: "Management Account Created Successfully!"
      };
      navigate('../management/login', { state: dataToPass });
    } catch (error) {
      if (error.response?.data?.msg) {
        setToastMessage(error.response.data.msg);
        setShowToast(true);
      }
      console.error("Management Signup Error:", error);
    }
  }

  const [isEyeOpen, setEyeOpen] = useState(false);
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

      <div className="flex justify-center items-center py-2 min-h-screen bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300">
        <form className="form-signin flex justify-center items-center flex-col gap-3 backdrop-blur-md bg-white/30 border border-white/20 rounded-lg shadow shadow-indigo-400 p-8 w-1/3 max-lg:w-2/3 max-md:w-3/4 max-[400px]:w-4/5" onSubmit={handleSubmit}>
          <div className='flex justify-center items-center flex-col'>
            <img className="mb-4 rounded-xl shadow w-30 h-28 lg:w-40 lg:h-40" src={Logo} alt="Logo" />
            <h1 className="h3 mb-3 font-weight-normal">Sign Up as Management</h1>
          </div>
          <div className="w-full">
            <input type="text" placeholder="Name" name="name" value={name} onChange={handleChange} className="form-control ml-1" autoComplete='name' />
            <div className="text-red-500 ml-2"><span>{error?.name}</span></div>
          </div>
          <div className="w-full">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={handleChange} className="form-control ml-1" autoComplete='email' />
            <div className="text-red-500 ml-2"><span>{error?.email}</span></div>
          </div>
          <div className="w-full">
            <input type="number" placeholder="Phone Number" name="number" value={number} onChange={handleChange} className="form-control ml-1"
              onInput={(e) => {
                if (e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
              }} />
            <div className="text-red-500 ml-2"><span>{error?.number}</span></div>
          </div>
          <div className="w-full">
            <div className="flex items-center">
              <input type={isEyeOpen ? "text" : "password"} placeholder="Password" name="password" value={password} onChange={handleChange} className="form-control" autoComplete='new-password' />
              <i className={`${isEyeOpen ? "fa-solid fa-eye" : "fa-regular fa-eye-slash"} -ml-6 cursor-pointer`} onClick={handleEye}></i>
            </div>
            <div className="text-red-500 ml-2"><span>{error?.password}</span></div>
          </div>
          <div className="flex justify-center items-center flex-col">
            <button className="btn btn-primary btn-block" type="submit">Sign Up</button>
          </div>
          <span className='text-center'>Already have an account?
            <span className='text-blue-500 font-bold cursor-pointer px-1' onClick={() => navigate('../management/login')}>Login</span>
          </span>
          <p className="text-muted text-center text-gray-400">© College Placement Management System 2024 - 25</p>
        </form>
      </div>
    </>
  );
}

export default ManagementSignup;
