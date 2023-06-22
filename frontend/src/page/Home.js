import React from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  // console.log("home", productData)
  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "Vegetable" || el.category === "vegetable" ,
    []
  );
  console.log("vegetsbles", homeProductCartListVegetables);
  const loadingArray = new Array(4).fill(null);
  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-400 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium">Bike Delivery</p>
            <img
              src="https://png.pngtree.com/png-clipart/20191121/original/pngtree-vector-cycling-icon-png-image_5159300.jpg"
              alt=""
              className="h-7 text-slate-400"
            />
          </div>
          <h1 className=" text-4xl md:text-7xl font-bold py-3">
            The Fastest Delivery in{" "}
            <span className="text-red-500 md:text-7xl font-bold">
              Your Home
            </span>
          </h1>
          <p className="py-3 text-base">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged
          </p>
          <button className="font-bold bg-red-500 rounded-full text-slate-200 px-4 py-1 hover:bg-red-700">
            Order Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-4 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    image={el.image}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index} loading='Loading...' />;
              })}
        </div>
      </div>
      <div className="">
        <h2 className="font-bold text-2xl text-slate-800">Fresh Vegetables</h2>
        <div className="flex gap-4 ">
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id}
                    category={el.category}
                    price={el.price}
                    name={el.name}
                    image={el.image}
                  />
                );
              })
            : loadingArray.map((el) => {
                return <CardFeature />;
              })}
        </div>
      </div>
    </div>
  );
};

export default Home;
