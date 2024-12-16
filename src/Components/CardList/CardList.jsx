import React, {useEffect, useRef, useState} from "react";
import Card from "./Card";
import './CardList.css';
import { ENV } from "../../Share/share";

function CardList({ targetRef, searchText, cart, products, setProductsCardList, setProductMenu }) {
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(-1);
    const [sortDirection, setSortDirection] = useState(null); // null, 'asc', 'desc'
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false); // Controls dropdown visibility

    // Получение категорий
    let GetAllCategories = async () => {
        try {
            const response = await fetch(`${ENV.BASE_URL}/category`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await response.json();

            if (data.error) {
                console.log(data.error);
            } else {
                const baseCategory = {
                    categoryId: -1,
                    categoryName: "Все"
                };
                setCategories([baseCategory, ...data]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        GetAllCategories();
    }, []);

    // Быстрая сортировка
    const quickSort = (arr, order) => {
        if (arr.length <= 1) return arr;
        const pivot = arr[arr.length - 1];
        const left = [];
        const right = [];

        for (let i = 0; i < arr.length - 1; i++) {
            if ((order === 'asc' && arr[i].price <= pivot.price) || (order === 'desc' && arr[i].price >= pivot.price)) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return [...quickSort(left, order), pivot, ...quickSort(right, order)];
    };

    // Фильтрация и сортировка продуктов
    const filteredProducts = activeCategory === -1
        ? products
        : products.filter(product => product.categoryId === activeCategory);

    const searchedProducts = searchText === ""
        ? filteredProducts
        : filteredProducts.filter(product => product.productName.toLowerCase().includes(searchText.toLowerCase()));

    const sortedProducts = sortDirection
        ? quickSort(searchedProducts, sortDirection)
        : searchedProducts;
    // Сброс сортировки
    const resetSorting = () => {
        setSortDirection(null); // Убираем направление сортировки
        setIsSortMenuOpen(false); // Закрываем меню сортировки
    };

    // Обработчики
    const handleSort = (direction) => {
        setSortDirection(direction);
        setIsSortMenuOpen(false); // Закрыть меню после выбора
    };


    const sortRef = useRef(null);

    const handleClick = (e) => {
        if(sortRef.current && !sortRef.current.contains(e.target)) {
            setIsSortMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {document.removeEventListener("mousedown", handleClick);};
    }, []);


    return (
        <div className="page-container" ref={targetRef}>
            <div id="menu">
                <h1 className="menu-title">Меню</h1>
            </div>
            <div className="menu-quote">
                <span>“Cibus est vita.”</span>
                <span className="translation">(Еда — это жизнь.)</span>
            </div>

            {/* Контролы сортировки и категорий */}
            <div className="menu-controls">
                <div className="sort-controls">
                    <button
                        className="sort-menu-button"
                        onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                    >
                        Сортировать
                    </button>
                    {isSortMenuOpen && (
                        <div className="sort-menu-dropdown"
                            ref={sortRef}
                        >
                            <button className="sort-option" onClick={resetSorting}>
                                Сбросить
                            </button>
                            <button
                                className={`sort-option ${sortDirection === "asc" ? "active" : ""}`}
                                onClick={() => handleSort("asc")}
                            >
                                По возрастанию
                            </button>
                            <button
                                className={`sort-option ${sortDirection === "desc" ? "active" : ""}`}
                                onClick={() => handleSort("desc")}
                            >
                                По убыванию
                            </button>
                        </div>
                    )}
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
            </div>

            {/* Список продуктов */}
            <div className="products-list">
                {sortedProducts.map(product => (
                    <Card
                        product={product}
                        key={product.productId}
                        addProductToCard={() => {
                            const index = cart.findIndex(item => item.product.productId === product.productId);
                            if (index !== -1) {
                                const newCart = [...cart];
                                newCart[index].quantity++;
                                setProductsCardList(newCart);
                            } else {
                                setProductsCardList([...cart, { product: product, quantity: 1 }]);
                            }
                        }}
                        setProductMenu={setProductMenu}
                    />
                ))}
            </div>
        </div>
    );
}

export default CardList;
