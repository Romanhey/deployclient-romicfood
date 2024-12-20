import React, {forwardRef} from 'react'
import './Footer.css';
import { FaFacebookF, FaInstagram, FaVk, FaTwitter } from 'react-icons/fa';

function Footer(props, ref) {
    return (
        <footer ref = {ref} className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Контакты</h4>
                    <p>Телефон: <a href="tel:+71234567890">+375 29 149 91 66</a></p>
                    <p>Email: <a href="mailto:info@site.ru">romanmankevich09@gmail.com</a></p>
                </div>

                <div className="footer-section">
                    <h4>Мы в соцсетях</h4>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter />
                        </a>
                        <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                            <FaVk />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} RomicFood. Все права защищены.</p>
            </div>
        </footer>
    );
}

export default forwardRef(Footer);
