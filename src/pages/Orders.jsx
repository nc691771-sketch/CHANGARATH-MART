
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import {
  Package,
  CalendarDays,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";

function Orders() {
  const user = useSelector((state) => state.auth.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch customer orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "http://localhost:3000/orders"
        );

        // Show only the logged-in user's orders
        const userOrders = response.data.filter(
          (order) =>
            (user?.id && order.userId === user.id) ||
            (user?.email &&
              order.customer?.email === user.email)
        );

        // Latest orders first
        userOrders.sort(
          (a, b) =>
            new Date(b.orderDate) - new Date(a.orderDate)
        );

        setOrders(userOrders);
      } catch (error) {
        setError("Failed to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Format order date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">
          Loading your orders...
        </p>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-600">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-8 lg:px-12">

      {/* PAGE HEADER */}
      <div className="mb-10">
        <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
          <Package size={32} />
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Track and manage your purchases at CHANGARATH MART.
        </p>
      </div>

      {/* EMPTY ORDERS */}
      {orders.length === 0 ? (

        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-sm">

          <ShoppingBag
            size={70}
            className="mb-5 text-gray-300"
          />

          <h2 className="text-2xl font-bold text-gray-900">
            No Orders Yet
          </h2>

          <p className="mt-3 text-gray-500">
            You haven't placed any orders yet.
          </p>

          <a
            href="/products"
            className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Start Shopping
          </a>

        </div>

      ) : (

        <div className="space-y-6">

          {/* ORDER COUNT */}
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="font-semibold text-gray-700">
              Total Orders: {orders.length}
            </p>
          </div>

          {/* ORDER CARDS */}
          {orders.map((order) => (

            <div
              key={order.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >

              {/* ORDER HEADER */}
              <div className="flex flex-col justify-between gap-4 border-b p-5 sm:flex-row sm:items-center">

                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <h2 className="mt-1 font-bold text-gray-900">
                    #{order.id}
                  </h2>
                </div>

                <div>
                  <p className="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDays size={16} />
                    Order Date
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {formatDate(order.orderDate)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Order Status
                  </p>

                  <span className="mt-1 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                    {order.status || "Pending"}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Total Amount
                  </p>

                  <p className="mt-1 text-xl font-bold text-green-700">
                    ₹{order.totalPrice}
                  </p>
                </div>

              </div>

              {/* ORDER PRODUCTS */}
              <div className="space-y-4 p-5">

                <h3 className="font-bold text-gray-900">
                  Purchased Products
                </h3>

                {order.items?.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-xl bg-gray-50 p-3"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {item.name}
                      </h4>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        ₹{item.price} each
                      </p>
                    </div>

                    <p className="font-bold text-gray-900">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>

                ))}

              </div>

              {/* DELIVERY DETAILS */}
              <div className="border-t bg-gray-50 p-5">

                <h3 className="mb-3 font-bold text-gray-900">
                  Delivery Information
                </h3>

                <p className="text-sm text-gray-600">
                  {order.customer?.name}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {order.customer?.address}, {order.customer?.city}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Pincode: {order.customer?.pincode}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  Payment: {order.paymentMethod}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Orders;
