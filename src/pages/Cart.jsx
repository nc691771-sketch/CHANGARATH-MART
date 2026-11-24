
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from "../redux/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  // Get cart items from Redux
  const cartItems = useSelector(
    (state) => state.cart.items
  );

  // Calculate total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Increase quantity
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  // Decrease quantity
  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  // Remove product
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Clear cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 px-4 py-10 sm:px-8 lg:px-12">

      {/* PAGE HEADING */}
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
          <ShoppingCart size={32} />
          My Shopping Cart
        </h1>

        <p className="mt-2 text-gray-500">
          Review your selected products before checkout.
        </p>
      </div>

      {/* EMPTY CART */}
      {cartItems.length === 0 ? (

        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-sm">

          <ShoppingBag
            size={70}
            className="mb-5 text-gray-300"
          />

          <h2 className="text-2xl font-bold text-gray-900">
            Your Cart is Empty
          </h2>

          <p className="mt-3 text-gray-500">
            You haven't added any products to your cart yet.
          </p>

          <Link
            to="/products"
            className="mt-6 flex items-center gap-2 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>

        </div>

      ) : (

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* CART PRODUCTS */}
          <div className="space-y-5 lg:col-span-2">

            {/* CART HEADER */}
            <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">

              <h2 className="text-lg font-bold text-gray-900">
                Cart Items ({totalItems})
              </h2>

              <button
                onClick={handleClearCart}
                className="text-sm font-semibold text-red-600 transition hover:text-red-800"
              >
                Clear Cart
              </button>

            </div>

            {/* PRODUCT CARDS */}
            {cartItems.map((item) => (

              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
              >

                {/* PRODUCT IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 w-full rounded-xl object-cover sm:w-32"
                />

                {/* PRODUCT DETAILS */}
                <div className="flex-1">

                  <p className="text-sm font-medium text-green-700">
                    {item.category}
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-gray-900">
                    {item.name}
                  </h3>

                  <p className="mt-2 font-semibold text-gray-700">
                    ₹{item.price} each
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Available stock: {item.stock}
                  </p>

                </div>

                {/* QUANTITY CONTROLS */}
                <div className="flex items-center gap-3">

                  <button
                    onClick={() => handleDecrement(item.id)}
                    disabled={item.quantity <= 1}
                    className="rounded-lg border p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="min-w-6 text-center text-lg font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => handleIncrement(item.id)}
                    disabled={item.quantity >= item.stock}
                    className="rounded-lg border p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    <Plus size={18} />
                  </button>

                </div>

                {/* PRICE AND REMOVE */}
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">

                  <p className="text-xl font-bold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="flex items-center gap-2 text-sm font-medium text-red-600 transition hover:text-red-800"
                  >
                    <Trash2 size={17} />
                    Remove
                  </button>

                </div>

              </div>

            ))}

            {/* CONTINUE SHOPPING */}
            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-semibold text-gray-700 transition hover:text-green-700"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>

          </div>

          {/* ORDER SUMMARY */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-gray-600">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-semibold text-green-700">
                  Free
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>

            </div>

            {/* CHECKOUT BUTTON */}
            <Link
              to="/checkout"
              className="mt-7 flex w-full items-center justify-center rounded-xl bg-black px-5 py-4 font-bold text-white transition hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>

            <p className="mt-4 text-center text-xs text-gray-400">
              Thank you for shopping with CHANGARATH MART.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;
