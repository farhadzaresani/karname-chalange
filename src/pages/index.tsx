import { Header, UsersDataTable } from "@/components";

export default function Home() {
  return (
    <main className="h-dvh flex flex-col">
      <Header />
      <div className=" h-full flex justify-center   w-full">
        <UsersDataTable />
      </div>
    </main>
  );
}
