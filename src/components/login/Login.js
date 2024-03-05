import React from 'react'
import Header from '../header/Header'
import loginpic from '../../assets/login.png'
import '../login/login.css'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from "react-router-dom";
import { userLogin } from "../../api/api";
import { userForgotPass } from '../../api/api';
import { toast } from "react-toastify";
function Login() {
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      setLoading(true);
      let result = await userLogin(userData);
      toast.success(result?.data?.message);
      localStorage.setItem("userData", JSON.stringify(result?.data?.user));
      localStorage.setItem("token", result?.data?.token);
      // location.reload();
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response.data?.error);
    } finally {
      setLoading(false);
    }
  };
  const Forgotpassword = async () => {
    try {
      if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error("Invalid email");
        return;
      }
      setLoading(true);
      let result = await userForgotPass({ email });
      toast.success(result?.data?.message);
      navigate("/verification", { state: { userId: result?.data?.userId ,forgot:true } });
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
            <h2 className='font-mina text-primary'>Login</h2>
            <p className='font-mina text-primary'>Welcome back login to your account</p>
              <img src={loginpic} alt='web' className='img img-fluid' />
              <div className='location-back mt-2 px-4 pt-5 pb-2'>
              <input
               type='email' 
               className='form-control form-contact mb-2' 
               placeholder='email'
               name="email"
               value={userData.email}
               onChange={handleChange}
                />
              <input 
              type='password' 
              className='form-control form-contact mb-2' 
              placeholder='password' 
              name="password"
              value={userData.password}
              onChange={handleChange}
              />
              <button
               type="button" 
               className="btn btn-primary btn-lg btn-block mb-2" 
               disabled={loading}
               onClick={() => handleSubmit()}

               >Login</button>

              <p className='text-warning font-mina' onClick={handleShow}>Forgot password ?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* forgot modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fogot password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='location-back px-4 py-5 pt-5 pb-5'>
              <input 
              type='email' 
              className='form-control form-contact mb-2' 
              placeholder='Enter your email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
              </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}  className='font-mina'>
            Close
          </Button>
          <Button
           variant="primary" 
           className='font-mina' 
           onClick={() => Forgotpassword()} 
           >
            {loading ? "loading.." : "submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Login