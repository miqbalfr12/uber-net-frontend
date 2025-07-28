import React from "react";
import Modal from "..";
import {X} from "lucide-react";
import ModalViewPDF from "../modalViewPDF";

const ModalViewUser = ({open, handler, color, data}) => {
 const [openView, setOpenView] = React.useState(false);
 console.log(data);
 const handleView = () => {
  setOpenView((prev) => !prev);
 };

 return (
  <>
   <Modal
    open={open}
    handler={handler}>
    <div className="w-full px-8">
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
      <p className="text-xl font-semibold">Detail User {data.role}</p>
      <button onClick={handler}>
       <X />
      </button>
     </div>

     {data && (
      <div>
       <div className="flex flex-col gap-4 mb-4">
        <p className="text-xl font-semibold">Informasi {data.role}</p>
        <table className="w-full table-fixed">
         <tbody>
          <tr>
           <td className="w-1/3">ID {data.role}</td>
           <td className="w-1/12">:</td>
           <td className="border-b-2 border-black border-opacity-25">
            {data.user_id}
           </td>
          </tr>
          <tr>
           <td>Nama Pelanggan</td>
           <td>:</td>
           <td className="border-b-2 border-black border-opacity-25">
            {data.name}
           </td>
          </tr>
          <tr>
           <td>Alamat</td>
           <td>:</td>
           <td className="border-b-2 border-black border-opacity-25">
            {data.alamat}
           </td>
          </tr>
          <tr>
           <td>Email</td>
           <td>:</td>
           <td className="border-b-2 border-black border-opacity-25">
            {data.email}
           </td>
          </tr>
          <tr>
           <td>Nomor Handphone</td>
           <td>:</td>
           <td className="border-b-2 border-black border-opacity-25">
            {data.number}
           </td>
          </tr>
         </tbody>
        </table>
       </div>
       {data?.orders && data?.orders[0] && (
        <div className="flex flex-col gap-4 mb-4">
         <p className="text-xl font-semibold">Informasi Layanan</p>
         <table className="w-full table-fixed">
          <tbody>
           <tr>
            <td className="w-1/3">Order ID</td>
            <td className="w-1/12">:</td>
            <td className="border-b-2 border-black border-opacity-25">
             {data?.orders[0]?.order_id}
            </td>
           </tr>
           <tr>
            <td className="w-1/3">Paket</td>
            <td className="w-1/12">:</td>
            <td className="border-b-2 border-black border-opacity-25">
             {data?.orders[0]?.isp_id} - {data?.paket}
            </td>
           </tr>
           <tr>
            <td>Status</td>
            <td>:</td>
            <td className="border-b-2 border-black border-opacity-25">
             {data?.orders[0]?.status
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
            </td>
           </tr>
           <tr>
            <td>Tanggal Mulai</td>
            <td>:</td>
            <td className="border-b-2 border-black border-opacity-25">
             {data.orders[0]?.tanggal_mulai.split("T")[0]}
            </td>
           </tr>
           <tr>
            <td>Tanggal Berakhir</td>
            <td>:</td>
            <td className="border-b-2 border-black border-opacity-25">
             {data.orders[0]?.tanggal_berakhir.split("T")[0]}
            </td>
           </tr>
           <tr>
            <td>Dibuat Oleh</td>
            <td>:</td>
            <td className="border-b-2 border-black border-opacity-25">
             {data.orders[0]?.created_by}
            </td>
           </tr>
          </tbody>
         </table>
        </div>
       )}

       {/* <div className="flex flex-col gap-4 mb-4">
        <div className="w-full p-4 rounded-md bg-neutral-300">
         <p className="mb-2 text-lg font-semibold text-black">File</p>
         <div className="flex gap-4">
          <button
           onClick={handleView}
           className={`flex items-center justify-center w-full px-4 py-2 text-gray-600 bg-white border-2 border-gray-300 rounded-md cursor-pointer hover:text-white ${
            color === "blue"
             ? "hover:bg-[#2D95CA]"
             : color === "green"
             ? "hover:bg-[#76B445]"
             : color === "yellow"
             ? "hover:bg-[#E28839]"
             : "hover:bg-black"
           }`}>
           View
          </button>
         </div>
        </div>
       </div> */}
      </div>
     )}

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
       className={`px-4 py-2 rounded-lg text-white ${
        color === "blue"
         ? "bg-[#2D95CA]"
         : color === "green"
         ? "bg-[#76B445]"
         : color === "yellow"
         ? "bg-[#E28839]"
         : "bg-black"
       } `}>
       Tutup
      </button>
     </div>
    </div>
   </Modal>

   <ModalViewPDF
    open={openView}
    file={data?.file}
    color={color}
    handler={() => {
     handleView();
    }}></ModalViewPDF>
  </>
 );
};

export default ModalViewUser;
