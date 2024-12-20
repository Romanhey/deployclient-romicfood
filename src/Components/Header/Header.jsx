import React, { useState } from 'react';
import './header.css';

function Header({ isAuth }) {



    return (
        <header>

            <div className="header_content">
                <div className="header_content_text">
                    <h1>Абсолютно бесплатная еда</h1>
                    <h3>бесплатная еда каждый час</h3>
                    <a href="#menu">Меню</a>
                </div>
            </div>
        </header>
    );
}

export default Header;
