import React, { useState } from "react";
import Card from "./Card";
import './CardList.css';
function CardList({}) {

    const [activeCategory, setActiveCategory] = useState("Все");

    const products = [
        {
            productId: 1,
            productName: "Pizza",
            price: 10,
            productDescription: "Delicious pizza",
            categoryId: 1,
            image: "https://kykagroup.com/wp-content/uploads/2023/07/IMG-Worlds-of-Adventure.jpg",
        },
        {
            productId: 2,
            productName: "Burger",
            price: 8,
            productDescription: "Juicy burger",
            categoryId: 2,
            image: "https://kykagroup.com/wp-content/uploads/2023/07/IMG-Worlds-of-Adventure.jpg",
        },
        {
            productId: 3,
            productName: "Sushi",
            price: 15,
            productDescription: "Fresh sushi",
            categoryId: 3,
            image: "https://kykagroup.com/wp-content/uploads/2023/07/IMG-Worlds-of-Adventure.jpg",
        },
    ];
    const categories = ["Все", "Завтраки", "Десерты", "Гарниры", "Напитки", "Сеты", "Детское"];
    const filteredProducts = activeCategory === "Все"
        ? products
        : products.filter(product => product.categoryId.toString() === activeCategory);
    return (
        <div className="page-container">
            <div id = "menu"><h1 className="menu-title">Меню</h1></div>
            <div className="menu-quote">
                <span>“Cibus est vita.”</span>
                <span className="translation">(Еда — это жизнь.)</span>
            </div>
            <div className="categories">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={`category-button ${activeCategory === category ? "active" : ""}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="products-list">
                {filteredProducts.map((product) => (
                    <Card product={product} key={product.productId}/>
                ))}
            </div>
        </div>
    );
}

export default CardList;