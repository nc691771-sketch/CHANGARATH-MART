
import shopImage from "../assets/images/shop.jpg";

import {
  ShoppingCart,
  Truck,
  BadgePercent,
  ShieldCheck,
  Headset,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full min-h-screen bg-[#090909] text-white">

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative w-full min-h-[calc(100vh-96px)] flex items-center overflow-hidden"
      >
        <img
          src={shopImage}
          alt="CHANGARATH MART storefront"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20"></div>

        <div className="relative z-10 w-full px-8 md:px-16 py-12">
          <div className="max-w-2xl">

            <p className="text-sm tracking-[5px] uppercase mb-6 text-gray-300">
              Welcome To
            </p>

            <h1 className="text-5xl md:text-7xl font-black italic leading-tight">
              CHANGARATH
              <span className="block text-yellow-400">
                MART
              </span>
            </h1>

            <p className="text-xl md:text-3xl mt-6 text-gray-200 italic">
              Your One Stop Shop for
              <br />
              All <span className="text-yellow-400 font-bold">Daily Needs</span>
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-4 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-lg font-bold transition duration-300 hover:scale-105"
            >
              <ShoppingCart size={23} />
              Shop Now
              <ArrowRight size={22} />
            </Link>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Feature
          icon={<Truck size={30} />}
          title="Fast Delivery"
          subtitle="At Your Doorstep"
        />

        <Feature
          icon={<BadgePercent size={30} />}
          title="Great Offers"
          subtitle="Save More"
        />

        <Feature
          icon={<ShieldCheck size={30} />}
          title="Trusted Quality"
          subtitle="Shop with Confidence"
        />

        <Feature
          icon={<Headset size={30} />}
          title="24/7 Support"
          subtitle="We're Here to Help"
        />
      </section>

      {/* CATEGORIES SECTION */}
      <section id="categories" className="scroll-mt-6 px-8 py-20 md:px-16">
        <h2 className="text-4xl font-bold">
          Our <span className="text-yellow-400">Categories</span>
        </h2>

        <p className="mt-4 text-gray-400">
          Explore our everyday shopping collections.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-500"
        >
          Explore Products <ArrowRight size={20} />
        </Link>
      </section>

      {/* OFFERS SECTION */}
      <section
        id="offers"
        className="scroll-mt-6 bg-yellow-400 px-8 py-20 text-black md:px-16"
      >
        <h2 className="text-4xl font-bold">Special Offers</h2>

        <p className="mt-4 text-lg">
          Discover great deals and save more on your daily shopping.
        </p>

        <Link
          to="/products"
          className="mt-8 inline-block rounded-lg bg-black px-6 py-3 font-bold text-white hover:bg-gray-800"
        >
          Shop Now
        </Link>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="scroll-mt-6 px-8 py-20 md:px-16">
        <h2 className="text-4xl font-bold">
          About <span className="text-yellow-400">Us</span>
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
          Welcome to CHANGARATH MART. We aim to make your daily shopping
          simple and convenient by bringing your everyday essentials
          together in one place.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="scroll-mt-6 border-t border-white/10 bg-white/5 px-8 py-20 md:px-16"
      >
        <h2 className="text-4xl font-bold">
          Contact <span className="text-yellow-400">Us</span>
        </h2>

        <p className="mt-6 text-gray-300">
          Have questions? We are here to help you.
        </p>
        
      </section>

    </div>
  );
}

function Feature({ icon, title, subtitle }) {
  return (
    <div className="w-full flex items-center justify-center gap-4 p-5 border border-white/15 bg-white/5 hover:bg-white/10 transition duration-300">
      <div className="text-yellow-400 shrink-0">{icon}</div>

      <div>
        <h3 className="font-bold text-sm md:text-base">{title}</h3>
        <p className="text-gray-400 text-xs md:text-sm mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default Home;
