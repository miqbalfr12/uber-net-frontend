"use client";
import Table from "@/components/table";
import {
 Activity,
 CalendarHeart,
 FolderOutputIcon,
 FolderSymlinkIcon,
 Gauge,
 ReceiptText,
 UsersRoundIcon,
} from "lucide-react";
import {useSession} from "next-auth/react";
import React, {useEffect} from "react";

const Page = () => {
 const {data: session} = useSession();

 const [data, setData] = React.useState({});
 const getData = async () => {
  await fetch("/api/v1.0.0/user/pelanggan", {
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
   } else {
    console.log(res);
   }
  });
 };

 const refreshData = () => {
  getData();
 };

 useEffect(() => {
  getData();
 }, []);

 return (
  <div className="relative text-black">
   <div className="h-[250px] bg-[#76B445] p-8 text-white text-3xl font-semibold pt-16">
    Dashboard
   </div>
   <div className="absolute flex flex-col w-full gap-8 p-8 top-1/2">
    <div className="flex flex-wrap gap-8">
     <div className="flex flex-col flex-1 min-w-[250px]  gap-4 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
       <h2 className="text-xl">Status</h2>
       <div className="p-4 bg-[#76B445] rounded-md">
        <Activity className="text-white" />
       </div>
      </div>
      <div className="text-3xl font-bold">
       {data?.orders?.length &&
        data.orders[0].status
         .split("_")
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
         .join(" ")}
      </div>
      <p>Status</p>
     </div>
     <div className="flex flex-col flex-1 min-w-[250px]  gap-4 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
       <h2 className="text-xl">Jumlah Tagihan</h2>
       <div className="p-4 bg-[#76B445] rounded-md">
        <ReceiptText className="text-white" />
       </div>
      </div>
      <div className="text-3xl font-bold">
       {data?.orders?.length &&
        `Rp. ${data.orders[0].harga.toLocaleString("id-ID")}`}
      </div>
      <p>Rupiah</p>
     </div>
     <div className="flex flex-col flex-1 min-w-[250px]  gap-4 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
       <h2 className="text-xl">Paket</h2>
       <div className="p-4 bg-[#76B445] rounded-md">
        <Gauge className="text-white" />
       </div>
      </div>
      <div className="text-3xl font-bold">
       {data?.orders?.length && data.orders[0].speed}
      </div>
     </div>
     <div className="flex flex-col flex-1 min-w-[250px]  gap-4 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
       <h2 className="text-xl">Tanggal Invoice</h2>
       <div className="p-4 bg-[#76B445] rounded-md">
        <CalendarHeart className="text-white" />
       </div>
      </div>
      <div className="text-3xl font-bold">
       {data?.orders?.length &&
        new Intl.DateTimeFormat("id-ID", {
         month: "long",
         day: "numeric",
         timeZone: "Asia/Jakarta",
        }).format(new Date(data.orders[0].tanggal_mulai))}
      </div>
      <p>
       {data?.orders?.length &&
        new Intl.DateTimeFormat("id-ID", {
         year: "numeric",
         timeZone: "Asia/Jakarta",
        }).format(new Date(data.orders[0].tanggal_mulai))}
      </p>
     </div>
    </div>
    <div className="flex flex-col flex-1 min-w-[250px] gap-4 p-8 bg-white rounded-lg shadow-lg">
     <h3 className="text-2xl font-semibold">Dashboard</h3>
     <p>
      Selamat Datang {session.user.name} di UBER NET! Anda login sebagai
      Pelanggan.
     </p>
    </div>
    {console.log(data?.orders?.length && data?.orders)}
    {data?.orders?.length && (
     <Table
      data={data?.orders?.length && data?.orders}
      header={[
       "no",
       "order_id",
       "speed",
       "harga",
       "tanggal_mulai",
       "tanggal_berakhir",
       "status",
       "aksi",
      ]}
      handleRefresh={refreshData}
      color="green"
     />
    )}
   </div>
  </div>
 );
};

export default Page;
