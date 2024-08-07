import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Table from "@/components/Table";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="h-dvh flex flex-col">
      <Header />
      <div className=" h-full flex justify-center   w-full">
        <Table />
      </div>
    </main>
  );
}
