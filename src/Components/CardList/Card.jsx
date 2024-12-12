import React, { useState } from 'react';
import './Card.css'; // импортируем стили

function Card({product,addProductToCard,setProductMenu}) {
    const [quantity, setQuantity] = useState(1); // состояние для количества товара

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    return (
        <div className="card"

        >

            <div className="card_image"
                 onClick={()=>setProductMenu(product)}>
                <img src={product.imageSrc} alt={product.name} className="card-image"/>
            </div>

            <div className="card-content"
                 onClick={()=>setProductMenu(product)}>
                <h2 className="card-title">{product.productName}</h2>
                <p className="card-price">${product.price}</p>

                <button className="add-to-cart"
                    onClick={()=>addProductToCard(product)}
                >Добавить</button>
            </div>
        </div>
    );
}

export default Card;
