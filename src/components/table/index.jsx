"use client";
import {
 ArchiveRestoreIcon,
 EyeIcon,
 PencilIcon,
 PrinterIcon,
 QrCode,
 SendIcon,
 Trash2Icon,
} from "lucide-react";
import React from "react";
import ModalViewUser from "../modal/modalViewUser";
import ModalDeleteUser from "../modal/modalDeleteUser";
import ModalRestoreUser from "../modal/modalRestoreUser";
import ModalEditUser from "../modal/modalEditUser";
import ModalSettlement from "../modal/ModalSettlement";
import ModalSendAnnounce from "../modal/ModalSendAnnounce";
import {useSession} from "next-auth/react";
import ModalEditOrder from "../modal/ModalEditOrder";
import ModalSendTagihan from "../modal/modalSendTagihan";

const Table = ({data, header, color, dataPegawai, handleRefresh, filter}) => {
 console.log(filter);
 const {data: session} = useSession();
 const [open, setOpen] = React.useState(false);
 const [dataSurat, setDataSurat] = React.useState(false);
 const handleOpen = async (modal, data) => {
  console.log({modal, data});
  if (modal) {
   if (modal === "bayar") {
    console.log(data);
    console.log(data.order_id);
    await fetch("/api/v1.0.0/transaksi", {
     method: "POST",
     headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session.user.token}`,
     },
     cache: "no-store",
     body: JSON.stringify({order_id: data.order_id}),
    }).then(async (res) => {
     if (res.ok) {
      const snapToken = await res.json();

      // Menjalankan Midtrans Snap
      if (window.snap && snapToken) {
       window.snap.pay(snapToken, {
        onSuccess: async function (result) {
         await fetch(
          `/api/v1.0.0/transaksi?order_id=${result.order_id}&status_code=200&transaction_status=settlement&payment_type=${result.payment_type}&transaction_time=${result.transaction_time}&transaction_id=${result.transaction_id}`,
          {
           method: "GET",
           headers: {
            authorization: `Bearer ${session.user.token}`,
           },
           cache: "no-store",
          }
         ).then(async (res) => {
          console.log("Payment success saved", {result, res});
          handleRefresh();
         });
         alert("Pembayaran berhasil!");
         // atau reload data
        },
        onPending: function (result) {
         console.log("Payment pending", result);
         alert("Pembayaran tertunda.");
        },
        onError: function (result) {
         console.error("Payment failed", result);
         alert("Pembayaran gagal.");
        },
        onClose: function () {
         console.log("Popup ditutup.");
        },
       });
      } else {
       alert("Token pembayaran tidak tersedia.");
      }
     } else {
      console.error("Gagal fetch transaksi");
     }
    });
    return;
   }
   if (data) {
    console.log(data);
    setDataSurat(data);
   } else {
    setDataSurat(false);
   }
   setOpen(modal);
  } else {
   setOpen(false);
   setDataSurat(false);
  }
 };
 return (
  <>
   <div className="flex flex-col flex-1 min-w-[250px] gap-4 p-8 bg-white rounded-lg shadow-lg">
    <table className="border-collapse table-fixed">
     <thead className="hidden md:table-header-group">
      <tr>
       {header.map((item, index) => (
        <th
         key={index}
         className="p-4">
         {item
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
        </th>
       ))}
      </tr>
     </thead>
     <tbody
      className={`border-y-2 ${
       color === "blue"
        ? "border-[#2D95CA]"
        : color === "green"
        ? "border-[#76B445]"
        : color === "yellow"
        ? "border-[#E28839]"
        : "border-black"
      } md:table-row-group flex flex-col gap-4`}>
      {data && data.length ? (
       data
        .filter((itemd) => {
         if (filter) {
          return itemd.name.toLowerCase().includes(filter.toLowerCase());
         }
         return true;
        })
        .map((itemd, indexd) => {
         return (
          <tr
           key={indexd}
           className="flex flex-col border-b-2 md:border-b-0 md:table-row">
           {header.map((itemh, indexh) =>
            itemh === "aksi" ? (
             <td
              key={indexh}
              className="flex items-start justify-center gap-2 p-2">
              {itemd[itemh].map((item, index) => {
               switch (item) {
                case "view":
                 return (
                  <button
                   key={index}
                   onClick={() => handleOpen("view", itemd)}
                   className="bg-[#2D95CA] p-2 rounded-md">
                   <EyeIcon className="text-white" />
                  </button>
                 );
                case "viewOrder":
                 return (
                  <button
                   key={index}
                   onClick={() => handleOpen("settlement", itemd)}
                   className="bg-[#2D95CA] p-2 rounded-md">
                   <EyeIcon className="text-white" />
                  </button>
                 );
                case "sendOrder":
                 return (
                  <button
                   key={index}
                   onClick={() => handleOpen("sendTagihan", itemd)}
                   className="bg-[#76B445] p-2 rounded-md">
                   <SendIcon className="text-white" />
                  </button>
                 );
                case "editOrder":
                 return (
                  <button
                   key={index}
                   onClick={() => handleOpen("editOrder", itemd)}
                   className="bg-[#76B445] p-2 rounded-md">
                   <PencilIcon className="text-white" />
                  </button>
                 );
                case "sendAnnounce":
                 return (
                  <button
                   key={index}
                   onClick={() => handleOpen("sendAnnounce", itemd)}
                   className="bg-[#76B445] p-2 rounded-md">
                   <SendIcon className="text-white" />
                  </button>
                 );
                case "sendSettlement":
                 return (
                  <button
                   key={index}
                   onClick={() => handleOpen("sendTagihan", itemd)}
                   className="bg-[#76B445] p-2 rounded-md">
                   <SendIcon className="text-white" />
                  </button>
                 );
                case "settlement":
                 return (
                  <button
                   key={index}
                   onClick={() => handleOpen("settlement", itemd)}
                   className="bg-[#2D95CA] p-2 rounded-md">
                   <EyeIcon className="text-white" />
                  </button>
                 );
                case "bayar":
                 return (
                  <button
                   key={index}
                   onClick={() => handleOpen("bayar", itemd)}
                   className="bg-[#76B445] p-2 rounded-md">
                   <QrCode className="text-white" />
                  </button>
                 );
                case "edit":
                 return (
                  <button
                   key={index}
                   onClick={() => handleOpen("editUserPelanggan", itemd)}
                   className="bg-[#76B445] p-2 rounded-md">
                   <PencilIcon className="text-white" />
                  </button>
                 );
                case "delete":
                 return (
                  <button
                   onClick={() => handleOpen("deleteUser", itemd)}
                   key={index}
                   className="bg-[#E28839] p-2 rounded-md">
                   <Trash2Icon className="text-white" />
                  </button>
                 );
                case "restore":
                 return (
                  <button
                   key={index}
                   onClick={() => handleOpen("restoreUser", itemd)}
                   className="bg-[#E28839] p-2 rounded-md">
                   <ArchiveRestoreIcon className="text-white" />
                  </button>
                 );
               }
              })}
             </td>
            ) : (
             <td
              key={indexh}
              className="p-2">
              <div className="flex flex-wrap gap-2">
               <span className="font-semibold md:hidden">
                {itemh
                 .split("_")
                 .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(" ")}
                {" : "}
               </span>
               <span>{itemd[itemh] ? itemd[itemh] : "-"}</span>
              </div>
             </td>
            )
           )}
          </tr>
         );
        })
      ) : (
       <tr>
        <td
         colSpan={header.length}
         className="p-2 text-center">
         Tidak ada Data
        </td>
       </tr>
      )}
     </tbody>
    </table>
    <div className="flex flex-col items-center gap-4 md:justify-between md:flex-row">
     <p>Showing 1 to 3 of 3 entries</p>
     <div className="flex items-center gap-4">
      <button>sebelumnya</button>
      <div
       className={`${
        color === "blue"
         ? "bg-[#2D95CA]"
         : color === "green"
         ? "bg-[#76B445]"
         : color === "yellow"
         ? "bg-[#E28839]"
         : "bg-black"
       } p-2 rounded-md text-white`}>
       1
      </div>
      <button>selanjutnya</button>
     </div>
    </div>
   </div>
   <ModalViewUser
    open={open === "view"}
    data={dataSurat}
    handler={handleOpen}
    color={color}
   />
   <ModalSendAnnounce
    open={open === "sendAnnounce"}
    data={dataSurat}
    handler={handleOpen}
    color={color}
   />
   <ModalSendTagihan
    open={open === "sendTagihan"}
    color={color}
    data={dataSurat}
    handler={handleOpen}
   />
   <ModalSettlement
    open={open === "settlement"}
    data={dataSurat}
    handler={handleOpen}
    color={color}
   />
   <ModalDeleteUser
    open={open === "deleteUser"}
    data={dataSurat}
    handler={handleOpen}
    refreshData={handleRefresh}
    color={color}
   />
   <ModalEditOrder
    open={open === "editOrder"}
    data={dataSurat}
    handler={handleOpen}
    refreshData={handleRefresh}
    color={color}
   />
   <ModalRestoreUser
    open={open === "restoreUser"}
    data={dataSurat}
    handler={handleOpen}
    refreshData={handleRefresh}
    color={color}
   />
   <ModalEditUser
    open={open === "editUserPelanggan"}
    refreshData={handleRefresh}
    data={dataSurat}
    handler={handleOpen}
    color={color}
   />
  </>
 );
};

export default Table;
