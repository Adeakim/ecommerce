import React from "react";

const CardFeature = ({ image, name, price, category }) => {
  return (
    <div className="w-full min-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col justify-center">
      <div className="h-24 flex flex-col justify-center items-center">
        <img src={image} alt="" className="h-full" />
      </div>
      <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4">
        {name}
      </h3>
      <p className=" text-slate-500 font-medium">{category}</p>
      <p className=" font-bold">
        ₦<span>{price}</span>
      </p>
    </div>
  );
};

export default CardFeature;
