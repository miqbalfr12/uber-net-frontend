"use client";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const route = {
 "": ["/", "/login"],
 Owner: [
  "/owner",
  "/owner/list-pelanggan",
  "/owner/list-admin",
  "/owner/data-pendapatan",
  "/owner/data-tagihan",
  //   "/owner/informasi-usaha",
  "/owner/laporan",
 ],
 admin: ["/admin", "/admin/list-pelanggan", "/admin/data-tagihan"],
 pelanggan: ["/pelanggan"],
 //  "Super Admin": [
 //   "/super-admin",
 //   "/super-admin/lembaga",
 //   "/super-admin/list-jabatan",
 //   "/super-admin/list-users",
 //   "/super-admin/list-surat-masuk",
 //   "/super-admin/list-surat-keluar",
 //   "/super-admin/laporan",
 //  ],
 //  "Kepala Satker": [
 //   "/kepala-satker",
 //   "/kepala-satker/validasi-disposisi-surat-masuk",
 //   "/kepala-satker/validasi-disposisi-surat-keluar",
 //   "/kepala-satker/laporan",
 //  ],
 //  "Kepala Subag": [
 //   "/kepala-subag",
 //   "/kepala-subag/list-surat-masuk",
 //   "/kepala-subag/list-surat-keluar",
 //   "/kepala-subag/laporan",
 //  ],
 //  "Admin Subag": [
 //   "/admin-subag",
 //   "/admin-subag/list-surat-masuk",
 //   "/admin-subag/list-surat-keluar",
 //  ],
 //  pegawai: [
 //   "/pegawai",
 //   "/pegawai/list-surat-masuk",
 //   "/pegawai/list-surat-keluar",
 //  ],
};

export default function Home() {
 const {data: session} = useSession();
 const router = useRouter();

 useEffect(() => {
  if (!session) router.push("/login");
  if (session)
   router.push(`/${session.user.role.toLowerCase().replace(" ", "-")}`);
 });

 return (
  <div className="flex items-center justify-center w-full h-screen bg-white">
   <span className="loader"></span>
  </div>
 );

 //  return (
 //   <main>
 //    <div className="flex flex-col max-w-3xl p-8 m-auto md:p-24">
 //     <div className="mb-20">
 //      <div className=" relative flex flex-col items-center justify-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full  before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic  after:blur-2xl after:content-[''] before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 before:lg:h-[360px] top-10"></div>
 //      <p className="relative drop-shadow-[0_0_0.3rem_#ffffff70] text-5xl text-white font-bold mb-2">
 //       UBER-NET-FRONTEND
 //      </p>
 //     </div>
 //     <div className="flex flex-col gap-2">
 //      {Object.entries(route).map(([key, value]) => (
 //       <>
 //        <p
 //         key={key}
 //         className="my-2 text-white">
 //         - {key}
 //        </p>
 //        {value.map((item) => (
 //         <Link
 //          key={item}
 //          href={item}
 //          className="text-blue-400 hover:text-blue-700">
 //          {item}
 //         </Link>
 //        ))}
 //       </>
 //      ))}
 //     </div>
 //    </div>
 //   </main>
 //  );
}
