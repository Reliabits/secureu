import React from 'react'
import '../login/login.css'
import { useNavigate } from 'react-router-dom';

function Verification() {
const navigate = useNavigate();

  return (
   <>
    <div className='container  login-page'>
    <div className='row'>
        <div className=' offset-sm-4 col-sm-4 text-center location-back px-5 py-5'>
            <h4 className='font-mina text-primary'>Don't share your verification code to someone else</h4>
            <input type='email' className='form-control form-contact mb-2' placeholder='please enter code send to your email' />
            <button className='btn btn-primary font-mina'  onClick={()=> navigate('/newpassword')}>submit</button>
        </div>
    </div>
   </div>
   </>
  )
}

export default Verification