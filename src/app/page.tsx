import Link from "next/link";
import { ReactNode } from "react";

interface HomeProps {
  children: ReactNode;
}

export default function Home({ children }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-100">
      <main className="flex-grow flex flex-col">
        {children}

        <Link className="text-black justify-left underline font-semibold py-2" href={"/example"}>
          Go To Example Page (This page is countable)
        </Link>
        <Link className="text-black justify-left underline font-semibold py-2" href={"/example-2"}>
          Go To Example Page 2 (This page is uncountable)
        </Link>
      </main>
    </div>
  );
}
