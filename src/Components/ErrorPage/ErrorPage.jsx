import React, {useEffect} from 'react';
import './errorPage.css';
function ErrorPage(props) {

    let [position, setPosition] = React.useState({top: 0, left: 0});

    const handleMouseMove = (event) => {
        setPosition({
            top: event.clientY,
            left: event.clientX
        });
    };

    useEffect(() => {
        // Добавляем обработчик события движения мыши
        window.addEventListener('mousemove', handleMouseMove);

        // Убираем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
       <div className={"error-page"}
       >
        <div className="text">
            <h1>404</h1>
            <h2>Uh, Ohh</h2>
            <h3>Sorry we cant find what you are looking for 'cuz its so dark in here</h3>
        </div>
        <div className="torch"
            style={{top: position.top, left: position.left}}
        ></div>
    </div>
);}

export default ErrorPage;