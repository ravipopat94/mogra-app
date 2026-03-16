import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-brand-border">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">

          {/* Brand */}
          <div className="flex flex-col items-start gap-4">
            {/* Flower + wordmark from logo */}
            <div style={{ width: 110, height: 80, overflow: "hidden", position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Mogra"
                style={{ width: 110, height: "auto", position: "absolute", top: 0, left: 0 }}
              />
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Celebrating Indian craftsmanship<br />with contemporary silhouettes.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-widest text-gold">
              Explore
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-foreground hover:text-gold transition-colors">
                Home
              </Link>
              <Link href="/bespoke-shirts" className="text-sm text-foreground hover:text-gold transition-colors">
                Bespoke Shirts
              </Link>
              <Link href="/testimonials" className="text-sm text-foreground hover:text-gold transition-colors">
                Mogra Community
              </Link>
              <Link href="/contact" className="text-sm text-foreground hover:text-gold transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 text-xs font-medium uppercase tracking-widest text-gold">
              Get in Touch
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-foreground">hello@mogra.in</p>
              <p className="text-sm text-foreground">+91 98765 43210</p>
              <p className="text-sm text-muted">Mon–Sat, 10am–6pm IST</p>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-brand-border pt-8 text-center">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Mogra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
