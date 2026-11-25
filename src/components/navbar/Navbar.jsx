
import {
  ShoppingCart,
  UserRound,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlice";
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

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
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
    <nav className="sticky top-0 z-50 w-full border-b border-yellow-400/10 bg-[#090b09]/95 text-white shadow-xl shadow-black/20 backdrop-blur-xl">

      <div className="mx-auto flex min-h-[78px] w-full max-w-[1600px] items-center justify-between gap-3 px-4 sm:min-h-[88px] sm:px-6 lg:px-10">

        {/* LOGO */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 transition duration-300 group-hover:ring-yellow-400/50 sm:h-14 sm:w-14">
            <img
              src={logo}
              alt="CHANGARATH MART"
              className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            />
          </div>

          <h1 className="hidden whitespace-nowrap text-lg font-black tracking-wide sm:block lg:text-xl">
            CHANGARATH
            <span className="text-yellow-400"> MART</span>
          </h1>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold xl:flex">

          <Link
            to="/"
            className={`rounded-full px-5 py-3 transition duration-300 ${
              location.pathname === "/"
                ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/10"
                : "text-white/70 hover:bg-white/5 hover:text-yellow-400"
            }`}
          >
            Home
          </Link>

          <Link
            to="/products"
            className={`rounded-full px-5 py-3 transition duration-300 ${
              location.pathname === "/products"
                ? "bg-yellow-400 text-black"
                : "text-white/70 hover:bg-white/5 hover:text-yellow-400"
            }`}
          >
            Products
          </Link>

          <button
            onClick={() => scrollToSection("offers")}
            className="rounded-full px-4 py-3 text-white/70 transition duration-300 hover:bg-white/5 hover:text-yellow-400"
          >
            Offers
          </button>

          <button
            onClick={() => scrollToSection("about")}
            className="rounded-full px-4 py-3 text-white/70 transition duration-300 hover:bg-white/5 hover:text-yellow-400"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection("gallery")}
            className="rounded-full px-4 py-3 text-white/70 transition duration-300 hover:bg-white/5 hover:text-yellow-400"
          >
            Gallery
          </button>

          <Link
            to="/contact"
            className="rounded-full px-4 py-3 text-white/70 transition duration-300 hover:bg-white/5 hover:text-yellow-400"
          >
            Contact
          </Link>

        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="rounded-xl border border-white/10 p-2.5 text-white transition hover:border-yellow-400/40 hover:text-yellow-400 xl:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* CART */}
          <Link
            to="/cart"
            className="group relative flex items-center gap-2 rounded-full px-2 py-2.5 text-white/80 transition hover:text-yellow-400 sm:px-3"
          >
            <ShoppingCart
              size={21}
              className="transition group-hover:scale-110"
            />

            <span className="hidden text-sm font-semibold xl:block">
              Cart
            </span>

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-400 px-1 text-[10px] font-black text-black ring-2 ring-[#090b09]">
                {cartCount}
              </span>
            )}
          </Link>

          {/* LOGIN / LOGOUT */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/5 px-3 py-2.5 text-sm font-semibold text-red-400 transition duration-300 hover:bg-red-500 hover:text-white sm:px-5"
            >
              <UserRound size={18} />
              <span className="hidden sm:inline">
                Logout
              </span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/5 px-3 py-2.5 text-sm font-semibold text-yellow-300 transition duration-300 hover:bg-yellow-400 hover:text-black sm:px-5"
            >
              <UserRound size={18} />
              <span className="hidden sm:inline">
                Login / Signup
              </span>
            </Link>
          )}

        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div className="border-t border-yellow-400/10 bg-[#090b09] px-5 py-5 shadow-2xl xl:hidden">

          <div className="mx-auto flex max-w-[1600px] flex-col gap-2 text-sm font-semibold">

            <Link
              onClick={() => setMenuOpen(false)}
              to="/"
              className="rounded-xl px-4 py-3 text-white/80 transition hover:bg-yellow-400/10 hover:text-yellow-400"
            >
              Home
            </Link>

            <Link
              onClick={() => setMenuOpen(false)}
              to="/products"
              className="rounded-xl px-4 py-3 text-white/80 transition hover:bg-yellow-400/10 hover:text-yellow-400"
            >
              Products
            </Link>

            {[
              ["offers", "Offers"],
              ["about", "About"],
              ["gallery", "Gallery"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => {
                  setMenuOpen(false);
                  scrollToSection(id);
                }}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-white/80 transition hover:bg-yellow-400/10 hover:text-yellow-400"
              >
                {label}
                <ChevronDown size={15} className="-rotate-90" />
              </button>
            ))}

            <Link
              onClick={() => setMenuOpen(false)}
              to="/contact"
              className="flex items-center justify-between rounded-xl px-4 py-3 text-white/80 transition hover:bg-yellow-400/10 hover:text-yellow-400"
            >
              Contact
            </Link>

          </div>
        </div>
      )}

    </nav>
  );
}

export default Navbar;
