import React from "react";
import Modal from "..";
import {X} from "lucide-react";
import ModalViewPDF from "../modalViewPDF";

const ModalSettlement = ({open, handler, color, data}) => {
 console.log(open);
 console.log(data);

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
      <p className="text-xl font-semibold">Detail</p>
      <button onClick={handler}>
       <X />
      </button>
     </div>

     <div className="flex flex-col gap-4 mb-4">
      <p className="text-xl font-semibold">Informasi</p>
      <RenderData data={data} />
     </div>
    </div>
   </Modal>
  </>
 );
};

const RenderData = ({data}) => {
 const excludedKeys = [
  "password",
  "aksi",
  "midtrans_response",
  "snap_token",
  "redirect_url",
  "deleted_by",
  "deleted_at",
 ];
 return (
  <div className="flex flex-col gap-2 ">
   {Object.entries(data).map(([key, value], index) => {
    if (excludedKeys.includes(key)) return null;

    const isObject = typeof value === "object" && value !== null;

    return (
     <div
      key={`${key}-${index}`}
      className="flex flex-col">
      <div className="flex">
       {isObject ? (
        <div className="w-full mt-4">
         <p className="text-xl capitalize font-semibold mb-4">
          {key.replace(/_/g, " ")}
         </p>
         <RenderData data={value} />
        </div>
       ) : (
        <>
         <div className={`w-1/3 capitalize font-medium`}>
          {key.replace(/_/g, " ")}
         </div>
         <div className="w-1/12">:</div>
         <div className="flex-1 border-b-2 border-black border-opacity-25">
          {String(value)}
         </div>
        </>
       )}
      </div>
     </div>
    );
   })}
  </div>
 );
};

export default ModalSettlement;
