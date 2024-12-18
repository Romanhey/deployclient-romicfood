import React from 'react';
import './auth.css';
import {ENV} from "../../Share/share";
import {NavLink, useNavigate} from "react-router-dom";
function Auth({setUser}) {

    const navigaion = useNavigate();
    const [isError, setIsError] = React.useState(false);

    const [isRegister, setIsRegister] = React.useState(false);
    const [isSecondRegisterPage, setIsSecondRegisterPage] = React.useState(false);

    // Login
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");

    // Register

    const [registerEmail, setRegisterEmail] = React.useState("");
    const [registerLogin, setRegisterLogin] = React.useState("");
    const [registerName, setRegisterName] = React.useState("");
    const [registerAddres, setRegisterAddres] = React.useState("");
    const [registerPassword, setRegisterPassword] = React.useState("");
    const [registerRepeatPassword, setRegisterRepeatPassword] = React.useState("");


    let Login = async () => {


        try {
            await fetch(`${ENV.BASE_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "login": login,
                    "password": password
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.isLogged) {
                        setUser(data.user);
                        navigaion("/");
                    } else {
                        setIsError(true);
                    }
                });
        } catch (e) {
            alert(e);
        }
    }


        let Register = async () => {


            const containsNullByte = (str) => str.includes('\0');

            if (containsNullByte(registerName) || containsNullByte(registerPassword) || containsNullByte(registerLogin) || containsNullByte(registerAddres)) {
                alert("Введены недопустимые символы");
                return;
            }

            try {
                var data = {
                    "fullName": registerName,
                    "email": registerEmail,
                    "login": registerLogin,
                    "password": registerPassword,
                    "address": registerAddres
                }
                await fetch(`${ENV.BASE_URL}/user/register`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(data)
                })
                    .then(async (res) => {
                        console.log("Статус ответа:", res.status);

                        // Проверка на успешный статус ответа
                        if (!res.ok) {
                            const errorText = await res.text();
                            console.error("Ошибка со стороны сервера:", errorText);
                            throw new Error(`Ошибка сервера: ${errorText}`);
                        }

                        // Если ответ успешный, пытаемся разобрать JSON
                        const responseJson = await res.json();
                        console.log("Тело ответа:", responseJson);
                        return responseJson;
                    })
                    .then((data) => {
                        console.log("Полученные данные:", data);

                        // Проверяем содержимое ответа на наличие ошибок
                        if (data.error) {
                            alert(data.error);
                        } else {
                            alert("Регистрация прошла успешно!");
                        }
                    })
                    .catch((e) => {
                        console.error("Ошибка:", e);
                        alert("Произошла ошибка: " + e.message);
                    });
            } catch (e) {
                console.log(e);
            }
        }

    return (
        <div className="auth_page active">
            <div className={[`login_Form`, !isRegister ? "active" : ""].join(" ")}>
                <h1>Вход</h1>
                <div className={["login_form_inputs",isError ? "error" :""].join(" ")}>
                    <label htmlFor="email">Логин</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="login_form_buttons">
                    <button
                        id="login_submit"
                        onClick={() => Login()}
                    >Войти</button>
                    <p>У вас нет аккаунта? <a id="register_sw_button"
                        onClick={() => setIsRegister(true)}
                    >Зарегистрироваться</a></p>
                </div>
            </div>
            <div className={["register_Form", isRegister ? " active " : "", isSecondRegisterPage ? " next " : ""].join(" ")}>
                <h1>Введите адрес электронной почты</h1>
                <div className="register_form_inputs inp1" >
                    <label htmlFor="email">Почта</label>
                    <input
                        type="text"
                        id="register_email"
                        placeholder="name@email.com"
                        disabled={isSecondRegisterPage}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        value={registerEmail}
                    />


                    <div className="inp2">
                        <label htmlFor="register_login">Логин</label>
                        <input
                            type="text"
                            id="register_login"
                            placeholder="логин"
                            onChange={(e) => setRegisterLogin(e.target.value)}
                            value={registerLogin}
                        />
                        <label htmlFor="register_name">Имя</label>
                        <input
                            type="text"
                            id="register_name"
                            placeholder="имя"
                            onChange={(e) => setRegisterName(e.target.value)}
                            value={registerName}
                        />
                        <label htmlFor="register_addres">Адрес</label>
                        <input
                            type="text"
                            id="register_addres"
                            placeholder="адрес"
                            onChange={(e) => setRegisterAddres(e.target.value)}
                            value={registerAddres}
                        />
                        <label htmlFor="register_password">Пароль</label>
                        <input
                            type="password"
                            id="register_password"
                            placeholder="пароль"
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            value={registerPassword}
                        />
                        <label htmlFor="register_repeatpassword">Подтверждение пароля</label>
                        <input
                            type="password"
                            id="register_repeatpassword"
                            placeholder="пароль"
                            onChange={(e) => setRegisterRepeatPassword(e.target.value)}
                            value={registerRepeatPassword}
                        />
                    </div>
                </div>
                <div className="register_form_buttons">
                    <button
                        id="register_next"
                        onClick={() => setIsSecondRegisterPage(true)}
                        >Далее</button>
                    <button
                        id="register_button"
                        onClick={() => Register()}
                    >Зарегистрироваться</button>
                    <p>Уже зарегистрированы? <a onClick={()=>{
                        setIsRegister(false)
                        setIsSecondRegisterPage(false)
                    }} id="login_sw_button">Войти</a></p>
                </div>
            </div>

        </div>
    );
}

export default Auth;