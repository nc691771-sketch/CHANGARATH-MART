
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

import { addToCart } from "../redux/slices/cartSlice";
import {
  removeFromWishlist,
  clearWishlist,
} from "../redux/slices/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 lg:px-12">

      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 flex items-center gap-3">
          <Heart size={32} className="text-red-600" />

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Wishlist
            </h1>

            <p className="mt-1 text-gray-500">
              Your favourite products in one place.
            </p>
          </div>
        </div>

        {/* Empty Wishlist */}
        {wishlistItems.length === 0 ? (

          <div className="rounded-2xl bg-white px-6 py-20 text-center shadow-sm">

            <Heart
              size={65}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Your Wishlist is Empty
            </h2>

            <p className="mt-3 text-gray-500">
              Save your favourite products here.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-block rounded-xl bg-black px-7 py-3 font-semibold text-white hover:bg-green-700"
            >
              Explore Products
            </Link>

          </div>

        ) : (

          <>
            {/* Wishlist Actions */}
            <div className="mb-6 flex justify-between">
              <p className="font-semibold text-gray-700">
                {wishlistItems.length} Saved Products
              </p>

              <button
                onClick={() => dispatch(clearWishlist())}
                className="text-sm font-semibold text-red-600 hover:text-red-800"
              >
                Clear Wishlist
              </button>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {wishlistItems.map((product) => (

                <div
                  key={product.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-5">

                    <p className="text-sm text-green-700">
                      {product.category}
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-gray-900">
                      {product.name}
                    </h2>

                    <p className="mt-3 text-xl font-bold text-gray-900">
                      ₹{product.price}
                    </p>

                    <button
                      onClick={() =>
                        dispatch(addToCart(product))
                      }
                      disabled={product.stock <= 0}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>

                    <button
                      onClick={() =>
                        dispatch(removeFromWishlist(product.id))
                      }
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>

                  </div>
                </div>

              ))}

            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Wishlist;
