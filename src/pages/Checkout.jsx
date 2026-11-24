
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ShoppingBag, ArrowLeft, MapPin } from "lucide-react";

import { clearCart } from "../redux/slices/cartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart and user data from Redux
  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const user = useSelector(
    (state) => state.auth.user
  );

  // Form states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate total
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Place order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const orderData = {
        customer: {
          name,
          email,
          phone,
          address,
          city,
          pincode,
        },

        userId: user?.id || null,

        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),

        totalPrice,
        paymentMethod,
        status: "Pending",
        orderDate: new Date().toISOString(),
      };

      await axios.post(
        "http://localhost:3000/orders",
        orderData
      );

      // Clear cart after successful order
      dispatch(clearCart());

      // Go to Orders page
      navigate("/orders");

    } catch (error) {
      setError("Unable to place your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">

        <ShoppingBag size={65} className="mb-5 text-gray-300" />

        <h1 className="text-2xl font-bold text-gray-900">
          Your Cart is Empty
        </h1>

        <p className="mt-2 text-gray-500">
          Add some products before checkout.
        </p>

        <Link
          to="/products"
          className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-white hover:bg-green-700"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-8 lg:px-12">

      {/* PAGE HEADING */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Checkout
        </h1>

        <p className="mt-2 text-gray-500">
          Enter your delivery details to complete your order.
        </p>
      </div>

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >

        {/* DELIVERY FORM */}
        <div className="space-y-6 lg:col-span-2">

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
              <MapPin size={22} />
              Delivery Information
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* NAME */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-600"
                  placeholder="Enter your name"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-600"
                  placeholder="Enter your email"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-600"
                  placeholder="10-digit mobile number"
                />
              </div>

              {/* ADDRESS */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Delivery Address
                </label>

                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-600"
                  placeholder="House name / Street"
                />
              </div>

              {/* CITY */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  City
                </label>

                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-600"
                  placeholder="Enter your city"
                />
              </div>

              {/* PINCODE */}
              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Pincode
                </label>

                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  required
                  pattern="[0-9]{6}"
                  maxLength={6}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-green-600"
                  placeholder="6-digit pincode"
                />
              </div>

            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-bold text-gray-900">
              Payment Method
            </h2>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-green-600 bg-green-50 p-4">

              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={paymentMethod === "Cash on Delivery"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />

              <div>
                <p className="font-semibold text-gray-900">
                  Cash on Delivery
                </p>

                <p className="text-sm text-gray-500">
                  Pay when your order arrives.
                </p>
              </div>

            </label>

          </div>

        </div>

        {/* ORDER SUMMARY */}
        <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-bold text-gray-900">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-3"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-gray-900">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

            <div className="border-t pt-4">

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="mt-3 flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-semibold text-green-700">
                  Free
                </span>
              </div>

              <div className="mt-5 flex justify-between border-t pt-4 text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

            </div>

          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* PLACE ORDER */}
          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-black px-5 py-4 font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          <Link
            to="/cart"
            className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-black"
          >
            <ArrowLeft size={17} />
            Back to Cart
          </Link>

        </div>

      </form>

    </div>
  );
}

export default Checkout;
