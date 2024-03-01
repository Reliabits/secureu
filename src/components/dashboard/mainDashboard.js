import React from 'react'
import Sidebar from './Sidebar';

function mainDashboard() {
  return (
    <>
      <div className='container-fluid mt-4'>
        <div class="row">
          <div class="col-md-4"><span><p className='font-mina text-primary'>Back to home</p></span></div>
          <div class="col-md-4 offset-md-4">Welcome Username &nbsp; <button className='btn btn-danger'>logout</button></div>
        </div>
        <div className='row'>
          <div className='col-sm-2'>
            <Sidebar/>
          </div>
          <div className='col-sm-10'>
            {/* here will be the two side menu component render */}
          </div>
        </div>
      </div>
    </>
  )
}

export default mainDashboard;