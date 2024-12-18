import React, {useState} from "react";
import "./profile.css";
import {ENV} from "../../Share/share";
import {useNavigate} from "react-router-dom"; // Подключаем стили

export const Profile = ({ user }) => {
    const [editEmail, setEditEmail] = useState(user.email || "");
    const [editLogin, setEditLogin] = useState(user.login || "");
    const [editName, setEditName] = useState(user.fullName || "");
    const [editAddress, setEditAddress] = useState(user.address || "");
    const [editPassword, setEditPassword] = useState( "");
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate(); // Используем navigate для перехода

    const handleSave = async () => {
        // Пример сохранения обновленных данных
        const updatedData = {
            fullName: editName,
            email: editEmail,
            address: editAddress,
            login: editLogin,
            password: editPassword
        };
        try {
            const resp = await fetch(`${ENV.BASE_URL}/user/${user.userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData).replace(/\0/g, '')
            })

            if(resp.ok) {
                alert("OK")
            }else{
                console.log(resp);
            }
        } catch (err) {
            console.log(err)
        }
    }

    let history = useNavigate();
    let [orders, setOrders] = React.useState([]);

    if (user?.userId == null) {
        navigate("/auth");
    }

    React.useEffect(() => {
        if (user?.userId == null) {
            navigate("/auth");
        }
        getOrders();
    }, []);

    let getOrders = async () => {
        try {
            const response = await fetch(`${ENV.BASE_URL}/order/user/${user.userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    setOrders([data]);
                }
            } else {
                console.log("Ошибка получения данных о заказах");
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <h1>Профиль</h1>
                <div><button
                    className="edit-button"
                    onClick={() => setIsEdit(!isEdit)}
                >
                    {isEdit ? "Отменить" : "Редактировать"}
                </button>
                <button
                    className="home-button"
                    onClick={() => navigate("/")}
                >
                    На главную
                </button>
                </div>
            </div>

            <div className="profile-main-info">
                <div className="info-row">
                    <span className="info-label">Полное имя:</span>
                    {!isEdit ? (
                        <span className="info-value">{user.fullName}</span>
                    ) : (
                        <input
                            type="text"
                            placeholder="Имя"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                    )}
                </div>
                <div className="info-row">
                    <span className="info-label">Email:</span>
                    {!isEdit ? (
                        <span className="info-value">{user.email}</span>
                    ) : (
                        <input
                            type="email"
                            placeholder="Email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                        />
                    )}
                </div>
                <div className="info-row">
                    <span className="info-label">Адрес:</span>
                    {!isEdit ? (
                        <span className="info-value">{user.address}</span>
                    ) : (
                        <input
                            type="text"
                            placeholder="Адрес"
                            value={editAddress}
                            onChange={(e) => setEditAddress(e.target.value)}
                        />
                    )}
                </div>
                <div className="info-row">
                    <span className="info-label">Логин:</span>
                    {!isEdit ? (
                        <span className="info-value">{user.login}</span>
                    ) : (
                        <input
                            type="text"
                            placeholder="Логин"
                            value={editLogin}
                            onChange={(e) => setEditLogin(e.target.value)}
                        />
                    )}
                </div>
                    {isEdit && (
                        <div className="info-row">
                            <span className="info-label">Пароль:</span>
                            <input
                                type="password"
                                placeholder="Пароль"
                                value={editPassword}
                                onChange={(e) => setEditPassword(e.target.value)}
                            />
                        </div>
                    )}


            </div>

            {/* Кнопка сохранения */}
            {isEdit && (
                <div className="save-button-container">
                    <button className="save-button" onClick={handleSave}>
                        Сохранить
                    </button>
                </div>
            )}

            {/* Секция "Мои заказы" */}
            <div className="orders-section">
                <h2>Мои заказы</h2>
                {/* Проверяем, если заказов нет */}
                {orders && orders.length > 0 ? (
                    <ul>
                        {orders.map((order, index) => (
                            <li key={index}>
                                <div className="order-row">
                                    <span className="order-label">Дата заказа:</span>
                                    <span className="order-value">
                            {new Date(order.orderDate).toLocaleDateString()}
                        </span>
                                </div>
                                <div className="order-row">
                                    <span className="order-label">Статус:</span>
                                    <span className="order-value">{order.status}</span>
                                </div>
                                <div className="order-row">
                                    <span className="order-label">Сумма:</span>
                                    <span className="order-value">{order.totalPrice} ₽</span>
                                </div>
                                <div className="order-row">
                                    <span className="order-label">Товары:</span>
                                    <span className="order-value">
                            {order.orderProducts.map((product, index) => (
                                <span key={index}>{product.productName} x {product.quantity}</span>
                            ))}
                        </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    // Если заказов нет
                    <p>У вас еще нет заказов</p>
                )}
            </div>


            {/* Кнопка выхода */}
            {/*<div className="logout-section">
                <button className="logout-button">Выйти из аккаунта</button>
            </div>*/}
        </div>
    );
};
