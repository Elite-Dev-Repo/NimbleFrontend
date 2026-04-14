import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { HugeiconsIcon } from "@hugeicons/react";
import Loading from "./components/Loading";
import {
  FilterIcon,
  Sorting05Icon,
  FavouriteIcon,
  ShoppingBasket01Icon,
  Add01Icon,
  Remove01Icon,
} from "@hugeicons/core-free-icons";
import { getProducts, formatCurrency, addToCart } from "./data";
// Assuming 'toaster' provides a toast function
import { Toaster, toast } from "sonner";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [quantities, setQuantities] = useState({});

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);

      const initialQuantities = {};
      if (Array.isArray(data)) {
        data.forEach((p) => (initialQuantities[p.id] = 1));
      }
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleQuantityChange = (productId, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta),
    }));
  };

  // Logic to handle the API call and the Toast notification
  const handleAddToCart = async (product) => {
    const qty = quantities[product.id] || 1;
    try {
      await addToCart(product.id, qty);
      // Call toast as a function, not a component
      toast.success(`Added ${qty} ${product.name} to cart`);
    } catch (error) {
      toast.error("Failed to add item to cart. Please login.");
    }
  };

  const categories = [
    "All",
    "Premium",
    "Featured",
    "Lifestyle",
    "Limited",
    "Vegan",
  ];

  const filteredProducts = Array.isArray(products)
    ? activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory)
    : [];

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Nav />

      <main className="max-w-[1440px] mx-auto pt-32 pb-20 px-6 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-light tracking-tight">
              Shop Collection
            </h1>
            <p className="text-gray-500 font-light italic font-serif">
              Engineered for the planet, worn for the journey.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="hidden lg:block p-8 w-64 space-y-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`cursor-pointer text-sm transition-all hover:pl-2 ${
                      activeCategory === cat
                        ? "text-secondary font-semibold pl-2"
                        : "text-gray-500"
                    }`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="grow">
            {loading ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group border border-white cursor-pointer bg-white/10 backdrop-blur-3xl shadow-sm p-4 rounded-sm"
                  >
                    <div className="relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden rounded-sm">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Interaction Bar */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 group-hover:translate-y-0 transition-transform duration-300 bg-white/95 backdrop-blur-sm flex items-center justify-between border-t border-gray-100">
                        <div className="flex items-center bg-gray-100 rounded-full px-2 py-1 gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(product.id, -1);
                            }}
                            className="p-1 hover:text-secondary"
                          >
                            <HugeiconsIcon icon={Remove01Icon} size={14} />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {quantities[product.id] || 1}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuantityChange(product.id, 1);
                            }}
                            className="p-1 hover:text-secondary"
                          >
                            <HugeiconsIcon icon={Add01Icon} size={14} />
                          </button>
                        </div>

                        <button
                          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-secondary transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          <span className="text-[10px] font-bold uppercase tracking-tighter">
                            Add
                          </span>
                          <HugeiconsIcon
                            icon={ShoppingBasket01Icon}
                            size={16}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-start bg-white backdrop-blur-3xl shadow-sm p-4 rounded-sm border border-white/50">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1 font-light">
                          {product.category}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-medium text-gray-900">
                          {formatCurrency(Number(product.price))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
