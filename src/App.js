import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Website/Component/Header'
import Footer from './Website/Component/Footer'
import Home from './Website/Pages/Home'
import About from './Website/Pages/About'
import Contact from './Website/Pages/Contact'
import Shop from './Website/Pages/Shop'
import Shop_single from './Website/Pages/Shop_single'
import Cart from './Website/Pages/Cart'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AHeader from "./Admin/Component/AHeader";
import AFooter from './Admin/Component/AFooter'
import Dashboard from './Admin/Pages/Admin'
import Add_categories from './Admin/Pages/Add_categories'
import Manage_categories from './Admin/Pages/Manage_categories'
import Add_products from './Admin/Pages/Add_products'
import Manage_products from './Admin/Pages/Manage_products'
import Manage_customers from './Admin/Pages/Manage_customers'
import Manage_contacts from './Admin/Pages/Manage_contact'
import Login from './Admin/Pages/Login'
import Signup from './Admin/Pages/Signup'
import CustomerSignup from './Website/Pages/CustomerSignup'
import CustomerLogin from './Website/Pages/CustomerLogin'
import CustomerPage from './Website/Pages/CustomerPage'
import Admin_auth from "./Admin/Component/Admin_auth";
import After_uauth from "./Website/Component/After_uauth";
import Before_uauth from "./Website/Component/Before_uauth";
function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.title} has been added to your cart!`);
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  const removeFromCart = (id) => {
    if (window.confirm("Remove this item from your cart?")) {
      setCart((prev) => prev.filter(item => item.id !== id));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Header cart={cart} /><Home addToCart={addToCart} /><Footer /></>}></Route>
          <Route path="/about" element={<><Header cart={cart} /><About/><Footer /></>}></Route>
          <Route path="/shop" element={<><Header cart={cart} /><Shop addToCart={addToCart} /><Footer /></>}></Route>
          <Route path="/contact" element={<><Header cart={cart} /><Contact/><Footer /></>}></Route>
          <Route path="/shop_single/:id" element={<><Header cart={cart} /><Shop_single addToCart={addToCart}/><Footer /></>}></Route>
          <Route path="/cart" element={<><Header cart={cart} /><Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} /><Footer /></>}></Route>
          <Route element={<Before_uauth />}>
            <Route path="/login" element={<><Header /><Login /><Footer /></>}></Route>
            <Route path="/signup" element={<><Header /><Signup /><Footer /></>}></Route>
            <Route path="/customer-login" element={<><Header /><CustomerLogin /><Footer /></>}></Route>
            <Route path="/customer-signup" element={<><Header /><CustomerSignup /><Footer /></>}></Route>
          </Route>
          <Route element={<After_uauth />}>
            <Route path="/CustomerPage" element={<><Header /><CustomerPage /><Footer /></>}></Route>
            <Route path="/customer-page" element={<><Header /><CustomerPage /><Footer /></>}></Route>
          </Route>
                   {/* Protected Routes Wrapper */}
          <Route element={<Admin_auth />}>
            <Route path="/admin" element={<><AHeader /><Dashboard /><AFooter /></>}></Route>
            <Route path="/Dashboard" element={<><AHeader /><Dashboard /><AFooter /></>}></Route>
            <Route path="/add_categories" element={<><AHeader /><Add_categories /><AFooter /></>}></Route>
            <Route path="/manage_categories" element={<><AHeader /><Manage_categories /><AFooter /></>}></Route>
            <Route path="/add_products" element={<><AHeader /><Add_products /><AFooter /></>}></Route>
            <Route path="/manage_products" element={<><AHeader /><Manage_products /><AFooter /></>}></Route>
            <Route path="/manage_customers" element={<><AHeader /><Manage_customers /><AFooter /></>}></Route>
            <Route path="/manage_contacts" element={<><AHeader /><Manage_contacts /><AFooter /></>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App;