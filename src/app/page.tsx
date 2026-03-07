import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <Link href="/catalog">
        <div className="animate-mogra-spin">
          <Image
            src="/logo.png"
            alt="Mogra"
            width={1316}
            height={960}
            className="w-80 sm:w-96 md:w-[30rem]"
            priority
          />
        </div>
      </Link>
    </div>
  );
}
