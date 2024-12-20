import './App.css';
import Header from "./Components/Header/Header";
import Auth from "./Components/Auth/Auth";
import {Route, Routes} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Profile} from "./Components/Profile/Profile";
import CardList from "./Components/CardList/CardList";
import Cart from "./Components/Cart/Cart";
import Nav from "./Components/Nav/Nav";
import {ENV} from "./Share/share";
import ProductMenu from "./Components/ProductMenu/ProductMenu";
import AdminMenu from "./Components/Admin/AdminMenu";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import Footer from "./Components/Footer/Footer";

function App() {
    const [user, setUser] = useState({
        userId: null,
        login: null,
        name: null,
        email: null,
        address: null,
        isAdmin: false
    });

    const [searchText,setSearchText] = useState("");

    const targetRef = useRef(null);

    const [products,setProducts] = useState([]);
    const [cartProductsList, setCartProductsList] = useState([]);

    const [productMenu, setProductMenu] = useState({});

    let GetAllProducts = async () => {
        try{
            await fetch(`${ENV.BASE_URL}/product`, {
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
                        setProducts(data);
                    }
                });
        }catch (err){
            console.log(err);
        }
    }

    const handleInputChange = (e) => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
            GetAllProducts();
    }, []);

    const footerRef = useRef(null);
    const scrollToFooter = () => {
        if(footerRef.current){
            footerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };
  return (
    <div className="App">
        <Nav
            isAuth={user?.userId !== null}
            CartProductsCount={cartProductsList.reduce((res, pr) => res + pr.quantity, 0)}
            products={products}
            setSearchText={setSearchText}
            searchText={searchText}
            scroll={handleInputChange}
            scrollToFooter={scrollToFooter}
        />

        <Routes>
            <Route path="/" element={
                <>
                    <Header isAuth={user?.userId !== null}/>
                    <CardList
                        targetRef={targetRef}
                        products={products}
                        setProductsCardList={setCartProductsList}
                        cart={cartProductsList}
                        searchText={searchText}
                        setProductMenu={setProductMenu}
                    />

                    <ProductMenu
                        product={productMenu}
                        setProductMenu={setProductMenu}
                        isAdmin={user.isAdmin}
                    />
                    <Footer
                        ref={footerRef}
                    />

                </>
            } />
            <Route path="/auth" element={<Auth setUser={setUser}/>} />
            <Route path={"/profile"} element={< Profile user={user}/>} />
            <Route path={"/cart"} element={
                <Cart
                    list={cartProductsList}
                    user={user}
                    setList = {setCartProductsList}
                />
            } />
            <Route path={"/admin"} element={<AdminMenu user={user}/>} />
            <Route path="*" element={<ErrorPage/>} />

        </Routes>

    </div>
  );
}

export default App;
