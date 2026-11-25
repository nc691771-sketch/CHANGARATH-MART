
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ShoppingCart, ArrowLeft } from "lucide-react";

import { addToCart } from "../redux/slices/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );

        setProduct(response.data);
      } catch (error) {
        setError("Product not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading product...</p>
      </div>
    );
  }

  // Error
  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-red-600">
          {error || "Product not found!"}
        </h2>

        <Link
          to="/products"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-8 lg:px-16">

      {/* BACK BUTTON */}
      <Link
        to="/products"
        className="mb-8 inline-flex items-center gap-2 text-gray-600 transition hover:text-green-700"
      >
        <ArrowLeft size={20} />
        Back to Products
      </Link>

      {/* PRODUCT DETAILS */}
      <div className="mx-auto grid max-w-6xl gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">

        {/* IMAGE */}
        <div className="flex items-center justify-center rounded-xl bg-gray-100 p-6">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[450px] w-full rounded-xl object-contain"
          />
        </div>

        {/* INFORMATION */}
        <div className="flex flex-col justify-center">

          <p className="mb-3 w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            {product.category}
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-5 text-3xl font-bold text-green-700">
            ₹{product.price}
          </p>

          <p className="mt-4 text-gray-600">
            {product.description ||
              `Enjoy quality ${product.name} from CHANGARATH MART. Shop fresh products at great prices.`}
          </p>

          {/* STOCK */}
          <div className="mt-6">
            {product.stock > 0 ? (
              <p className="font-semibold text-green-700">
                In Stock: {product.stock} available
              </p>
            ) : (
              <p className="font-semibold text-red-600">
                Out of Stock
              </p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">

            <button
              onClick={() => dispatch(addToCart(product))}
              disabled={product.stock <= 0}
              className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-4 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
