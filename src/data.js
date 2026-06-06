import api from "./api";
import axios from "axios";
import { ACCESS, REFRESH } from "./constants";

const BASE_URL = import.meta.env.VITE_API_URL;
export const PAYMENT_REFERENCE_KEY = "nimble_payment_reference";
export const PAYMENT_ORDER_KEY = "nimble_payment_order";

// --- PRODUCT FETCHING ---

export const getProducts = async () => {
  try {
    const response = await api.get(`products/`);
    return response.data.results || response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const loadUserDetails = async () => {
  try {
    const response = await api.get("me/");
    console.log("User details response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

export const getProductDetails = async (productId) => {
  try {
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
    console.log("Cart products response:", response.data.count);
    return response.data.results || response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// getCartProducts(); // Call this on Cart page load to populate cart state

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
export const createOrder = async () => {
  try {
    const orderResponse = await api.post("/orders/");
    const order = orderResponse.data;

    const user = await loadUserDetails();

    const payment = await initializePayment({
      amount: order.total_price,
      email: user.email,
      order: order.id,
    });

    return { order, payment };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export const initializePayment = async ({ amount, email, order }) => {
  try {
    const response = await api.post("/payments/initiate/", {
      amount,
      email,
      order,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyPayment = async (reference) => {
  try {
    const encodedReference = encodeURIComponent(reference);
    let response;

    try {
      response = await api.get(`/payments/verify/${encodedReference}/`);
    } catch (pathError) {
      if (![400, 404, 405].includes(pathError?.response?.status)) {
        throw pathError;
      }

      response = await api.get("/payments/verify/", {
        params: { reference },
      });
    }

    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

export const savePendingPayment = ({ reference, orderId }) => {
  if (!reference) return;

  sessionStorage.setItem(PAYMENT_REFERENCE_KEY, reference);

  if (orderId) {
    sessionStorage.setItem(PAYMENT_ORDER_KEY, orderId);
  }
};

export const clearPendingPayment = () => {
  sessionStorage.removeItem(PAYMENT_REFERENCE_KEY);
  sessionStorage.removeItem(PAYMENT_ORDER_KEY);
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
