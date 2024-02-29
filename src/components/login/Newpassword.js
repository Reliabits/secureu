import React from 'react'
import { useNavigate } from 'react-router-dom';
function Newpassword() {
const navigate = useNavigate();

  return (
   <>
     <div className='container  login-page'>
    <div className='row'>
        <div className=' offset-sm-4 col-sm-4 text-center location-back px-5 py-5'>
            <h4 className='font-mina text-primary'>Please Enter your new password</h4>
            <input type='email' className='form-control form-contact mb-2' placeholder='Eneter Your new password' />
            <button className='btn btn-primary font-mina' onClick={()=> navigate('/login')}>save</button>
        </div>
    </div>
   </div>
   </>
  )
}

export default Newpassword