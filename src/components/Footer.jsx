import React from "react";

const Footer = () => {
  return (
    <>
      <div
        data-testid="footer"
        className="footer w-full flex flex-col items-center gap-1 bg-slate-100"
      >
        <div className="flex w-5/6 p-3 pb-6 border-b border-gray-400">
          <div className="flex flex-col  w-3/4 gap-2">
            <h1 className="font-bold">RUANGBELANJA</h1>
            <p className="text-sm text-slate-400">
              Specializes in providing high-quality, stylish products for your
              wardrobe
            </p>
          </div>
          <div className="flex flex-col w-1/4 gap-2 ">
            <h1 className="font-bold">SHOP</h1>
            <p className="text-sm text-slate-400">All collection</p>
            <p className="text-sm text-slate-400">Winter Edition</p>
            <p className="text-sm text-slate-400">Discount</p>
          </div>
          <div className="flex flex-col w-1/4 gap-2 ">
            <h1 className="font-bold">COMPANY</h1>
            <p className="text-sm text-slate-400">About Us</p>
            <p className="text-sm text-slate-400">Contact</p>
            <p className="text-sm text-slate-400">Affiliates</p>
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <h1 className="font-bold">SUPPORT</h1>
            <p className="text-sm text-slate-400">FAQs</p>

            <p className="text-sm text-slate-400">Cookie Policy</p>
            <p className="text-sm text-slate-400">Terms of Use</p>
          </div>
        </div>
        <div className="flex w-3/4 justify-center p-3">
          <p className="text-sm text-slate-400">
            Copyright &copy;2023 Ruangbelanja. All right reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
