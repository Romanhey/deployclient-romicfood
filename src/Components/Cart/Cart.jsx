import React from 'react';
import './Cart.css';
import {FiShoppingCart, FiTrash2} from 'react-icons/fi';
import {useNavigate} from "react-router-dom";
import {ENV} from "../../Share/share"; // Иконка для удаления товара

function Cart({list,setList,user}) {

    let navigate = useNavigate();

    let removeProductFromCart = (index) => {
        let newList = [...list];
        newList.splice(index, 1);
        setList(newList);
    }

    let CreateOrder = async () => {
        console.log(user)
        if(user?.userId == null){
            navigate('/auth');
            return
        }

        try {
            var data = {

                "customerId": user.userId,
                "orderDate": (new Date()).toISOString(),
                "status": 0,
                "totalPrice": list.reduce((total, item) => total + item.product.price*item.quantity, 0),
                "productIds": list.map(item => ({
                    "productId": item.product.productId,
                    "quantity": item.quantity
                }))
            }
            console.log(data)
            await fetch(`${ENV.BASE_URL}/order`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => {
                if(res.status === 200){
                    alert("Заказ оформле успешно");
                    setList([]);
                    navigate('/');
                }else{
                    console.log(res);
                }
            })
        }
        catch (err) {
            console.log(err);
        }
    }
console.log(list)


    return (
        <div className="cart">
            <h2 className="cart_title">Корзина</h2>
            <div className="cart_items">
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div key={index} className="cart_item">
                            <img src={item.product.imageSrc} alt={item.product.name} className="cart_item_image" />
                            <div className="cart_item_details">
                                <h4 className="cart_item_name">{item.product.productName}</h4>
                                <p className="cart_item_price">{item.product.price} ₽</p>
                            </div>

                            <div className="cart_item_quantity">
                                <button
                                    className="cart_item_quantity_button"
                                    onClick={() => {
                                        let newList = [...list];
                                        newList[index].quantity--;
                                        if (newList[index].quantity === 0) {
                                            newList.splice(index, 1);
                                        }
                                        setList(newList);
                                    }}
                                >-</button>
                                <p className="cart_item_quantity_number">{item.quantity}</p>
                                <button
                                    className="cart_item_quantity_button"
                                    onClick={() => {
                                        let newList = [...list];
                                        newList[index].quantity++;
                                        setList(newList);
                                    }}
                                >+</button>
                            </div>

                            <button
                                className="cart_item_remove"
                                onClick={() => removeProductFromCart(index)}
                                style={{ cursor: "pointer" }}
                            >
                                <FiTrash2
                                    style={{ cursor: "pointer" }}
                                />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="cart_empty">
                        <FiShoppingCart style={{ fontSize: '100px', color: '#cccccc' }} />
                        <p>Ваша корзина пуста</p>
                        <button
                            className="cart_escape_button"
                            onClick={() => navigate('/')}
                        >Назад</button>
                    </div>
                )}
            </div>
            {list.length > 0 && (
                <div className="cart_summary">
                    <h3>Итого:</h3>
                    <p className="cart_total_price">{list.reduce((total, item) => total + item.product.price * item.quantity, 0)} ₽</p>
                <div className="buttons_container">
                    <button
                        className="cart_checkout_button"
                        onClick={CreateOrder}
                    >Оформить заказ</button>
                    <button
                        className="cart_escape_button"
                        onClick={() => navigate('/')}
                    >Назад</button>
                </div>
                </div>
            )}
        </div>
    );
}

export default Cart;