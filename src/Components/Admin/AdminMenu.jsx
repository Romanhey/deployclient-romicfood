import React, {useState} from 'react';
import './AdminMenu.css';
import { ENV } from "../../Share/share";

function AdminMenu({ user }) {

    const [isCategoryPanelOpen, setIsCategoryPanelOpen] = React.useState(false);
    const [isProductPanelOpen, setIsProductPanelOpen] = React.useState(false);
    const [isOrderPanelOpen, setIsOrderPanelOpen] = React.useState(true);

    const [categories, setCategories] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [orders, setOrders] = React.useState([]);

    const [newCategory, setNewCategory] = React.useState({ categoryName: '', categoryDescription: '' });
    const [newProduct, setNewProduct] = React.useState({
        productName: '',
        price: '',
        productDescription: '',
        categoryId: '',
        imageSrc: null
    });
    const [newOrder, setNewOrder] = React.useState({ customer: '', status: '' });

    const [editCategory, setEditCategory] = React.useState(null);
    const [editProduct, setEditProduct] = React.useState(null);
    const [editOrder, setEditOrder] = React.useState(null);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalType, setModalType] = React.useState('');

    let getAllCategories = async () => {
        try {
            let response = await fetch(`${ENV.BASE_URL}/category`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            let data = await response.json();
            if (response.ok) {
                setCategories(data);
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    let getAllProducts = async () => {
        try {
            let response = await fetch(`${ENV.BASE_URL}/product`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            let data = await response.json();
            if (response.ok) {
                setProducts(data);
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    let getAllOrders = async () => {
        try {
            let response = await fetch(`${ENV.BASE_URL}/order`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            let data = await response.json();
            if (response.ok) {
                setOrders(data);
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getAllCategories();
        getAllProducts();
        getAllOrders();
    }, [])

    // Открытие модального окна для редактирования
    const openEditModal = (item, type) => {
        setIsModalOpen(true);
        setModalType(type);
        if (type === 'category') setEditCategory(item);
        if (type === 'product') setEditProduct(item);
        if (type === 'order') setEditOrder(item);
    }

    // Закрытие модального окна
    const closeModal = () => {
        setIsModalOpen(false);
        setEditCategory(null);
        setEditProduct(null);
        setEditOrder(null);
    }

    // Функции для обработки изменения в формах
    const handleCategoryChange = (e) => setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    // Обработчик изменения полей формы
    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Обработчик для загрузки изображения
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewProduct((prevState) => ({
            ...prevState,
            imageSrc: file
        }));
    };

    const handleeFileEditChange = (e) => {
        const file = e.target.files[0];
        setEditProduct((prevState) => ({
            ...prevState,
            formFile: file
        }));
    }
    const handleOrderChange = (e) => setNewOrder({ ...newOrder, [e.target.name]: e.target.value });

    const handleEditCategoryChange = (e) => setEditCategory({ ...editCategory, [e.target.name]: e.target.value });
    const handleEditProductChange = (e) => setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
    const handleEditOrderChange = (e) => setEditOrder({ ...editOrder, [e.target.name]: e.target.value });




    let updateCategory = async (category) => {
        try {
            let response = await fetch(`${ENV.BASE_URL}/category/${category.categoryId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    categoryName: category.categoryName,
                    categoryDescription: category.categoryDescription
                })
            });
            let data = await response.json();
            if (response.ok) {
                console.log(data);
                getAllCategories();
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    let deleteCategory = async (category) => {
        var result = window.confirm("Do you really want to delete this category?");
        if (!result) return;
        try {
            let response = await fetch(`${ENV.BASE_URL}/category/${category.categoryId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            let data = await response.json();
            if (response.ok) {
                getAllCategories();
            } else {
                alert("ошибка");
            }
        } catch (err) {
            console.log(err);
        }
    }

    let createCategory = async () => {
        if(newCategory.categoryName === '' || newCategory.categoryDescription === '') {
            alert('Пожалуйста, заполните все поля');
            return;
        }


        try {
            let response = await fetch(`${ENV.BASE_URL}/category/category`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCategory)
            });
            let data = await response.json();
            if (response.ok) {
                setNewCategory({ categoryName: '', categoryDescription: '' });
                await getAllCategories();
            } else {
                alert("ошибка");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const createProduct = async () => {
        if (
            !newProduct.productName ||
            !newProduct.price ||
            !newProduct.productDescription ||
            !newProduct.categoryId ||
            !newProduct.imageSrc
        ) {
            alert('Please fill in all fields');
            return;
        }

        const formData = new FormData();
        formData.append('formFile', newProduct.imageSrc); // добавляем файл
        formData.append('ProductName', newProduct.productName);
        formData.append('Price', newProduct.price);
        formData.append('ProductDescription', newProduct.productDescription);
        formData.append('CategoryId', newProduct.categoryId);

        try {
            const response = await fetch(`${ENV.BASE_URL}/product/product`, {
                method: 'PUT', // используем POST для создания нового продукта
                body: formData
            });

            if (response.ok) {
                alert('Product added successfully');
                setNewProduct({
                    productName: '',
                    price: '',
                    productDescription: '',
                    categoryId: '',
                    imageSrc: null
                });
                await getAllProducts();
            } else {
                alert('Error while adding product');
            }
        } catch (err) {
            console.log('Error:', err);
        }
    };


    let deleteProduct = async (product) => {
        var result = window.confirm("Do you really want to delete this product?");
        if (!result) return;
        try {
            let response = await fetch(`${ENV.BASE_URL}/product/${product.productId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            let data = await response.json();
            if (response.ok) {
                getAllProducts();
            } else {
                alert("ошибка");
            }
        } catch (err) {
            console.log(err);
        }
    }

    let updateProduct = async (product) => {
        console.log(product);

        // Check if required fields are filled
        if (!product.productName || !product.price || !product.productDescription || !product.categoryId) {
            alert('Please fill in all fields');
            return;
        }

        // Check if the file is provided
        if (!product.formFile) {
            alert('Please upload a file');
            return;
        }

        // Prepare FormData to send the data correctly
        let formData = new FormData();
        formData.append('formFile', product.formFile);
        formData.append('ProductName', product.productName);
        formData.append('Price', product.price);
        formData.append('ProductDescription', product.productDescription);
        formData.append('CategoryId', product.categoryId);

        try {
            // Send PATCH request with formData
            let response = await fetch(`${ENV.BASE_URL}/product/${product.productId}`, {
                method: "PATCH",
                body: formData, // No need for Content-Type header when using FormData
            });

            let data = await response.json();
            if (response.ok) {
                console.log(data);
                getAllProducts(); // Call this function if the update was successful
            } else {
                alert("Error occurred while updating the product.");
            }
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="admin-menu">
            <h1>Admin Panel</h1>

            {/* Панель управления категориями */}
            <button onClick={() => setIsCategoryPanelOpen(!isCategoryPanelOpen)}>
                {isCategoryPanelOpen ? 'Hide Categories' : 'Show Categories'}
            </button>
            {isCategoryPanelOpen && (
                <div className="category-panel admin-panel">
                    <h2>Categories</h2>
                    <input
                        type="text"
                        name="categoryName"
                        placeholder="Category Name"
                        value={newCategory.categoryName}
                        onChange={handleCategoryChange}
                    />
                    <input
                        type="text"
                        name="categoryDescription"
                        placeholder="Category Description"
                        value={newCategory.categoryDescription}
                        onChange={handleCategoryChange}
                    />
                    <button
                        onClick={createCategory}
                    >Add Category</button>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map(category => (
                            <tr key={category.categoryId}>
                                <td>{category.categoryId}</td>
                                <td>{category.categoryName}</td>
                                <td>
                                    <button onClick={() => openEditModal(category, 'category')}>Edit</button>
                                    <button
                                        onClick={() => deleteCategory(category)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Панель управления продуктами */}
            <button onClick={() => setIsProductPanelOpen(!isProductPanelOpen)}>
                {isProductPanelOpen ? 'Hide Products' : 'Show Products'}
            </button>
            {isProductPanelOpen && (
                <div className="product-panel admin-panel">
                    <h2>Products</h2>
                    <h2>Products</h2>
                    <input
                        type="text"
                        name="productName"
                        placeholder="Product Name"
                        value={newProduct.productName}
                        onChange={handleProductChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={handleProductChange}
                    />
                    <input
                        type="text"
                        name="productDescription"
                        placeholder="Product Description"
                        value={newProduct.productDescription}
                        onChange={handleProductChange}
                    />
                    <input
                        type="text"
                        name="categoryId"
                        placeholder="Category ID"
                        value={newProduct.categoryId}
                        onChange={handleProductChange}
                    />
                    <input
                        type="file"
                        name="formFile"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <button onClick={createProduct}>Add Product</button>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(product => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button onClick={() => openEditModal(product, 'product')}>Edit</button>
                                    <button
                                        onClick={() => deleteProduct(product)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Панель управления заказами */}
            <button onClick={() => setIsOrderPanelOpen(!isOrderPanelOpen)}>
                {isOrderPanelOpen ? 'Hide Orders' : 'Show Orders'}
            </button>
            {isOrderPanelOpen && (
                <div className="order-panel admin-panel">
                    <h2>Orders</h2>
                    <input
                        type="text"
                        name="customer"
                        placeholder="Customer Name"
                        value={newOrder.customer}
                        onChange={handleOrderChange}
                    />
                    <input
                        type="text"
                        name="status"
                        placeholder="Order Status"
                        value={newOrder.status}
                        onChange={handleOrderChange}
                    />
                    <button>Add Order</button>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.customerId}</td>
                                <td>{order.status}</td>
                                <td>
                                    <button onClick={() => openEditModal(order, 'order')}>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Модальное окно для редактирования */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{`Edit ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}</h2>
                        {modalType === 'category' && (
                            <>
                                <input
                                    type="text"
                                    name="categoryName"
                                    value={editCategory.categoryName}
                                    onChange={handleEditCategoryChange}
                                />
                                <input
                                    type="text"
                                    name="categoryDescription"
                                    value={editCategory.categoryDescription}
                                    onChange={handleEditCategoryChange}
                                />
                            </>
                        )}
                        {modalType === 'product' && (
                            <>
                                <input
                                    type="text"
                                    name="productName"
                                    value={editProduct.productName}
                                    onChange={handleEditProductChange}
                                    placeholder="Product Name"
                                />
                                <input
                                    type="number"
                                    name="price"
                                    value={editProduct.price}
                                    onChange={handleEditProductChange}
                                    placeholder="Price"
                                />
                                <input
                                    type="text"
                                    name="productDescription"
                                    value={editProduct.productDescription}
                                    onChange={handleEditProductChange}
                                    placeholder="Product Description"
                                />
                                <input
                                    type="text"
                                    name="categoryId"
                                    value={editProduct.categoryId}
                                    onChange={handleEditProductChange}
                                    placeholder="Category ID"
                                />
                                {/* Поле для загрузки нового изображения */}
                                <input
                                    type="file"
                                    name="formFile"
                                    accept="image/*"
                                    onChange={handleeFileEditChange}
                                />
                            </>
                        )}
                        {modalType === 'order' && (
                            <>
                                <input
                                    type="text"
                                    name="customer"
                                    value={editOrder.customer}
                                    onChange={handleEditOrderChange}
                                />
                                <input
                                    type="text"
                                    name="status"
                                    value={editOrder.status}
                                    onChange={handleEditOrderChange}
                                />
                            </>
                        )}
                        <button
                            onClick={() => {
                                if (modalType === 'category') updateCategory(editCategory);
                                if (modalType === 'product') updateProduct(editProduct);
                            }}
                        >Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminMenu;
