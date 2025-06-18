"use client";
import {menuOwner} from "@/app/api/auth/[...nextauth]/routes";
import {
 FolderOutputIcon,
 FolderSymlinkIcon,
 UsersRoundIcon,
} from "lucide-react";
import {useSession} from "next-auth/react";
import React, {useEffect} from "react";

const Page = () => {
 const {data: session} = useSession();

 const [data, setData] = React.useState({});
 const getData = async () => {
  await fetch("/api/v1.0.0/dashboard?data=owner", {
   method: "GET",
   headers: {
    authorization: `Bearer ${session.user.token}`,
   },
   cache: "no-store",
  }).then(async (res) => {
   if (res.ok) {
    const resJson = await res.json();
    console.log(resJson);
    setData(resJson);
   }
  });
 };

 useEffect(() => {
  getData();
 }, []);

 return (
  <div className="relative text-black">
   <div className="h-[250px] bg-[#E28839] p-8 text-white text-3xl font-semibold pt-16">
    Dashboard
   </div>
   <div className="absolute flex flex-col w-full gap-8 p-8 top-1/2">
    <div className="flex flex-wrap gap-8">
     <div className="flex flex-col flex-1 min-w-[250px]  gap-4 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
       <h2 className="text-xl">Pelanggan Aktif</h2>
       <div className="p-4 bg-[#E28839] rounded-md">
        <UsersRoundIcon className="text-white" />
       </div>
      </div>
      <div className="text-3xl font-bold">{data?.pelanggan?.aktif || 0}</div>
      <p>Orang</p>
     </div>
     <div className="flex flex-col flex-1 min-w-[250px]  gap-4 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
       <h2 className="text-xl">Tagihan</h2>
       <div className="p-4 bg-[#E28839] rounded-md">
        <FolderSymlinkIcon className="text-white" />
       </div>
      </div>
      <div className="text-3xl font-bold">{data?.tagihan || 0}</div>
      <p>Orang</p>
     </div>
     <div className="flex flex-col flex-1 min-w-[250px]  gap-4 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
       <h2 className="text-xl">Total Pelanggan</h2>
       <div className="p-4 bg-[#E28839] rounded-md">
        <UsersRoundIcon className="text-white" />
       </div>
      </div>
      <div className="text-3xl font-bold">{data?.pelanggan?.total || 0}</div>
      <p>Orang</p>
     </div>
    </div>
    <div className="flex flex-col flex-1 min-w-[250px] gap-4 p-8 bg-white rounded-lg shadow-lg">
     <h3 className="text-2xl font-semibold">Dashboard</h3>
     <p>
      Selamat Datang {session.user.name} di UBER NET! Anda login sebagai Owner.
     </p>
    </div>
   </div>
  </div>
 );
};

export default Page;
