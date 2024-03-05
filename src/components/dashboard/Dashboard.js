import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FcDataEncryption } from "react-icons/fc";
import './dashboard.css'
import { useNavigate } from "react-router-dom";
import { createNote, createPassword, listNote, listNoteUpdate, listPassword, listPasswordUpdate } from "../../api/api";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdContentCopy } from "react-icons/md";
function Dashboard(props) {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState(0);
  const [inputData, setInputData] = useState({});
  const [modalShow, setModalShow] = React.useState(false);

  const handleChange = (event) => {
    let { name, value } = event.target;
    setInputData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  // 2nd pass genrate
  const secondPasswordgenrate = () => {
    const randomPassword =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    setInputData((prevUserData) => ({
      ...prevUserData,
      ['password']: randomPassword,
    }));



  }
  return (
    <>
      {/* details modal */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"
            className="font-mina text-primary"
          >
            Student category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="form-group">
            <label for="exampleInputEmail1">Site Url:</label>
            <div class="input-group">
              <div className="input-group-prepend group-icon">
                <div
                  className="input-group-text padding-group custom-input-group"
                  id="btnGroupAddon"
                  onClick={secondPasswordgenrate}
                ><MdContentCopy /></div>
              </div>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="abc.com" />
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">User Name for site:</label>
            <div class="input-group">
              <div className="input-group-prepend group-icon">
                <div
                  className="input-group-text padding-group custom-input-group"
                  id="btnGroupAddon"
                  onClick={secondPasswordgenrate}
                ><MdContentCopy /></div>
              </div>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="User Name for site" />
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">User Email for site:</label>
            <div class="input-group">
              <div className="input-group-prepend group-icon">
                <div
                  className="input-group-text padding-group custom-input-group"
                  id="btnGroupAddon"
                  onClick={secondPasswordgenrate}
                ><MdContentCopy /></div>
              </div>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="User Email for site" />
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Password:</label>
            <div class="input-group">
              <div className="input-group-prepend group-icon">
                <div
                  className="input-group-text padding-group custom-input-group"
                  id="btnGroupAddon"
                  onClick={secondPasswordgenrate}
                ><MdContentCopy /></div>
              </div>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="password" />
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Notes:</label>
            <textarea type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="notes" />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={props.onHide} className="btn btn-danger">delete</Button>
        </Modal.Footer>
      </Modal>

      <div className=' mt-4'>
        <div className="row bg-primary py-2">
          <div className="col-md-4 offset-md-8 font-mina">Welcome Username &nbsp; <button className="btn btn-primary" onClick={() => navigate('/')}>back to home</button>  <button className='btn btn-danger font-mina' >logout</button></div>
        </div>
        <div className='row'>
          <div className='col-auto col-sm-2  d-flex flex-column justify-content-between height-sidebar'>
            <div className='mt-2'>
              <span className='text-decoration-none ms-4 d-flex align-items-center text-dark d-none d-sm-inline'>
                <span className='f5-4 font-mina'>Secure-U</span>
              </span>
              <hr className='text-dark d-none d-sm-block' />
              <ul
                className="nav nav-pills flex-column mt-2 mt-sm-0" id='parentM'
              >
                <li className="nav-item my-1 py-2 py-sm-0" onClick={() => {
                  setTabs(0)
                }}>
                  <span className="nav-link text-dark text-center text-sm-start"
                  >
                    <IoAddCircleOutline />
                    <span className='ms-2 d-none d-sm-inline font-mina'>View password</span>
                  </span>
                </li>
                <li className="nav-item my-1  py-2 py-sm-0" onClick={() => {
                  setTabs(1)
                }}>
                  <span className="nav-link text-dark text-center text-sm-start"
                  >
                    <FcDataEncryption />
                    <span className='ms-2 d-none d-sm-inline font-mina'>Add password</span>
                  </span>
                </li>
                <li className="nav-item text-dark my-1  py-2 py-sm-0"
                  onClick={() => {
                    setTabs(2)
                  }}>
                  <span className="nav-link text-dark text-center text-sm-start"
                  >
                    <IoAddCircleOutline />
                    <span className='ms-2 d-none d-sm-inline font-mina'>Add notes</span>
                  </span>
                </li>
                <li className="nav-item text-dark my-1  py-2 py-sm-0" onClick={() => {
                  setTabs(3)
                }}>
                  <span className="nav-link text-dark text-center text-sm-start"
                  >
                    <IoAddCircleOutline />
                    <span className='ms-2 d-none d-sm-inline font-mina'>View notes</span>
                  </span>
                </li>

              </ul>

            </div>

          </div>
          <div className='col-sm-10'>
            {tabs === 0 && (
              <>
                <div className="container mt-5">
                  <div className="row">
                    <div className="col-sm-12">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">S/no</th>
                            <th scope="col">email</th>
                            <th scope="col">pasword</th>
                            <th scope="col">action</th>
                            <th scope="col">details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>devshehzad249@gmail.com</td>
                            <td>123sdsdfsdf24223123123</td>
                            <td>
                              <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-secondary">copy email</button>
                                <button type="button" class="btn btn-secondary">copy password</button>
                              </div>
                            </td>
                            <td><button className="btn btn-danger" onClick={() => setModalShow(true)}>details</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
            {tabs === 1 && (
              <>
                <div className="container mt-5">
                  <div className="col-sm-12 text-center">
                    <h2 className="font-mina text-primary">Please enter your data</h2>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <input type="text"
                        className=" form-contact form-control"
                        placeholder="enter your url"
                        name="url"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-6">
                      <input
                        className=" form-contact form-control"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        placeholder="User Name"
                      />
                    </div>
                    <div className="col-sm-6">
                      <select className="form-select form-control form-contact" aria-label="Default select example">
                        <option selected>Category</option>
                        <option value="Educational">Educational </option>
                        <option value="Social">Social</option>
                        <option value="Business">Business </option>
                      </select> </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-6"> <input type="text" className=" form-contact form-control" placeholder="User Email" /> </div>
                    <div className="col-sm-6">
                      <div class="input-group">
                        <div className="input-group-prepend">
                          <div
                            className="input-group-text padding-group"
                            id="btnGroupAddon"
                            onClick={secondPasswordgenrate}
                          >genrate</div>
                        </div>
                        <input
                          type="text"
                          className="form-control padding-group"
                          placeholder="Click to genrate"
                          aria-label="Input group example"
                          aria-describedby="btnGroupAddon"
                          name="password"
                          value={inputData?.password} />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-12">
                      <textarea className="form-control form-contact text-area" placeholder="enter your notes for reminder" />
                      <button className="btn btn-primary mt-2 font-mina">Save</button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {tabs === 2 && (
              <>
                <div className="container mt-5">
                  <div className="row">
                    <div className="col-sm-12 text-center">
                      <h2 className="font-mina text-primary">Enter your notes here</h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <input type="text" className="form-control form-contact" placeholder="enter notes description" />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-12">
                      <textarea className="form-control form-contact text-area" placeholder="enter your notes for reminder" />
                      <button className="btn btn-primary mt-2 font-mina">Save notes</button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {tabs === 3 && (
              <>
                <div className="container mt-5">
                  <div className="row">
                    <div className="col-sm-12">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">S/no</th>
                            <th scope="col">description</th>
                            <th scope="col">Details</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>devshehzad249@gmail.com</td>
                            <td>123sdsdfsdf24223123123</td>
                            <td><button className="btn btn-danger">delete</button></td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>devshehsdfsmail.com</td>
                            <td>123sdfs234sdfsfsfas23123</td>
                            <td><button className="btn btn-danger">delete</button></td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>devshehsfsfsgmail.com</td>
                            <td>123sdfsfsdfsdfs23123</td>
                            <td><button className="btn btn-danger">delete</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;