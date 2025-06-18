import React from "react";
import Modal from "..";
import {X} from "lucide-react";

const ModalViewPDF = ({open, handler, children, color, file}) => {
 return (
  <Modal
   open={open}
   handler={handler}>
   <div className="w-full h-full px-8">
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
     <p className="text-xl font-semibold">View Surat</p>
     <button onClick={handler}>
      <X />
     </button>
    </div>
    {file && (
     <div className="w-full h-[calc(100vh-250px)]">
      <iframe
       src={`${file}`}
       className="w-full h-full"
      />
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
 );
};

export default ModalViewPDF;
