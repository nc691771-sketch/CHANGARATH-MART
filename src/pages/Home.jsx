import shopImage from "../assets/images/shop.jpg";
import shop1 from "../assets/images/shop1.jpg";
import shop2 from "../assets/images/shop2.jpg";
import shop3 from "../assets/images/shop3.jpg";
import shop4 from "../assets/images/shop4.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  BadgePercent,
  Headset,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import { setProducts } from "../redux/slices/productSlice";
import { getProducts } from "../services/productService";

const benefits = [
  { icon: Truck, title: "Fast delivery", subtitle: "Everyday essentials, brought to you" },
  { icon: BadgePercent, title: "Great offers", subtitle: "More value in every shop" },
  { icon: ShieldCheck, title: "Trusted quality", subtitle: "Carefully chosen essentials" },
  { icon: Headset, title: "Here to help", subtitle: "Friendly support when you need it" },
];

const galleryImages = [shop1, shop2, shop3, shop4];

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const offerItems = products.filter((product) =>
    ["fresh tomatoes", "fresh onions", "potatoes"].includes(product.name?.toLowerCase()),
  );

  useEffect(() => {
    if (products.length) return undefined;

    let isCurrent = true;
    getProducts()
      .then((items) => {
        if (isCurrent) dispatch(setProducts(items));
      })
      .catch(() => {});

    return () => {
      isCurrent = false;
    };
  }, [dispatch, products.length]);

  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#090b09] text-white">
      <section
        id="home"
        className="relative flex min-h-[min(820px,calc(100svh-76px))] w-full items-center overflow-hidden bg-[#101310] sm:min-h-[min(860px,calc(100svh-96px))]"
      >
        <img
          src={shopImage}
          alt="CHANGARATH MART storefront"
          className="absolute inset-0 h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,6,0.96)_0%,rgba(5,8,6,0.82)_37%,rgba(5,8,6,0.28)_75%,rgba(5,8,6,0.12)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b09]/75 via-transparent to-black/10" />

        <div className="relative z-10 w-full px-0 py-24 sm:px-10 md:py-32 lg:px-6">
          <div className="max-w-3xl border-l-2 border-yellow-400/90 pl-6 sm:pl-9 lg:pl-12">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm sm:text-sm sm:tracking-[0.24em]">
              <span className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_14px_#facc15]" />
              Your neighbourhood store
            </div>

            <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl lg:text-[5.25rem]">
              Everyday made
              <span className="mt-2 block text-yellow-400">wonderful.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Find the things you need for home, family, and every day — all in one friendly place.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-yellow-400 px-7 py-4 font-bold text-black shadow-[0_12px_36px_rgba(250,204,21,0.2)] transition hover:-translate-y-0.5 hover:bg-yellow-300"
              >
                <ShoppingCart size={19} />
                Shop the store
                <ArrowRight size={19} className="transition group-hover:translate-x-1" />
              </Link>
              <a
                href="#categories"
                className="rounded-full border border-white/25 px-7 py-4 font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
              >
                Explore more
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2"><span className="text-yellow-400">✦</span> Daily essentials</span>
              <span className="inline-flex items-center gap-2"><span className="text-yellow-400">✦</span> Great value</span>
              <span className="inline-flex items-center gap-2"><span className="text-yellow-400">✦</span> Friendly service</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent" />
      </section>

      <section aria-label="Our promises" className="relative z-10 mx-auto -mt-1 grid w-full max-w-[1440px] grid-cols-1 gap-3 px-5 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
        {benefits.map(({ icon: Icon, title, subtitle }) => (
          <article key={title} className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#141714] p-5 transition hover:border-yellow-400/35 hover:bg-[#191d19]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400 transition group-hover:bg-yellow-400 group-hover:text-black">
              <Icon size={23} strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="font-bold text-white">{title}</h2>
              <p className="mt-1 text-sm text-white/50">{subtitle}</p>
            </div>
          </article>
        ))}
      </section>

      <section id="categories" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto flex min-h-[55vh] w-full max-w-[1320px] flex-col justify-center rounded-[2rem] border border-white/[0.08] bg-[radial-gradient(ellipse_at_top_right,rgba(250,204,21,0.12),transparent_48%),linear-gradient(145deg,#151915,#0d100d)] p-8 sm:p-12 lg:p-16">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">Shop your way</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">Your everyday, <span className="text-white/45">all together.</span></h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">From kitchen favourites to little things that make a house feel like home, discover the essentials for your day.</p>
            </div>
            <Link to="/products" className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 px-6 py-4 font-semibold transition hover:border-yellow-400 hover:text-yellow-400">
              Browse products <ArrowRight size={19} />
            </Link>
          </div>
          <div className="mt-12 grid gap-3 border-t border-white/10 pt-7 sm:grid-cols-3">
            {["For your kitchen", "For your home", "For every day"].map((item, index) => (
              <Link to="/products" key={item} className="group flex items-center justify-between rounded-xl bg-white/[0.035] px-5 py-5 text-white/75 transition hover:bg-white/[0.08] hover:text-white">
                <span className="flex items-center gap-3"><span className="text-sm text-yellow-400">0{index + 1}</span>{item}</span>
                <ArrowRight size={17} className="text-white/30 transition group-hover:translate-x-1 group-hover:text-yellow-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="offers" className="scroll-mt-24 px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="relative mx-auto w-full max-w-[1320px] overflow-hidden rounded-[2rem] bg-yellow-400 px-8 py-12 text-black sm:px-12 sm:py-14 lg:px-16">
          <div className="pointer-events-none absolute -right-20 -top-36 h-[30rem] w-[30rem] rounded-full border-[1px] border-black/10 sm:-right-4" />
          <div className="pointer-events-none absolute -right-8 -top-24 h-[24rem] w-[24rem] rounded-full border-[1px] border-black/10" />
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-black/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]"><BadgePercent size={15} /> A little extra value</span>
            <h2 className="mt-7 text-5xl font-black tracking-[-0.05em] sm:text-7xl">Everyday<br />market picks.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-black/70">Fresh tomatoes, onions, and potatoes for the meals you make every day.</p>
          </div>

          <div className="relative mt-10 grid gap-4 sm:grid-cols-3">
            {offerItems.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-2xl border border-black/10 bg-[#fffaf0] shadow-sm">
                <Link to={`/products/${product.id}`} className="flex h-40 items-center justify-center bg-[#f4eddf] p-4">
                  <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-contain" />
                </Link>
                <div className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <Link to={`/products/${product.id}`} className="font-semibold text-[#22251f] hover:underline">{product.name}</Link>
                    <p className="mt-1 text-sm font-bold text-[#4b5d38]">₹{product.price}</p>
                  </div>
                  <button onClick={() => dispatch(addToCart(product))} disabled={Number(product.stock) <= 0} aria-label={`Add ${product.name} to cart`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#101310] text-white transition hover:bg-[#344d31] disabled:cursor-not-allowed disabled:bg-gray-500">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="relative mt-8 flex justify-end">
            <Link to="/products" className="inline-flex items-center gap-3 rounded-full bg-[#101310] px-7 py-4 font-bold text-white transition hover:bg-black">
              View all products <ArrowRight size={19} />
            </Link>
          </div>
          <ShoppingBag className="pointer-events-none absolute right-10 top-8 hidden h-36 w-36 -rotate-12 text-black/[0.08] sm:block lg:right-20 lg:h-52 lg:w-52" strokeWidth={1} />
        </div>
      </section>

      <section id="about" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto grid min-h-[55vh] w-full max-w-[1320px] items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">A store with heart</p>
            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">Good shopping<br /><span className="text-white/45">starts close to home.</span></h2>
          </div>
          <div className="rounded-[2rem] border border-white/[0.08] bg-[#141714] p-8 sm:p-12">
            <p className="text-xl leading-9 text-white/75 sm:text-2xl sm:leading-10">Welcome to CHANGARATH MART. We’re here to make daily shopping simple and convenient, bringing your everyday essentials together in one place.</p>
            <div className="mt-9 h-px w-full bg-white/10" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-yellow-400">Your neighbourhood. Your everyday store.</p>
          </div>
        </div>
      </section>

      <section id="gallery" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">A glimpse inside</p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Our Gallery</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-white/55">A little look at CHANGARATH MART and the place behind your everyday shopping.</p>
          </div>
          <div className="grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] sm:gap-4 lg:auto-rows-[290px] lg:grid-cols-4">
            {galleryImages.map((image, index) => (
              <figure
                key={index}
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#141714] ${index === 0 ? "col-span-2 row-span-2" : ""} ${index === 1 ? "col-span-2" : ""}`}
              >
                <img
                  src={image}
                  alt={`CHANGARATH MART gallery photo ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
                <figcaption className="absolute bottom-0 left-0 p-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 sm:p-6">
                  CHANGARATH MART <span className="ml-2 text-yellow-400">0{index + 1}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
