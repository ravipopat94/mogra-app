import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Link href="/bespoke-shirts" className="flex flex-col items-center gap-3 sm:gap-5">
        <div className="animate-mogra-spin">
          <Image
            src="/logo.png"
            alt="Mogra"
            width={1316}
            height={960}
            className="w-64 sm:w-96 md:w-[30rem]"
            priority
          />
        </div>
        <p className="text-[10px] tracking-[0.35em] uppercase text-muted">
          boutique custom apparel for everyday life
        </p>
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted underline underline-offset-4 decoration-muted/50">
          shop now →
        </p>
      </Link>
    </div>
  );
}
