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
} from "./data";
import { toast, Toaster } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCartProducts();
      // Assuming your serializer now embeds product details
      setCartItems(data || []);
    } catch (error) {
      toast.error("Could not load your cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (id, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;

    // Optimistic UI update
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item,
      ),
    );

    try {
      await updateCartItem(id, newQty);
    } catch (error) {
      toast.error("Failed to update quantity");
      fetchCart(); // Rollback on error
    }
  };

  const handleRemoveItem = async (id) => {
    // Optimistic UI update
    const previousItems = [...cartItems];
    setCartItems((prev) => prev.filter((item) => item.id !== id));

    try {
      await deleteCartItem(id);
      toast.success("Item removed");
    } catch (error) {
      toast.error("Could not remove item");
      setCartItems(previousItems); // Rollback
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const total = subtotal + 15; // + $15 shipping

  return (
    <div className="min-h-screen">
      <Toaster richColors />
      <Nav />
      <main className="max-w-7xl mx-auto pt-32 pb-20 px-6 md:px-16">
        <header className="flex items-center gap-4 mb-12">
          <h1 className="text-4xl font-light">Your Cart</h1>
          <span className="text-secondary text-sm">
            ({cartItems.length} items)
          </span>
        </header>

        {loading ? (
          <div className="text-center py-20 font-light italic">
            Syncing with server...
          </div>
        ) : cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 p-5 border-b bg-[#fcfcfc] items-center"
                >
                  <img
                    src={item.product.image}
                    className="w-24 h-32 object-cover"
                    alt={item.product.name}
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">
                        {item.product.name}
                      </h3>
                      <p className="font-semibold">
                        {formatCurrency(item.product.price)}
                      </p>
                      <button
                        onClick={() => {}}
                        className="text-white bg-secondary p-3 hover:text-green-500 flex items-center gap-1 text-xs uppercase font-bold"
                      >
                        <HugeiconsIcon icon={ShoppingBag01Icon} size={16} />{" "}
                        Purchase Item
                      </button>
                    </div>
                    <div className="flex justify-between mt-8">
                      <div className="flex items-center border rounded-sm">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity, -1)
                          }
                          className="p-2"
                        >
                          <HugeiconsIcon icon={Remove01Icon} size={14} />
                        </button>
                        <span className="px-4 text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity, 1)
                          }
                          className="p-2"
                        >
                          <HugeiconsIcon icon={Add01Icon} size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-xs uppercase font-bold"
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border p-8 sticky top-32">
                <h2 className="text-sm font-bold uppercase tracking-widest mb-6">
                  Summary
                </h2>
                <div className="space-y-4 border-b pb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{formatCurrency(15)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl font-bold py-6">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <button className="w-full bg-black text-white py-4 hover:bg-secondary transition-all flex items-center justify-center gap-2">
                  Checkout <HugeiconsIcon icon={ArrowRight02Icon} size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-light mb-4">Your bag is empty</h2>
            <button className="bg-black text-white px-8 py-3 uppercase text-xs font-bold">
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
