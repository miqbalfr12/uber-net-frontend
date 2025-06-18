"use client";
import {
 EyeIcon,
 FolderOutputIcon,
 FolderSymlinkIcon,
 UsersRoundIcon,
} from "lucide-react";
import React, {useEffect} from "react";
import Table from "@/components/table";

import {
 Chart as ChartJS,
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";
import {useSession} from "next-auth/react";

ChartJS.register(
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 Title,
 Tooltip,
 Legend
);

const bulan = [
 "Januari",
 "Februari",
 "Maret",
 "April",
 "Mei",
 "Juni",
 "Juli",
 "Agustus",
 "September",
 "Oktober",
 "November",
 "Desember",
];
const Page = () => {
 const {data: session} = useSession();
 const [data, setData] = React.useState(false);

 const bulanNow = new Date().getMonth();
 const [bulanPilih, setBulanPilih] = React.useState(bulanNow);

 const getData = async () => {
  await fetch("/api/v1.0.0/transaksi/pendapatan?bulan=" + bulanPilih, {
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

 const refreshData = () => {
  getData();
 };

 useEffect(() => {
  console.log(bulanPilih);
  console.log(bulan[bulanPilih]);
  refreshData();
 }, [bulanPilih]);

 useEffect(() => {
  getData();
 }, []);

 return (
  <div className="relative text-black">
   <div className="h-[250px] bg-[#2D95CA] p-8 text-white text-3xl font-semibold pt-16">
    Pendapatan
   </div>
   <div className="absolute flex flex-col w-full gap-8 p-8 top-1/2">
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
     <div className="flex flex-col flex-1 gap-4 p-8 bg-white rounded-lg shadow-lg">
      <select
       name="bulan"
       id="bulan"
       defaultValue={bulanNow}
       onChange={(e) => setBulanPilih(e.target.value)}
       className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-[#2D95CA] focus:outline-none">
       {bulan.map((item, index) => (
        <option
         key={index}
         value={index}>
         {item}
        </option>
       ))}
      </select>
      <h2 className="text-xl font-semibold">
       Rp {(data.jumlah_pendapatan || 0).toLocaleString("id-ID")}
      </h2>
      <h2 className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-[#2D95CA] focus:outline-none">
       Total Transaksi
      </h2>
      <h2 className="text-xl font-semibold">{data.jumlah_transaksi || 0}</h2>
      <h2 className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-[#2D95CA] focus:outline-none">
       Total Pelanggan
      </h2>
      <h2 className="text-xl font-semibold">{data.jumlah_pelanggan || 0}</h2>
     </div>
     <div className="flex flex-col flex-1 min-w-[250px] md:col-span-2 sm:col-span-1  gap-4 p-8 bg-white rounded-lg shadow-lg">
      {data && (
       <Line
        options={{
         responsive: true,
        }}
        data={data.dataChart || {}}
       />
      )}
     </div>
    </div>
    <Table
     data={data ? data.listData : []}
     header={[
      "no",
      "tanggal",
      "transaksi_id",
      "order_id",
      "user_id",
      "name",
      "total",
      "payment_type",
      "aksi",
     ]}
     handleRefresh={refreshData}
     color="blue"
     w
    />
   </div>
  </div>
 );
};

export default Page;
