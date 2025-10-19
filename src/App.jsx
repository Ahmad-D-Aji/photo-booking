import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Calendar, Image as ImageIcon, Mail, Phone, ChevronRight } from "lucide-react";

/**
 * Small pill-shaped label used in the hero.
 * - We add `text-white` and a subtle translucent background so it stays legible over photos.
 */
function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/30 px-3 py-1 text-xs font-medium tracking-wide text-white bg-white/10 backdrop-blur-sm">
      {children}
    </span>
  );
}

/**
 * Reusable button.
 * - `variant="primary"` → black filled
 * - `variant="ghost"` → translucent white (for dark backgrounds)
 * - If `href` is provided we render an <a>; otherwise a <button>.
 */
function Btn({ href, children, variant = "primary" }) {
  const base =
    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition shadow-sm";
  const styles =
    variant === "primary"
      ? "bg-black text-white hover:opacity-90"
      : "bg-white/70 backdrop-blur border hover:bg-white";

  const content = (
    <span className={`${base} ${styles}`}>
      {children}
      {/* Chevron icon at the end for affordance */}
      <ChevronRight className="h-4 w-4" />
    </span>
  );

  return href ? (
    <a href={href} className="no-underline">
      {content}
    </a>
  ) : (
    <button className={`${base} ${styles}`}>{content}</button>
  );
}

/**
 * Simple card for pricing / features.
 */
function Card({ title, price, children }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {price ? <span className="text-sm font-bold">{price}</span> : null}
      </div>
      <div className="text-sm text-gray-700 leading-6">{children}</div>
    </div>
  );
}

/**
 * Portfolio grid tile.
 * - Uses object-cover + hover scale for a subtle interactive feel.
 */
function Tile({ src, alt }) {
  return (
    <div className="overflow-hidden rounded-2xl shadow-sm border">
      <img src={src} alt={alt} className="h-full w-full object-cover transition hover:scale-105" />
    </div>
  );
}

/**
 * Main page component
 * Sections:
 * 1) Sticky nav
 * 2) Hero with background photo and CTA
 * 3) Packages (pricing)
 * 4) Portfolio (grid)
 * 5) Booking (Calendly embed + Netlify form)
 * 6) Footer
 */
