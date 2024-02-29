import React from 'react'
import Header from "../header/Header";
import Backgroundimg from '../../assets/banner.png'
import Story from '../../assets/story.jpg'
import lockicon from '../../assets/bomb.GIF'
import fancy from '../../assets/fancy2.GIF'
import person from '../../assets/person.GIF'
import personlock from '../../assets/personlock.GIF'
import database from '../../assets/database.png'
import genration from '../../assets/genration.png'
import home from '../../assets/home.png'
import contact from '../../assets/contact.png'
import '../Home/home.css'
function Home() {
    return (
        <>
        <Header />
            <div className='row mt-5'>
                <img src={Backgroundimg} className='img-fluid' alt='home' />
                <div className='content-header'>
                    <h1 className='font-mina text-primary custom-content'> <span className='text-dark secure-u'>Secure-u</span>Securely Manage Your Passwords and Notes with Ease</h1>
                    <h4 className='font-mina'>
                        Safeguard Passwords and Notes with Our User-Friendly Platform. <br />
                        we understand the importance of security and convenience
                    </h4>
                    <button type="button" className="btn btn-primary font-mina">Signup its free</button>
                </div>
            </div>
            <div className='container mt-4'>
                <div className='row custom-story-margin'>
                    <div className='col-sm-6'>
                        <img src={Story} className='img img-fluid' alt='story' />
                    </div>
                    <div className='col-sm-6'>
                        <h2 className='font-mina text-primary'>Our story</h2>
                        <h3 className='font-mina'>Welcome to Secure-u</h3>
                        <p className='font-mina'>
                            Say goodbye to the hassle of remembering numerous passwords. Our intuitive interface allows you to store and manage all your passwords in one secure place. Your data is encrypted to ensure maximum security, and you can access it anytime, anywhere
                        </p>
                        <p className='font-mina'>No technical expertise required! Our user-friendly interface makes navigating and utilizing our platform a breeze. Enjoy a seamless experience as you take control of your digital security</p>
                        <p className='font-mina'>Ready to simplify your digital life? Sign up for free today and experience the convenience of secure password management and note-keeping. Your online world just got a whole lot safer and more organized with <span className='text-primary'>Secure-u</span>.</p>
                        <button className='btn btn-primary font-mina'>read more</button>
                    </div>
                </div>
                <hr className='pb-4' />
                <div className='row mt-5'>
                    <div className='col-sm-6'>
                        <h2 className='font-mina text-primary'>Why we are</h2>
                        <p className='mt-3 font-mina'>
                            We're committed to staying ahead in the realm of digital security. Expect regular updates and improvements to ensure that Secure-u remains at the forefront of password management technology. Your security is our ongoing mission.
                        </p>
                        <p className='font-mina'>
                            No need for a tech manual here. Our user-friendly interface is designed with simplicity in mind. Navigate through the application effortlessly, making the management of your digital assets a breeze, even for those less tech-savvy.
                        </p>
                        <p className='font-mina'>
                            Join the Secure-u family today and experience the peace of mind that comes with top-notch security, user-friendly design, and innovative features. Simplify your digital world with a platform that's designed with you in mind
                        </p>
                        <button className='btn btn-primary font-mina mt-3'>read more</button>
                    </div>
                    <div className='col-sm-6'>
                        <div className='container'>
                            <div className='row '>
                                <div className='col-sm-6 py-2  shadow text-center'>
                                    <img src={lockicon} alt='lock' />
                                    <p className='font-mina'>Secure password</p>
                                </div>
                                <div className='col-sm-6 py-2 shadow text-center'>
                                    <img src={fancy} alt='lock' />
                                    <p className='font-mina'>Secure password</p>
                                </div>
                            </div>
                            <div className='row  mt-2'>
                                <div className='col-sm-6 py-2 shadow text-center'>
                                    <img src={person} alt='lock' />
                                    <p className='font-mina'>Secure password</p>
                                </div>
                                <div className='col-sm-6 py-2 shadow text-center'>
                                    <img src={personlock} alt='lock' />
                                    <p className='font-mina'>Secure password</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='pb-4' />
            </div>
            <div className='row mt-5'>
                <div className='col-sm-12 text-center'>
                    <h2 className='font-mina text-primary'>Our Services</h2>
                    <p className='font-mina'>we prioritize the security and convenience of our users by offering a comprehensive set of features.  Users can generate robust and secure passwords<br /> effortlessly, ensuring that their online accounts remain protected against potential threats. The ability to save multiple passwords within the<br /> application provides a centralized and secure repository, streamlining the management of various <br />login credentials for different platforms</p>
                </div>
            </div>
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-md-4 '>
                        <div className='bg-white px-3 py-4   custom-border-card'>
                            <img src={database} alt='web' className='img img-fluid' />
                            <div className='location-back px-4 pt-3 pb-4'>
                                <h4 className='text-primary font-mina'>Password Storage</h4>
                                <p className='font-mina'>The application allows users to store multiple passwords securely. This feature eliminates the need for users to remember numerous complex passwords</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 '>
                        <div className='bg-white px-3 py-4   custom-border-card'>
                            <img src={genration} alt='web' className='img img-fluid' />
                            <div className='location-back px-4 pt-3 mt-1 pb-2'>
                                <h4 className='text-primary font-mina'>Password Generation</h4>
                                <p className='font-mina'>The Password Generation functionality employs advanced algorithms to create complex and randomized passwords, ensuring that they meet the highest standards of security</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 '>
                        <div className='bg-white px-3 py-4   custom-border-card'>
                            <img src={home} alt='web' className='img img-fluid' />
                            <div className='location-back px-4 pt-3 mt-1 pb-2'>
                                <h4 className='text-primary font-mina'>Notes Creation and Storage</h4>
                                <p className='font-mina'>The Note Creation and Storage feature is a testament to our commitment to providing users with a comprehensive and secure solution for managing their digital information.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='pb-4' />
            </div>
            
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-sm-12 text-center mb-2'>
                    <h2 className='font-mina text-primary'>Contact Us</h2>
                    </div>
                </div>
                <div className='row  py-4'>
                <div className='col-sm-6'>
                    <h1 className='font-mina text-primary'>Lets talk about ! <br/> everything</h1>
                    <img src={contact} alt='contact' className='img img-fluid' />
                </div>
                <div className='col-sm-6 full-contact pt-5 px-5'>
                    <input type='text' className='form-control form-contact mb-3' placeholder='enter name' />
                    <input type='text' className='form-control form-contact mb-3' placeholder='enter email' />
                    <input type='text' className='form-control form-contact mb-3' placeholder='enter phone number' />
                    <textarea className='form-control contact-text' placeholder='enter your message'></textarea>
                    <button className='btn btn-primary font-mina mt-3'>submit message</button>
                </div>
                </div>
            </div>
        </>
    )
}

export default Home