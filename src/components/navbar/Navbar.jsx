import {
  ShoppingCart,
  UserRound,
  ChevronDown,
  Menu,
  X,
  Heart
} from "lucide-react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logos/logo.png";

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const { isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const wishlistItems = useSelector(
  (state) => state.wishlist?.items || []
);

const wishlistCount = wishlistItems.length;

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className="relative z-50 w-full border-b border-white/10 bg-black text-white">

        <div className="flex min-h-[76px] w-full items-center justify-between gap-3 px-3 sm:min-h-[96px] sm:gap-5 sm:px-6 lg:px-8 2xl:px-12">

        {/* LOGO */}
        <Link
          to="/"
          className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
        >
          <img
            src={logo}
            alt="CHANGARATH MART"
            className="h-10 w-10 object-contain sm:h-14 sm:w-14"
          />

          <h1 className="hidden whitespace-nowrap text-lg font-extrabold tracking-wide sm:block 2xl:text-xl">
            CHANGARATH
            <span className="text-yellow-400"> MART</span>
          </h1>
        </Link>

        {/* NAVIGATION */}
        <div className="hidden shrink-0 items-center justify-center gap-4 whitespace-nowrap text-base font-bold xl:flex 2xl:gap-6">

          <Link
            to="/"
            className="rounded-full bg-red-600 px-4 py-2.5"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="transition hover:text-yellow-400"
          >
            Products
          </Link>

          <button
            onClick={() => scrollToSection("categories")}
            className="flex items-center gap-1 transition hover:text-yellow-400"
          >
            Categories
            <ChevronDown size={14} />
          </button>

          <button
            onClick={() => scrollToSection("offers")}
            className="transition hover:text-yellow-400"
          >
            Offers
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="transition hover:text-yellow-400"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="transition hover:text-yellow-400"
          >
            Contact
          </button>

        </div>

        {/* CART AND LOGIN / LOGOUT */}
        <div className="flex items-center justify-self-end gap-2 sm:gap-5">

          <button
            type="button"
            className="rounded p-2 xl:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 transition hover:text-yellow-400"
          >
          <ShoppingCart size={22} />

          <span className="hidden xl:block">Cart</span>

          {cartCount > 0 && (
          <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-xs font-bold text-white">
          {cartCount}
          </span>
            )}
          </Link>

          <Link
           to="/wishlist"
           className={`relative flex items-center gap-2 transition ${
             location.pathname === "/wishlist"
               ? "text-red-500"
               : "hover:text-red-400"
           }`}
          >
          <Heart
            size={22}
            className={location.pathname === "/wishlist" ? "fill-red-500" : ""}
          />

          <span className="hidden xl:block">Wishlist</span>

          {wishlistCount > 0 && (
          <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
            {wishlistCount}
          </span>
         )}
         </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-red-500 px-3 py-2 text-red-500 transition hover:bg-red-500 hover:text-white sm:px-5 sm:py-3"
            >
              <UserRound size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-full border border-white/40 px-3 py-2 transition hover:bg-yellow-400 hover:text-black sm:px-5 sm:py-3"
            >
              <UserRound size={18} />
              <span className="hidden sm:inline">Login / Signup</span>
            </Link>
          )}

        </div>

      </div>
      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-white/10 bg-black px-6 py-4 text-base font-semibold xl:hidden">
          <Link onClick={() => setMenuOpen(false)} to="/" className="rounded px-3 py-2 hover:bg-white/10">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/products" className="rounded px-3 py-2 hover:bg-white/10">Products</Link>
          {[["categories", "Categories"], ["offers", "Offers"], ["about", "About"], ["contact", "Contact"]].map(([id, label]) => (
            <button key={id} onClick={() => { setMenuOpen(false); scrollToSection(id); }} className="rounded px-3 py-2 text-left hover:bg-white/10">{label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