export default function App() {
  // Toggle between "instant" (Calendly) and "request" (Netlify form)
  const [mode, setMode] = useState("instant");
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      {/** ================= NAV ================= */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="flex items-center gap-2 font-semibold">
            <Camera className="h-5 w-5" />
            White Wolf Studio
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#packages" className="text-sm hover:opacity-70">Packages</a>
            <a href="#portfolio" className="text-sm hover:opacity-70">Portfolio</a>
            <a href="#contact" className="text-sm hover:opacity-70">Contact</a>
            <Btn href="#book">Book now</Btn>
          </nav>
        </div>
      </header>

      {/** ================= HERO ================= */}
      <section className="relative">
        {/* Background image + gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=1600&auto=format&fit=crop"
            alt="Hero background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-white" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-24 md:grid-cols-2 md:py-32">
          {/* Left column: copy + CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge>
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Jakarta • Bali • On-location
            </Badge>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Timeless Photography for People & Brands
            </h1>
            <p className="mt-4 max-w-xl text-white/85">
              Portraits, couples, events, and product stories—captured with a clean, modern aesthetic.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Btn href="#book">Book a session</Btn>
              <Btn href="#portfolio" variant="ghost">View portfolio</Btn>
            </div>
            {/* Quick contact: phone + email */}
            <div className="mt-6 flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +62 812-3456-7890</div>
              <div className="hidden items-center gap-2 sm:flex"><Mail className="h-4 w-4" /> hello@whitewolfstudio.id</div>
            </div>
          </motion.div>

          {/* Right column: three photo tiles */}
          <motion.div
            className="grid grid-cols-3 gap-4 self-end"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Tile src="https://picsum.photos/800/800?random=2" alt="Portrait" />
            <Tile src="https://picsum.photos/800/800?random=3" alt="Couple" />
            <Tile src="https://picsum.photos/800/800?random=4" alt="Product" />
          </motion.div>
        </div>
      </section>

      {/** ================= PACKAGES ================= */}
      <section id="packages" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Packages</h2>
          <a href="#book" className="text-sm font-semibold hover:opacity-70">See availability →</a>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card title="Portrait" price="IDR 1.5M">
            <ul className="list-disc pl-5">
              <li>1 hour on-location</li>
              <li>15 edited photos</li>
              <li>Online gallery within 3 days</li>
            </ul>
          </Card>
          <Card title="Couple / Pre-wedding" price="IDR 3.5M">
            <ul className="list-disc pl-5">
              <li>2 hours • 2 locations</li>
              <li>30 edited photos</li>
              <li>Wardrobe guidance</li>
            </ul>
          </Card>
          <Card title="Event (Half-day)" price="IDR 5.5M">
            <ul className="list-disc pl-5">
              <li>Up to 4 hours coverage</li>
              <li>All key moments edited</li>
              <li>48-hour turnaround</li>
            </ul>
          </Card>
        </div>
        <p className="mt-4 text-sm text-gray-600">* Travel fees may apply outside Jakarta. Custom packages on request.</p>
      </section>

      {/** ================= PORTFOLIO ================= */}
      <section id="portfolio" className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            <h2 className="text-2xl font-bold">Portfolio</h2>
          </div>
          <a href="#" className="text-sm font-semibold hover:opacity-70">Open full gallery →</a>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            "https://picsum.photos/800/800?random=11",
            "https://picsum.photos/800/800?random=12",
            "https://picsum.photos/800/800?random=13",
            "https://picsum.photos/800/800?random=14",
            "https://picsum.photos/800/800?random=15",
            "https://picsum.photos/800/800?random=16",
            "https://picsum.photos/800/800?random=17",
            "https://picsum.photos/800/800?random=18",
          ].map((src, i) => (
            <Tile key={i} src={src} alt={`Portfolio ${i + 1}`} />
          ))}
        </div>
      </section>

      {/** ================= BOOKING ================= */}
      <section id="book" className="mx-auto max-w-6xl px-4 py-16">
        {/* Section header */}
        <div className="mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <h2 className="text-2xl font-bold">Book a Session</h2>
        </div>

        {/* Toggle: make the two paths obvious */}
        <div className="mb-8 inline-flex rounded-2xl border bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setMode("instant")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${mode === "instant" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-50"}`}
            aria-pressed={mode === "instant"}
          >
            <Calendar className="h-4 w-4" /> Instant booking
          </button>
          <button
            type="button"
            onClick={() => setMode("request")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold ${mode === "request" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-50"}`}
            aria-pressed={mode === "request"}
          >
            <Mail className="h-4 w-4" /> Request a quote
          </button>
        </div>

        {/* Helper text describing the difference */}
        <p className="mb-6 text-sm text-gray-600">
          {mode === "instant"
            ? "Pick an available time now and get immediate confirmation via Calendly."
            : "Send us details about your shoot—date, package, and notes. We'll confirm availability and pricing by email."}
        </p>

        {/* Content panes */}
        {mode === "instant" ? (
          // ===== Calendly path =====
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="h-[600px] w-full overflow-hidden rounded-xl">
              <iframe
                title="Calendly"
                src="https://calendly.com/dewantoaji45/30min?hide_event_type_details=1&hide_gdpr_banner=1"
                className="h-full w-full"
              />
            </div>
          </div>
        ) : (
          // ===== Netlify Form path =====
          <form
            name="booking"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="rounded-2xl border bg-white p-6 shadow-sm"
            action="/thank-you"
            aria-label="Booking request form"
          >
            {/* Required hidden input so Netlify registers the form */}
            <input type="hidden" name="form-name" value="booking" />
            {/* Honeypot field to reduce spam */}
            <p className="hidden">
              <label>Don’t fill this out: <input name="bot-field" /></label>
            </p>

            {/* Two-column basic details */}
            <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium" htmlFor="name">Full name</label>
                <input id="name" name="name" required className="mt-1 w-full rounded-xl border px-3 py-2" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required className="mt-1 w-full rounded-xl border px-3 py-2" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="phone">Phone/WA</label>
                <input id="phone" name="phone" required className="mt-1 w-full rounded-xl border px-3 py-2" />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="date">Preferred date</label>
                <input id="date" name="date" type="date" required className="mt-1 w-full rounded-xl border px-3 py-2" />
              </div>
            </div>

            {/* Package selector */}
            <div className="mb-3">
              <label className="text-sm font-medium" htmlFor="package">Package</label>
              <select id="package" name="package" required className="mt-1 w-full rounded-xl border px-3 py-2">
                <option value="">— choose —</option>
                <option>Portrait (1 hour)</option>
                <option>Couple (2 hours)</option>
                <option>Event (Half-day)</option>
                <option>Event (Full-day)</option>
              </select>
            </div>

            {/* Notes */}
            <div className="mb-4">
              <label className="text-sm font-medium" htmlFor="message">Notes / location</label>
              <textarea id="message" name="message" rows={4} className="mt-1 w-full rounded-xl border px-3 py-2" />
            </div>

            {/* Submit */}
            <div className="flex items-center gap-3">
              <button type="submit" className="rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm">
                Send request
              </button>
              <span className="text-xs text-gray-500">We’ll reply by email to confirm availability.</span>
            </div>
          </form>
        )}
      </section>
      
      {/** ================= FOOTER ================= */}
      <footer id="contact" className="border-t bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-10 md:grid-cols-3">
          <div>
            <div className="mb-2 flex items-center gap-2 font-semibold"><Camera className="h-5 w-5" /> White Wolf Studio</div>
            <p className="text-sm text-gray-600">Jakarta • Bali • Available worldwide</p>
          </div>
          <div className="text-sm">
            <div className="font-semibold">Contact</div>
            <div className="mt-1 flex items-center gap-2"><Phone className="h-4 w-4" /> +62 812-3456-7890</div>
            <div className="mt-1 flex items-center gap-2"><Mail className="h-4 w-4" /> hello@whitewolfstudio.id</div>
          </div>
          <div className="text-sm">
            <div className="font-semibold">Links</div>
            <ul className="mt-1 space-y-1">
              <li><a className="hover:opacity-70" href="#packages">Packages</a></li>
              <li><a className="hover:opacity-70" href="#portfolio">Portfolio</a></li>
              <li><a className="hover:opacity-70" href="#book">Book</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t py-6 text-center text-xs text-gray-500">© {new Date().getFullYear()} White Wolf Studio X AjiDev X IBM Granite. All rights reserved.</div>
      </footer>
    </div>
  );
}