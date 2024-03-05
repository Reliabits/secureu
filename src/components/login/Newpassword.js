import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { userNewPass } from '../../api/api';
import { toast } from 'react-toastify';
function Newpassword() {
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false);
const location = useLocation();
const navigate = useNavigate();
const _id = location.state?.userId;
console.log("id :",_id)


const handleSubmit = async () => {
  try {
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }
    setLoading(true);
    let result = await userNewPass(_id,{ password });
    toast.success(result?.data?.message);
    navigate("/login");
  } catch (error) {
    console.error("Error:", error);
    toast.error(error?.response.data?.error);
  } finally {
    setLoading(false);
  }
};
  return (
   <>
     <div className='container  login-page'>
    <div className='row'>
        <div className=' offset-sm-4 col-sm-4 text-center location-back px-5 py-5'>
            <h4 className='font-mina text-primary'>Please Enter your new password</h4>
            <input 
            type='email' 
            className='form-control form-contact mb-2' 
            placeholder='Eneter Your new password'
            onChange={(e)=>setPassword(e.target.value)}
             />
            <button
             className='btn btn-primary font-mina'
             disabled={loading}  onClick={handleSubmit}
              > {loading ? "loading":"submit"}</button>
        </div>
    </div>
   </div>
   </>
  )
}

export default Newpassword