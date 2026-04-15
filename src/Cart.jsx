import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Delete02Icon,
  Add01Icon,
  Remove01Icon,
  ShoppingBag01Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";

import {
  getCartProducts,
  formatCurrency,
  updateCartItem,
  deleteCartItem,
  initializePayment,
  loadUserDetails,
} from "./data";
import { toast, Toaster } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCartProducts();
      setCartItems(data || []);
    } catch (error) {
      toast.error("Could not load your cart.");
    } finally {
      setLoading(false);
    }
  };

  const purchaseItem = async (item, amount) => {
    const res = await loadUserDetails();
    try {
      const paymentData = await initializePayment(
        parseInt(amount),
        res.id,
        res.email,
        item,
      );
      const payUrl = await paymentData.authorization_url;
      window.location.href = payUrl;
    } catch (error) {
      toast.error("Could not purchase item.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item,
      ),
    );

    try {
      await updateCartItem(id, newQty);
    } catch (error) {
      toast.error("Failed to update quantity");
      fetchCart();
    }
  };

  const handleRemoveItem = async (id) => {
    const previousItems = [...cartItems];
    setCartItems((prev) => prev.filter((item) => item.id !== id));

    try {
      await deleteCartItem(id);
      toast.success("Item removed");
    } catch (error) {
      toast.error("Could not remove item");
      setCartItems(previousItems);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const total = subtotal + 15;

  return (
    <div className="min-h-screen">
      <Toaster richColors position="top-center" duration={1500} />
      <Nav />
      <main className="max-w-7xl mx-auto pt-24 md:pt-32 pb-20 px-4 md:px-16">
        <header className="flex items-baseline gap-3 mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-light">Your Cart</h1>
          <span className="text-secondary text-sm">
            ({cartItems.length} items)
          </span>
        </header>

        {loading ? (
          <div className="text-center py-20 font-light italic">
            Data Syncing, please wait...
          </div>
        ) : cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 md:gap-6 p-4 md:p-5 border-b bg-[#fcfcfc] sm:items-center"
                >
                  <img
                    src={item.product.image}
                    className="w-full sm:w-24 h-48 sm:h-32 object-cover rounded-sm"
                    alt={item.product.name}
                  />
                  <div className="flex-grow flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">
                          {item.product.name}
                        </h3>
                        <p className="font-semibold text-secondary">
                          {formatCurrency(item.product.price)}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          purchaseItem(
                            item.id,
                            item.product.price * item.quantity,
                          )
                        }
                        className="text-white bg-secondary p-2 md:p-3 hover:bg-black transition-colors flex items-center gap-1 text-[10px] md:text-xs uppercase font-bold rounded-sm"
                      >
                        <HugeiconsIcon icon={ShoppingBag01Icon} size={14} />
                        <span className="hidden xs:inline">Purchase</span>
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center border rounded-sm bg-white">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity, -1)
                          }
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <HugeiconsIcon icon={Remove01Icon} size={14} />
                        </button>
                        <span className="px-4 text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity, 1)
                          }
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <HugeiconsIcon icon={Add01Icon} size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-[10px] md:text-xs uppercase font-bold transition-colors"
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border p-6 md:p-8 sticky top-24">
                <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b pb-2">
                  Order Summary
                </h2>
                <div className="space-y-4 border-b pb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">{formatCurrency(15)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold py-6">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <button
                  onClick={() =>
                    toast.info(
                      "CHILL OUT !!! THIS FEATURE IS STILL IN DEVELOPMENT",
                    )
                  }
                  className="w-full bg-black text-white py-4 hover:bg-secondary transition-all flex items-center justify-center gap-2 rounded-sm active:scale-95"
                >
                  Checkout <HugeiconsIcon icon={ArrowRight02Icon} size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 px-4">
            <h2 className="text-2xl font-light mb-4">Your bag is empty</h2>
            <button
              onClick={() => (window.location.href = "/shop")}
              className="bg-black text-white px-8 py-3 uppercase text-xs font-bold hover:bg-secondary transition-colors"
            >
              Return to Shop
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
