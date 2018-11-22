import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
// Fragments


const Menu = () => {
    const activeStyle = {
        color: 'green',
        fontSize: '2rem'
    };

    return (
        <div>
        <nav>
            <span className="myName">Yuni-Q</span>
            <ul>
                <li><NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink></li>
                <li><NavLink exact to="/about" activeStyle={activeStyle}>About</NavLink></li>
                <li><NavLink exact to="/signIn" activeStyle={activeStyle}>sign In</NavLink></li>
                <li><NavLink exact to="/signUp" activeStyle={activeStyle}>sign Up</NavLink></li>
            </ul>
            
        </nav>
        <hr/>
        </div>
    );
};

export default Menu;