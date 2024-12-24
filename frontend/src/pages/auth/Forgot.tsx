import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils/Utils';
import Button from '../../components/home/common/Button';
const Forgot = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.toLowerCase());
  };

  const validateForm = () => {
    if (!email) {
      handleError('Email is required');
      return false;
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      handleError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const url = `http://localhost:5000/auth/forgot-password`;
      console.log({ email }); // Log the email to check
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      const result = await response.json();
      const { success, message, error } = result;
      
      if (success) {
        handleSuccess(message || 'Password reset link has been sent to your email');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else {
        handleError(message || 'Failed to send reset link');
      }
    } catch (err) {
      handleError('An error occurred while processing your request');
    }
  };

  return (
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
      <ToastContainer />
      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden ">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-b from-[#7000FF] to-[#0a0a0a] lg:px-8 px-4 py-4">
        <div className="text-2xl font-bold text-white">
            Money<span className="text-green-300">Loyal</span>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Password Recovery</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Don't worry! It happens to the best of us. Enter your email and we'll help you reset your password.
            </p>
          </div>
          <div>
            <h4 className="text-white text-lg font-semibold">Secure Reset Process</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
              We'll send you a secure link to reset your password. The link will expire after 24 hours for your security.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-2 w-full py-6 px-6 sm:px-16">
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">Reset Your Password</h3>
            <p className="text-gray-500 text-sm mt-2">
              Enter your registered email address. We'll send you a code to reset your password.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
              <div className="relative flex items-center">
                <input 
                  name="email" 
                  type="email" 
                  required 
                  value={email}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-purple-600" 
                  placeholder="Enter your email" 
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div className="!mt-12">
            <Button 
              type="submit"
              variant="purple"
              className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
            >
              Send Reset Link
            </Button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">
            Remember your password?{' '}
            <Link to="/login" className="text-purple-600 font-semibold hover:underline ml-1">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Forgot;