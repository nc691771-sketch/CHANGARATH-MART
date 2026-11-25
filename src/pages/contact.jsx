import { Clock3, Mail, MapPin, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Add the store's confirmed public details here when available.
const contactDetails = {
  phone: "+91 79071 04228",
  whatsapp: "7907104228",
  email: "nc691771@gmail.com",
  address: "wayanad meppadi chooralmala neelikkappu ChangarathMart",
  hours: "24/14",
};

const contactMethods = [
  {
    key: "phone",
    title: "Call us",
    description: "Questions about a product or order? Give us a call.",
    icon: Phone,
    href: `tel:${contactDetails.phone.replace(/\s/g, "")}`,
  },
  {
    key: "whatsapp",
    title: "WhatsApp",
    description: "Message us directly for quick help with your shopping.",
    icon: MessageCircle,
    href: `https://wa.me/91${contactDetails.whatsapp}`,
  },
  {
    key: "email",
    title: "Email us",
    description: "Send us a note and we’ll be happy to help.",
    icon: Mail,
    href: contactDetails.email ? `mailto:${contactDetails.email}` : null,
  },
  {
    key: "address",
    title: "Visit the store",
    description: "Find us at our neighbourhood store.",
    icon: MapPin,
    href: contactDetails.address
      ? `https://maps.google.com/?q=${encodeURIComponent(contactDetails.address)}`
      : null,
  },
  {
    key: "hours",
    title: "Store hours",
    description: "Plan your next visit around our opening hours.",
    icon: Clock3,
    href: null,
  },
];

function Contact() {
  return (
    <main className="min-h-screen bg-[#090b09] text-white">
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_20%,rgba(250,204,21,0.12),transparent_40%)]" />
        <div className="relative mx-auto w-full max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-yellow-400">CHANGARATH MART</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold tracking-tight sm:text-7xl">Let’s talk.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
            We’re here to help with your shopping, orders, and questions about the store.
          </p>
          <Link to="/products" className="mt-9 inline-flex items-center gap-3 rounded-full bg-yellow-400 px-6 py-3.5 font-bold text-black transition hover:bg-yellow-300">
            Browse products <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-yellow-400">Get in touch</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Contact information</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactMethods.map(({ key, title, description, icon: Icon, href }) => {
            const value = contactDetails[key];
            const isWhatsApp = key === "whatsapp";
            const cardStyle = isWhatsApp
              ? "rounded-3xl border border-emerald-400/20 bg-[linear-gradient(145deg,rgba(16,48,34,0.85),#141714_75%)] p-6 shadow-[0_20px_60px_rgba(16,185,129,0.07)] transition hover:border-emerald-300/50 sm:p-8"
              : "rounded-3xl border border-white/[0.08] bg-[#141714] p-6 transition hover:border-yellow-400/40 sm:p-8";
            const content = (
              <>
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isWhatsApp ? "bg-emerald-400/15 text-emerald-300" : "bg-yellow-400/10 text-yellow-400"}`}>
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <span className="mt-6 block text-xl font-semibold">{title}</span>
                <span className="mt-2 block text-sm leading-6 text-white/55">{description}</span>
                <span className={`mt-5 block break-words text-sm font-semibold ${isWhatsApp ? "text-emerald-200" : "text-yellow-300"}`}>
                  {key === "whatsapp" ? contactDetails.phone : value || "Store details will be added soon"}
                </span>
                {isWhatsApp && <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-[#062b17] shadow-lg shadow-emerald-950/20 transition group-hover:bg-[#4be080]">Chat on WhatsApp <ArrowRight size={16} /></span>}
              </>
            );

            return href ? (
              <a key={key} href={href} target={key === "address" || isWhatsApp ? "_blank" : undefined} rel={key === "address" || isWhatsApp ? "noreferrer" : undefined} className={`${cardStyle} ${isWhatsApp ? "group" : ""}`}>
                {content}
              </a>
            ) : (
              <article key={key} className={cardStyle}>
                {content}
              </article>
            );
          })}
        </div>

        <p className="mt-8 rounded-2xl border border-yellow-400/15 bg-yellow-400/[0.04] px-5 py-4 text-sm leading-6 text-white/55">
          Email, store address, and opening hours will be added once you provide those details. Phone and WhatsApp are ready to use.
        </p>
      </section>
    </main>
  );
}

export default Contact;
