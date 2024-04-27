import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-primary min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl">
        PacilFlix - E - 12
      </h2>
      <h1 className="text-3xl font-semibold">
        Unlimited movies, TV shows, and more
      </h1>
      <Link href="/login" className="bg-red-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold">
        Login
      </Link>
      <Link href="/register" className="bg-red-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold">
        Register
      </Link>
    </main>
  );
}
