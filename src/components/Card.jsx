import React from "react";

const Card = (props) => {
  return (
    <>
      <div
        data-testid="card"
        className="product-card flex flex-col w-1/3 gap-1 p-5 mb-10 shadow-lg rounded-xl"
      >
        <img className="w-full h-80 mb-2" src={props.image} alt={props.name} />
        <p className="text-sm text-slate-600">{props.name}</p>
        <p className="font-bold text-lg">Rp{props.price}</p>
        <p className="text-xs text-slate-400">{props.category}</p>
      </div>
    </>
  );
};

export default Card;
