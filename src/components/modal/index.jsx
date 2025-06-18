import React from "react";

const Modal = ({open, handler, children}) => {
 return (
  <>
   <div
    className={`fixed inset-0 bg-black bg-opacity-50 overflow-y-auto z-40 transition-opacity px-4 duration-300 ${
     open ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}>
    <div
     className={`relative p-5 bg-white border rounded-md shadow-lg z-50 my-20 mx-auto max-w-7xl text-black transition-transform duration-300  ${
      open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
     }`}>
     {children}
    </div>
   </div>
  </>
 );
};

export default Modal;
