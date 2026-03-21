import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex-1 w-full flex flex-col">
      {/* Announcement bar */}
      <div className="border-b border-brand-border py-2 px-4">
        <p className="text-center text-[10px] uppercase tracking-widest text-muted">
          Use code{" "}
          <span className="text-gold font-medium tracking-widest">NEWCUSTOMER</span>
          {" "}for 10% off your first order
        </p>
      </div>

      {/* Centred hero */}
      <div className="flex-1 flex items-center justify-center">
      <Link href="/bespoke-shirts" className="flex flex-col items-center gap-3 sm:gap-5">
        <div className="animate-mogra-spin">
          <Image
            src="/logo.png"
            alt="Mogra"
            width={1316}
            height={960}
            className="w-[85vw] sm:w-96 md:w-[30rem]"
            priority
          />
        </div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-muted text-center">
          boutique custom apparel for everyday life
        </p>
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted text-center underline underline-offset-4 decoration-muted/50">
          shop now →
        </p>
      </Link>
      </div>
    </div>
  );
}
