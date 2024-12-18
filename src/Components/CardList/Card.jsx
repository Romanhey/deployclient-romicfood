import React, { useState } from 'react';
import './Card.css'; // импортируем стили

function Card({ product, addProductToCard, setProductMenu }) {
    const [quantity, setQuantity] = useState(1); // состояние для количества товара

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    return (
        <div
            className="card"
            onClick={() => setProductMenu(product)} // Открытие описания по клику на карточку
        >
            <div className="card_image">
                <img src={product.imageSrc} alt={product.name} className="card-image" />
            </div>

            <div className="card-content">
                <h2 className="card-title">{product.productName}</h2>
                <p className="card-price">{product.price} BYN</p>

                <button
                    className="add-to-cart"
                    onClick={(event) => {
                        event.stopPropagation(); // Предотвращаем всплытие клика
                        addProductToCard(product); // Добавляем продукт в корзину
                    }}
                >
                    Добавить
                </button>
            </div>
        </div>
    );
}

export default Card;
