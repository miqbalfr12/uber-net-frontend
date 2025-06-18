"use client";
import {useSession} from "next-auth/react";
import React from "react";
import Modal from "..";
import {X} from "lucide-react";
import Input from "@/components/input";
import ModalSuccess from "../modalSuccess";
import ModalFailed from "../modalFailed";

const ModalEditOrder = ({open, handler, color, data, refreshData}) => {
 const {data: session} = useSession();
 const [loading, setLoading] = React.useState(false);
 const [openSub, setOpenSub] = React.useState(false);
 const [failMsg, setFailMsg] = React.useState("Buat Akun User Gagal Disimpan");
 const handleSub = async (e) => {
  e.preventDefault();
  if (loading) {
   return;
  }
  setLoading(true);

  const createUser = await fetch(
   `/api/v1.0.0/transaksi?order_id=${
    data.order_id
   }&status_code=200&transaction_status=settlement&payment_type=${
    session.user.user_id
   }&transaction_time=${new Date().toISOString()}&transaction_id=${new Date().toISOString()}`,
   {
    method: "GET",
    headers: {
     authorization: `Bearer ${session.user.token}`,
    },
    cache: "no-store",
   }
  );
  if (createUser.ok) {
   setOpenSub("Success");
   refreshData();
  } else {
   console.log(createUser);
   const err = await createUser.json();
   setOpenSub("Failed");
   setFailMsg(err.message);
  }
  setLoading(false);
 };

 return (
  <>
   <Modal
    open={open}
    handler={handler}>
    <form
     onSubmit={handleSub}
     className="px-8">
     <div
      className={`flex justify-between w-full pb-2 border-b-2 ${
       color === "blue"
        ? "border-[#2D95CA]"
        : color === "green"
        ? "border-[#76B445]"
        : color === "yellow"
        ? "border-[#E28839]"
        : "border-black"
      } mb-4 `}>
      <p className="text-xl font-semibold">Lunasi Tagihan ({data.order_id})</p>
      <button
       type="button"
       onClick={handler}>
       <X />
      </button>
     </div>
     <div className="flex flex-col gap-4 mb-4">
      <div className="flex flex-wrap w-full gap-2 md:flex-nowrap flex-col">
       {console.log(data)}

       <p>
        Layanan : <b>{data.paket}</b>
       </p>
       <p>
        Harga : <b>Rp. {parseInt(data.harga).toLocaleString("id-ID")}</b>
       </p>
       <p>
        Tanggal Mulai : <b>{data.tanggal_mulai}</b>
       </p>
       <p>
        Tanggal Berakhir : <b>{data.tanggal_berakhir}</b>
       </p>
       <p>
        Apakah anda yakin ingin <b>melunasi</b> tagihan ({data.user_id}){" "}
        <b>{data.name}</b>?
       </p>
      </div>
     </div>
     <div
      className={`pt-2 border-t-2 flex justify-end ${
       color === "blue"
        ? "border-[#2D95CA]"
        : color === "green"
        ? "border-[#76B445]"
        : color === "yellow"
        ? "border-[#E28839]"
        : "border-black"
      } mt-4`}>
      <button
       onClick={handler}
       type="button"
       className="px-4 py-2">
       Tutup
      </button>
      <button
       type="submit"
       className={`px-4 py-2 rounded-lg text-white ${
        color === "blue"
         ? "bg-[#2D95CA]"
         : color === "green"
         ? "bg-[#76B445]"
         : color === "yellow"
         ? "bg-[#E28839]"
         : "bg-black"
       } `}>
       {loading ? "Loading" : "Lunasi"}
      </button>
     </div>
    </form>
   </Modal>
   <ModalSuccess
    open={openSub === "Success"}
    handler={() => {
     setOpenSub(false);
     handler();
    }}>
    Berhasil Melunasi Tagihan
   </ModalSuccess>
   <ModalFailed
    open={openSub === "Failed"}
    handler={() => {
     setOpenSub(false);
     handler();
    }}>
    {failMsg}
   </ModalFailed>
  </>
 );
};

export default ModalEditOrder;
