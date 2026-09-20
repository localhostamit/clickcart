import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Orders from "./Pages/Orders";
import Wishlist from "./Pages/Wishlist";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";

// Admin imports
import AdminDashboard from "./ADMIN/AdminDashboard";
import AdminProducts from "./ADMIN/AdminProducts";
import AddProduct from "./ADMIN/AddProduct";
import EditProduct from "./ADMIN/EditProduct";
import AdminOrders from "./ADMIN/AdminOrders";
import AdminUsers from "./ADMIN/AdminUsers";
import AdminCategories from "./ADMIN/AdminCategories";
import AdminLogin from "./ADMIN/AdminLogin";
import AdminProtectedRoute from "./ADMIN/AdminProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />}/>
      <Route path="/orders" element={<Orders />} />

 {/* ================= ADMIN ================= */}
      <Route path="/admin/login" element={<AdminLogin />}/>
      <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard/></AdminProtectedRoute>}/>
      <Route path="/admin/products" element={<AdminProtectedRoute><AdminProducts/></AdminProtectedRoute>}/>
      <Route path="/admin/products/add" element={<AdminProtectedRoute><AddProduct/></AdminProtectedRoute>}/>
      <Route path="/admin/products/edit/:id" element={<AdminProtectedRoute><EditProduct/></AdminProtectedRoute>}/>
      <Route path="/admin/orders" element={<AdminProtectedRoute><AdminOrders/></AdminProtectedRoute>}/>
      <Route path="/admin/users" element={<AdminProtectedRoute><AdminUsers/></AdminProtectedRoute>}/>
      <Route path="/admin/categories" element={<AdminProtectedRoute><AdminCategories/></AdminProtectedRoute>}/>
    </Routes>
  );
}

export default App;