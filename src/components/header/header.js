import React from 'react';
import {Link} from 'react-router-dom'
import './header.css'





const Header = () => {
    return (
        <div className="header-block">
            <h3 className="header-title">
                <Link to='/'>
                Data Grid View
                </Link>
            </h3>
            <ul className="header-links">
                <li>
                    <Link to='/smallAmount'>Малый объем</Link>
                </li>
                <li>
                    <Link to='/bigAmount'>Большой объем</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;