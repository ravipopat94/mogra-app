import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="animate-mogra-spin">
        <Image
          src="/logo.png"
          alt="Mogra"
          width={1316}
          height={960}
          className="w-64 sm:w-80 md:w-96 mix-blend-multiply"
          priority
        />
      </div>
    </div>
  );
}
