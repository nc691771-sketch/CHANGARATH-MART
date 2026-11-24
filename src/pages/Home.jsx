
import Navbar from "../components/navbar/Navbar";
import shopImage from "../assets/images/shop.jpg";

import {
  ShoppingCart,
  Truck,
  BadgePercent,
  ShieldCheck,
  Headset,
  ArrowRight
} from "lucide-react";

function Home() {
  return (
    <div className="w-full min-h-screen bg-[#090909] text-white">

      <Navbar />

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative w-full min-h-[calc(100vh-96px)] flex items-center overflow-hidden"
      >

        {/* BACKGROUND IMAGE */}
        <img
          src={shopImage}
          alt="CHANGARATH MART storefront"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20"></div>

        {/* HERO CONTENT */}
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

            {/* SHOP BUTTON */}
            <button className="mt-8 flex items-center gap-4 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full text-lg font-bold transition duration-300 hover:scale-105">

              <ShoppingCart size={23} />
              Shop Now
              <ArrowRight size={22} />

            </button>

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

    </div>
  );
}

function Feature({ icon, title, subtitle }) {
  return (
    <div className="w-full flex items-center justify-center gap-4 p-5 border border-white/15 bg-white/5 hover:bg-white/10 transition duration-300">

      <div className="text-yellow-400 shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-sm md:text-base">
          {title}
        </h3>

        <p className="text-gray-400 text-xs md:text-sm mt-1">
          {subtitle}
        </p>
      </div>

    </div>
  );
}

export default Home;
