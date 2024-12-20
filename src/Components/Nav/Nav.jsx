import React, {useState} from 'react';
import {TbTruckDelivery} from "react-icons/tb";
import Cart from "../Cart/Cart";
import {FiShoppingCart} from "react-icons/fi";
import {NavLink, useNavigate} from "react-router-dom";
import "./../Header/header.css"

function Nav({ scrollToFooter,scroll,isAuth,CartProductsCount,setSearchText,searchText}) {

    let history = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleMenuItemClick = () => {
        setIsMenuOpen(false); // Закрываем меню
    };

    return (
        <nav>

                <NavLink
                    to="/"
                >
            <div className="nav_logo">
                    <TbTruckDelivery/> {/* Используем иконку FiTruck для логотипа */}
                    <span className="company_name">RomicFood</span> {/* Название компании */}

            </div>
                </NavLink>
            <div className="navigation">
                <div className="nav_search">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            scroll();
                        }}
                    />
                    <img src={`${process.env.PUBLIC_URL}/img/icons-reach.svg`} alt="search icon"/>
                </div>
                <div className={`nav_buttons ${isMenuOpen ? 'open' : ''}`}>
                    <a href="" onClick={handleMenuItemClick}>Доставка</a>
                    <a href="" onClick={(e)=>{
                        e.preventDefault();
                        handleMenuItemClick();
                        scrollToFooter();
                    }}>О нас</a>
                    <a href="" onClick= {(e) =>{
                        e.preventDefault();
                        scrollToFooter();
                        handleMenuItemClick();
                    }}
                        >Контакты
                    </a>
                    <div className="nav_profile">
                        <NavLink
                            to="/profile"
                            id="profile_button"
                            className={isAuth ? "active" : ""}
                            onClick={handleMenuItemClick}
                        >
                            Профиль
                        </NavLink>
                        <NavLink
                            to="/auth"
                            id="sign_in_button"
                            className={!isAuth ? "active" : ""}
                            onClick={handleMenuItemClick}
                        >
                            Войти
                        </NavLink>
                    </div>
                </div>
                <a
                    id="cart_button"
                    className="cart-icon"
                    onClick={() => history("/cart")}
                >
                    <FiShoppingCart
                        style={{cursor: "pointer"}}
                    />
                    {CartProductsCount > 0 && (
                        <span className="cart-count">{CartProductsCount}</span>
                    )}
                </a>
                <div className={`nav_buttons 0{menuOpen ? 'open' : ''}`}>

                </div>
            </div>

            <div className={["burger-menu", isMenuOpen ? "active" : ""].join(" ")} onClick={toggleMenu}>
                <span className="burger-icon"></span>
            </div>
        </nav>
    );
}

export default Nav;