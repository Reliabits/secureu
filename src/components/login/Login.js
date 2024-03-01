import React from 'react'
import Header from '../header/Header'
import loginpic from '../../assets/login.png'
import '../login/login.css'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
              <input type='email' className='form-control form-contact mb-2' placeholder='email' />
              <input type='email' className='form-control form-contact mb-2' placeholder='password' />
              <button type="button" class="btn btn-primary btn-lg btn-block mb-2" onClick={()=> navigate('/mainDashboard')}>Login</button>
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
              <input type='email' className='form-control form-contact mb-2' placeholder='Enter your email' />
              </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}  className='font-mina'>
            Close
          </Button>
          <Button variant="primary" className='font-mina' onClick={() => navigate('/verification')}>
           submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Login