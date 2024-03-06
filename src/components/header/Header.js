import React from 'react'
import '../header/header.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
function Header() {
    const navigate = useNavigate();
    return (
        <>
            <div className='row'>
                <Navbar  fixed="top" collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <div className='container'>
                        <Navbar.Brand href="#home" className='font-mina-header'>Secure-u</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                               
                            </Nav>
                            <Nav>
                           
                            <Nav.Link   className='font-mina-header px-3'   onClick={() => navigate('/')}>Home</Nav.Link>
                                <Nav.Link   className='font-mina-header px-3' onClick={() => navigate('/login')}>Login</Nav.Link>
                                <Nav.Link  eventKey={2} className='font-mina-header px-3' onClick={() => navigate('/signup')}>
                                    Register
                                </Nav.Link>
                                <Nav.Link   className='font-mina-header px-3'   onClick={() => navigate('/dashboard')}>Dashboard</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
            </div>
        </>
    )
}

export default Header