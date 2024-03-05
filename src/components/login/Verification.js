import React, { useState } from 'react'
import '../login/login.css'
import { useLocation, useNavigate } from "react-router-dom";
import { userResetPass, userVerify } from "../../api/api";
import { toast } from "react-toastify";
function Verification() {
  const [verification_code, setVerification_code] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const _id = location.state?.userId;
  const forgotMethod = location.state?.forgot;
  const handleSubmit = async () => {
    try {
      if (!_id) {
        toast.error("id is required");
        return;
      }
      if (!verification_code) {
        toast.error("please fill the verification code");
        return;
      }
      setLoading(true);
      let result
      if (forgotMethod) {
        result = await userResetPass({ _id, resetCode: verification_code });
        toast.success(result?.data?.message);
        console.log("result :", result)
        navigate("/newpassword", { state: { userId: result?.data?.user?._id } });
      } else {
        result = await userVerify({ _id, verification_code });
        toast.success(result?.data?.message);
        navigate("/login");
      }
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
            <h4 className='font-mina text-primary'>Don't share your verification code to someone else</h4>
            <input
              className='form-control form-contact mb-2'
              placeholder='please enter code send to your email'
              type="password"
              value={verification_code}
              onChange={(e) => setVerification_code(e.target.value)}
            />
            <button 
            className='btn btn-primary font-mina'
            disabled={loading}
            onClick={() => handleSubmit()}
             >{loading ? "loading.." : "submit"}</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Verification