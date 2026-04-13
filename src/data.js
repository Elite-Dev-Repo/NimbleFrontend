import api from "./api";
import axios from "axios";
import { ACCESS, REFRESH } from "./constants";

const BASE_URL = import.meta.env.VITE_API_URL;

// --- PRODUCT FETCHING ---

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}products/`);
    return response.data.results || response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductDetails = async (productId) => {
  try {
    // Used standard axios because product info is usually public
    const response = await axios.get(`${BASE_URL}products/${productId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

// --- CART ACTIONS (Requires Auth) ---

export const getCartProducts = async () => {
  try {
    const response = await api.get("/cart-items/");
    return response.data.results || response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await api.post("/cart-items/", {
      product_id: productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

/**
 * Updates the quantity of a specific cart item
 * @param {string} cartItemId - The UUID of the CartItem record
 * @param {number} quantity - The new quantity
 */
export const updateCartItem = async (cartItemId, quantity) => {
  try {
    const response = await api.patch(`/cart-items/${cartItemId}/`, {
      quantity: quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
};

/**
 * Removes an item from the cart
 * @param {string} cartItemId - The UUID of the CartItem record
 */
export const deleteCartItem = async (cartItemId) => {
  try {
    const response = await api.delete(`/cart-items/${cartItemId}/`);
    return response.data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    throw error;
  }
};

// --- HELPERS ---

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const handleLogout = () => {
  localStorage.removeItem(ACCESS);
  localStorage.removeItem(REFRESH);
};
