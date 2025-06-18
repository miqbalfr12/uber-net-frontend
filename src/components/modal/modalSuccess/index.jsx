import React from "react";
import Modal from "..";

const ModalSuccess = ({open, handler, children}) => {
 return (
  <Modal
   open={open}
   handler={handler}>
   <div className="mt-3 text-center">
    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full">
     <svg
      className="w-6 h-6 text-[#2D95CA]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlnx="http://www.w.org/2000/svg">
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth="2"
       d="M5 13l4 4L19 7"></path>
     </svg>
    </div>
    <h3 className="text-lg font-medium leading-6 text-gray-900">Successfull</h3>
    <div className="py-3 mt-2 px-7">
     <p className="text-sm text-gray-500">{children}</p>
    </div>
    <div className="items-center px-4 py-3">
     <button
      onClick={handler}
      type="button"
      className="w-full px-4 py-2 text-base font-medium text-white bg-[#2D95CA] rounded-md shadow-sm hover:bg-[#1b678d] focus:outline-none focus:ring-2 focus:ring-purple-300">
      OK
     </button>
    </div>
   </div>
  </Modal>
 );
};

export default ModalSuccess;
