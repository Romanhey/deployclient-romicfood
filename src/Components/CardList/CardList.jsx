import React, {useEffect, useState} from "react";
import Card from "./Card";
import './CardList.css';
import {ENV} from "../../Share/share";
function CardList({products, setProductsCardList}) {


    const [categories,setCategories] = useState([]);

    let GetAllCategories = async () => {
        try{
            await fetch(`${ENV.BASE_URL}/category`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.error) {
                        console.log(data.error);
                    }else{
                        let basecat = {
                            categoryId:-1,
                            categoryName: "Все"
                        }
                        setCategories([basecat,...data]);
                    }
                });
        }catch (err){
            console.log(err);
        }

    }
    const [activeCategory, setActiveCategory] = useState(-1);

    useEffect(() => {
        GetAllCategories();
    },[])
    const filteredProducts = activeCategory === -1
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
                        className={`category-button ${activeCategory === category.categoryId ? "active" : ""}`}
                        onClick={() => setActiveCategory(category.categoryId)}
                    >
                        {category.categoryName}
                    </button>
                ))}
            </div>
            <div className="products-list">
                {filteredProducts.map((product) => (
                    <Card
                        product={product}
                        key={product.productId}
                        addProductToCard={()=>{
                            setProductsCardList((prev) => [...prev, product]);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default CardList;