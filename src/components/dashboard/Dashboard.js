import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FcDataEncryption } from "react-icons/fc";
import './dashboard.css'
import { useNavigate } from "react-router-dom";
import { createNote, createPassword, listNote, listNoteUpdate, listPassword, listPasswordUpdate } from "../../api/api";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdAttachEmail, MdPassword, MdContentCopy } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { LuView } from "react-icons/lu";
import { ToastContainer, Bounce, toast } from "react-toastify";
function Dashboard(props) {
  const navigate = useNavigate();
  const [tabs, setTabs] = useState(0);
  const [inputData, setInputData] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordList, setPasswordList] = useState([])
  const [modalShow, setModalShow] = React.useState(false);
  const [passwordLength, setpasswordLength] = useState(8);
  const [genratePassword, setgenratePassword] = useState("");
  const [lowerCase, setloweCase] = useState(false);
  const [upperCase, setupperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"))

  const handleChange = (event) => {
    let { name, value } = event.target;
    setInputData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const handleSelectChange = (event) => {
    setInputData((prevUserData) => ({
      ...prevUserData,
      category: event.target.value,
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
  // main pass genrate
  const lowercaseList = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberList = "0123456789";
  const symbolsList = "!@#$%^&*()?";

  const passwordGenrate = () => {
    let characterlist = "";
    if (lowerCase) {
      characterlist += lowercaseList;
    }
    if (upperCase) {
      characterlist += uppercaseList;
    }
    if (numbers) {
      characterlist += numberList;
    }
    if (symbols) {
      characterlist += symbolsList;
    }
    let temPassword = "";
    const characterlistLength = characterlist.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterlistLength);
      temPassword += characterlist.charAt(characterIndex);
    }
    setgenratePassword(temPassword);
  };
  // copy password 
  const copyPassword = () => {
    if (genratePassword.length) {
        navigator.clipboard.writeText(genratePassword);
        toast.success("password copied to clipboard!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    }
};


  // insert password
  const handleSubmitPasswordCreate = async () => {
    if (!inputData.url || !inputData.password || !inputData.category || !inputData.userName || !inputData.name || !inputData.details) {
      return toast.error("Please fill all fields")
    }
    try {
      setLoading(true);
      let result = await createPassword({ ...inputData, createdBy: userData._id });
      toast.success(result?.data?.message);
      setTabs(0)
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
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
          <div class="form-group mb-2">
            <label for="exampleInputEmail1" className="font-mina">Site Url:</label>
            <div class="input-group">
              <div className="input-group-prepend group-icon">
                <div
                  className="input-group-text padding-group custom-input-group"
                  id="btnGroupAddon"
                  onClick={secondPasswordgenrate}
                ><MdContentCopy /></div>
              </div>
              <input type="email" className="form-control font-mina" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="abc.com" />
            </div>
          </div>
          <div className="form-group mb-2">
            <label for="exampleInputEmail1" className="font-mina">User Name for site:</label>
            <div class="input-group">
              <div className="input-group-prepend group-icon">
                <div
                  className="input-group-text padding-group custom-input-group"
                  id="btnGroupAddon"
                  onClick={secondPasswordgenrate}
                ><MdContentCopy /></div>
              </div>
              <input type="email" className="form-control font-mina" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="User Name for site" />
            </div>
          </div>
          <div class="form-group mb-2">
            <label for="exampleInputEmail1" className="font-mina">User Email for site:</label>
            <div class="input-group">
              <div className="input-group-prepend group-icon">
                <div
                  className="input-group-text padding-group custom-input-group"
                  id="btnGroupAddon"
                  onClick={secondPasswordgenrate}
                ><MdContentCopy /></div>
              </div>
              <input type="email" className="font-mina form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="User Email for site" />
            </div>
          </div>
          <div class="form-group mb-2">
            <label for="exampleInputEmail1" className="font-mina">Password:</label>
            <div class="input-group">
              <div className="input-group-prepend group-icon">
                <div
                  className="input-group-text padding-group custom-input-group"
                  id="btnGroupAddon"
                  onClick={secondPasswordgenrate}
                ><MdContentCopy /></div>
              </div>
              <input type="email" className=" font-mina form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="password" />
            </div>
          </div>
          <div class="form-group mb-2">
            <label for="exampleInputEmail1" className="font-mina">Notes:</label>
            <textarea type="email" className="form-control font-mina" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="notes" />
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} className="btn btn-danger font-mina">delete</Button>
        </Modal.Footer>
      </Modal>

      <div className=''>
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
                    <LuView />
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
                    <LuView />
                    <span className='ms-2 d-none d-sm-inline font-mina'>View notes</span>
                  </span>
                </li>
                <li className="nav-item text-dark my-1  py-2 py-sm-0" onClick={() => {
                  setTabs(4)
                }}>
                  <span className="nav-link text-dark text-center text-sm-start"
                  >
                    <TbPasswordFingerprint />
                    <span className='ms-2 d-none d-sm-inline font-mina'>Genrate pass</span>
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
                            <th scope="col" className="font-mina">S/no</th>
                            <th scope="col" className="font-mina">email</th>
                            <th scope="col" className="font-mina">pasword</th>
                            <th scope="col" className="font-mina">action</th>
                            <th scope="col" className="font-mina">details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row" className="font-mina">1</th>
                            <td className="font-mina">devshehzad249@gmail.com</td>
                            <td className="font-mina">123sdsdfsdf24223123123</td>
                            <td>
                              <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn custom-btn"><MdContentCopy /> <MdAttachEmail /></button>
                                <button type="button" class="btn  custom-btn"><MdContentCopy /> <MdPassword /></button>
                              </div>
                            </td>
                            <td><button className="btn custom-btn-details font-mina" onClick={() => setModalShow(true)}>details</button></td>
                          </tr>
                          <tr>
                            <th scope="row" className="font-mina">2</th>
                            <td className="font-mina">abc249@gmail.com</td>
                            <td className="font-mina">asdfghjkl234242424</td>
                            <td>
                              <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn custom-btn"><MdContentCopy /> <MdAttachEmail /></button>
                                <button type="button" class="btn  custom-btn"><MdContentCopy /> <MdPassword /></button>
                              </div>
                            </td>
                            <td><button className="btn custom-btn-details font-mina" onClick={() => setModalShow(true)}>details</button></td>
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
                      <input
                        className=" form-contact form-control"
                        placeholder="enter your url"
                        type="text"
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
                      <select className="form-select form-control form-contact" aria-label="Default select example"
                        onChange={handleSelectChange}>
                        <option selected className="font-mina">Category</option>
                        <option value="Educational" className="font-mina">Educational </option>
                        <option value="Social" className="font-mina">Social</option>
                        <option value="Business" className="font-mina">Business </option>
                      </select> </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-6">
                      <input
                        type="email"
                        className=" form-contact form-control"
                        placeholder="User Email"
                        name="userName"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6">
                      <div class="input-group">
                        <div className="input-group-prepend">
                          <div
                            className="input-group-text padding-group font-mina genrate"
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
                          value={inputData?.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-sm-12">
                      <textarea
                        className="form-control form-contact text-area"
                        placeholder="enter your notes for reminder"
                        type="textarea"
                        name="details"
                        onChange={handleChange}
                      />
                      <button
                        className="btn btn-primary mt-2 font-mina"
                        disabled={loading}
                        onClick={handleSubmitPasswordCreate}
                      >Save</button>
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
                            <th scope="col" className="font-mina">S/no</th>
                            <th scope="col" className="font-mina">description</th>
                            <th scope="col" className="font-mina">Details</th>
                            <th scope="col" className="font-mina">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row" className="font-mina">1</th>
                            <td className="font-mina">devshehzad249@gmail.com</td>
                            <td className="font-mina">123sdsdfsdf24223123123</td>
                            <td><button className="btn delete-btn font-mina">delete</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
            {tabs === 4 && (
              <>
                <div className="container mt-5">
                  <div className="row">
                    <div className="col-sm-12 text-center">
                      <h2 className="font-mina text-primary">Genrate Password</h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <div class="input-group">
                        <div className="input-group-prepend group-icon">
                          <div
                            className="input-group-text padding-group custom-input-group"
                          ><MdContentCopy onClick={copyPassword}/></div>
                        </div>
                        <input 
                        type="text" 
                        className="form-control font-mina" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="select option to genrate"
                        value={genratePassword} />
                      </div>
                      <span className="mt-3 d-flex">
                        {" "}
                        <input
                          type="checkbox"
                          checked={lowerCase}
                          onChange={() => setloweCase(!lowerCase)}
                        />{" "} &nbsp;
                        <p className="font-mina pass-p mt-4">
                          Include lower case (a-z)
                        </p>
                      </span>
                      <span className=" d-flex">
                        {" "}
                        <input
                          type="checkbox"
                          checked={upperCase}
                          onChange={() => setupperCase(!upperCase)}
                        />{" "} &nbsp;
                        <p className="font-mina pass-p mt-4">
                          Include upper case (A-Z)
                        </p>
                      </span>
                      <span className=" d-flex">
                        {" "}
                        <input
                          type="checkbox"
                          checked={numbers}
                          onChange={() => setNumbers(!numbers)}
                        />{" "} &nbsp;
                        <p className="font-mina pass-p mt-4">
                          Include number
                        </p>
                      </span>
                      <span className=" d-flex">
                        {" "}
                        <input
                          type="checkbox"
                          checked={symbols}
                          onChange={() => setSymbols(!symbols)}
                        />{" "} &nbsp;
                        <p className="font-mina pass-p mt-4">
                          Include Symbols
                        </p>
                      </span>
                      <span className="d-flex">
                        {" "}
                        <input
                        type="range"
                        min={8}
                        max={40}
                        defaultValue={passwordLength}
                        checked={passwordLength}
                        onChange={(event) =>
                            setpasswordLength(event.currentTarget.value)
                        }
                        />{" "}
                        &nbsp;{" "}
                        <p className="font-fa lower-case mt-3">{passwordLength}</p>
                      </span>
                      <button className="btn custom-btn py-2 "  onClick={passwordGenrate}>Genrate password</button>
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