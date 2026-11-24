
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  ShoppingCart,
  Search,
  Heart,
  RefreshCw,
} from "lucide-react";

import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";

import {
  setProducts,
  setLoading,
  setError,
} from "../redux/slices/productSlice";

function Products() {
  const dispatch = useDispatch();

  // Get products from Redux
  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  // Search, category and sorting states
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch products from JSON Server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));

        const response = await axios.get(
          "http://localhost:3000/products"
        );

        dispatch(setProducts(response.data));
      } catch (err) {
        dispatch(setError("Failed to load products. Please try again."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(
      items
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // Search, filter and sort products
  const filteredProducts = [...items]
    .filter((product) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        product.name?.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "low-high") {
        return Number(a.price) - Number(b.price);
      }

      if (sortOrder === "high-low") {
        return Number(b.price) - Number(a.price);
      }

      return 0;
    });

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Reset page when search or filters change
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  // Retry fetching products
  const handleRetry = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await axios.get(
        "http://localhost:3000/products"
      );

      dispatch(setProducts(response.data));
    } catch (err) {
      dispatch(setError("Failed to load products. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading products...
        </p>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
        <p className="text-lg font-semibold text-red-600">
          {error}
        </p>

        <button
          onClick={handleRetry}
          className="flex items-center gap-2 rounded-lg bg-green-700 px-6 py-3 text-white hover:bg-green-800"
        >
          <RefreshCw size={18} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8 lg:px-12">

      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Our Products
        </h1>

        <p className="mt-2 text-gray-500">
          Discover fresh and quality products at CHANGARATH MART.
        </p>
      </div>

      {/* SEARCH AND FILTER SECTION */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* SEARCH */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              handleSearchChange(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-green-600"
          />
        </div>

        {/* CATEGORY FILTER */}
        <select
          value={selectedCategory}
          onChange={(e) =>
            handleCategoryChange(e.target.value)
          }
          className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "All" ? "All Categories" : category}
            </option>
          ))}
        </select>

        {/* PRICE SORT */}
        <select
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value)}
          className="rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
        >
          <option value="default">Default Sorting</option>
          <option value="low-high">
            Price: Low to High
          </option>
          <option value="high-low">
            Price: High to Low
          </option>
        </select>

      </div>

      {/* PRODUCT COUNT */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} products
        </p>

        <button
          onClick={() => {
            setSearch("");
            setSelectedCategory("All");
            setSortOrder("default");
            setCurrentPage(1);
          }}
          className="text-sm font-semibold text-green-700 hover:text-green-900"
        >
          Clear Filters
        </button>
      </div>

      {/* PRODUCT GRID */}
      {filteredProducts.length === 0 ? (

        <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
          <ShoppingCart
            size={55}
            className="mx-auto mb-4 text-gray-300"
          />

          <h2 className="text-xl font-bold text-gray-800">
            No Products Found
          </h2>

          <p className="mt-2 text-gray-500">
            Try searching with another name or category.
          </p>
        </div>

      ) : (

        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {currentProducts.map((product) => (

              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* PRODUCT IMAGE */}
                <Link to={`/products/${product.id}`}>
                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-100 p-4">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />

                  </div>
                </Link>

                {/* PRODUCT INFORMATION */}
                <div className="p-5">

                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-green-700">
                    {product.category}
                  </p>

                  <Link to={`/products/${product.id}`}>
                    <h2 className="text-lg font-bold text-gray-900 transition hover:text-green-700">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="mt-2 text-sm text-gray-500">
                    {Number(product.stock) > 0
                      ? `${product.stock} available`
                      : "Out of Stock"}
                  </p>

                  {/* PRICE */}
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-bold text-green-700">
                      ₹{product.price}
                    </p>

                    <button
                      onClick={() =>
                        dispatch(addToWishlist(product))
                      }
                      title="Add to Wishlist"
                      className="rounded-full border border-gray-200 p-2 text-gray-500 transition hover:border-red-500 hover:text-red-500"
                    >
                      <Heart size={19} />
                    </button>
                  </div>

                  {/* ADD TO CART */}
                  <button
                    onClick={() =>
                      dispatch(addToCart(product))
                    }
                    disabled={Number(product.stock) <= 0}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    <ShoppingCart size={19} />

                    {Number(product.stock) > 0
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </button>

                </div>
              </div>

            ))}

          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">

              <button
                onClick={() =>
                  setCurrentPage((prev) => prev - 1)
                }
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-green-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (

                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-lg font-semibold transition ${
                    currentPage === page
                      ? "bg-green-700 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-green-100"
                  }`}
                >
                  {page}
                </button>

              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-green-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>

            </div>
          )}

        </>
      )}

    </div>
  );
}

export default Products;
