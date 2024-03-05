import React, { useState } from 'react'
import loginpic from '../../assets/signup.png'
import '../login/login.css'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { userRegister } from "../../api/api";
import Header from '../header/Header';
function Signup() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    let { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      if (!/\S+@\S+\.\S+/.test(userData.email)) {
        toast.error("Invalid email");
        return;
      }
      if (userData.password.length < 6) {
        toast.error("Password should be at least 6 characters");
        return;
      }
      if (userData.password !== userData.confirmPass) {
        toast.error("Passwords do not match with confirm password");
        return;
      }
      setLoading(true);
      let result = await userRegister({ ...userData, confirmPass: undefined });
      toast.success(result?.data?.message);
      navigate("/Verification", { state: { userId: result?.data?.userId } });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className='container login-page'>
        <div className='row justify-content-center'>
          <div className='col-sm-6 text-center'>
            <div className='bg-white  custom-border-card'>
              <h2 className='font-mina text-primary'>Register your account</h2>
              <img src={loginpic} alt='web' className='img img-fluid' />
              <div className='location-back mt-2 px-4 pt-5 pb-2'>
                <input
                  type='email'
                  className='form-control form-contact mb-2'
                  placeholder='Enter valid Email'
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
                <input
                  type='email'
                  className='form-control form-contact mb-2'
                  placeholder='Password'
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
                <input 
                type='email' 
                className='form-control form-contact mb-2' 
                placeholder='re-Enter password'
                name="confirmPass"
                value={userData.confirmPass}
                onChange={handleChange}
                 />
                <input 
                type='email' 
                className='form-control form-contact mb-2' 
                placeholder='reminder'
                name="reminder"
                value={userData.reminder}
                onChange={handleChange}
                 />

                <button 
                type="button" 
                className="btn btn-primary btn-lg  mb-2"
                disabled={loading}
                onClick={() => handleSubmit()}
                 > {loading ? "loading.." : "Register"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup