"use client";
import {
 EyeIcon,
 FolderOutputIcon,
 FolderSymlinkIcon,
 UsersRoundIcon,
} from "lucide-react";
import React, {useEffect} from "react";
import Table from "@/components/table";
import {useSession} from "next-auth/react";

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
 const [data, setData] = React.useState([]);
 const bulanNow = new Date().getMonth();
 const [bulanPilih, setBulanPilih] = React.useState(bulanNow);
 const [paketPilih, setPaketPilih] = React.useState(false);

 const [listPaket, setListPaket] = React.useState([]);

 const [isLoading, setIsLoading] = React.useState(false);

 const getDataPaket = async () => {
  console.log("get data");
  await fetch("/api/v1.0.0/isp", {
   method: "GET",
   headers: {
    authorization: `Bearer ${session.user.token}`,
   },
   cache: "no-store",
  }).then(async (res) => {
   if (res.ok) {
    const resJson = await res.json();
    const paketan = [
     {value: "All", item: "All"},
     ...resJson.map((item) => ({
      value: item.isp_id,
      item: item.speed,
     })),
    ];
    setListPaket(paketan);
    console.log(paketan[0].value);
    setPaketPilih(paketan[0].value);
   } else {
    console.log(await res.text());
   }
  });
 };

 const getData = async () => {
  await fetch(
   "/api/v1.0.0/transaksi/laporan?bulan=" + bulanPilih + "&paket=" + paketPilih,
   {
    method: "GET",
    headers: {
     authorization: `Bearer ${session.user.token}`,
    },
    cache: "no-store",
   }
  ).then(async (res) => {
   if (res.ok) {
    const resJson = await res.json();
    console.log(resJson);
    setData(resJson);
   } else {
    console.log(await res.text());
   }
  });
 };

 const cetakLaporan = async () => {
  console.log("cetak");
  setIsLoading(true);
  await fetch(
   "/api/v1.0.0/transaksi/cetak/laporan?bulan=" +
    bulanPilih +
    "&paket=" +
    paketPilih,
   {
    method: "GET",
    headers: {
     authorization: `Bearer ${session.user.token}`,
    },
    cache: "no-store",
   }
  ).then(async (res) => {
   if (res.ok) {
    const resJson = await res.json();
    setIsLoading(false);
    console.log(resJson.link);
    window.open(resJson.link);
   } else {
    console.log(await res.text());
    setIsLoading(false);
   }
  });
 };

 useEffect(() => {
  if (bulanPilih && paketPilih) {
   console.log(bulanPilih, paketPilih);
   getData();
  }
 }, [bulanPilih, paketPilih]);

 useEffect(() => {
  getDataPaket();
 }, []);

 const refreshData = () => {
  getData();
 };

 return (
  <div className="relative text-black">
   <div className="h-[250px] bg-[#2D95CA] p-8 text-white text-3xl font-semibold pt-16">
    Laporan
   </div>
   <div className="absolute flex flex-col w-full gap-8 p-8 top-1/2">
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 bg-white rounded-lg shadow-lg">
     <div className="flex flex-col flex-1 min-w-[250px] gap-4 p-8 ">
      <h2 className="text-xl">Bulan</h2>
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
     </div>
     <div className="flex flex-col flex-1 min-w-[250px] gap-4 p-8 ">
      <h2 className="text-xl">Paket</h2>
      <select
       name="paket"
       id="paket"
       defaultValue={listPaket && listPaket[0]?.value}
       onChange={(e) => setPaketPilih(e.target.value)}
       className="w-full px-3 py-2 border-b-2 border-gray-300 focus:border-[#2D95CA] focus:outline-none">
       {listPaket.map((item, index) => (
        <option
         key={index}
         value={item.value}>
         {item.item}
        </option>
       ))}
      </select>
     </div>
    </div>

    <div className="grid grid-cols-1 gap-8">
     <button
      onClick={isLoading ? () => {} : cetakLaporan}
      className="flex flex-col flex-1 min-w-[250px] gap-4 p-4 bg-[#2D95CA] text-white text-center rounded-lg shadow-lg items-center text-xl font-semibold">
      {isLoading ? "Loading..." : "Cetak Laporan"}
     </button>
    </div>
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-3 bg-white rounded-lg shadow-lg">
     <div className="flex flex-col flex-1 min-w-[250px] gap-4 p-8 ">
      <h2 className="text-xl">Jumlah Pelanggan</h2>
      <p>{data && data.countPelanggan}</p>
     </div>
     <div className="flex flex-col flex-1 min-w-[250px] gap-4 p-8 ">
      <h2 className="text-xl">Jumlah Transaksi</h2>
      <p>{data && data.countTransaksi}</p>
     </div>
     <div className="flex flex-col flex-1 min-w-[250px] gap-4 p-8 ">
      <h2 className="text-xl">Jumlah Pendapatan</h2>
      <p>Rp. {data && parseInt(data.sum).toLocaleString("id-ID")}</p>
     </div>
    </div>
    <Table
     data={data && data.transaksi}
     header={[
      "no",
      "tanggal",
      "order_id",
      "user_id",
      "transaksi_id",
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
