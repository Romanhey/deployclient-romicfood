import React, {useEffect, useRef} from 'react';
import './productMenu.css'
import {ENV} from "../../Share/share";
function ProductMenu({setProductMenu,product,isAdmin}) {

    const prRef = useRef(null);

    const handleClick = (e) => {
        if(prRef.current && !prRef.current.contains(e.target)) {
            setProductMenu({})
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {document.removeEventListener("mousedown", handleClick);};
    }, []);

    return (
        <div
        >
            <div className={["product-menu_bg",product?.productId == null ? "" : "active"].join(" ")}></div>
        <div
            ref={prRef}
            className={["product-menu", product?.productId == null ? "" : "active"].join(" ")}
        >
            <div className="product-menu__image">
                <img src={product?.imageSrc} alt={product?.productName}/>
            </div>
            <div className="product-menu__info">
                <div className="product-menu__title">
                    {product?.productName}
                </div>
                <div className="product-menu__price">
                    Цена: {product?.price} BYN
                </div>
                <div className="product-menu__category">
                    Категория: {product?.category?.categoryName}
                </div>
                <div className="product-menu__description">
                    Описание: {product?.productDescription}
                </div>
                <button
                    className="product-menu__close"
                    onClick={() => setProductMenu(null)}
                >
                    Закрыть
                </button>

            </div>
        </div>
        </div>
    );
}

export default ProductMenu;