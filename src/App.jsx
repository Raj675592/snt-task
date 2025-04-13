import React, {useState, useEffect} from 'react';
import './App.css';
import User from './attendees/User.jsx';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FAQs from './FAQs.jsx';

import Login from './UserProfile.jsx';
import image from './imagecopy.png';

function App(){
    return(
       
        <div className="Appp">
            <img src={image} alt="background" className="bg-img" />
            <Router>
            <nav className="navbar">
             <Link to="/user">Attendee</Link>
              <Link to="/faqs">FAQs</Link>
              <Link to="/login"> Register/Login</Link>
              
            </nav>
            <Routes>
                <Route path="/user" element={<User />} />
                <Route path="/faqs" element={<FAQs/>}/>
                <Route path='/login' element={<Login/>}/>
               
               
            </Routes>
            </Router>
           

        </div>
    );
}
export default App;
